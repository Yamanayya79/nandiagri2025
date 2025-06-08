import axios from "axios";
const instance =axios.create({
    baseURL:'https://agriapi2025.onrender.com/',
    withCredentials:true
})
export default instance