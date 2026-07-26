<script setup>
import aboutImage from '@/assets/images/about/about-giard.png'
import { aboutSection } from '@/data/aboutSection'
</script>

<template>
  <section
    id="about"
    class="overflow-hidden bg-[var(--color-green)] text-[var(--color-cream)] lg:h-[720px]"
  >
    <div class="page-grid lg:h-full">
      <!--
        Zdjęcie:
        - zajmuje kolumny 1–6,
        - wychodzi poza lewą krawędź siatki,
        - zostaje przyklejone do lewej krawędzi ekranu.
      -->
      <div
        class="about-media group relative left-1/2 col-span-full h-[320px] w-screen -translate-x-1/2 overflow-hidden sm:h-[420px] lg:left-auto lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:h-[720px] lg:w-auto lg:translate-x-0"
      >
        <img
          :src="aboutImage"
          alt="Nowoczesna aranżacja ogrodu przy domu"
          class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!--
        Prawa część:
        - zajmuje kolumny 7–12,
        - w całości pozostaje wewnątrz siatki,
      -->
      <div
        class="col-span-full py-12 sm:py-16 lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:flex lg:h-[720px] lg:items-center lg:py-0"
      >
        <!-- Kontener z Figmy -->
        <div
          v-reveal="{ distance: 20 }"
          class="flex w-full flex-col gap-12 lg:h-[450px] lg:max-w-[596px] lg:gap-[72px] lg:pl-[96px]"
        >
          <!-- Text -->
          <div class="flex flex-col gap-[16px] lg:h-[328px] lg:w-[500px]">
            <!-- Navi small -->
            <p
              class="w-fit text-[12px] leading-[18px] font-normal tracking-[-0.12px] text-[var(--color-cream)]"
            >
              {{ aboutSection.label }}
            </p>

            <!-- Text2 -->
            <div class="flex flex-col gap-[40px] lg:h-[294px] lg:w-[500px]">
              <!-- Nagłówek -->
              <h2
                class="text-[40px] leading-[46px] md:text-[44px] md:leading-[51px] lg:h-[110px] lg:w-[250px] lg:text-[48px] lg:leading-[55px]"
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
                        ? '[font-family:var(--font-heading)] font-medium tracking-[-0.03em]'
                        : '[font-family:var(--font-body)] font-medium italic tracking-normal'
                    "
                  >
                    {{ part.text }}
                  </span>
                </span>
              </h2>

              <!-- Opis -->
              <p
                class="text-[16px] leading-[24px] font-normal tracking-[-0.16px] text-[var(--color-cream)] lg:h-[144px] lg:w-[500px]"
              >
                {{ aboutSection.description }}
              </p>
            </div>
          </div>

          <!-- Button -->
          <a
            :href="aboutSection.buttonHref"
            class="group inline-flex h-[50px] w-fit items-center gap-[8px] rounded-[200px] border border-[var(--color-cream)] px-[22px] pt-[12px] pb-[14px] text-[16px] leading-[24px] font-normal tracking-normal text-[var(--color-cream)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-cream)] hover:text-[var(--color-green)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-green)] focus-visible:outline-none lg:h-[50px] lg:w-[194px]"
          >
            <span class="whitespace-nowrap">
              {{ aboutSection.buttonLabel }}
            </span>

            <svg
              class="size-[16px] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
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
/*
  ujemny margin przesuwa zdjęcie od początku pierwszej kolumny do lewej krawędzi viewportu.
*/
@media (width >= 1024px) {
  .about-media {
    width: calc(100% + ((100vw - var(--page-grid-width)) / 2));
    margin-left: calc((100vw - var(--page-grid-width)) / -2);
  }
}
</style>
