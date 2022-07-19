import { deletedoctordata, getdoctordata, postDoctor, updatedoctordata } from "../../commene/apis/doctor.api";
import { BASE_URL } from "../../shared/baseurl";
import * as Actiontype from "../ActionType";

export const doctordata = () => (dispatch) => {

  try {
    dispatch(loadingdoctor());
    setTimeout(function () {
      return getdoctordata()
      .then((data) => dispatch({ type: Actiontype.GET_DOCTOR, payload: data.data}))
      .catch(error =>  dispatch(errordoctor(error.message)));
    },2000 )
   
  } catch (error) {
    dispatch(errordoctor(error.message));
  }
};

export const postdoctordata = (data) => (dispatch) => {
  try {
    dispatch(loadingdoctor());
    setTimeout(function () {
      return postDoctor(data)
      .then((data) => dispatch({ type: Actiontype.POST_DOCTOR, payload: data.data}))
      .catch(error =>  dispatch(errordoctor(error.message)));
    },2000 )

  } catch (error) {
    dispatch(errordoctor(error.message));
  }
};

export const deletedoctor = (id) => (dispatch) => {
  try {
    dispatch(loadingdoctor())
    setTimeout(function () {
      return deletedoctordata(id)
      .then((data) => dispatch({ type: Actiontype.DELETE_DOCTOR, payload: id}))
      .catch(error =>  dispatch(errordoctor(error.message)));
    },2000 )

  } catch (error) {
    dispatch(errordoctor(error.message));
  }
}

export const updatedoctor = (data) => (dispatch) => {
  try {
    dispatch(loadingdoctor())
    setTimeout(function () {
      return updatedoctordata(data)
      .then((data) => dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: data.data}))
      .catch(error =>  dispatch(errordoctor(error.message)));
    },2000 )

  } catch (error) {
    dispatch(errordoctor(error.message));
  }
}

export const loadingdoctor = () => (dispatch) => {
  dispatch({ type: Actiontype.LOADING_DOCTOR })
}

export const errordoctor = (error) => (dispatch) => {
  dispatch({ type: Actiontype.ERROR_DOCTOR, payload:error })
}