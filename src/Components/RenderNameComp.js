import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import {sliceColor} from '../constants/constants';

const RenderNameComp = ({item, index}) => {
  return (
    <View style={styles.rowView}>
      <View
        style={{
          ...styles.roundView,
          backgroundColor: sliceColor[index],
        }}
      />
      <Text style={styles.nameText}>{item.name}</Text>
    </View>
  );
};

export default RenderNameComp;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roundView: {
    height: 22,
    width: 22,
    borderRadius: 11,
  },
  nameText: {
    fontSize: 20,
    fontFamily: fontFamily.regular,
    color: colors.userTxt,
    marginLeft: 15,
  },
});
