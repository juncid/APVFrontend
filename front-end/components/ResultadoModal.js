import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default function ResultadosModal(props) {
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
                                        <td className="text-right">${props.data.sueldoLiquidoConsulta.toLocaleString("es-CL")}</td>
                                        <td className="text-right">${props.data.sueldoLiquidoConsulta.toLocaleString("es-CL")}</td>
                                    </tr>
                                    <tr>
                                        <td>Ahorro mensual:</td>
                                        <td className="text-right">${props.data.aporteApv.toLocaleString("es-CL")}</td>
                                        <td className="text-right">${props.data.aporteApv.toLocaleString("es-CL")}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
