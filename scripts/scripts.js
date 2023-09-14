const NUM_INCOMPLETO = 0;
const NUM_INVALIDO = 1;
const NUM_VALIDO = 2;
const ICONO_TARJETA_DESCONOCIDA = "fa-solid fa-credit-card fa-lg";
const ICONO_VISA = "fa-brands fa-cc-visa fa-lg";

const numTarjeta = document.getElementById("numTarjeta");
const feedback = document.getElementById("feedback");
const btnRetablecer = document.getElementById("btnRetablecer");
const iconoTarjeta = document.getElementById("iconoTarjeta");

numTarjeta.addEventListener("input", manejadorValidacion);
btnRetablecer.addEventListener("click", restablecerFormulario);

function manejadorValidacion(event) {
  let estadoFormulario = determinarEstado();
  if (estadoFormulario == NUM_INVALIDO) {
    mostrarError();
  } else if (estadoFormulario == NUM_VALIDO) {
    aceptarTarjeta();
  } else {
    borrarErrores();
  }
}
function mostrarError() {
  borrarErrores();
  numTarjeta.classList.add("is-invalid");
  feedback.innerHTML = "S&oacutelo puede ingresar s&oacutelo n&uacutemeros";
}

function aceptarTarjeta() {
  borrarErrores();
  numTarjeta.classList.add("is-valid");
  iconoTarjeta.className = ICONO_VISA;
}

function borrarErrores() {
  numTarjeta.classList.remove("is-invalid");
  numTarjeta.classList.remove("is-valid");
}

function restablecerFormulario() {
  borrarErrores();
  numTarjeta.focus();
  numTarjeta.value = "";
  iconoTarjeta.className = ICONO_TARJETA_DESCONOCIDA;
}

function determinarEstado() {
  if (numTarjeta.value == "" || numTarjeta.value == "o") return NUM_INCOMPLETO;
  else if (numTarjeta.value == "ok") return NUM_VALIDO;
  else return NUM_INVALIDO;
}
