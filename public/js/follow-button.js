const followerButton = document.getElementById('follower-button')
const followingButton = document.getElementById('following-button')
const followClose = document.querySelectorAll('.follow-close')

const followWindow = document.querySelector('.follow-window')
const follower = document.querySelector('.follower')
const following = document.querySelector('.following')

followerButton.addEventListener('click', ()=>{
    followWindow.classList.add('on-display')
    follower.classList.add('on-display')
})

followingButton.addEventListener('click', ()=>{
    followWindow.classList.add('on-display')
    following.classList.add('on-display')
})

followClose[0].addEventListener('click', ()=>{
    followWindow.classList.remove('on-display')
    follower.classList.remove('on-display')
})
followClose[1].addEventListener('click', ()=>{
    followWindow.classList.remove('on-display')
    following.classList.remove('on-display')
})