import React, { useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router";


import Spinning from '../components/spinning';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('No es un email válido')
      .required('Requerido'),
    password: Yup.string()
      .required('Requerido'), 
  });

const FieldError = (msg) => <div className="alert alert-danger" role="alert">{msg.children}</div>;

export default function Login() {new Promise(resolve => setTimeout(resolve, 500));

    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    return(
        <div className="p-5">
            <h1>Bienvenido!</h1>
            <Formik
                initialValues={{ email: "", password: ""}}
                validationSchema={LoginSchema}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    setErrorMessage(null);
                    setSubmitting(true);
                    console.log(values);
                    axios.post("http://challenge-react.alkemy.org/", values)
                        .then((resp) => {
                            localStorage.setItem("tokenEquipoDeHeroes", resp.data.token); 
                            history.push('/');
                            })
                        .catch((error) => setErrorMessage(error.response.data.error));
                    resetForm();
                    setSubmitting(false);

                    }}
            >

            {({ handleSubmit, isSubmitting }) => (

                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field type="email" name="email" id="email" placeholder="Escribe tu email..." className="form-control"/>
                            <ErrorMessage name="email" component={FieldError}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field type="password" name="password" id="password" placeholder="Escribe tu password..." className="form-control"/>
                            <ErrorMessage name="password" component={FieldError}/>
                        </div>
                        <button className="btn btn-primary">
                        {isSubmitting 
                            ? <Spinning />
                            : "Login"}
                        </button>
                        {errorMessage
                            ? <div className="alert alert-danger my-3" role="alert">{errorMessage}</div>
                            : null}
                    </Form>
            )}
            </Formik>
        </div>
    )
}