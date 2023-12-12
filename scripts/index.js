const Url = 'http://localhost:3000'
const UrlWebType = 'https://space-eye-web-surver.onrender.com'
const token = localStorage.getItem('token');
const usersId = localStorage.getItem('usersId');
const userBtn = document.querySelector('#userBtn')

axios.get(UrlWebType + `/600/users/${usersId}` , {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then((res) => {
    console.log(res)
    userBtn.textContent = '車主專區'
    userBtn.setAttribute('href', '/Pages/carOwnerNew.html')
}).catch((err) => {
    console.log(err)
    userBtn.textContent = '登入/註冊'
    userBtn.setAttribute('href', './login.html')
})
