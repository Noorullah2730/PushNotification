import { StyleSheet, Text, View ,Alert} from 'react-native'
import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react'

const App = () => {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        
    }
}

const getToken = async() =>{
  const token = await messaging().getToken()
  console.log("Token = " ,token)
}

useEffect(() => {
  requestUserPermission()
  getToken()

  // Set up background message handler
  const backgroundMessageHandler = async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  };
  messaging().setBackgroundMessageHandler(backgroundMessageHandler);

  //when the app is in foreground
  const foregroundMessageHandler = async (remoteMessage) => {
    if (remoteMessage.notification) {
      Alert.alert('Notification', remoteMessage.notification.body);
    }
  };

  const unsubscribe = messaging().onMessage(foregroundMessageHandler);

  return unsubscribe;

},[])
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Push Notification 4</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'purple',
    
  }
})