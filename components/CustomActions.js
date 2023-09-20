import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  userID,
  storage,
}) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      'Choose Picture From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePicture();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  const sendAndUploadImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    const newUploadRef = ref(storage, uniqueRefString);
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      console.log('File has been uploaded');
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      //   if (!permissions.cancelled) {
      //     const imageURI = result.assets[0].uri;
      //     const uniqueRefString = generateReference(imageURI);
      //     const response = await fetch(imageURI);
      //     const blob = await response.blob();
      //     const newUploadRef = ref(storage, uniqueRefString);
      //     uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      //       console.log('File has been uploaded');
      //       const imageURL = await getDownloadURL(snapshot.ref);
      //       onSend({ image: imageURL });
      //     });
      //   }
      if (!permissions.cancelled)
        await sendAndUploadImage(result.assets[0].uri);
    } else Alert.alert("Permissions haven't been granted.");
  };

  const takePicture = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      //   if (!permissions.cancelled) {
      //     const imageURI = result.assets[0].uri;
      //     const uniqueRefString = generateReference(imageURI);
      //     const response = await fetch(imageURI);
      //     const blob = await response.blob();
      //     const newUploadRef = ref(storage, uniqueRefString);
      //     uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      //       console.log('File has been uploaded');
      //       const imageURL = await getDownloadURL(snapshot.ref);
      //       onSend({ image: imageURL });
      //     });
      //   }
      if (!permissions.cancelled)
        await sendAndUploadImage(result.assets[0].uri);
    } else Alert.alert("Permissions haven't been granted.");
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert('Error occurred while fetching location.');
    } else Alert.alert("Permissions haven't been granted.");
  };

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split('/')[uri.split('/').length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel='More options'
      accessibilityHint="Let's you choose to send an image or your geolocation."
      accessibilityRole='button'
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;
