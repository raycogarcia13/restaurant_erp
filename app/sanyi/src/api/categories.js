import axios from "axios"
import {getItem} from "../../useStorageState"
const config= require("../../app.json")
const api_uri = config.expo.api_uri+"api/v1"

const getToken = async() =>{
  const data_token = await getItem('session')
  const token = data_token?.token
  return token;
}

exports.add_cat = async (name, bar) =>{
  const body = {name, bar}
  const token = await getToken()
  const uri = api_uri + "/admin/category"
  try{
    const {data} = await axios.post(uri,body,{
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }catch(e){
    return false;
  }
}

exports.update_cat = async (id, name, bar) =>{
  const body = {name, bar}
  const token = await getToken()
  const uri = api_uri + "/admin/category/"+id
  try{
    const {data} = await axios.put(uri,body,{
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }catch(e){
    return false;
  }
}

exports.all_cat = async () =>{
  const token = await getToken();
  const uri = api_uri + "/admin/category"
  try{
      const {data} = await axios.get(uri,{
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
  }catch(e){
    return false;
  }
}
exports.remove_cat = async (id) =>{
  const token = await getToken();
  const uri = api_uri + `/admin/category/${id}`
  try{
      const {data} = await axios.delete(uri,{
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
  }catch(e){
    return false;
  }
}