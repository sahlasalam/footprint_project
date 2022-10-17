import axios from 'axios'

export function saveDetails(data){
   return axios.post('http://localhost:4000/register',data)
}

export function login(data){
    return axios.post('http://localhost:4000/login', data)
}

export function submitData(data){
    console.log(data);
    return axios.post('http://localhost:4000/savedetails',{data:data, token : localStorage.getItem("user_token")})
}

export function fetchdetails(data){
    return axios.post('http://localhost:4000/fetch',data)
}