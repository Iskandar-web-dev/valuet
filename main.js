import { getData, postData } from "./modules/http.requsets"
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
let signUpFormInp = document.querySelectorAll('.reg-box input')
console.log(signUpFormInp);
let h1signup = document.querySelector('.h1signup')

signUpForm.onsubmit = (e) => {
  e.preventDefault()
  let exist = false

  let user = {}

  let fm = new FormData(signUpForm)
  
  fm.forEach((value, key) => {
    user[key] = value
  })
  
  getData('/users?email=' + user.email)
      .then(res => {
        console.log(res);
        if (res.data.length !== 0 ) {
          h1signup.style.opacity = "0"
          h1signup.innerHTML = 'This user already exists!'
          h1signup.style.color = 'red'
          setTimeout(() => {
            h1signup.style.opacity = 1
          },200)
          setTimeout(() => {
            h1signup.style.opacity = 0
            h1signup.style.color = 'white'
            h1signup.innerHTML = 'SIGN UP'
          },1000)
          setTimeout(() => {
            h1signup.style.opacity = 1
          }, 2000)
          exist = true
  
        } else {
          postData("/users", user)
            .then(res => {
              if (res?.status === 200 || res?.status === 201) {
                console.log(res);
                regBox.style.opacity = '0'
                logBox.style.display = "block"
                setTimeout(() => {
                  regBox.style.display = 'none'
                  logBox.style.opacity = '1'
  
                }, 500)
              }
            })
        }

      })
}

let wrongPassword = document.querySelector('.wrong-password')
let usernotfound = document.querySelector('.usernotfound')
let signInForm = document.forms.login
signInForm.onsubmit = (e) => {
  e.preventDefault()

  let user = {}

  let fm = new FormData(signInForm)

  fm.forEach((value, key) => {
    user[key] = value
  })
  getData('/users?email=' + user.emaill)
    .then(res => {
      console.log(res);
      if (res.data.length === 0) {
           usernotfound.style.display = "block"
            setTimeout(() => {
              usernotfound.style.opacity = '1'
            },500)
            setTimeout(() => {
              usernotfound.style.opacity = '0'
            },4000)
            setTimeout(() => {
              usernotfound.style.display= 'none'
            },10000)
        
      } else {
          if (res.data[0]?.password === user?.passwordd) {
            localStorage.setItem('user', JSON.stringify(res?.data[0]))
            location.assign('/pages/main/')
          } else {
            wrongPassword.style.display = "block"
            setTimeout(() => {
              wrongPassword.style.opacity = '1'
            },500)
            setTimeout(() => {
              wrongPassword.style.opacity = '0'
            },4000)
            setTimeout(() => {
              wrongPassword.style.display= 'none'
            },4500)
          }
      }
    })
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
  passwordd: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
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
