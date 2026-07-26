<script setup>
import OfferCard from '@/components/ui/OfferCard.vue'
import { offerItems } from '@/data/offerItems'
import { offerDescriptionLines } from '@/data/offerDescription'
</script>

<template>
  <section
    id="offer"
    class="bg-[var(--color-cream)] px-[var(--page-gutter)] py-20 md:py-24 lg:px-0 lg:pt-[120px] lg:pb-[160px]"
  >
    <div class="page-grid">
      <!--
        Frame 2308:
        - zaczyna się na kolumnie 2,
        - kończy wraz z kolumną 11,
      -->
      <div v-reveal class="col-span-full flex flex-col gap-[16px] lg:col-start-2 lg:col-end-12">
        <!-- Navi small -->
        <p
          class="h-[18px] w-fit text-[12px] leading-[18px] font-normal tracking-[-0.01em] text-[var(--color-green)]"
        >
          Oferta
        </p>

        <!-- Text -->
        <div class="flex w-full max-w-[709px] flex-col gap-[32px]">
          <h2
            class="text-[40px] leading-[46px] md:text-[44px] md:leading-[51px] lg:text-[48px] lg:leading-[55px]"
          >
            <span class="[font-family:var(--font-heading)] font-medium tracking-[-0.03em]">
              Działamy </span
            ><span class="[font-family:var(--font-body)] font-medium italic tracking-normal">
              kompleksowo
            </span>
          </h2>

          <p
            class="w-full max-w-[709px] text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-stone-700"
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

      <!--
        Cards:
        - zajmują całą szerokość głównej siatki,
        - każda karta zajmuje 4 z 12 kolumn,
        - gutter między kartami pochodzi z globalnej siatki.
      -->
      <div
        class="col-span-full mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-[96px] lg:grid-cols-12 lg:gap-x-[var(--grid-gutter)] lg:gap-y-0"
      >
        <div
          v-for="(item, index) in offerItems"
          :key="item.id"
          v-reveal="{ delay: index * 90 }"
          class="lg:col-span-4"
        >
          <OfferCard :item="item" class="h-full" />
        </div>
      </div>
    </div>
  </section>
</template>
