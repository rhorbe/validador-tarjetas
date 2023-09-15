const TARJETA_INVALIDA = 0;
const TARJETA_NO_RECONOCIDA = 1;
const TARJETA_VISA = 2;
const TARJETA_DINERS = 3;

const numTarjeta = document.getElementById("numTarjeta");
const feedback = document.getElementById("feedback");
const btnRetablecer = document.getElementById("btnRetablecer");
const iconoTarjetaDesconocida = document.getElementById(
  "iconoTarjetaDesconocida"
);
const iconoVisa = document.getElementById("iconoVisa");
const iconoDiners = document.getElementById("iconoDiners");

numTarjeta.addEventListener("input", manejadorValidacion);
btnRetablecer.addEventListener("click", restablecerFormulario);

function manejadorValidacion(event) {
  let tarjetaDetectada = detectarTarjeta();

  if (tarjetaDetectada == TARJETA_NO_RECONOCIDA) limpiarErrores();
  else if (tarjetaDetectada == TARJETA_INVALIDA) mostrarError();
  else aceptarTarjeta(tarjetaDetectada);
}

function mostrarError() {
  limpiarErrores();
  numTarjeta.classList.add("is-invalid");
  feedback.innerHTML = "S&oacutelo puede ingresar s&oacutelo n&uacutemeros";
}

function aceptarTarjeta(tarjetaDetectada) {
  limpiarErrores();
  numTarjeta.classList.add("is-valid");
  ocultarIconosTarjetas();
  mostrarIconoTarjetaDetectada(tarjetaDetectada);
}

function mostrarIconoTarjetaDetectada(tarjetaDetectada) {
  switch (tarjetaDetectada) {
    case TARJETA_VISA:
      iconoVisa.classList.remove("d-none");
      break;
    case TARJETA_DINERS:
      iconoDiners.classList.remove("d-none");
      break;

    default:
      restablecerIconosTarjetas();
      break;
  }
}

function ocultarIconosTarjetas() {
  iconoTarjetaDesconocida.classList.add("d-none");
  iconoVisa.classList.add("d-none");
}

function limpiarErrores() {
  numTarjeta.classList.remove("is-invalid");
  numTarjeta.classList.remove("is-valid");
}

function restablecerFormulario() {
  limpiarErrores();
  restablecerIconosTarjetas();
  numTarjeta.focus();
  numTarjeta.value = "";
}

function restablecerIconosTarjetas() {
  alert("restablecer iconos");
  ocultarIconosTarjetas();
  iconoTarjetaDesconocida.classList.remove("d-none");
}

function detectarTarjeta() {
  if (
    numTarjeta.value == "" ||
    numTarjeta.value == "v" ||
    numTarjeta.value == "vi" ||
    numTarjeta.value == "vis" ||
    numTarjeta.value == "d" ||
    numTarjeta.value == "di" ||
    numTarjeta.value == "din" ||
    numTarjeta.value == "dine" ||
    numTarjeta.value == "diner"
  ) {
    return TARJETA_NO_RECONOCIDA;
  } else if (numTarjeta.value == "visa") {
    return TARJETA_VISA;
  } else if (numTarjeta.value == "diners") {
    return TARJETA_DINERS;
  } else {
    return TARJETA_INVALIDA;
  }
}
