import { useEffect, useRef, useState } from "react"
import { useIncrementData, useIntersecting } from "../hooks"
import CommentsCard from "./CommentsCard"
import Button from "./form/Button"
import InputText from "./form/InputText"
import Spinner from "./Spinner"
import { fetchData, handleSubmit } from "../function"
import Alert from "./Alert"

/**
 * @param {{postId: number}} param0 
 */
export default function Comments({postId}) {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const [page, setPage] = useState(0)
    const spinnerRef = useRef(null)
    const pageRef = useRef(page)
    const url = `https://jsonplaceholder.typicode.com/comments`
    // const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`

    const {dataBuch, isDataEmpty} = useIncrementData(data, isError)

    useEffect(() => {
        pageRef.current = page
    }, [page])

    if (spinnerRef.current) {
        if ((pageRef.current > 1 && isDataEmpty) || isError) {
            spinnerRef.current.style.display = 'none'
        } else {
            spinnerRef.current.style.display = ''
        }
    }

    const callBack = (entries, observer) => {

        if (!spinnerRef.current) {return null}

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                fetchData({pageRef, spinnerRef, url, setData, isLoading, setIsLoading, setPage, setIsError})
            }
        })
        
    }

    useIntersecting(spinnerRef, callBack)

    return <div className="vstack gap-3 p-3">
        <form onSubmit={(e) => handleSubmit(e, {url, setData, setIsLoading, setIsError})}>
            <fieldset>
                <legend>Commentaires</legend>

                <div className="hstack gap-3">
                    <InputText name="body" placeHolder="Ecrivez un commentaire..." compClasses="grow" />
                    <Button content="Envoyer" type="submit" disabled={isLoading ? true : false} />
                </div>
            </fieldset>
        </form>

        <div className="comment_container">
            {dataBuch.map((comment) => (
                <CommentsCard key={comment.id} email={comment.email} name={comment.name} body={comment.body} />
            ))}
            <Spinner ref={spinnerRef} />
            {((pageRef.current > 1 && isDataEmpty) && !isError) && <Alert content="Alert: Aucun commentaire disponible" colorClassName="warning" />}
            {(isError && !isLoading) && <Alert content={isError} colorClassName="danger" />}
        </div>
    </div>
}
