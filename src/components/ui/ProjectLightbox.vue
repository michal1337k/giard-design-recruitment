<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },

  project: {
    type: Object,
    default: null,
  },

  showNavigation: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close', 'previous', 'next'])

function handleKeydown(event) {
  /* nie obsługuj klawiszy, gdy popup jest zamknięty */
  if (!props.isOpen) {
    return
  }

  if (event.key === 'Escape') {
    emit('close')
  }

  if (event.key === 'ArrowLeft') {
    emit('previous')
  }

  if (event.key === 'ArrowRight') {
    emit('next')
  }
}

/* blokuj przewijanie strony  pod popupem */
watch(
  () => props.isOpen,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)

  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen && project"
        class="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
        role="dialog"
        aria-modal="true"
        :aria-label="`Podgląd realizacji: ${project.title}`"
        @click.self="emit('close')"
      >
        <!-- zamknięcie popupu -->
        <button
          type="button"
          class="absolute top-4 right-4 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black active:scale-95 md:top-8 md:right-8"
          aria-label="Zamknij galerię"
          @click="emit('close')"
        >
          <svg
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12" />
            <path d="M18 6 6 18" />
          </svg>
        </button>

        <!-- poprzednie zdjęcie -->
        <button
          v-if="showNavigation"
          type="button"
          class="absolute top-1/2 left-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black active:scale-95 md:left-8 md:size-14"
          aria-label="Poprzednie zdjęcie"
          @click="emit('previous')"
        >
          <svg
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <!-- następne zdjęcie -->
        <button
          v-if="showNavigation"
          type="button"
          class="absolute top-1/2 right-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black active:scale-95 md:right-8 md:size-14"
          aria-label="Następne zdjęcie"
          @click="emit('next')"
        >
          <svg
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <!-- główna zawartość popupu -->
        <figure class="flex max-h-full max-w-full flex-col items-center">
          <img
            :src="project.image"
            :alt="project.alt"
            class="max-h-[78vh] max-w-full object-contain"
          />

          <figcaption class="mt-4 text-center text-white">
            <p class="text-sm text-white/60">
              {{ project.category }}
            </p>

            <p class="mt-1 text-lg font-medium">
              {{ project.title }}
            </p>
          </figcaption>
        </figure>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 250ms ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* lekka animacja zdjęcia */
.lightbox-enter-active figure,
.lightbox-leave-active figure {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

.lightbox-enter-from figure,
.lightbox-leave-to figure {
  opacity: 0;
  transform: scale(0.96);
}
</style>
