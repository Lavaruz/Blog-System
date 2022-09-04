const newsModel = require('./news.mongo')

const DEFAULT_LATEST_ID = 0

async function saveNews(data){
    await newsModel.create(data)
}

async function getLatestDoc(){
    const allDocs = await newsModel.find()
    if (!allDocs){
        return DEFAULT_LATEST_ID
    }
    return allDocs.length; 
}

async function addNewNews(data){
    const newData = Object.assign(data, {
        date: new Date().toLocaleDateString('id'),
        newsId: await getLatestDoc() + 1
    })
    saveNews(newData)
}

module.exports = {
    addNewNews,
}
