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

export const makeNewsApiCall = async() => {
    let dbNews = await getNews()
    return dbNews
}

export const getNews = async() => {
    let res = await fetch('api/news')
    console.log(res)
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
