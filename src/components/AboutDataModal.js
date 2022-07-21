import * as React from 'react';
import Box from '@mui/material/Box';
import { ModalButton } from './ModalButton'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { crimeObjArr } from '../services/mapService'
import { FaTimesCircle } from 'react-icons/fa'
import styles from '../styles/LegendComp.module.css'

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


export default function AboutDataModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(crimeObjArr[0])
    return (
        <div className={styles.dataModal}>
            <ModalButton className="btns" buttonStyle="btn--primary" buttonSize="btn--large" onClick={handleOpen}>The Data</ModalButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography className={styles.legendHeader}  variant="h6" component="h2" lineHeight={1.4}>
                    What Crimes Does Shy Jack Watch?
                </Typography>
                    <p className={styles.whoIsJackCopy}>
                        The numbers are clear that homicides, carjackings, and general gun crimes are on track to be a worse problem in Chicago
                        than in past decades. Shy Jack’s data modeler is designed to explore these issues. The user-friendly interface sorts, filters, maps and 
                        graphs all data that applies to the following crimes committed in Chicago:
                    </p>
                    <p className={styles.list}>
                        <u><strong>Murder:</strong></u> 1st degree murder, 2nd degree murder, involuntary manslaughter, and reckless homicide.<br></br>
                        <u><strong>Assault:</strong></u> All assaults committed with a firearm.<br></br>
                        <u><strong>Sexual Assault:</strong></u> All sexual assaults committed with a firearm.<br></br>
                        <u><strong>Robbery:</strong></u> All robberies committed with a firearm.<br></br>
                        <u><strong>Battery:</strong></u> All batteries committed with a firearm.<br></br>
                        <u><strong>Unlawful Use:</strong></u> All unlawful firearm use and reckless firearm discharge reports.<br></br>
                        <u><strong>Unlawful Possession:</strong></u> All unlawful firearm possession reports.<br></br>
                        <u><strong>Ammunition Violations:</strong></u> All unlawful ammo possession and banned ammo sales / possession.<br></br>
                        <u><strong>Illegal Gun Sales:</strong></u> All unlawful firearm sales.<br></br>
                        <u><strong>Guns in Schools:</strong></u> All reports of firearm sales / possession / use in schools.<br></br>
                        <u><strong>License & Registration Violations:</strong></u> All firearm license and registration violations.<br></br>
                        <u><strong>Gun Attacks on Police:</strong></u> All assaults and batteries of police officers involving a firearm.<br></br>
                        <u><strong>Attacks on Police:</strong></u> All assaults and batteries of police officers not involving a firearm.<br></br>
                        <u><strong>Carjackings:</strong></u> All instances of vehicular hijacking.<br></br>
                    </p>
                    <p className={styles.note}>
                        All instances of murder & carjackings are included in the dataset. For all other crimes, only instances committed with a firearm are included.
                    </p>
                    <div className={styles.closeButtonLegendWrap}>
                        <button className={styles.closeButtonLegend} onClick={handleClose}><FaTimesCircle /></button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}