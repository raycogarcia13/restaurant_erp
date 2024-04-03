import { StyleSheet, Platform, StatusBar , Dimensions} from 'react-native';

const width =  Dimensions.get('window').width;
const heigth =  Dimensions.get('window').height;

exports.styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS==="android"? StatusBar.currentHeight+10 : 10,
    },
    content:{
       
    },
    container_center:{
        flex:1,
        paddingTop:Platform.OS==="android"? StatusBar.currentHeight+10 : 10,
        alignItems:'center',
        justifyContent:'center'
    },
    login_container:{
        width:width*(7/8),
        backgroundColor:'rgba(255,255,255,0)'
    },
    login_signature:{
        backgroundColor:'rgba(255,255,255,0)',
        position:'absolute',
        bottom:10,
        textAlign:'center'
    },
    primary_color:"#f7ac03",
    action_btn:{
        position:'absolute',
        bottom:20,
        right:20
    },
    view_modal:{
        width:width,
    },
    modal:{
        // padding:10,
        // backgroundColor:'rgba(255,255,255,0.5)'
    }
})

exports.card_button = StyleSheet.create({
    card_btn_container:{
        margin:10,
    },
    card_btn_row:{
        flexDirection:'row',
    },
    card_button:{
        paddingTop:10,
        width:width/2.4,
        minHeight:heigth/4,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        margin:10,
        flex:1
    },
    center:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    product:{
        heigth:heigth/4,
        minHeight:heigth/4,
        flex:1,
        marginVertical:10,
        flexDirection:'row',
        boxShadow: "3px",
        borderRadius:20
    },
    product_image:{
        minWidth:width/2.4,
        width:width/2.4,
        borderRadius:20
    },
    image_menu:{
        minWidth:width/5,
        width:width/5,
        borderRadius:20
    },
    product_info:{
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        flex:1,
        flexWrap: 'wrap'
    }

})