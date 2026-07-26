const observerByElement = new WeakMap()

function getNumberOption(value, fallback) {
  return Number.isFinite(value) ? value : fallback
}

function shouldRevealImmediately() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const supportsIntersectionObserver = 'IntersectionObserver' in window

  return prefersReducedMotion || !supportsIntersectionObserver
}

export const reveal = {
  beforeMount(element, binding) {
    const options = binding.value ?? {}

    const delay = getNumberOption(options.delay, 0)
    const duration = getNumberOption(options.duration, 700)
    const distance = getNumberOption(options.distance, 24)

    element.style.setProperty('--reveal-delay', `${delay}ms`)
    element.style.setProperty('--reveal-duration', `${duration}ms`)
    element.style.setProperty('--reveal-distance', `${distance}px`)

    element.classList.add('scroll-reveal')

    // pokaż element od razu, gdy użytkownik ograniczył ruch lub przeglądarka nie obsługuje obserwatora
    if (shouldRevealImmediately()) {
      element.classList.add('is-revealed')
    }
  },

  mounted(element, binding) {
    if (element.classList.contains('is-revealed')) {
      return
    }

    const options = binding.value ?? {}

    const threshold = getNumberOption(options.threshold, 0.16)
    const rootMargin = options.rootMargin ?? '0px 0px -8% 0px'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        element.classList.add('is-revealed')

        // uruchom animację tylko raz i zakończ obserwację elementu
        observer.disconnect()
        observerByElement.delete(element)
      },
      {
        threshold,
        rootMargin,
      },
    )

    observerByElement.set(element, observer)
    observer.observe(element)
  },

  unmounted(element) {
    observerByElement.get(element)?.disconnect()
    observerByElement.delete(element)
  },
}
