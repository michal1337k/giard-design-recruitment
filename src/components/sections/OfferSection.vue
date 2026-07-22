<script setup>
import OfferCard from '@/components/ui/OfferCard.vue'
import { offerItems } from '@/data/offerItems'
</script>

<template>
  <section id="offer" class="bg-[var(--color-cream)] py-24 md:py-28 lg:py-36">
    <div class="page-grid">
      <div class="col-start-2 col-end-4">
        <!-- nagłówek sekcji -->
        <div class="max-w-[760px]">
          <p class="text-xs font-medium tracking-[0.16em] text-[var(--color-green)] uppercase">
            Oferta
          </p>

          <h2 class="mt-4 text-4xl leading-tight font-medium tracking-[-0.04em] md:text-5xl">
            Działamy
            <em class="font-normal">kompleksowo</em>
          </h2>

          <p class="mt-7 max-w-[720px] text-sm leading-6 text-stone-600">
            Oferujemy kompleksową obsługę inwestycji terenów zielonych. Projektujemy nowoczesne
            ogrody przydomowe oraz rezydencjonalne. Stworzymy dla Ciebie projekt, zrealizujemy go i
            otoczymy pielęgnacją, aby każdy etap został wykonany z należytą dokładnością.
          </p>
        </div>

        <!-- na telefonie wyświetl jedną kolumnę, od szerokości md dwie, a od lg trzy kolumny -->
        <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <OfferCard v-for="item in offerItems" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>
