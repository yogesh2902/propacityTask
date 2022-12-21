import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Loader from '../../Components/Loader';
import PeopleLisComp from '../../Components/PeopleLisComp';
import WrapperContainer from '../../Components/WrapperContainer';
import {GET_PEOPLE, LIST_ALBUMS} from '../../config/urls';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {setItem} from '../../utils/utils';
import PieChart from 'react-native-pie-chart';
import commonStyles from '../../styles/commonStyles';
import {width} from '../../styles/responsiveSize';
import RenderNameComp from '../../Components/RenderNameComp';
import {sliceColor} from '../../constants/constants';

const Home = ({navigation}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    const apiCall = navigation.addListener('focus', () => {
      getApiCall();
      setItem('screenName', 'home');
    });
    return apiCall;
  }, [navigation]);

  const [peopleArr, setPeopleArr] = useState([]);

  const [loader, setLoader] = useState(true);

  const [pieArr, setPieArr] = useState([]);

  const getApiCall = () => {
    axios
      .get(GET_PEOPLE, {headers: headers})
      .then(itm => {
        setLoader(false);
        setPeopleArr(itm.data);
        getPieArr(itm.data);
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'errorerror');
      });
  };

  const getPieArr = mainArr => {
    axios
      .get(LIST_ALBUMS)
      .then(itm => {
        let mainIdArr = mainArr.map(function (item) {
          return item.id;
        });

        let mainPostsArr = itm.data.map(function (item) {
          return item.userId;
        });
        const data = mainIdArr.map((itm, index) => {
          const res = mainPostsArr.filter(item => item === itm);
          return res.length;
        });
        setPieArr(data);
      })
      .catch(err => {
        console.log(err, 'errr');
      });
  };

  return (
    <WrapperContainer>
      <View style={styles.headView}>
        <Text style={styles.photosText}>Photos</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20}}>
        <Text style={styles.peopleTxt}>People</Text>
        <View style={{marginTop: 15}}>
          {peopleArr.map((item, index) => {
            return <PeopleLisComp item={item} index={index} key={index} />;
          })}
        </View>
        {pieArr.length ? (
          <View>
            <View>
              <Text style={styles.peopleTxt}>Analytics</Text>
            </View>

            <View style={styles.bottomView}>
              <Text style={styles.bottomText}>People</Text>
              <View style={{marginTop: 40, alignItems: 'center'}}>
                <PieChart
                  widthAndHeight={width / 2}
                  series={pieArr}
                  doughnut={true}
                  sliceColor={sliceColor}
                  coverRadius={0.7}
                  coverFill={'#FFF'}
                />
              </View>
              <View style={{marginTop: 40}}>
                {peopleArr.map((item, index) => {
                  return (
                    <RenderNameComp key={index} item={item} index={index} />
                  );
                })}
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <Loader isLoading={loader} />
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    height: 50,
    marginHorizontal: 15,
  },
  photosText: {
    fontSize: 34,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  peopleTxt: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.black,
    marginTop: 10,
  },
  bottomView: {
    ...commonStyles.shadowStyle,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1.4,
    borderColor: colors.vLine,
    marginTop: 18,
    marginBottom: 15,
    padding: 30,
  },
  bottomText: {
    fontSize: 26,
    fontFamily: fontFamily.bold,
    color: colors.black,
    textAlign: 'center',
  },
});

export default Home;
