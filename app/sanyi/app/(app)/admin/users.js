import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Card,  Dialog, IconButton, Modal, Text, TextInput, List } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import {styles} from "../../../src/styles/main"
import {get_all, add, update, remove} from "../../../src/api/users"

export default function Usuarios() {
    
    const color = styles.primary_color
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [todelete, setTodelete] = useState(false);
    const [confirm_visible, setConfirm] = useState(false);

    const [all, setAll] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selected, setSelected] = useState(null);
    
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("");
    
    const [dialog_text, setDialog_text] = useState("");

    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false)
        setDefault()
    };

    const fill_data = (data) =>{
        setAll(data)
    }
    const loadData = async () =>{
        try{
            const data = await get_all();
            fill_data(data.data.users)
            setRoles(data.data.roles)
            }catch(e){
                alert("Error de comunicacion con el servidor")
            }
        setLoading(false)
    }

    const setDefault = () =>{
        setDialog_text(`Está seguro de querer eliminar la categoría" ${selected?.name}`)
        setVisible(false);
        setConfirm(false);
        setSelected(null);
        
        setName('');
        setPassword('');
        setUsername('');
        setRol('');
        setTodelete(false)
    }

    const delete_data = async () =>{
        if(!todelete){
            setDefault()
            return;
        }
        setLoading(true);
        const data = await remove(selected._id);
        if(!data){
            setDialog_text('Error de servidor')
        }else{
            fill_data(data.data)
        }
        setLoading(false)
        setDefault()
    }

    const add_data = async () =>{
        setLoading(true);
        const data = await add(name,username, password, rol)
        if(!data){
            setDialog_text('Error de servidor')
        }else{
            fill_data(data.data)
        }
        setLoading(false)
        setDefault()
    }
    
    const edit_data = async () =>{
        setLoading(true);
        try{
            const data = await update(selected._id, name, username, password, rol)
            fill_data(data.data)
            setDefault()
        }catch(e){
            setDialog_text('Error de servidor')
            setVisible(false)
            setConfirm(true)
        }
        setLoading(false)
    }

    const onEdit = (it) =>{
        setSelected(it)
        setName(it.name);
        setUsername(it.username);
        setRol(it.role._id);
        setVisible(true)
    }

    useEffect( ()=>{
        loadData()
        setDefault()
    },[] )

const Items = all.map(it=>{
    let icon = "acocunt";
    let icon_color = color;
    switch(it.role.rol) {
        case 'Administrador':
            icon ="account-star"
            break;
        case 'Cocinero':
            icon ="account-network"
            icon_color = "red"
            break;
        case 'Cajero':
            icon ="account-cash"
            icon_color = "green"
            break;
        case 'Bartender':
            icon ="account-filter"
            icon_color = "blue"
            break;
        case 'Mesero':
            icon ="account-tie"
            icon_color = "black"
            break;
        default:
            icon ="account"
            break;
    }
        return <List.Item
                key={it._id}
                title={it.name}
                description={it.role.rol}
                left={() => <List.Icon color={icon_color} icon={icon} />}
                right={() => <>
                    <IconButton onTouchEnd={()=>{onEdit(it)}} icon="account-edit" iconColor='green' />
                    <IconButton onTouchEnd={()=>{setConfirm(true);setSelected(it);setTodelete(true)}} icon='trash-can' iconColor='red' />
                </>
            }
        />
  }) 

  return (<>
        { 
        loading ? 
        <SafeAreaView style={styles.container_center}>
            <ActivityIndicator animating={true} color={color} size='large'/>
            <Text>Cargando ...</Text>
        </SafeAreaView>
        :
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{margin:10}}>
            <List.Section>
              {Items}
            </List.Section>
            </ScrollView>
            <Dialog visible={confirm_visible} onDismiss={setDefault}>
                <Dialog.Title>Atención</Dialog.Title>
                <Dialog.Content>
                <Text variant="bodyMedium">{dialog_text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                <Button 
                    onTouchEnd={()=>{todelete ? delete_data() : setConfirm(false)}}
                  >Aceptar</Button>
                </Dialog.Actions>
            </Dialog>

            <Modal visible={visible} onDismiss={hideModal} style={styles.modal}>
                    <Card style={{padding:20}}>
                        <View style={{marginVertical:10}}>
                            <TextInput label="Nombre" value={name} onChangeText={text => setName(text)} />
                        </View>
                        <View style={{marginVertical:10}}>
                            <TextInput label="Usuario" value={username} onChangeText={text => setUsername(text)} />
                        </View>
                        <View style={{marginVertical:10}}>
                            <TextInput secureTextEntry={true} label="PIN" value={password} keyboardType='number-pad' onChangeText={text => setPassword(text)} />
                        </View>
                        <View style={{marginVertical:10}}>
                            <Picker
                                selectedValue={rol}
                                onValueChange={(itemValue) =>
                                    setRol(itemValue)
                                }>
                                {roles.map(it=>{
                                    return <Picker.Item key={it._id} label={it.rol} value={it._id} />
                                })}
                            </Picker>
                        </View>
                       

                        <Card.Actions>
                            <Button onTouchEnd={hideModal}>Cancelar</Button>
                            <Button 
                              onTouchEnd={selected ? edit_data : add_data}
                              >
                                {selected ? 'Actulizar' : 'Insertar'}
                            </Button>
                        </Card.Actions>
                    </Card>
                </Modal>

            {
            !visible ? 
                <IconButton 
                    style={styles.action_btn} 
                    size={40} 
                    mode='contained' 
                    icon="plus"
                    onPress={showModal} 
                />
            :
            <></>
            }
        </SafeAreaView>
    }
  </>
  );
}