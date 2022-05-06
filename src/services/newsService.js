// import { News } from "../../models/news"

const BASE_URL = '/api/news/'


export const todaysNews = async (news) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {'content-type': 'application/json',},
            body: JSON.stringify(news)
        }, { mode: 'cors' })
        const data = await res.json()
        return data
    } catch (error) {
        throw error
    }
}

// export const getNews = async () => {
//     try {
//         const res = await fetch(BASE_URL, { mode: "cors" })
//         const data = await res.json()
//         return data
//     } catch (error) {
//         throw error
//     }
// }
