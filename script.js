const estimateBtn = document.querySelector("#estimate");


const estimate = () => {
    let priceArr = document.querySelectorAll(".itemPrice")
    let resultArr = document.querySelectorAll(".result")


    for (let i = 0; i < priceArr.length; i++) {
        resultArr[i].innerHTML =""
        calculate(Number(priceArr[i].value),resultArr[i])
    }
    
}

const calculate = (price,result)=> {
    let shipping = document.querySelector("#shipping").value;
    let outsideCost = Number(document.querySelector("#outside-costs").value)
    let certificate = document.querySelector("#certificate").checked;
    let originalPackage = document.querySelector("#original-package").checked;
    let tax = document.querySelector("#taxable").checked;
    let shipping_error = document.querySelector("#shipping-warning");
    let outsideCost_error= document.querySelector("#outside-warning")
    shipping_error.innerHTML = "";
    outsideCost_error.innerHTML = "";

   
    if(shipping){
        if(outsideCost>=0 && outsideCost<=50){
            switch (shipping) {
                case "REG":
                    price += 5.50;
                    break;
                
                case "EXP":
                    price += 15.75;
                    break;
                
                case "OVER":
                    price += 29.95;
                    break;
            }
            price += outsideCost;
    
            if(certificate){
                price += 2.75;
            }
        
            if(originalPackage){
                price+= 9.95;
            }
    
            if(tax){
                price *= 1.12
            }

            result.innerHTML = "$" + price.toFixed(2);
    
        }else {
            outsideCost_error.innerHTML = "Outside Costs is invalidate"
        }
    }else{
        shipping_error.innerHTML = "Shipping is not selected"
        if(!(outsideCost>=0 && outsideCost<=50)){
            outsideCost_error.innerHTML = "Outside Costs is invalidate"
        }
    }



}


estimateBtn.addEventListener("click",estimate);