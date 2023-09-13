import { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const image = require('../media/images/background-image.png');

const backgroundColors = {
  a: '#DBCFB0',
  b: '#BFC8AD',
  c: '#90B494',
  d: '#718F94',
};

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(backgroundColors.d);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
        <Text style={styles.appTitle}>App title</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
            placeholderTextColor='#BFC8AD'
          />
          <Text style={styles.colorSelector}>Choose background color:</Text>
          <View style={styles.selectColorElement}>
            <TouchableOpacity
              style={[styles.circle, { backgroundColor: backgroundColors.a }]}
              onPress={() => setColor(backgroundColors.a)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.circle, { backgroundColor: backgroundColors.b }]}
              onPress={() => setColor(backgroundColors.b)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.circle, { backgroundColor: backgroundColors.c }]}
              onPress={() => setColor(backgroundColors.c)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.circle, { backgroundColor: backgroundColors.d }]}
              onPress={() => setColor(backgroundColors.d)}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Chat', { name: name, color: color })
            }
          >
            <Text style={styles.buttonText}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    padding: '6%',
  },
  appTitle: {
    flex: 2,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#000000',
    padding: '6%',
  },
  textInput: {
    fontSize: 18,
    fontWeight: '300',
    color: '#BFC8AD',
    padding: 15,
    borderWidth: 1,
    borderColor: '#BFC8AD',
    marginTop: 15,
    marginBottom: 15,
  },
  selectColorElement: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  colorSelector: {
    fontSize: 16,
    fontWeight: '300',
    color: '#90B494',
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#BFC8AD',
    padding: 10,
  },
  buttonText: {
    color: '#000', // Text color for the button
    fontSize: 18, // Font size
    fontWeight: 'bold',
  },
});

export default Start;
