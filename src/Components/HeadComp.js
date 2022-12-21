import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import imagePath from '../constants/imagePath';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../styles/fontFamily';

const HeadComp = ({name = 'rishi', onBack}) => {
  return (
    <View style={styles.topView}>
      <View style={{flex: 0.1, alignItems: 'flex-start'}}>
        <TouchableOpacity onPress={onBack}>
          <Image source={imagePath.back} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.9, alignItems: 'center', right: '10%'}}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </View>
  );
};

export default HeadComp;

const styles = StyleSheet.create({
  topView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    height: 50,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.black,
  },
});
