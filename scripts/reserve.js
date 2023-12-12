const reservePark = localStorage.getItem('optionPark')
const UrlWebType1 = 'https://space-eye-web-surver.onrender.com'
const token1 = localStorage.getItem('token');
const usersId1 = localStorage.getItem('usersId');
const userBtn1 = document.querySelector('#userBtn')
const dataDetail = document.querySelector('.dataDetail')
const plan = document.querySelector('#plan')
const inPark = document.querySelector('#inPark')
const outPark = document.querySelector('#outPark')
const pay = document.querySelector('#pay')
const checkOut = document.querySelector('#checkOut')
let data 
let parkData
let finalData = {}

checkOut.addEventListener('click' , () => {
    const planV = plan.value
    const inParkV = new Date(inPark.value)
    const outParkV = new Date(outPark.value)
    const payV = pay.value
    if(inParkV == 'Invalid Date' || outParkV == 'Invalid Date'){
        alert('請填寫日期')
    }else{
        const dateDifference = outParkV - inParkV ;
        const daysDifference = dateDifference / (1000 * 60 * 60 * 24);
        if (planV === '當日預約' && daysDifference > 1) {
            alert('天數錯誤')
        }else if(planV === '預約一個星期' && daysDifference > 7){
            alert('天數錯誤')
        }else if(planV === '預約一個月' && daysDifference > 30){
            alert('天數錯誤')
        }else if(planV === '預約一年' && daysDifference > 360){
            alert('天數錯誤')
        }else{
            finalData.parkName = parkData.parkName
            finalData.address = parkData.address
            finalData.type = parkData.type
            finalData.plan = planV
            finalData.inTime = inParkV
            finalData.outTime = outParkV
            finalData.payV = payV
            // localStorage 只能存儲字符串形式的數據，因此將物件直接存儲進去可能會導致不正確的結果。
            // 為了將物件以字符串形式存儲到 localStorage 中，你需要使用 JSON.stringify：
            localStorage.setItem('finalData', JSON.stringify(finalData))
            window.location.href = '/Pages/pay.html'
        }
    }
})
axios.get(UrlWebType1 + '/parks?_expand=road')
.then((res) => {
    console.log(res.data)
    data = res.data
    getPark()
    showParkDetail(parkData)
}).catch((err) => {
    console.log(err)
})
const getPark = () => {
    data.forEach((item) => {
        if(item.location.latitude == reservePark){
            parkData = item
        }
    })
    console.log(parkData)
}
const showParkDetail = (aa) => {
        str = `<div class="changePassWord d-flex justify-content-between mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label fw-bold  text-dark-gray">停車場</label>
        <div class="col-8 d-flex align-items-center">
            <label for="" class="fw-bold text-dark-gray">${aa.parkName}</label>
        </div>
    </div>
    <div class="changePassWord d-flex justify-content-between mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label fw-bold  text-dark-gray">地址</label>
        <div class="col-8 d-flex align-items-center">
            <label for="" class="fw-bold text-dark-gray">${aa.address}</label>
        </div>
    </div>
    <div class="changePassWord d-flex justify-content-between mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label fw-bold  text-dark-gray">收費方式</label>
        <div class="col-8 d-flex align-items-center">
            <label for="" class="fw-bold text-dark-gray">${aa.charge}</label>
        </div>
    </div>
    <div class="changePassWord d-flex justify-content-between mb-5">
        <label for="inputPassword" class="col-sm-2 col-form-label fw-bold  text-dark-gray">車格種類</label>
        <div class="col-8 d-flex align-items-center">
            <label for="" class="fw-bold text-dark-gray">${aa.type}</label>
        </div>
    </div>`
    dataDetail.innerHTML = str
}
