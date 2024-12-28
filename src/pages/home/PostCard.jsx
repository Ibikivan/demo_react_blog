import defaultCover from '../../assets/default_cover.png'
import defaultCoverThumb from '../../assets/default_cover_thumb.png'

export default function PostCard({cardWidth, post, setActiveNav}) {

    if (!post.cover) {
        post.cover = defaultCover
        post.coverthumb = defaultCoverThumb
    }

    const handleClick = (e) => {
        e.preventDefault()
        setActiveNav({
            page: "singlePost",
            pageData: post
        })
    }

    return <div className="card" style={{width: cardWidth}}>
        <img src={post.coverthumb} className="card-img-top" alt={`${post.title} cover`} />
        <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text justify">{post.body}</p>
            <a href="#" className="btn btn-primary" onClick={handleClick}>Lire...</a>
        </div>
    </div>
}
