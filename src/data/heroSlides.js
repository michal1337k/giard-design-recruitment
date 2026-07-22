import hero01 from '@/assets/images/hero/hero-01.png'
import hero02 from '@/assets/images/hero/hero-02.png'
import hero03 from '@/assets/images/hero/hero-03.png'

export const heroSlides = [
  {
    id: 'modern-garden',

    title: 'Nowoczesna aranżacja Twojego ogrodu',

    description:
      'Marka GiardDesign to wieloletnie doświadczenie i wysoka estetyka realizacji. Oferujemy kompleksowy zakres usług z indywidualnym podejściem do każdego projektu.',

    image: hero01,

    imageAlt: 'Geometryczna kompozycja przedstawiająca nowoczesną aranżację ogrodu',

    objectPosition: 'center',

    primaryAction: {
      label: 'Skontaktuj się z nami',
      href: '#contact',
    },

    secondaryAction: {
      label: 'Zobacz nasze realizacje',
      href: '#projects',
    },
  },

  {
    id: 'personal-project',

    title: 'Ogród zaprojektowany dla Ciebie',

    description:
      'Łączymy potrzeby domowników z charakterem przestrzeni. Tworzymy funkcjonalne projekty, które pozostają piękne przez wiele lat.',

    image: hero02,

    imageAlt: 'Nowoczesny ogród przydomowy wypełniony zieloną roślinnością',

    objectPosition: 'center',

    primaryAction: {
      label: 'Poznaj naszą ofertę',
      href: '#offer',
    },

    secondaryAction: {
      label: 'Dowiedz się więcej',
      href: '#about',
    },
  },

  {
    id: 'complete-realisation',

    title: 'Od pierwszego pomysłu do realizacji',

    description:
      'Prowadzimy inwestycję od projektu i wizualizacji aż po wykonanie ogrodu. Każdy etap realizujemy z dbałością o najmniejszy detal.',

    image: hero03,

    imageAlt: 'Elegancka realizacja ogrodu z nowoczesną architekturą',

    objectPosition: 'center',

    primaryAction: {
      label: 'Rozpocznij współpracę',
      href: '#contact',
    },

    secondaryAction: {
      label: 'Nasze projekty',
      href: '#projects',
    },
  },
]
