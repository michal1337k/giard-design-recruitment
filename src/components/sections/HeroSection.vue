<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { A11y, Autoplay, EffectFade, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

import { heroSlides } from '@/data/heroSlides'

const swiperModules = [A11y, Autoplay, EffectFade, Keyboard]

/* aktualny numer slajdu */
const activeSlideIndex = ref(0)

const heroSection = ref(null)
let isPointerInsideHero = false

let swiperInstance = null

/*
 ustawienie systemowe użytkownika
 jeżeli ograniczył animacje w systemie, nie uruchamiajj automatycznego przesuwania slajdów
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const autoplayOptions = prefersReducedMotion
  ? false
  : {
      delay: 7500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false,
      waitForTransition: false,
    }

function handleSwiper(swiper) {
  swiperInstance = swiper
}

function handleSlideChange(swiper) {
  activeSlideIndex.value = swiper.realIndex

  if (isPointerInsideHero) {
    swiper.autoplay.stop()
  }
}

function showPreviousSlide() {
  if (!swiperInstance || swiperInstance.destroyed || swiperInstance.animating) {
    return
  }

  swiperInstance.slidePrev()
}

function showNextSlide() {
  if (!swiperInstance || swiperInstance.destroyed || swiperInstance.animating) {
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
  swiperInstance?.autoplay?.start()
}

onMounted(() => {
  heroSection.value?.addEventListener('pointerenter', handlePointerEnter)

  heroSection.value?.addEventListener('pointerleave', handlePointerLeave)
})

onUnmounted(() => {
  heroSection.value?.removeEventListener('pointerenter', handlePointerEnter)

  heroSection.value?.removeEventListener('pointerleave', handlePointerLeave)
})
</script>

<template>
  <section id="intro" ref="heroSection" class="relative isolate overflow-hidden">
    <Swiper
      class="hero-swiper"
      :modules="swiperModules"
      :slides-per-view="1"
      :rewind="heroSlides.length > 1"
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
        <article class="page-grid bg-[var(--color-beige)]">
          <!-- lewa część z tekstem -->
          <div
            class="col-start-2 col-end-4 row-start-1 flex min-h-[520px] items-center py-16 md:min-h-[580px] md:py-20 lg:col-end-3 lg:min-h-[680px] lg:pr-16"
          >
            <div class="hero-copy max-w-[520px]">
              <h1
                class="text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.045em]"
              >
                {{ slide.title }}
              </h1>

              <p class="mt-8 max-w-[440px] text-sm leading-6 text-stone-700">
                {{ slide.description }}
              </p>

              <div class="mt-10 flex flex-wrap gap-4">
                <!-- główny przycisk -->
                <a
                  :href="slide.primaryAction.href"
                  class="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-green)] px-6 py-3 text-sm text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  {{ slide.primaryAction.label }}
                </a>

                <!-- drugorzędny przycisk -->
                <a
                  :href="slide.secondaryAction.href"
                  class="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-green)] px-6 py-3 text-sm text-[var(--color-green)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-green)] hover:text-white active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  {{ slide.secondaryAction.label }}

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
                    <path d="M12 5v14" />
                    <path d="m6 13 6 6 6-6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- prawa część ze zdjęciem -->
          <div
            class="relative col-start-1 col-end-5 row-start-2 min-h-[380px] overflow-hidden md:min-h-[480px] lg:col-start-3 lg:row-start-1 lg:min-h-[680px]"
          >
            <img
              :src="slide.image"
              :alt="slide.imageAlt"
              class="hero-image absolute inset-0 h-full w-full object-cover"
              :style="{
                objectPosition: slide.objectPosition,
              }"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              decoding="async"
            />

            <div
              class="pointer-events-none absolute inset-0 bg-black/[0.03]"
              aria-hidden="true"
            ></div>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>

    <!-- nawigacja slidera -->
    <div
      class="absolute right-0 bottom-0 z-20 flex divide-x divide-stone-200 bg-white shadow-[-10px_-10px_30px_rgba(0,0,0,0.04)]"
    >
      <button
        type="button"
        class="group flex size-14 items-center justify-center transition-colors duration-300 hover:bg-stone-100 active:bg-stone-200 md:size-16"
        aria-label="Pokaż poprzedni slajd"
        @click="showPreviousSlide"
      >
        <svg
          class="size-5 transition-transform duration-300 group-hover:-translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="m11 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        class="group flex size-14 items-center justify-center transition-colors duration-300 hover:bg-stone-100 active:bg-stone-200 md:size-16"
        aria-label="Pokaż następny slajd"
        @click="showNextSlide"
      >
        <svg
          class="size-5 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </button>
    </div>

    <p class="sr-only" aria-live="polite">
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

:deep(.swiper-slide-active) .hero-copy > :nth-child(3) {
  transition-delay: 300ms;
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

/* wyłącz zbędne animacje dla użytkowników, którzy ograniczyli ruch w ustawieniach systemowych */
@media (prefers-reduced-motion: reduce) {
  .hero-copy > *,
  .hero-image {
    opacity: 1;
    transform: none;
    transition-duration: 0.01ms;
    transition-delay: 0ms;
  }
}
</style>
