#!/usr/bin/env bash
set -euo pipefail
umask 077

if [[ $(id -un) == jfdev-ci ]]; then
  if [[ ${SSH_ORIGINAL_COMMAND:-} =~ ^deploy[[:space:]]([a-f0-9]{40})[[:space:]]([a-f0-9]{64})$ ]]; then
    exec /usr/bin/sudo -n -u jfdev /usr/local/libexec/jfdev/receive-release.sh "${BASH_REMATCH[1]}" "${BASH_REMATCH[2]}"
  fi
  echo 'Unsupported SSH command.' >&2
  exit 2
fi

[[ $(id -un) == jfdev && $# == 2 && $1 =~ ^[a-f0-9]{40}$ && $2 =~ ^[a-f0-9]{64}$ ]] || exit 2
base=/home/jfdev/jfdev-deploy
candidate=$1
zip_digest=$2
max_bytes=67108864
exec 9>"$base/ci.lock"
flock -w 60 9
previous=$(readlink -e -- "$base/current")
[[ $previous == "$base/releases/"* && ${previous##*/} =~ ^[a-f0-9]{40}$ ]]
previous=${previous##*/}

zip=$(mktemp "$base/.upload.XXXXXXXX")
trap 'unlink -- "$zip"' EXIT
timeout 90 head -c "$((max_bytes + 1))" > "$zip"
[[ $(stat --format=%s "$zip") -le $max_bytes ]]
actual=$(sha256sum -- "$zip")
[[ ${actual%% *} == "$zip_digest" ]]
if [[ -d $base/releases/$candidate ]]; then
  incoming=$(unzip -p "$zip" jfdev-nitro.tar.gz | sha256sum)
  prepared=$(sha256sum -- "$base/releases/$candidate/jfdev-nitro.tar.gz")
  [[ ${incoming%% *} == "${prepared%% *}" ]]
else
  "$base/bin/deploy.sh" "$candidate" "$zip" "$zip_digest"
fi

check_https() {
  local route result
  for route in / /privacy /en/privacy; do
    result=$(curl -fsS --max-time 8 --resolve jfdev.com.br:443:127.0.0.1 -o /dev/null -w '%{http_code}' "https://jfdev.com.br$route") || return
    [[ $result == 200 ]] || return 1
  done
  result=$(curl -fsS --max-time 8 --resolve www.jfdev.com.br:443:127.0.0.1 -o /dev/null -w '%{http_code} %{redirect_url}' https://www.jfdev.com.br/privacy) || return
  [[ $result == '301 https://jfdev.com.br/privacy' ]]
}

if [[ $candidate != "$previous" ]]; then
  "$base/bin/activate.sh" "$candidate"
fi
if "$base/bin/check-release.sh" && check_https; then
  printf 'HTTPS verified. Active release: %s\n' "$candidate"
  exit 0
fi
if [[ $candidate != "$previous" ]]; then
  echo "HTTPS validation failed. Restoring $previous." >&2
  "$base/bin/activate.sh" "$previous"
  "$base/bin/check-release.sh"
  check_https
fi
exit 1
