export const rutValidador = (rut) => {
    if (!rut || rut.trim().length < 3) return false;
    const rutLimpio = rut.replace(/[^0-9kK-]/g, "");

    if (rutLimpio.length < 3) return false;

    const split = rutLimpio.split("-");
    if (split.length !== 2) return false;

    const num = parseInt(split[0], 10);
    const dgv = split[1];

    const dvCalc = calculateDV(num);
    return dvCalc === dgv;
};

export const calculateDV = (rut) => {
    const cuerpo = `${rut}`;
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;

    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {
        // Obtener su Producto con el Múltiplo Correspondiente
        const index = multiplo * cuerpo.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma += index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) {
            multiplo += 1;
        } else {
            multiplo = 2;
        }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    const dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 10) return "k";
    if (dvEsperado === 11) return "0";
    return `${dvEsperado}`;
};

export const formatearRut = (rut) => {
    let formateado = rut;
    formateado = formateado.replace(/\./g, "").replace("-", "");

    if (formateado.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
        formateado = formateado.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, "$1.$2.$3-$4");
    } else if (formateado.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
        formateado = formateado.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, "$1.$2.$3-$4");
    } else if (formateado.match(/^(\d)(\d{3})(\d{0,2})$/)) {
        formateado = formateado.replace(/^(\d)(\d{3})(\d{0,2})$/, "$1.$2.$3");
    } else if (formateado.match(/^(\d)(\d{0,2})$/)) {
        formateado = formateado.replace(/^(\d)(\d{0,2})$/, "$1.$2");
    }

    return formateado;
};
