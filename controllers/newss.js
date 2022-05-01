import { News } from "../models/news.js";

const create = async (req, res) => {
    try {
        const news = await new News(req.body)
        await news.save()
        
        return res.status(201).json(news)
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

export {
    create
}