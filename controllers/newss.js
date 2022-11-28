import { News } from "../models/news.js";
import { makeNewsApiCall } from "../src/services/newsService.js";
import fetch from 'node-fetch';

const create = async (req, res) => {
    try {

        const news = await News.findByIdAndUpdate("628af68d7e91cd2fda1335b0", { status: req.body.status, articles: req.body.articles, totalResults: req.body.totalResults, upsert: true })
        await news.save()
        
        return res.status(201).json(news)
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const newsUpdate = async (req, res) => {
    console.log("POOOOOPPOOOOOOPOOOOO")
    let poop = await fetch(`http://newsapi.org/v2/everything?q=chicago+gun+crime&sortBy=publishedAt&domains=wgntv.com,abc7chicago.com,foxnews.com,nbcnews.com,nypost.com,chicagotribune.com,abcnews.go.com,chicago.suntimes.com,wbez.org,thedailybeast.com,dailycaller.com,nypost.com&apiKey=fca7629171c143338ccaa74f5c0bb383`)
    const newsData = await poop.json()
    console.log("Inner makeNewsApiCall Log", newsData)
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
    newsUpdate
}
