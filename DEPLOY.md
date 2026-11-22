# Publicação da JFDEV

## Fluxo de release

1. Abra um PR para `main` e confira o job `JFDEV | Build Nitro`.
2. Após o merge, aguarde o build de `main`. O deploy usa o artefato do mesmo commit, valida o SHA-256 e ignora builds superados.
3. Aprove o ambiente `production` quando solicitado. O job de deploy só inicia se a variável de repositório `JFDEV_DEPLOY_ENABLED` estiver com valor `true`.
4. Confirme o SHA retornado pela VPS, as rotas `/`, `/privacy` e `/en/privacy` e o redirecionamento do `www`.

## Acesso de produção

Configure os secrets `JFDEV_VPS_HOST`, `JFDEV_VPS_PORT`, `JFDEV_VPS_SSH_KEY` e `JFDEV_VPS_KNOWN_HOSTS` no ambiente `production`. Restrinja o ambiente à branch `main`. Verifique a identidade do servidor por uma sessão administrativa confiável antes de cadastrar `known_hosts`.

A conta `jfdev-ci` precisa de uma chave própria com comando forçado e encaminhamentos e terminal interativo desabilitados. O contrato SSH é `deploy COMMIT_SHA ZIP_SHA256`, com o ZIP em stdin. O Cloud Runner não deve usar a conta de operação da VPS. A configuração do servidor e dos secrets deve estar pronta antes de ligar o deploy.

## Rollback

Na VPS, como operador autorizado, identifique um SHA anterior em `/home/jfdev/jfdev-deploy/releases` e execute os comandos como `jfdev` em uma sessão administrativa autenticada.

```bash
/home/jfdev/jfdev-deploy/bin/activate.sh SHA_ANTERIOR
/home/jfdev/jfdev-deploy/bin/check-release.sh
```

Confira o SHA ativo e valide o HTTPS público. Se precisar impedir que uma execução de CI subsequente republique a versão problemática, desabilite `JFDEV_DEPLOY_ENABLED` antes do rollback. Faça a correção em `main` e reabilite a publicação após a revisão.

O `activate.sh` restaura o link anterior quando o serviço ou a checagem local falha. Para automatizar também o rollback em falhas no HTTPS, o comando forçado da VPS deve verificar o VirtualHost após a ativação e chamar `activate.sh` com o SHA anterior em caso de falha.
