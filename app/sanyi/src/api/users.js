import axios from "axios"
import {getItem} from "../../useStorageState"
const config= require("../../app.json")
const api_uri = config.expo.api_uri+"api/v1"

const getToken = async() =>{
  const data_token = await getItem('session')
  const token = data_token?.token
  return token;
}

exports.add = async (name, username, password, role) =>{
  const body = {name, username, password, role}
  const token = await getToken()
  const uri = api_uri + "/admin/user"
  try{
    const {data} = await axios.post(uri,body,{
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }catch(e){
    return false;
  }
}
exports.update = async (id, name, username, password, role) =>{
  const body = {name, username, password, role}
  const token = await getToken()
  const uri = api_uri + "/admin/user/"+id
  try{
    const {data} = await axios.put(uri,body,{
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }catch(e){
    return false;
  }
}
exports.remove = async (id) =>{
  const token = await getToken()
  const uri = api_uri + "/admin/user/"+id
  try{
    const {data} = await axios.delete(uri,{
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }catch(e){
    return false;
  }
}

exports.get_all = async () =>{
  const token = await getToken();
  const uri = api_uri + "/admin/user"
  try{
      const {data} = await axios.get(uri,{
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
  }catch(e){
    return false;
  }
}