
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-basic-elements';

const PackCard = ({ title, price, savings }) => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.savings}>Save up to {savings}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, flex: 1 ,alignItems:'center'}}>
                <Text style={styles.price}>{price}</Text>
                <Icon name="pluscircle" type='AntDesign' color="green" />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginRight:10,
        marginTop:10
    },
    title: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    savings: {
        color: 'gray',
        fontSize: 10,
    },
    price: {
        fontSize: 10,
        color: 'green',
        fontWeight: 'bold',
        marginVertical: 5,
    },

});

export default PackCard;

