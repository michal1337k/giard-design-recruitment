<script setup>
import { ref } from 'vue'

import { A11y, Autoplay, EffectFade, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/effect-fade'

import { heroSlides } from '@/data/heroSlides'

const swiperModules = [A11y, Autoplay, EffectFade, Keyboard]

const hasMultipleSlides = heroSlides.length > 1
const activeSlideIndex = ref(0)

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const autoplayOptions =
  prefersReducedMotion || !hasMultipleSlides
    ? false
    : {
        delay: 7500,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
        waitForTransition: false,
      }

let swiperInstance = null
let isPointerInsideHero = false

function handleSwiper(swiper) {
  swiperInstance = swiper
}

function handleSlideChange(swiper) {
  activeSlideIndex.value = swiper.realIndex

  if (isPointerInsideHero) {
    swiper.autoplay?.stop()
  }
}

function showPreviousSlide() {
  if (!swiperInstance || swiperInstance.destroyed) {
    return
  }

  swiperInstance.slidePrev()
}

function showNextSlide() {
  if (!swiperInstance || swiperInstance.destroyed) {
    return
  }

  swiperInstance.slideNext()
}

function handlePointerEnter(event) {
  if (event.pointerType !== 'mouse') {
    return
  }

  isPointerInsideHero = true
  swiperInstance?.autoplay?.stop()
}

function handlePointerLeave(event) {
  if (event.pointerType !== 'mouse') {
    return
  }

  isPointerInsideHero = false

  if (hasMultipleSlides && !prefersReducedMotion) {
    swiperInstance?.autoplay?.start()
  }
}
</script>

<template>
  <section
    id="intro"
    class="relative isolate overflow-hidden"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
  >
    <Swiper
      class="hero-swiper"
      :modules="swiperModules"
      :slides-per-view="1"
      :rewind="hasMultipleSlides"
      :speed="1200"
      effect="fade"
      :fade-effect="{ crossFade: true }"
      :autoplay="autoplayOptions"
      :keyboard="{
        enabled: true,
        onlyInViewport: true,
      }"
      @swiper="handleSwiper"
      @slide-change="handleSlideChange"
    >
      <SwiperSlide v-for="(slide, index) in heroSlides" :key="slide.id">
        <!-- połącz tekst i zdjęcie w jeden slajd -->
        <article class="relative bg-(--color-beige) lg:h-184.25">
          <div class="page-grid lg:h-184.25">
            <div
              class="col-span-full row-start-1 flex min-h-130 items-center py-16 md:min-h-145 md:py-20 lg:col-start-1 lg:col-end-7 lg:h-184.25 lg:min-h-0 lg:py-0"
            >
              <div class="hero-copy flex w-full flex-col gap-18 lg:h-112 lg:w-149.75">
                <div class="flex flex-col gap-11">
                  <h1
                    class="font-heading w-full text-[42px] leading-12 font-medium tracking-normal md:text-[50px] md:leading-14.5 lg:h-52.5 lg:w-149.75 lg:text-[60px] lg:leading-17.5"
                  >
                    <template v-if="slide.titleLines">
                      <span v-for="line in slide.titleLines" :key="line" class="lg:block">
                        {{ line }}
                        <span class="lg:hidden">&nbsp;</span>
                      </span>
                    </template>

                    <template v-else>
                      {{ slide.title }}
                    </template>
                  </h1>

                  <p
                    class="w-full max-w-122.25 text-base leading-6 font-normal text-stone-700 lg:h-18 lg:w-122.25"
                  >
                    <template v-if="slide.descriptionLines">
                      <span
                        v-for="(line, lineIndex) in slide.descriptionLines"
                        :key="line"
                        class="lg:block"
                      >
                        {{ line }}

                        <span
                          v-if="lineIndex < slide.descriptionLines.length - 1"
                          class="lg:hidden"
                        >
                          &nbsp;
                        </span>
                      </span>
                    </template>

                    <template v-else>
                      {{ slide.description }}
                    </template>
                  </p>
                </div>

                <div class="flex w-full flex-wrap gap-4 lg:w-123.25 lg:flex-nowrap lg:gap-9">
                  <a
                    :href="slide.primaryAction.href"
                    class="inline-flex h-12.5 w-full shrink-0 items-center justify-center rounded-full bg-(--color-green) px-6 text-base leading-6 font-normal whitespace-nowrap text-(--color-cream) transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)] focus-visible:ring-2 focus-visible:ring-(--color-green) focus-visible:ring-offset-4 focus-visible:outline-none active:scale-[0.97] sm:w-auto lg:w-52"
                  >
                    {{ slide.primaryAction.label }}
                  </a>

                  <a
                    :href="slide.secondaryAction.href"
                    class="group inline-flex h-12.5 w-full shrink-0 items-center justify-between rounded-full border border-(--color-green) bg-transparent px-5.5 text-base leading-6 font-normal whitespace-nowrap text-(--color-green) transition-all duration-300 hover:-translate-y-1 hover:bg-(--color-green) hover:text-white focus-visible:ring-2 focus-visible:ring-(--color-green) focus-visible:ring-offset-4 focus-visible:outline-none active:scale-[0.97] sm:w-auto lg:w-62.25"
                  >
                    <span>
                      {{ slide.secondaryAction.label }}
                    </span>

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
                  </a>
                </div>
              </div>
            </div>

            <!-- rozszerz zdjęcie od kolumn 7–12 do prawej krawędzi viewportu -->
            <div
              class="hero-media relative col-span-full row-start-2 min-h-95 overflow-hidden md:min-h-120 lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:h-184.25 lg:min-h-0"
            >
              <img
                :src="slide.image"
                :alt="slide.imageAlt"
                class="hero-image absolute inset-0 h-full w-full object-cover"
                :style="{ objectPosition: slide.objectPosition }"
                :loading="index === 0 ? 'eager' : 'lazy'"
                :fetchpriority="index === 0 ? 'high' : 'auto'"
                decoding="async"
              />

              <div class="pointer-events-none absolute inset-0 bg-black/3" aria-hidden="true"></div>
            </div>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>

    <!-- wyświetl nawigację przy więcej niż jednym slajdzie -->
    <div
      v-if="hasMultipleSlides"
      class="absolute right-0 bottom-0 z-50 flex h-24 w-48 items-center gap-8 bg-(--color-cream) px-8"
    >
      <button
        type="button"
        class="group flex size-12 shrink-0 items-center justify-center transition-opacity duration-300 hover:opacity-55 active:scale-95"
        aria-label="Pokaż poprzedni slajd"
        @click.stop="showPreviousSlide"
      >
        <svg
          class="h-4 w-[24.29px] shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
          viewBox="0 0 24.29 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M24.29 8H1" />
          <path d="M8 1 1 8l7 7" />
        </svg>
      </button>

      <button
        type="button"
        class="group flex size-12 shrink-0 items-center justify-center transition-opacity duration-300 hover:opacity-55 active:scale-95"
        aria-label="Pokaż następny slajd"
        @click.stop="showNextSlide"
      >
        <svg
          class="h-4 w-[24.29px] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24.29 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M0 8h23.29" />
          <path d="m16.29 1 7 7-7 7" />
        </svg>
      </button>
    </div>

    <p v-if="hasMultipleSlides" class="sr-only" aria-live="polite">
      Slajd {{ activeSlideIndex + 1 }} z {{ heroSlides.length }}
    </p>
  </section>
</template>

<style scoped>
.hero-copy > * {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 900ms ease,
    transform 900ms ease;
}

:deep(.swiper-slide-active) .hero-copy > * {
  opacity: 1;
  transform: translateY(0);
}

:deep(.swiper-slide-active) .hero-copy > :nth-child(2) {
  transition-delay: 160ms;
}

.hero-image {
  transform: scale(1.045);
  transition: transform 6s ease-out;
}

:deep(.swiper-slide-active) .hero-image {
  transform: scale(1);
}

:deep(.swiper-slide) {
  pointer-events: none;
}

:deep(.swiper-slide-active) {
  pointer-events: auto;
}

/* wyłącz animacje, gdy użytkownik ograniczył ruch w systemie */
@media (prefers-reduced-motion: reduce) {
  .hero-copy > *,
  .hero-image {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* rozszerz zdjęcie od siatki do prawej krawędzi viewportu */
@media (width >= 1024px) {
  .hero-media {
    width: calc(100% + ((100vw - var(--page-grid-width)) / 2));
  }
}
</style>
