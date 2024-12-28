import { lazy, Suspense, useRef, useState } from 'react'
import './App.css'
import Headers from './layout/Headers'
import Footer from './layout/Footer'
import { ErrorBoundary } from 'react-error-boundary'

function App() {

  const defaultPage = {page: 'home', pageData: {}}
  const [activeNav, setActiveNav] = useState(defaultPage)
  const footerRef = useRef(null)
  const LazyNotFound = lazy(() => import('./pages/not_found/PageNotFound'))

  return <div>
    <Headers activeNav={activeNav} setActiveNav={setActiveNav} />

    <ErrorBoundary
      FallbackComponent={LazyNotFound}
      onReset={() => setActiveNav(defaultPage)}
    >
      {pagesProvider(
        activeNav.page,
        {footerRef: footerRef, setActiveNav: setActiveNav, ...activeNav.pageData}
      )}
    </ErrorBoundary>

    <Footer ref={footerRef} />
  </div>
}

/**
 * Fournis les composant en fonction de la page sélectionnée
 * @param {string} page 
 * @param {*} props
 */
function pagesProvider(page, props) {
  const path = `./pages/${page}/${page.charAt(0).toUpperCase() + page.slice(1)}`
  const LazyPage = lazy(() => import(path)) || LazyNotFound

  return <Suspense fallback={<div className='container'>Chargement de la page...</div>}>
    <LazyPage {...props} />
  </Suspense>
}

export default App
