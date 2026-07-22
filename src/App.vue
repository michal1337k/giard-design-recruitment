<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import OfferSection from '@/components/sections/OfferSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
</script>

<template>
  <AppHeader />

  <main>
    <HeroSection />
    <OfferSection />
    <AboutSection />
    <ProjectsSection />

    <section
      id="contact"
      class="flex min-h-[500px] items-center justify-center bg-[#1d6337] px-6 text-white"
    >
      <h2 class="text-4xl font-semibold">Kontakt</h2>
    </section>
  </main>
</template>
