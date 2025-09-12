import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_URL;

console.log("API_URL is : ",API_URL);

const registerUserApi = async(userData)=>{
   try {
      const response = await axios.post(`${API_URL}/users/register`,userData,{
            headers:{
                  "Content-Type":"application/json"
            }
      });
      console.log("Response from registerUserApi : ",response);
      return response.data;
   } 
   catch (error) {
      console.error('Error registering user:', error);
      throw error;
   }           
 }

const loginUserApi = async(userData)=>{
   try {
      const response = await axios.post(`${API_URL}/users/login`,userData,{
            headers:{
                  "Content-Type":"application/json"
            }
      });
      console.log("Response from loginUserApi : ",response);
      return response.data;
   } 
   catch (error) {
      console.error('Error logging in user:', error);
      throw error;
   }           
 }


const logoutUserApi = async()=>{
   try {
      const response = await axios.post(`${API_URL}/users/logout`,{}, {
         withCredentials: true,
      });
      console.log("Response from logoutUserApi : ",response);
      return response.data;
   } 
   catch (error) {
      console.error('Error logging out user:', error);
      throw error;
   }           
 }


 export { registerUserApi , loginUserApi , logoutUserApi }