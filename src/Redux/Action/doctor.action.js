import { BASE_URL } from "../../shared/baseurl";
import * as Actiontype from "../ActionType";

export const doctordata = () => (dispatch) => {
  dispatch({ type: Actiontype.GET_MEDICINE });

  try {
    dispatch(loadingdoctor());
    setTimeout(function () {
      fetch(BASE_URL + "doctor")
        .then(
          (response) => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error(
                "Error " + response.status + ": " + response.statusText
              );
              error.response = response;
              throw error;
            }
          },
          (error) => {
            var errmess = new Error(error.message);
            throw errmess;
          }
        )
        .then(response => response.json())
        .then(doctors => dispatch({ type: Actiontype.GET_DOCTOR, payload: doctors }))
        .catch(error =>  dispatch(errordoctor(error.message)));
    }, 2000)
      
    
  } catch (error) {
    dispatch(errordoctor(error.message));
  }
};

export const postmedoctordata = (data) => (dispatch) => {
  try {
    dispatch(loadingdoctor());
    setTimeout(function () {
     return fetch(BASE_URL + "doctor",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(
          (response) => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error(
                "Error " + response.status + ": " + response.statusText
              );
              error.response = response;
              throw error;
            }
          },
          (error) => {
            var errmess = new Error(error.message);
            throw errmess;
          }
        )
        .then(response => response.json())
        .then(doctors => dispatch({ type: Actiontype.POST_DOCTOR, payload: data }))
        .catch(error =>  dispatch(errordoctor(error.message)));
    }, 2000)
      
    
  } catch (error) {
    dispatch(errordoctor(error.message));
  }
};

export const deletedoctor = (id) => (dispatch) => {
  try {
    dispatch(loadingdoctor())
    setTimeout(function () {
      return fetch(BASE_URL + 'doctor/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message); 
            throw errmess;
          }
        )
        .then(response => response.json())
        .then(doctors => dispatch({ type: Actiontype.DELETE_DOCTOR, payload: id }))
        .catch((error) => dispatch(errordoctor(error.message)) )
    }, 2000)
  } catch (error) {
    dispatch(errordoctor(error.message));
  }
}

export const updatedoctor = (data) => (dispatch) => {
  try {
    dispatch(loadingdoctor())
    setTimeout(function () {
      return fetch(BASE_URL + 'doctor/' + data.id, {
        method: 'PUT',
        body : JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message); 
            throw errmess;
          }
        )
        .then(response => response.json())
        .then(doctors => dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: doctors }))
        .catch((error) => dispatch(errordoctor(error.message)) )
    }, 2000)
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