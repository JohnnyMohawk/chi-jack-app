import React from 'react';
import styles from '../styles/MailChimp.module.css'

const InputField = props => {

const validateInput = values => {
        if (values.some(f => f === "") || values[0].indexOf("@") === -1) {
            return true
        } else {
            return false
        }
    }

    if (props.type === "submit") {
        return (
            <input
                className={styles.primaryBtn}
                type='submit'
                value={props.label}
                disabled={validateInput(props.formValues)}
            />
        )
    } else if (props.type === "textarea") {
        return (
            <label className="inputField__label">
                {props.label}
                <textarea
                    onChange={(e) => props.onChangeHandler(e.target.value)}
                    placeholder={props.placeholder}
                    value={props.value}
                    required={props.isRequired}
                    className={styles.inputFieldButton}
                    rows={7}
                    name={props.name}
                />
            </label>
        );
    } else {
        return (
            <label className="inputField__label">
                {props.label}
                <input
                    onChange={(e) => props.onChangeHandler(e.target.value)}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    required={props.isRequired}
                    className={styles.inputField}
                    name={props.name}
                />
            </label>
        );
    }
};

export default React.memo(InputField);