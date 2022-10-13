import axios from 'axios'

export function saveData(data){
    axios.post('http://localhost:4000/register',data)
}