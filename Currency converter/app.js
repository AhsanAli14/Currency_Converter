// const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const base_curr = document.querySelector(".from select");
const to_curr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for (let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <1 ){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}/${base_curr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let baseCurrencyData = data[base_curr.value.toLowerCase()];
    let rate = baseCurrencyData[to_curr.value.toLowerCase()];
    // console.log(rate);

    let finalamount = amtVal * rate;
    msg.innerText = `${amtVal} ${base_curr.value} = ${finalamount} ${to_curr.value}`;
})


