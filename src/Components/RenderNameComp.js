import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';

const RenderNameComp = ({item, index}) => {
  const sliceColor = [
    '#F44336',
    '#2196F3',
    '#FFEB3B',
    '#4CAF50',
    '#FF9800',
    '#00FF00',
    '#FF00FF',
    '#FFC0CB',
    '#00008B',
    '#00FFFF',
  ];
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
