const getOrderData = localStorage.getItem('finalData');
const orderDataObject = JSON.parse(getOrderData);
const orderData = document.querySelector('.orderData');
const creditCard = document.querySelector('#creditCard');
const convenientPay = document.querySelector('#convenientPay');
const storedPay = document.querySelector('#storedPay')

str = `<div class="changePassWord d-flex justify-content-between mb-3">
<label for="inputPassword"
    class="col-sm-2 col-form-label fw-bold  text-dark-gray">停車場</label>
<div class="col-8 d-flex align-items-center">
    <label for="" class="fw-bold text-dark-gray">${orderDataObject.parkName}</label>
</div>
</div>
<div class="changePassWord d-flex justify-content-between mb-3">
<label for="inputPassword"
    class="col-sm-2 col-form-label fw-bold  text-dark-gray">地址</label>
<div class="col-8 d-flex align-items-center">
    <label for="" class="fw-bold text-dark-gray">${orderDataObject.address}</label>
</div>
</div>
<div class="changePassWord d-flex justify-content-between mb-3">
<label for="inputPassword"
    class="col-sm-2 col-form-label fw-bold  text-dark-gray">車格種類</label>
<div class="col-8 d-flex align-items-center">
    <label for="" class="fw-bold text-dark-gray">${orderDataObject.type}</label>
</div>
</div>
<div class="changePassWord d-flex justify-content-between mb-3">
<label for="inputPassword"
    class="col-sm-2 col-form-label fw-bold  text-dark-gray">方案</label>
<div class="col-8 d-flex align-items-center">
    <label for="" class="fw-bold text-dark-gray">${orderDataObject.plan}</label>
</div>
</div>
<div class="changePassWord d-flex justify-content-between mb-3">
<label for="inputPassword"
    class="col-sm-2 col-form-label fw-bold  text-dark-gray">入場時間</label>
<div class="col-8 d-flex align-items-center">
    <label for="" class="fw-bold text-dark-gray">${orderDataObject.inTime}</label>
</div>
</div>
<div class="changePassWord d-flex justify-content-between mb-3">
<label for="inputPassword"
    class="col-sm-2 col-form-label fw-bold  text-dark-gray">出場時間</label>
<div class="col-8 d-flex align-items-center">
    <label for="" class="fw-bold text-dark-gray">${orderDataObject.outTime}</label>
</div>
</div>`
orderData.innerHTML = str

console.log(orderDataObject)
if (orderDataObject.payV === '信用卡') {
    convenientPay.className = 'd-none';
    storedPay.className = 'd-none';
    creditCard.className = 'd-block';
} else if (orderDataObject.payV === '超商繳費') {
    creditCard.className = 'd-none';
    storedPay.className = 'd-none';
    convenientPay.className = 'd-block';
} else if (orderDataObject.payV === '儲值金') {
    creditCard.className = 'd-none';
    convenientPay.className = 'd-none';
    storedPay.className = 'd-block';
}
let payNum;
if(orderDataObject.plan === '當日預約'){
    payNum = 'NT$200'
}else if(orderDataObject.plan === '預約一個星期'){
    payNum = 'NT$1400'
}else if(orderDataObject.plan === '預約一個月'){
    payNum = 'NT$5600'
}else if(orderDataObject.plan === '預約一年'){
    payNum = 'NT$1400'
}
const showCreditPayOrder = document.querySelector('#showCreditPayOrder')
showCreditPayOrder.addEventListener('show.bs.modal', function (event) {
    // const saveButton = e.relatedTarget
    const total = showCreditPayOrder.querySelector('#total')
    const orderNumber = showCreditPayOrder.querySelector('#orderNumber')
    const plan = showCreditPayOrder.querySelector('#plan')
    const payPlan = showCreditPayOrder.querySelector('#payPlan')
    total.textContent = '10'
    orderNumber.textContent = '10'
    plan.textContent = '10'
    payPlan.textContent = '10'
})