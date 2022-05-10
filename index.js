// const axios = require('axios');
async function getData(){
  try{
    const {data} = await axios.get("http://localhost:5000/api/v1/get");
    console.log(data)
    return data;
  }
  catch(err) {
    console.log(err);
  }
} 

// getData();

function listData(listContainerId) {
  const listContainer = document.getElementById(listContainerId);
  if(!listContainer) {
    return;
  }

  getData().then(data => { 
    setData(data, listContainer);
  })
}

function setData(data, listContainer){
  data.forEach((element, index) => {
    let ul = document.createElement('ul');
    let serialLi = document.createElement('li');
    let nameLi = document.createElement('li');
    let lastLi = document.createElement('li');
    let buyLi = document.createElement('li');
    let volumeLi = document.createElement('li');
    let baseLi = document.createElement('li');
    ul.classList.add('list_item');
    serialLi.classList.add('flex_small');
    baseLi.classList.add('flex_small');
    buyLi.classList.add('flex_threebytwo');
    serialLi.innerHTML= index+1;
    nameLi.innerText = element.name;
    lastLi.innerText = `₹ ${element.last}`;
    buyLi.innerText = `₹ ${element.buy} / ₹ ${element.sell}`;
    volumeLi.innerText = element.volume;
    baseLi.innerText = element.baseunit;

    ul.append(serialLi, nameLi, lastLi, buyLi, volumeLi, baseLi);

    listContainer.append(ul)
  });
}
listData('list');

/* <ul class="list_item">
        <li class="flex_small">1</li>
        <li>BTC/INR</li>
        <li>$ 2,587,560</li>
        <li>$ 2,587,560 / $ 2,590,518</li>
        <li>286.1729</li>
        <li class="flex_small">btc</li>
      </ul> */