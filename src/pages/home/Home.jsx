import Alert from "../../components/Alert"
import PageTitle from "../../components/PageTitle"
import Spinner from "../../components/Spinner"
import AddPost from "./AddPost"
import PostCard from "./PostCard"
import { useEffect } from "react"
import { useInfiniteQuery } from "react-query"
import { getPosts } from "../../function/api"
import { reduceStatement } from "../../function"

export default function Home({ footerRef }) {

    const pageConfig = {
        pageTitle: "Mon blog",
        cartWidth: "18rem"
    }

    const queryKey = ['posts']
    const { isLoading, data, error, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(queryKey, ({pageParam}) => getPosts(pageParam), {
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined,
        staleTime: 60_000
    })
    const posts = data?.pages?.flat() || []

    function handleFetchNextPage() {
        if (isFetching) return null
        fetchNextPage()
    }

    useEffect(() => {
        const prevTitle = document.title
        document.title = reduceStatement(pageConfig.pageTitle, 20)

        return () => document.title = prevTitle
    }, [])

    return <div className="container vstack gap-3 my-3">
        <div className="hstack gap-3">
            <PageTitle title={pageConfig.pageTitle} />
            {(isFetching && !isLoading) && <Spinner />}
        </div>

        {isLoading && <Spinner otherClass='mx-auto' />}
        {error && <Alert colorClassName="danger" content={error} />}

        <div className="blog_list">
            {posts?.map((post) => <PostCard key={post.id} cardWidth={pageConfig.cartWidth} post={post} /> )}
        </div>

        {(!error && posts.length > 0 && hasNextPage) && <h6
            className="see_more text-secondary"
            onClick={handleFetchNextPage}
        >{'Afficher plus --->'} {isFetching && <Spinner otherClass='small_loader' />}</h6>}

        <AddPost footerRef={footerRef} />
    </div>

}
