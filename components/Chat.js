import { useState, useEffect } from 'react';
import CustomActions from './CustomActions';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { MapView } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, color, userID } = route.params;

  //created messages state
  const [messages, setMessages] = useState([]);

  //called the onSend() function addMessage()
  const addMessage = async (newMessages) => {
    const newMessageRef = await addDoc(
      collection(db, 'messages'),
      newMessages[0]
    );

    if (!newMessageRef.id) {
      Alert.alert('Unable to add. Please try later');
    }
  };

  let unsubMessages;

  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      unsubMessages = onSnapshot(
        query(collection(db, 'messages'), orderBy('createdAt', 'desc')),
        (documentsSnapshot) => {
          let newMessages = [];
          documentsSnapshot.forEach((doc) => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            });
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        }
      );
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  const renderBubble = (props) => {
    const isUserOnline = isConnected;

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: isUserOnline ? '#1B998B' : '#D83B3B', // this changes the bubble color when offline.
          },
          left: {
            backgroundColor: isUserOnline ? '#eddea4' : '#bebbbb', // this changes the bubble color when offline.
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null; // dont render the inputtoolbar when offline
    }
  };

  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0933,
            longitudeDelta: 0.0431,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={(message) => addMessage(message)}
        user={{
          _id: userID,
          name: name,
        }}
        renderActions={renderCustionActions}
        renderCustomView={renderCustomView}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
