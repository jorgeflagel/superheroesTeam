import React from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import Spinning from '../components/spinning';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('No es un email válido')
      .required('Requerido'),
    password: Yup.string()
      .required('Requerido'), 
  });

const FieldError = (msg) => <div className="alert alert-danger" role="alert">{msg.children}</div>;

export default function Login() {
    return(
        <div className="p-5">
            <h1>Bienvenido!</h1>
            <Formik
                initialValues={{ email: "", password: ""}}
                validationSchema={LoginSchema}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
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
                        
                    </Form>
            )}
            </Formik>
        </div>
    )
}