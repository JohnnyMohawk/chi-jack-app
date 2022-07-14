import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { crimeObjArr } from '../services/mapService'
import IconInfo from './IconInfo';
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


export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(crimeObjArr[0])
    return (
        <div className={styles.crimeLegend}>
            <Button onClick={handleOpen}>Map Legend</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography className={styles.legendHeader}  variant="h6" component="h2" lineHeight={1}>
                    Gun Crimes Icon Legend
                </Typography>
                <Typography id="modal-modal-subtitle" component="h2" lineHeight={1}>
                    Lists all Illinois Uniform Crime Reporting (IUCR) codes for each map icon.
                </Typography>
                {crimeObjArr.map((crimeIcon) => (
                    <IconInfo icon={crimeIcon.icon} title={crimeIcon.title} specs={crimeIcon.specs} />
                ))}
                <div className={styles.closeButtonLegendWrap}>
                    <button className={styles.closeButtonLegend} onClick={handleClose}><FaTimesCircle /></button>
                </div>
                </Box>
            </Modal>
        </div>
    );
}