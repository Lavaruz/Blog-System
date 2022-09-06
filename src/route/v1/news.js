const express = require('express')
const {getAllDocs, getDocById} = require('../../model/home.model')

const newsRouter = express.Router()

// GET ALL
newsRouter.get('/', async(req,res)=>{
    try{
        const docs = await getAllDocs()
        return res.status(200).json(docs)
    }catch (err){
        return res.status(500).json({error: err.message})
    }
})

// GET ONE
newsRouter.get('/:id', getOneById,(req,res)=>{
    return res.status(200).json(res.documentById)
})



// Function to get one by ID
async function getOneById(req,res,next){
    let document
    try{
        document = await getDocById(req.params.id)
        if (document==null){
            return res.status(404).json({error: "News not found!"})
        }
    }catch{
        return res.status(400).json({message: err.message})
    }
    res.documentById = document
    next()
}

module.exports = {
    newsRouter
}