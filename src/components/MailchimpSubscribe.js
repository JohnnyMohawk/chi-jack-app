import React, {useState, useEffect} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import InputField from './FormField'
import styles from '../styles/MailChimp.module.css'



const CustomForm = ({ status, message, onValidated }) => {

    const [email, setEmail] = useState('');

    useEffect(() => {
        if(status === "success") clearFields();
    }, [status])
    
    const clearFields = () => {
        setEmail('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        email &&
        email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email,
        });
    }

    return (
        <div className={styles.formWrap}>
            <form className="mc__form" onSubmit={(e) => handleSubmit(e)}>
                
                <div className={styles.mc__field_container}>
                    <InputField
                        className={styles.mc__input_field}
                        onChangeHandler={setEmail}
                        type="email"
                        value={email}
                        placeholder="Your Email"
                        isRequired
                    />
                    <InputField
                        className={styles.mc__submit_btn}
                        label="Subscribe"
                        type="submit"
                        formValues={[email]}
                    />
                </div>

                {status === "sending" && (
                <div className={styles.mc__alert}>
                    sending...
                </div>
                )}
                {status === "error" && (
                <div 
                    className={styles.mc__alert}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
                )}
                {status === "success" && (
                <div
                    className={styles.mc__alert}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
                )}
            </form>
        </div>
    );
};


const MailchimpFormContainer = props => {

    const postUrl = `https://shyjack.us13.list-manage.com/subscribe/post?u=8b5fe916c80874ad4fc186f98&id=a8907e1f3f`;

    return (
        <div className={styles.mc__form_container}>
            <MailchimpSubscribe
                url={postUrl}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status} 
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        </div>
    );
};

export default MailchimpFormContainer;