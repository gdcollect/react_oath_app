const regexForEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValid = (email) => {
  return regexForEmail.test(String(email));
}

export const validateEmail = (email) => {
  let emailInput = document.getElementById('exampleInputEmail');
  let errorMsg = document.getElementById('emailError');
  if (!isValid(email)) {
    emailInput.classList.add('is-invalid');
    errorMsg.classList.remove('d-none');
    errorMsg.classList.add("d-block");
    return false;
  } 
  else {
    emailInput.classList.remove('is-invalid');
    errorMsg.classList.remove('d-block');
    errorMsg.classList.add("d-none");
    return true;
  }
}