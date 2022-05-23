import { News } from "../models/news.js";

const create = async (req, res) => {
    try {

        const news = await News.findByIdAndUpdate("628af68d7e91cd2fda1335b0", { status: req.body.status, articles: req.body.articles, totalResults: req.body.totalResults, upsert: true })
        await news.save()
        
        return res.status(201).json(news)
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

// const create = async (req, res) => {
//     try {
//         const news = await new News(req.body)
//         await news.save()
        
//         return res.status(201).json(news)
//     } catch (err) {
//         return res.status(500).json({ err: err.message })
//     }
// }

const newsIndex = async (req, res) => {
    try {

        const news = await News.findById("628af68d7e91cd2fda1335b0")
        return res.status(201).json(news)
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

export {
    create,
    newsIndex,
}
