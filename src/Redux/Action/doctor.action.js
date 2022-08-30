import { deletedoctordata, getdoctordata, postDoctor, updatedoctordata } from "../../commene/apis/doctor.api";
import storade, { db } from "../../Firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BASE_URL } from "../../shared/baseurl";
import * as Actiontype from "../ActionType";
import storage from "../../Firebase";

export const doctordata = () => async (dispatch) => {

  try {
    dispatch(loadingdoctor());
    
    const querySnapshot = await getDocs(collection(db, "doctor"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({id:doc.id, ...doc.data()})
    });

    dispatch({type: Actiontype.GET_DOCTOR, payload: data})
   
  } catch (error) {
    dispatch(errordoctor(error.message));
  }
};

export const postdoctordata = (data) => async (dispatch) => {
  try {
    dispatch(loadingdoctor());
    
    const rendomste = Math.floor(Math.random() * 1000000).toString();
    const storageRef = ref(storade, 'doctor/'+rendomste);

    uploadBytes(storageRef, data.upload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then(async(url) => {
          const docRef = await addDoc(collection(db, "doctor"),{
            name: data.name,
            email: data.email,
            sallery: data.sallery,
            post: data.post,
            experience: data.experience,
            url:url,
            fileName: rendomste,
          });

          dispatch({
            type: Actiontype.POST_DOCTOR, 
            payload: {
              id:docRef.id, 
              name: data.name,
              email: data.email,
              sallery: data.sallery,
              post: data.post,
              experience: data.experience,
              url:url,
              fileName: rendomste,
            }})
        })
      console.log('Uploaded a blob or file!');
    });

  } catch (error) {
    dispatch(errordoctor(error.message));

    console.error("Error adding document: ", error);
  }
};

export const deletedoctor = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(loadingdoctor())

    const doctorRef = ref(storage, 'doctor/'+ data.fileName);
    deleteObject(doctorRef)
    .then(async() => {
      await deleteDoc(doc(db, "doctor", data.id));
      dispatch({type: Actiontype.DELETE_DOCTOR, payload:data.id })
    })
    .catch((error) => {
      dispatch(errordoctor(error.message));
    });

    // await deleteDoc(doc(db, "doctor", id));
    // dispatch({type: Actiontype.DELETE_DOCTOR, payload:id })

  } catch (error) {
    dispatch(errordoctor(error.message));
  }
}

export const updatedoctor = (data) => async (dispatch) => {
  try {
    console.log(data);
    dispatch(loadingdoctor())
    const updataRef = doc(db, "doctor", data.id);
    if ( typeof data.upload === "string") {
        await updateDoc(updataRef, {
          name: data.name,
          email: data.email,
          sallery: data.sallery,
          post: data.post,
          experience: data.experience,
          fileName: data.fileName,
          upload: data.url
        });
        dispatch({type: Actiontype.UPDATE_DOCTOR, payload:data })
    } else {

    }

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