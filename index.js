
const boxes = document.getElementById("otp-box-id");

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
  });

function generateOTP() {
    const otp = Math.floor(Math.random() * 9000) + 1000;
    // document.getElementById("otp-box-id").value = otp;
    // return otp;
  }



