// DealsCard.js
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { moderateScale } from '../Constants/PixelRatio';
import { FONTS } from '../Constants/Fonts';

const DealsCard = ({ item, isSelected, onPress }) => {
  if (!item) {
    return null; 
  }

  return (
    <Pressable onPress={onPress} style={styles.main_view}>
      <View style={[styles.deals_box, { backgroundColor: isSelected ? 'red' : 'blue' }]}>
        <Text numberOfLines={2} style={styles.title_txt}>{item.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main_view: {
    marginTop: moderateScale(10),
  },
  deals_box: {
    padding: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(90),
    borderRadius: moderateScale(7),
    height: moderateScale(60),
  },
  title_txt: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: '#fff',
  },
});

export default DealsCard;
