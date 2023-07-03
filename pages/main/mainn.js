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
            let line =  document.createElement('img')
            marketCrypto.classList.add('marketCrypto')                
            marketCryptoLeft.classList.add('marketCryptoLeft')                                    
            marketCryptoRight.classList.add('marketCryptoRight')                                
            marketCryptoTop.classList.add('marketCryptoTop')       
            cryptoIcon.src = '/public/img/crypto/btc.svg'
            cryptoName.innerHTML = i.name
            cryptoPercent.innerHTML = i.percent
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