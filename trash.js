// const regExVisa = new RegExp(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/);
const regExMastercard = new RegExp(
  /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/
);

function validarTarjeta() {
  if (esEnteroPositivo(numTarjeta)) {
    tarjetaIdentificada = identificarTarjeta(numTarjeta);
  }

  if (tarjetaDetectada == TARJETA_NO_RECONOCIDA) {
    limpiarErrores();
    mostrarIconoTarjetaDetectada(tarjetaDetectada);
  } else if (tarjetaDetectada == TARJETA_INVALIDA) mostrarError();
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
