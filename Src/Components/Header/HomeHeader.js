// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from '../../Constants/PixelRatio';
import { Icon, StatusBar } from 'react-native-basic-elements';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';

// Get screen dimensions
const { height, width } = Dimensions.get('screen');

const HomeHeader = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user_username');
        if (storedUser !== null) {
          setUserName(storedUser);
        }
      } catch (error) {
        console.log('Failed to fetch the data from storage', error);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user_username');
      await AsyncStorage.removeItem('@user_password');
      NavigationService.navigate('Login');
    } catch (error) {
      console.log('Failed to clear the async storage data', error);
    }
  };

  return (
    <View style={{ ...styles.box, backgroundColor: '#4C3BCF' }}>
      <StatusBar backgroundColor={'#4C3BCF'} barStyle='light-content' />
      <View style={styles.inner_box}>
        <Text style={{ ...styles.user }}>Hey, {userName}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={logout}>
            <Icon name='log-out' type='Feather' color={'#fff'} size={25} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  box: {
    height: moderateScale(60),
    width: width,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  inner_box: {
    marginHorizontal: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    fontFamily: FONTS.semibold,
    fontSize: moderateScale(16),
    marginTop: moderateScale(5),
    color: '#fff',
  },
});

// Make this component available to the app
export default HomeHeader;
