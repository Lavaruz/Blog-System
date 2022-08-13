const newsModel = require('./news.mongo')

async function getAllDocs(){
    return await newsModel.find({},'-__v').sort('-newsId')
}

module.exports = {
    getAllDocs
}