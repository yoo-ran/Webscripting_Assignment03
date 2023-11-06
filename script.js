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
            // when outsideCost is validated, now we need to check the value of shipping option
            // using switch statement, we can check different value easily and shorter tan if statement
            // so we will check the value of shipping
            switch (shipping) {
                // if the value is "REG" (when user clicked Regular shipping), $5.50 will be added to the price of item
                // the price is from function estimate() which is the price of each item 
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

            // then the outside cost that user typed will be added to the price
            // the price will get accumulated using += ( addition assignment opearator)
            price += outsideCost;
    
            // The checkbox called certificate  should be checked
            // if user checked the certificate checkbox, it will return true
            // then true statement will run which is addition $2.75 to the price
            if(certificate){
                price += 2.75;
            }
        
            // same as how certificate validation works
            if(originalPackage){
                price+= 9.95;
            }
    
            // same as how certificate validation works
            // However, in this case, multiplication assignment will be used,
            // because all the price should calcurate first, then the calculated price must be multiplied by 1.15
            if(tax){
                price *= 1.12
            }

            // We've finished calculation and got result price
            // It's time to put the result into span tag using .innerHTML
            // variable result is from function estimate();
            // price will have long decimal places, so to make it shorter, I used .toFixed(2) which will indicate up to two decimal places
            // and using double quotation and concatenation(+), I add $
            result.innerHTML = "$" + price.toFixed(2);

        // when the outsideCost is invalid, warning message will appear next to outsideCost input
        }else {
            // I already created variable for span tag called outsideCost_error
            // and I put message "Please, select enter a number only" into the span tag using .innerHTML
            outsideCost_error.innerHTML = "Please, select enter a number only";
        }
    // when the shipping selection is invalid, warning message will appear next to shipping select input
    }else{
        // I already created variable for span tag called shipping_error
        // and I put message "Please, select one" into the span tag using .innerHTML
        shipping_error.innerHTML = "Please, select one";

        // This is for the case that shipping is invalid and also outsideCost is also invalid using  !(“not” operator)
        if(!(outsideCost>=0 && outsideCost<=50)){
            outsideCost_error.innerHTML = "Please, select enter a number only"
        }
    }
}


// Finally, when user clicked "estimate" button, function estimate() will run and all the calculation will work
estimateBtn.addEventListener("click",estimate);