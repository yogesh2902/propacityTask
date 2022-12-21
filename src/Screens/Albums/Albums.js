import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ALBUM_IMAGES, SINGLE_PERSON_ALBUM} from '../../config/urls';
import WrapperContainer from '../../Components/WrapperContainer';
import Loader from '../../Components/Loader';
import HeadComp from '../../Components/HeadComp';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import AlbumListComp from '../../Components/AlbumListComp';
import FastImage from 'react-native-fast-image';
import ImageShowModal from '../../Components/ImageShowModal';
import {getItem, setItem} from '../../utils/utils';
import navigationStrings from '../../constants/navigationStrings';

const Albums = ({navigation}) => {
  const [loader, setLoader] = useState(true);

  const [userName, setUserName] = useState('');

  const [mainScreen, setMainScreen] = useState(true);

  useEffect(() => {
    checkResponse();
  }, []);

  const checkResponse = async () => {
    const res = await getItem('userDetails');
    if (res.mainScreen) {
      setMainScreen(true);
      getAPiCall();
    } else {
      const sendObj = {
        title: res.title,
        id: res.albumId,
      };
      setMainScreen(false);
      await getAPiCall();
      await onPressAlbum(sendObj);
    }
  };

  const [albumArr, setAlbumArr] = useState([]);

  const [imagesArr, setImagesArr] = useState([]);

  const [selectedName, setSelectedName] = useState('');

  const [modalShow, setModalShow] = useState(false);

  const [imageShow, setImageShow] = useState('');

  const getAPiCall = async () => {
    const res = await getItem('userDetails');
    setItem('screenName', 'album');
    setUserName(res.username);
    setItem('userDetails', {
      userid: res.userid,
      username: res.username,
      mainScreen: true,
    });

    axios
      .get(SINGLE_PERSON_ALBUM + '?userId=' + res.userid)
      .then(itm => {
        setLoader(false);
        setAlbumArr(itm.data);
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'errorororororo');
      });
  };

  const onPressAlbum = async item => {
    setLoader(true);
    const res = await getItem('userDetails');
    setItem('userDetails', {
      userid: res.userid,
      username: res.username,
      mainScreen: false,
      title: item.title,
      albumId: item.id,
    });

    setMainScreen(false);
    setSelectedName(item.title);
    axios
      .get(ALBUM_IMAGES + '?albumId=' + item.id)
      .then(itm => {
        setImagesArr(itm.data);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'err');
      });
  };

  const onPressBack = async () => {
    const res = await getItem('userDetails');
    if (!mainScreen) {
      setItem('userDetails', {
        userid: res.userid,
        username: res.username,
        mainScreen: true,
      });
      setSelectedName('');
      setMainScreen(true);
    } else {
      navigation.replace(navigationStrings.HOME);
    }
  };

  const onCross = () => {
    setModalShow(false);
    setImageShow('');
  };

  const onOpenModal = itm => {
    setImageShow(itm.url);
    setModalShow(true);
  };

  return (
    <WrapperContainer>
      <HeadComp name={userName} onBack={onPressBack} />
      {mainScreen ? (
        <View style={{flex: 1}}>
          <View style={{marginTop: 20, marginHorizontal: 22}}>
            <Text style={styles.albumText}>Albums</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, marginTop: 10}}>
              <View style={styles.wrapAlbum}>
                {albumArr.map((item, index) => {
                  return (
                    <AlbumListComp
                      onPressAlbum={onPressAlbum}
                      item={item}
                      index={index}
                      key={index}
                      selected={false}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.containerRow}>
          <View style={{flex: 0.3}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {albumArr.map((item, index) => {
                return (
                  <AlbumListComp
                    item={item}
                    key={index}
                    selected={true}
                    onPressAlbum={onPressAlbum}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.verticleLine} />
          <View style={{flex: 0.7}}>
            <Text style={styles.nameText}>{selectedName}</Text>
            <View style={{flex: 1, marginTop: 10}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 40}}>
                <View style={styles.wrapImage}>
                  {imagesArr.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.touchImage}
                        key={index}
                        activeOpacity={0.7}
                        onPress={() => onOpenModal(item)}>
                        <FastImage
                          source={{
                            uri: item.url ? item.url : null,
                            priority: FastImage.priority.high,
                          }}
                          fallback={Platform.OS === 'android'}
                          style={styles.imgStyle}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
      <ImageShowModal
        onCross={onCross}
        isVisible={modalShow}
        image={imageShow}
      />
      <Loader isLoading={loader} />
    </WrapperContainer>
  );
};

export default Albums;
const styles = StyleSheet.create({
  albumText: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  containerRow: {
    flexDirection: 'row',
    marginTop: 24,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: colors.vLine,
    marginLeft: 5,
    marginRight: 12,
  },
  nameText: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  imgStyle: {
    height: 140,
    width: '100%',
  },
  touchImage: {
    height: 140,
    width: '48%',
    marginBottom: 5,
  },
  wrapImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '98%',
  },
  wrapAlbum: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    width: '90%',
  },
});
