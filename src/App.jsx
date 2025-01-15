import { useRef } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import SinglePost from './pages/singlePost/SinglePost'
import Root from './pages/root/Root'
import PageNotFound from './pages/not_found/PageNotFound'
import QueryTests from './pages/test/QueryTests'

function App() {

  const footerRef = useRef(null)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root footerRef={footerRef} />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '',
          element: <Home footerRef={footerRef} />
        },
        {
          path: ':id',
          element: <SinglePost />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'tests',
          element: <QueryTests />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
