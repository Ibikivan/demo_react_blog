import Comments from "../../components/Comments"
import PageTitle from "../../components/PageTitle"
import defaultCover from '../../assets/default_cover.png'
import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks"
import Spinner from "../../components/Spinner"

export default function SinglePost() {

    const { id } = useParams()
    const { isLoading, isError, data } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (isLoading) {
        return <div className="spinner_container">
            <Spinner colorClassName='primary' />
        </div>
    }

    if (isError) {
        return <div className="alert_container">
            <Alert colorClassName="danger" content={isError} />
        </div>
    }

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
