
const messageEl = document.querySelector('.message')

const signInState = JSON.parse(localStorage.getItem('signInState'))

console.log(signInState);

const message = signInState ?  'Đăng nhập thành công!' : 'Đăng nhập không thành công, hoặc bạn chưa đăng nhập'
messageEl.textContent = message
