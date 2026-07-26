<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

import imagesLoaded from 'imagesloaded'
import Masonry from 'masonry-layout'

import ProjectLightbox from '@/components/ui/ProjectLightbox.vue'
import { projects } from '@/data/projects'

const galleryGrid = ref(null)

const isProjectsExpanded = ref(false)
const activeProjectIndex = ref(null)

const hasMultipleProjects = projects.length > 1

let masonryInstance = null
let imagesLoadedInstance = null

const isLightboxOpen = computed(() => {
  return activeProjectIndex.value !== null
})

const activeProject = computed(() => {
  if (activeProjectIndex.value === null) {
    return null
  }

  return projects[activeProjectIndex.value] ?? null
})

function layoutMasonry() {
  masonryInstance?.layout()
}

function initializeMasonry() {
  if (!galleryGrid.value) {
    return
  }

  masonryInstance = new Masonry(galleryGrid.value, {
    itemSelector: '.gallery-item',
    columnWidth: '.gallery-sizer',
    gutter: '.gallery-gutter',
    percentPosition: true,
    horizontalOrder: true,
    transitionDuration: '0s',
  })

  imagesLoadedInstance = imagesLoaded(galleryGrid.value)
  imagesLoadedInstance.on('progress', layoutMasonry)
}

function revealProjects() {
  isProjectsExpanded.value = true
}

function openLightbox(index) {
  activeProjectIndex.value = index
}

function closeLightbox() {
  activeProjectIndex.value = null
}

function showPreviousProject() {
  const projectsCount = projects.length

  if (projectsCount === 0 || activeProjectIndex.value === null) {
    return
  }

  activeProjectIndex.value = (activeProjectIndex.value - 1 + projectsCount) % projectsCount
}

function showNextProject() {
  const projectsCount = projects.length

  if (projectsCount === 0 || activeProjectIndex.value === null) {
    return
  }

  activeProjectIndex.value = (activeProjectIndex.value + 1) % projectsCount
}

onMounted(() => {
  initializeMasonry()
})

onUnmounted(() => {
  imagesLoadedInstance?.off('progress', layoutMasonry)
  imagesLoadedInstance = null

  masonryInstance?.destroy()
  masonryInstance = null
})
</script>

<template>
  <section id="projects" class="bg-(--color-beige) pt-20 pb-12 md:pt-24 lg:pt-30 lg:pb-10.25">
    <div v-reveal class="flex flex-col gap-4 px-(--page-gutter) lg:px-0 lg:pl-40">
      <p class="w-fit text-xs leading-4.5 font-normal tracking-[-0.01em] text-(--color-green)">
        Realizacje
      </p>

      <h2
        class="text-[40px] leading-11.5 md:text-[44px] md:leading-12.75 lg:text-5xl lg:leading-13.75"
      >
        <span class="font-heading font-medium tracking-[-0.03em]">Nasze</span
        ><span class="font-medium italic tracking-normal">&nbsp;projekty</span>
      </h2>
    </div>

    <div id="projects-gallery" class="relative mt-16 w-full overflow-hidden lg:mt-24">
      <div ref="galleryGrid" class="gallery-grid relative w-full">
        <!-- zdefiniuj szerokość kolumny i odstępu dla masonry -->
        <div class="gallery-sizer" aria-hidden="true"></div>

        <div class="gallery-gutter" aria-hidden="true"></div>

        <button
          v-for="(project, index) in projects"
          :key="project.id"
          type="button"
          class="gallery-item group relative block cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 text-left focus-visible:ring-2 focus-visible:ring-(--color-green) focus-visible:ring-offset-4 focus-visible:outline-none"
          :aria-label="`Otwórz zdjęcie: ${project.title}`"
          @click="openLightbox(index)"
        >
          <img
            :src="project.image"
            :alt="project.imageAlt"
            class="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] group-active:scale-[0.99]"
            loading="lazy"
            decoding="async"
          />

          <span
            class="absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-black/5 to-transparent p-6 text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100"
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
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6" />
              <path d="m20 20-4.5-4.5" />
              <path d="M11 8v6" />
              <path d="M8 11h6" />
            </svg>
          </span>
        </button>
      </div>

      <Transition name="projects-cover">
        <div
          v-if="!isProjectsExpanded"
          class="projects-cover pointer-events-none absolute inset-0 z-20"
        >
          <div
            class="projects-gradient absolute inset-x-0 top-[45%] bottom-0 md:top-[38%] lg:top-[32.2034%]"
            aria-hidden="true"
          ></div>

          <button
            type="button"
            class="pointer-events-auto group absolute bottom-8 left-1/2 flex h-12.5 w-30.75 -translate-x-1/2 items-center gap-2 rounded-full border border-(--color-dark) px-5.5 pt-3 pb-3.5 text-base leading-6 font-normal tracking-normal text-(--color-dark) transition-colors duration-300 hover:bg-(--color-dark) hover:text-(--color-beige) focus-visible:ring-2 focus-visible:ring-(--color-dark) focus-visible:ring-offset-4 focus-visible:ring-offset-(--color-beige) focus-visible:outline-none active:scale-[0.97] lg:top-[93.45%] lg:bottom-auto"
            aria-controls="projects-gallery"
            :aria-expanded="isProjectsExpanded"
            @click.stop="revealProjects"
          >
            <span class="whitespace-nowrap"> Rozwiń </span>

            <svg
              class="size-4 shrink-0 transition-transform duration-300 group-hover:translate-y-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M8 1v14" />
              <path d="m2 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </Transition>
    </div>

    <ProjectLightbox
      :is-open="isLightboxOpen"
      :project="activeProject"
      :show-navigation="hasMultipleProjects"
      @close="closeLightbox"
      @previous="showPreviousProject"
      @next="showNextProject"
    />
  </section>
</template>

<style scoped>
/* ułóż galerię w jednej kolumnie na telefonach */
.gallery-sizer,
.gallery-item {
  width: 100%;
}

.gallery-gutter {
  width: 0;
}

.gallery-item {
  margin-bottom: 24px;
}

.gallery-item:last-child {
  margin-bottom: 0;
}

/* ułóż galerię w dwóch kolumnach na tabletach */
@media (width >= 768px) {
  .gallery-sizer,
  .gallery-item {
    width: calc((100% - 24px) / 2);
  }

  .gallery-gutter {
    width: 24px;
  }

  .gallery-item:nth-last-child(-n + 2) {
    margin-bottom: 0;
  }
}

/* ułóż galerię w trzech kolumnach na desktopie */
@media (width >= 1024px) {
  .gallery-sizer,
  .gallery-item {
    width: calc((100% - 86px) / 3);
  }

  .gallery-gutter {
    width: 43px;
  }

  .gallery-item {
    margin-bottom: 42px;
  }

  .gallery-item:nth-last-child(-n + 3) {
    margin-bottom: 0;
  }
}

.projects-gradient {
  background: linear-gradient(to bottom, rgb(214 183 158 / 0%) 0%, rgb(220 193 171 / 100%) 100%);
}

.projects-cover-leave-active {
  will-change: transform, opacity;
  transition:
    transform 550ms cubic-bezier(0.65, 0, 0.35, 1),
    opacity 350ms ease-out;
}

.projects-cover-leave-to {
  opacity: 0;
  transform: translateY(105%);
}

/* skróć animację, gdy użytkownik ograniczył ruch w systemie */
@media (prefers-reduced-motion: reduce) {
  .projects-cover-leave-active {
    transition-duration: 1ms;
  }
}
</style>
