const newsModel = require('./news.mongo')

async function getAllDocs(){
    return await newsModel.find({}).sort('-newsId').populate('autor','name description email image follower')
}

async function getDocById(id){
    return await newsModel.findById(id).populate('autor','name description email image follower')
}

async function getDocByAutor(autor){
    return await newsModel.find({autor:autor}).populate('autor','name description email image follower')
}

module.exports = {
    getAllDocs,
    getDocById,
    getDocByAutor
}