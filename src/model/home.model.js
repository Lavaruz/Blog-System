const newsModel = require('./news.mongo')

async function getAllDocs(){
    return await newsModel.find({},'-__v').sort('-newsId').populate('autor')
}

async function getDocById(id){
    return await newsModel.findById(id).populate('autor')
}

async function getDocByAutor(autor){
    return await newsModel.find({autor:autor}).populate('autor')
}

module.exports = {
    getAllDocs,
    getDocById,
    getDocByAutor
}