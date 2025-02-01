import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials:true,   //THIS IS USED TO SEND THE COOKIES FROM THE CLIENT TO THE SERVER
    // headers: {
    //     'Content-Type': 'application/json',
    // },
})

