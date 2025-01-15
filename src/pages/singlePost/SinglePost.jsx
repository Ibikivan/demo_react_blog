import Comments from "../../components/Comments"
import PageTitle from "../../components/PageTitle"
import defaultCover from '../../assets/default_cover.png'
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { useQuery } from "react-query"
import { getPost } from "../../function/api"
import Spinner from "../../components/Spinner"
import Alert from "../../components/Alert"

export default function SinglePost() {

    const { id } = useParams()

    const queryKey = ['posts', `post-${id}`]
    const { isLoading, data: post, error } = useQuery(queryKey, () => getPost(id))

    useEffect(() => {
        const prevTitle = document.title
        if (post?.title) {
            document.title = post.title
        }

        return () => document.title = prevTitle
    }, [post?.title])

    if (post && !post.cover) {
        post.cover = defaultCover
    }

    if (isLoading) return <Spinner otherClass='mx-auto my-4' />
    if (error) return <Alert colorClassName="danger" otherClass="container my-4" content={error} />

    return <div className="container vstack gap-3 my-3">
        
        <PageTitle title={post.title} />

        <motion.img layoutId={`cover-${id}`} src={post.cover} className="img-fluid img-thumbnail" alt={`${post.title} cover`} />
        <p className="card-text justify">{post.body}</p>

        <Comments postId={id} />

    </div>

}
