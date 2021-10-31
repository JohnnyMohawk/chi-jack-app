const BASE_URL = '/api/emails/'


export const createEmail = async (email) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {'content-type': 'application/json',},
            body: JSON.stringify(email)
        }, { mode: 'cors' })
        const data = await res.json()
        return data
    } catch (error) {
        throw error
    }
}