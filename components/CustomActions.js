import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
  //const [image, setImage] = useState(null);

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

  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
    }

    if (!permission.cancelled) setImage(result.assets[0]);
    else Alert.alert("Permissions haven't been granted.");
  };

  const takePicture = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission?.granted) {
      let result = await ImagePicker.launchCameraAsync();
    }

    if (!permission.cancelled) setImage(result.assets[0]);
    else Alert.alert("Permissions haven't been granted.");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}></Text>
      </View>
    </TouchableOpacity>
    // <View style={styles.container}>
    //   <Button title="Pick an image from the library" onPress={pickImage} />
    //   <Button title="Take a photo" onPress={takePhoto} />
    // </View>
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
