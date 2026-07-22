<script setup>
import { footerLinks } from '@/data/footerLinks'
</script>

<template>
  <footer class="bg-[#111111] text-white">
    <div class="page-grid">
      <div class="col-start-2 col-end-4 py-14 md:py-16">
        <!-- pierwszy rząd stopki -->
        <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <!-- tymczasowe logo tekstowe -->
          <a
            href="#intro"
            class="inline-flex w-fit text-lg font-semibold tracking-[-0.04em] transition-opacity hover:opacity-70"
            aria-label="Przejdź na początek strony"
          >
            giard<span class="font-normal">design</span>
          </a>

          <div class="flex flex-col gap-5 sm:flex-row sm:items-center md:justify-end">
            <p class="text-sm text-white/80">Daj znać, co możemy dla Ciebie zrobić!</p>

            <a
              href="mailto:giarddesign@kontakt.pl"
              class="inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-green)] px-6 py-3 text-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black focus-visible:outline-none"
            >
              Skontaktuj się z nami
            </a>
          </div>
        </div>

        <!-- linia oddzielająca sekcje stopki -->
        <div class="my-10 h-px bg-white/30"></div>

        <!-- środkowy rząd: nawigacja i dane kontaktowe -->
        <div class="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <nav
            class="flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/70"
            aria-label="Nawigacja w stopce"
          >
            <a
              v-for="link in footerLinks"
              :key="link.label"
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="transition-colors hover:text-white"
            >
              {{ link.label }}
            </a>
          </nav>

          <div class="flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:gap-8">
            <a href="tel:+48000000000" class="transition-colors hover:text-white"> 000-000-000 </a>

            <a href="mailto:giarddesign@kontakt.pl" class="transition-colors hover:text-white">
              giarddesign@kontakt.pl
            </a>
          </div>
        </div>

        <!-- dolny rząd -->
        <div
          class="mt-14 flex flex-col gap-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>Prawa zastrzeżone © 2022</p>

          <p class="flex items-center gap-2">
            <span>made by</span>

            <a
              href="https://adrespect.pl/"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-white transition-opacity hover:opacity-70"
              aria-label="Przejdź na stronę adRespect"
            >
              <span class="text-sky-400">ad</span>Respect
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
