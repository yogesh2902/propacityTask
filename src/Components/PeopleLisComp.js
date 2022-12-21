import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import {LIST_ALBUMS} from '../config/urls';
import axios from 'axios';
import {setItem} from '../utils/utils';

const PeopleLisComp = ({item, index}) => {
  const navigation = useNavigation();

  const [albumNo, setAlbumNo] = useState(0);

  useEffect(() => {
    getAlbums();
  }, []);

  const onClick = () => {
    setItem('userDetails', {
      userid: item.id,
      username: item.name,
      mainScreen: true,
    });
    navigation.navigate(navigationStrings.ALBUMS);
  };

  const getAlbums = () => {
    let values = [];
    axios
      .get(LIST_ALBUMS)
      .then(itm => {
        for (let i = 0; i < itm.data.length; i++) {
          if (itm.data[i].userId === item.id) {
            values.push(itm.data[i].userId);
          }
        }
        setAlbumNo(values.length);
      })
      .catch(error => {
        console.log(error, 'errorerror');
      });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={styles.mainView}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.emailText}>{item.email}</Text>
      <Text style={styles.emailText}>+{item.phone}</Text>
      <View style={styles.hLine} />
      <View style={styles.rowView}>
        <Text>{item.company.name}</Text>
        <Text>{albumNo}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PeopleLisComp;

const styles = StyleSheet.create({
  mainView: {
    ...commonStyles.shadowStyle,
    borderRadius: 6,
    padding: 16,
    backgroundColor: colors.white,
    marginHorizontal: 4,
    marginBottom: 16,
    borderWidth: 1.16,
    borderColor: colors.lightGray,
  },
  nameText: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.black,
    marginBottom: 9,
  },
  emailText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.textgray,
  },
  hLine: {
    height: 1,
    width: '100%',
    backgroundColor: colors.lightGray,
    marginTop: 23,
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
