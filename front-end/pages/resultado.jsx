import React, {useEffect, useState} from 'react';
import Head from "next/head";
import mujerSAC from "../public/assets/svg/mujersac.svg"
import ChanchitoA from "../public/assets/svg/chanchitoa.svg";
import ChanchitoB from "../public/assets/svg/chanchitob.svg"
import { Formik, useFormik, Form } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { fetchposts } from "../store/actions/postAction";
import { Card, Col, Table } from "react-bootstrap";
import axios from "axios";
import ResultadoModal from '../components/ResultadoModal';

export default function Resultado(props) {

    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [regimenData, setRegimenData] = useState({});

    const initialValues = {
        ahorro: ''
    }

    const handleSubmit = values => {

        const nombre = regimenData.nombre !== undefined && regimenData.nombre;
        const rutPrimero = regimenData.rut !== undefined && regimenData.rut;
        const rutDv = regimenData.rutDv !== undefined && regimenData.rutDv;
        const rut = rutPrimero + "-" + rutDv;
        const correo = regimenData.correo !== undefined && regimenData.correo;
        const celular = regimenData.celular !== undefined && regimenData.celular;
        const sueldo = regimenData.sueldoLiquidoConsulta !== undefined && regimenData.sueldoLiquidoConsulta;


        const headers = {
            "Content-Type": "application/json"
        };
        
        const body = {
            nombre: nombre,
            rut: rut,
            correo: correo,
            celular: celular,
            sueldo: sueldo,
            ahorro: values.ahorro
        };

        axios
            .post(props.urlIngresarSimulacion, body, { headers: headers })
            .then((response) => {
                let data = response.data;

                if (data.idSimulacion) {
                    setRegimenData(data);
                }
            })
            .catch(e => {
                console.log(e);
            });
    };


    const validationSchema = Yup.object({
        ahorro: Yup
            .string()
            .matches(/^[0-9]+$/, `Ingrese el monto en pesos que desea ahorrar desde $1.000.`)
            .test('Sueldo-validacion', `Ingrese un monto desde $1.000.`, function (value) {
                return (value >= 1000 )
            })
            .required('Por favor ingrese el monto que desea ahorrar desde $1.000.'),
    });


    const formik = useFormik({
        initialValues,
        handleSubmit,
        validationSchema
    });

    useEffect(() => {
        setRegimenData(props.data);
    }, []);

    useEffect(() => {
    }, [regimenData]);


    const sueldoLiquido = regimenData.sueldoLiquidoConsulta !== undefined && regimenData.sueldoLiquidoConsulta;
    const ahorroMensual = regimenData.aporteApv !== undefined && regimenData.aporteApv;
    let recomendacionApv = regimenData.recomendacionApv !== undefined && regimenData.recomendacionApv;
    let beneficio = 0;
    let total = 0;
    let texto_regimen = '';

    if (recomendacionApv === 'A') {

        beneficio = regimenData.beneficioRegA;
        total = ahorroMensual + beneficio;
        texto_regimen = 'En  base a tu renta mensual y el monto del aporte quieres realizar el 15% de bonificación por parte del Estado es el que más te conviene.'
    } else if (recomendacionApv === 'B') {
        beneficio = regimenData.beneficioRegB;
        total = regimenData.sueldoLiquidoConApvregB;
        texto_regimen = 'En  base a tu renta mensual y el monto del aporte quieres realizar el descuento de tu base tributaria es mayor al aporte del 15% de bonificación del régimen A.'
    }

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
        <>
        <Head>
                <title>Ahorro Previsional Voluntario | Resultado Simulación | AFP Modelo</title>
                <meta name="description" content="Aumenta tu sueldo líquido, pagando una menor comisión de AFP. Simula tu aumento de sueldo al cambiarte a AFP Modelo." />
                <meta name="robots" content="noindex, follow" />
        </Head>
        <section>
            <div className="resultado">
                <div className="row">
                    <div className="col-12 mx-auto text-center header">
                        <img
                            src={recomendacionApv === 'A' ? ChanchitoA : ChanchitoB}
                            alt={recomendacionApv === 'A' ? "regimen A" : "regimen B"} />
                        <h1>Te recomendamos el régimen {recomendacionApv}</h1>
                        <div className='d-flex justify-content-center'>
                            <p>{texto_regimen}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-1 d-flex">
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <p>Estos son los datos de tu simulación:</p>
                                    <Table responsive
                                        className="table-borderless"
                                    >
                                        <thead>
                                            <tr>
                                                <th>{''}</th>
                                                <th className="text-right">Regimen {recomendacionApv}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Sueldo líquido:</td>
                                                <td className="text-right">${sueldoLiquido.toLocaleString("es-CL")}</td>
                                            </tr>
                                            <tr>
                                                <td>Ahorro mensual:</td>
                                                <td className="text-right">${ahorroMensual.toLocaleString("es-CL")}</td>
                                            </tr>
                                            <tr>
                                                <td className="green-tabla">{recomendacionApv === 'A' ? 'Bonificación fiscal:' : 'Descuento tributario:'}</td>
                                                <td className="text-right green-tabla">${beneficio.toLocaleString("es-CL")}</td>
                                            </tr>
                                            <tr>
                                                <td>{recomendacionApv === 'A' ? 'Total ahorro:' : 'Nuevo sueldo líquido:'}</td>
                                                <td className="text-right">${total.toLocaleString("es-CL")}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Text>
                                <div className='col-12 text-center'>
                                    <Card.Link className='volver' onClick={handleShow}>Ver detalles de mi simulación</Card.Link>
                                </div>
                                <ResultadoModal
                                    show={modalShow}
                                    onHide={handleClose}
                                    data={regimenData !== undefined && regimenData}
                                />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 d-flex flex-column calcularApv">
                        <div className="row">
                            <Card>
                                <Card.Header><p>Calcular tu APV con otro monto:</p></Card.Header>
                                <Card.Body>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={handleSubmit}
                                        validationSchema={validationSchema}
                                    >
                                        {(formik) => (
                                            <Form className='form-inline'>
                                                <div className="form-group input-wrapper d-block">
                                                    <input
                                                        type="text"
                                                        className={`form-control form-control-lg ${formik.touched.ahorro ? (formik.errors.ahorro ? "is-invalid" : "is-valid") : ""}`}
                                                        id="ahorro"
                                                        name="ahorro"
                                                        aria-describedby="ahorroAyuda"
                                                        placeholder="Ahorro Mensual"
                                                        {...formik.getFieldProps('ahorro')}
                                                    />
                                                    <label
                                                        htmlFor="ahorro"
                                                        className="control-label"
                                                    >
                                                        Sueldo Liquido
                                            </label>
                                                    <small
                                                        id="ahorroAyuda"
                                                        className={`form-text ${formik.touched.ahorro && formik.errors.ahorro && 'is-invalid'}`}
                                                    >
                                                        {formik.touched.ahorro && formik.errors.ahorro}
                                                    </small>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <div className="col justify-content-center d-flex">
                                                        <button
                                                            type="submit"
                                                            id="calcular"
                                                            className="volver"
                                                            disabled={!(formik.isValid && formik.dirty)}
                                                        >
                                                            Calcular
                                            </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="row detalle">
                            <small>*Renta tributable contempla descuentos legales, ahorro al fondo de pensiones (10%), comisión AFP Modelo (0,77%) y salud (7%).**Bonificación fiscal de un 15% de tu ahorro voluntario mensual con un tope de 6 UTM anuales.</small>
                        </div>
                    </div>
                </div>
                <div className='row ctas'>
                    <div className="col-md-4 text-center d-block offset-md-2 container">
                        <p>¿Eres afiliado? Haz login para comenzar tu proceso de apertura</p>
                        <div className='d-flex justify-content-center'>
                            <button type="button" className="btn btn-lg btn-block">Abrir mi APV</button>
                        </div>
                    </div>
                    <div className="col-md-5 text-center d-block container">
                        <p>¿No eres afiliado? Nuestros ejecutivos te contactaran para asesorarte en la apertura.</p>
                        <div className='d-flex justify-content-center'>
                            <button type="button" className="btn btn-lg btn-block blueBtn">Solicitar contacto</button>
                        </div>
                    </div>
                </div>
                <div className="row container-padre dudas">
                    <div className="col-md-2 d-flex desktop">
                        <img src={mujerSAC} alt="Dudas" />
                    </div>
                    <div className="col-sm-12 col-md-6 offset-md-2 d-flex flex-column contenedor">
                        <div className="txtDesktop parrafo2">
                            <div className="container-title">
                                <h2>¿Aún tienes dudas?</h2>
                                <p>{dudas_texto}</p>
                                <button type="button" className="btn btn-lg btn-block whiteBtn" onClick={contactarme} id="ejecutivo">Quiero que me contacten</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export async function getServerSideProps(context) {
    const uriBackend=process.env.URI_BACKEND;
    const urlIngresarSimulacion = `${uriBackend}${process.env.URI_INGRESAR_SIMULACION}`;
    const { id } = context.query;
    const response = await axios
        .get(`${uriBackend}${process.env.URI_OBTENER_SIMULACION}?id=${id}`);
    const data = await response.data
    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return { props: {data, urlIngresarSimulacion} }
}