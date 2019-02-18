const regexForName = /^[a-zA-Z ]{2,30}$/;

const isValid = (name) => {
  return regexForName.test(String(name));
}

export const validateName = (name) => {
  let nameInput = document.getElementById('exampleInputName');
  let errorMsg = document.getElementById('nameError');
  if (!isValid(name)) {
    console.log('invalid name');
    nameInput.classList.add('is-invalid');
    errorMsg.classList.remove('d-none');
    errorMsg.classList.add("d-block");
    return false;
  } else {
    nameInput.classList.remove('is-invalid');
    errorMsg.classList.remove('d-block');
    errorMsg.classList.add("d-none");
    return true;
  }
}