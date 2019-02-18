const regexForUsername = /^[a-zA-Z0-9]+$/;

const isValid = (username) => {
  return regexForUsername.test(String(username));
}

export const validateUsername = (username) => {
  let usernameInput = document.getElementById('exampleInputUsername');
  let errorMsg = document.getElementById('usernameError');
  if (!isValid(username)) {
    usernameInput.classList.add('is-invalid');
    errorMsg.classList.remove('d-none');
    errorMsg.classList.add("d-block");
    return false;
  } else {
    usernameInput.classList.remove('is-invalid');
    errorMsg.classList.remove('d-block');
    errorMsg.classList.add("d-none");
    return true;
  }
}