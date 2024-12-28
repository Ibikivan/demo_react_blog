
/**
 * @param {HTMLElement} modalRef 
 * @param {number} delay 
 */
export const openModal = (modalRef, delay) => {
    const modalBody = modalRef.querySelector('.modal-dialog')
    modalRef.style.display = 'block'

    modalRef.animate(
        [
            {opacity: "0"},
            {opacity: "1"},
        ],
        {
            duration: delay,
            easing: 'ease-out',
            fill: 'forwards'
        }
    )

    modalBody.animate(
        [
            {transform: "translateY(-50%)"},
            {transform: "translateY(0)"},
        ],
        {
            duration: delay,
            easing: 'ease-out',
            fill: 'forwards'
        }
    )
}

/**
 * @param {HTMLElement} modalRef
 * * @param {number} delay 
 */
export const closeModal = (modalRef, delay) => {
    const modalBody = modalRef.querySelector('.modal-dialog')

    modalBody.animate(
        [
            {transform: "translateY(0)"},
            {transform: "translateY(-50%)"},
        ],
        {
            duration: delay,
            easing: 'ease-in',
            fill: 'forwards'
        }
    )

    modalRef.animate(
        [
            {opacity: "1"},
            {opacity: "0"},
        ],
        {
            duration: delay,
            easing: 'ease-in',
            fill: 'forwards'
        }
    )
}

/**
 * @param {HTMLElement} modal 
 * @param {HTMLElement} button 
 */
export const handleOpenModal = (modal, button) => {
    const animationDelay = 300

    button.animate(
        [
            {transform: "rotate(0)"},
            {transform: 'scale(1)'},
            {transform: "rotate(90deg)"},
            {transform: 'scale(0.95)'},
        ],
        {
            duration: animationDelay,
            easing: 'ease-in',
            fill: 'forwards'
        }
    )

    setTimeout(() => {
        button.style.display = 'none'
        openModal(modal, animationDelay)
    }, animationDelay)
}

/**
     * @param {HTMLElement} modal 
     * @param {HTMLElement} button 
     */
export const handleCloseModal = (modal, button) => {
    const animationDelay = 300
    closeModal(modal, animationDelay)
    
    setTimeout(() => {
        modal.style.display = ''
        button.style.display = ''

        button.animate(
            [
                {transform: "rotate(45deg)"},
                {transform: "scale(0.95)"},
                {transform: "rotate(0)"},
                {transform: 'scale(1)'},
            ],
            {
                duration: animationDelay,
                easing: 'ease-out',
                fill: 'forwards'
            }
        )
    }, animationDelay)
}

/**
 * @param {Array} newData 
 * @param {(Array) => Array} dataSetter 
 */
export function appendData(newData, dataSetter) {
    if (newData && newData.length > 0) {
        dataSetter(data => [...data, ...newData])
    }

    if(!Array.isArray(newData) && newData.id) {
        dataSetter(data => [newData, ...data])
    }
}

/**
 * @param {SyntheticEvent} e 
 */
export const preventClickBehaviour = (e) => {
    e.stopPropagation()
}

/**
 * @param {SubmitEvent} e 
 * @param {() => null} fetchData 
 * @param {(v: string) => null} setIsValidationError 
 */
export const handleSubmitPost = (e, fetchData, setIsValidationError) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    

    if (formData.get('title')) {
        formData.set('userId', '1')
        fetchData(JSON.stringify(Object.fromEntries(formData)))
    } else {
        setIsValidationError('Attention: Veuillez ajouter un titre...')
    }
}

/**
 * @param {SubmitEvent} e 
 */
export const handleSubmit = (e, fetchOptions) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.set('email', 'ibikivan1@gmail.com')
    formData.set('name', 'ibikiv')

    fetchOptions.options = {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }
    fetchOptions.target = e.target

    fetchData(fetchOptions)
}

export async function fetchData({pageRef, spinnerRef, target, url, options = {method: 'GET'}, setData, isLoading, setIsLoading, setPage, setIsError}) {
    if (options.method === 'GET') {
        const nextPage = pageRef.current + 1
        if (!spinnerRef.current || isLoading) {return null}
        setPage(nextPage)
        if (pageRef.current < 1) {return null}
    }
    
    try {
        setIsLoading(true)
        const fetchUrl = new URL(url)
        if (options.method === 'GET') {
            fetchUrl.searchParams.set('_page', pageRef.current)
            fetchUrl.searchParams.set('_limit', 10)
        }

        const response = await fetch(fetchUrl, {
            ...options,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...options.headers
            }
        })

        if (response.ok) {
            setData(await response.json())
            setIsLoading(false)
            if (target) {target.reset()}
        }
    } catch (error) {
        console.log('An Error Occured -------> ', error)
        setIsError(error)
        setIsLoading(false)
    }
}
