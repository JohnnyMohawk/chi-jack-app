import * as React from 'react';
import './pages/Map.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { crimeObjArr } from '../services/mapService'
import IconInfo from './IconInfo';

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
        <div className="crime-legend">
            <Button onClick={handleOpen}>Map Legend</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Gun Crimes Icon Legend
                </Typography>
                <Typography id="modal-modal-subtitle" component="h2">
                    Lists all Illinois Uniform Crime Reporting (IUCR) codes for each map icon.
                </Typography>
                {/* <IconInfo icon={crimeObjArr[0].icon} title={crimeObjArr[0].title} specs={crimeObjArr[0].specs} /> */}
                {crimeObjArr.map((crimeIcon) => (
                    <IconInfo icon={crimeIcon.icon} title={crimeIcon.title} specs={crimeIcon.specs} />
                ))}
                </Box>
            </Modal>
        </div>
    );
}