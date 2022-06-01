import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Medicine(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiry, setExpiry] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };    

    const handlelSubmit = () => {
        let data = {
            name,
            price,
            quantity,
            expiry
        }
        console.log(data);
    };

  return (
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
           Add Medicine
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="peice"
                    name="peice"
                    label="Price"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="expiey"
                    name="expiry"
                    label="Expiry"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setExpiry(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handlelSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
export default Medicine;