import React,{useState, memo, useEffect, useRef} from 'react'
import { Text, FlatList, View,Dimensions, Image,StyleSheet,  ImageBackground  } from 'react-native'; 
import Swiper from 'react-native-swiper';   
import AutoHeightImage from 'react-native-auto-height-image';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
let APIURL = 'https://api.makemyhouse.com/';

// image contianer 
const ImageContainer = ({navigation, imageData})=>{
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    // useEffect(() => { 
    //     if(flatListRef.current){
    //         flatListRef.current.addListener('scroll', handleScroll);    
    //     }
    //     // flatListRef.current.addListener('scroll', handleScroll);
    //     return () => {
    //         if(flatListRef.current){
    //             // flatListRef.current.removeAllListeners('scroll');
    //             flatListRef.current.removeListener('scroll', handleScroll);
    //         }
    //     };
    // }, []);

    // const handleScroll = (event) => {
    //     const viewSize = event.nativeEvent.layoutMeasurement.width;
    //     const contentOffset = event.nativeEvent.contentOffset.x;
    //     const index = Math.floor(contentOffset / viewSize);
    //     if (index !== activeIndex) {
    //       setActiveIndex(index);
    //     }
    // };
   


    return(
        <>  
            <Text style={{position:'absolute',padding:8,backgroundColor:'black',top:12,right:12,zIndex:999,color:'#fff'}}>{activeIndex + 1} / {imageData?imageData.length:activeIndex+1}</Text>
            <View style={{width:Width,height:'100%',backgroundColor:'#f2f2f2'}}>
                 {/* <Swiper  animated={true}  showsPagination={false} pagingEnabled={true} bounces={true} removeClippedSubviews={true} 
                    onIndexChanged={setActiveIndex} loadMinimal={true} loadMinimalLoader={ <Text>Loading....</Text>} loop={false} useNativeDriver={false} style={{ pointerEvents: "box-none" }} >
                        {
                            imageData&&
                            (imageData.length > 0? 
                                (imageData.map((item,index)=>{
                                    return  <ImageBackground key={index} source={{uri:`${APIURL}public/media/rimage/500/completed-project/${item.img}`}}  blurRadius={50}  resizeMode="cover" style={styles.image}>
                                                    
                                                     <AutoHeightImage
                                                        width={Width} 
                                                        source={{ uri:  `${APIURL}public/media/rimage/500/completed-project/${item.img}` }}
                                                    />
                                            </ImageBackground>  
                                })) 
                                :<Text>No data</Text>)
                        }  
                    </Swiper> */}

                    <FlatList
                        ref={flatListRef} 
                        data={imageData}
                        renderItem={({ item,index }) =>   

                           <ImageBackground key={index} source={{uri:`${APIURL}public/media/rimage/500/completed-project/${item.img}`}}  blurRadius={50}  resizeMode="cover" style={styles.image}>
                                {/* <Text style={{position:'absolute',padding:8,backgroundColor:'black',top:12,right:12,zIndex:999,color:'#fff'}}>{index+1} / {imageData?imageData.length:activeIndex+1}</Text>                                                     */}
                                <AutoHeightImage
                                    width={Width} 
                                    source={{ uri:  `${APIURL}public/media/rimage/500/completed-project/${item.img}` }}
                                />
                            </ImageBackground>  
                        
                        }
                        keyExtractor={(item,index) => index} 
                        horizontal

                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}  
                        snapToAlignment={'start'}
                        snapToInterval={Width}
                        decelerationRate={'fast'}
        
                        removeClippedSubviews={true}
                        lazy={false}
        
                        pagingEnabled
                        onScroll={(event) => {
                            const viewSize = event.nativeEvent.layoutMeasurement.width;
                            const contentOffset = event.nativeEvent.contentOffset.x;
                            const index = Math.floor(contentOffset / viewSize);
                            if (index != activeIndex) {
                              setActiveIndex(index);
                            }
                        }}
                    />

            </View> 
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
    image: {
         
        justifyContent: 'center',
        width:Width
      },
  });