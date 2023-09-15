import Start from './components/Start';
import Chat from './components/Chat';

import { useEffect } from 'react';
import { Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// importing firestore db
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';

//importing useNetInfo for keeping track of networks connectivity and update in real time
import { useNetInfo } from '@react-native-community/netinfo';

// This is the apps main chat component that renders the chat UI
const App = () => {
  const connectionStatus = useNetInfo();
  // this is the web apps firenase config
  const firebaseConfig = {
    apiKey: 'AIzaSyDR1tRg1RdtSSM1GMFx7mDjEjtcWpcQkfw',
    authDomain: 'chatapp-ff312.firebaseapp.com',
    projectId: 'chatapp-ff312',
    storageBucket: 'chatapp-ff312.appspot.com',
    messagingSenderId: '849068510001',
    appId: '1:849068510001:web:39a118e616e289ead33e10',
  };
  // initialize firebase
  const app = initializeApp(firebaseConfig);

  //throwing error if no internet
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('no internet connection');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // initialize cloud firestore and get a ref to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
