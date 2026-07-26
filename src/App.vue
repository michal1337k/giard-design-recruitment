<script setup>
import { defineAsyncComponent } from 'vue'

import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

import AboutSection from '@/components/sections/AboutSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import InstagramSection from '@/components/sections/InstagramSection.vue'
import OfferSection from '@/components/sections/OfferSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'

const isDevelopment = import.meta.env.DEV

// ładuj nakładkę projektową dopiero w środowisku dev
const DesignOverlay = defineAsyncComponent(() => import('@/components/dev/DesignOverlay.vue'))
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

  <DesignOverlay v-if="isDevelopment" />
</template>
