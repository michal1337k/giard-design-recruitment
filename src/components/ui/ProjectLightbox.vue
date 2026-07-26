<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

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

const MIN_SCALE = 1
const MAX_SCALE = 3
const SCALE_STEP = 0.5

const imageViewport = ref(null)
const imageElement = ref(null)

const scale = ref(MIN_SCALE)
const offsetX = ref(0)
const offsetY = ref(0)
const isDragging = ref(false)

let activePointerId = null
let dragStartX = 0
let dragStartY = 0
let previousBodyOverflow = ''
let isBodyScrollLocked = false

const isZoomed = computed(() => {
  return scale.value > MIN_SCALE
})

const zoomPercentage = computed(() => {
  return `${Math.round(scale.value * 100)}%`
})

const canZoomIn = computed(() => {
  return scale.value < MAX_SCALE
})

const canZoomOut = computed(() => {
  return scale.value > MIN_SCALE
})

const imageCursorClass = computed(() => {
  if (!isZoomed.value) {
    return 'cursor-zoom-in'
  }

  return isDragging.value ? 'cursor-grabbing' : 'cursor-grab'
})

const panTransform = computed(() => {
  return {
    transform: `translate3d(${offsetX.value}px, ${offsetY.value}px, 0)`,
  }
})

const imageTransform = computed(() => {
  return {
    transform: `scale(${scale.value})`,
  }
})

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum)
}

function resetPan() {
  offsetX.value = 0
  offsetY.value = 0
}

function clampPan() {
  if (!imageViewport.value || !imageElement.value) {
    return
  }

  if (!isZoomed.value) {
    resetPan()
    return
  }

  const viewportWidth = imageViewport.value.clientWidth
  const viewportHeight = imageViewport.value.clientHeight

  // oblicz rozmiar po transformacji, ponieważ clientWidth i clientHeight zwracają wartości bazowe
  const scaledImageWidth = imageElement.value.clientWidth * scale.value
  const scaledImageHeight = imageElement.value.clientHeight * scale.value

  const maximumOffsetX = Math.max((scaledImageWidth - viewportWidth) / 2, 0)

  const maximumOffsetY = Math.max((scaledImageHeight - viewportHeight) / 2, 0)

  offsetX.value = clamp(offsetX.value, -maximumOffsetX, maximumOffsetX)

  offsetY.value = clamp(offsetY.value, -maximumOffsetY, maximumOffsetY)
}

async function setScale(nextScale) {
  scale.value = clamp(nextScale, MIN_SCALE, MAX_SCALE)

  if (!isZoomed.value) {
    isDragging.value = false
    activePointerId = null
    resetPan()
  }

  // poczekaj, aż vue naniesie skalę, a następnie ogranicz przesunięcie zdjęcia
  await nextTick()
  clampPan()
}

function zoomIn() {
  setScale(scale.value + SCALE_STEP)
}

function zoomOut() {
  setScale(scale.value - SCALE_STEP)
}

function resetZoom() {
  isDragging.value = false
  activePointerId = null
  scale.value = MIN_SCALE

  resetPan()
}

function toggleZoom() {
  if (!isZoomed.value) {
    setScale(2)
    return
  }

  resetZoom()
}

function showPreviousProject() {
  if (!props.showNavigation) {
    return
  }

  resetZoom()
  emit('previous')
}

function showNextProject() {
  if (!props.showNavigation) {
    return
  }

  resetZoom()
  emit('next')
}

function handlePointerDown(event) {
  if (!isZoomed.value) {
    return
  }

  isDragging.value = true
  activePointerId = event.pointerId

  dragStartX = event.clientX - offsetX.value
  dragStartY = event.clientY - offsetY.value

  event.currentTarget.setPointerCapture(event.pointerId)
}

function handlePointerMove(event) {
  if (!isDragging.value || event.pointerId !== activePointerId) {
    return
  }

  offsetX.value = event.clientX - dragStartX
  offsetY.value = event.clientY - dragStartY

  clampPan()
}

function finishDragging(event) {
  if (event.pointerId !== activePointerId) {
    return
  }

  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  isDragging.value = false
  activePointerId = null
}

function lockBodyScroll() {
  if (isBodyScrollLocked) {
    return
  }

  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  isBodyScrollLocked = true
}

function unlockBodyScroll() {
  if (!isBodyScrollLocked) {
    return
  }

  document.body.style.overflow = previousBodyOverflow
  isBodyScrollLocked = false
}

function handleKeydown(event) {
  if (!props.isOpen) {
    return
  }

  if (event.key === 'Escape') {
    emit('close')
    return
  }

  if (event.key === 'ArrowLeft' && props.showNavigation) {
    event.preventDefault()
    showPreviousProject()
    return
  }

  if (event.key === 'ArrowRight' && props.showNavigation) {
    event.preventDefault()
    showNextProject()
    return
  }

  if (event.key === '+' || event.key === '=') {
    event.preventDefault()
    zoomIn()
    return
  }

  if (event.key === '-') {
    event.preventDefault()
    zoomOut()
    return
  }

  if (event.key === '0') {
    event.preventDefault()
    resetZoom()
  }
}

function handleResize() {
  clampPan()
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      lockBodyScroll()
      resetZoom()
      return
    }

    unlockBodyScroll()
  },
  {
    immediate: true,
  },
)

watch(
  () => props.project?.image,
  () => {
    resetZoom()
  },
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)

  unlockBodyScroll()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen && project"
        class="fixed inset-0 z-200 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
        role="dialog"
        aria-modal="true"
        :aria-label="`Podgląd realizacji: ${project.title}`"
      >
        <!-- wyświetl sterowanie zoomem -->
        <div
          class="absolute top-4 left-4 z-30 flex items-center gap-1 rounded-full bg-black/55 p-1 text-white backdrop-blur-md md:top-8 md:left-8"
          role="group"
          aria-label="Sterowanie powiększeniem zdjęcia"
        >
          <button
            type="button"
            class="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-white"
            :disabled="!canZoomOut"
            aria-label="Pomniejsz zdjęcie"
            @click="zoomOut"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
            </svg>
          </button>

          <output class="min-w-13.5 text-center text-sm tabular-nums" aria-live="polite">
            {{ zoomPercentage }}
          </output>

          <button
            type="button"
            class="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-white"
            :disabled="!canZoomIn"
            aria-label="Powiększ zdjęcie"
            @click="zoomIn"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>

          <button
            type="button"
            class="flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-xs font-medium transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-white"
            :disabled="!isZoomed"
            aria-label="Przywróć oryginalny rozmiar zdjęcia"
            @click="resetZoom"
          >
            1:1
          </button>
        </div>

        <button
          type="button"
          class="absolute top-4 right-4 z-30 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black active:scale-95 md:top-8 md:right-8"
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

        <button
          v-if="showNavigation"
          type="button"
          class="absolute top-1/2 left-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black active:scale-95 md:left-8 md:size-14"
          aria-label="Poprzednie zdjęcie"
          @click="showPreviousProject"
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

        <button
          v-if="showNavigation"
          type="button"
          class="absolute top-1/2 right-2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black active:scale-95 md:right-8 md:size-14"
          aria-label="Następne zdjęcie"
          @click="showNextProject"
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

        <!-- wykorzystaj cały ekran jako przestrzeń zoomu i przeciągania -->
        <figure class="absolute inset-0">
          <div
            ref="imageViewport"
            class="absolute inset-0 flex touch-none items-center justify-center overflow-hidden"
            :class="imageCursorClass"
            @click.self="emit('close')"
            @dblclick.prevent="toggleZoom"
            @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove"
            @pointerup="finishDragging"
            @pointercancel="finishDragging"
          >
            <!-- rozdziel przesuwanie kontenera od skalowania obrazu -->
            <div
              class="flex items-center justify-center"
              :class="{
                'transition-transform duration-200 ease-out': !isDragging,
              }"
              :style="panTransform"
            >
              <img
                ref="imageElement"
                :src="project.image"
                :alt="project.imageAlt"
                draggable="false"
                class="block max-h-[calc(100dvh-6rem)] max-w-[calc(100vw-2rem)] origin-center object-contain select-none transition-transform duration-200 ease-out md:max-h-[calc(100dvh-8rem)] md:max-w-[calc(100vw-8rem)]"
                :style="imageTransform"
                @load="clampPan"
              />
            </div>
          </div>

          <Transition name="caption">
            <figcaption
              v-if="!isZoomed"
              class="pointer-events-none absolute right-20 bottom-5 left-20 z-10 text-center text-white md:bottom-8"
            >
              <p class="text-sm text-white/60">
                {{ project.category }}
              </p>

              <p class="mt-1 text-lg font-medium">
                {{ project.title }}
              </p>
            </figcaption>
          </Transition>
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

.caption-enter-active,
.caption-leave-active {
  transition: opacity 180ms ease;
}

.caption-enter-from,
.caption-leave-to {
  opacity: 0;
}

/* skróć animacje, gdy użytkownik ograniczył ruch w systemie */
@media (prefers-reduced-motion: reduce) {
  .lightbox-enter-active,
  .lightbox-leave-active,
  .lightbox-enter-active figure,
  .lightbox-leave-active figure,
  .caption-enter-active,
  .caption-leave-active {
    transition-duration: 1ms;
  }
}
</style>
