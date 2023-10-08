const regExEnteroPositivo = "d";
const regExVisa = "visa";
const regExDiners = "diners";
const regExMaster = "master";
const rexExAmerican = "american";

const expresionRegular = new RegExp(
  `((?<TARJETA_VISA>${regExVisa})|(?<TARJETA_DINERS>${regExDiners}))|(?<TARJETA_MASTER>,master)`,
  "g"
);

function esEnteroPositivo(numTarjeta) {
  return true;
}

function tarjetaIdentificada(numTarjeta) {
  const match = expresionRegular.exec(numTarjeta);

  for (let grupo in match.groups) {
    if (match.groups[grupo]) {
      console.log(`${grupo}: ${match.groups[grupo]}`);
    }
  }
}
