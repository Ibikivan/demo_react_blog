import { useRef } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import SinglePost from './pages/singlePost/SinglePost'
import Root from './pages/root/Root'
import PageNotFound from './pages/not_found/PageNotFound'

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
          element: <SinglePost />,
          loader: ({params}) => fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        },
        {
          path: 'contact',
          element: <Contact />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
