import axios from 'axios';
import React,{useState,useEffect,useRef,memo} from 'react';
import { Image, Text, SafeAreaView, StyleSheet,Dimensions, FlatList, View, VirtualizedList, TouchableOpacity } from 'react-native'; 
let APIURL = 'https://api.makemyhouse.com/';
 
import { useNavigation } from '@react-navigation/native';

import ImageContainer from './imageContainer.js';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

let arrIds = new Array(); // store the project ids.
let arrDetails = new Array(); // store project details. 

export const DetailedScreen = ({navigation,route})=> {

    const navigationInit = useNavigation(); 

    const type = route?.params?.pagetype;  

    const [continueLoading,setContinuesLoading] = useState(false); 
    const [mainLoading,setMainLoading] = useState(true); 

    useEffect(()=>{
        arrIds = []; // make it empty 
        arrDetails = []; // make it empty 
        arrIds.push(route.params.projectId); 
    },[navigationInit]);   

    const Trendingapicall = async () => { 
        //  https://api.makemyhouse.com/public/projects?random=1&noOfProjects=4&exceptProjectID=3131  
        //  let url = `/public/projects?page=${page}&limit=9`;
        let url = `${APIURL}public/projects/project_details/${route.params.projectId}`;
         try {
             const response = await axios.get(url);    
             arrDetails.push(response.data);
         } catch (error) { 
             console.log(error);
         }finally{   
            setMainLoading(false);
            GetNextProjectsIDs();
         }
    }; 

     
    const GetNextProjectsIDs = async  ()=>{
        let url = `${APIURL}public/projects?random=1&noOfProjects=2&exceptProjectID=${arrIds[arrIds.length - 1]}`; 
        // let url = `${APIURL}public/projects?random=1&noOfProjects=1&exceptProjectID=13762`; 
        try{ 
            const response = await axios.get(url);   
            if( response.data != undefined){ 
                response.data.map((item,index)=>{ 
                    arrIds.push(item.projectID); 
                });
            } 
        }catch(error){
            console.log("get Next Project Ids",error);
        } 
        finally{
            AddNewProjectsDetails();
        }  
    }

    const AddNewProjectsDetails = ()=>{
        try{ 
            arrIds.map( async (item,index)=>{
                if(item !=  route.params.projectId){ 
                    let url = `${APIURL}public/projects/project_details/${item}`;
                    let response =await axios.get(url);   
                    arrDetails.push(response.data);
                } 
            });
        }
        catch(error){
            console.log(error);
        } 
    } 

     useEffect(()=>{ 
        Trendingapicall();
     },[navigation]);


    // VirtualizedList
    const getItemCount = (data,index) => data.length;
    const getItem  = (data,index)=>{ 
        return data[index];
    }
    
    const InfiniteLoading = async ()=>{
        if(continueLoading){
            return; 
        }
        let url = `${APIURL}public/projects?random=1&noOfProjects=2&exceptProjectID=${route.params.projectId}`; 
        let arrIdsTemp = new Array();
        try{ 
            setContinuesLoading(true); 
            const response = await axios.get(url);   
            if( response.data != undefined){ 
                response.data.map((item,index)=>{ 
                    arrIdsTemp.push(item.projectID);  
                    console.log("infinite scrolling IDs:--- ",item.projectID)
                });
            }  
        }
        catch(error){
            console.log(error)
        }finally{ 
            // here i have to run andother axios request to get the ids details  
            arrIdsTemp.map( async (item,index)=>{
                let url = `${APIURL}public/projects/project_details/${item}`;
                let response =await axios.get(url);   
                arrDetails.push(response.data);
                console.log("infinite scolling finally::---", item)
            })
            setContinuesLoading(false);  
        } 
    }

    // redner footer element 
    const renderFooter = ()=>{
        return continueLoading ? (
            <View style={{ padding: 10, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                  <Text>Loading...</Text>
            </View>
          ) : null;
    }
 

    return ( 
        <>
           {
            mainLoading == true?
            <View><Text>Loading...</Text></View>:
            <VirtualizedList
                data={arrDetails}
                initialNumToRender={2}
                renderItem={({ item,index }) =>   
                    <>
                        {/* <TouchableOpacity key={index} style={{backgroundColor:'yellow',padding:10}} onPress={()=>alert(item.h2Caption)}>
                            <Text  style={{width:'100%',height:540,padding:12,backgroundColor:'red', marginBottom:10}}>{"productId"} -- {index} {item.projectID} -- {item.imageDetail!=undefined? item.imageDetail[0].imgName :"undefined"}</Text>
                        </TouchableOpacity>  */}
                        <View key={index} style={{backgroundColor:'yellow',height:Height-65,borderColor:'#fff',borderBottomWidth:6}} >
                        
                                    {/* <View key={index} > 
                                           <Text>{item.imageDetail[index].imgName}</Text> 
                                    </View>    */}
                                    <View style={{position:'absolute',padding:8,backgroundColor:'blue',bottom:12,left:12,right:12,zIndex:999}}>
                                        <Text>{item.projectName}</Text>  
                                    </View>
                                    <ImageContainer navigation={navigation} imageData={item.imageDetail} />
                                    
                        </View>
                    </>
                }
                keyExtractor={(item,index) => index}
                getItemCount={getItemCount}
                getItem={getItem}
                onEndReached={InfiniteLoading}
                onEndReachedThreshold={0.6}
                ListFooterComponent={renderFooter}

                showsHorizontalScrollIndicator={false}  
                snapToAlignment={'start'}
                snapToInterval={Height-65}
                decelerationRate={'fast'}

            />
           }
        </>
        
           
         
    )
}
 