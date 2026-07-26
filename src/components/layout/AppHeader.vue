<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import logo from '@/assets/brand/giarddesign-logo.svg'
import { navigationLinks, offerLinks, searchableLinks } from '@/data/headerData'

const isDesktopOfferOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileOfferOpen = ref(false)
const isSearchOpen = ref(false)

const searchQuery = ref('')
const searchInput = ref(null)

let previousBodyOverflow = ''

const isPageScrollLocked = computed(() => isMobileMenuOpen.value || isSearchOpen.value)

function normalizeSearchValue(value) {
  return value.toLocaleLowerCase('pl-PL')
}

const filteredSearchResults = computed(() => {
  const query = normalizeSearchValue(searchQuery.value.trim())

  if (!query) {
    return searchableLinks
  }

  return searchableLinks.filter(({ label, keywords }) => {
    return [label, ...keywords].some((value) => {
      return normalizeSearchValue(value).includes(query)
    })
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

  // poczekaj, aż vue wyrenderuje wyszukiwarkę, a następnie ustaw fokus
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

function handleNavigationClick() {
  closeAllPanels()
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeAllPanels()
  }
}

watch(isPageScrollLocked, (isLocked, wasLocked) => {
  if (isLocked && !wasLocked) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return
  }

  if (!isLocked && wasLocked) {
    document.body.style.overflow = previousBodyOverflow
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <header class="relative z-50 bg-white">
    <div class="page-grid">
      <div class="col-span-full flex h-18 items-center justify-between">
        <a
          href="#intro"
          class="flex h-4.75 w-[114.37px] shrink-0 items-center"
          aria-label="Przejdź na początek strony"
          @click="handleNavigationClick"
        >
          <img :src="logo" alt="GiardDesign" class="h-4.75 w-[114.37px]" />
        </a>

        <!-- wyświetl nawigację desktopową -->
        <nav
          class="hidden h-6 w-110.5 shrink-0 items-center justify-between text-sm leading-5.25 font-normal tracking-[-0.14px] lg:flex"
          aria-label="Główna nawigacja"
        >
          <div class="relative flex h-5.25 w-14.75 shrink-0 items-center">
            <button
              type="button"
              class="flex h-5.25 w-14.75 items-center gap-1.25 whitespace-nowrap transition-opacity hover:opacity-60"
              aria-controls="desktop-offer-menu"
              :aria-expanded="isDesktopOfferOpen"
              @click.stop="toggleDesktopOffer"
            >
              <span class="h-5.25 w-10.5 text-left"> Oferta </span>

              <svg
                class="size-3 shrink-0 transition-transform duration-300"
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

            <Transition name="dropdown">
              <div
                v-if="isDesktopOfferOpen"
                id="desktop-offer-menu"
                class="absolute top-12 left-0 z-70 w-72 rounded-2xl bg-white p-3 shadow-xl"
              >
                <a
                  v-for="item in offerLinks"
                  :key="item.label"
                  :href="item.href"
                  class="block rounded-xl px-4 py-3 transition-colors hover:bg-stone-100"
                  @click="handleNavigationClick"
                >
                  <span class="block font-medium">
                    {{ item.label }}
                  </span>

                  <span class="mt-1 block text-xs leading-5 text-stone-500">
                    {{ item.description }}
                  </span>
                </a>
              </div>
            </Transition>
          </div>

          <a
            v-for="item in navigationLinks"
            :key="item.href"
            :href="item.href"
            class="flex h-5.25 shrink-0 items-center whitespace-nowrap transition-opacity hover:opacity-60"
            @click="handleNavigationClick"
          >
            {{ item.label }}
          </a>

          <button
            type="button"
            class="flex size-6 shrink-0 items-center justify-center transition-opacity hover:opacity-60"
            aria-label="Otwórz wyszukiwarkę"
            aria-controls="page-search-dialog"
            :aria-expanded="isSearchOpen"
            @click="toggleSearch"
          >
            <svg
              class="h-[19.5px] w-4.75"
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

        <!-- wyświetl przycisk menu mobilnego -->
        <button
          type="button"
          class="relative size-10 lg:hidden"
          aria-controls="mobile-navigation"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'"
          @click="toggleMobileMenu"
        >
          <span
            class="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 bg-black transition-all duration-300"
            :class="isMobileMenuOpen ? '-translate-y-1/2 rotate-45' : '-translate-y-1.75'"
          />

          <span
            class="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-black transition-all duration-300"
            :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
          />

          <span
            class="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 bg-black transition-all duration-300"
            :class="isMobileMenuOpen ? '-translate-y-1/2 -rotate-45' : 'translate-y-1.5'"
          />
        </button>
      </div>
    </div>
  </header>

  <!-- zamknij menu po kliknięciu poza dropdownem -->
  <div
    v-if="isDesktopOfferOpen"
    class="fixed inset-0 z-40 hidden lg:block"
    aria-hidden="true"
    @click="closeDesktopOffer"
  ></div>

  <!-- przyciemnij tło pod menu mobilnym -->
  <Transition name="fade">
    <button
      v-if="isMobileMenuOpen"
      type="button"
      class="fixed inset-0 top-18 z-30 bg-black/30 lg:hidden"
      aria-label="Zamknij menu"
      @click="closeMobileMenu"
    ></button>
  </Transition>

  <!-- wyświetl nawigację mobilną -->
  <Transition name="mobile-menu">
    <div
      v-if="isMobileMenuOpen"
      id="mobile-navigation"
      class="fixed inset-x-0 top-18 z-40 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-stone-200 bg-white lg:hidden"
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
          v-for="item in navigationLinks"
          :key="item.href"
          :href="item.href"
          class="block border-b border-stone-200 py-4 text-lg"
          @click="handleNavigationClick"
        >
          {{ item.label }}
        </a>

        <button
          type="button"
          class="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#1d6337] px-6 py-4 text-white"
          aria-controls="page-search-dialog"
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

  <!-- wyświetl wyszukiwarkę -->
  <Transition name="search-panel">
    <div v-if="isSearchOpen" class="fixed inset-0 z-80">
      <button
        type="button"
        class="absolute inset-0 bg-black/35"
        aria-label="Zamknij wyszukiwarkę"
        @click="closeSearch"
      ></button>

      <section
        id="page-search-dialog"
        class="search-sheet relative w-full bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Wyszukiwarka"
      >
        <div class="page-grid">
          <!-- zajmij całą szerokość globalnej siatki -->
          <div class="col-span-full py-8 md:py-12">
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

            <form class="mt-6" role="search" @submit.prevent>
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
/* animuj rozwijane menu oferty */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

/* animuj przyciemnione tło menu mobilnego */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease;
}

/* animuj główne menu mobilne */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

/* animuj podmenu oferty na urządzeniach mobilnych */
.mobile-submenu-enter-active,
.mobile-submenu-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

/* animuj tło wyszukiwarki */
.search-panel-enter-active,
.search-panel-leave-active {
  transition: opacity 300ms ease;
}

/* wysuń panel wyszukiwarki od górnej krawędzi */
.search-panel-enter-active .search-sheet,
.search-panel-leave-active .search-sheet {
  transition: transform 300ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .dropdown-enter-active,
  .dropdown-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .mobile-menu-enter-active,
  .mobile-menu-leave-active,
  .mobile-submenu-enter-active,
  .mobile-submenu-leave-active,
  .search-panel-enter-active,
  .search-panel-leave-active,
  .search-panel-enter-active .search-sheet,
  .search-panel-leave-active .search-sheet {
    transition-duration: 1ms;
  }
}
</style>
