# GiardDesign

Projekt responsywnej strony internetowej dla marki zajmującej się projektowaniem oraz realizacją nowoczesnych ogrodów.

> Projekt powstał w ramach procesu rekrutacyjnego dla agencji [adRespect.pl](https://adrespect.pl/). Kod źródłowy został przygotowany przeze mnie, natomiast projekt graficzny jest w 100% autorstwa adRespect.

## Demo

Strona jest dostępna pod publicznym adresem:

[Zobacz stronę GiardDesign online](https://giard-design-recruitment.netlify.app/)

## O projekcie

Celem zadania było odwzorowanie dostarczonego projektu graficznego oraz przygotowanie działającej i responsywnej strony internetowej.

Projekt został wykonany z wykorzystaniem Vue 3 oraz Tailwind CSS. Podczas implementacji skupiłem się nie tylko na zgodności wizualnej z projektem, ale również na responsywności, dostępności, obsłudze klawiatury oraz organizacji kodu.

Strona składa się między innymi z:

- responsywnego nagłówka z menu desktopowym i mobilnym,
- wyszukiwarki sekcji dostępnych na stronie,
- slidera w sekcji Hero,
- sekcji prezentującej ofertę firmy,
- sekcji informacyjnej o firmie,
- galerii realizacji w układzie Masonry,
- pełnoekranowego podglądu zdjęć,
- obsługi powiększania oraz przesuwania zdjęcia,
- sekcji zachęcającej do odwiedzenia Instagrama,
- responsywnej stopki z danymi kontaktowymi.

## Technologie

- Vue 3
- Vite
- JavaScript
- Tailwind CSS 4
- Swiper
- Masonry Layout
- imagesLoaded
- ESLint
- Prettier

## Najważniejsze funkcjonalności

### Responsywny interfejs

Układ strony został dostosowany do urządzeń mobilnych, tabletów oraz ekranów desktopowych. Na większych ekranach wykorzystywana jest globalna, dwunastokolumnowa siatka odzwierciedlająca układ dostarczonego projektu graficznego.

### Slider Hero

Sekcja otwierająca stronę wykorzystuje bibliotekę Swiper i obsługuje:

- automatyczne przełączanie slajdów,
- ręczną nawigację,
- efekt przenikania,
- zatrzymanie automatycznego odtwarzania po interakcji użytkownika,
- ograniczenie animacji zgodnie z ustawieniem `prefers-reduced-motion`.

### Nawigacja i wyszukiwarka

Nagłówek zawiera:

- rozwijane menu oferty,
- responsywne menu mobilne,
- wyszukiwarkę umożliwiającą przejście do wybranej sekcji,
- obsługę klawisza `Escape`,
- zarządzanie fokusem,
- blokowanie przewijania strony pod otwartym panelem.

### Galeria realizacji

Galeria została przygotowana przy użyciu Masonry Layout oraz imagesLoaded. Dzięki temu elementy są rozmieszczane po zakończeniu ładowania obrazów i zachowują poprawny układ również po zmianie szerokości ekranu.

Galerię można rozwinąć, aby wyświetlić wszystkie realizacje.

### Lightbox

Po wybraniu zdjęcia otwierany jest pełnoekranowy podgląd umożliwiający:

- przechodzenie pomiędzy realizacjami,
- powiększanie i pomniejszanie zdjęcia,
- przywrócenie podstawowej skali,
- przesuwanie powiększonego obrazu,
- powiększenie po podwójnym kliknięciu,
- obsługę klawiatury,
- zamknięcie klawiszem `Escape`,
- zatrzymanie fokusu wewnątrz dialogu,
- przywrócenie fokusu na zdjęciu po zamknięciu.

Dostępne skróty klawiaturowe:

| Klawisz  | Działanie                      |
| -------- | ------------------------------ |
| `Escape` | zamknięcie podglądu            |
| `←`      | poprzednie zdjęcie             |
| `→`      | następne zdjęcie               |
| `+`      | powiększenie                   |
| `-`      | pomniejszenie                  |
| `0`      | przywrócenie podstawowej skali |

### Animacje podczas przewijania

Do projektu została dodana własna dyrektywa Vue `v-reveal`, wykorzystująca `IntersectionObserver`.

Animacje są uruchamiane tylko raz i respektują systemowe ustawienie ograniczenia ruchu.

## Dostępność

Projekt uwzględnia między innymi:

- semantyczne elementy HTML,
- teksty alternatywne obrazów,
- etykiety `aria-label`,
- atrybuty `aria-expanded` i `aria-controls`,
- obsługę klawiatury,
- widoczne style fokusu,
- focus trap w dialogach,
- przywracanie fokusu po zamknięciu panelu,
- ustawienie `prefers-reduced-motion`,
- blokowanie przewijania pod otwartymi dialogami.

W lokalnym audycie Lighthouse projekt uzyskał:

| Kategoria             | Wynik |
| --------------------- | ----: |
| Accessibility         |   100 |
| Best Practices        |   100 |
| SEO                   |    92 |
| Performance — desktop |    82 |
| Performance — mobile  |    71 |

Wyniki Lighthouse mogą różnić się w zależności od urządzenia, środowiska oraz warunków sieciowych.

## Struktura projektu

```text
src/
├── assets/
│   ├── brand/
│   ├── icons/
│   ├── images/
│   └── main.css
├── components/
│   ├── dev/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
├── directives/
├── App.vue
└── main.js
```

Dane tekstowe, linki oraz informacje o obrazach zostały oddzielone od komponentów i umieszczone w katalogu `src/data`.

## Uruchomienie projektu

### Wymagania

Do uruchomienia projektu potrzebne są:

- Node.js `22.18.0` lub nowszy, zgodny z konfiguracją projektu,
- npm.

### Instalacja

Sklonuj repozytorium:

```bash
git clone https://github.com/michal1337k/giard-design-recruitment
```

Przejdź do katalogu projektu:

```bash
cd giard-design-recruitment
```

Zainstaluj zależności:

```bash
npm install
```

Uruchom lokalne środowisko deweloperskie:

```bash
npm run dev
```

Po uruchomieniu aplikacja będzie dostępna pod adresem wyświetlonym w terminalu.

## Dostępne polecenia

### Uruchomienie środowiska deweloperskiego

```bash
npm run dev
```

Uruchamia lokalny serwer deweloperski Vite.

### Utworzenie wersji produkcyjnej

```bash
npm run build
```

Tworzy zoptymalizowaną wersję produkcyjną projektu w katalogu `dist`.

### Podgląd wersji produkcyjnej

```bash
npm run preview
```

Uruchamia lokalny podgląd wcześniej zbudowanej wersji produkcyjnej.

### Sprawdzenie kodu

```bash
npm run lint
```

Sprawdza kod projektu za pomocą ESLint.

### Automatyczna naprawa problemów ESLint

```bash
npm run lint:fix
```

Automatycznie poprawia problemy, które mogą zostać naprawione przez ESLint.

### Formatowanie kodu

```bash
npm run format
```

Formatuje pliki projektu za pomocą Prettier.

### Sprawdzenie formatowania

```bash
npm run format:check
```

Sprawdza zgodność plików z konfiguracją Prettier bez wprowadzania zmian.

### Pełna kontrola projektu

```bash
npm run check
```

Uruchamia kolejno:

1. sprawdzenie formatowania,
2. analizę ESLint,
3. produkcyjny build aplikacji.

## Projekt graficzny i materiały

Projekt graficzny strony oraz jego koncepcja wizualna są w całości autorstwa agencji [adRespect.pl](https://adrespect.pl/).

Kod źródłowy oraz implementacja strony zostały przygotowane przeze mnie w ramach zadania rekrutacyjnego.

## Autor

**Michał Wlezień**

Projekt wykonany w ramach procesu rekrutacyjnego na stanowisko Junior Front-end Developer.
