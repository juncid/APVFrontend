import { Button } from "react-bootstrap";
import Link from 'next/link';
import Head from "next/head";
import mujerRegimenB from "../public/assets/svg/regimenb.svg";
import arrow from "../public/assets/svg/arrow.svg"
import React from "react";
import backgroundMobile from "../public/assets/svg/mobiles/regimenBmobileBackground.svg";


export default function RegimenB() {

    return (
        <>
        <Head>
                <title>Ahorro Previsional Voluntario | Regimen B | AFP Modelo</title>
                <meta name="description" content="Aumenta tu sueldo líquido, pagando una menor comisión de AFP. Simula tu aumento de sueldo al cambiarte a AFP Modelo." />
                <meta name="robots" content="noindex, follow" />
        </Head>
        <section>
            <div className="resultado regimenPage">
                <div className="row">
                    <div className="col-md-10 mx-auto d-flex flex-column title">
                        <h1>Régimen B</h1>
                        <h3>Descuento de tu base tributaria.</h3>
                    </div>
                    <img src={backgroundMobile} alt="background" className='background mobile' />
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-1 d-flex flex-column contenedor">
                        <div className='containerParrafo'>
                            <div className='parrafo'>
                                <h2>Estas son las características del régimen:</h2>
                                <br />
                                <p>En este régimen el monto que aportas en tu APV es descontado de la base tributaria, por lo que tienes un incentivo para el ahorro, al pagar menos impuestos.</p>
                                <p>El Régimen B se recomienda habitualmente a quienes reciben un sueldo mayor a los 3,5 millones mensuales.  No existe un mínimo para aportar, pero sí un máximo de 600 UF anuales en todo el sistema.</p>
                                <p>Dependiendo de cómo hagas tus depósitos el beneficio tributario lo puedes ver en tu liquidación de sueldo mes a mes o en la operación renta en abril de cada año.
Si bien los fondos tienen como fin aportar a tu jubilación, puedes hacer retiro de ellos, pero se descontará un 15% cada retiro que hagas a modo de retención como pago provisional de impuestos para la operación renta del año siguiente.</p>
                                <p>En caso que quieras hacer un ahorro que puedas retirar, te recomendamos que abras una Cuenta 2, que te permite invertir en los mismos multifondos de tu AFP con una baja comisión de administración.</p>
                            </div>
                            <div className='parrafo'>
                                <h2>Esto quiere decir: </h2>
                                <br />
                                <p>
                                    <span>El ahorro descuenta de tu renta tributable</span><br />
                                    <span>No hay un mínimo de aporte y tiene un máximo de 600 UF anuales.</span><br />
                                    <span>Tiene como objetivo aumentar tu pensión.</span><br />
                                </p>
                            </div>
                        </div>
                        <Link href="/regimenA" passHref>
                            <button type="button" className="btn btn-lg btn-block purple">Ver régimen A</button>
                        </Link>
                        <br />
                        <Link href="/" passHref>
                            <a className='volver'>{' '}<img src={arrow} alt="arrow" />Ir a la página de inicio</a>
                        </Link>

                    </div>
                    <div className="col-md-2 d-flex desktop">
                        <img
                            src={mujerRegimenB}
                            alt="regimen B"
                        />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}