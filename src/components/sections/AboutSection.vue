<script setup>
import aboutImage from '@/assets/images/about/about-giard.png'
</script>

<template>
  <section id="about" class="page-grid">
    <!-- zdjęcie -->
    <div
      class="group relative col-start-1 col-end-5 row-start-1 min-h-[340px] overflow-hidden md:min-h-[440px] lg:col-end-3 lg:min-h-[640px]"
    >
      <img
        :src="aboutImage"
        alt="Nowoczesny ogród przy domu zaprojektowany przez GiardDesign"
        class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
    </div>

    <!-- zielone tło -->
    <div
      class="col-start-1 col-end-5 row-start-2 bg-[var(--color-green)] lg:col-start-3 lg:row-start-1"
      aria-hidden="true"
    ></div>

    <!-- treść sekcji -->
    <div
      class="relative z-10 col-start-2 col-end-4 row-start-2 flex min-h-[500px] items-center py-20 text-white lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:min-h-[640px] lg:py-24 lg:pl-16"
    >
      <div class="max-w-[470px]">
        <p class="text-xs font-medium tracking-[0.16em] text-white/70 uppercase">O firmie</p>

        <h2 class="mt-4 text-4xl leading-[1.1] font-medium tracking-[-0.04em] md:text-5xl">
          Tworzymy
          <em class="block font-normal">z pasją</em>
        </h2>

        <p class="mt-8 text-sm leading-6 text-white/85">
          Każdy projekt to nowa przygoda. Dlatego nasz zespół tworzą wykwalifikowani projektanci
          oraz architekci, których zadaniem jest rozpoznanie i realizacja potrzeb każdego Klienta.
        </p>

        <p class="mt-4 text-sm leading-6 text-white/85">
          Nasza specjalizacja to przestrzenie nowoczesne, które charakteryzuje minimalizm, geometria
          i elegancka prostota. Tworzymy ogrody dostosowane do współczesnego trybu życia.
        </p>

        <a
          href="#contact"
          class="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/70 px-6 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-[var(--color-green)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-green)] focus-visible:outline-none"
        >
          Poznaj nas bliżej

          <svg
            class="size-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m14 7 5 5-5 5" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
