import React, {useEffect, useState} from 'react';
import mujerSAC from "../public/assets/svg/mujersac.svg"
import ChanchitoA from "../public/assets/svg/chanchitoa.svg";
import ChanchitoB from "../public/assets/svg/chanchitob.svg"
import {Formik, useFormik, Form} from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {fetchposts} from "../store/actions/postAction";
import {Card, Col, Table} from "react-bootstrap";
import axios from "axios";
import ResultadoModal from '../components/ResultadoModal';

export default function Resultado (props){

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
        const rut = rutPrimero+"-"+rutDv;
        const correo = regimenData.correo !== undefined && regimenData.correo;
        const celular = regimenData.celular !== undefined && regimenData.celular;
        const sueldo = regimenData.sueldoLiquidoConsulta !== undefined && regimenData.sueldoLiquidoConsulta;


        const headers = {
            "Content-Type": "application/json"
        };

        const url = 'https://apvbackendmanager.azurewebsites.net/ApvSimulacion/ingresarsimulacion';

        const body = {
            nombre: nombre,
            rut: rut,
            correo: correo,
            celular: celular,
            sueldo: sueldo,
            ahorro: values.ahorro
        };

        axios
            .post(url, body, { headers: headers })
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
                console.log(value)
                return (value >= 1000 )
            })
            .required('Por favor ingrese el monto que desea ahorrar desde $1.000.'),
    });


    const formik = useFormik({
       initialValues,
       handleSubmit,
       validationSchema
    });

    useEffect(()=>{
        setRegimenData(props.data);
    },[]);

    useEffect(()=>{
    },[regimenData]);

    
    const sueldoLiquido=regimenData.sueldoLiquidoConsulta !== undefined && regimenData.sueldoLiquidoConsulta;
    const ahorroMensual=regimenData.aporteApv !== undefined && regimenData.aporteApv;
    let recomendacionApv = regimenData.recomendacionApv !== undefined && regimenData.recomendacionApv;
    let beneficio = 0;
    let total = 0;
    let texto_regimen = '';

    if( recomendacionApv === 'A') {

        beneficio = regimenData.beneficioRegA;
        total = ahorroMensual + beneficio;
        texto_regimen='En  base a tu renta mensual y el monto del aporte quieres realizar el 15% de bonificación por parte del Estado es el que más te conviene.'
    } else if(recomendacionApv === 'B') {
        beneficio = regimenData.beneficioRegB;
        total = regimenData.sueldoLiquidoConApvregB;
        texto_regimen='En  base a tu renta mensual y el monto del aporte quieres realizar el descuento de tu base tributaria es mayor al aporte del 15% de bonificación del régimen A.'
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
        <section>
        <div className="resultado">
            <div className="row">
                <div className="col-md-8 mx-auto desktop flex-column">
                    <img
                        src={recomendacionApv === 'A' ? ChanchitoA : ChanchitoB }
                        alt={recomendacionApv === 'A' ? "regimen A"  : "regimen B" }/>   
                    <h1>Te recomendamos el régimen {recomendacionApv}</h1>
                    <p>{texto_regimen}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-1 desktop d-flex">
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
                            <Card.Link onClick={handleShow}>Ver detalles de mi simulación</Card.Link>
                            <ResultadoModal
                                show={modalShow}
                                onHide={handleClose}
                                data = {regimenData !== undefined && regimenData}
                            />
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-3 desktop d-flex flex-column">
                    <div className="row">
                    <Card>
                        <Card.Header>Calcular tu APV con otro monto:</Card.Header>
                        <Card.Body>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                {(formik) => (
                                    <Form>
                                        <div className="form-group input-wrapper">
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg ${
                                                    formik.touched.ahorro ? (formik.errors.ahorro ? "is-invalid" : "is-valid") : ""}`}
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
                                                className={`form-text ${formik.touched.ahorro && formik.errors.ahorro && 'is-invalid' }`}
                                            >
                                                {formik.touched.ahorro && formik.errors.ahorro}
                                            </small>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="col justify-content-center d-flex">
                                            <button
                                                type="submit"
                                                id="calcular"
                                                className="btn btn-lg btn-block"
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
                    <div className="row">
                    <p><span>*Renta tributable contempla descuentos legales, ahorro al fondo de pensiones (10%), comisión AFP Modelo (0,77%) y salud (7%).**Bonificación fiscal de un 15% de tu ahorro voluntario mensual con un tope de 6 UTM anuales.</span></p>
                    </div>
                    
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
    const { id } = context.query;
    const response = await axios
        .get(`${baseUrl}${apiToken}?id=${id}`);
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