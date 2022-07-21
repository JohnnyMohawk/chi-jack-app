import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SignupForm from './SignupForm/SignupForm';
import styles from '../styles/LegendComp.module.css'
import { ModalButton } from './ModalButton'
import { FaTimesCircle } from 'react-icons/fa'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SignUpModal(props) {

    const [message, setMessage] = React.useState()

    const updateMessage = msg => {
        setMessage(msg)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <ModalButton buttonStyle="btn--outline" onClick={handleOpen}>Sign Up</ModalButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id={styles.modalModalTitle} variant="h6" component="h2">
                        Sign Up
                    </Typography>
                    {/* <LoginForm handleSignupOrLogin={props.handleSignupOrLogin} handleClose={handleClose} closeMobileMenu={props.closeMobileMenu} /> */}
                    <main>
                    {message && <p>{message}</p> }
                        <SignupForm 
                            updateMessage={updateMessage}
                            handleSignupOrLogin={props.handleSignupOrLogin}
                        />
                    </main>
                    <div className={styles.closeButtonLegendWrap}>
                        <button className={styles.closeButtonLegend} onClick={handleClose}><FaTimesCircle /></button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
