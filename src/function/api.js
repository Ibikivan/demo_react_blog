
const baseUrl = 'https://jsonplaceholder.typicode.com'

/**
 * Obtenir la liste des poste de la page et de la limite spécifiée
 * @param {number} page 
 * @param {number} limit 
 * @returns {Array}
 */
export async function getPosts(page=1, limit=3) {
    const url = new URL(baseUrl + '/posts')
    url.searchParams.set('_limit', limit)
    url.searchParams.set('_page', page)

    const res = await fetch(url.toString())
    if (!res?.ok) throw new Error('Une erreur est survenue', {cause: res})
    return res.json()
}

/**
 * Obtenir le post sont l'id est spécifié
 * @param {number} id 
 * @returns {object}
 */
export async function getPost(id) {
    const res = await fetch(baseUrl + `/posts/${id}`)
    if (!res?.ok) throw new Error('Une erreur est survenue', {cause: res})
    return res.json()
}

/**
 * Obtenir tous les commentaires
 * @returns {Array}
 */
export async function getComments(postId, page=1, limit=2) {
    const url = new URL(baseUrl + `/posts/${postId}/comments`)
    url.searchParams.set('_limit', limit)
    url.searchParams.set('_page', page)

    const res = await fetch(url.toString())
    if (!res?.ok) throw new Error('Une erreur est survenue', {cause: res})
    return res.json()
}

/**
 * Ajoute un commentaire à la liste des commentaires
 * @param {SubmitEvent} event 
 * @param {number} event 
 * @returns {object}
 */
export async function addComment(event, postId) {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.set('email', 'ibikivan1@gmail.com')
    formData.set('name', 'ibikiv')

    if (!formData.get('body')) throw new Error('Contenue de commentaire invalide', {cause: formData.get('body')})

    const data = {
        ...Object.fromEntries(formData)
    }

    const res = await fetch(baseUrl + `/comments`, {
        headers: {
            'Accept': 'application/json; charset=UTF-8',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    if (!res?.ok) throw new Error('Une erreur est survenue', {cause: res})

    event.target.reset()
    return res.json()
}
