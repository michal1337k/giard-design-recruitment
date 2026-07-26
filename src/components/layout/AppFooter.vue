<script setup>
import adRespectLogo from '@/assets/icons/footer/adrespect-logo.svg'
import footerLogo from '@/assets/icons/footer/giarddesign.svg'

import { footerData } from '@/data/footerData'
</script>

<template>
  <footer id="contact" class="bg-(--color-dark) py-14 text-white md:py-16 lg:h-124.75 lg:py-20">
    <div class="page-grid lg:h-full">
      <!-- wyrównaj zawartość stopki z kolumnami 2–11 -->
      <div
        class="col-span-full flex flex-col gap-14 lg:col-start-2 lg:col-end-12 lg:h-full lg:gap-30"
      >
        <div class="flex flex-col gap-10 lg:h-48.75 lg:w-full lg:gap-15.5">
          <div
            class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between lg:h-12.5 lg:w-full"
          >
            <a
              :href="footerData.logo.href"
              class="inline-flex h-4.75 w-[114.37px] shrink-0 transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-(--color-dark) focus-visible:outline-none"
              :aria-label="footerData.logo.ariaLabel"
            >
              <img :src="footerLogo" alt="GiardDesign" class="block h-4.75 w-[114.37px]" />
            </a>

            <div
              class="flex flex-col gap-5 sm:flex-row sm:items-center lg:h-12.5 lg:w-130.5 lg:shrink-0 lg:flex-nowrap lg:gap-6"
            >
              <p
                class="text-base leading-6 font-normal tracking-[-0.01em] text-white lg:w-72.5 lg:shrink-0 lg:whitespace-nowrap"
              >
                {{ footerData.cta.text }}
              </p>

              <a
                :href="footerData.cta.buttonHref"
                class="inline-flex h-12.5 w-fit shrink-0 items-center justify-center rounded-full bg-(--color-green) px-6 pt-3 pb-3.5 text-base leading-6 font-normal tracking-normal whitespace-nowrap text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-(--color-dark) focus-visible:outline-none active:scale-[0.97] lg:w-52"
              >
                {{ footerData.cta.buttonLabel }}
              </a>
            </div>
          </div>

          <div class="h-0 w-full border-t border-[#4f4f4f]" aria-hidden="true"></div>

          <div
            class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between lg:h-5.25 lg:w-full"
          >
            <nav
              class="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm leading-5.25 font-normal tracking-[-0.01em] text-white md:gap-x-12 lg:h-5.25 lg:w-94.75 lg:flex-nowrap"
              aria-label="Nawigacja w stopce"
            >
              <a
                v-for="link in footerData.links"
                :key="link.label"
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="shrink-0 whitespace-nowrap transition-opacity hover:opacity-65"
              >
                {{ link.label }}
              </a>
            </nav>

            <div
              class="flex flex-col gap-4 text-sm leading-5.25 font-normal tracking-[-0.01em] text-white sm:flex-row sm:items-center lg:h-5.25 lg:w-73.25 lg:shrink-0 lg:flex-nowrap lg:gap-12"
            >
              <a
                :href="footerData.contact.phone.href"
                class="shrink-0 whitespace-nowrap transition-opacity hover:opacity-65 lg:w-22.75"
              >
                {{ footerData.contact.phone.label }}
              </a>

              <a
                :href="footerData.contact.email.href"
                class="shrink-0 whitespace-nowrap transition-opacity hover:opacity-65 lg:w-38.5"
              >
                {{ footerData.contact.email.label }}
              </a>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:h-6 lg:w-full"
        >
          <p
            class="shrink-0 whitespace-nowrap text-base leading-6 font-normal tracking-[-0.01em] text-white lg:w-50.75"
          >
            {{ footerData.copyright }}
          </p>

          <div class="flex h-6 w-48.5 shrink-0 flex-nowrap items-center gap-4">
            <span
              class="w-16.25 shrink-0 whitespace-nowrap text-base leading-6 font-normal tracking-[-0.01em] text-[#a8a8a8]"
            >
              {{ footerData.madeBy.text }}
            </span>

            <a
              :href="footerData.madeBy.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-5.75 w-28.25 shrink-0 transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-(--color-dark) focus-visible:outline-none"
              :aria-label="footerData.madeBy.ariaLabel"
            >
              <img :src="adRespectLogo" alt="adRespect" class="block h-5.75 w-28.25" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
