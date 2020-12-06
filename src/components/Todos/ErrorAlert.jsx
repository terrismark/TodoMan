import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';

const useStyles = makeStyles({

})

export default function ErrorDialog() {
    const [ isOpen, setOpen ] = useState(true)

    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <DialogContentText>
                    You already have an item with the same name. <br/> 
                    Try another variant!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size="large" onClick={() => setOpen(false)} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
