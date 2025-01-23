import { useEffect, useRef, useState } from 'react'
import add from '../../assets/add.svg'
import { motion } from 'framer-motion'
import EditNewPost from './EditNewPost'
import { handleScroll } from '../../function'

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

    useEffect(() => {
        if (footerRef && buttonRef) {
            window.addEventListener('scroll', () => handleScroll(footerRef.current, buttonRef.current, 100))

            return () => {
                window.removeEventListener('scroll', () => handleScroll(footerRef.current, buttonRef.current, 100))
            }
        }
    }, [])

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
