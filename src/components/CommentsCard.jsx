import Alert from "./Alert"

/**
 * @param {{name: string, body: string}} param0 
 */
export default function CommentsCard({comment}) {
    return <div className="gap-3 container-fluid">
        <h5 title={comment.email}>{comment.name}:</h5>
        <p className="card-text">{comment.body}</p>
    </div>
}
