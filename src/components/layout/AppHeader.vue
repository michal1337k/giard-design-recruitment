<template>
  <header class="relative z-50 bg-white">
    <div class="page-grid">
      <div class="col-start-2 col-end-4 flex h-[72px] items-center justify-between">
        <a
          href="#intro"
          class="text-lg font-semibold tracking-[-0.04em]"
          aria-label="Przejdź na początek strony"
        >
          giard<span class="font-normal">design</span>
        </a>

        <!-- Nawigacja  -->
        <nav class="hidden items-center gap-8 text-sm lg:flex" aria-label="Główna nawigacja">
          <button type="button" class="flex items-center gap-2 transition-opacity hover:opacity-60">
            Oferta
            <span aria-hidden="true">⌄</span>
          </button>

          <a href="#about" class="transition-opacity hover:opacity-60"> O firmie </a>

          <a href="#projects" class="transition-opacity hover:opacity-60"> Realizacje </a>

          <a href="#contact" class="transition-opacity hover:opacity-60"> Kontakt </a>

          <button
            type="button"
            class="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
            aria-label="Otwórz wyszukiwarkę"
          >
            <!-- Lupa do wyszukiwania -->
            <span aria-hidden="true">P</span>
          </button>
        </nav>

        <!-- Przycisk menu widoczny na tabletach i telefonach -->
        <button
          type="button"
          class="flex size-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-label="Otwórz menu"
        >
          <span class="h-px w-6 bg-black"></span>
          <span class="h-px w-6 bg-black"></span>
          <span class="h-px w-6 bg-black"></span>
        </button>
      </div>
    </div>
  </header>
</template>
