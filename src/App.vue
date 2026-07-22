<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
</script>

<template>
  <AppHeader />

  <main>
    <HeroSection />

    <section id="about" class="flex min-h-[500px] items-center justify-center bg-stone-100 px-6">
      <h2 class="text-4xl font-semibold">O firmie</h2>
    </section>

    <section id="projects" class="flex min-h-[500px] items-center justify-center bg-[#dfc2a8] px-6">
      <h2 class="text-4xl font-semibold">Realizacje</h2>
    </section>

    <section
      id="contact"
      class="flex min-h-[500px] items-center justify-center bg-[#1d6337] px-6 text-white"
    >
      <h2 class="text-4xl font-semibold">Kontakt</h2>
    </section>
  </main>
</template>
