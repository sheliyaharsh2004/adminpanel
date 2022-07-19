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
import { CircleLoader } from "react-spinners";
import { deletedoctor, doctordata, postdoctordata, postmedoctordata, updatedoctor } from "../../Redux/Action/doctor.action";

function Doctor(props) {
  const [open, setOpen] = useState(false);
  const [Dopen, setDopen] = useState(false);
  const [did, setdid] = useState("");
  const [udate, setUdate] = useState(false);
  const [filterdata, setFilterdata] = useState([]);
  const [datamed, setDatamed] = useState([]);
  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.doctor);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDopen(false);
  };

  const handleClickDopen = (id) => {
    setdid(id);
    setDopen(true);
  };

  const handleClickEditOpen = (params) => {
    console.log(params.row);
    setdid(params.id);
    setOpen(true);

    formik.setValues({
      id: params.id,
      name: params.row.name,
      email: params.row.email,
      sallery: params.row.sallery,
      post: params.row.post,
      experience: params.row.experience,
    });
    setUdate(true);
  };

  const handleSubmit = (values) => {
    let data = {
      id: Math.floor(Math.random() * 1000),
      name: values.name,
      email: values.email,
      sallery: values.sallery,
      post: values.post,
      experience: values.experience,
    };

    console.log(data)
    dispatch(postdoctordata(data))
    setOpen(false);
    getData();
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
      name: "",
      email: "",
      sallery: "",
      post: "",
      experience: "",
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

    // let edituData = JSON.parse(localStorage.getItem("doctor"));
    // console.log(edituData);

    // let upadateData = edituData.map((u) => {
    //   if (u.id === did) {
    //     console.log(did);
    //     return { id: did, ...values };
    //   } else {
    //     return u;
    //   }
    // });

    // localStorage.setItem("doctor", JSON.stringify(upadateData));

    dispatch(updatedoctor(values))

    getData();
    setOpen(false);
    setUdate(false);
    setdid();
  };
  
  const getData = () => {
    setDatamed(doctors.doctor);
  };

  // const getData = () => {
  //   let getEDataItem = JSON.parse(localStorage.getItem("doctor"));

  //   if (getEDataItem !== null) {
  //     setDatamed(getEDataItem);
  //   }
  // };

  const handleDelete = () => {
    // let removedata = JSON.parse(localStorage.getItem("doctor"));
    // let filterdata = removedata.filter((r, i) => r.id !== did);
    // localStorage.setItem("doctor", JSON.stringify(filterdata));

    dispatch(deletedoctor(did))

    getData();
    setDopen(false);
  };

  useEffect(() => {
    dispatch(doctordata());
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "sallery", headerName: "Sallery", width: 90 },
    { field: "post", headerName: "Post", width: 130 },
    { field: "experience", headerName: "experience", width: 100 },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              className="border-primary"
              onClick={() => handleClickDopen(params.id)}
            >
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
            <IconButton onClick={() => handleClickEditOpen(params)}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handlesearch = (Dr) => {
    let medsearch = JSON.parse(localStorage.getItem("doctor"))
      let fdata = medsearch.filter((f) => (

        f.id.toString().includes(Dr) ||
        f.name.toString().includes(Dr) ||
        f.email.toString().includes(Dr) ||
        f.sallery.toString().includes(Dr) ||
        f.post.toString().includes(Dr) ||
        f.experience.toString().includes(Dr)
      ))
      setFilterdata(fdata)
      console.log(fdata);
      console.log(Dr);
  }

  const filter = filterdata.length > 0 ? filterdata : datamed

  return (
    <>
      {doctors.isLoading ? 
        <CircleLoader
          className="center"
          color="rgba(46, 118, 209, 1)"
          size={80}
          speedMultiplier={1}
        />
        :
        (doctors.error ?
          <p>{doctors.error}</p>
          :
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="search"
              name="search"
              label="search"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handlesearch(e.target.value)}
            />
            <Button variant="outlined" onClick={handleClickOpen}>
              Doctor Data Add
            </Button>
            <div className="mt-3" style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={doctors.doctor}
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
                      id="email"
                      name="email"
                      value={formik.values.email}
                      label="Email"
                      type="email"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email ? (
                      <p className="errors">{formik.errors.email}</p>
                    ) : null}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="sallery"
                      name="sallery"
                      value={formik.values.sallery}
                      label="Sallery"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.sallery ? (
                      <p className="errors">{formik.errors.sallery}</p>
                    ) : null}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="post"
                      name="post"
                      label="Post"
                      value={formik.values.post}
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.post ? (
                      <p className="error">{formik.errors.post}</p>
                    ) : null}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="experience"
                      name="experience"
                      value={formik.values.experience}
                      label="Experience"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.experience ? (
                      <p className="errors">{formik.errors.experience}</p>
                    ) : null}
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Submit</Button>
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
        )
      }
    </>
  );
}

export default Doctor;
