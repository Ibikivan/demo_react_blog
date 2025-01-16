import { forwardRef, useId, useRef } from "react";
import { createPortal } from "react-dom";
import InputText from "../../components/form/InputText";
import TextArea from "../../components/form/TextArea";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { handleAnimCoplete, preventClickBehaviour } from "../../function";
import { useMutation, useQueryClient } from "react-query";
import { addNewPost } from "../../function/api";
import { motion } from "framer-motion";

const coverVariants = {
    visible: {opacity: 1},
    hidden: {opacity: 0}
}

const bodyVariants = {
    visible: {y: 0, opacity: 1},
    hidden: {y: '-50%', opacity: 0}
}

export default forwardRef(function EditNewPost({closeModal, isModalOpen}, ref) {

    const queryClient = useQueryClient()
    const queryKey = ['posts']
    const id = useId()
    const formRef = useRef(null)

    const {isLoading, mutate, error, reset} = useMutation(async event => await addNewPost(event), {
        onSuccess: (post) => {
            queryClient.setQueryData(queryKey, (posts) => {
                posts?.pages[0]?.unshift(post)
                return posts
            })
            reset()
            closeModal()
        }
    })

    const handleCancled = () => {
        formRef.current.reset()
        closeModal()
        reset()
    }

    return createPortal(<motion.div
        ref={ref}
        variants={coverVariants}
        animate={isModalOpen ? 'visible' : 'hidden'}
        onAnimationComplete={() => handleAnimCoplete(isModalOpen, ref)}
        className="modal modal_cover"
        tabIndex="-1"
        onClick={closeModal}
    >
        <motion.div
            variants={bodyVariants}
            animate={isModalOpen ? 'visible' : 'hidden'}
            className="modal-dialog"
            onClick={preventClickBehaviour}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Ajouter un article</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModal}
                        disabled={isLoading ? true : false}
                    ></button>
                </div>
                <div className="modal-body">
                    <form ref={formRef} id={id} onSubmit={mutate}>
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
                        {error && <Alert colorClassName="danger" content={error} /> }
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
        </motion.div>
    </motion.div>, document.body)

})
