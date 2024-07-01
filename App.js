//import liraries
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';;
import {Theme} from 'react-native-basic-elements';
import AuthStack from './Src/Navigation/AuthStack';
import NavigationService from './Src/Services/Navigation';

const Stack = createStackNavigator();
// create a component
const App = () => {
 
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Theme.Provider>
        <NavigationContainer
          ref={r => NavigationService.setTopLevelNavigator(r)}>
          <Stack.Navigator
            initialRouteName="AppStack"
            screenOptions={{
              headerShown: false,
            }}>
                    <Stack.Screen name="AuthStack" component={AuthStack} />      
          </Stack.Navigator>
        </NavigationContainer>
      </Theme.Provider>
    </View>
  );
};

export default App;
