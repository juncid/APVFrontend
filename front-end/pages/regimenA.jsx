import Link from 'next/link';
import Head from "next/head";
import hombreRegimenA from "../public/assets/svg/regimena.svg";
import React from "react";
import arrow from "../public/assets/svg/arrow.svg";
import backgroundMobile from "../public/assets/svg/mobiles/regimenAmobileBackground.svg";

export default function RegimenA() {

    return (
        <>
        <Head>
                <title>Ahorro Previsional Voluntario | Regimen A | AFP Modelo</title>
                <meta name="description" content="Aumenta tu sueldo líquido, pagando una menor comisión de AFP. Simula tu aumento de sueldo al cambiarte a AFP Modelo." />
                <meta name="robots" content="noindex, follow" />
        </Head>
        <section>
            <div className="resultado regimenPage">
                <div className="row">
                    <div className="col-md-10 mx-auto d-flex flex-column title">
                        <h1>Régimen A</h1>
                        <h3>Bonificación fiscal de un 15% de lo ahorrado.</h3>
                    </div>
                    <img src={backgroundMobile} alt="background" className='background mobile' />
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 offset-md-1 d-flex flex-column contenedor">
                        <div className='containerParrafo'>
                            <div className='parrafo'>
                                <h2>Estas son las características del régimen:</h2>
                                <br />
                                <p>En este régimen el Estado te bonifica con un 15% de lo que ahorras en tu APV con un tope de 6 UTM (aproximadamente 306.000) de lo que ahorras cada año. Por lo tanto si aportas 2 millones en APV durante el año puedes obtener el máximo de esta bonificación.</p>
                                <p>El Régimen A se recomienda habitualmente a quienes reciben un sueldo menor a los 3,5 millones mensuales.  No existe un mínimo para aportar, por lo tanto puedes empezar ahora  para mejorar tu pensión, mientras antes empieces más tiempo tendrá tu inversión para rentar.</p>
                                <p>Si bien los fondos tienen como fin aportar a tu jubilación, puedes hacer retiro de ellos, pero se descontará un 15% cada retiro que hagas para devolver el aporte que el fisco realizó en tu cuenta. </p>
                                <p>En caso que quieras hacer un ahorro que puedas retirar te recomendamos que abras una Cuenta 2, que te permite invertir en los mismos multifondos de tu AFP con una baja comisión de administración.</p>
                            </div>
                            <div className='parrafo'>
                                <h2>Esto quiere decir: </h2>
                                <br />
                                <p>
                                    <span>El estado bonifica hasta 306.000 al año (6 UTM).</span><br />
                                    <span>No hay un mínimo de aporte.</span><br />
                                    <span>Tiene como objetivo aumentar tu pensión.</span><br />
                                </p>
                            </div>
                        </div>
                        <Link href="/regimenB" passHref>
                            <button type="button" className="btn btn-lg btn-block purple">Ver régimen B</button>
                        </Link>
                        <br />
                        <Link href="/" passHref>
                            <a className='volver'>{' '}<img src={arrow} alt="arrow" />Ir a la página de inicio</a>
                        </Link>

                    </div>
                    <div className="col-md-2 d-flex desktop">
                        <img
                            src={hombreRegimenA}
                            alt="regimen A"
                        />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}