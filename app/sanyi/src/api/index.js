import axios from "axios"
const config= require("../../app.json")
const api_uri = config.expo.api_uri+"api/v1"

exports.login = async (username, password) =>{
  const body = {username, password}
  const uri = api_uri + "/auth/login"
  try{
      const {data} = await axios.post(uri, body);
      return data;
  }catch(e){
    return false;
  }
}
