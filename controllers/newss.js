import { News } from "../models/news.js";
import fetch from 'node-fetch';
import { CronJob } from "cron";

var job = new CronJob(
	'0 22 * * *',
	async function () {
        await fetch(`https://www.shyjack.com/api/news/news`);
	},
	null,
	true,
	'America/Chicago'
);


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
    let newsCall = await fetch(`http://newsapi.org/v2/everything?q=chicago+gun+crime&sortBy=publishedAt&domains=wgntv.com,abc7chicago.com,foxnews.com,nbcnews.com,nypost.com,chicagotribune.com,abcnews.go.com,chicago.suntimes.com,wbez.org,thedailybeast.com,dailycaller.com,nypost.com&apiKey=fca7629171c143338ccaa74f5c0bb383`)
    const newsData = await newsCall.json()
    console.log("Inner makeNewsApiCall Log", newsData)
    if(newsData.status === "ok"){
        const todaysNews = async (news) => {
            try {
                const res = await fetch('https://www.shyjack.com/api/news/', {
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
        todaysNews({status: newsData.status, totalResults: newsData.totalResults, articles: newsData.articles})
        return res.status(201).end()
    } else {
        return res.status(500).json({ err: newsData.status })
    }
}


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
