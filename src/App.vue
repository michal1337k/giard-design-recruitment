<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

import HeroSection from '@/components/sections/HeroSection.vue'
import OfferSection from '@/components/sections/OfferSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import InstagramSection from '@/components/sections/InstagramSection.vue'
</script>

<template>
  <AppHeader />

  <main>
    <HeroSection />
    <OfferSection />
    <AboutSection />
    <ProjectsSection />
    <InstagramSection />
  </main>

  <AppFooter />
</template>
