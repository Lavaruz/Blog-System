const express = require('express')
const {getUserById} = require('../../model/user.model')

const editRouter = express.Router()

editRouter.get('/edit', (req,res)=> {
    res.render('profile-edit', {
        user: req.user,
    })
})

editRouter.post('/edit', async(req,res)=> {
    const User = await getUserById(req.user._id)
    User.name = req.body.name
    User.description = req.body.description
    User.email = req.body.email
    console.log(User);
    await User.save()
    res.redirect('/')
})

module.exports = {
    editRouter
}