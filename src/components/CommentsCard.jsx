
/**
 * @param {{name: string, body: string}} param0 
 */
export default function CommentsCard({email, name, body}) {
    return <div className="gap-3 container-fluid">
        <h5 title={email}>{name}:</h5>
        <p className="card-text">{body}</p>
    </div>
}
