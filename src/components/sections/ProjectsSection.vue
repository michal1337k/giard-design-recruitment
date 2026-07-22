<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'

import ProjectLightbox from '@/components/ui/ProjectLightbox.vue'
import { projects } from '@/data/projects'

/* liczba zdjęć wyświetlana na początku */
const INITIAL_VISIBLE_COUNT = 6

/* liczba kolejnych zdjęć pokazywana po kliknięciu „Rozwiń” */
const PROJECTS_PER_LOAD = 3

/* referencja do elementu galerii znajdującego się w template */
const galleryGrid = ref(null)

/* liczba aktualnie widocznych realizacji */
const visibleCount = ref(Math.min(INITIAL_VISIBLE_COUNT, projects.length))

/* indeks zdjęcia otwartego w popupie.
    `null` oznacza, że popup jest zamknięty.
*/
const activeProjectIndex = ref(null)

let masonryInstance = null

const visibleProjects = computed(() => {
  return projects.slice(0, visibleCount.value)
})

const hasMoreProjects = computed(() => {
  return visibleCount.value < projects.length
})

const isLightboxOpen = computed(() => {
  return activeProjectIndex.value !== null
})

const activeProject = computed(() => {
  if (activeProjectIndex.value === null) {
    return null
  }

  return visibleProjects.value[activeProjectIndex.value] ?? null
})

function refreshMasonry() {
  if (!galleryGrid.value) {
    return
  }

  if (!masonryInstance) {
    masonryInstance = new Masonry(galleryGrid.value, {
      itemSelector: '.gallery-item',

      /* szerokość pojedynczej kolumny. */
      columnWidth: '.gallery-sizer',

      gutter: 24,

      percentPosition: true,

      /* naturalna kolejność od lewej do prawej */
      horizontalOrder: true,

      transitionDuration: '0.35s',
      stagger: 40,
    })
  } else {
    masonryInstance.reloadItems()
    masonryInstance.layout()
  }

  imagesLoaded(galleryGrid.value).on('progress', () => {
    masonryInstance?.layout()
  })
}

function showMoreProjects() {
  visibleCount.value = Math.min(visibleCount.value + PROJECTS_PER_LOAD, projects.length)
}

function openLightbox(index) {
  activeProjectIndex.value = index
}

function closeLightbox() {
  activeProjectIndex.value = null
}

function showPreviousProject() {
  const projectsCount = visibleProjects.value.length

  if (projectsCount === 0 || activeProjectIndex.value === null) {
    return
  }

  /* będąc na pierwszym zdjęciu, przejdzie do ostatniego */
  activeProjectIndex.value = (activeProjectIndex.value - 1 + projectsCount) % projectsCount
}

function showNextProject() {
  const projectsCount = visibleProjects.value.length

  if (projectsCount === 0 || activeProjectIndex.value === null) {
    return
  }

  /* będąc na ostatnim zdjęciu, przejdzie do pierwszego */
  activeProjectIndex.value = (activeProjectIndex.value + 1) % projectsCount
}

onMounted(async () => {
  await nextTick()

  refreshMasonry()
})

/* zabezpieczenie na wypadek, gdy visibleCount zostanie zmienione z innego miejsca */
watch(visibleCount, async () => {
  await nextTick()
  refreshMasonry()
})

onUnmounted(() => {
  masonryInstance?.destroy()
  masonryInstance = null
})
</script>

<template>
  <section id="projects" class="bg-[var(--color-beige)] py-24 md:py-28 lg:py-36">
    <div class="page-grid">
      <div class="col-start-2 col-end-4">
        <!-- nagłówek sekcji -->
        <div>
          <p class="text-xs font-medium tracking-[0.16em] text-[var(--color-green)] uppercase">
            Realizacje
          </p>

          <h2 class="mt-4 text-4xl leading-tight font-medium tracking-[-0.04em] md:text-5xl">
            Nasze
            <em class="font-normal">projekty</em>
          </h2>
        </div>

        <div class="relative mt-14">
          <div ref="galleryGrid" class="gallery-grid">
            <!-- szerokość kolumny -->
            <div class="gallery-sizer" aria-hidden="true"></div>

            <button
              v-for="(project, index) in visibleProjects"
              :key="project.id"
              type="button"
              class="gallery-item group relative block cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 text-left focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-4 focus-visible:outline-none"
              :aria-label="`Otwórz zdjęcie: ${project.title}`"
              @click="openLightbox(index)"
            >
              <img
                :src="project.image"
                :alt="project.alt"
                class="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] group-active:scale-[0.99]"
                loading="lazy"
                decoding="async"
              />

              <!-- warstwa widoczna po najechaniu -->
              <span
                class="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/5 to-transparent p-6 text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <span>
                  <span class="block text-xs text-white/70">
                    {{ project.category }}
                  </span>

                  <span class="mt-1 block text-lg font-medium">
                    {{ project.title }}
                  </span>
                </span>
              </span>

              <!-- ikona powiększenia -->
              <span
                class="absolute top-4 right-4 flex size-10 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                aria-hidden="true"
              >
                <svg
                  class="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                >
                  <circle cx="11" cy="11" r="6" />
                  <path d="m20 20-4.5-4.5" />
                  <path d="M11 8v6" />
                  <path d="M8 11h6" />
                </svg>
              </span>
            </button>
          </div>

          <div
            v-if="hasMoreProjects"
            class="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[var(--color-beige)] via-[var(--color-beige)]/80 to-transparent"
            aria-hidden="true"
          ></div>

          <!-- przycisk rozwijający kolejne elementy -->
          <div
            v-if="hasMoreProjects"
            class="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
          >
            <button
              type="button"
              class="pointer-events-auto group inline-flex items-center gap-3 rounded-full border border-black/70 bg-[var(--color-beige)] px-6 py-3 text-sm transition-all duration-300 hover:bg-black hover:text-white active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:outline-none"
              @click="showMoreProjects"
            >
              Rozwiń

              <svg
                class="size-4 transition-transform duration-300 group-hover:translate-y-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <ProjectLightbox
      :is-open="isLightboxOpen"
      :project="activeProject"
      :show-navigation="visibleProjects.length > 1"
      @close="closeLightbox"
      @previous="showPreviousProject"
      @next="showNextProject"
    />
  </section>
</template>

<style scoped>
/* jedna kolumna na urządzeniach mobilnych */
.gallery-sizer,
.gallery-item {
  width: 100%;
}

.gallery-item {
  margin-bottom: 24px;
}

/* dwie kolumny na tabletach */
@media (width >= 768px) {
  .gallery-sizer,
  .gallery-item {
    width: calc((100% - 24px) / 2);
  }
}

/* trzy kolumny na desktopie */
@media (width >= 1024px) {
  .gallery-sizer,
  .gallery-item {
    width: calc((100% - 48px) / 3);
  }
}
</style>
