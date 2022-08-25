import { deletedoctordata, getdoctordata, postDoctor, updatedoctordata } from "../../commene/apis/doctor.api";
import storade, { db } from "../../Firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { ref, uploadBytes } from "firebase/storage";
import { BASE_URL } from "../../shared/baseurl";
import * as Actiontype from "../ActionType";

export const doctordata = () => async (dispatch) => {

  try {
    dispatch(loadingdoctor());
    
    const querySnapshot = await getDocs(collection(db, "doctor"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({id:doc.id, ...doc.data()})
      console.log(`${doc.id} => ${doc.data()}`);
    });

    dispatch({type: Actiontype.GET_DOCTOR, payload: data})
   
  } catch (error) {
    dispatch(errordoctor(error.message));
  }
};

export const postdoctordata = (data) => async (dispatch) => {
  try {
    dispatch(loadingdoctor());
    
    const storageRef = ref(storade, 'doctor/'+data.Update.name);

    uploadBytes(storageRef, data.Update).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    const docRef = await addDoc(collection(db, "doctor"),  data );
    console.log("Document written with ID: ", docRef.id);
    dispatch({type: Actiontype.POST_DOCTOR, payload: {id:docRef.id, ...data}})

  } catch (error) {
    dispatch(errordoctor(error.message));

    console.error("Error adding document: ", error);
  }
};

export const deletedoctor = (id) => async (dispatch) => {
  console.log(id);
  try {
    dispatch(loadingdoctor())

    await deleteDoc(doc(db, "doctor", id));

    dispatch({type: Actiontype.DELETE_DOCTOR, payload:id })

  } catch (error) {
    dispatch(errordoctor(error.message));
  }
}

export const updatedoctor = (data) => async (dispatch) => {
  try {
    dispatch(loadingdoctor())

    const washingtonRef = doc(db, "doctor", data.id);
    await updateDoc(washingtonRef, {
      name: data.name,
      email: data.email,
      sallery: data.sallery,
      post: data.post,
      experience: data.experience
    });

    dispatch({type: Actiontype.UPDATE_DOCTOR, payload:data })
    // setTimeout(function () {
    //   return updatedoctordata(data)
    //   .then((data) => dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: data.data}))
    //   .catch(error =>  dispatch(errordoctor(error.message)));
    // },2000 )

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