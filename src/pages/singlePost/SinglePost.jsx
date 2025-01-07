import Comments from "../../components/Comments"
import PageTitle from "../../components/PageTitle"
import defaultCover from '../../assets/default_cover.png'
import { useLoaderData, useParams } from "react-router-dom"
import { useEffect } from "react"

export default function SinglePost() {

    const data = useLoaderData()
    const { id } = useParams()

    useEffect(() => {
        const prevTitle = document.title
        if (data.title) {
            document.title = data.title
        }

        return () => document.title = prevTitle
    }, [data?.title])

    if (!data.cover) {
        data.cover = defaultCover
    }

    return <div className="container vstack gap-3 my-3">
        
        <PageTitle title={data.title} />

        <img src={data.cover} className="img-fluid img-thumbnail" alt={`${data.title} cover`} />
        <p className="card-text justify">{data.body}</p>

        <Comments postId={id} />

    </div>
}
