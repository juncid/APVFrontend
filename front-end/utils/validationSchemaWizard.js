import * as Yup from "yup";
import {rutValidador} from "./validationRut";


const aacento = "\u00e1";
const eacento = "\u00e9";
const iacento = "\u00ed";
const oacento = "\u00f3";
const uacento = "\u00fa";

export const Step1Schema = Yup.object({
    sueldo: Yup
        .string()
        .matches(/^[0-9]{6,8}$/, `Ingrese un sueldo l${iacento}quido entre $100.000 y $10.000.000.`)
        .test('Sueldo-validacion', `Ingrese un sueldo l${iacento}quido entre $100.000 y $10.000.000.`, function (value) {
            return (value>= 100000 && value <= 10000000)
        })
        .required('Por favor ingrese su sueldo líquido.'),
    ahorro: Yup
        .string()
        .matches(/^[0-9]+$/, `Ingrese el monto en pesos que desea ahorrar desde $1.000.`)
        .test('Sueldo-validacion', `Ingrese un monto desde $1.000.`, function (value) {
            return (value >= 1000 )
        })
        .required('Por favor ingrese el monto que desea ahorrar desde $1.000.'),
});

export const Step2Schema = Yup.object({
    nombre: Yup
        .string()
        .matches(
            /^[A-Za-z \u00F1\u00D1\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC]{3,60}$/,
            `Ingresa tu nombre sin n${uacento}meros ni caracteres.`)
        .required('Ingresa al menos un nombre y apellido.'),
    rut: Yup
        .string()
        .required(`Por favor ingrese un RUT v${aacento}lido sin puntos y con gui${oacento}n.`)
        .test('Rut-validacion',
            `Por favor ingrese un RUT v${aacento}lido sin puntos y con gui${oacento}n.`,
            function (value) {
                return rutValidador(value);
            }),
});

export const Step3Schema = Yup.object({
    correo: Yup
        .string()
        .email(`Tu correo debe incluir un "@" y un dominio v${aacento}lido.`)
        .required('Por favor ingrese su correo.'),
    celular: Yup
        .string()
        .matches(/^[9]{1}[0-9]{8}$/, `Ingresa un n${uacento}mero de 9 d${iacento}gitos.`)
        .required(`Por favor ingrese su n${uacento}mero de tel${eacento}fono.`),
    terminosycondiciones: Yup
        .boolean()
        .oneOf([true], `Debe aceptar las condiciones del servicio y la pol${iacento}tica de privacidad.`)
})