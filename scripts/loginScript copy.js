const emailInput = document.querySelector('.email');
const passWordInput = document.querySelector('.Password');
const logInBtn = document.querySelector('.logIn-btn')
const Url = 'http://localhost:3000'
const UrlWebType = 'https://space-eye-web-surver.onrender.com'

function logIn(a,b){
    axios.post(UrlWebType + '/login', {
        'email': a,
        'password': b,
    }).then(function(response){
        console.log(response)
        const token = response.data.accessToken;
        const usersId = response.data.user.id;
        localStorage.setItem('token', token);
        localStorage.setItem('usersId', usersId);
        // document.querySelector('.btn2').style.display = 'block';
        // document.querySelector('.btn1').style.display = 'none';
        window.location.href = '/findSpace.html';
        emailInput.value = '';
        passWordInput.value = '';
    }).catch(function(err){
        console.log(err)
        // alert('登入失敗')
        if(err.response.data === 'Email format is invalid'){
            showError('.email-warn')
        }else if(email !== ''){
            hideError('.email-warn')
        }
        if(err.response.data === 'Incorrect password'){
            showError('.Password-warn')
        }else if(email !== ''){
            hideError('.Password-warn')
        }
    })
}

logInBtn.addEventListener('click', function(e){
    let email = emailInput.value.trim();
    let passWord = passWordInput.value.trim();
    if(email === ''){
        showError('.email-warn')
    }else if(email !== ''){
        hideError('.email-warn')
    }
    if(passWord === ''){
        showError('.Password-warn')
    }else if(passWord !== ''){
        hideError('.Password-warn')
    }
    if(email !== '' && passWord !== ''){
        logIn(email,passWord)
    }
})

emailInput.addEventListener('input', function() {
    if (emailInput.value !== '') {
        emailInput.setAttribute('id', 'email');
    } else {
        emailInput.removeAttribute('id', 'email');
    }
});
passWordInput.addEventListener('input', function() {
    if (passWordInput.value !== '') {
        passWordInput.setAttribute('id', 'email');
    } else {
        passWordInput.removeAttribute('id', 'email');
    }
});

function showError(select){
    document.querySelector(select).style.display = 'block';
}
function hideError(select){
    document.querySelector(select).style.display = 'none';
}


