import axios from "axios";
axios.defaults.withCredentials = true;

const URL = "http://localhost:8080/api"

const API = axios.create({
    baseURL: URL,
    headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    }
})

export const postAPI = async(target, formData) => {
    return await API({
        url: target,
        method: 'post',
        data: formData,
    }).then((res) => res.data)
        .catch((error) => {
            return error.response.data;
        })
}