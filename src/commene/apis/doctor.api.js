import { deleteRequest, getRequest, postRequest, updateRequest } from "../request"

export const getdoctordata = () => {
    return getRequest('doctor')
}

export const postDoctor = (data) => {
    return postRequest('doctor', data)
}

export const deletedoctordata = (id) => {
    return deleteRequest('doctor/', id)
}

export const updatedoctordata = (data) => {
    return updateRequest('doctor/', data)
}