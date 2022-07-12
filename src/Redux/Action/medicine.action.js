import { BASE_URL } from "../../shared/baseurl";
import * as Actiontype from "../ActionType";

export const medicinedata = () => (dispatch) => {
  dispatch({ type: Actiontype.GET_MEDICINE });

  try {
    dispatch(loadingMedicin());
    setTimeout(function () {
      fetch(BASE_URL + "medicine")
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
        .then(medicines => dispatch({ type: Actiontype.GET_MEDICINE, payload: medicines }))
        .catch(error =>  dispatch(errorMedicin(error.message)));
    }, 2000)
      
    
  } catch (error) {
    dispatch(errorMedicin(error.message));
  }
};

export const postmedicinedata = (data) => (dispatch) => {
  try {
    dispatch(loadingMedicin());
    setTimeout(function () {
     return fetch(BASE_URL + "medicine",{
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
        .then(medicines => dispatch({ type: Actiontype.POST_MEDICINE, payload: data }))
        .catch(error =>  dispatch(errorMedicin(error.message)));
    }, 2000)
      
    
  } catch (error) {
    dispatch(errorMedicin(error.message));
  }
};

export const deleteMedicin = (id) => (dispatch) => {
  try {
    dispatch(loadingMedicin())
    setTimeout(function () {
      return fetch(BASE_URL + 'medicine/' + id, {
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
        .then(medicine => dispatch({ type: Actiontype.DELETE_MEDICINE, payload: id }))
        .catch((error) => dispatch(errorMedicin(error.message)) )
    }, 2000)
  } catch (error) {
    dispatch(errorMedicin(error.message));
  }
}

export const updateMedicine = (data) => (dispatch) => {
  try {
    dispatch(loadingMedicin())
    setTimeout(function () {
      return fetch(BASE_URL + 'medicine/' + data.id, {
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
        .then(medicine => dispatch({ type: Actiontype.UPDATE_MEDICINE, payload: medicine }))
        .catch((error) => dispatch(errorMedicin(error.message)) )
    }, 2000)
  } catch (error) {
    dispatch(errorMedicin(error.message));
  }
}

export const loadingMedicin = () => (dispatch) => {
  dispatch({ type: Actiontype.LOADING_MEDICINE })
}

export const errorMedicin = (error) => (dispatch) => {
  dispatch({ type: Actiontype.ERROR_MEDICINE, payload:error })
}