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
        pages.forEach(pg => pg.classList.remove('show'))
        page.classList.add('show')

    }
})
let marketPage = document.querySelector('.market_page .wrapper')

axios.get('http://localhost:5050/market/')

    .then(res => {
        let arr = res.data
        for (let i of arr) {

            let marketCrypto = document.createElement('div')
            let marketCryptoTop = document.createElement('div')
            let marketCryptoLeft = document.createElement('div')
            let marketCryptoLeftTxt = document.createElement('div')
            let marketCryptoRight = document.createElement('div')
            let cryptoIcon = document.createElement('img')
            let cryptoName = document.createElement('p')
            let cryptoPercent = document.createElement('span')
            let eur = document.createElement('p')
            let usd = document.createElement('p')
            let btc = document.createElement('p')
            let course = document.createElement('h2')
            let volume = document.createElement('span')
            let line = document.createElement('img')
            marketCrypto.classList.add('marketCrypto')
            marketCryptoLeft.classList.add('marketCryptoLeft')
            marketCryptoRight.classList.add('marketCryptoRight')
            marketCryptoTop.classList.add('marketCryptoTop')
            cryptoIcon.src = '/public/img/crypto/btc.svg'
            cryptoName.innerHTML = i.name
            cryptoPercent.innerHTML = i.percent + '%'
            eur.innerHTML = 'EUR'
            usd.innerHTML = 'USD'
            btc.innerHTML = 'BTC'
            course.innerHTML = i.course + ' ' + i.currency
            volume.innerHTML = "Volume " + i.volume + " " + i.name
            marketCryptoRight.append(eur, usd, btc, course, volume)
            marketCryptoLeftTxt.append(cryptoName, cryptoPercent)
            marketCryptoLeft.append(cryptoIcon, marketCryptoLeftTxt)
            marketCryptoTop.append(marketCryptoLeft, marketCryptoRight)
            marketCrypto.append(marketCryptoTop, line)
            marketPage.append(marketCrypto)

            if (i.percent > 0) {
                cryptoPercent.style.color = '#00E8AC'
                line.src = '/public/img/greenLine.png'
            } else {
                cryptoPercent.style.color = '#F35050'
                line.src = '/public/img/redLine.png'
            }
        }

    })
import Chart from 'chart.js/auto'
import { getData, postData } from "../../modules/http.requsets";
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [1,],
            borderWidth: 1
        }]
    }
});

let createWalletsForm = document.forms.create_wallet
let createBtn = document.querySelector('.create_wallet')
let modal = document.querySelector('.popup-black')
let modalClose = document.querySelector('.popup-close')
createBtn.onclick = () => {
    modal.style.display = 'block'
    setTimeout(() => {
        modal.style.opacity = '1'
    }, 100)
}
modalClose.onclick = () => {
    modal.style.opacity = '0'
    setTimeout(() => {
        modal.style.display = 'none'
    }, 250)
}


let wallets_div = document.querySelector('.wallets_div')
console.log(wallets_div);
createWalletsForm.onsubmit = (e) => {

   
    let wallet = {}

    let fm = new FormData(createWalletsForm)

    fm.forEach((value, key) => {
        wallet[key] = value
    })


    postData('/wallets', wallet)
        .then(res => {
            if (res?.status === 200 || res?.status === 201) {
                modal.style.opacity = '0'
                setTimeout(() => {
                    modal.style.display = 'none'
                }, 250)
            } else {
                alert('connection error')
            }
        })
    }
    getData('/wallets')
    .then(res => {
        let arr = res.data
        console.log(arr);
        for (let item of arr) {
        
        let wallet_div = document.createElement('div')
        let wallet_div_top = document.createElement('div')
        let wallet_div_left = document.createElement('div')
        let wallet_div_rigt = document.createElement('div')
        let wallet_div_name = document.createElement('p')
        let wallet_div_balance = document.createElement('p')
        let wallet_div_img = document.createElement('img')
        let wallet_div_line = document.createElement('img')
        
        wallet_div_top.classList.add('wallet_div_top')
        wallet_div.classList.add('wallet_div')
        wallet_div_left.classList.add('wallet_div_left')
        wallet_div_rigt.classList.add('wallet_div_rigt')
        wallet_div_line.classList.add('wallet_div_line')
        wallet_div_name.innerHTML = item.currency
        wallet_div_balance.innerHTML = item.balance + " USD"
        wallet_div_img.src = '/public/img/crypto/btc.svg'
        
        if (item.currency === "BTC") {
            wallet_div_line.src = '/public/img/btcLine.png'
            wallet_div.style.background = 'linear-gradient(237.07deg, rgba(96, 67, 146, 0.5) -8.06%, rgba(15, 11, 56, 0.5) 96.63%)'
        } else if(item.currency === "ETH") {
            wallet_div.style.background = "linear-gradient(237.07deg, #6162D6 -8.06%, #0F0B38 96.63%)"
            wallet_div_line.src = '/public/img/ethLine.png'
        } else if (item.currency === "DASH") {
            wallet_div.style.background = "linear-gradient(237.07deg, #72EB38 -8.06%, #0F0B38 96.63%)"
            wallet_div_line.src = '/public/img/greenLine.png'
        } else {
            alert('error')
        }
        wallet_div_rigt.append(wallet_div_balance, wallet_div_img)
        wallet_div_left.append(wallet_div_name)
        wallet_div_top.append(wallet_div_left, wallet_div_rigt)
        wallet_div.append(wallet_div_top, wallet_div_line)
        wallets_div.append(wallet_div)
    }
})

const ctx2 = document.getElementById('myChart2');

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER'],
        datasets: [{
            label: '# of Votes',
            data: [4000, 6000, 8000, 6000, 8000],
            borderWidth: 1
        }]
    }
});