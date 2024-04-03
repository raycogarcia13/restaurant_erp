import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Card, Dialog, IconButton, Modal, Text, TextInput } from 'react-native-paper';

import {styles, card_button} from "../../../src/styles/main"
import {get_all_tables, remove_table, add_table} from "../../../src/api/tables"
import Icon from 'react-native-paper/src/components/Icon';

export default function Tables() {
    const color = styles.primary_color
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [confirm_visible, setConfirm] = useState(false);

    const [tables, setTables] = useState([]);
    const [selected, setSelected] = useState(null);
    
    const [count, setCount] = useState('0');
    const [sillas, setSillas] = useState('4');

    const [dialog_text, setDialog_text] = useState("");

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const fill_data = (data) =>{
        let items = [];
        let subItem = [];
        for(const item of data){
            if(subItem.length == 2 ){
                items.push(subItem);
                subItem = [];
                subItem.push(item);
                if(items.length + subItem.length == data.length){
                    items.push(subItem);
                    subItem = [];
                }
            }else{
                subItem.push(item);
                if(items.length + subItem.length == data.length){
                    items.push(subItem);
                    subItem = [];
                }
            }
        }
        if(subItem.length >0){
            items.push(subItem);
        }
        setTables(items)
    }
    const loadTables = async () =>{
        const data = await get_all_tables();
        fill_data(data.data)
        setLoading(false)
    }

    const setDefault = () =>{
        setDialog_text(`Está seguro de querer eliminar la mesa" ${selected?.name}`)
        setVisible(false);
        setConfirm(false);
        setSelected(null);
        setCount('0');
        setSillas('4');
    }

    const deleteTable = async () =>{
        setLoading(true);
        const data = await remove_table(selected._id);
        if(!data){
            setDialog_text('Error de servidor')
        }else{
            fill_data(data.data)
        }
        setLoading(false)
        setDefault()
    }

    const addTable = async () =>{
        setLoading(true);
        const data = await add_table(count, sillas)
        if(!data){
            setDialog_text('Error de servidor')
        }else{
            fill_data(data.data)
        }
        setLoading(false)
        setDefault()
    }

    useEffect( ()=>{
        loadTables()
        setDefault()
    },[] )

const Items = tables.map(it=>{
    const subs = it.map(i=>{
        return <Card key={i._id} style={card_button.card_button}>
                <View style={card_button.center}>
                    <Icon source="dots-square" color={color} size={28} />
                    <Text variant="headlineSmall">Mesa {i.name}</Text>
                    <Text style={{textAlign:'center'}} variant="bodySmall">{i.chairs} Sillas</Text>
                </View>
                <Card.Actions>
                    <IconButton icon="delete" onTouchEnd={()=>{
                        setSelected(i);
                        setDialog_text(`Está seguro de querer eliminar la mesa ${i.name}`)
                        setConfirm(true)
                    }} iconColor='#c00000' />
                </Card.Actions>
            </Card>
    }) 
    return <View key={Math.random()+Date.now()} style={card_button.card_btn_row}>
        {subs}
      </View>
}) 

  return (<>
        { 
        loading ? 
        <SafeAreaView style={styles.container_center}>
            <ActivityIndicator animating={true} color={color} size='large'/>
            <Text>Cargando ...</Text>
        </SafeAreaView>
        :
        <SafeAreaView style={[styles.content,{flex:1}]}>
            <ScrollView style={ card_button.card_btn_container}>
                {Items}
            </ScrollView>
            <Dialog visible={confirm_visible} onDismiss={setDefault}>
                <Dialog.Title>Atención</Dialog.Title>
                <Dialog.Content>
                <Text variant="bodyMedium">{dialog_text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={deleteTable}>Aceptar</Button>
                </Dialog.Actions>
            </Dialog>

                <Modal visible={visible} onDismiss={hideModal} style={styles.modal}>
                    <Card style={{padding:20}}>
                        <View style={{marginVertical:10}}>
                            <TextInput label="Cantidad de mesas a insertar" keyboardType='number-pad' value={count} onChangeText={text => setCount(text)} />
                        </View>
                        <View style={{marginVertical:10}}>
                            <TextInput  label="Sillas por mesas" value={sillas} keyboardType='number-pad' onChangeText={text => setSillas(text)} />
                        </View>

                        <Card.Actions>
                            <Button onTouchEnd={hideModal}>Cancenlar</Button>
                            <Button onTouchEnd={addTable}>Insertar</Button>
                        </Card.Actions>
                    </Card>
                </Modal>

            <IconButton 
                style={styles.action_btn} 
                size={40} 
                mode='contained' 
                icon="plus"
                onPress={showModal} 
                />
        </SafeAreaView>
    }
  </>
  );
}