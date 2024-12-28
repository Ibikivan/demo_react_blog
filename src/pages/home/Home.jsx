import { useState } from "react"
import Alert from "../../components/Alert"
import PageTitle from "../../components/PageTitle"
import Spinner from "../../components/Spinner"
import { useFetch, useIncrementData } from "../../hooks"
import AddPost from "./AddPost"
import PostCard from "./PostCard"

export default function Home({footerRef, setActiveNav}) {

    const [page, setPage] = useState(1)
    const pageConfig = {
        pageTitle: "Mon blog",
        cartWidth: "18rem"
    }

    const fetchUrl = new URL('https://jsonplaceholder.typicode.com/posts?_limit=3&_page=1')
    fetchUrl.searchParams.set('_page', page)
    const { isLoading, data, isError } = useFetch(fetchUrl.toString())
    const {dataBuch, isDataEmpty} = useIncrementData(data, isError)

    return <div className="container vstack gap-3 my-3">
        <PageTitle title={pageConfig.pageTitle} />

        {(isLoading && dataBuch.length < 0) ? (
            <div className="spinner_container">
                <Spinner colorClassName='primary' />
            </div>
        ) : (
            <>
                <div className="blog_list">
                    {dataBuch?.map((post) => <PostCard key={post.id} cardWidth={pageConfig.cartWidth} post={post} setActiveNav={setActiveNav} /> )}
                </div>

                {isLoading && (
                    <div className="spinner spinner_container">
                        <Spinner colorClassName='primary' />
                    </div>
                )}

                {(isError && !isLoading) && <div className="alert_container"><Alert colorClassName="danger" content={isError ? isError : undefined} /></div>}

                {(isDataEmpty && (!isLoading && !isError)) && <div className="alert_container"><Alert colorClassName="info" content={'Attention: Aucun contenu trouvé'} /></div>}

                {(!isError && (!isDataEmpty && !isLoading)) && <h6 className="see_more text-secondary" onClick={() => setPage(p => p + 1)}>{'Afficher plus --->'}</h6>}
            </>
        )}


        <AddPost footerRef={footerRef} />
    </div>
}
