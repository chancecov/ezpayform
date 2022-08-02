// Version: 1.0 Comments: Intial development of ez-pay form
// Grabbing today and converting it t othe 3 dates needed for the .Date field
const today = new Date();
const min = new Date(today.getFullYear(), today.getMonth(), (today.getDate()+1));
const def = new Date(today.getFullYear(), today.getMonth(), (today.getDate()+14));
const max = new Date(today.getFullYear(), today.getMonth(), (today.getDate()+21));
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const version = "Version: 1.0 Comments: Intial development of ez-pay form"
var year = getParameterByName('year');
window.onload = function() {
	myFunction();
}; 


function myFunction() {
		// Pushing values to the date field
		document.getElementById("date").value = def.toISOString().split('T')[0];
		document.getElementById("date").min = min.toISOString().split('T')[0];
		document.getElementById("date").max = max.toISOString().split('T')[0];
		document.getElementById("eminDate").innerHTML = min.toISOString().split('T')[0];
		document.getElementById("emaxDate").innerHTML = max.toISOString().split('T')[0];
}
function dateCheck() {
	var sDate = new Date(document.getElementById("date").value);
	if(min.toISOString().split('T')[0] <= sDate.toISOString().split('T')[0] && sDate.toISOString().split('T')[0] <= max.toISOString().split('T')[0]){
		dateSch();
	}
	else{
	}
}
function dateSch(){
	var sDate = new Date(document.getElementById("date").value);
	var firDate = new Date(sDate.getFullYear(), sDate.getMonth(), (sDate.getDate()+15));
	var secDate = new Date(sDate.getFullYear(), sDate.getMonth(), (sDate.getDate()+29));
	document.getElementById("firstDate").innerHTML = sDate.toISOString().split('T')[0];
	document.getElementById("secondDate").innerHTML = firDate.toISOString().split('T')[0];
	document.getElementById("thirdDate").innerHTML = secDate.toISOString().split('T')[0];
	// push selected date to submit form
	document.getElementById("subDate").value = sDate.toISOString().split('T')[0];
	document.getElementById("pDate").innerHTML = " " + sDate.toISOString().split('T')[0] + "&emsp;";
	// push data to print form
	document.getElementById("pToday").innerHTML = " " + today.toISOString().split('T')[0] + "&emsp;";
	document.getElementById("pfirstDate").innerHTML = sDate.toISOString().split('T')[0];
	document.getElementById("psecondDate").innerHTML = firDate.toISOString().split('T')[0];
	document.getElementById("pthirdDate").innerHTML = secDate.toISOString().split('T')[0];

}	
// Math for smaller finance than order
function orderMath(){
	var	oTot = parseFloat(document.getElementById("oTotal").value).toFixed(2); // Turns string in to number *has to be inside a function
	var fTot = parseFloat(document.getElementById("fTotal").value).toFixed(2); //
	// Checks to see if oTot is the same as fTot to change math
	var pNum = 3
	// if (oTot == fTot){
	// 	// document.getElementById("error-fTotal").innerHTML = "Same";
	// 	var pNum = 4
	// }
	var pAmount = parseFloat((fTot / pNum).toFixed(2)); // Rounds number to 2 digit
	if ((parseFloat((fTot / pNum).toFixed(2))*3) > +fTot){			
		var	pAmount = parseFloat(((fTot - .03) / pNum).toFixed(2));	//Check to see if the amount goes over the intial finance amount
	}																//
	var iAmount = parseFloat((oTot - fTot) + (fTot - (pAmount * 3))).toFixed(2); // intial payment amount 
	var fAmount = (pAmount * 3).toFixed(2);
	if (+iAmount < +pAmount){
		var pAmount = parseFloat((fTot / (pNum +1)).toFixed(2));
		var fTot = parseFloat(document.getElementById("fTotal").value - pAmount).toFixed(2);		
		var	pAmount = parseFloat((fTot / pNum).toFixed(2));	//Check to see if the amount goes over the intial finance amount
		var iAmount = parseFloat((oTot - fTot) + (fTot - (pAmount * 3))).toFixed(2); // intial payment amount 
		var fAmount = (pAmount * 3).toFixed(2);
	}
		document.getElementById("orderTotal").innerHTML = "$" + oTot +" Order Total";
		document.getElementById("financeTotal").innerHTML = "$" + fAmount + " Finance Total";
		document.getElementById("initialPayment").innerHTML = "$" + iAmount + " Intial Payment";
		document.getElementById("paymentAmount").innerHTML = "$" + pAmount.toFixed(2) + " Payment Amount";
		document.getElementById("firstPay").innerHTML =" - $" + pAmount.toFixed(2);
		document.getElementById("secondPay").innerHTML =" - $" + pAmount.toFixed(2);
		document.getElementById("thirdPay").innerHTML =" - $" + pAmount.toFixed(2);
		document.getElementById("orderValues").classList.remove('hidden');
		//pushing values to submit form
		document.getElementById("subIamount").value = iAmount;
		document.getElementById("subPamount").value = pAmount;
		document.getElementById("ezSubmit").type = "submit";
		document.getElementById("printForm").type = "button";
		//pushing values to print form
		document.getElementById("fiPayment").innerHTML = "$" + iAmount +"&emsp;";
		document.getElementById("ppAmount").innerHTML = "$" + pAmount.toFixed(2) +"&emsp;";
		document.getElementById("pFullName").innerHTML = " " + document.getElementById("fname").value + " " + document.getElementById("lname").value + "&emsp;";
		document.getElementById("pfirstPay").innerHTML =" - $" + pAmount.toFixed(2);
		document.getElementById("psecondPay").innerHTML =" - $" + pAmount.toFixed(2);
		document.getElementById("pthirdPay").innerHTML =" - $" + pAmount.toFixed(2);

}
// Check to make sure finance amount(fTotal) is less than order amount(oTotal)
function fCheck(){
	var	oTot = parseFloat(document.getElementById("oTotal").value).toFixed(2); // Turns string in to number *has to be inside a function
	var fTot = parseFloat(document.getElementById("fTotal").value).toFixed(2); //
	document.getElementById("fTotal").max = oTot
	if (+oTot < +fTot){
		document.getElementById("fTotal").classList.add('is-invalid');
	}
	else {
		document.getElementById("fTotal").classList.remove('is-invalid');
		orderMath();
		dateSch();
	}
}
function oCheck(){
	var fTot = parseFloat(document.getElementById("fTotal").value).toFixed(2);
	if (+fTot > 0){
		fCheck();
	}
}
function validateEmail(){
	var email = document.getElementById("email");
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(email.value.match(mailformat))
	{
	document.getElementById("email").classList.remove('is-invalid');
	}
	else
	{
	document.getElementById("email").classList.add('is-invalid');
	
	// return false;
	}
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function printDiv(divName) {
 	var printContents = document.getElementById(divName).innerHTML;
 	var originalContents = document.body.innerHTML;
	
	var	poTot = parseFloat(document.getElementById("oTotal").value).toFixed(2); 
	var pfTot = parseFloat(document.getElementById("fTotal").value).toFixed(2); 
	var pFname = document.getElementById("fname").value;
	var pLname = document.getElementById("lname").value;
	var pEmail = document.getElementById("email").value;
	var pDate = document.getElementById("date").value;
	document.getElementById("ezForm").classList.remove('was-validated');
	document.getElementById("ezForm").classList.toggle('hidden');
	document.getElementById("printableArea").classList.toggle('hidden');
 	// document.body.innerHTML = printContents;
 	window.print();
 	document.getElementById("ezForm").classList.toggle('hidden');
 	document.getElementById("printableArea").classList.toggle('hidden');
 	// document.body.innerHTML = originalContents;
 	document.getElementById("fname").value = pFname;
	document.getElementById("lname").value = pLname;
	document.getElementById("email").value = pEmail;
	document.getElementById("date").value = pDate;
	document.getElementById("oTotal").value = poTot;
	document.getElementById("fTotal").value = pfTot;
		
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function formCheck() {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()