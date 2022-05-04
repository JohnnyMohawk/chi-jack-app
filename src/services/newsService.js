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

// export const indexNews = async (req, res) => {
//     // console.log(req.body)
//     try {
//         const news = await News.find({})
//         return res.status(200).json(news)
//     } catch (error) {
//         throw error
//     }
// }