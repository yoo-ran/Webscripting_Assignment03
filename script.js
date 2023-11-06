// Create variable for the estimate button
// At the bottom, I will use it for click eventlistener
const estimateBtn = document.querySelector("#estimate");

// When user clicks "estimate" button, this function will run
// Basically, this function is for running calculation
const estimate = () => {
    // Create array for input of each item, so I can reach to the price each item
    // then the price will go to function calculate()
    // I need price array to reach each price and to calculate it
    let priceArr = document.querySelectorAll(".itemPrice")
    // Create span tag array, so I can put the result of calculation into span tag
    let resultArr = document.querySelectorAll(".result")

    // using for loop, I am putting price and span tag each into funtion calculate()
    // why I use for loop is I need to reach each element of priceArr and resultArr using index
    // i will start from 0 until before the length of priceArr, and i is incremented
    for (let i = 0; i < priceArr.length; i++) {
        // First of all, there should be nothing in span of result
        // so I made all span empty, using empty string
        resultArr[i].innerHTML ="";
        // then, put each price and eat span for result into function calculate()
        // Call the priceArr[i], which is unput tag, and bring the value of input using .value
        // however, when priceArr[i] is called, it returns string, so we need to convert into number, so I used Number()
        // then call the resultArr[i], which is each span tag for result
        calculate(Number(priceArr[i].value),resultArr[i]);
    }
    
}

// With this funtion, all the price will be calculated
// To do that, we need 2two parameter, price and result
// the value of parameters come from function estimate()
const calculate = (price,result)=> {
    // Create the variable to make coding easier and shorter

    // this is value of shipping input result
    // call document, and call shipping select input using querySelector, then bring the value of the select input
    // and store the value into variable
    let shipping = document.querySelector("#shipping").value;
    let outsideCost = Number(document.querySelector("#outside-costs").value)

    // we need to check if the checkbox is checked or not
    // first, call the document, and call checkbox input using querySelector, and checked if it's checked or not using .checked
    // if the checkbox is checked, it will return true, if not, it returns false
    // and store the result into variable
    let certificate = document.querySelector("#certificate").checked;
    let originalPackage = document.querySelector("#original-package").checked;
    let tax = document.querySelector("#taxable").checked;

    // create variable for giving alert message to user
    // this variable is for span tag
    // later I will put the warning message into this span tag
    let shipping_error = document.querySelector("#shipping-warning");
    let outsideCost_error= document.querySelector("#outside-warning");

    // before the calculation, shipping_error and outsideCost_error should be empty, because it's before the calculation runs
    // call shipping error span tag using variable, make it empty using empty string and .inneHTML
    shipping_error.innerHTML = "";
    outsideCost_error.innerHTML = "";

   
    // Validation for checking if user selected shipping option or not
    // if not, shipping error message should apeear
    // If user didn't select any option, shipping will return empty string which is false, then it will skip to else part
    
    // If user clicked any option, it will return value of the option input which is one of "REG", "EXP" and "OVER" and the if () statement will run
    if(shipping){
        // when shipping is validated, we need to check outsideCost as well
        // if outsideCost that user typed is more than and eqaul to 0 and less than and eqaul to 50, if statement will run 
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