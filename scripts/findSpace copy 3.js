const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');;
const btn21 = document.querySelector('#btn2-1');
const btn22 = document.querySelector('#btn2-2');
const btn23 = document.querySelector('#btn2-3');
const btn31 = document.querySelector('#btn3-1');
const btn32 = document.querySelector('#btn3-2');
const btn11 = document.querySelector('#btn1-1')
const btn12 = document.querySelector('#btn1-2')
const confirmBtn = document.querySelector('#confirm');
const btnBgMove = document.querySelector('.btn-bg-move');
const btnBgMove1 = document.querySelector('.btn-bg-move1');
const btnBgMove2 = document.querySelector('.btn-bg-move2');
const btnBgMove3 = document.querySelector('.btn-bg-move3');
const hideSearch = document.querySelector('.content-to-hide-search');
const hideShowPark = document.querySelector('.content-to-hide-showPark');
const showMapCard =document.querySelector('#showMapCard');
const modalFooter = document.querySelector('.modal-footer')
const areaOption = document.querySelector('#areaOption');
const roadOption = document.querySelector('#roadOption');
const mapLocated = document.querySelector('#map')
const Url = 'http://localhost:3000'
const UrlWebType = 'https://space-eye-web-surver.onrender.com'
const btnNumList = 1;
const btnNumList1 = 1;
const btnNumList2 = 1;
const btnNumList3 = 1;
const token = localStorage.getItem('token');
const usersId = localStorage.getItem('usersId');
const localParkData = localStorage.getItem('likePark');
let getType = '一般車位';
let getSpaceOrNot = 'all';
let getParkValue = 'C01'
let data = [];
let filteredMapData = [];
let saveLikePark = [];
let locatedX = 24.162139;
let locatedY = 120.647021;

//leaflet資料
var map = L.map('map').setView([24.162139, 120.647021], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var greyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
// L.marker([24.162139, 120.647021]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();
//將資料渲染到地圖上
// 在创建地图后，将图层保存到一个变量中
var markersLayer = L.layerGroup().addTo(map);

const dataToMap = () => {
    markersLayer.clearLayers();
    for (let i = 0; i < filteredMapData.length; i++) {
        let dataDetail = filteredMapData[i]
        let marker;
        locatedX = dataDetail.location.latitude
        locatedY = dataDetail.location.longitude
        if (dataDetail.space === '0') {
            marker = L.marker([dataDetail.location.latitude, dataDetail.location.longitude], { icon: greyIcon })
                .bindPopup(`<div class="card mt-3" style="width: 16rem;">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">${dataDetail.parkName}</h5>
                <i class="save-like bi bi-suit-heart-fill a" data-some-value="${dataDetail.location.latitude}"></i>
            </div>
            <div class="row">
                <div class="col-5">地址:</div>
                <div class="col-7">${dataDetail.address}</div>
            </div>
            <div class="row">
                <div class="col-5">剩餘空位:</div>
                <div class="col-7">${dataDetail.space}</div>
            </div>
            <div class="d-flex justify-content-between">
            <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#showAllParkModel" data-bs-show-park="${dataDetail.parkName}" data-bs-show-type="${dataDetail.type}" data-bs-show-address="${dataDetail.address}" data-bs-show-space="${dataDetail.space}" data-bs-show-in="${dataDetail.height}">詳細資料</button>
                <button type="button" class="btn btn-sm btn-light-gray px-3 py-1">長期方案</button>
            </div>
        </div>
    </div>`);
        } else if (dataDetail.space !== '0') {
            marker = L.marker([dataDetail.location.latitude, dataDetail.location.longitude], { icon: greenIcon })
                .bindPopup(`<div class="card mt-3" style="width: 16rem;">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">${dataDetail.parkName}</h5>
                <i class="save-like bi bi-suit-heart-fill a" data-some-value="${dataDetail.location.latitude}"></i>
            </div>
            <div class="row">
                <div class="col-5">地址:</div>
                <div class="col-7">${dataDetail.address}</div>
            </div>
            <div class="row">
                <div class="col-5">剩餘空位:</div>
                <div class="col-7">${dataDetail.space}</div>
            </div>
            <div class="d-flex justify-content-between">
            <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#showAllParkModel" data-bs-show-park="${dataDetail.parkName}" data-bs-show-type="${dataDetail.type}" data-bs-show-address="${dataDetail.address}" data-bs-show-space="${dataDetail.space}" data-bs-show-in="${dataDetail.height}">詳細資料</button>
                <button type="button" class="btn btn-sm btn-light-gray px-3 py-1">長期方案</button>
            </div>
        </div>
    </div>`);
        }
        markersLayer.addLayer(marker);
    }
    // console.log(locatedX, locatedY)
    map.flyTo([locatedX, locatedY], 16, { duration: 2 }); // 第三個參數是動畫持續時間（以秒為單位）
    plusLike(filteredMapData);
}
//測試地圖上卡片監聽事件(目前無效)
// mapLocated.addEventListener('click' , (e) => {
//     console.log(e.target)
// })
//搜尋條件與停車場一覽監聽
    btn1.addEventListener('click', () => {
        moveBtn(btn1)
        hidePage(btn1)
    });
    btn2.addEventListener('click', () => {
        moveBtn(btn2)
        hidePage(btn2)
    });
    //確認送出按鈕監聽
    confirmBtn.addEventListener('click', () => {
        btnBgMove.style.marginLeft = 214 + 'px';
        hideSearch.style.display = 'none';
        hideShowPark.style.display = 'block';
        let area = areaOption.value;
        let road = roadOption.value;
        getMapDetail(area,road,getType,getSpaceOrNot,getParkValue)
        render(filteredMapData)
        // dataToMap()
    })
    //車位類別按鈕監聽
    btn21.addEventListener('click', () => {
        moveBtn2(btn21)
        getType = btn21.value
    });
    btn22.addEventListener('click', () => {
        moveBtn2(btn22)
        getType = btn22.value
    });
    btn23.addEventListener('click', () => {
        moveBtn2(btn23)
        getType = btn23.value
    });
    //顯示有車位或全部停車場按鈕監聽
    btn31.addEventListener('click', () => {
        moveBtn3(btn31)
        getSpaceOrNot = btn31.value
    });
    btn32.addEventListener('click', () => {
        moveBtn3(btn32)
        getSpaceOrNot = btn32.value
    });
    //路邊停車與停車場按鈕監聽
    btn11.addEventListener('click' , () => {
        let area = areaOption.value;
        let road = roadOption.value;
        getParkValue = btn11.value
        getMapDetail(area,road,getType,getSpaceOrNot,getParkValue)
        render(filteredMapData)
        moveBtn1(btn11)
        // dataToMap()
    })
    btn12.addEventListener('click' , () => {
        let area = areaOption.value;
        let road = roadOption.value;
        getParkValue = btn12.value
        getMapDetail(area,road,getType,getSpaceOrNot,getParkValue)
        render(filteredMapData)
        moveBtn1(btn12)
        // dataToMap()
    })
//將取得的本地端值加入saveLikePark
const parsedLocalParkData = () => {
    if(localParkData === ''){
        saveLikePark = [];
    }else{
        let ss = localParkData.split(',').map(parseFloat);
        console.log(ss)
        saveLikePark.push(...ss)
    }
}
let optionPark = '';
// export default optionPark;

// 在后续请求中，将 token 添加到请求头中
axios.get(UrlWebType + `/600/users/${usersId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        parsedLocalParkData()
        showMapCard.addEventListener('click' ,(e) => {
            let likeBtn = e.target
            addLikeParkToLocal(e)
             //取得停車場資料並存到本地端
            if (likeBtn.textContent === '長期方案') {
                optionPark = likeBtn.getAttribute('data-btnId');
                localStorage.setItem('optionPark', optionPark);
                window.location.href = "/pages/reserve.html"
            }
            if(likeBtn.textContent === '詳細資料'){
                optionPark = likeBtn.getAttribute('data-btnId');
                localStorage.setItem('optionPark', optionPark);
                console.log(optionPark)
            }
        })
        modalFooter.addEventListener('click' , (e) => {
            let likeBtn = e.target
            if(likeBtn.textContent === '預約停車' || likeBtn.textContent === '長期方案'){
                window.location.href = "/pages/reserve.html"
            }
        })
        mapLocated.addEventListener('click' , (e) => {
            addLikeParkToLocal(e)
        })
        const data = response.data;
        console.log('从受保护的端点获取的数据:', data);
    })
    .catch((error) => {
        showMapCard.addEventListener('click' ,(e) => {
            let likeBtn = e.target
            if(likeBtn.classList.contains('save-like') || likeBtn.textContent === '長期方案'){
                alert('請先登入')
            }
        })
        modalFooter.addEventListener('click' , (e) => {
            let likeBtn = e.target
            if(likeBtn.textContent === '預約停車' || likeBtn.textContent === '長期方案'){
                alert('請先登入')
            }
        })
        //地圖上卡片監聽事件
        mapLocated.addEventListener('click' , (e) => {
            let likeBtn = e.target
            if(likeBtn.classList.contains('save-like') || likeBtn.textContent === '長期方案'){
                alert('請先登入')
            }
        })
        console.error('请求受保护的端点失败:', error);
    });

//控制顯示或隱藏頁面
function hidePage(a){
    let num = parseInt(a.getAttribute('data-num'));
    if(num === 1){
        hideSearch.style.display = 'block';
        hideShowPark.style.display = 'none';
    }else if(num === 2){
        hideSearch.style.display = 'none';
        hideShowPark.style.display = 'block';
    }
}
//選搜尋停建或停車場一覽按鈕區塊移動
function moveBtn(x) {
    let num = parseInt(x.getAttribute('data-num'));
    if (num > btnNumList) {
        btnBgMove.style.marginLeft = (214 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove.style.marginLeft = 0;
    }
}
//選車位種類按鈕區塊移動
function moveBtn2(y) {
    let num = parseInt(y.getAttribute('data-num'));
    if (num > btnNumList2) {
        btnBgMove2.style.marginLeft = (110 * (num-1)) + 'px';
    }else if(num > btnNumList2){
        btnBgMove2.style.marginLeft = (110 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove2.style.marginLeft = 0;
    }
}
//顯示有車位停車場按鈕區塊移動
function moveBtn3(z) {
    let num = parseInt(z.getAttribute('data-num'));
    if (num > btnNumList2) {
        btnBgMove3.style.marginLeft = (180 * (num-1)) + 'px';
    }else if(num > btnNumList2){
        btnBgMove3.style.marginLeft = (100 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove3.style.marginLeft = 0;
    }
}
//選擇路邊或停車唱按鈕區塊移動
const moveBtn1 = (w) => {
    let num = parseInt(w.getAttribute('data-num'));
    if (num > btnNumList1) {
        btnBgMove1.style.marginLeft = (135 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove1.style.marginLeft = 0;
    }
}

//收藏停車場的愛心按鈕監聽
const addLikeParkToLocal = (e) => {
    if(e.target.classList.contains('save-like')){
        let likeBtn = e.target
        if (!e.target.classList.contains('bi-suit-heart-broke')) {
            let someValue = likeBtn.getAttribute('data-some-value');
            getLikePark(filteredMapData,someValue)
            likeBtn.classList.add('bi-suit-heart-broke');
            updateLocalStorage()
            console.log(saveLikePark)
        } else if (e.target.classList.contains('bi-suit-heart-broke')) {
            let someValue = likeBtn.getAttribute('data-some-value');
            removeLikePark(saveLikePark,someValue)
            likeBtn.classList.remove('bi-suit-heart-broke');
            updateLocalStorage()
            console.log(saveLikePark)
        }
    }
}
//控制彈出視窗(modal)
const showAllPark = document.querySelector('#showAllParkModel')
showAllPark.addEventListener('show.bs.modal' , function (e) {
    const showButton = e.relatedTarget
    const showPark = showButton.dataset.bsShowPark
    const showType = showButton.dataset.bsShowType
    const showAddress = showButton.dataset.bsShowAddress
    const showSpace = showButton.dataset.bsShowSpace
    const showIn = showButton.dataset.bsShowIn
    const park = showAllPark.querySelector('#park')
    const type = showAllPark.querySelector('#type')
    const address = showAllPark.querySelector('#address')
    const space = showAllPark.querySelector('#space')
    const inOrOut = showAllPark.querySelector('#in')
    park.textContent = showPark
    type.textContent = showType
    address.textContent = showAddress
    space.textContent = showSpace
    inOrOut.textContent = showIn
})
//取得區域資料
let sectionData = [];
const getSection = () => {
    axios.get(UrlWebType + '/sections')
    .then(function(res){
        sectionData = res.data;
        showSectionList()
        showSectionListRwd()
    })
    .catch(function(err){
        console.log(err);
    })
}
getSection();
//渲染區域資料到畫面上
const showSectionList = () => {
    let content = '';
    if (sectionData.length === 0) {
        content =  ``
        } else {
            sectionData.forEach((item) => {
                content += `<option value="${item.id}">${item.area}</option>`
            })
        }
        areaOption.innerHTML = content;
}
//監聽區域來取的區域內路段
let previousValue = null; // 变量用于存储上一次的值
areaOption.addEventListener('click', (event) => {
    let valueR = event.target.value;
    if (valueR !== previousValue) {//避免產生重複的值
        getRoad(valueR)
        previousValue = valueR; // 更新上一次的值
    }
});
//取得道路資料
let roadData = [];
const getRoad = (roadIdInData) => {
    axios.get(UrlWebType + '/roads')
    .then(function(res){
        roadData = res.data;
        const equalId = roadData.filter((item) => {
            return item.sectionId === roadIdInData
        })
        showRoadOptionList(equalId)
        showRoadOptionListRwd(equalId)
    })
    .catch(function(err){
        console.log(err);
    })
}
getRoad("S01")//預先渲染路段R001到畫面上
//渲染道路資料到畫面上
const showRoadOptionList = (a) => {
    let content = '';
    if (a === "S01") {
        content =  `<option value="R001">中山路</option>`
        } else {
            a.forEach((item) => {
                content += `<option value="${item.id}">${item.roadName}</option>`
            })
        }
        roadOption.innerHTML = content;
}
//取得停車場資訊
const getMap = () => {
    axios.get(UrlWebType + '/parks?_expand=road')
    .then(function(res){
        data = res.data
        console.log(data)
    })
    .catch(function(err){
        console.log(err)
    })
}
getMap()
//透過搜尋條件篩選資料
const getMapDetail = (a,b,c,d,e) => {
    filteredMapData = data.filter((item) => {
        if(item.road.sectionId === a && item.roadId === b && item.type.includes(c) && (d === 'haveSpace' && item.space !== "0") && item.categoryId === e){
            return item
        }else if(item.road.sectionId === a && item.roadId === b && item.type.includes(c) && d === 'all' && item.categoryId === e){
            return item
        }
    })
}
//將篩選過後的資料渲染到畫面上 
// href="http://127.0.0.1:5501/Pages/parkingDetail.html#"
const render = (aa) => {
    let str = '';
    aa.forEach((item) => {
        let content = `<div class="card mt-3" style="width: 16rem;">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">${item.parkName}</h5>
                <i class="save-like bi bi-suit-heart-fill" data-some-value="${item.location.latitude}"></i>
            </div>
            <div class="row">
                <div class="col-5">地址:</div>
                <div class="col-7">${item.address}</div>
            </div>
            <div class="row">
                <div class="col-5">剩餘空位:</div>
                <div class="col-7">${item.space}</div>
            </div>
            <div class="d-flex justify-content-between">
            <button id="detailBtn" type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-bs-toggle="modal" data-bs-target="#showAllParkModel" data-bs-show-park="${item.parkName}" data-bs-show-type="${item.type}" data-bs-show-address="${item.address}" data-bs-show-space="${item.space}" data-bs-show-in="${item.height}" data-btnId="${item.location.latitude}">詳細資料</button>
                <button type="button" class="btn btn-sm btn-light-gray px-3 py-1" data-btnId="${item.location.latitude}">長期方案</button>
            </div>
        </div>
    </div>`
    str += content
    })
    showMapCard.innerHTML = str
    // console.log(saveLikePark)
    plusLike(aa)
}
const getLikePark = (aa, bb) => {
    aa.forEach((item) => {
        let locateNum = parseFloat(item.location.latitude);
        if (locateNum === parseFloat(bb)) {
            saveLikePark.push(locateNum);
        }
    });
    console.log(saveLikePark);
};
//將saveLikePark裡喜愛停車場remove
const removeLikePark = (cc, dd) => {
    const removeInd = cc.findIndex((item) => {
        return item.toString() === dd;
    });
    if (removeInd !== -1) {
        cc.splice(removeInd, 1);
    }
};
//將有在saveLikePark裡的項目愛心加上顏色
const plusLike = (aa) => {
    const saveLikes = document.querySelectorAll('.save-like[data-some-value]');
    aa.forEach((item) => {
        let locatedId = item.location.latitude;
        // console.log(locatedId)
        for (let i = 0; i < saveLikePark.length; i++) {
            if (locatedId.toString() === saveLikePark[i].toString()) {
                let saveLikeElement = saveLikePark[i];
                for (let x = 0; x < saveLikes.length; x++) {
                    console.log(saveLikes[x])
                    if (saveLikeElement.toString() === saveLikes[x].getAttribute('data-some-value')) {
                        console.log('執行')
                        saveLikes[x].classList.add('bi-suit-heart-broke');
                    }
                }
            }
        }
    });
};
//如果值為空就不儲存
const updateLocalStorage = () => {
    if(saveLikePark === ''){
        return
    }else{
        localStorage.setItem('likePark', saveLikePark);
    }
};
//"jwt expired"token過期


//手機板
const searchBtn = document.querySelector('.searchBtn');
const searchBg = document.querySelector('.searchBg');
const btnX = document.querySelector('#btnX');
const areaOptionRwd = document.querySelector('#areaOption-Rwd');
const roadOptionRwd = document.querySelector('#roadOption-Rwd');
const btnBgMove2Rwd = document.querySelector('.btn-bg-move2-Rwd');
const btn11Rwd = document.querySelector('#btn1-1-Rwd');
const btn12Rwd = document.querySelector('#btn1-2-Rwd');
const btn21Rwd = document.querySelector('#btn2-1-Rwd');
const btn22Rwd = document.querySelector('#btn2-2-Rwd');
const btn23Rwd = document.querySelector('#btn2-3-Rwd');
const btnBgMove3Rwd = document.querySelector('.btn-bg-move3-Rwd');
const btnBgMove1Rwd = document.querySelector('.btn-bg-move1-Rwd')
const btn31Rwd = document.querySelector('#btn3-1-Rwd');
const btn32Rwd = document.querySelector('#btn3-2-Rwd');

//渲染區域資料到畫面上
const showSectionListRwd = () => {
    let content = '';
    if (sectionData.length === 0) {
        content =  ``
        } else {
            sectionData.forEach((item) => {
                content += `<option value="${item.id}">${item.area}</option>`
            })
        }
        areaOptionRwd.innerHTML = content;
}
//車位類別按鈕監聽
btn21Rwd.addEventListener('click', () => {
    moveBtn2Rwd(btn21Rwd)
    getType = btn21Rwd.value
});
btn22Rwd.addEventListener('click', () => {
    moveBtn2Rwd(btn22Rwd)
    getType = btn22Rwd.value
});
btn23Rwd.addEventListener('click', () => {
    moveBtn2Rwd(btn23Rwd)
    getType = btn23Rwd.value
});
//顯示有車位或全部停車場按鈕監聽
btn31Rwd.addEventListener('click', () => {
    moveBtn3Rwd(btn31Rwd)
    getSpaceOrNot = btn31Rwd.value
});
btn32Rwd.addEventListener('click', () => {
    moveBtn3Rwd(btn32Rwd)
    getSpaceOrNot = btn32Rwd.value
});
//路邊停車與停車場按鈕監聽
btn11Rwd.addEventListener('click' , () => {
    getParkValue = btn11Rwd.value
    moveBtn1Rwd(btn11Rwd)
})
btn12Rwd.addEventListener('click' , () => {
    getParkValue = btn12Rwd.value
    moveBtn1Rwd(btn12Rwd)
})
//渲染道路資料到畫面上
const showRoadOptionListRwd = (a) => {
    let content = '';
    if (a === "S01") {
        content =  `<option value="R001">中山路</option>`
        } else {
            a.forEach((item) => {
                content += `<option value="${item.id}">${item.roadName}</option>`
            })
        }
        roadOptionRwd.innerHTML = content;
}
//選車位種類按鈕區塊移動
const moveBtn2Rwd = (y) => {
    let num = parseInt(y.getAttribute('data-num'));
    if (num > btnNumList2) {
        btnBgMove2Rwd.style.marginLeft = (100 * (num-1)) + 'px';
    }else if(num > btnNumList2){
        btnBgMove2Rwd.style.marginLeft = (100 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove2Rwd.style.marginLeft = 0;
    }
}
//顯示有車位停車場按鈕區塊移動
const moveBtn3Rwd = (z) => {
    let num = parseInt(z.getAttribute('data-num'));
    if (num > btnNumList2) {
        btnBgMove3Rwd.style.marginLeft = (158 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove3Rwd.style.marginLeft = 0;
    }
}
//選擇路邊或停車唱按鈕區塊移動
const moveBtn1Rwd = (w) => {
    let num = parseInt(w.getAttribute('data-num'));
    if (num > btnNumList1) {
        btnBgMove1Rwd.style.marginLeft = (170 * (num-1)) + 'px';
    }else if(num=1){
        btnBgMove1Rwd.style.marginLeft = 0;
    }
}
//控制篩選藍
let rwdBtn = false
searchBtn.addEventListener('click' , (e) => {
    rwdBtn = !rwdBtn;
    showRwdChoice()
    rotateIcon()
})
//讓篩選藍出現或消失的出發方法
const showRwdChoice = () => {
    if(rwdBtn === true){
        searchBg.style.display = 'block'
        setTimeout(() => {
            searchBg.classList.add('show');
        }, 1);
    }else if(rwdBtn === false){
        let area = areaOptionRwd.value;
        let road = roadOptionRwd.value;
        console.log(area,road,getType,getSpaceOrNot,getParkValue)
        getMapDetailRwd(area,road,getType,getSpaceOrNot,getParkValue)
        dataToMap()
        plusLike(filteredMapData);
        console.log(filteredMapData)
        searchBg.classList.remove('show');
        setTimeout(() => {
            searchBg.style.display = 'none'
        }, 500);
    }
}
searchBg.style.display = 'none'//預先將篩選藍禁止顯示
//加號按鈕旋轉方法
const rotateIcon = () => {
    if(rwdBtn === true){
        btnX.classList.add('xBtn2');
        btnX.classList.remove('xBtn');
    }else if(rwdBtn === false){
        btnX.classList.add('xBtn');
        btnX.classList.remove('xBtn2');
    }
}
//手機板選出篩選過後停車場資料
const getMapDetailRwd = (a,b,c,d,e) => {
    filteredMapData = data.filter((item) => {
        if(item.road.sectionId === a && item.roadId === b && item.type.includes(c) && (d === 'haveSpace' && item.space !== "0") && item.categoryId === e){
            return item
        }else if(item.road.sectionId === a && item.roadId === b && item.type.includes(c) && d === 'all' && item.categoryId === e){
            return item
        }
    })
    console.log(filteredMapData)
}