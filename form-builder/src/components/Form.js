import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const Form = ({ values, touched, errors, status }) => {
    const [form, setForm] = useState([])
    useEffect(() => {
        status && setForm(form => [...form, status])
    }, [status])
    return (
        <div className="on-boarding">
            <Form>
                <Field type="text" name="fullName" placeholder="Full Name" />
                {touched.fullName && errors.fullName && (
                    <p className="error">{errors.fullName}</p>
                )}
                <Field type="text" name="email" placeholder="e.g. jdoe@email.com" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field type="text" name="password" placeholder="password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <Field type="text" name="role" placeholder="Select Option" />
                <Field component="select" className="role-select" name="jobRole">
                    <option>Choose an option</option>
                    <option value="team-lead">Team Lead</option>
                    <option value="full-stack-dev">Full Stack Developer</option>
                    <option value="other">Other</option>
                </Field>
                {touched.jobRole && errors.jobRole && <p className="error">{errors.jobRole}</p>}
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
        </div>
    )
}