<script setup>
import OfferCard from '@/components/ui/OfferCard.vue'
import { offerItems } from '@/data/offerItems'
import { offerDescriptionLines } from '@/data/offerDescription'
</script>

<template>
  <section
    id="offer"
    class="bg-[var(--color-cream)] px-[var(--page-gutter)] py-20 md:py-24 lg:h-[939px] lg:px-0 lg:pt-[120px] lg:pb-[160px]"
  >
    <div class="flex flex-col items-center gap-16 lg:gap-[96px]">
      <div class="flex w-full max-w-[1040px] flex-col gap-[16px] lg:h-[193px]">
        <p
          class="h-[18px] w-fit text-[12px] leading-[18px] font-normal tracking-[-0.01em] text-[var(--color-green)]"
        >
          Oferta
        </p>

        <div class="flex w-full max-w-[709px] flex-col gap-[32px] lg:h-[159px]">
          <h2
            class="text-[40px] leading-[46px] md:text-[44px] md:leading-[51px] lg:translate-y-[-1px] lg:text-[48px] lg:leading-[55px] lg:whitespace-nowrap"
          >
            <span class="[font-family:var(--font-heading)] font-medium tracking-[-0.03em]">
              Działamy </span
            ><span class="[font-family:var(--font-body)] font-medium italic tracking-normal">
              kompleksowo
            </span>
          </h2>

          <p
            class="w-full max-w-[709px] text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-stone-700 lg:h-[72px] lg:w-[709px]"
          >
            <span v-for="(line, index) in offerDescriptionLines" :key="line" class="lg:block">
              {{ line
              }}<span v-if="index < offerDescriptionLines.length - 1" class="lg:hidden"
                >&nbsp;</span
              >
            </span>
          </p>
        </div>
      </div>

      <div
        class="grid w-full max-w-[1262px] grid-cols-1 gap-6 md:grid-cols-2 lg:h-[370px] lg:grid-cols-3 lg:gap-[64px]"
      >
        <OfferCard v-for="item in offerItems" :key="item.id" :item="item" />
      </div>
    </div>
  </section>
</template>
