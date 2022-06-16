import React, {useState, useEffect} from "react"
import CardItem from "./CardItem"
import './Cards.css'
import * as newsService from '../services/newsService'


function Cards() {

    const [news, setNews] = useState(null)
    const [numPages, setNumPages] = useState(0)
    const [pages, setPages] = useState(0)
    const [counter, setCounter] = useState(0)

    const serverSideApiCall = async() => {
        let newsObj = await newsService.makeNewsApiCall()
        setNumPages(newsObj.numPages)
        setPages(newsObj.pages)
        setNews(newsObj.news)
    }

    useEffect(() => {
        serverSideApiCall()
        newsService.mediastackApiCall()
    }, [])
    console.log(news)
    return (
        
        news ? 
        <>
        <div className='cards'>
            <h1>Chicago Carjackings in the News</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    {/* <ul className='cards__items'>
                        <CardItem 
                        src={news[pages[counter][0]].image}
                            text={news[pages[counter][0]].description}
                            label={`${news[pages[counter][0]].source} ${new Date(news[pages[counter][0]].published_at).toDateString()}`}
                            path={news[pages[counter][0]].url}
                        />
                        <CardItem 
                            src={news[pages[counter][1]].image}
                            text={news[pages[counter][1]].description}
                            label={`${news[pages[counter][1]].source} ${new Date(news[pages[counter][1]].published_at).toDateString()}`}
                            path={news[pages[counter][1]].url}
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem 
                            src={news[pages[counter][2]].image}
                            text={news[pages[counter][2]].description}
                            label={`${news[pages[counter][2]].source} ${new Date(news[pages[counter][2]].published_at).toDateString()}`}
                            path={news[pages[counter][2]].url}
                        />
                        <CardItem 
                            src={news[pages[counter][3]].image}
                            text={news[pages[counter][3]].description}
                            label={`${news[pages[counter][3]].source} ${new Date(news[pages[counter][3]].published_at).toDateString()}`}
                            path={news[pages[counter][3]].url}
                        />
                        <CardItem 
                            src={news[pages[counter][4]].image}
                            text={news[pages[counter][4]].description}
                            label={`${news[pages[counter][4]].source} ${new Date(news[pages[counter][4]].published_at).toDateString()}`}
                            path={news[pages[counter][4]].url}
                        />
                    </ul> */}



                    <ul className='cards__items'>
                        <CardItem 
                        src={news.articles[pages[counter][0]].urlToImage}
                            text={news.articles[pages[counter][0]].content}
                            label={`${news.articles[pages[counter][0]].source.name} ${new Date(news.articles[pages[counter][0]].publishedAt).toDateString()}`}
                            path={news.articles[pages[counter][0]].url}
                        />
                        <CardItem 
                            src={news.articles[pages[counter][1]].urlToImage}
                            text={news.articles[pages[counter][1]].content}
                            label={`${news.articles[pages[counter][1]].source.name} ${new Date(news.articles[pages[counter][1]].publishedAt).toDateString()}`}
                            path={news.articles[pages[counter][1]].url}
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem 
                            src={news.articles[pages[counter][2]].urlToImage}
                            text={news.articles[pages[counter][2]].content}
                            label={`${news.articles[pages[counter][2]].source.name} ${new Date(news.articles[pages[counter][2]].publishedAt).toDateString()}`}
                            path={news.articles[pages[counter][2]].url}
                        />
                        <CardItem 
                            src={news.articles[pages[counter][3]].urlToImage}
                            text={news.articles[pages[counter][3]].content}
                            label={`${news.articles[pages[counter][3]].source.name} ${new Date(news.articles[pages[counter][3]].publishedAt).toDateString()}`}
                            path={news.articles[pages[counter][3]].url}
                        />
                        <CardItem 
                            src={news.articles[pages[counter][4]].urlToImage}
                            text={news.articles[pages[counter][4]].content}
                            label={`${news.articles[pages[counter][4]].source.name} ${new Date(news.articles[pages[counter][4]].publishedAt).toDateString()}`}
                            path={news.articles[pages[counter][4]].url}
                        />
                    </ul>
                </div>
                <div className="newsButtWrap">
                    <button className="newsButtons" onClick={() => counter > 0 ? setCounter(counter - 1) : setCounter(numPages - 1)}><i class="fas fa-minus"></i></button>
                    <button className="newsButtons" onClick={() => counter < numPages - 1 ? setCounter(counter + 1) : setCounter(0)}><i class="fas fa-plus"></i></button>
                </div>
            </div>
        </div>
        </>
        :
        <></>
    )
}

export default Cards