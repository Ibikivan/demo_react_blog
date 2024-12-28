
/**
 * @param {{setPage: (page) => page}} param0
 */
export default function SeeMore({setPage, page}) {
    const seeMore = "Afficher plus --->"
    return <h6 className="see_more text-secondary" onClick={() => setPage(page++)}>{seeMore}</h6>
}
