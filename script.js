const estimateBtn = document.querySelector("#estimate");
let shipping =document.querySelector("#shipping").value;
let certificate = document.querySelector("#certificate").checked;
let originalPackage = document.querySelector("#original-package").checked;
let tax = document.querySelector("#taxable").checked;

let priceArr = []
for (let i=1; i < 6; i++) {
    priceArr.push(`item-${i}-input`);
}

const calcurateChecked = (tax,num) =>{
    if(tax!="tax"){
        console.log(tax);
        let itemArr = document.querySelectorAll(".itemPrice");
        itemArr.forEach(item => {
            let price = Number(item.value)+Number(num)
        })
    }else {
        let itemArr = document.querySelectorAll(".itemPrice")
        itemArr.forEach(item => {
            let price = Math.floor(item.value*1.12)
        });
    }
}



const test = () => {
    if (originalPackage) {
        calcurateChecked("package", 9.95)
    }
    
    if (certificate) {
        calcurateChecked("certificate", 2.75)
    }
}

estimateBtn.addEventListener("click",test);