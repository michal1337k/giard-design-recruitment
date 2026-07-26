<script setup>
import aboutImage from '@/assets/images/about/about-giard.webp'
import { aboutSection } from '@/data/aboutSection'
</script>

<template>
  <section id="about" class="overflow-hidden bg-(--color-green) text-(--color-cream) lg:h-180">
    <div class="page-grid lg:h-full">
      <!-- rozszerz zdjęcie od kolumn 1–6 do lewej krawędzi viewportu -->
      <div
        class="about-media group relative left-1/2 col-span-full h-80 w-screen -translate-x-1/2 overflow-hidden sm:h-105 lg:left-auto lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:h-180 lg:w-auto lg:translate-x-0"
      >
        <img
          :src="aboutImage"
          :alt="aboutSection.imageAlt"
          class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1200 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        class="col-span-full py-12 sm:py-16 lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:flex lg:h-180 lg:items-center lg:py-0"
      >
        <div
          v-reveal="{ distance: 20 }"
          class="flex w-full flex-col gap-12 lg:max-w-149 lg:gap-18 lg:pl-24"
        >
          <div class="flex flex-col gap-4">
            <p
              class="w-fit text-xs leading-4.5 font-normal tracking-[-0.01em] text-(--color-cream)"
            >
              {{ aboutSection.label }}
            </p>

            <div class="flex w-full flex-col gap-10">
              <h2
                class="text-[40px] leading-11.5 md:text-[44px] md:leading-12.75 lg:text-5xl lg:leading-13.75"
              >
                <span
                  v-for="(line, lineIndex) in aboutSection.titleLines"
                  :key="lineIndex"
                  class="block"
                >
                  <span
                    v-for="(part, partIndex) in line"
                    :key="`${lineIndex}-${partIndex}`"
                    :class="
                      part.type === 'heading'
                        ? 'font-heading font-medium tracking-[-0.03em]'
                        : 'font-medium italic tracking-normal'
                    "
                  >
                    {{ part.text }}
                  </span>
                </span>
              </h2>

              <p
                class="w-full text-base leading-6 font-normal tracking-[-0.01em] text-(--color-cream)"
              >
                {{ aboutSection.description }}
              </p>
            </div>
          </div>

          <a
            :href="aboutSection.buttonHref"
            class="group inline-flex h-12.5 w-fit items-center gap-2 rounded-full border border-(--color-cream) px-5.5 pt-3 pb-3.5 text-base leading-6 font-normal tracking-normal text-(--color-cream) transition-all duration-300 hover:-translate-y-1 hover:bg-(--color-cream) hover:text-(--color-green) focus-visible:ring-2 focus-visible:ring-(--color-cream) focus-visible:ring-offset-4 focus-visible:ring-offset-(--color-green) focus-visible:outline-none active:scale-[0.97] lg:w-48.5"
          >
            <span class="whitespace-nowrap">
              {{ aboutSection.buttonLabel }}
            </span>

            <svg
              class="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M1 8h14" />
              <path d="m9 2 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* rozszerz zdjęcie od siatki do lewej krawędzi viewportu */
@media (width >= 1024px) {
  .about-media {
    width: calc(100% + ((100vw - var(--page-grid-width)) / 2));
    margin-left: calc((100vw - var(--page-grid-width)) / -2);
  }
}
</style>
