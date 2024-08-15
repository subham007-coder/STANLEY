document.addEventListener("DOMContentLoaded", function () {
    const nextBtns = document.querySelectorAll(".btn-next");
    const prevBtns = document.querySelectorAll(".btn-prev");
    const formSteps = document.querySelectorAll(".form-step");
    const form = document.getElementById("multiStepForm");
    let formStepsNum = 0;
  
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (validateForm()) {
          formSteps[formStepsNum].classList.remove("form-step-active");
          formStepsNum++;
          formSteps[formStepsNum].classList.add("form-step-active");
        }
      });
    });
  
    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formSteps[formStepsNum].classList.remove("form-step-active");
        formStepsNum--;
        formSteps[formStepsNum].classList.add("form-step-active");
      });
    });
  
    function validateForm() {
      const currentStep = formSteps[formStepsNum];
      const inputs = currentStep.querySelectorAll("input[required], input[type='radio'], input[type='checkbox']");
      let isValid = true;
    
      inputs.forEach((input) => {
        if (input.type === "radio") {
          const radioGroup = currentStep.querySelectorAll(`input[name="${input.name}"]`);
          if (!Array.from(radioGroup).some(radio => radio.checked)) {
            isValid = false;
          }
        } else if (input.type === "checkbox") {
          if (!input.checked) {
            isValid = false;
          }
        } else if (!input.value.trim()) {
          isValid = false;
        }
      });
    
      if (!isValid) {
        alert("Please fill in all required fields.");
      }
    
      return isValid;
    }
    
  });

  // cookies send
setCookie = (cName, cValue, expdays) => {
  let date = new Date();
  date.setTime(date.getTime() + (expdays * 24 * 60* 60 * 1000));
  const expair = "expires =" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expair + "; path=/"
}

getCookie = (cName) => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split("; ");
  let value;
  cArr.forEach(val =>{
    if(val.indexOf(name) === 0) value = val.substring(name.length);
  });
  return value;
}

  document.querySelector("#cookie-btn").addEventListener("click", () => {
    document.querySelector("#cookies").style.display = "none";
    setCookie("cookie", true, 30);
  })

  // cookie msg

  cookieMessage = () => {
    if(!getCookie("cookie"))
      document.querySelector("#cookies").style.display = "block";
  }

  window.addEventListener("load", cookieMessage);