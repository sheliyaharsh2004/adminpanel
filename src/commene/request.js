import axios from 'axios';
import { BASE_URL } from '../shared/baseurl';

const axiosinstance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,
});

export const sendRequest = (config) =>{
  return axiosinstance.request(config)
}  

export const getRequest = (path) =>{
  return sendRequest({
    url : path,
    method : 'GET'
  })
}

export const postRequest = (path, data) =>{
  return sendRequest({
    url : path,
    method : 'POST',
    data : JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
}

export const deleteRequest = (path, id) =>{
  return sendRequest({
    url : path + id,
    method : 'DELETE',
  })
}

export const updateRequest = (path, data) =>{
  return sendRequest({
    url : path +data.id,
    method : 'UPDATE',
    data : JSON.stringify(data),
  })
}