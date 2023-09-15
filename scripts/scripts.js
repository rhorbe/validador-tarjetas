const TARJETA_INVALIDA = 0;
const TARJETA_NO_RECONOCIDA = 1;
const TARJETA_VISA = 2;

const numTarjeta = document.getElementById("numTarjeta");
const feedback = document.getElementById("feedback");
const btnRetablecer = document.getElementById("btnRetablecer");
const iconoTarjetaDesconocida = document.getElementById(
  "iconoTarjetaDesconocida"
);
const iconoTarjetaVisa = document.getElementById("iconoVisa");

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
      iconoTarjetaVisa.classList.remove("d-none");
      break;

    default:
      restablecerIconosTarjetas();
      break;
  }
}


function ocultarIconosTarjetas() {
  iconoTarjetaDesconocida.classList.add("d-none");
  iconoTarjetaVisa.classList.add("d-none");
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
  ocultarIconosTarjetas();
  iconoTarjetaDesconocida.classList.remove("d-none");
}


function detectarTarjeta() {
  if (
    numTarjeta.value == "" ||
    numTarjeta.value == "v" ||
    numTarjeta.value == "vi" ||
    numTarjeta.value == "vis"
  )
    return TARJETA_NO_RECONOCIDA;
  else if (numTarjeta.value == "visa") return TARJETA_VISA;
  else return TARJETA_INVALIDA;
}
