import React from "react";
import {Accordion, Card} from "react-bootstrap";

const Preguntas = () => {
    return(
        <section>
            <div className="col-12 col-lg-10 block mx-auto justify-content-center">
                <h4>Preguntas frecuentes</h4>
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            ¿Que es un APV?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p>
                                    Ahorro Previsional Voluntario o APV es un instrumento adicional complementario al ahorro que realizas en tu cuenta obligatoria de la AFP. Su objetivo es aumentar el monto de la pensión, compensar períodos no cotizados.
                                </p>
                                <p>
                                    Tienen incentivos al ahorro en los cuales puedes recibir una bonificación por parte del Estado, como también rebajar de impuestos dependiendo del régimen tributario que escojas.
                                </p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            ¿Cuáles son los regímenes tributarios?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <p>
                                    Puedes hacer tus aportes en APV en al menos uno de los regímenes tributarios. En el régimen “A” el Estado bonifica un 15% de lo que ahorras anualmente con un tope de 6 UTM (aproximadamente $306.000) y en el caso del régimen “B”, lo que aportas descuenta de tu renta tributaria, lo que hace disminuir tu carga de impuestos.
                                </p>
                                <p>
                                    Tienen incentivos al ahorro en los cuales puedes recibir una bonificación por parte del Estado, como también rebajar de impuestos dependiendo del régimen tributario que escojas.
                                </p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            ¿Puedo retirar o hacer giros del APV?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <p>
                                    Sí, pero ten en cuenta que estos ahorros están pensados en el largo plazo y con el objetivo de aumentar tu pensión al momento de jubilar. Al hacer retiros de estos ahorros perderás el aporte estatal del 15% del régimen A o pagarás impuestos de segunda categoría en la operación renta del año siguiente.
                                </p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3">
                            ¿Que es un APV 2?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </section>

    );
}

export default Preguntas;