import React, {Component} from 'react';
import {Modal, TouchableOpacity, Text, View, Linking, Image} from 'react-native';
import {SecondaryButton, PrimaryButton} from '../../../components';
import IconWarehouse from "../../../assets/icon_warehouse.png";
import _ from "../../../utils/language";
import PropTypes from "prop-types";

export default class ForceUpdateModal extends Component {

  static propTypes = {
    styles: PropTypes.object.isRequired,
    visible: PropTypes.bool,
    canClose: PropTypes.number,
    updateLink: PropTypes.string
  };
  handleClick (params) {
    Linking.canOpenURL(params).then(supported => {
      supported && Linking.openURL(params);
    }, (err) => console.log(err));
  }

  render() {
    const { styles } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
            <View style={styles.forceUpdateImageContainer}>
              <Image
                style={styles.forceUpdateImage}
                source={IconWarehouse}
              />
              <View style={{height: 25}} />
              <Text style={styles.descriptionText}>Silahkan update aplikasi sampleapp anda ke versi paling terbaru</Text>
            </View>

            <View style={styles.innerContainer}>
              { this.props.canClose==0 &&
              <View style={styles.buttonContainer}>
                <SecondaryButton
                  onPress={() => {
                    this.handleClick(this.props.updateLink);
                  }}
                  title={_('Update Sekarang')}/>
                </View>
              }
              { this.props.canClose==0 && <View style={{width: 20}} /> }
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPress={() => {
                    this.handleClick(this.props.updateLink);
                  }}
                  title={_('Update Sekarang')}/>
              </View>
            </View>
        </View>
      </Modal>
    );
  }
}