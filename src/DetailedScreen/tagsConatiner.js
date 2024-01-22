import React,{useState, memo, useEffect} from 'react'
import { Text, View, Image,StyleSheet,   TouchableOpacity,   } from 'react-native'; 
import Swiper from 'react-native-swiper';   
import { useNavigation } from '@react-navigation/native';

const TagsConatiner = ({tagsData}) => {
  const navigationInit = useNavigation(); 

  useEffect(()=>{
    console.log("tagsData:--------", tagsData);
    if(tagsData.length > 6){
        console.log(tagsData.split(tagsData.length/2));
    }
  },[navigationInit]);

  return ( 
    <Text>TagsConatiner</Text>
  )
}


export default memo(TagsConatiner);