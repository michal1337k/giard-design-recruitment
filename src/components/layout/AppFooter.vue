<script setup>
import adRespectLogo from '@/assets/icons/footer/adrespect-logo.svg'
import footerLogo from '@/assets/icons/footer/giarddesign.svg'
import { footerData } from '@/data/footerData'
</script>

<template>
  <footer class="bg-[#111111] py-14 text-white md:py-16 lg:h-[499px] lg:py-[80px]">
    <div class="page-grid lg:h-full">
      <!--
        Główna zawartość:
        - kolumny 2–11
      -->
      <div
        class="col-span-full flex flex-col gap-14 lg:col-start-2 lg:col-end-12 lg:h-full lg:gap-[120px]"
      >
        <!-- Text1 -->
        <div class="flex flex-col gap-10 lg:h-[195px] lg:w-full lg:gap-[62px]">
          <!-- Line1 -->
          <div
            class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between lg:h-[50px] lg:w-full"
          >
            <!-- Logo -->
            <a
              :href="footerData.logo.href"
              class="inline-flex h-[19px] w-[114.37px] shrink-0 transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] focus-visible:outline-none"
              :aria-label="footerData.logo.ariaLabel"
            >
              <img :src="footerLogo" alt="GiardDesign" class="block h-[19px] w-[114.37px]" />
            </a>

            <!-- CTA -->
            <div
              class="flex flex-col gap-5 sm:flex-row sm:items-center lg:h-[50px] lg:w-[522px] lg:shrink-0 lg:flex-nowrap lg:gap-[24px]"
            >
              <p
                class="whitespace-nowrap text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-white lg:w-[290px] lg:shrink-0"
              >
                {{ footerData.cta.text }}
              </p>

              <a
                :href="footerData.cta.buttonHref"
                class="inline-flex h-[50px] w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-[200px] bg-[var(--color-green)] px-[24px] pt-[12px] pb-[14px] text-[16px] leading-[24px] font-normal tracking-normal text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] focus-visible:outline-none lg:w-[208px]"
              >
                {{ footerData.cta.buttonLabel }}
              </a>
            </div>
          </div>

          <!-- Linia -->
          <div class="h-0 w-full border-t border-[#4f4f4f]" aria-hidden="true"></div>

          <!-- Line2 -->
          <div
            class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between lg:h-[21px] lg:w-full"
          >
            <!-- Links -->
            <nav
              class="flex flex-wrap items-center gap-x-8 gap-y-4 text-[14px] leading-[21px] font-normal tracking-[-0.01em] text-white md:gap-x-[48px] lg:h-[21px] lg:w-[379px] lg:flex-nowrap"
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

            <!-- Kontakt -->
            <div
              class="flex flex-col gap-4 text-[14px] leading-[21px] font-normal tracking-[-0.01em] text-white sm:flex-row sm:items-center lg:h-[21px] lg:w-[293px] lg:shrink-0 lg:flex-nowrap lg:gap-[48px]"
            >
              <a
                :href="footerData.contact.phone.href"
                class="shrink-0 whitespace-nowrap transition-opacity hover:opacity-65 lg:w-[91px]"
              >
                {{ footerData.contact.phone.label }}
              </a>

              <a
                :href="footerData.contact.email.href"
                class="shrink-0 whitespace-nowrap transition-opacity hover:opacity-65 lg:w-[154px]"
              >
                {{ footerData.contact.email.label }}
              </a>
            </div>
          </div>
        </div>

        <!-- Text2 -->
        <div
          class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:h-[24px] lg:w-full"
        >
          <!-- Copyright -->
          <p
            class="shrink-0 whitespace-nowrap text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-white lg:w-[203px]"
          >
            {{ footerData.copyright }}
          </p>

          <!-- Made by -->
          <div class="flex h-[24px] w-[194px] shrink-0 flex-nowrap items-center gap-[16px]">
            <span
              class="w-[65px] shrink-0 whitespace-nowrap text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-[#a8a8a8]"
            >
              {{ footerData.madeBy.text }}
            </span>

            <a
              :href="footerData.madeBy.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-[23px] w-[113px] shrink-0 transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] focus-visible:outline-none"
              :aria-label="footerData.madeBy.ariaLabel"
            >
              <img :src="adRespectLogo" alt="adRespect" class="block h-[23px] w-[113px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
