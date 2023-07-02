import axios from "axios";

let userData = JSON.parse(localStorage.getItem('user'));
let nameUser = document.querySelector('.nameUser')
nameUser.innerHTML = userData.name
let logOut = document.querySelector('.log-out')
logOut.onclick = () => {
    location.assign('/')
    localStorage.clear()
}

let pages = document.querySelectorAll('.container')
let menuBtn = document.querySelectorAll('.menu')



menuBtn.forEach(el => {



    el.onclick = () => {
        let data = el.getAttribute('data-page')

        menuBtn.forEach(i => i.classList.remove('active-button'))
        el.classList.add('active-button')

        let page = document.querySelector(`.${data}_page`)
        pages.forEach(pg => pg.classList.add('show'))
        page.classList.remove('show')

    }
})
    let marketPage = document.querySelector('.market_page')

axios.get('http://localhost:5050/market')

    .then(res => {
        let arr = res.data
        
        for (let item of res.data) {         
            console.log(arr.item);   
            let marketCrypto = document.createElement('div')
            let marketCryptoLeft = document.createElement('div')
            let marketCryptoRight = document.createElement('div')
            let cryptoIcon = document.createElement('img')
            let cryptoName = document.createElement('p')
            let cryptoPercent = document.createElement('span')
            let eur = document.createElement('p')
            let usd = document.createElement('p')
            let btc = document.createElement('p')
            let course = document.createElement('h2')
            let volume = document.createElement('span')

            cryptoIcon.src = '/public/img/crypto/btc.svg'
            cryptoName.innerHTML = res.data.name
            cryptoPercent.innerHTML = res.data.percent
            eur.innerHTML = 'EUR'
            usd.innerHTML = 'USD'
            btc.innerHTML = 'BTC'
            course.innerHTML = res.data.course + 'EUR'
            volume.innerHTML = volume + res.data.volume + res.data.name
            marketCryptoRight.append(eur, usd, btc, course, volume)
            marketCryptoLeft.append(cryptoIcon, cryptoName, cryptoPercent)
            marketCrypto.append(marketCryptoLeft, marketCryptoRight)
            marketPage.append(marketCrypto)
            if (res.data.percent > 0) {
                cryptoPercent.style.color = '#00E8AC'
            } else {
                cryptoPercent.style.color = '#F35050'
            }
        }
    })
    