import { Link } from 'react-router-dom'
import defaultCoverThumb from '../../assets/default_cover_thumb.png'

export default function PostCard({cardWidth, post}) {

    if (!post.cover) {
        post.coverthumb = defaultCoverThumb
    }

    return <div className="card" style={{width: cardWidth}}>
        <img src={post.coverthumb} className="card-img-top" alt={`${post.title} cover`} />
        <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text justify">{post.body}</p>
            <Link to={`${post.id}`} className="btn btn-primary">Lire...</Link>
        </div>
    </div>
}
