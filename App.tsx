import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import router from './app/router/index';
import Config from 'react-native-config';
const Stack = createNativeStackNavigator();
import {getAxios} from './app/utils/axios';
export default function App() {
  console.error(Config.API_URL, '---Config');
  // //配置接口
  // const getConfig = () => {
  //   getAxios({
  //     url: `${Config.API_URL}/mouth/config/index`,
  //   });
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {router.map((cell, idx) => {
          return (
            <Stack.Screen
              key={idx}
              name={cell.name}
              component={cell.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
