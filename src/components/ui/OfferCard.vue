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
    class="group relative flex min-h-92.5 w-full flex-col justify-between overflow-hidden rounded-[28px] bg-white px-8 py-10 transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-(--color-green) focus-visible:ring-offset-4 focus-visible:outline-none active:scale-[0.98] active:shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:px-10 md:py-12"
  >
    <span
      class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-(--color-green) transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
      aria-hidden="true"
    ></span>

    <div class="flex w-full flex-col items-start gap-8">
      <div
        class="flex size-11 shrink-0 items-center justify-start transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 group-active:-rotate-3 group-active:scale-105"
      >
        <img
          :src="item.icon"
          alt=""
          aria-hidden="true"
          class="block w-auto max-w-none shrink-0"
          :style="{ height: `${item.iconHeight}px` }"
        />
      </div>

      <div class="flex w-full flex-col items-start gap-3">
        <h3 class="font-heading w-full text-[28px] leading-8 font-medium tracking-tighter">
          {{ item.title }}
        </h3>

        <p class="w-full text-sm leading-5.25 font-normal tracking-[-0.01em] text-stone-600">
          <template v-if="item.descriptionLines">
            <span v-for="(line, index) in item.descriptionLines" :key="line" class="lg:block">
              {{ line }}

              <span v-if="index < item.descriptionLines.length - 1" class="lg:hidden">
                &nbsp;
              </span>
            </span>
          </template>
        </p>
      </div>
    </div>

    <div
      class="flex h-7 w-fit items-start gap-2.5 border-b border-(--color-green) pb-1 text-base leading-5.25 font-normal text-(--color-green)"
    >
      <span class="whitespace-nowrap">
        {{ item.linkLabel }}
      </span>

      <svg
        class="mt-0.5 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2"
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
    </div>
  </a>
</template>
