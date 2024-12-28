import Comments from "../../components/Comments"
import PageTitle from "../../components/PageTitle"

export default function SinglePost({title, cover, body, id}) {

    return <div className="container vstack gap-3 my-3">
        
        <PageTitle title={title} />

        <img src={cover} className="img-fluid img-thumbnail" alt={`${title} cover`} />
        <p className="card-text justify">{body}</p>

        <Comments postId={id} />

    </div>
}
