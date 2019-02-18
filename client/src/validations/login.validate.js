import bcrypt from "bcryptjs";

export const loginValidation = (userCredentials, loginCredentials) => {

  let emailInput = document.getElementById('exampleInputEmail');
  let errorMsgEmail = document.getElementById('emailError');

  let passwordInput = document.getElementById('exampleInputPassword');
  let errorMsgPassword = document.getElementById('passwordError');

  //Check for valid email address
  if (userCredentials.email !==  loginCredentials.email || loginCredentials == null || loginCredentials === undefined) {
    emailInput.classList.add('is-invalid');
    errorMsgEmail.classList.remove('d-none');
    errorMsgEmail.classList.add("d-block");
    return false;
  } else {
    emailInput.classList.remove('is-invalid');
    errorMsgEmail.classList.add('d-none');
    errorMsgEmail.classList.remove("d-block");

    bcrypt.compare(userCredentials.password, loginCredentials.password, (err, isMatch) => {
      if (err) {
        throw err.message;
      }
      if (isMatch) {
        emailInput.classList.remove('is-invalid');
        errorMsgEmail.classList.add('d-none');
        errorMsgEmail.classList.remove("d-block");

        passwordInput.classList.remove('is-invalid');
        errorMsgPassword.classList.add('d-none');
        errorMsgPassword.classList.remove("d-block");
        return true;
      } else {
        emailInput.classList.remove('is-invalid');
        errorMsgEmail.classList.add('d-none');
        errorMsgEmail.classList.remove("d-block");

        passwordInput.classList.add('is-invalid');
        errorMsgPassword.classList.remove('d-none');
        errorMsgPassword.classList.add("d-block");
        return false;
      }
    });
  }
}