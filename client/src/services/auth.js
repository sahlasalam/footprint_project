import axios from 'axios'

export function saveDetails(data){
   return axios.post('http://localhost:4000/register',data)
}

export function login(data){
    return axios.post('http://localhost:4000/login', data)
}