import { useEffect, useRef } from "react"
import { useIntersecting } from "../hooks"
import CommentsCard from "./CommentsCard"
import Button from "./form/Button"
import InputText from "./form/InputText"
import Spinner from "./Spinner"
import Alert from "./Alert"
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query"
import { addComment, getComments } from "../function/api"

/**
 * @param {{postId: number}} param0 
 */
export default function Comments({postId}) {

    const spinnerRef = useRef(null)
    const queryClient = useQueryClient()
    const queryKey = [`comments-${postId}`]
    let fetchingRef = useRef(null)

    const {isFetching, data, error, fetchNextPage, hasNextPage} = useInfiniteQuery(queryKey, ({pageParam}) => getComments(postId, pageParam), {
        staleTime: 60_000,
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined,
    })
    const comments = data?.pages?.flat() || []

    const {
        isLoading: isUpdating,
        mutate,
        error: addError,
        reset
    } = useMutation(async event => await addComment(event, postId), {
        onSuccess: (comment) => {
            queryClient.setQueryData(queryKey, (comments) => {
                comments?.pages[0].unshift(comment)
                return comments
            })
            reset()
        }
    })

    if (spinnerRef.current) {
        if (!hasNextPage) {
            spinnerRef.current.style.display = 'none'
        } else {
            spinnerRef.current.style.display = ''
        }
    }

    useEffect(() => {
        fetchingRef.current = isFetching
    }, [isFetching])


    /**
     * Observe le loader de commentaires pour charger les pasges suivantes s'il est visible
     * @param {IntersectionObserverEntry} entries 
     * @param {observer} observer 
     * @returns {null}
     */
    const callBack = (entries, observer) => {

        if (!spinnerRef.current) {return null}

        entries.forEach((entry) => {
            if (entry.isIntersecting && !fetchingRef.current) {
                fetchNextPage()
            }
        })
        
    }

    useIntersecting(spinnerRef, callBack)

    return <div className="vstack gap-3 p-3">
        <form onSubmit={mutate}>
            <fieldset>
                <legend>Commentaires</legend>

                <div className="hstack gap-3">
                    <InputText name="body" placeHolder="Ecrivez un commentaire..." compClasses="grow" />
                    <Button 
                        content={
                            (isFetching || isUpdating) ? <Spinner otherClass='text-light small_loader' /> : 'Envoyer'
                        }
                        type="submit"
                        disabled={isFetching || isUpdating}
                    />
                </div>
            </fieldset>
            {addError && <Alert colorClassName="danger" content={addError} otherClass="my-2" />}
        </form>

        <div className="comment_container">
            {comments.map((comment, index) => (
                <CommentsCard key={comment?.id + '-' + index} comment={comment} />
            ))}
            <Spinner ref={spinnerRef} />
            {error && <Alert content={error} colorClassName="danger" />}
        </div>
    </div>
}
