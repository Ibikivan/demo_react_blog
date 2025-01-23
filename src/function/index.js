
/**
 * @param {SyntheticEvent} e 
 */
export const preventClickBehaviour = (e) => {
    e.stopPropagation()
}

/**
 * Passe le display de la modal à none après l'animation
 * @param {boolean} isModalOpen 
 * @param {RefObject} ref 
 */
export const handleAnimCoplete = (isModalOpen, ref) => {
    if (!isModalOpen) ref.current.style.display = ''
}

/**
 * réduit la taille d'une chaine de caratères à une longeur définie
 * @param {string} statement 
 * @param {number} length 
 * @returns 
 */
export function reduceStatement(statement, length) {

    if (statement.length <= length) return statement

    const stateArray = statement.split('')
    stateArray.splice(length, (statement.length - length))
    return `${stateArray.join('')}...`

}

/**
 * Positionne l'élément relatif par rapport à l'élément référence, à la taille de la page et à la marge
 * @param {HTMLElement} reference 
 * @param {HTMLElement} relativeElement 
 * @param {number} margin 
 */
export function handleScroll(reference, relativeElement, margin) {
    const rect = reference.getBoundingClientRect()
    const intersecting = rect.top < window.innerHeight
    const movingY = rect.top - margin
    const fixedY = window.innerHeight - margin

    relativeElement.style.top = `${intersecting ? movingY: fixedY}px`
}
