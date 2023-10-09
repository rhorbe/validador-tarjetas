/* Expresiones regulares */
const regExEnteroPositivo = new RegExp("^(\\d+)$");
const regExVisa = "^4[0-9]{12}(?:[0-9]{3})?$";
const regExDiners = "^3(?:0[0-5]|[68][0-9])[0-9]{11}$";
const regExMaster = "^5[1-5][0-9]{14}$";
const rexExAmerican = "^3[47][0-9]{13}$";
const rexExDiscover = "^6(?:011|5[0-9]{2})[0-9]{12}$";

const expresionRegular = new RegExp(
  `((?<VISA>${regExVisa})|(?<DINERS>${regExDiners})|(?<MASTER>${regExMaster})|(?<AMERICAN>${rexExAmerican})|(?<DISCOVERY>${rexExDiscover}))`,
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
inputNumTarjeta.addEventListener("input", validarTarjeta);
btnRetablecer.addEventListener("click", restablecerFormulario);

function validarTarjeta() {
  let numTarjeta = inputNumTarjeta.value;

  restablecerIconosTarjetas();

  if (!esEnteroPositivo(numTarjeta)) {
    mostrarError("Puede ingresar solamente d&iacutegitos");
  } else if (numTarjeta.length > 20) {
    mostrarError("Ha ingresado demasiados d&iacutegitos");
  } else {
    limpiarError();
    let tarjetaIdentificada = identificarTarjeta(numTarjeta);

    if (tarjetaIdentificada) {
      aceptarTarjeta(tarjetaIdentificada);
    }
  }
}

function aceptarTarjeta(tarjetaDetectada) {
  numTarjeta.classList.add("is-valid");
  ocultarIconosTarjetas();
  mostrarIconoTarjetaDetectada(tarjetaDetectada);
  mostrarFeedback("Tarjeta aceptada", true);
}

function mostrarError(mensaje) {
  limpiarError();
  numTarjeta.classList.add("is-invalid");
  mostrarFeedback(mensaje, false);
}

function mostrarFeedback(mensaje, esValido) {
  feedback.innerHTML = mensaje;
  feedback.classList.remove("d-none");
  feedback.classList.add("d-block");
  esValido ? feedBackValido() : feedbackInvalido();
}

function feedBackValido() {
  feedback.classList.add("valid-feedback");
  feedback.classList.remove("invalid-feedback");
}

function feedbackInvalido() {
  feedback.classList.remove("valid-feedback");
  feedback.classList.add("invalid-feedback");
}

function limpiarFeedBack() {
  feedback.innerHTML = "";
  feedback.classList.remove("d-block");
  feedback.classList.add("d-none");
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
  limpiarFeedBack();
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
  let match = expresionRegular.exec(numTarjeta);
  let tarjetaIdentificada = "";
  if (match) {
    for (let grupo in match.groups) {
      if (match.groups[grupo]) {
        tarjetaIdentificada = pasarNombreGrupoAConstante(grupo);
      }
    }
  }
  match = expresionRegular.exec(""); //Solución para un bug por el cual el RegEx.exec no funciona 2 veces seguidas
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
    case "DISCOVERY":
      return TARJETA_DISCOVER;
    default:
      return TARJETA_DESCONOCIDA;
  }
}
