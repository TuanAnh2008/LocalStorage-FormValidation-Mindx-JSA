'use strict'

const nameInp = document.querySelector('#name');
const passInp =  document.querySelector('#password');
const btn =  document.querySelector('.btn');
const accExistWarn = document.querySelector('.account-exist');

const userData = JSON.parse(localStorage.getItem('User'))
console.log(userData);

let isSignIn = false;

function handleEvent(nameInput, passwordInput, btn) {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
       for(let item of userData) {
            if(nameInput.value.trim() === item.name && passwordInput.value.trim() === item.password) {
                console.log('The name and password has found in data!');
                accExistWarn.textContent = 'Success!'
                accExistWarn.style.color = 'green'
                nameInput.value = passwordInput.value = ''
                isSignIn = true;
                localStorage.setItem('signInState', JSON.stringify(isSignIn))
                window.location.replace('./Page.html')
                break;
            } else {
                nameInp.style.borderBottomColor = 'red';
                passInp.style.borderBottomColor = 'red';
                accExistWarn.textContent = 'Wrong usename or Password!'
                isSignIn = false
                localStorage.setItem('signInState', JSON.stringify(isSignIn))
                accExistWarn.style.color = 'red'
            }
        }
    })
    nameInp.addEventListener('input', (e) => {
        e.target.style.borderBottomColor = 'green';
       
    });
    passInp.addEventListener('input', (e) => {
        e.target.style.borderBottomColor = 'green';
    })
}

handleEvent(nameInp, passInp, btn)