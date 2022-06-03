import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Doctor(props) {
  const [open, setOpen] = React.useState(false);
  const [dopen, setDopen] = React.useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [datamed, setDatamed] = useState([]);
  const [rid, setRid] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDopen = (id) => {
    setDopen(true);
    setRid(id)
  }

  const handleClose = () => {
    setOpen(false);
    setDopen(false);
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
  }, []);

  const handleDelete = () => {
    let removedata = JSON.parse(localStorage.getItem("medicine"));
    let filterdata = removedata.filter((r, i) => r.id !== rid);
    localStorage.setItem("medicine", JSON.stringify(filterdata));
    getData();
    setDopen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "expiry", headerName: "Expiry", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              className="border-primary"
              onClick={() => handleDopen(params.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add 
      </Button>
      <div className="mt-3" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={datamed}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Medicine</DialogTitle>
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

      <Dialog
        open={dopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure Delete Data?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete()} autoFocus>
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Doctor;
