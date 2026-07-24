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
    class="group relative flex min-h-[370px] flex-col justify-between overflow-hidden rounded-[28px] bg-white px-[32px] py-[40px] transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] active:scale-[0.98] active:shadow-[0_12px_30px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-4 focus-visible:outline-none md:px-[40px] md:py-[48px] lg:h-[370px] lg:min-h-0 lg:w-[378px]"
  >
    <span
      class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--color-green)] transition-transform duration-500 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100"
      aria-hidden="true"
    ></span>

    <div class="flex w-full flex-col items-start gap-[32px] lg:h-[183px] lg:w-[298px]">
      <div
        class="flex size-[44px] shrink-0 items-center justify-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 group-active:-rotate-3 group-active:scale-105"
      >
        <!-- ikona -->
        <div
          class="flex h-[44px] shrink-0 items-center justify-start transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 group-active:-rotate-3 group-active:scale-105"
        >
          <img
            :src="item.icon"
            alt=""
            class="block w-auto max-w-none shrink-0"
            :style="{ height: `${item.iconHeight}px` }"
            aria-hidden="true"
          />
        </div>
      </div>

      <div class="flex w-full flex-col items-start gap-[12px] lg:h-[107px] lg:w-[298px]">
        <h3
          class="font-heading w-full text-[28px] leading-[32px] tracking-[-0.05em] font-medium lg:h-[32px]"
        >
          {{ item.title }}
        </h3>

        <p
          class="w-full text-[14px] leading-[21px] font-normal text-stone-600 lg:h-[63px] tracking-[-0.01em] lg:w-[298px]"
        >
          <template v-if="item.descriptionLines">
            <span v-for="(line, index) in item.descriptionLines" :key="line" class="lg:block">
              {{ line
              }}<span v-if="index < item.descriptionLines.length - 1" class="lg:hidden"
                >&nbsp;</span
              >
            </span>
          </template>

          <!-- na wypadek dodania karty, która nie ma przygotowanych osobnych linii -->
          <template v-else>
            {{ item.description }}
          </template>
        </p>
      </div>
    </div>

    <div
      class="flex h-[28px] w-fit items-start gap-[10px] border-b border-[var(--color-green)] pb-[4px] text-[16px] leading-[21px] font-normal text-[var(--color-green)]"
    >
      <span class="whitespace-nowrap">
        {{ item.linkLabel }}
      </span>

      <svg
        class="mt-[2px] size-[16px] shrink-0 transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2"
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
