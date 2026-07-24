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
        <!--
    Cały article jest pojedynczym slajdem:
    - tekst i zdjęcie zmieniają się razem,
    - tło obejmuje pełną szerokość viewportu.
  -->
        <article class="relative bg-[var(--color-beige)] lg:h-[737px]">
          <div class="page-grid lg:h-[737px]">
            <!--
              Lewa część:
              - desktop: kolumny 1–6,
            -->
            <div
              class="col-span-full row-start-1 flex min-h-[520px] items-center py-16 md:min-h-[580px] md:py-20 lg:col-start-1 lg:col-end-7 lg:h-[737px] lg:min-h-0 lg:py-0"
            >
              <div class="hero-copy flex w-full flex-col gap-[72px] lg:h-[448px] lg:w-[599px]">
                <!-- grupa Text -->
                <div class="flex flex-col gap-[44px]">
                  <h1
                    class="font-heading w-full text-[42px] leading-[48px] font-medium tracking-normal md:text-[50px] md:leading-[58px] lg:h-[210px] lg:w-[599px] lg:text-[60px] lg:leading-[70px]"
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
                    class="w-full max-w-[489px] text-[16px] leading-[24px] font-normal text-stone-700 lg:h-[72px] lg:w-[489px]"
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

                <!-- grupa Buttons -->
                <div class="flex w-full flex-wrap gap-4 lg:w-[493px] lg:flex-nowrap lg:gap-[36px]">
                  <a
                    :href="slide.primaryAction.href"
                    class="inline-flex h-[50px] w-full shrink-0 items-center justify-center whitespace-nowrap rounded-[200px] bg-[var(--color-green)] px-[24px] text-[16px] leading-[24px] font-normal text-[var(--color-cream)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto lg:w-[208px]"
                  >
                    {{ slide.primaryAction.label }}
                  </a>

                  <a
                    :href="slide.secondaryAction.href"
                    class="group inline-flex h-[50px] w-full shrink-0 items-center justify-between whitespace-nowrap rounded-[200px] border border-[var(--color-green)] bg-transparent px-[22px] text-[16px] leading-[24px] font-normal text-[var(--color-green)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-green)] hover:text-white active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto lg:w-[249px]"
                  >
                    <span>
                      {{ slide.secondaryAction.label }}
                    </span>

                    <svg
                      class="size-[16px] shrink-0 transition-transform duration-300 group-hover:translate-y-1"
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

            <!--
              Prawa część:
              - zaczyna się na początku 7 kolumny,
              - kończy siatkę na końcu 12 kolumny,
              - następnie rozszerza się aż do prawej krawędzi ekranu.
            -->
            <div
              class="hero-media relative col-span-full row-start-2 min-h-[380px] overflow-hidden md:min-h-[480px] lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:h-[737px] lg:min-h-0"
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

              <div
                class="pointer-events-none absolute inset-0 bg-black/[0.03]"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>

    <!-- nawigacja slidera -->
    <div
      class="absolute right-0 bottom-0 z-50 flex h-[96px] w-[192px] items-center gap-[32px] bg-[var(--color-cream)] px-[32px]"
    >
      <button
        type="button"
        class="group flex size-[48px] shrink-0 items-center justify-center transition-opacity duration-300 hover:opacity-55 active:scale-95"
        aria-label="Pokaż poprzedni slajd"
        @click.stop="showPreviousSlide"
      >
        <svg
          class="h-[16px] w-[24.29px] shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
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
        class="group flex size-[48px] shrink-0 items-center justify-center transition-opacity duration-300 hover:opacity-55 active:scale-95"
        aria-label="Pokaż następny slajd"
        @click.stop="showNextSlide"
      >
        <svg
          class="h-[16px] w-[24.29px] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
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

/* na desktopie element zajmuje kolumny 7–12 i wychodzi poza prawą krawędź siatki aż do prawej krawędzi viewportu */
@media (width >= 1024px) {
  .hero-media {
    width: calc(100% + ((100vw - var(--page-grid-width)) / 2));
  }
}
</style>
