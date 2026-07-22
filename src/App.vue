<script setup>
  const projectName = 'Garden Design'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-stone-100 px-6">
    <div class="text-center">
      <p class="mb-2 text-sm font-medium tracking-widest text-green-700 uppercase">
        Zadanie rekrutacyjne
      </p>

      <h1 class="text-4xl font-semibold text-stone-900 md:text-6xl">
        {{ projectName }}
      </h1>

      <p class="mt-5 text-stone-600">Vue + Tailwind test</p>
    </div>
  </main>
</template>