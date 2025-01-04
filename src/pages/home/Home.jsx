import Alert from "../../components/Alert"
import PageTitle from "../../components/PageTitle"
import Spinner from "../../components/Spinner"
import AddPost from "./AddPost"
import PostCard from "./PostCard"
import { usePost } from "../../hooks/usePost"

export default function Home({footerRef, setActiveNav}) {

    const pageConfig = {
        pageTitle: "Mon blog",
        cartWidth: "18rem"
    }
    
    const {
        posts: dataBuch,
        isLoading,
        isError,
        isEmptyData: isDataEmpty,
        getNextPosts,
        addNewPost
    } = usePost()


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

                {(!isError && (!isDataEmpty && !isLoading)) && <h6 className="see_more text-secondary" onClick={getNextPosts}>{'Afficher plus --->'}</h6>}
            </>
        )}


        <AddPost footerRef={footerRef} addNewPost={addNewPost} />
    </div>
}
