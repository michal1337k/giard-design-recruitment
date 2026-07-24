<script setup>
import { instagramSection } from '@/data/instagramSection'
</script>

<template>
  <section
    id="instagram"
    class="bg-[var(--color-cream)] py-20 text-[var(--color-cream)] md:py-24 lg:h-[478px] lg:py-0"
  >
    <div class="page-grid lg:h-full lg:grid-rows-[358px] lg:pt-[60px]">
      <!--
        Desktopowe tło:
        - globalne kolumny 2–11
      -->
      <div
        class="hidden bg-[var(--color-green)] lg:col-start-2 lg:col-end-12 lg:row-start-1 lg:block"
        aria-hidden="true"
      ></div>

      <!--
        na mobile jest  zielony kontener.
      -->
      <div
        class="col-span-full flex flex-col gap-10 bg-[var(--color-green)] px-8 py-10 sm:px-12 sm:py-12 lg:contents"
      >
        <!--
          Headline:
          - globalne kolumny 3–8,
        -->
        <h2
          class="w-full text-[32px] leading-[38px] md:text-[36px] md:leading-[43px] lg:col-start-3 lg:col-end-9 lg:row-start-1 lg:z-10 lg:mt-[142px] lg:h-[96px] lg:text-[40px] lg:leading-[48px]"
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
                  ? '[font-family:var(--font-heading)] font-normal tracking-[-2px]'
                  : '[font-family:var(--font-body)] font-medium italic tracking-[1px]'
              "
            >
              {{ part.text }}
            </span>
          </span>
        </h2>

        <!--
          Text + button:
          - globalne kolumny 9–10
        -->
        <div
          class="flex w-full flex-col items-start gap-[24px] lg:col-start-9 lg:col-end-11 lg:row-start-1 lg:z-10 lg:mt-[120px] lg:h-[118px]"
        >
          <p
            class="text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-[var(--color-cream)] lg:h-[48px]"
          >
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
            rel="noreferrer"
            class="inline-flex h-[46px] w-[124px] items-center justify-center rounded-[200px] bg-[var(--color-cream)] px-[24px] pt-[10px] pb-[12px] text-[16px] leading-[24px] font-normal tracking-normal text-[var(--color-green)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-green)] focus-visible:outline-none"
          >
            {{ instagramSection.buttonLabel }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
