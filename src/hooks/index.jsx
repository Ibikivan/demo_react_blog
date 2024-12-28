import { useEffect, useState } from "react"
import { appendData } from "../function"

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

/**
 * @param {string} url 
 * @param {FetchEventInit} options 
 * @returns {object}
 */
export function useFetch(url, options = {method: 'GET'}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const [data, setData] = useState([])

    /**
     * Effectue une requette http
     * @param {object} body request body
     */
    function fetchData(body) {
        setIsLoading(true)
        if (body) {options.body = body}
        
        fetch(url, {
            ...options,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...options.headers
            }
        })
        .then(resp => {if (resp.ok) return resp.json()})
        .then(resp => {
            setData(resp)
        })
        .catch(err => setIsError(err))
        .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (options.method.toUpperCase() === 'GET') {fetchData()}
    }, [url])

    return {isLoading, data, isError, fetchData}
}

/**
 * Cummule les données successives de différentes pages d'une même requêtte
 * @param {Array} dataToAdd 
 * @param {boolean} errorState 
 * @returns {Array}
 */
export function useIncrementData(dataToAdd, errorState) {
    const [dataBuch, setDataBunch] = useState([])
    const [isDataEmpty, setIsDataEmpty] = useState(false)

    useEffect(() => {
        if (!errorState) {
            appendData(dataToAdd, setDataBunch)
        }

        if (dataToAdd.length < 1) {
            setIsDataEmpty(true)
        } else {
            setIsDataEmpty(false)
        }
    }, [dataToAdd[0]?.id, dataToAdd?.body])

    return {dataBuch, isDataEmpty}
}
