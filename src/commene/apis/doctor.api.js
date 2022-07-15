import { getRequest } from "../request"

export const getdoctordata = () => {
    return getRequest('doctor')
}