<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import logo from '@/assets/brand/giarddesign-logo.svg'

const isDesktopOfferOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileOfferOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const offerLinks = [
  {
    label: 'Projekty',
    description: 'Kompleksowe projekty ogrodów',
    href: '#offer',
  },
  {
    label: 'Wizualizacje',
    description: 'Prezentacja koncepcji w technologii 3D',
    href: '#offer',
  },
  {
    label: 'Realizacje',
    description: 'Zobacz nasze ukończone realizacje',
    href: '#projects',
  },
]

const searchableLinks = [
  {
    label: 'Strona główna',
    href: '#intro',
    keywords: ['intro', 'ogród', 'aranżacja', 'start'],
  },
  {
    label: 'Oferta',
    href: '#offer',
    keywords: ['projekty', 'wizualizacje', 'usługi'],
  },
  {
    label: 'O firmie',
    href: '#about',
    keywords: ['firma', 'giarddesign', 'informacje'],
  },
  {
    label: 'Realizacje',
    href: '#projects',
    keywords: ['galeria', 'projekty', 'ogrody', 'zdjęcia'],
  },
  {
    label: 'Kontakt',
    href: '#contact',
    keywords: ['telefon', 'e-mail', 'instagram'],
  },
]

/*
  funkcja wykona się ponownie, gdy zmieni się `searchQuery`.
*/
const filteredSearchResults = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('pl-PL')

  /*
    gdy pole jest puste, pokaż wszystkie dostępne sekcje
  */
  if (!query) {
    return searchableLinks
  }

  /*
    zostaw tylko elementy, których nazwa albo słowa kluczowe zawierają wpisane przez użytkownika wyrażenie
  */
  return searchableLinks.filter((item) => {
    const searchableValues = [item.label, ...item.keywords]

    return searchableValues.some((value) => value.toLocaleLowerCase('pl-PL').includes(query))
  })
})

function closeDesktopOffer() {
  isDesktopOfferOpen.value = false
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  isMobileOfferOpen.value = false
}

function closeSearch() {
  isSearchOpen.value = false
  searchQuery.value = ''
}

/*
  funkcja do zamknięcia wszystkich interaktywnych elementów
*/
function closeAllPanels() {
  closeDesktopOffer()
  closeMobileMenu()
  closeSearch()
}

function toggleDesktopOffer() {
  const shouldOpen = !isDesktopOfferOpen.value

  closeAllPanels()
  isDesktopOfferOpen.value = shouldOpen
}

function toggleMobileMenu() {
  const shouldOpen = !isMobileMenuOpen.value

  closeAllPanels()
  isMobileMenuOpen.value = shouldOpen
}

function toggleMobileOffer() {
  isMobileOfferOpen.value = !isMobileOfferOpen.value
}

async function openSearch() {
  closeAllPanels()
  isSearchOpen.value = true

  await nextTick()
  searchInput.value?.focus()
}

function toggleSearch() {
  if (isSearchOpen.value) {
    closeSearch()
    return
  }

  openSearch()
}

/*
  po kliknięciu linku w menu lub wyszukiwarce
*/
function handleNavigationClick() {
  closeAllPanels()
}

/*
  klawisz ESC do zamknięcia
*/
function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeAllPanels()
  }
}

/*
  gdy otwarta jest wyszukiwarka albo menu mobilne, blokuj przewijanie strony znajdującej się pod spodem
*/
watch([isMobileMenuOpen, isSearchOpen], ([mobileOpen, searchOpen]) => {
  document.body.style.overflow = mobileOpen || searchOpen ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="relative z-50 bg-white">
    <div class="page-grid">
      <div class="relative col-start-2 col-end-4 flex h-[72px] items-center justify-between">
        <a
          href="#intro"
          class="flex h-[19px] w-[114.37px] shrink-0 items-center"
          aria-label="Przejdź na początek strony"
          @click="handleNavigationClick"
        >
          <img :src="logo" alt="GiardDesign" class="h-[19px] w-[114.37px]" />
        </a>

        <!-- nawigacja desktopowa -->
        <nav
          class="hidden h-[24px] w-[442px] shrink-0 items-center justify-between text-[14px] leading-[21px] font-normal tracking-[-0.14px] lg:flex"
          aria-label="Główna nawigacja"
        >
          <div class="relative flex h-[21px] w-[59px] shrink-0 items-center">
            <button
              type="button"
              class="flex h-[21px] w-[59px] items-center gap-[5px] whitespace-nowrap transition-opacity hover:opacity-60"
              aria-controls="desktop-offer-menu"
              :aria-expanded="isDesktopOfferOpen"
              @click="toggleDesktopOffer"
            >
              <span class="h-[21px] w-[42px] text-left"> Oferta </span>

              <svg
                class="size-[12px] shrink-0 transition-transform duration-300"
                :class="{ 'rotate-180': isDesktopOfferOpen }"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m2 4 4 4 4-4" />
              </svg>
            </button>
          </div>

          <a
            href="#about"
            class="flex h-[21px] w-[51px] shrink-0 items-center whitespace-nowrap transition-opacity hover:opacity-60"
            @click="handleNavigationClick"
          >
            O firmie
          </a>

          <a
            href="#projects"
            class="flex h-[21px] w-[68px] shrink-0 items-center whitespace-nowrap transition-opacity hover:opacity-60"
            @click="handleNavigationClick"
          >
            Realizacje
          </a>

          <a
            href="#contact"
            class="flex h-[21px] w-[50px] shrink-0 items-center whitespace-nowrap transition-opacity hover:opacity-60"
            @click="handleNavigationClick"
          >
            Kontakt
          </a>

          <!-- ikona lupy-->
          <button
            type="button"
            class="flex size-[24px] shrink-0 items-center justify-center transition-opacity hover:opacity-60"
            aria-label="Otwórz wyszukiwarkę"
            :aria-expanded="isSearchOpen"
            @click="toggleSearch"
          >
            <svg
              class="h-[19.5px] w-[19px]"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <circle cx="8.5" cy="8.5" r="6.25" />
              <path d="m13.25 13.25 4.5 4.5" />
            </svg>
          </button>
        </nav>

        <!-- przycisk menu mobilnego - animacja zmiany hamburgera w X -->
        <button
          type="button"
          class="relative size-10 lg:hidden"
          aria-controls="mobile-navigation"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'"
          @click="toggleMobileMenu"
        >
          <!-- pierwsza kreska hamburgera xd -->
          <span
            class="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 bg-black transition-all duration-300"
            :class="isMobileMenuOpen ? '-translate-y-1/2 rotate-45' : '-translate-y-[7px]'"
          />

          <!-- środkowa kreska znika po otwarciu menu -->
          <span
            class="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-black transition-all duration-300"
            :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
          />

          <!-- trzecia kreska -->
          <span
            class="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 bg-black transition-all duration-300"
            :class="isMobileMenuOpen ? '-translate-y-1/2 -rotate-45' : 'translate-y-[6px]'"
          />
        </button>
      </div>
    </div>
  </header>

  <!--
    przezroczysta warstwa pod menu desktopowym.
    kliknięcie poza dropdownem zamknie menu.
  -->
  <div
    v-if="isDesktopOfferOpen"
    class="fixed inset-0 z-40 hidden lg:block"
    aria-hidden="true"
    @click="closeDesktopOffer"
  ></div>

  <!-- ciemne tło pod menu mobilnym -->
  <Transition name="fade">
    <button
      v-if="isMobileMenuOpen"
      type="button"
      class="fixed inset-0 top-[72px] z-30 bg-black/30 lg:hidden"
      aria-label="Zamknij menu"
      @click="closeMobileMenu"
    ></button>
  </Transition>

  <!-- nawigacja mobilna -->
  <Transition name="mobile-menu">
    <div
      v-if="isMobileMenuOpen"
      id="mobile-navigation"
      class="fixed inset-x-0 top-[72px] z-40 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-stone-200 bg-white lg:hidden"
    >
      <nav class="px-6 py-6" aria-label="Nawigacja mobilna">
        <button
          type="button"
          class="flex w-full items-center justify-between border-b border-stone-200 py-4 text-left text-lg"
          aria-controls="mobile-offer-menu"
          :aria-expanded="isMobileOfferOpen"
          @click="toggleMobileOffer"
        >
          Oferta

          <span
            class="text-xs transition-transform duration-300"
            :class="{ 'rotate-180': isMobileOfferOpen }"
            aria-hidden="true"
          >
            ▼
          </span>
        </button>

        <Transition name="mobile-submenu">
          <div
            v-if="isMobileOfferOpen"
            id="mobile-offer-menu"
            class="border-b border-stone-200 bg-stone-50 px-4 py-2"
          >
            <a
              v-for="item in offerLinks"
              :key="item.label"
              :href="item.href"
              class="block py-3"
              @click="handleNavigationClick"
            >
              <span class="block font-medium">
                {{ item.label }}
              </span>

              <span class="mt-1 block text-xs text-stone-500">
                {{ item.description }}
              </span>
            </a>
          </div>
        </Transition>

        <a
          href="#about"
          class="block border-b border-stone-200 py-4 text-lg"
          @click="handleNavigationClick"
        >
          O firmie
        </a>

        <a
          href="#projects"
          class="block border-b border-stone-200 py-4 text-lg"
          @click="handleNavigationClick"
        >
          Realizacje
        </a>

        <a
          href="#contact"
          class="block border-b border-stone-200 py-4 text-lg"
          @click="handleNavigationClick"
        >
          Kontakt
        </a>

        <button
          type="button"
          class="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#1d6337] px-6 py-4 text-white"
          @click="openSearch"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          Wyszukaj na stronie
        </button>
      </nav>
    </div>
  </Transition>

  <!-- wysuwana wyszukiwarka -->
  <Transition name="search-panel">
    <div v-if="isSearchOpen" class="fixed inset-0 z-[80]">
      <!-- kliknięcie w przyciemnione tło zamknie wyszukiwarkę -->
      <button
        type="button"
        class="absolute inset-0 bg-black/35"
        aria-label="Zamknij wyszukiwarkę"
        @click="closeSearch"
      ></button>

      <section
        class="search-sheet relative bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Wyszukiwarka"
      >
        <div class="page-grid">
          <div class="col-start-2 col-end-4 py-8 md:py-12">
            <div class="flex items-center justify-between gap-6">
              <p class="text-sm font-medium tracking-widest text-stone-500 uppercase">
                Wyszukiwarka
              </p>

              <button
                type="button"
                class="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
                aria-label="Zamknij wyszukiwarkę"
                @click="closeSearch"
              >
                <svg
                  class="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <form class="mt-6" @submit.prevent>
              <label for="page-search" class="sr-only"> Wyszukaj sekcję strony </label>

              <input
                id="page-search"
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                placeholder="Czego szukasz?"
                autocomplete="off"
                class="w-full border-b border-stone-400 bg-transparent py-4 text-3xl outline-none placeholder:text-stone-300 md:text-5xl"
              />
            </form>

            <div class="mt-8">
              <p class="mb-3 text-xs tracking-widest text-stone-500 uppercase">Wyniki</p>

              <div v-if="filteredSearchResults.length" class="grid gap-2 md:grid-cols-2">
                <a
                  v-for="item in filteredSearchResults"
                  :key="item.href"
                  :href="item.href"
                  class="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-stone-100"
                  @click="handleNavigationClick"
                >
                  <span>{{ item.label }}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <p v-else class="py-5 text-stone-500">Nie znaleziono pasującej sekcji.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
/* rozwijane menu Oferta */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* przyciemnione tło menu mobilnego */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* główne menu mobilne */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

/* podmenu Oferta na urządzeniach mobilnych */
.mobile-submenu-enter-active,
.mobile-submenu-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

.mobile-submenu-enter-from,
.mobile-submenu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* całe tło wyszukiwarki */
.search-panel-enter-active,
.search-panel-leave-active {
  transition: opacity 300ms ease;
}

.search-panel-enter-from,
.search-panel-leave-to {
  opacity: 0;
}

/* przesuniecie bialego panelu do góry */
.search-panel-enter-active .search-sheet,
.search-panel-leave-active .search-sheet {
  transition: transform 300ms ease;
}

.search-panel-enter-from .search-sheet,
.search-panel-leave-to .search-sheet {
  transform: translateY(-100%);
}
</style>
