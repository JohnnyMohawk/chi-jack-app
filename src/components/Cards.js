import React, {useState, useEffect} from "react"
import CardItem from "./CardItem"
import './Cards.css'
import * as newsService from '../services/newsService'

// import { News } from '../../models'

function Cards() {

    const [news, setNews] = useState(null)
    // const [validForm, setValidForm] = useState(false)
    // const [formData, setFormData] = useState({
    //     status: '',
    //     totalResults: null,
    //     articles: [],
    // })


    // const handleChange = evt => {
    //     setFormData({ ...formData, [evt.target.name]: evt.target.value })
    // }

    // const handleSubmit = evt => {
    //     evt.preventDefault()
    //     newsService.todaysNews(formData)
    //     setFormData({status: '', totalResults: null, articles: []})
    // }

    const makeNewsApiCall = async() => {
        let res = await fetch('https://newsapi.org/v2/everything?q=chicago+carjacking&sortBy=publishedAt&domains=wgntv.com,abc7chicago.com,foxnews.com,nbcnews.com,nypost.com,chicagotribune.com,abcnews.go.com,chicago.suntimes.com,wbez.org&apiKey=fca7629171c143338ccaa74f5c0bb383')
        const newsData = await res.json()
        setNews(newsData)
        // console.log(newsData.status, newsData.totalResults, newsData.articles)
        // setFormData({status: newsData.status, totalResults: newsData.totalResults, articles: newsData.articles})
        newsService.todaysNews({status: newsData.status, totalResults: newsData.totalResults, articles: newsData.articles})
        // setFormData({status: '', totalResults: null, articles: []})
    }

    // useEffect(() => {
    //     const { news } = formData
    //     const isFormInvalid = !(news)
    //         setValidForm(isFormInvalid)
    //     }, [formData])

    useEffect(() => {
        makeNewsApiCall()
        const currentTime = new Date().getTime();  //current unix timestamp
        const execTime = new Date().setHours(20,0,0,0);  //API call time = today at 20:00
        let timeLeft;
        if(currentTime < execTime) {
            //it's currently earlier than 20:00
            timeLeft = execTime - currentTime;
            console.log(currentTime, execTime, timeLeft)
        } else {
            //it's currently later than 20:00, schedule for tomorrow at 20:00
            timeLeft = execTime + 86400000 - currentTime
            console.log(currentTime, execTime, timeLeft)
        }
        setTimeout(function() {
            setInterval(function() {

                makeNewsApiCall()

            }, 86400000);  //repeat every 24h
        }, timeLeft);  //wait until 20:00 as calculated above
    }, [])

    return (
        news ? 
        <>
        <div className='cards'>
            <h1>Chicago Carjackings in the News</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem 
                            src={news.articles[0].urlToImage}
                            text={news.articles[0].content}
                            label={`${news.articles[0].source.name} ${new Date(news.articles[0].publishedAt.split('T')[0]).toDateString()}`}
                            path={news.articles[0].url}
                        />
                        <CardItem 
                            src={news.articles[1].urlToImage}
                            text={news.articles[1].content}
                            label={`${news.articles[1].source.name} ${new Date(news.articles[1].publishedAt.split('T')[0]).toDateString()}`}
                            path={news.articles[1].url}
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem 
                            src={news.articles[2].urlToImage}
                            text={news.articles[2].content}
                            label={`${news.articles[2].source.name} ${new Date(news.articles[2].publishedAt.split('T')[0]).toDateString()}`}
                            path={news.articles[2].url}
                        />
                        <CardItem 
                            src={news.articles[3].urlToImage}
                            text={news.articles[3].content}
                            label={`${news.articles[3].source.name} ${new Date(news.articles[3].publishedAt.split('T')[0]).toDateString()}`}
                            path={news.articles[3].url}
                        />
                        <CardItem 
                            src={news.articles[4].urlToImage}
                            text={news.articles[4].content}
                            label={`${news.articles[4].source.name} ${new Date(news.articles[4].publishedAt.split('T')[0]).toDateString()}`}
                            path={news.articles[4].url}
                        />
                    </ul>
                </div>
            </div>
        </div>
        </>
        :
        <></>
    )
}

export default Cards