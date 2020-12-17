import React, {useState} from "react";
import {Form, Formik} from "formik";
import joven2 from "../public/assets/svg/joven2.svg"
import Stepper from 'react-stepper-horizontal';

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


export const Wizard = ({ children, initialValues, onSubmit }) => {


    const [stepNumber, setStepNumber] = useState(0);
    const steps = React.Children.toArray(children);
    const [snapshot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = values => {
        setSnapshot(values);
        setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    };


    const handleSubmit = async (values, bag) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values, bag);
        }
        if (isLastStep) {
            return onSubmit(values, bag);
        } else {
            bag.setTouched({});
            next(values);
        }
    };



    return (
        <div className="row">
            <div className="col-sm-12 col-md-10 bloque form">
                <div className="card formulario">
                    <div>
                        <Stepper
                            steps={ [{title: ''}, {title: ''}, {title: ''}] }
                            activeStep={ stepNumber }
                            activeColor={"#72B500"}
                            completeColor={"#72B500"}
                        />
                    </div>
                    <div className="card-body">
                        <p>Conoce cuál régimen te entrega más beneficios:</p>
                        <Formik
                            initialValues={snapshot}
                            onSubmit={handleSubmit}
                            validationSchema={step.props.validationSchema}
                        >
                            {(formik) => (
                                <Form>
                                    {step}
                                    <div className="d-flex justify-content-center">
                                        <div className="col justify-content-center d-flex">
                                            <button
                                                type="submit"
                                                id={stepNumber > 0 ? (stepNumber > 1 ? 'P3_lead' : 'P2_datos_personales') : 'P1_ingreso_renta_aporte'}
                                                className="btn btn-lg btn-block purple"
                                                disabled={!(formik.isValid && formik.dirty)}
                                            >
                                                {stepNumber >0 ? (stepNumber > 1 ? 'Calcular': 'Continuar') : 'Comenzar'}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div className="col-md-2 desktop">
                {<img src={joven2} alt="joven modelo"/>}
            </div>
        </div>
    );
};

export const WizardStep = ({ children }) => children;
