import projectsIcon from '@/assets/icons/offer/projects.svg'
import visualizationsIcon from '@/assets/icons/offer/visualizations.svg'
import realisationsIcon from '@/assets/icons/offer/realisations.svg'

export const offerItems = [
  {
    id: 'projects',
    title: 'Projekty',
    description:
      'Zaprojektujemy Twój ogród w nowoczesnym stylu i z najlepszym wykorzystaniem istniejącej przestrzeni.',

    descriptionLines: [
      'Zaprojektujemy Twój ogród w nowoczesnym',
      'stylu i z najlepszym wykorzystaniem',
      'istniejącej przestrzeni.',
    ],

    linkLabel: 'Dowiedz się więcej',
    href: '#contact',
    icon: projectsIcon,
    iconHeight: 40,
  },
  {
    id: 'visualizations',
    title: 'Wizualizacje',
    description:
      'Przedstawimy Ci projekt koncepcyjny w postaci wirtualnej prezentacji stworzonej w technologii 3D.',

    descriptionLines: [
      'Przedstawimy Ci projekty koncepcyjne',
      'w postaci wirtualnego spaceru animowanego',
      'w technologii 3D.',
    ],

    linkLabel: 'Dowiedz się więcej',
    href: '#contact',
    icon: visualizationsIcon,
    iconHeight: 28.96,
  },
  {
    id: 'realisations',
    title: 'Realizacje',
    description:
      'Zrealizujemy Twój wymarzony ogród przy użyciu najnowszych rozwiązań i materiałów technicznych.',
    descriptionLines: [
      'Zrealizujemy Twoje marzenie przy użyciu',
      'najnowszych rozwiązań i zaawansowanych',
      'technologii.',
    ],

    linkLabel: 'Zobacz nasze realizacje',
    href: '#projects',
    icon: realisationsIcon,
    iconHeight: 44,
  },
]
