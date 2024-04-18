const boxes = document.getElementById("otp-box-id");
const resultElement = document.getElementById("result-element");
const otpExpireElement = document.getElementById("otp-expires-id");
let generatedOTP;
let result;

function handleOTPBox() { 
  boxes.addEventListener("input", function (e) {
    const value = e.target.value;
    // Check if the entered value is not a number
    if (isNaN(value)) {
      e.target.value = ""; // Clear the input value
      return;
    }
  
    // Get the next sibling element of the input element that triggered the event
    const nextElement = e.target.nextElementSibling;
    // Check if the next sibling element exists
    if (nextElement) {
      nextElement.focus(); // Focus on the next sibling element
    }
    validateOTP();
  });
}

// This function generates a random 4-digit OTP (One Time Password)
function generateOTP() {
   generatedOTP = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("generated-otp").innerText = `Your OTP: ${generatedOTP}`;
  expireOTP();
}

function validateOTP() {
  let typedNum = "";
  [...boxes.children].forEach((element) => {
    typedNum = typedNum + element.value;
  });
 
   result = (generatedOTP === parseInt(typedNum, 10));
  if (result) {
    resultElement.innerText = "OTP has been validated successfully"
    resultElement.classList.remove("fail");
    resultElement.classList.add("success");

  } else {
    resultElement.innerText = "OTP is invalid";
    resultElement.classList.remove("success")
    resultElement.classList.add ("fail");
  }
 }
 
function expireOTP() {
  const totalTime = 30000;
  const interval = 1000;
  let slice = totalTime / interval;
  const intervalID = setInterval(function () {
    if (result) {
      otpExpireElement.innerText = "";
      document.getElementById(
        "generated-otp"
      ).innerText = "";
      return;
    }
    else {
      otpExpireElement.innerText = `OTP will expire in ${slice} seconds`;
      slice = slice - 1; 
    }
  }, interval);

  setTimeout(function () { 
    clearInterval(intervalID);
    if (!result) {
       otpExpireElement.innerText = "OTP Expired";
       generateOTP();
    }
  }, totalTime);
}

function init() {
  handleOTPBox();
  // Call the generateOTP() function after a delay of 2 seconds (2000 milliseconds)
  setTimeout(generateOTP, 2000);
  
}

init();