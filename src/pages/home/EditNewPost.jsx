import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import InputText from "../../components/form/InputText";
import TextArea from "../../components/form/TextArea";
import { useFetch } from "../../hooks";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { handleSubmitPost, preventClickBehaviour } from "../../function";

export default forwardRef(function EditNewPost({closeModal, buttonRef, addNewPost}, ref) {

    const url = new URL('https://jsonplaceholder.typicode.com/posts')
    const {isLoading, data, isError, fetchData} = useFetch(url.toString(), {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    const id = useId()
    const formRef = useRef(null)
    const [isValidationError, setIsValidationError] = useState(false)
    const [addedPost, setAddedPost] = useState(null)

    useEffect(() => {
        if (Object.keys(data).includes("userId")) {
            addNewPost(data)
            setAddedPost(data)
            setTimeout(() => {
                handleCancled()
            }, 2000)
        }
    }, [data])

    const handleCloseModal = () => {
        if (!isLoading) {
            closeModal(ref.current, buttonRef.current)
        }
    }

    const handleCancled = () => {
        formRef.current.reset()
        handleCloseModal()
        setIsValidationError(false)
        setAddedPost(null)
    }

    return createPortal(<div ref={ref} className="modal modal_cover" tabIndex="-1" onClick={handleCloseModal}>
        <div className="modal-dialog" onClick={preventClickBehaviour}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Ajouter un article</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleCloseModal}
                        disabled={isLoading ? true : false}
                    ></button>
                </div>
                <div className="modal-body">
                    <form ref={formRef} id={id} onSubmit={(e) => handleSubmitPost(e, fetchData, setIsValidationError)}>
                        <InputText
                            type="text"
                            label="Titre du post"
                            name="title"
                            placeHolder="Entrez un titre..."
                            onChange={() => null}
                        />

                        <TextArea
                            label="Contenu"
                            name="body"
                            placeHolder="Entrez le contenu de l'article..."
                            onChange={() => null}
                        />
                    </form>
                </div>
                <div className="modal-footer d-flex">
                    <div className="modal_alert_container">
                        {isLoading && <Spinner colorClassName="primary" /> }
                        {(addedPost && !isLoading) && <Alert colorClassName="success" content={'SUCCESS: Post ajouté'} /> }
                        {(isError && (!isLoading && !addedPost)) && <Alert colorClassName="danger" content={isError} /> }
                        {(isValidationError && (!isLoading && !isError && !addedPost)) && <Alert colorClassName="warning" content={isValidationError} /> }
                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={handleCancled}
                        disabled={isLoading ? true : false}
                    >Annuler</button>
                    <button
                        type="submit" form={id}
                        className="btn btn-primary"
                        disabled={isLoading ? true : false}
                    >Ajouter</button>
                </div>
            </div>
        </div>
    </div>, document.body)
})
