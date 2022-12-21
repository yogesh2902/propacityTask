import React from 'react';
import navigationStrings from '../constants/navigationStrings';
import {Home} from '../Screens';
import Albums from '../Screens/Albums/Albums';
import Splash from '../Screens/Splash/Splash';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.SPLASH}
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ALBUMS}
        component={Albums}
        options={{headerShown: false}}
      />
    </>
  );
}
