import { router } from 'expo-router';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {styles} from "../src/styles/main"
import { login } from "../src/api/index";

import { useSession } from '../ctx';
import { useState } from 'react';

import {goto_access} from "../src/utils/login_util"

export default function Login() {
  const { signIn } = useSession();
  
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const image = require("../assets/logo.png");


  const sendLogin = async () =>{
      if(!username || !password){
          alert("Debe insertar sus datos");
          return;
      }
      setLoading(true);
      const data = await login(username, password)
      if(!data || !data.user){
          alert("Error de credenciales")
          setLoading(false);
      }else{
          signIn(JSON.stringify({token:data.token,user:data.user}))
          const uri = goto_access(data.user.role.rol)
          console.log(uri)
          router.replace(uri);
          setLoading(false);
      }
  }

  return <>
      <SafeAreaView style={styles.container_center}>
          <Image source={image} width={100} height={100}/>
          <Card mode='contained' style={styles.login_container}>
              <Card.Content>
                  <TextInput
                      style={{marginTop:20}}
                      label="Usuario"
                      value={username}
                      onChangeText={text => setUser(text)}
                      />
                  <TextInput
                      style={{marginTop:20}}
                      label="PIN"
                      secureTextEntry={true}
                      value={password}
                      keyboardType = 'numeric'
                      onChangeText={text => setPass(text)}
                      />
              </Card.Content>
              <Card.Actions style={{marginTop:20}}>
                  <Button loading={loading} onTouchEnd={sendLogin}>Entrar</Button>
              </Card.Actions>
          </Card>
          <Card mode='contained' style={styles.login_signature}>
              <Text variant='headlineSmall' style={{textAlign:'center'}} > sanyi </Text>
              <Text variant='labelSmall'>Una aplicaci贸n para la Gesti贸n de tu Restaurante</Text>
          </Card>
      </SafeAreaView>
  </>;
}