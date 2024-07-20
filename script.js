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
      const inputs = currentStep.querySelectorAll("input[required], input[type='radio']");
      let isValid = true;
  
      inputs.forEach((input) => {
        if (input.type === "radio") {
          const radioGroup = currentStep.querySelectorAll(`input[name="${input.name}"]`);
          if (!Array.from(radioGroup).some(radio => radio.checked)) {
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
  