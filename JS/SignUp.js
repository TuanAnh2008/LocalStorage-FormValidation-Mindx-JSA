'use strict'
// const warn = document.querySelector('.warn')
const box = document.querySelector('.box')
const nameInp = document.querySelector('#name');
const passInp =  document.querySelector('#password');
const btn =  document.querySelector('.btn');
const accExistWarn = document.querySelector('.account-exist')
// Check is input valid 
const inputState = {
  name: false,
  password: false,
}

// User Data
const userData = JSON.parse(localStorage.getItem('User')) ?? [];

//  Validate length
function checkLength(lengthValue, e) {
  const messageEl = e.target.closest('.input-wrapper').querySelector('.warn')
  const message =  e.target.value.trim().length < lengthValue ? `Vui lòng nhập tối thiểu ${lengthValue} ký tự` : undefined
 if(message) {
   e.target.style.borderBottomColor = 'red'
  messageEl.textContent = message;
  inputState[e.target.id] = false;
  
 }
  else {
   e.target.style.borderBottomColor = 'green'
   messageEl.textContent = '';
  inputState[e.target.id] = true;
 }
}

// Which input to validate
function validateForm(nameInp, passInp, btn, e) {
if(e.target === nameInp) {
   checkLength(6, e)
} else if(e.target === passInp) {
  checkLength(8, e)
}
}


// Input onchange
// Clear Error Message  
function clearError(e) {
  // console.log(e.target);
  const messageEl = e.target.closest('.input-wrapper').querySelector('.warn')
  e.target.style.borderBottomColor = 'green'
  messageEl.textContent = '';
}


// Event Handler
function handleEvent(nameInput, passwordInput, btn) {
  // Name Input
  nameInput.addEventListener('blur',  (e) => {
        validateForm(nameInp, passwordInput, btn, e)
    })

    nameInput.addEventListener('input',  (e) => {
      clearError(e)
  })

    // Password Input
    passwordInput.addEventListener('blur', (e) => {
        validateForm(nameInp, passwordInput, btn, e)
    })

    passwordInput.addEventListener('input',  (e) => {
      clearError(e)
  })

  // Button 
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    // Get all values in object (to an array)
   const check =  Object.values(inputState).every((item) => item)
    let isExist = false
    if(check) { // if all values pass (true)
      for(let item of userData) {
        if(item.name === nameInp.value && item.password === passInp.value) {
         isExist = true;
          break; // break for loop if the conditional pass
        }
      }
      if(isExist) {
         // if account exist in data then set  to false and render UI
        accExistWarn.textContent = 'Account already exists!'
        accExistWarn.style.color = 'red'
        inputState.name = false
        inputState.password = false
        nameInp.style.borderBottomColor = 'red'
        passInp.style.borderBottomColor = 'red'
      } else {
         // if account not exist in data, then set: name Input and password input to localstorage
          accExistWarn.textContent = 'Success!';
          accExistWarn.style.color = 'green';
          userData.push({
            name: nameInp.value.trim(),
            password: passInp.value.trim()
          })
          localStorage.setItem('User', JSON.stringify(userData))
          nameInp.value = passInp.value = ''
          window.location.replace('./Page.html')
      }
    }
  })

}
handleEvent(nameInp, passInp, btn)



