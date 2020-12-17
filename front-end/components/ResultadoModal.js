import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default function ResultadosModal(props) {

    const sueldoLiquido = props.data.sueldoLiquidoConsulta !== undefined && props.data.sueldoLiquidoConsulta.toLocaleString("es-CL");
    const ahorroMensual = props.data.aporteApv !== undefined && props.data.aporteApv.toLocaleString("es-CL");
    const aporteAfp = props.data.aporteAfp !== undefined && props.data.aporteAfp;
    const aporteIsapre = props.data.aporteIsapre !== undefined && props.data.aporteIsapre;
    const seguroCesantia = props.data.seguroCesantia !== undefined && props.data.seguroCesantia;
    const comisionAfp = props.data.comisionAfp !== undefined && props.data.comisionAfp;
    const descuentosLegales= Math.trunc(aporteAfp + aporteIsapre + seguroCesantia + comisionAfp).toLocaleString("es-CL");
    const rentaTributable = props.data.sueldoTributario !== undefined && Math.trunc(props.data.sueldoTributario).toLocaleString("es-CL");
    const tasaImpuestoSegCat = props.data.tasaImpuestoSegCat !== undefined && (props.data.tasaImpuestoSegCat * 1).toFixed(2);
    const montoImpuestoSegCat = props.data.montoImpuestoSegCat !== undefined && Math.trunc(props.data.montoImpuestoSegCat).toLocaleString("es-CL");
    const impSegCatApvregA = props.data.impSegCatApvregA !== undefined && Math.trunc(props.data.impSegCatApvregA).toLocaleString("es-CL");
    const impSegCatApvregB = props.data.impSegCatApvregB !== undefined && Math.trunc(props.data.impSegCatApvregB).toLocaleString("es-CL");
    const beneficioRegA = props.data.beneficioRegA !== undefined && props.data.beneficioRegA.toLocaleString("es-CL");
    const beneficioRegB = props.data.beneficioRegB !== undefined && props.data.beneficioRegB.toLocaleString("es-CL");
    const sueldoLiquidoConApvregA = props.data.sueldoLiquidoConApvregA !== undefined && props.data.sueldoLiquidoConApvregA.toLocaleString("es-CL");
    const sueldoLiquidoConApvregB = props.data.sueldoLiquidoConApvregB !== undefined && props.data.sueldoLiquidoConApvregB.toLocaleString("es-CL");

    return (
        <div>
            <Modal
                {...props}
                dialogClassName="modal-50w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Estos son los datos de tu simulación:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Table hover responsive
                                       className="table-borderless"
                                >
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th className="text-right">APV Régimen A</th>
                                        <th className="text-right">APV Régimen B</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Sueldo líquido:</td>
                                        <td className="text-right">${sueldoLiquido}</td>
                                        <td className="text-right">${sueldoLiquido}</td>
                                    </tr>
                                    <tr>
                                        <td>Ahorro mensual:</td>
                                        <td className="text-right">${ahorroMensual}</td>
                                        <td className="text-right">${ahorroMensual}</td>
                                    </tr>
                                    <tr>
                                        <td>Descuentos legales:</td>
                                        <td className="text-right">${descuentosLegales}</td>
                                        <td className="text-right">${descuentosLegales}</td>
                                    </tr>
                                    <tr>
                                        <td>Renta Tributable:</td>
                                        <td className="text-right">${rentaTributable}</td>
                                        <td className="text-right">${rentaTributable}</td>
                                    </tr>
                                    <tr>
                                        <td>Tasa de impuestos:</td>
                                        <td className="text-right">{tasaImpuestoSegCat}%</td>
                                        <td className="text-right">{tasaImpuestoSegCat}%</td>
                                    </tr>
                                    <tr>
                                        <td>Impuestos sin APV:</td>
                                        <td className="text-right">$0</td>
                                        <td className="text-right">${montoImpuestoSegCat}</td>
                                    </tr>
                                    <tr>
                                        <td>Impuestos con APV:</td>
                                        <td className="text-right">${impSegCatApvregA}</td>
                                        <td className="text-right">${impSegCatApvregB}</td>
                                    </tr>
                                    <tr>
                                        <td className="green-tabla">Bonificación fiscal:</td>
                                        <td className="text-right green-tabla">${beneficioRegA}</td>
                                        <td className="text-right green-tabla">$0</td>
                                    </tr>
                                    <tr>
                                        <td className="green-tabla">Descuento tributario:</td>
                                        <td className="text-right green-tabla">$0</td>
                                        <td className="text-right green-tabla">${beneficioRegB}</td>
                                    </tr>
                                    <tr>
                                        <td>Nuevo sueldo líquido:</td>
                                        <td className="text-right">${sueldoLiquidoConApvregA}</td>
                                        <td className="text-right">${sueldoLiquidoConApvregB}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                                <p className="disclaimer-modal">Calculos contemplados en modalidad de ahorro mensual a través de mandato de descuento vía empleador con un tope máximo de 50UF de ahorro mensual.*Descuentos legales corresponden a: Ahorro al fondo de pensiones (10%), cotización de salud (7%) y comisión AFP Modelo (0,77%).**Renta tributable corresponde a tu renta después de pagar los descuentos legales.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
