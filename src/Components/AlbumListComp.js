import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import {addAlpha} from '../helper/helperFunctions';
import axios from 'axios';
import {ALBUM_IMAGES} from '../config/urls';
import FastImage from 'react-native-fast-image';
import {width} from '../styles/responsiveSize';

const AlbumListComp = ({item, index, onPressAlbum, selected}) => {
  useEffect(() => {
    getApi();
  }, []);

  const [length, setLength] = useState(0);

  const [imageShow, setImageShow] = useState('');

  const getApi = () => {
    axios
      .get(ALBUM_IMAGES + '?albumId=' + item.id)
      .then(itm => {
        setLength(itm.data.length);
        if (itm.data.length) {
          setImageShow(itm.data[0].thumbnailUrl);
        }
      })
      .catch(error => {
        console.log(error, 'errrr');
      });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPressAlbum(item)}
      style={{
        ...styles.mainView,
        width: selected ? '80%' : '48%',
        marginHorizontal: selected ? 12 : 0,
      }}>
      <FastImage
        source={{
          uri: imageShow ? imageShow : null,
          priority: FastImage.priority.high,
        }}
        fallback={Platform.OS === 'android'}
        style={{
          width: '100%',
          height: selected ? 98 : 160,
          borderRadius: selected ? 6 : 5,
        }}
      />
      <Text
        style={{...styles.albumText, textAlign: selected ? 'center' : 'left'}}>
        {item.title}
      </Text>
      {length !== 0 && (
        <Text
          style={{
            ...styles.numberText,
            textAlign: selected ? 'center' : 'left',
          }}>
          {length}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AlbumListComp;

const styles = StyleSheet.create({
  mainView: {
    marginBottom: 20,
  },
  albumText: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    color: colors.black,
    marginTop: 6,
    textAlign: 'center',
  },
  numberText: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: addAlpha('#000000', 0.5),
    marginTop: 2,
    textAlign: 'center',
  },
});
