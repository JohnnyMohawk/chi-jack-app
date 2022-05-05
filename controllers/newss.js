import { News } from "../models/news.js";

const create = async (req, res) => {
    try {

        const news = await News.findByIdAndUpdate("62701e74a91cd99400d3c718", { status: req.body.status, articles: req.body.articles, totalResults: req.body.totalResults, upsert: true })
        await news.save()
        
        return res.status(201).json(news)
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const newsIndex = async (req, res) => {
    try {

        const news = await News.findById("62701e74a91cd99400d3c718")
        return res.status(201).json(news)
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

export {
    create,
    newsIndex,
}
