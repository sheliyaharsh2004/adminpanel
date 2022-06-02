import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";

function Doctor(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiry, setExpiry] = useState("");
    const [datamed, setDatamed] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };
    
    const handlelSubmit = () => {
        let data = {
            id: Math.floor(Math.random() * 1000),
            name,
            price,
            quantity,
            expiry,
        };
        let medicineData = JSON.parse(localStorage.getItem("medicine"));
    
        if (medicineData == null) {
          localStorage.setItem("medicine", JSON.stringify([data]));
        } else {
          medicineData.push(data);
          localStorage.setItem("medicine", JSON.stringify(medicineData));
        }

        handleClose();
        getData();
    };
    
    const getData = () => {
        let getMedData = JSON.parse(localStorage.getItem("medicine"));
    
        if (getMedData !== null) {
          setDatamed(getMedData);
        }
      };
    
    useEffect(() => {
            getData();
        }, 
    []);
    
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "price", headerName: "Price", width: 130 },
        { field: "quantity", headerName: "Quantity", width: 130 },
        { field: "expiry", headerName: "Expiry", width: 130 },
      ];

    return (
        <div>
            <h1>Doctor</h1>
        </div>
    );
}

export default Doctor;