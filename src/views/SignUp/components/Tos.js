import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Translate, I18n } from "react-redux-i18n";

export default function ScrollDialog() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div style={{ "display": "inline" }}>
            <Button onClick={handleClickOpen('paper')} color="primary" variant="text" size="small"> <Translate value="tos" /></Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <p>
                            {
                                "We do not provide legal, tax or investment advice. The website and the services within it are not intended to provide financial or investment advice. Stocks and options carry risks and are not suitable for all investors as the special risks inherent in trading can expose investors to potentially significant losses."
                            }
                        </p>
                        <p>
                            {
                                "All operations have risks that the investor must consider before investing. Any operation you carry out is at your own risk, we are not responsible for the results obtained of any kind."
                            }
                        </p>
                        <p>
                            {
                                "Nosotros no proporcionamos asesoramiento legal, tributario o de inversión. El sitio web y los servicios dentro de la misma no están destinados a proveer asesoría financiera ni de inversión. Las acciones y opciones implican riesgos y no son adecuadas para todos los inversores, ya que los riesgos especiales inherentes al comercio pueden exponer a los inversores a pérdidas potencialmente significativas."
                            }
                        </p>
                        <p>
                            {
                                "Todas las operaciones tienen riesgos que el inversionista debe considerar antes de invertir. Cualquier operación que realices es bajo tu propio riesgo, no nos responsabilizamos por los resultados obtenidos de ninguna indole."
                            }
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> <Translate value="close" /></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
//  <Button onClick={handleClose}>Subscribe</Button>
/**
 * [...new Array(50)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                            )
                            .join('\n')
 */