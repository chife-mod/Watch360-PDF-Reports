import { CoverSlide } from './components/slides/CoverSlide'

/**
 * App — временный просмотрщик для разработки.
 * Показывает слайды на чёрном фоне по центру экрана.
 * Будет заменён полноценным Viewer с навигацией.
 */
function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CoverSlide
        title="Watch Media"
        period="Dec 2025 – Feb 2026"
        website="www.watch360.ai"
      />
    </div>
  )
}

export default App
