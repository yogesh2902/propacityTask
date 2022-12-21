import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {height} from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import FastImage from 'react-native-fast-image';

const ImageShowModal = ({isVisible = false, image, onCross}) => {
  return (
    <Modal isVisible={isVisible}>
      <View>
        <FastImage
          source={{
            uri: image ? image : null,
            priority: FastImage.priority.high,
          }}
          fallback={Platform.OS === 'android'}
          style={{height: height / 2, width: '100%', borderRadius: 22}}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onCross}
        style={styles.pAbs}>
        <Image source={imagePath.cross} />
      </TouchableOpacity>
    </Modal>
  );
};

export default ImageShowModal;

const styles = StyleSheet.create({
  pAbs: {
    position: 'absolute',
    backgroundColor: colors.white,
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    top: height / 5,
    right: -10,
  },
});
