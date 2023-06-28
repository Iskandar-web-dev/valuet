import { postData } from "./modules/http.requsets"
let signUpBtn = document.querySelector('.sign-up')
let signInBtn = document.querySelector('.reg-box .sign-in')
let loginInps = document.querySelectorAll('.log-inp')
let formInps = document.querySelectorAll('.login input')
let regBox = document.querySelector('.reg-box')
let logBox = document.querySelector('.log-box')
let logbtn = document.querySelector('.btn')
let showPass = document.querySelectorAll('.showPass')
let inpPass = document.querySelectorAll('.inpPass')


signUpBtn.onclick = () => {
  //  signUpBtn.classList.add('active-button')
  logBox.style.opacity = '0'
  regBox.style.display = 'block'
  setTimeout(() => {
    logBox.style.display = "none"
    regBox.style.opacity = '1'

  }, 500)
}
console.log(signInBtn);
signInBtn.onclick = () => {
  regBox.style.opacity = '0'
  logBox.style.display = "block"
  setTimeout(() => {
    regBox.style.display = 'none'
    logBox.style.opacity = '1'

  }, 400)
}
showPass.forEach(el => {
  el.onclick = () => {
    inpPass.forEach(i => {
      if (i.type === 'password') {
        i.type = 'text'
        el.src = '/public/icon/eye.svg'
      } else {
        el.src = '/public/icon/eye-off.svg'
        i.type = 'password'
      }
    });
  }
})

let signUpForm = document.forms.registration

signUpForm.onsubmit = (e) => {
  e.preventDefault()

  let user = {}

  let fm = new FormData(signUpForm)

  fm.forEach((value, key) => {
    user[key] = value
  })
  postData("http://localhost:5050/users", user)
}

loginInps.forEach(el => {
  el.onclick = () => {
    loginInps.forEach(i => i.classList.remove('active-logInp'))
    el.classList.add('active-logInp')
  }
})
let patterns = {
  name: /^[a-zA-Z ]+$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
  emaill: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  passwordd: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
}
function validate(regex, field) {
    
  if (regex.test(field.value)) {
      field.style.color = 'white'
  } else {
      field.style.color = 'red'
  }

}
formInps.forEach(inp => {
  inp.onkeyup = () => {
      validate(patterns[inp.name], inp)

  }
})
