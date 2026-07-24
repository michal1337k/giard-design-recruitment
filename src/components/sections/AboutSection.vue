<script setup>
import aboutImage from '@/assets/images/about/about-giard.png'
import { aboutSection } from '@/data/aboutSection'
</script>

<template>
  <section
    id="about"
    class="overflow-hidden bg-[var(--color-green)] text-[var(--color-cream)] lg:h-[720px]"
  >
    <div class="flex flex-col lg:h-full lg:flex-row">
      <!-- zdjęcie -->
      <div
        class="group relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[720px] lg:w-[688px] lg:shrink-0"
      >
        <img
          :src="aboutImage"
          alt="Nowoczesna aranżacja ogrodu przy domu"
          class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- zielona prawa część -->
      <div class="flex-1">
        <div
          class="px-6 py-12 sm:px-10 sm:py-16 lg:ml-[64px] lg:h-[450px] lg:w-[596px] lg:px-0 lg:pt-[135px] lg:pb-0"
        >
          <div class="flex flex-col gap-12 lg:h-full lg:w-full lg:gap-[72px] lg:pl-[96px]">
            <div class="flex flex-col gap-[16px] lg:h-[328px] lg:w-[500px]">
              <p
                class="w-fit text-[12px] leading-[18px] font-normal tracking-[-0.12px] text-[var(--color-cream)]"
              >
                {{ aboutSection.label }}
              </p>
              <div class="flex flex-col gap-[40px] lg:h-[294px] lg:w-[500px]">
                <h2
                  class="text-[40px] leading-[46px] md:text-[44px] md:leading-[51px] lg:h-[110px] lg:w-[250px] lg:text-[48px] lg:leading-[55px]"
                >
                  <span
                    v-for="(line, lineIndex) in aboutSection.titleLines"
                    :key="lineIndex"
                    class="block"
                  >
                    <span
                      v-for="(part, partIndex) in line"
                      :key="`${lineIndex}-${partIndex}`"
                      :class="
                        part.type === 'heading'
                          ? '[font-family:var(--font-heading)] font-medium tracking-[-0.03em]'
                          : '[font-family:var(--font-body)] font-medium italic tracking-normal'
                      "
                    >
                      {{ part.text }}
                    </span>
                  </span>
                </h2>

                <!-- opis -->
                <p
                  class="text-[16px] leading-[24px] font-normal tracking-[-0.16px] text-[var(--color-cream)] lg:h-[144px] lg:w-[500px]"
                >
                  {{ aboutSection.description }}
                </p>
              </div>
            </div>

            <!-- button -->
            <a
              :href="aboutSection.buttonHref"
              class="group inline-flex h-[50px] w-fit items-center gap-[8px] rounded-[200px] border border-[var(--color-cream)] px-[22px] pt-[12px] pb-[14px] text-[16px] leading-[24px] font-normal tracking-normal text-[var(--color-cream)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-cream)] hover:text-[var(--color-green)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-cream)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-green)] focus-visible:outline-none lg:h-[50px] lg:w-[194px]"
            >
              <span class="whitespace-nowrap">
                {{ aboutSection.buttonLabel }}
              </span>

              <!-- strzałka -->
              <svg
                class="size-[16px] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M1 8h14" />
                <path d="m9 2 6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
