import React, {useState, useEffect} from "react"
import CardItem from "./CardItem"
import './Cards.css'
import * as newsService from '../services/newsService'


function Cards() {

    const [news, setNews] = useState(null)
    const [numPages, setNumPages] = useState(0)
    const [pages, setPages] = useState(0)
    const [counter, setCounter] = useState(0)

    const today = new Date().toISOString().split('T')[0]

    // const yesterday = new Date('2022-05-07')

    const checkCount = () => {
        if (counter > numPages - 1){
            setCounter(0)
        }else if (counter < 0) {
            setCounter(numPages - 1)
        }
    }

    // const makeNewsApiCall = async() => {
    //     let res = await fetch('https://newsapi.org/v2/everything?q=chicago+carjacking&sortBy=publishedAt&domains=wgntv.com,abc7chicago.com,foxnews.com,nbcnews.com,nypost.com,chicagotribune.com,abcnews.go.com,chicago.suntimes.com,wbez.org&apiKey=fca7629171c143338ccaa74f5c0bb383')
    //     const newsData = await res.json()
    //     console.log("Inner makeNewsApiCall Log", newsData)
    //     newsService.todaysNews({status: newsData.status, totalResults: newsData.totalResults, articles: newsData.articles})
    //     setNews(newsData)
    //     setNumPages(Math.floor(newsData.articles.length / 5))
    // }


    const makeNewsApiCall = async() => {
        let pullDate = await getPullDate()
        setNumPages(pullDate.numPages)
        setPages(pullDate.pages)

        if(new Date(today) > new Date(pullDate.pullDate)){
            let res = await fetch('https://newsapi.org/v2/everything?q=chicago+carjacking&sortBy=publishedAt&domains=wgntv.com,abc7chicago.com,foxnews.com,nbcnews.com,nypost.com,chicagotribune.com,abcnews.go.com,chicago.suntimes.com,wbez.org&apiKey=fca7629171c143338ccaa74f5c0bb383')
            const newsData = await res.json()
            console.log("Inner makeNewsApiCall Log", newsData)
            newsService.todaysNews({status: newsData.status, totalResults: newsData.totalResults, articles: newsData.articles})
            setNews(newsData)
            // setNumPages(Math.floor(newsData.articles.length / 5))
            // let iArray = indexArray(newsData.articles)
            // setPages(chunkArray(iArray, 5))
        }else{
            getNews()
        }
    }

    const getNews = async() => {
        let res = await fetch('api/news')
        const newsDbData = await res.json()
        console.log("Inner getNews Log", newsDbData)
        setNews(newsDbData)
    }

    const getPullDate = async() => {
        let res = await fetch('api/news')
        const newsDbData = await res.json()
        // setNumPages(Math.floor(newsDbData.articles.length / 5))
        // let numPages = Math.floor(newsDbData.articles.length / 5)
        // let iArray = indexArray(newsDbData.articles)
        // let pages = chunkArray(iArray, 5)
        // setPages(chunkArray(iArray, 5))
        return (
            {
                pullDate: new Date(newsDbData.updatedAt.split('T')[0]),
                numPages: Math.floor(newsDbData.articles.length / 5),
                pages: chunkArray(indexArray(newsDbData.articles), 5)
            }
        )

    }

    const indexArray = (array) => {
        let iArray = []
        for (let index = 0; index < array.length; index++) {
            iArray.push(index)
        }
        return iArray
    }

    const chunkArray = (myArray, chunk_size) => {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
        
        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index + chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }
    
        return tempArray;
    }

    useEffect(() => {
        checkCount()
        console.log(counter)
    }, [counter])


    useEffect(() => {

        makeNewsApiCall()

    }, [])
    console.log(pages, numPages)
    return (
        news ? 
        <>
        <div className='cards'>
            <h1>Chicago Carjackings in the News</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem 
                        src={news.articles[pages[counter][0]].urlToImage}
                            // src={news.articles[0].urlToImage}
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
                <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
                <button onClick={() => setCounter(counter - 1)}>Decrease Counter</button>
            </div>
        </div>
        </>
        :
        <></>
    )
}

export default Cards