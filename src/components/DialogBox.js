import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogBoxComponent(props) {
    const {dialogContent, handleClose, dialogBoxHeading, open, primaryButton, primaryButtonTitle, secondaryButton, secondaryButtonTitle, handleSave} = props

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {dialogBoxHeading}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {primaryButton && <Button autoFocus onClick={handleClose}>
                        {primaryButtonTitle}
                    </Button>}
                    {secondaryButton && <Button onClick={handleSave} autoFocus>
                        {secondaryButtonTitle}
                    </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogBoxComponent;
