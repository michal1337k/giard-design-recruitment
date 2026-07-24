<script setup>
import { instagramSection } from '@/data/instagramSection'
</script>

<template>
  <section
    id="instagram"
    class="bg-[var(--color-cream)] px-[var(--page-gutter)] py-20 md:py-24 lg:h-[588px] lg:px-0 lg:pt-[60px] lg:pb-0"
  >
    <div
      class="mx-auto flex w-full max-w-[1040px] flex-col gap-10 bg-[var(--color-green)] px-8 py-10 text-[var(--color-cream)] sm:px-12 sm:py-12 lg:h-[358px] lg:w-[1040px] lg:max-w-none lg:flex-row lg:items-end lg:gap-[64px] lg:px-[110px] lg:py-[120px]"
    >
      <h2
        class="w-full text-[32px] leading-[38px] md:text-[36px] md:leading-[43px] lg:h-[96px] lg:w-[599px] lg:shrink-0 lg:text-[40px] lg:leading-[48px]"
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

      <div
        class="flex w-full flex-col items-start gap-[24px] lg:h-[118px] lg:w-[157px] lg:shrink-0"
      >
        <p
          class="text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-[var(--color-cream)] lg:h-[48px] lg:w-[157px]"
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
  </section>
</template>
