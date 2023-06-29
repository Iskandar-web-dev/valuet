let userData = JSON.parse(localStorage.getItem('user'));
console.log(userData);
let nameUser = document.querySelector('.nameUser')
nameUser.innerHTML = userData.name
let logOut = document.querySelector('.log-out')
logOut.onclick = () => {
    location.assign('/')
    localStorage.clear()
}

let pages = document.querySelectorAll('.container')
let menuBtn = document.querySelectorAll('.menu')

console.log(pages);
pages.forEach(pg => {

    menuBtn.forEach(el => {
    
    
        el.onclick = () => {
 
            menuBtn.forEach(i => i.classList.remove('active-button'))
            el.classList.add('active-button')
    
    
    
        }
    })
})
