import React, {useEffect} from 'react';
import mujerSAC from "../public/assets/svg/mujersac.svg"
import ChanchitoA from "../public/assets/svg/chanchitoa.svg";
import ChanchitoB from "../public/assets/svg/chanchitob.svg"
import {useDispatch, useSelector} from "react-redux";
import {fetchposts} from "../store/actions/postAction";
import {Card, Col, Table} from "react-bootstrap";
import axios from "axios";

export default function Resultado (props){

    const sueldoLiquido=props.data.sueldoLiquidoConsulta;
    const ahorroMensual=props.data.aporteApv
    let recomendacionApv = props.data.recomendacionApv;
    recomendacionApv = 'B'
    let beneficio = 0;
    let total = 0;

    if( recomendacionApv === 'A') {

        beneficio = props.data.beneficioRegA;
        total = ahorroMensual + beneficio;
    } else if(recomendacionApv === 'B') {
        beneficio = props.data.beneficioRegB;
        total = props.data.sueldoLiquidoConApvregB;
    }

    const headers = {
        "Content-Type": "application/json"
    };

    function contactarme() {
        body_eventos.Evento_id = 2;
        axios
            .post('Eventos', body_eventos, { headers: headers })
            .then((response) => {
                let data = response.data;

                if (data.resultado) {
                    window.location.href = "/solicitud";
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const dudas_texto =
        "Nuestros ejecutivos pueden asesorarte en línea o vía teléfonica. Queremos ayudarte a resolver todas tus inquietudes o darte todas las opciones para tu traspaso.";

    return (
        <section>
        <div className="resultado">
            <div className="row">
                <div className="col-md-8 mx-auto desktop flex-column">
                    <img
                        src={recomendacionApv === 'A' ? ChanchitoA : ChanchitoB }
                        alt={recomendacionApv === 'A' ? "regimen A"  : "regimen B" }/>
                    <h1>Te recomendamos el régimen {recomendacionApv}</h1>
                    <p>En  base a tu renta mensual y el monto del aporte quieres realizar el 15% de bonificación por parte del Estado es el que más te conviene.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mx-auto desktop d-flex">
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                <p>Estos son los datos de tu simulación:</p>
                                <Table hover responsive
                                       className="table-borderless"
                                >
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Regimen {recomendacionApv}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Sueldo líquido:</td>
                                        <td>${sueldoLiquido.toLocaleString("es-CL")}</td>
                                    </tr>
                                    <tr>
                                        <td>Ahorro mensual:</td>
                                        <td>${ahorroMensual.toLocaleString("es-CL")}</td>
                                    </tr>
                                    <tr>
                                        <td>{recomendacionApv === 'A' ? 'Bonificación fiscal:' : 'Descuento tributario:'}</td>
                                        <td>${beneficio.toLocaleString("es-CL")}</td>
                                    </tr>
                                    <tr>
                                        <td>{recomendacionApv === 'A' ? 'Total ahorro:' : 'Nuevo sueldo líquido:'}</td>
                                        <td>${total.toLocaleString("es-CL")}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Text>
                            <Card.Link href="#">Ver detalles de mi simulación</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-2 mx-auto desktop d-flex">

                    <Card>
                        <Card.Header>Régimen A</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <p>En este el Estado te entrega una bonificación de un 15% de lo que ahorras en el año con un tope de 6 UTM anuales. Por ejemplo, si ahorras $100.000 recibirás $15.000 adicionales, por lo que tu cuenta tendra $115.000.</p>
                            </Card.Text>
                            <Card.Link href="#">Saber Más</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row w-100 container-padre dudas">
                <img src={mujerSAC} alt="Dudas" />
                <div className="txtDesktop parrafo2">
                    <div className="container-title">
                        <h5>¿Aún tienes dudas?</h5>
                        <p>{dudas_texto}</p>
                        <button
                            type="button"
                            className="btn blue btn-lg btn-block"
                            onClick={contactarme}
                            id="ejecutivo"
                        >
                            Quiero que me contacten
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
}

export async function getServerSideProps(context) {
    const baseUrl='https://apvbackendmanager.azurewebsites.net/'
    const apiToken = 'ApvSimulacion/obtenerporid';
    const response = await axios
        .get(`${baseUrl}${apiToken}?id=7`);
    const data = await response.data
    console.log(data);
    if (!data) {
        return {
            redirect: {
                destination: '/resultado',
                permanent: false,
            },
        }
    }

    return { props: {data} }
}