import { useRef, useState } from 'react'
import add from '../../assets/add.svg'
import { useIntersecting } from '../../hooks'
import { motion } from 'framer-motion'
import EditNewPost from './EditNewPost'

const buttonVariants = {
    visible: {rotate: 0, opacity: 1, scale: 1},
    hidden: {rotate: 180, opacity: 0, scale: .8}
}

export default function AddPost({footerRef}) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalRef = useRef(null)
    const buttonRef = useRef(null)

    function toggleIsModalOpen() {
        if (!isModalOpen) {
            modalRef.current.style.display = 'block'
        }

        setIsModalOpen(isOpen => !isOpen)
    }
    
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
        <motion.button
            ref={buttonRef}
            variants={buttonVariants}
            animate={isModalOpen ? 'hidden' : 'visible'}
            whileHover={{scale: 1.03}}
            className='add_post bg-primary'
            onClick={toggleIsModalOpen}
        >
            <img src={add} alt="add icon" />
        </motion.button>

        <EditNewPost closeModal={toggleIsModalOpen} ref={modalRef} isModalOpen={isModalOpen} />
    </div>
}
