/* Expresiones regulares */
const regExEnteroPositivo = new RegExp("^(\\d+)$");
const regExVisa = "^4\\d{3}(| |-)(?:\\d{4}\\1){2}\\d{4}$";
const regExDiners = "^3(?:0[0-5]|[68][0-9])[0-9]{11}$";
const regExMaster = "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$";
const rexExAmerican = "^3[47][0-9]{13}$";
const rexExDiscover = "^6(?:011|5\\d\\d)(| |-)(?:\\d{4}\\1){2}\\d{4}$";

const expresionRegular = new RegExp(
  `((?<VISA>${regExVisa})|(?<DINERS>${regExDiners})|(?<MASTER>${regExMaster})|(?<AMERICAN>${rexExAmerican})|(?<AMAZON_PAY>${rexExDiscover}))`,
  "g"
);

/* Constantes */
const TARJETA_NO_RECONOCIDA = 0;
const TARJETA_VISA = 1;
const TARJETA_DINERS = 2;
const TARJETA_MASTER = 3;
const TARJETA_AMERICAN = 4;
const TARJETA_DISCOVER = 5;

/* Elementos del documento */
const inputNumTarjeta = document.getElementById("numTarjeta");
const feedback = document.getElementById("feedback");
const btnRetablecer = document.getElementById("btnRetablecer");
const iconoTarjetaDesconocida = document.getElementById(
  "iconoTarjetaDesconocida"
);
const iconoVisa = document.getElementById("iconoVisa");
const iconoDiners = document.getElementById("iconoDiners");
const iconoMaster = document.getElementById("iconoMaster");
const iconoAmerican = document.getElementById("iconoAmerican");
const iconoDiscover = document.getElementById("iconoDiscover");

/* Eventos */
inputNumTarjeta.addEventListener("keyup", validarTarjeta);
btnRetablecer.addEventListener("click", restablecerFormulario);

function validarTarjeta() {
  let numTarjeta = inputNumTarjeta.value;
  restablecerIconosTarjetas();
  if (esEnteroPositivo(numTarjeta) && numTarjeta.length <= 20) {
    limpiarError();
    let tarjetaIdentificada = identificarTarjeta(numTarjeta);
    if (tarjetaIdentificada) {
      aceptarTarjeta(tarjetaIdentificada);
    }
  } else {    
    mostrarError();
  }
}

function aceptarTarjeta(tarjetaDetectada) {
  limpiarError();
  numTarjeta.classList.add("is-valid");
  ocultarIconosTarjetas();
  mostrarIconoTarjetaDetectada(tarjetaDetectada);
}

function mostrarError() {
  limpiarError();
  numTarjeta.classList.add("is-invalid");
  feedback.innerHTML = "S&oacutelo puede ingresar s&oacutelo n&uacutemeros";
}

function restablecerFormulario() {
  limpiarError();
  restablecerIconosTarjetas();
  numTarjeta.focus();
  numTarjeta.value = "";
}

function limpiarError() {
  numTarjeta.classList.remove("is-invalid");
  numTarjeta.classList.remove("is-valid");
}

function restablecerFormulario() {
  limpiarError();
  restablecerIconosTarjetas();
  numTarjeta.focus();
  numTarjeta.value = "";
}

function mostrarIconoTarjetaDetectada(tarjetaDetectada) {
  switch (tarjetaDetectada) {
    case TARJETA_VISA:
      iconoVisa.classList.remove("d-none");
      break;
    case TARJETA_DINERS:
      iconoDiners.classList.remove("d-none");
      break;
    case TARJETA_MASTER:
      iconoMaster.classList.remove("d-none");
      break;
    case TARJETA_AMERICAN:
      iconoAmerican.classList.remove("d-none");
      break;
    case TARJETA_DISCOVER:
      iconoDiscover.classList.remove("d-none");
      break;

    default:
      restablecerIconosTarjetas();
      break;
  }
}

function restablecerIconosTarjetas() {
  ocultarIconosTarjetas();
  iconoTarjetaDesconocida.classList.remove("d-none");
}

function ocultarIconosTarjetas() {
  iconoTarjetaDesconocida.classList.add("d-none");
  iconoVisa.classList.add("d-none");
  iconoDiners.classList.add("d-none");
  iconoMaster.classList.add("d-none");
  iconoAmerican.classList.add("d-none");
  iconoDiscover.classList.add("d-none");
}


function esEnteroPositivo(numTarjeta) {
  if (numTarjeta) {
    return regExEnteroPositivo.test(numTarjeta);
  }
}

function identificarTarjeta(numTarjeta) {
  const match = expresionRegular.exec(numTarjeta);
  let tarjetaIdentificada;
  if (match) {
    for (let grupo in match.groups) {
      if (match.groups[grupo]) {
        tarjetaIdentificada = pasarNombreGrupoAConstante(grupo);
      }
    }
  }
  return tarjetaIdentificada;
}

function pasarNombreGrupoAConstante(grupo) {
  switch (grupo) {
    case "VISA":
      return TARJETA_VISA;
    case "DINERS":
      return TARJETA_DINERS;
    case "MASTER":
      return TARJETA_MASTER;
    case "AMERICAN":
      return TARJETA_AMERICAN;
    case "AMAZON_PAY":
      return TARJETA_DISCOVER;
    default:
      return TARJETA_DESCONOCIDA;
  }
}
