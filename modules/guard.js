let localedUser = JSON.parse(localStorage.getItem('user')) || null
console.log(localedUser);
if(!localedUser) {
    location.assign('/')
}