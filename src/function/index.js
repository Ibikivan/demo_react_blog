
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
