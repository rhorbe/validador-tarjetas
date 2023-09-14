const form = document.getElementsByTagName("form")[0];

const numTarjeta = document.getElementById("mail");
const feedback = document.getElementById("feedback");

numTarjeta.addEventListener("input", function (event) {
  if (esValido(numTarjeta)) {
    limpiarError();
    if (tarjetaIdentificada(numTarjeta)){}
  } else {
    showError();
  }
});

function limpiarError() {
  numTarjeta.classList.remove("is-invalid");
}

function showError() {
  numTarjeta.classList.add("is-invalid");
  if (numTarjeta.validity.valueMissing) {
    // Si el campo está vacío
    // muestra el mensaje de error siguiente.
    feedback.textContent =
      "Debe introducir una dirección de correo electrónico.";
  } else if (numTarjeta.validity.typeMismatch) {
    // Si el campo no contiene una dirección de correo electrónico
    // muestra el mensaje de error siguiente.
    feedback.textContent =
      "El valor introducido debe ser una dirección de correo electrónico.";
  } else if (numTarjeta.validity.tooShort) {
    // Si los datos son demasiado cortos
    // muestra el mensaje de error siguiente.
    feedback.textContent =
      "El correo electrónico debe tener al menos ${ numTarjeta.minLength } caracteres; ha introducido ${ numTarjeta.value.length }.";
  }

  // Establece el estilo apropiado
  feedback.className = "error activo";
}
