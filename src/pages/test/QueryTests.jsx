import { useEffect } from "react"
import { useQuery } from "react-query"
import Spinner from "../../components/Spinner"
import Alert from "../../components/Alert"
import PostCard from "../home/PostCard"

export default function QueryTests() {
    
    const pageConfig = {
        pageTitle: "Ma page de tests",
        cartWidth: "18rem"
    }

    /**
     * Obtenir la liste des poste de la page et de la limite spécifiée
     * @param {number} page 
     * @param {number} limit 
     * @returns {object}
     */
    function getPosts(page=1, limit=3) {
        const url = new URL('https://jsonplaceholder.typicode.com/posts')
        url.searchParams.set('_limit', limit)
        url.searchParams.set('_page', page)

        return fetch(url.toString())
        .then(res => {
            if (res.ok) return res.json()
        })
    }

    const queryKey = ['posts']
    const { isLoading, data, error, isFetching } = useQuery(queryKey, () => getPosts())
    const posts = data || []

    useEffect(() => {
        const prevTitle = document.title
        document.title = pageConfig.pageTitle

        return () => document.title = prevTitle
    }, [])

    return <div className="container vstack gap-3 my-3">
        
        <div className="hstack gap-3">
            <h1>{pageConfig.pageTitle}</h1>
            {(isFetching && !isLoading) && <Spinner />}
        </div>

        {isLoading && <Spinner otherClass='mx-auto' />}
        {error && <Alert colorClassName="danger" content={error} />}

        <div className="blog_list">
            {posts.map(post => <PostCard key={post.id} cardWidth={pageConfig.cartWidth} post={post} />)}
        </div>

        {(!error && data?.length > 0) && (<div className="hstack justify-content-end">
            <button
                className="badge text-bg-secondary"
                disabled={isLoading}
                onClick={() => null}
            >Voir plus...</button>
        </div>)}

    </div>
}
