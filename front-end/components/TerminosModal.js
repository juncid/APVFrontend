import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function TerminosModal(props) {
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
                        Términos y condiciones del servicio.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Al hacer click en el botón “calcular” acepto enviar los datos solicitados en
                        el formulario, para contacto posterior tanto a través de medio digitales,
                        envío de correo electrónico y/o contacto telefónico con el objetivo de
                        informar o asistirme en el proceso de suscripción de servicios por parte de
                        AFP Modelo.
                    </p>
                    <p>
                        Esta información no será utilizada con un fin diferente al indicado ni
                        compartida con otras empresas con otros fines diferentes al expresamente
                        autorizado.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
