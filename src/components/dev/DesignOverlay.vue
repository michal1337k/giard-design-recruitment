<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

/* nakładka pod klawiszezm "o", domyślnie ukryta*/
const isVisible = ref(false)

function handleKeydown(event) {
  /* nie przełącz nakładki podczas pisania w input albo textarea */
  const activeTag = document.activeElement?.tagName

  if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
    return
  }

  if (event.key.toLowerCase() === 'o') {
    isVisible.value = !isVisible.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <img
    v-if="isVisible"
    src="/reference/desktop-reference.png"
    alt=""
    class="pointer-events-none absolute top-0 left-1/2 z-[9999] max-w-none -translate-x-1/2 opacity-50"
    style="width: 1440px"
    aria-hidden="true"
  />
</template>
