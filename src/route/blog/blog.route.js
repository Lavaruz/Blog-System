const express = require('express')

const {getDocById, getDocByAutor} = require('../../model/home.model')
const {getUserById} = require('../../model/user.model')

const blogRouter = express.Router()

blogRouter.post('/follow/:id', async(req,res)=>{
    const doc = await getDocById(req.params.id)
    const docUser = await getUserById(doc.autor.id)

    // ADD FOLLOWER
    docUser.follower.push(req.user)
    docUser.save()

    // ADD FOLLOWING
    const User = await getUserById(req.user.id)
    User.following.push(doc.autor)
    User.save()

    res.redirect('/')
})

blogRouter.post('/unfollow/:id', async(req,res)=>{
    const doc = await getDocById(req.params.id)
    const docUser = await getUserById(doc.autor.id)
    
    // REMOVE FOLLOWER
    let indexUser = docUser.follower.indexOf(req.user.id)
    if (indexUser > -1) { // only splice array when item is found
        docUser.follower.splice(indexUser, 1); // 2nd parameter means remove one item only
    }
    docUser.save()

    // REMOVE FOLLOWING
    const User = await getUserById(req.user.id)
    let indexDocUser = User.following.indexOf(doc.autor.id)
    if (indexDocUser > -1) { // only splice array when item is found
        User.following.splice(indexDocUser, 1); // 2nd parameter means remove one item only
    }
    User.save()

    res.redirect('/')
})

blogRouter.get('/:id', async(req,res)=>{
    let followButton = true
    let doc = await getDocById(req.params.id)
    let docByAutor = await getDocByAutor(doc.autor)
    let content = doc.content.split('\n')

    const docUser = await getUserById(doc.autor.id)
    docUser.follower.filter(follower => {
        if(follower.equals(req.user.id)){
            followButton = false
        }
    })
    

    res.render('blog', {
        doc: doc,
        docByAutor:docByAutor,
        user: req.user,
        content: content,
        followButton
    })
})

module.exports = {
    blogRouter
}