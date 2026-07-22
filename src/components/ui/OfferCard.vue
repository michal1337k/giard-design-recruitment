<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <a
    :href="item.href"
    class="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[28px] bg-white p-8 transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-4 focus-visible:outline-none"
  >
    <!-- zielona linia wysuwa się po najechaniu na kartę -->
    <span
      class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--color-green)] transition-transform duration-500 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100"
      aria-hidden="true"
    ></span>

    <!-- div ikony -->
    <div
      class="flex size-12 items-center justify-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 group-active:-rotate-3 group-active:scale-105"
    >
      <!-- ikona używana dla karty Projekty -->
      <svg
        v-if="item.icon === 'design'"
        class="size-9"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m13 33 20-20 5 5-20 20-7 2 2-7Z" />
        <path d="m29 17 5 5" />
        <path d="M10 10h11" />
        <path d="M10 15h7" />
      </svg>

      <!-- ikona używana dla karty Wizualizacje -->
      <svg
        v-else-if="item.icon === 'visualization'"
        class="size-9"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M5 24s7-11 19-11 19 11 19 11-7 11-19 11S5 24 5 24Z" />
        <circle cx="24" cy="24" r="5" />
      </svg>
      <svg
        v-else
        class="size-9"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M24 5c1.5 9 5.5 13 14 14-8.5 1-12.5 5-14 14-1.5-9-5.5-13-14-14 8.5-1 12.5-5 14-14Z"
        />
        <path
          d="M38 30c.7 4 2.3 5.7 6 6.5-3.7.8-5.3 2.5-6 6.5-.7-4-2.3-5.7-6-6.5 3.7-.8 5.3-2.5 6-6.5Z"
        />
      </svg>
    </div>

    <div class="mt-10">
      <h3 class="text-2xl font-medium tracking-[-0.03em]">
        {{ item.title }}
      </h3>

      <p class="mt-3 max-w-[300px] text-sm leading-6 text-stone-600">
        {{ item.description }}
      </p>
    </div>

    <div
      class="mt-auto flex items-center gap-2 pt-10 text-sm font-medium text-[var(--color-green)]"
    >
      <span class="border-b border-current pb-1">
        {{ item.linkLabel }}
      </span>

      <span
        class="transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2"
        aria-hidden="true"
      >
        →
      </span>
    </div>
  </a>
</template>
