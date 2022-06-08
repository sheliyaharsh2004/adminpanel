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
import EditIcon from '@mui/icons-material/Edit';
import { useFormik, Formik, Form } from "formik";
import * as yup from "yup";

function Doctor(props) {
  const [open, setOpen] = useState(false);
  const [Dopen, setDopen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [showData, setEShowData] = useState([]);
  const [did, setdid] = useState('');
  const [Editdata, setEditdata] = useState([]);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      setDopen(false);
      setEditOpen(false);
  };

  const handleClickDopen = (id) => {
      setdid(id)
      setDopen(true);
  };

  const handleClickEOpen = (id) => {
      setEditOpen(true);
      console.log(id);
      EditData(id);
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    email: yup.string().email("Please enter valid name").required("Please enter eamil"),
    sallery: yup.string().required("Please enter sallery"),
    post: yup.string().required("Please enter Post"),
    experience: yup.string().required("Please enter experience"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      sallery: '',
      post: '',
      experience:'',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      const { name, email, sallery, post, experience } = values;

      let docdata = {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        sallery,
        post,
        experience,
      };
      let doctorData = JSON.parse(localStorage.getItem("doctor"));

      if (doctorData == null) {
        localStorage.setItem("doctor", JSON.stringify([docdata]));
      } else {
        doctorData.push(docdata);
        localStorage.setItem("doctor", JSON.stringify(doctorData));
      }
      handleClose();
      getData();
      resetForm();
    },
  });

  const getData = () => {
    let getEDataItem = JSON.parse(localStorage.getItem("doctor"));

    if (getEDataItem !== null) {
      setEShowData(getEDataItem);
    }
  };

  const handleDelete = () => {
    let removedata = JSON.parse(localStorage.getItem("doctor"));
    let filterdata = removedata.filter((r, i) => r.id !== did);
    localStorage.setItem("doctor", JSON.stringify(filterdata));
    getData();
    setDopen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const EditData = (id) => {
    console.log(id);
    
    let GetEditData = JSON.parse(localStorage.getItem("doctor"));

    let EData = GetEditData.filter((e,i) => e.id == id)

    console.log(JSON.stringify(EData));
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "sallery", headerName: "Sallery", width: 120 },
    { field: "post", headerName: "Post", width: 120 },
    { field: "experience", headerName: "experience", width: 120 },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              className="border-primary"
              onClick={() => handleClickDopen(params.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              
              onClick={() => handleClickEOpen(params.id)}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Doctor Data Add
      </Button>
      <div className="mt-3" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={showData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Doctor Data</DialogTitle>
        <Formik value={formik}>
          <Form key={formik} onSubmit={formik.handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.name ? <p className="errors">{formik.errors.name}</p> : null}
              <TextField
                autoFocus
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.email ? <p className="errors">{formik.errors.email}</p> : null}
              <TextField
                autoFocus
                margin="dense"
                id="sallery"
                name="sallery"
                label="Sallery"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.sallery ? <p className="errors">{formik.errors.sallery}</p> : null}
              <TextField
                autoFocus
                margin="dense"
                id="post"
                name="post"
                label="Post"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.post ? <p className="error">{formik.errors.post}</p> : null}
              <TextField
                autoFocus
                margin="dense"
                id="experience"
                name="experience"
                label="Experience"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.experience ? <p className="errors">{formik.errors.experience}</p> : null}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} type="submit">Submit</Button>
              </DialogActions>
            </DialogContent>
          </Form>
        </Formik>
      </Dialog>

      <Dialog
        open={Dopen}
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
