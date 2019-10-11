import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  BackHandler,
  Image,
  Picker,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import ViewPager from '@react-native-community/viewpager';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Feather';
import { TextInput,Button } from 'react-native-paper';
import Styles from './styles';
import { templateOnly } from './action';
import _ from "../../utils/language";
import { config } from '../../config/global';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  stepIndicator: {
    marginVertical: 50
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepLabel: {
    fontSize: 0,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999'
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f'
  }
});

const thirdIndicatorStyles = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 15,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 8,
  separatorStrokeFinishedWidth: 2,
  stepStrokeCurrentColor: config.colors.primary_background,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: config.colors.primary_background,
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: config.colors.primary_background,
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: config.colors.primary_background,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#ffffff',
  labelSize: 13,
  labelFontFamily: 'OpenSans-Italic',
  currentStepLabelColor: '#7eaec4',
};

class Registration extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          onBackTo: PropTypes.string,
          onCaptureTo: PropTypes.string
        })
      }),
      goBack: PropTypes.func,
    })
  };

  state = {
    user_role: 1,
    position: 0,
    name: '',
    location: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const usrRole = this.props.navigation.getParam('user_role', '');
    if(usrRole!==''){
      this.setState({
        user_role: usrRole
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.setState({
        location: region
      });
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error)=>console.log(error));
  }
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.goBackTo(); // works best when the goBack is async
    return true;
  };

  goBackTo = () => {
    const goBackTo = this.props.navigation.state.params.onBackTo;
    this.props.navigation.replace(goBackTo);
  };

  onPageScroll = e => {
    this.setState({position: e.nativeEvent.position});
  };

  renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    )
  }

  onStepPress = position => {
    this.viewPager.setPage(position);
    this.setState({ position: position });
  }

  onImageClick(){
    const options = {
      title: 'Select Hazard Report Image',
      storageOptions: {
        skipBackup: true,
        path: 'registrationImages',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        const renderPreview = this.state.renderPreview;
        this.setState({ previewImage: response.uri });
        this.setState({ renderPreview: !renderPreview });
      }
    });
  }

  onMapRegionChange(region) {
    console.log(region);
  }
  
  render() {
    console.log(this.state.location);
    return (
      <View style={Styles.container}>
        <StepIndicator
          stepCount={2}
          currentPosition={this.state.position}
          customStyles={thirdIndicatorStyles}
          labels={['Account', 'Profile']}
          renderLabel={this.renderLabel}
        />
        <ViewPager
          style={{
            flex: 1
          }}
          scrollEnabled={false}
          ref={viewPager => {
            this.viewPager = viewPager
          }}
          initialPage={0}
          onPageSelected={this.onPageScroll}
          >
          <ScrollView
            style={{
              borderTopColor: 'rgba(151, 151, 151, .7)',
              borderTopWidth: 1
            }}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: 10
            }}
            key="1"
          >
            <View
              style={{
                width: '90%',
              }}
            >
              <TextInput
                label={_('Nama lengkap')}
                mode={'outlined'}
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />
              <TextInput
                label={_('Alamat lengkap')}
                mode={'outlined'}
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />
              <TextInput
                label={_('Nomor KTP')}
                mode={'outlined'}
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />
              <View
                style={{
                  marginTop: 10,
                  marginBottom:10
                }}
              >
                <Text>
                  {_('Foto KTP')}
                </Text>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 150,
                      backgroundColor: '#c3c3c3',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    onPress={this.onImageClick.bind(this)}
                  >
                    <Image
                      resizeMode="contain"
                      source={{ uri: this.state.previewImage }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <Icon name={'camera'} size={30}/>
                  </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginBottom:10
                }}
              >
                <Text>
                  {_('Foto selfie dengan KTP')}
                </Text>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 150,
                    backgroundColor: '#c3c3c3',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'camera'} size={30}/>
                </TouchableOpacity>
              </View>
              <TextInput
                label={_('Nomor NPWP')}
                mode={'outlined'}
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />
              <View
                style={{
                  marginTop: 10,
                  marginBottom:10
                }}
              >
                <Text>
                  {_('Foto NPWP')}
                </Text>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 150,
                    backgroundColor: '#c3c3c3',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Icon name={'camera'} size={30}/>
                </TouchableOpacity>
              </View>
              
              <Button
                mode="contained"
                style={{
                  marginBottom: 20
                }}
                onPress={() => this.onStepPress(1)}>
                <Text
                style={{
                  color: '#ffffff',
                  textTransform: 'uppercase'
                }}
                >{_('Lanjutkan')}</Text>
              </Button>
            </View>
          </ScrollView>
          <ScrollView
            style={{
              borderTopColor: 'rgba(151, 151, 151, .7)',
              borderTopWidth: 1
            }}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: 10
            }}
            key="2"
          >
            <View style={{width: '90%'}}>
            <TextInput
              label={_('Nama unit bisnis')}
              mode={'outlined'}
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
            <View
              style={{
                marginTop: 10,
                marginBottom:10
              }}
            >
              <Text>
                {_('Kategori unit bisnis')}
              </Text>
              <View
                style={{
                  height: 50,
                  width: '100%',
                  borderColor: '#838383',
                  borderWidth: 1,
                  borderRadius: 2
                }}
              >
                <Picker
                  selectedValue={this.state.language}
                  style={{
                    height: 50,
                    width: '100%'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>
            </View>

            <TextInput
              label={_('Nomor kontak')}
              mode={'outlined'}
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
            <TextInput
              label={_('Kapasitas unit bisnis')}
              mode={'outlined'}
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
            <View
              style={{
                marginTop: 10,
                marginBottom:10
              }}
            >
              <Text>
                {_('Foto unit bisnis')}
              </Text>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 150,
                  backgroundColor: '#c3c3c3',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon name={'camera'} size={30}/>
              </TouchableOpacity>
            </View>
            <TextInput
              label={_('Keterangan/patokan lokasi')}
              mode={'outlined'}
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
            {this.state.location &&
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                style={{
                  textAlign: 'left',
                  width: '100%'
                }}>{_('Lokasi bisnis')}</Text>
                <MapView
                  style={{
                    width: '100%',
                    height: 150,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  region={this.state.location}
                  onRegionChange={this.onMapRegionChange}
                />
                <Icon style={{position: 'absolute'}} name={'map-pin'} size={25}/>
              </View>
            }
            </View>
            
            <Button
              mode="contained"
              style={{
                marginBottom: 20,
                width: '90%',
                marginTop: 20
              }}
              onPress={() => this.onStepPress(1)}>
              <Text
              style={{
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
              >{_('Lanjutkan')}</Text>
            </Button>
          </ScrollView>
        </ViewPager>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  templateOnly: () => dispatch(templateOnly()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
