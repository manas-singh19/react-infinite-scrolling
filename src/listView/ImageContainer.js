
import React,{memo} from 'react'
import { View ,StyleSheet,   TouchableOpacity, Dimensions   } from 'react-native'; 
import AutoHeightImage from 'react-native-auto-height-image';
const Width = Dimensions.get('window').width;  
let APIURL = 'https://api.makemyhouse.com/';
const ImageContainer = ({navigation, index ,data,projectId})=>{    
    
    return (  
           <>    
                        <TouchableOpacity key={index} activeOpacity={1}  onPress={()=>navigation.navigate('DetailedScreen',{projectId})} >  
                            <AutoHeightImage
                                width={Width} 
                                source={{ uri: `${APIURL}public/media/rimage/500/completed-project/${data}` }}
                            />
                        </TouchableOpacity>  
                
            </> 
    )
}

export default memo(ImageContainer);


const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 200,
      backgroundColor: '#DDDDDD',
      padding: 20,
    },
    slide: {
      width:'100%',
      height:'100%',  
      paddingRight:0,paddingEnd:0
    },
  });