//Read values from form
function getValues(){
    let loanAmount=parseFloat(document.getElementById("loanAmountInput").value);
    let loanTerm= parseFloat(document.getElementById("loanTermInput").value);
    let loanInterest=parseFloat(document.getElementById("loanInterestInput").value);
    //Calculates Monthly Payment 
    let monthlyPay=calculateMonthlyPayment(loanAmount,loanTerm,loanInterest);
    //Calculates and populates amortization table
    let creditResults=calculateAmortizationTable(loanAmount,loanTerm,loanInterest,monthlyPay);
    let amortizationTable=creditResults.amortization;
    let totalInterest=creditResults.totalInterest;
    //Displays credit consolidated results
    displayCreditResults(loanAmount,monthlyPay.toFixed(2),totalInterest.toFixed(2));
    //Displays amortization table
    displayTable(amortizationTable);

    //Displays Data for monthly payment results
   
}

function calculateMonthlyPayment(amount,term,interest){
    let monthlyPayment=amount*(interest/1200)/(1-(1+interest/1200)**(-term));
    return monthlyPayment;
}

function calculateAmortizationTable(amount,term,interest,monthlyPayment){
    let amortization={'Month':[],"Payment":[],"Principal":[],"Interest":[],
    "Total Interest":[],"Balance":[]};
    let totalInterest=0;
    let balance=amount;
    let interestPay=0;
    let principalPay=0;
    //Amortization table
    for (let i=1;i<=term;i++){
        interestPay=balance*interest/1200;
        principalPay=monthlyPayment-interestPay;
        totalInterest+=interestPay;
        balance-=principalPay;
        amortization["Month"].push(i);
        amortization["Interest"].push(interestPay.toFixed(2));
        amortization["Payment"].push(monthlyPayment.toFixed(2));
        amortization["Principal"].push(principalPay.toFixed(2));
        amortization["Total Interest"].push(totalInterest.toFixed(2));
        amortization["Balance"].push(balance.toFixed(2));
    }
    return {amortization,totalInterest};

}
function displayCreditResults(amount,monthlyPayment,totalInterest){
    let totalCost=amount+totalInterest;
    document.getElementById("totalPrincipalOutput").innerHTML=amount.toString()+"$";
    document.getElementById("totalInterestOutput").innerHTML=totalInterest.toString()+"$";
    document.getElementById("totalCostOutput").innerHTML=totalCost.toString()+"$";
    document.getElementById("monthlyPaymentOutput").innerHTML=monthlyPayment.toString()+"$";
}
function displayTable(amortizationTable){
    let tableBody= document.getElementById("amortizationTable");
    let rowTemplate= document.getElementById("tableRowTemplate");
    tableBody.innerHTML="";
    let Month=amortizationTable["Month"];
    let Payment=amortizationTable["Payment"];
    let Principal=amortizationTable["Principal"];
    let Interest=amortizationTable["Interest"];
    let TotalInterest=amortizationTable["Total Interest"];
    let Balance=amortizationTable["Balance"];
    for (let i=0; i<Month.length;i++){
        let tableRow=document.importNode(rowTemplate.content,true);
        let rowCols=tableRow.querySelectorAll("td");
        rowCols[0]=Month[i];
        rowCols[1]=Payment[i];
        rowCols[2]=Principal[i];
        rowCols[3]=Interest[i];
        rowCols[4]=TotalInterest[i];
        rowCols[5]=Balance[i];
        tableBody.appendChild(tableRow);
    }

}