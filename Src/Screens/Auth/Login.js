// Import necessary modules
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppButton, AppTextInput, StatusBar } from 'react-native-basic-elements';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { height } = Dimensions.get('screen');

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isStrongPassword = (password) => {
    if (password.length < 6) {
      Toast.show('Please ensure it is at least 6 characters long, For example: "indUS#123"', Toast.SHORT);
      return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  };

  const getLogin = async () => {
    if (username == '') {
      Toast.show('Enter Username', Toast.SHORT);
      return;
    }

    if (password == '') {
      Toast.show('Enter Password', Toast.SHORT);
      return;
    }

    if (!isStrongPassword(password)) {
      return;
    }

    try {
      await AsyncStorage.setItem('@user_username', username);
      await AsyncStorage.setItem('@user_password', password);
      NavigationService.navigate('Home', { username, password });
    } catch (error) {
      Toast.show('Failed to save the data to the storage', Toast.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle='dark-content' />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main_view}>
          <Image source={require('../../Assets/img/logB_logo.png')} style={styles.logo_styl} />
          <Text style={styles.title_txt}>Welcome Back!</Text>
          <AppTextInput
            value={username}
            onChangeText={(val) => setUsername(val)}
            leftIcon={{
              name: 'user',
              type: 'FontAwesome',
              size: 18,
            }}
            keyboardType='default'
            mainContainerStyle={styles.appTxt_mainContainer}
            inputContainerStyle={styles.appTxt_inputContainer}
            placeholder="Username"
            inputStyle={styles.placeholder_txt}
          />
          <AppTextInput
            value={password}
            onChangeText={(val) => setPassword(val)}
            leftIcon={{
              name: 'locked',
              type: 'Fontisto',
              size: 18,
            }}
            keyboardType='visible-password'
            mainContainerStyle={styles.appTxt_mainContainer}
            inputContainerStyle={styles.appTxt_inputContainer}
            placeholder="Password"
            inputStyle={styles.placeholder_txt}
          />
          <AppButton
            shadow={true}
            title='Login'
            textStyle={styles.button_txt_sty}
            style={styles.button_sty}
            onPress={() => getLogin()}
          />
          <Text style={styles.forgot_password_txt}>Forgot Password?</Text>
          <Text style={styles.bottom_txt}>@indus V .0.1</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main_view: {
    backgroundColor: '#fff',
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    elevation: 5,
    marginTop: height / 10,
    marginBottom: moderateScale(20)
  },
  logo_styl: {
    height: moderateScale(90),
    width: moderateScale(90),
    alignSelf: 'center',
  },
  title_txt: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(25),
    color: '#000',
    textAlign: 'center',
    marginTop: moderateScale(15)
  },
  placeholder_txt: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(6)
  },
  appTxt_mainContainer: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  appTxt_inputContainer: {
    borderRadius: moderateScale(5),
    height: moderateScale(48),
    paddingHorizontal: moderateScale(15)
  },
  login_txt: {
    fontFamily: FONTS.bold,
    fontSize: moderateScale(16),
    color: 'rgba(255, 253, 253, 0.70)'
  },
  button_sty: {
    backgroundColor: '#4C3BCF',
    marginTop: moderateScale(25),
    height: moderateScale(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_txt_sty: {
    fontFamily: FONTS.bold,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    color: '#fff'
  },
  forgot_password_txt: {
    fontFamily: FONTS.regular,
    fontSize: moderateScale(14),
    color: '#4C3BCF',
    textAlign: 'center',
    marginTop: moderateScale(25),
  },
  bottom_txt: {
    fontFamily: FONTS.regular,
    fontSize: moderateScale(11),
    color: '#999',
    textAlign: 'center',
    marginTop: moderateScale(15),
  }
});

// Make this component available to the app
export default Login;
