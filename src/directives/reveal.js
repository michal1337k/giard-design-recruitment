const observers = new WeakMap()

function getNumberOption(value, fallback) {
  return Number.isFinite(value) ? value : fallback
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

    /* element pozostaje od razu widoczny, gdy użytkownik ograniczył animacje w ustawieniach systemowych */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-revealed')
    }
  },

  mounted(element, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

        /* Animacja wykonuje się tylko raz, po jej uruchomieniu obserwator nie jest już potrzebny */
        observer.unobserve(element)
        observers.delete(element)
      },
      {
        threshold,
        rootMargin,
      },
    )

    observers.set(element, observer)
    observer.observe(element)
  },

  unmounted(element) {
    observers.get(element)?.disconnect()
    observers.delete(element)
  },
}
