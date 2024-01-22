import React,{useRef, useState,useEffect} from 'react'
import {VirtualizedList,  View, StyleSheet,  Dimensions , Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native' 
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import ImageContainer from './imageContainer';

let APIURL = 'https://api.makemyhouse.com/';  
const Width = Dimensions.get('window').width;  
const Height = Dimensions.get('window').height;

var project = new Array();  

export default DetailedScreen =({ navigation,route }) => {   
    const navigationInit = useNavigation(); 
 
    // project ids 
    const [projectIds,setProjectIds] = useState([]);
    const arrIds = useRef([]);

    // project details 
    const [projectDetailes,setProjectDetailes] = useState([]);
    const arrProjectDetails = useRef([]);
 
    useEffect(()=>{ 
      arrIds.current = []; // empty arrIds
      arrProjectDetails.current = [] // empty arrProject
      arrIds.current  = route.params.projectId ;
      setProjectIds([arrIds.current]); 
    },[]);

    
  // useEffect runs when got the first product Id
  useEffect(()=>{ 
    if(projectIds.length == 1){
      Trendingapicall();  
    } 
  },[projectIds]);


  // Trendingapicall
  const Trendingapicall = async () => {   
      if( projectIds != undefined && projectIds.length>0){ 
      console.log("Trendingapicall Call");
      // console.log("projectIds: 1: ", projectIds); 
        try{
          let url = `${APIURL}public/projects/project_details/${projectIds[0]}`; 
          const response = await axios.get(url);   
          if(response.data.length>0){  
            arrProjectDetails.current = response.data; 
          }  
        }
        catch(error){
          console.log(error);
          return error;
        }
        finally{
          console.log("Trendingapicall finally Call" );
          setProjectDetailes([arrProjectDetails.current]); 
          // GetNextProjectsIDs();
        }
      }else{
          console.log("else condition Trendingapicall");
      }
  }; 
 
   
  // run when received first project details. 
  useEffect(()=>{
    if(projectDetailes != undefined && projectDetailes.length == 1){ 
      GetNextProjectsIDs();  
    }else{
      console.log('Project details length is longer ')
    }
  },[projectDetailes]); 

   
  // now get the next projects details. 
  const GetNextProjectsIDs = async  ()=>{ 
    if(projectDetailes != undefined || projectDetailes.length == 1){ 
      console.log("GetNextProjectsIDs Call")
      let url = `${APIURL}public/projects?random=1&noOfProjects=4&exceptProjectID=${projectIds[projectIds.length - 1]}`; 
      try{ 
          const response = await axios.get(url);    
          if( response.data.length > 0 ){ 
              response.data.map((item,index)=>{     
                  setProjectIds((prevState) => [...prevState, item.projectID]);
              });
          } 
      }catch(error){
          console.log("get Next Project Ids:---",error); 
          return error;
      } 
      finally{
          console.log("GetNextProjectsIDs finally call") 
        } 
    }else{
      console.log("else condition GetNextProjectsIDs");
    } 
  }
  
  useEffect(()=>{
    if(projectIds.length == 5){ 
      console.log(projectIds);
      AddNewProjectsDetails();
    }  
  },[projectIds]);
   
  // get next ids data
  const AddNewProjectsDetails = () =>{ 
    console.log("AddNewProjectsDetials call");
    try{
      if(projectIds != undefined && projectIds.length == 5){
          console.log("projectIds:1:::::::::: ",projectIds); 
          projectIds.map( async (item,index)=>{ 
            if(item != projectIds[0]){
              let url = `${APIURL}public/projects/project_details/${item}`;
              let response = await axios.get(url);    
              console.log(index); 
              setProjectDetailes((prevState) => [...prevState, response.data]);
            }
          })

      }else{
        console.log("else condition AddNewProjectsDetails")
      }
    }
    catch(error){
      console.log(error);
      return error;
    }
    finally{
      console.log("AddNewProjectsDetials finally call");  
    }
  } 
   
  

  // start: VirtualizedList
  const [continueLoading,setcontinueLoading]  = useState(false);
  const getItemCount = (data,index) => data.length;
  const getItem  = (data,index)=>{ 
      return data[index];
  } 
  // redner footer element 
  const renderFooter = ()=>{
    return continueLoading ? (
        <View style={{ padding: 10, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
              <Text>Loading...</Text>
        </View>
      ) : null;
  } 

  const infiniteScrolling = async ()=>{
    
    if(projectIds.length >= 5 && projectDetailes.length >= 5){
      console.log('run infinite scrolling : if');
      // now here we add new items into the system...
      let arrIdsTemp = new Array();
      let url = `${APIURL}public/projects?random=1&noOfProjects=5&exceptProjectID=${projectIds[projectIds.length - 1]}`; 
      try{
        const response = await axios.get(url);
        console.log(response.data);
        response.data.map((item,index)=>{
          arrIdsTemp.push(item.projectID);
        })
      }   
      catch(error){
        return error;
      }
      finally{
        if(arrIdsTemp.length > 0){
          arrIdsTemp.map( async (item,index)=>{
            let url = `${APIURL}public/projects/project_details/${item}`;
            let response = await axios.get(url);
            setProjectDetailes((prevState) => [...prevState, response.data]);
          })
        }
      } 
    }else{
      console.log('run infinite scrolling : else');
    }
  } 
  // end: VirtualizedList
  return (
      <View>
          <View style={{height:60,width:'100%',padding:8,backgroundColor:'#f1f1f1',borderBottomColor:'#212121',borderBottomWidth:1,flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>   
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{fontSize:16,color:"#000"}}>Back</Text>
              </TouchableOpacity> 
              <Text style={{fontSize:16,marginLeft:20,color:"#000"}}>Detailed Screen</Text>
          </View>
          {
            projectDetailes.length >=5 ?
            <>
          
              <VirtualizedList
                data={projectDetailes}
                initialNumToRender={2}
                renderItem={({ item,index }) =>   
                    <> 
                        <View key={index} style={{backgroundColor:'rgba(0,0,0,0.3)',padding:0,height:Height-60,borderColor:'#fff',borderBottomWidth:6}} > 
                            <ImageContainer navigation={navigation} imageData={item.imageDetail}/> 
                        </View>
                    </>
                }
                keyExtractor={(item,index) => index}
                getItemCount={getItemCount}
                getItem={getItem}
                onEndReached={infiniteScrolling}
                onEndReachedThreshold={0.6}
                ListFooterComponent={renderFooter}

                
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}  
                snapToAlignment={'start'}
                snapToInterval={Height-60}
                decelerationRate={'fast'}

                removeClippedSubviews={true}
                lazy={false} 
                pagingEnabled

              />

            </>
            :  
            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',height:90}}>
              <Text>Loading...</Text> 
            </View>
          }

      </View>
    )
}