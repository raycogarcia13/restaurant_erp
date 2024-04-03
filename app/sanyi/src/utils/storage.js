import * as SecureStore from 'expo-secure-store';
import { useState, useEffect} from 'react';
import * as React from 'react';

exports.saveItem = async (key,value) => {
    await SecureStore.setItemAsync(key,JSON.stringify(value));
}

exports.getItem = async (key) => {
    const item = await SecureStore.getItemAsync(key);
    return JSON.parse(item);
}

exports.setToken = async (value) => {
    await SecureStore.setItemAsync("token",value);
}

exports.getToken = async () => {
   const token =  await SecureStore.getItemAsync("token");
   return token;
}

exports.deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
}

exports.deleteItem = async (key) => {
    await SecureStore.deleteItemAsync(key);
}

exports.storageItemAsync = async (key, value) => {
    if (value == null) {
        await SecureStore.deleteItemAsync(key);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
}

// const useAsyncState = (initialValue = [true, null]) => {
//     return React.useReducer((state, action) => {
//         return [false, action];
//       },
//       initialValue
//     );
//   }


exports.useItemAsync = (key) => {
    const [state, setState] = React.useState([true,null]);

    useEffect(() => {
        SecureStore.getItemAsync(key).then(value => {
            if(value){
                console.log(value)
                setState(value);
            }
        });
    }, [key]);

    const setValue = React.useCallback( (value) => {
        setState(value);
        storageItemAsync(key, value);
    },[key]);

    return [state, setValue];
}