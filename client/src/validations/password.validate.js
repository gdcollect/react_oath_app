export const validatePassword = (password1, password2) => {
  let passwordInput2 = document.getElementById('exampleInputPassword2');
  let errorMsg = document.getElementById('passwordError');
  if (password1 !== password2) {
    passwordInput2.classList.add('is-invalid');
    errorMsg.classList.remove('d-none');
    errorMsg.classList.add("d-block");
    return false;
  } else {
    passwordInput2.classList.remove('is-invalid');
    errorMsg.classList.remove('d-block');
    errorMsg.classList.add("d-none");
    return true;
  }
}