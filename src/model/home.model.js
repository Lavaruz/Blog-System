const newsModel = require('./news.mongo')

async function getAllDocs(){
    return await newsModel.find({},'-__v').sort('-newsId').populate('autor','-googleId -password -__v')
}

async function getDocById(id){
    return await newsModel.findById(id, '-__v').populate('autor','-googleId -password -__v')
}

async function getDocByAutor(autor){
    return await newsModel.find({autor:autor},'-__v').populate('autor','-googleId -password -__v')
}

module.exports = {
    getAllDocs,
    getDocById,
    getDocByAutor
}