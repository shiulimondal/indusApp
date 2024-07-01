// Import necessary modules
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import HomeHeader from '../../Components/Header/HomeHeader';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import DealsCard from '../../Components/DealsCard';
import Modal from "react-native-modal";
import { AppButton, Icon, RadioButton } from 'react-native-basic-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PackCard from '../../Components/PackCard';

const { height, width } = Dimensions.get('screen');

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selected, setSelected] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
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

  const toggleModal = (item) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  const dealsData = [
    { title: 'Tuesday Deal' },
    { title: 'Special Deals' },
    { title: 'Indian Menu' },
    { title: 'Nepalese and Indo-Chinese' },
    { title: 'Vegetarian-Entree' },
    { title: 'Non-Vegetarian-Entree' },
    { title: 'Indus Special Entree Combo' },
    { title: 'Indus Designer Curries' },
    { title: 'Indus Chefs Special' },
    { title: 'Seafood Lovers' },
    { title: 'Vegetable Vegan Curry' },
    { title: 'Favourite Lentils' },
  ];

  const packData = [
    {
      id: '1',
      titleT: 'Single Pack',
      price: '$24.90',
      savings: '$8.90',
    },
    {
      id: '2',
      titleT: 'Couples Pack',
      price: '$43.90',
      savings: '$11.90',
    },
    {
      id: '3',
      titleT: 'Family Pack (4 People)',
      price: '$73.90',
      savings: '$16.90',
    },
  ];

  return (
    <View>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.main_view}>
        {dealsData.map((item, index) => (
          <DealsCard
            item={item}
            key={index}
            isSelected={selectedItem === item}
            onPress={() => toggleModal(item)}
          />
        ))}
      </View>

      <View style={{flexDirection:'row',marginHorizontal:10,marginTop:20}}>
        {packData.map((item, index) => (
          <PackCard
            title={item.titleT}
            price={item.price}
            savings={item.savings}
          />
        ))}
      </View>

      </ScrollView>
      
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.model_top}>
            <Text style={styles.user_name}>{userName}</Text>
            <Icon name='pen' type='FontAwesome5' size={12} />
          </View>
          <View style={styles.model_box_view}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.singlepack_txt}>SinglePack - Save up to $8.90{' '}<Text style={{ color: '#4C3BCF' }}>- 3 +<Text style={{ color: 'green' }}>{'      '}$24.90</Text></Text></Text>
              <Icon name='pen' type='FontAwesome5' size={12} />
            </View>
            <Text style={styles.spice_txt}>How Spise?</Text>
            <Text style={{ ...styles.spice_txt, marginTop: 3 }}>•{' '}<Text style={{ color: '#000' }}>Med</Text></Text>
            <Text style={styles.spice_txt}>Choose Rice Dishes</Text>
            <Text style={{ ...styles.spice_txt, marginTop: 3 }}>•{' '}<Text style={{ color: '#000' }}>Rice Dishes $3.00</Text></Text>
            <Text style={{ ...styles.spice_txt, marginTop: 3 }}>•{' '}<Text style={{ color: '#000' }}>Coconut Dishes $4.00</Text></Text>
          </View>
          <View style={styles.model_middle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.item_name}>Total Item</Text>
              <Text style={styles.item_name}>3</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.item_name}>Discount</Text>
              <Text style={styles.item_name}>0%</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.item_name}>Total </Text>
              <Text style={styles.item_name}>$67.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                selected={selected}
                onChange={(val) => setSelected(val)}
                size={16}
                inactiveColor={'#4C3BCF'}
                containerStyle={{ borderWidth: 1 }}
              />
              <Text style={styles.cash_txt}>Cash</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
              <RadioButton
                selected={selected}
                onChange={(val) => setSelected(val)}
                size={16}
                inactiveColor={'#4C3BCF'}
                containerStyle={{ borderWidth: 1 }}
              />
              <Text style={styles.cash_txt}>Card</Text>
            </View>
          </View>
          <AppButton
            shadow={true}
            title='Pay Now'
            textStyle={styles.button_txt_sty}
            style={styles.button_sty}
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main_view: {
    marginTop: moderateScale(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: moderateScale(15)
  },
  shdow_view: {
    borderRadius: moderateScale(25),
  },
  title_view: {
    backgroundColor: 'rgba(19,22,21,255)',
    borderRadius: moderateScale(25),
    padding: moderateScale(15),
    marginLeft: moderateScale(2)
  },
  title_txt: {
    fontFamily: FONTS.bold,
    fontSize: moderateScale(15),
    color: 'rgba(255, 253, 253, 0.70)',
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    borderColor: '#4C3BCF',
    borderWidth: 2
  },
  model_top: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  user_name: {
    fontFamily: FONTS.semibold,
    fontSize: moderateScale(16),
    color: '#000',
  },
  model_box_view: {
    borderWidth: 1,
    borderColor: '#999',
    padding: moderateScale(10),
    marginTop: moderateScale(15),
    borderRadius: moderateScale(7)
  },
  singlepack_txt: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(11),
    color: '#000'
  },
  spice_txt: {
    color: '#4C3BCF',
    fontFamily: FONTS.semibold,
    fontSize: 12,
    marginTop: moderateScale(7)
  },
  model_middle: {
    backgroundColor: '#4C3BCF',
    marginTop: moderateScale(15),
    borderRadius: moderateScale(7),
    padding: moderateScale(10)
  },
  item_name: {
    color: '#fff',
    fontFamily: FONTS.semibold,
    fontSize: 13
  },
  cash_txt: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    marginLeft: moderateScale(8)
  },
  button_sty: {
    backgroundColor: '#4C3BCF',
    marginTop: moderateScale(25),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center'
  },
  button_txt_sty: {
    fontFamily: FONTS.bold,
    fontSize: moderateScale(13),
    alignSelf: 'center',
    color: '#fff'
  },
});

// Make this component available to the app
export default Home;
