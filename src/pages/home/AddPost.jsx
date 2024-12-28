import { useRef } from 'react'
import add from '../../assets/add.svg'
import EditNewPost from './EditNewPost'
import { handleCloseModal, handleOpenModal } from '../../function'
import { useIntersecting } from '../../hooks'

export default function AddPost({footerRef}) {

    const modalRef = useRef(null)
    const buttonRef = useRef(null)
    
    /**
     * Intersection observer callBak
     * @param {IntersectionObserverEntry} entries 
     * @param {IntersectionObserver} observer 
     */
    const callBack = function (entries, observer) {
        if (!modalRef.current) {return null}
        
        entries.forEach((entry) => {
            const targetedPosition = entry.boundingClientRect.top + window.scrollY
            const buttonTop = buttonRef.current.getBoundingClientRect().top - buttonRef.current.getBoundingClientRect().height

            if (entry.isIntersecting) {
                buttonRef.current.style.position = 'absolute'
                buttonRef.current.style.bottom = '0'
                buttonRef.current.style.top = `${targetedPosition - buttonTop}px`
            } else {
                buttonRef.current.style.position = ''
                buttonRef.current.style.bottom = ''
                buttonRef.current.style.top = ''
            }
        })
    }
    
    useIntersecting(footerRef, callBack)

    return <div>
        <button ref={buttonRef} className='add_post bg-primary' onClick={() => handleOpenModal(modalRef.current, buttonRef.current)}>
            <img src={add} alt="add icon" />
        </button>

        <EditNewPost closeModal={handleCloseModal} ref={modalRef} buttonRef={buttonRef} />
    </div>
}
