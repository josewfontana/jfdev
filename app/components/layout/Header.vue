<script setup lang="ts">
import { MenuIcon, XIcon } from '@lucide/vue'

type NavItem = {
  readonly to: string
  readonly labelKey: MessageKey
}

const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/#services', labelKey: 'nav.services' },
  { to: '/projects', labelKey: 'nav.projects' },
  { to: '/engineering', labelKey: 'nav.engineering' },
]

const MOBILE_ITEMS: readonly NavItem[] = [
  ...NAV_ITEMS,
  { to: '/#contact', labelKey: 'nav.contact' },
]

/** Same breakpoint as Tailwind `lg`: the desktop nav takes over and the mobile menu closes. */
const DESKTOP_QUERY = '(min-width: 64rem)'

const route = useRoute()
const scrolled = useScrolled()
const menuOpen = ref(false)
const header = useTemplateRef<HTMLElement>('header')
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')

function closeMenu(returnFocus: boolean): void {
  menuOpen.value = false
  if (returnFocus) menuButton.value?.focus()
}

watch(() => route.fullPath, () => closeMenu(false))

onMounted(() => {
  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && menuOpen.value) closeMenu(true)
  }
  const onPointerdown = (event: PointerEvent): void => {
    if (menuOpen.value && event.target instanceof Node && !header.value?.contains(event.target)) {
      closeMenu(false)
    }
  }
  const desktop = window.matchMedia(DESKTOP_QUERY)
  const onBreakpoint = (event: MediaQueryListEvent): void => {
    if (event.matches) closeMenu(false)
  }

  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onPointerdown)
  desktop.addEventListener('change', onBreakpoint)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('pointerdown', onPointerdown)
    desktop.removeEventListener('change', onBreakpoint)
  })
})
</script>

<template>
  <header
    ref="header"
    class="theme-dark sticky top-0 z-50 bg-brand-charcoal text-foreground transition-shadow"
    :class="scrolled ? 'shadow-lg' : 'shadow-none'"
  >
    <LayoutContainer class="flex h-header items-center justify-between gap-5 border-b border-border-default">
      <BrandLogo />

      <nav
        :aria-label="$t('nav.label')"
        class="hidden lg:block"
      >
        <ul class="flex items-center gap-8">
          <li
            v-for="item in NAV_ITEMS"
            :key="item.to"
          >
            <!--
              `custom` slot: the router ignores #hash when computing the active link, so "/" and
              "/#services" would both be marked current. Only hash-less links get aria-current.
            -->
            <NuxtLinkLocale
              v-slot="{ href, navigate, isExactActive }"
              :to="item.to"
              custom
            >
              <a
                :href="href"
                :aria-current="isExactActive && !item.to.includes('#') ? 'page' : undefined"
                class="text-xs font-semibold tracking-wide text-foreground transition-colors hover:text-primary aria-[current=page]:text-primary"
                @click="navigate"
              >
                {{ $t(item.labelKey) }}
              </a>
            </NuxtLinkLocale>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <LayoutLocaleSwitcher />
        <LayoutThemeToggle />
        <UiButton
          to="/#contact"
          variant="teal"
          class="min-h-10 py-2 text-xs max-sm:hidden"
        >
          {{ $t('nav.cta') }}
        </UiButton>
        <button
          ref="menuButton"
          type="button"
          class="inline-flex size-10 items-center justify-center rounded-control border border-border-default text-foreground transition-colors hover:bg-surface lg:hidden"
          aria-controls="mobile-nav"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
          @click="menuOpen = !menuOpen"
        >
          <Transition
            name="icon-swap"
            mode="out-in"
          >
            <XIcon
              v-if="menuOpen"
              :size="20"
              aria-hidden="true"
            />
            <MenuIcon
              v-else
              :size="20"
              aria-hidden="true"
            />
          </Transition>
        </button>
      </div>
    </LayoutContainer>

    <Transition name="menu">
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        :aria-label="$t('nav.mobileLabel')"
        class="bg-surface lg:hidden"
      >
        <LayoutContainer
          as="div"
          class="pb-6"
        >
          <ul>
            <li
              v-for="item in MOBILE_ITEMS"
              :key="item.to"
              class="border-b border-border-default"
            >
              <NuxtLinkLocale
                :to="item.to"
                class="block py-4 font-semibold text-foreground transition-colors hover:text-primary"
                @click="closeMenu(false)"
              >
                {{ $t(item.labelKey) }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </LayoutContainer>
      </nav>
    </Transition>
  </header>
</template>
