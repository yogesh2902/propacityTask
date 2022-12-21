import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import {getItem} from '../../utils/utils';

const Splash = ({navigation}) => {
  useEffect(() => {
    checkScreen();
  }, []);

  const checkScreen = async () => {
    const res = await getItem('screenName');
    if (res && res === 'home') {
      setTimeout(() => {
        navigation.replace(navigationStrings.HOME);
      }, 1000);
    } else if (res && res === 'album') {
      setTimeout(() => {
        navigation.replace(navigationStrings.ALBUMS);
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.replace(navigationStrings.HOME);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={imagePath.splash} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
