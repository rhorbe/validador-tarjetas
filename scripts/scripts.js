const form = document.getElementsByTagName("form")[0];

const numTarjeta = document.getElementById("numTarjeta");
const feedback = document.getElementById("feedback");

numTarjeta.addEventListener("input", function (event) {

  // Cada vez que el usuario escribe algo, verificamos si los campos del formulario son válidos.
  if (numTarjeta.validity.valid) {
    cleanError()
   
    /* 
    // En caso de que haya un mensaje de error visible, si el campo
    // es válido, eliminamos el mensaje de error.
    feedback.innerHTML = ""; // Restablece el contenido del mensaje
    feedback.className = "error"; // Restablece el estado visual del mensaje */
  } else {
    numTarjeta.classList.add("is-invalid");
    showError();
  }
});

function cleanError(){
  numTarjeta.classList.remove("is-invalid");

}

function showError() {
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
