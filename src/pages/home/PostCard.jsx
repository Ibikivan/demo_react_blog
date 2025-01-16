import { Link } from 'react-router-dom'
import defaultCoverThumb from '../../assets/default_cover_thumb.png'
import { motion } from 'framer-motion'
import { reduceStatement } from '../../function'

export default function PostCard({cardWidth, post}) {

    if (!post.cover) {
        post.coverthumb = defaultCoverThumb
    }

    return <div className="card" style={{width: cardWidth}}>
        <motion.img layoutId={`cover-${post.id}`} src={post.coverthumb} className="card-img-top" alt={`${post.title} cover`} />
        <div className="card-body">
            <h5 className="card-title">{reduceStatement(post.title, 20)}</h5>
            <p className="card-text justify">{reduceStatement(post.body, 100)}</p>
            <Link to={`${post.id}`} className="btn btn-primary">Lire...</Link>
        </div>
    </div>
}
