const newsModel = require('./news.mongo')

async function getAllDocs(){
    return await newsModel.find({},'-__v')
}

module.exports = {
    getAllDocs
}