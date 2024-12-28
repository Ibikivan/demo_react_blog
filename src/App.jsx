import { useRef, useState } from 'react'
import './App.css'
import Headers from './layout/Headers'
import Footer from './layout/Footer'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import PageNotFound from './pages/not_found/PageNotFound'
import SinglePost from './pages/single_post/SinglePost'
import { ErrorBoundary } from 'react-error-boundary'

const pages = {
  home: Home,
  singlePost: SinglePost,
  contact: Contact,
  notFound: PageNotFound
}

function App() {

  const defaultPage = {page: 'home', pageData: {}}
  const [activeNav, setActiveNav] = useState(defaultPage)
  const footerRef = useRef(null)

  return <div>
    <Headers activeNav={activeNav} setActiveNav={setActiveNav} />

    <ErrorBoundary
      FallbackComponent={PageNotFound}
      onReset={() => setActiveNav(defaultPage)}
    >
      {pagesProvider(
        pages,
        activeNav.page,
        {footerRef: footerRef, setActiveNav: setActiveNav, ...activeNav.pageData}
      )}
    </ErrorBoundary>

    <Footer ref={footerRef} />
  </div>
}

/**
 * Fournis les composant en fonction de la page sélectionnée
 * @param {object} pages 
 * @param {string} page 
 * @param {*} props
 */
function pagesProvider(pages, page, props) {
  const Component = pages[page] || pages.notFound
  return <Component {...props} />
}

export default App
