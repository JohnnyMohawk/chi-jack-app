const BASE_URL = '/api/news/'
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('fca7629171c143338ccaa74f5c0bb383');


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

// export const makeNewsApiCall = async() => {
//     try {
//         let res = await fetch('https://newsapi.org/v2/everything?q=chicago+carjacking&sortBy=publishedAt&domains=wgntv.com,abc7chicago.com,foxnews.com,nbcnews.com,nypost.com,chicagotribune.com,abcnews.go.com,chicago.suntimes.com,wbez.org,thedailybeast.com,dailycaller.com,nypost.com&apiKey=fca7629171c143338ccaa74f5c0bb383')
//         const newsData = await res.json()
//         console.log("Inner makeNewsApiCall Log", newsData)
//         return (
//             {
//                 news: newsData,
//                 numPages: Math.floor(newsData.articles.length / 5),
//                 pages: chunkArray(indexArray(newsData.articles), 5),
//             }
//         )
//     } catch (error) {
//         throw error
//     }
// }

// newsapi.articles({
//     source: 'associated-press',
//     sortBy: 'top'
// }, (err, articlesResponse) => {
//     if (err) console.error(err);
//     else console.log("ASSSSS", articlesResponse);
// });

// export const nodeNewsApiCall = async() => {
//     await newsapi.articles({
//         source: 'associated-press',
//         sortBy: 'top'
//     }, (err, articlesResponse) => {
//         if (err) console.error(err);
//         else console.log("ASSSSS", articlesResponse);
//     });
// }


export const makeNewsApiCall = async() => {
    let dbNews = await getNews()
    try {
        if(new Date().toISOString().split('T')[0] > new Date(dbNews.pullDate).toISOString().split('T')[0]){
            let res = await fetch(`http://newsapi.org/v2/everything?q=chicago+carjacking&sortBy=publishedAt&domains=wgntv.com,abc7chicago.com,foxnews.com,nbcnews.com,nypost.com,chicagotribune.com,abcnews.go.com,chicago.suntimes.com,wbez.org,thedailybeast.com,dailycaller.com,nypost.com&apiKey=fca7629171c143338ccaa74f5c0bb383`)
            const newsData = await res.json()
            console.log("Inner makeNewsApiCall Log", newsData)
            if(newsData.status === "ok"){
                todaysNews({status: newsData.status, totalResults: newsData.totalResults, articles: newsData.articles})
            }
            return (
                {
                    news: newsData,
                    numPages: Math.floor(newsData.articles.length / 5),
                    pages: chunkArray(indexArray(newsData.articles), 5),
                }
            )
        }else{
            return dbNews
        }
    } catch (error) {
        throw error
    }
}

export const getNews = async() => {
    let res = await fetch('api/news')
    const newsDbData = await res.json()
    console.log("Inner getNews Log", newsDbData)
    return (
        {
            news: newsDbData,
            numPages: Math.floor(newsDbData.articles.length / 5),
            pages: chunkArray(indexArray(newsDbData.articles), 5),
            pullDate: new Date(newsDbData.updatedAt.split('T')[0]),
        }
    )
}

export const indexArray = (array) => {
    let iArray = []
    for (let index = 0; index < array.length; index++) {
        iArray.push(index)
    }
    return iArray
}

export const chunkArray = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index + chunk_size);
        tempArray.push(myChunk);
    }
    return tempArray;
}
