import { useEffect } from "react"

export function useIntersecting(elementRef, callBack) {
    useEffect(() => {
        if (elementRef) {
            const options = {
                root: document,
                rootMargin: '0px',
                threshold: 0
            }
        
            const observer = new IntersectionObserver(callBack, options)
            observer.observe(elementRef.current)
        }
    }, [])
}
