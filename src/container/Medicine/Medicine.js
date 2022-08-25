import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik, Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedicin, medicinedata, postmedicinedata, updateMedicine } from "../../Redux/Action/medicine.action";
import { CircleLoader } from "react-spinners";
import { useContext } from "react";
import ThemeContext from "../Theme/ThemeContext";

function Medicine(props) {
  const [open, setOpen] = React.useState(false);
  const [dopen, setDopen] = React.useState(false);
  const [datamed, setDatamed] = useState([]);
  const [rid, setRid] = useState("");
  const [udate, setUdate] = useState(false);
  const dispatch = useDispatch();

  const medicines = useSelector((state) => state.medicine);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDopen(false);
  };

  const handleClickDopen = (id) => {
    setRid(id);
    setDopen(true);
  };

  const handleClickEditOpen = (params) => {
    console.log(params.row);
    setRid(params.id);
    setOpen(true);

    formik.setValues({
      id: params.id,
      name: params.row.name,
      price: params.row.price,
      quantity: params.row.quantity,
      expiry: params.row.expiry,
    });
    setUdate(true);
  };

  const handleSubmit = (values) => {
    let data = {
      id: Math.floor(Math.random() * 1000),
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      expiry: values.expiry,
    };

    console.log(data)
    dispatch(postmedicinedata(data))
    setOpen(false);
    getData();
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    price: yup.string().required("Please enter price"),
    quantity: yup.string().required("Please enter quantity"),
    expiry: yup.string().required("Please enter expiry"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      expiry: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      if (udate) {
        Updata(values);
      } else {
        handleSubmit(values);
      }
      resetForm();
    },
  });

  const Updata = (values) => {
    // let edituData = JSON.parse(localStorage.getItem("medicine"));

    // let upadateData = edituData.map((u) => {
    //   if (u.id === rid) {
    //     console.log(rid);
    //     return { id: rid, ...values };
    //   } else {
    //     return u;
    //   }
    // });

    // localStorage.setItem("medicine", JSON.stringify(upadateData));

    dispatch(updateMedicine(values))

    getData();
    setOpen(false);
    setUdate(false);
    setRid();
  };

  const getData = () => {
    setDatamed(medicines.medicine);
  };

  const handleDelete = () => {
    // let removedata = JSON.parse(localStorage.getItem("medicine"));
    // let filterdata = removedata.filter((r, i) => r.id !== rid);
    // localStorage.setItem("medicine", JSON.stringify(filterdata));

    dispatch(deleteMedicin(rid))

    getData();
    setDopen(false);
  };

  useEffect(() => {
    dispatch(medicinedata());
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "expiry", headerName: "Expiry", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              className="border-primary"
              onClick={() => handleClickDopen(params.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleClickEditOpen(params)}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const theme = useContext(ThemeContext)
  // console.log(theme.theme);

  return (
    <>
      {medicines.isLoading ? 
        <CircleLoader 
          className="center"
          color="rgba(46, 118, 209, 1)"
          size={80}
          speedMultiplier={1}
        />
        : 
        (medicines.error ? 
          <p>{medicines.error}</p>
          : 
          <div>
            <Button onClick={() => theme.toogle_theme(theme.theme)}> Change Theme </Button> <br/>

            <div className={`${theme.theme}`}>
              <Button variant="outlined" onClick={handleClickOpen}>
                Add Medicine
              </Button>
              <div className="mt-3" style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={medicines.medicine}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Medicine</DialogTitle>
                <Formik value={formik}>
                  <Form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.name ? (
                        <p className="errors">{formik.errors.name}</p>
                      ) : null}
                      <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        name="price"
                        value={formik.values.price}
                        label="Price"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.name ? (
                        <p className="errors">{formik.errors.price}</p>
                      ) : null}
                      <TextField
                        autoFocus
                        margin="dense"
                        id="quantity"
                        name="quantity"
                        value={formik.values.quantity}
                        label="Quantity"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.name ? (
                        <p className="errors">{formik.errors.quantity}</p>
                      ) : null}
                      <TextField
                        autoFocus
                        margin="dense"
                        id="expiey"
                        name="expiry"
                        value={formik.values.expiry}
                        label="Expiry"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.name ? (
                        <p className="errors">{formik.errors.expiry}</p>
                      ) : null}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Submit</Button>
                    </DialogActions>
                  </Form>
                </Formik>
              </Dialog>
            </div>
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
        )
      }
    </>
  );
}
export default Medicine;
