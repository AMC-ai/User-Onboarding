import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const OnBoarding = ({ values, touched, errors, status }) => {
    const [person, setPerson] = useState([])
    // console.log(person)
    useEffect(() => {
        status && setPerson(person => [...person, status]);
    }, [status]);
    return (
        <div className="on-boarding">
            <Form>
                <Field type="text" name="fullName" placeholder="Full Name" />
                {touched.fullName && errors.fullName && (
                    <p className="error">{errors.fullName}</p>
                )}
                <Field type="text" name="email" placeholder="E-mail eg. jdoe@email.com" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field type="text" name="password" placeholder="password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <Field component="select" className="role-select" name="jobRole">
                    <option>Choose an option</option>
                    <option value="team-lead">Team Lead</option>
                    <option value="full-stack-dev">Full Stack Developer</option>
                    <option value="other">Other</option>
                </Field>
                {touched.jobRole && errors.jobRole && (
                    <p className="error">{errors.jobRole}</p>)}
                <label className="checkbox-container">
                    {" "}
                    Terms of Service
          <Field
                        type="checkbox"
                        name="aggreement"
                        checked={values.aggreement}
                    />
                    <span className="checkmark" />
                </label>
                <button type="submit">Submit</button>
            </Form>
            {person.map(input => (
                < ul key={input.id} >
                    <li>Full Name: {input.fullName}</li>
                    <li>E-mail: {input.email}</li>
                    <li>password: {input.password}</li>
                    <li>Job Title: {input.jobRole}</li>
                </ul>
            ))}
        </div >
    );
};
const FormikOnBoarding = withFormik({
    mapPropsToValues({ fullName, email, password, aggreement, jobRole }) {
        return {
            fullName: fullName || "",
            email: email || "",
            password: password || "",
            aggreement: aggreement || false,
            jobRole: jobRole || "",
        };
    },
    validationSchema: Yup.object().shape({
        fullName: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        // aggreement: Yup.bool(true).required(),
        jobRole: Yup.string()
            .oneOf(["team-lead", "full-stack-dev", "other"])
            .required("Select an Option")
    }),
    handleSubmit(values, { setStatus }) {
        axios.post('https://reqres.in/api/users/', values)
            .then(res => { setStatus(res.data); })
            .catch(err => console.log(err.response));
    }
})(OnBoarding);
export default FormikOnBoarding;
// console.log(FormikOnBording);