import { useEffect } from "react"

/**
 * grand titre des pages
 * @param {{title: string}} param0
 */
export default function PageTitle({title}) {

    useEffect(() => {
        const previousTitle = document.title

        document.title = title
        return () => {
            document.title = previousTitle
        }
    }, [])

    return <h1>{title}</h1>
}
