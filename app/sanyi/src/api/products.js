import axios from "axios"
import {getItem} from "../../useStorageState"
const config= require("../../app.json")
const api_uri = config.expo.api_uri+"api/v1"

exports.server = config.expo.api_uri

const getToken = async() =>{
  const data_token = await getItem('session')
  const token = data_token?.token
  return token;
}

exports.add = async (name, picture, price, manufactured, description, category_id, enabled) =>{
  const formData = new FormData();
  const fileName = picture.split('/').pop();
  const fileType = fileName.split('.').pop();
  formData.append('picture', { 
    uri:picture, 
    name: fileName, 
    type: `image/${fileType || 'jpg'}` 
  });
  formData.append('price', price);
  formData.append('name', name);
  formData.append('manufactured', manufactured);
  formData.append('description', description);
  formData.append('category_id', category_id);
  formData.append('enabled', enabled);

  const token = await getToken()
  const uri = api_uri + "/admin/products"
  try{
    const {data} = await axios.post(uri,formData,{
      headers: { 
        Authorization: `Bearer ${token}` ,
        "Content-Type":"multipart/form-data"
      }
    });
    return data;
  }catch(e){
    return false;
  }
}

exports.update_prod = async (id, name, picture, price, manufactured, description, category_id, enabled) =>{
  const formData = new FormData();
  if(picture){
    const fileName = picture.split('/').pop();
    const fileType = fileName.split('.').pop();
    formData.append('picture', { 
      uri:picture, 
      name: fileName, 
      type: `image/${fileType || 'jpg'}` 
    });
  }
  formData.append('price', price);
  formData.append('name', name);
  formData.append('manufactured', manufactured);
  formData.append('description', description);
  formData.append('category_id', category_id);
  formData.append('enabled', enabled);

  const token = await getToken()
  const uri = api_uri + "/admin/products/"+id
  try{
    const {data} = await axios.put(uri,formData,{
      headers: { 
        Authorization: `Bearer ${token}` ,
        "Content-Type":"multipart/form-data"
      }
    });
    return data;
  }catch(e){
    return false;
  }
}

exports.all_prod = async (cat) =>{
  const token = await getToken();
  const uri = api_uri + "/admin/products/"+cat
  try{
      const {data} = await axios.get(uri,{
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
  }catch(e){
    return false;
  }
}
exports.menu_prod = async (cat) =>{
  const token = await getToken();
  const uri = api_uri + "/admin/menu"
  try{
      const {data} = await axios.get(uri,{
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
  }catch(e){
    return false;
  }
}
exports.remove = async (id) =>{
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