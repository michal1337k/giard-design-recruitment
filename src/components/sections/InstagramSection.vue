<script setup>
import { instagramSection } from '@/data/instagramSection'
</script>

<template>
  <section
    id="instagram"
    class="bg-(--color-cream) py-20 text-(--color-cream) md:py-24 lg:h-119.5 lg:py-0"
  >
    <div
      v-reveal="{ distance: 20, duration: 750 }"
      class="page-grid lg:h-full lg:grid-rows-[358px] lg:pt-15"
    >
      <!-- rozciągnij zielone tło na kolumny 2–11 desktopowej siatki -->
      <div
        class="hidden bg-(--color-green) lg:col-start-2 lg:col-end-12 lg:row-start-1 lg:block"
        aria-hidden="true"
      ></div>

      <!-- zachowaj wspólną siatkę dla zawartości przez lg:contents -->
      <div
        class="col-span-full flex flex-col gap-10 bg-(--color-green) px-8 py-10 sm:px-12 sm:py-12 lg:contents"
      >
        <h2
          class="w-full text-[32px] leading-9.5 md:text-4xl md:leading-10.75 lg:col-start-3 lg:col-end-9 lg:row-start-1 lg:z-10 lg:mt-35.5 lg:text-[40px] lg:leading-12"
        >
          <span
            v-for="(line, lineIndex) in instagramSection.titleLines"
            :key="lineIndex"
            class="block"
          >
            <span
              v-for="(part, partIndex) in line"
              :key="`${lineIndex}-${partIndex}`"
              :class="
                part.type === 'heading'
                  ? 'font-heading font-normal tracking-[-2px]'
                  : 'font-medium italic tracking-[1px]'
              "
            >
              {{ part.text }}
            </span>
          </span>
        </h2>

        <div
          class="flex w-full flex-col items-start gap-6 lg:col-start-9 lg:col-end-11 lg:row-start-1 lg:z-10 lg:mt-30"
        >
          <p class="text-base leading-6 font-normal tracking-[-0.01em] text-(--color-cream)">
            <span
              v-for="line in instagramSection.descriptionLines"
              :key="line"
              class="block whitespace-nowrap"
            >
              {{ line }}
            </span>
          </p>

          <a
            :href="instagramSection.buttonHref"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11.5 w-31 items-center justify-center rounded-full bg-(--color-cream) px-6 pt-2.5 pb-3 text-base leading-6 font-normal tracking-normal text-(--color-green) transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)] focus-visible:ring-2 focus-visible:ring-(--color-cream) focus-visible:ring-offset-4 focus-visible:ring-offset-(--color-green) focus-visible:outline-none active:scale-[0.97]"
            aria-label="Otwórz profil GiardDesign na Instagramie w nowej karcie"
          >
            {{ instagramSection.buttonLabel }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
