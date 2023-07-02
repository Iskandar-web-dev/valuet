let localedUser = JSON.parse(localStorage.getItem('user')) || null
if(!localedUser) {
    location.assign('/')
}