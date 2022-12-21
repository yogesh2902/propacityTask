import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import AuthScreen from './AuthScreen';
import MainStack from './MainStack';

const Stack = createStackNavigator();

export default function Routes() {
  // const userData = useSelector(state => state.auth.userData);
  // const isFirstTime = useSelector(state => state.isFirstTime.isFirstTime);

  return (
    <NavigationContainer>
      <Stack.Navigator>{MainStack(Stack)}</Stack.Navigator>
    </NavigationContainer>
  );
}
