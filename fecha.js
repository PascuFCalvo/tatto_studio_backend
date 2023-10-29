const dayjs = require ("dayjs");
let fecha = "2023-12-12";

let fechaformateada = dayjs(fecha)

console.log (fechaformateada)

let fecha2 = dayjs().format("12-12-2023")

console.log (fecha2)

const isbefore  = dayjs("2023-13-12").isBefore(dayjs(fecha))

console.log(isbefore)


const fecha3 = "2023-12-12"

if (fecha3 === fecha){
   console.log("truessssss")
}