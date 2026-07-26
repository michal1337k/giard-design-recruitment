<script setup>
import OfferCard from '@/components/ui/OfferCard.vue'

import { offerDescriptionLines } from '@/data/offerDescription'
import { offerItems } from '@/data/offerItems'
</script>

<template>
  <section
    id="offer"
    class="bg-(--color-cream) px-(--page-gutter) py-20 md:py-24 lg:px-0 lg:pt-30 lg:pb-40"
  >
    <div class="page-grid">
      <!-- wyrównaj treść sekcji z kolumnami 2–11 -->
      <div v-reveal class="col-span-full flex flex-col gap-4 lg:col-start-2 lg:col-end-12">
        <p
          class="h-4.5 w-fit text-xs leading-4.5 font-normal tracking-[-0.01em] text-(--color-green)"
        >
          Oferta
        </p>

        <div class="flex w-full max-w-177.25 flex-col gap-8">
          <h2
            class="text-[40px] leading-11.5 md:text-[44px] md:leading-12.75 lg:text-5xl lg:leading-13.75"
          >
            <span class="font-heading font-medium tracking-[-0.03em]"> Działamy </span>

            <span class="font-medium italic tracking-normal"> kompleksowo </span>
          </h2>

          <p
            class="w-full max-w-177.25 text-base leading-6 font-normal tracking-[-0.01em] text-stone-700"
          >
            <span v-for="(line, index) in offerDescriptionLines" :key="line" class="lg:block">
              {{ line }}

              <span v-if="index < offerDescriptionLines.length - 1" class="lg:hidden">
                &nbsp;
              </span>
            </span>
          </p>
        </div>
      </div>

      <!-- rozłóż każdą kartę na czterech kolumnach desktopowej siatki -->
      <div
        class="col-span-full mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-x-(--grid-gutter) lg:gap-y-0"
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
