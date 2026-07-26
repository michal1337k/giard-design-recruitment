import projectsIcon from '@/assets/icons/offer/projects.svg'
import realisationsIcon from '@/assets/icons/offer/realisations.svg'
import visualizationsIcon from '@/assets/icons/offer/visualizations.svg'

export const offerItems = [
  {
    id: 'projects',
    title: 'Projekty',
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
