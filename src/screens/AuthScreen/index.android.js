import React, { Component } from "react";
import {
  View,
  BackHandler,
  KeyboardAvoidingView,
  Text,
  Image
} from "react-native";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Styles from "./styles";
import {PhoneNumberInput, PrimaryButton, SecondaryButton} from '../../components';
import sampleappLogo from "../../assets/logo_sampleapp.png";
import _ from "../../utils/language";


class Auth extends Component {
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
    value:'',
    error:''
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleChange(value,name){
    let tmp = {};
    tmp[name] = value;
    this.setState(tmp);
  }
  
  submitPhone(){
    if(this.state.value.length>=9 &&
      this.state.value.length<=13 &&
      !isNaN(this.state.value) &&
      this.state.value!=''){
        this.setState({
          error: ''
        });
        this.props.navigation.navigate('VerificationCode', { 
          onBackTo: 'Auth',
          phone_number: this.state.value,
        });
    }
    else{
      this.setState({
        error: _('Nomor HP harus lebih dari 9 digit dan kurang dari 13 digit')
      });
    }
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
    this.props.navigation.navigate(goBackTo);
  };

  handleRegistration(){
    this.props.navigation.navigate('RoleChooser');
  }

  render() {
    console.log(this.props.navigation.getParam('phone_number', ''));
    return (
      <View style={Styles.container}>
        <KeyboardAvoidingView
          style={Styles.container}
          behavior="padding"
        >
          <Image
            style={Styles.logoImage}
            source={sampleappLogo}
          />
          <Text style={Styles.descriptionText}>{_('Selamat datang di HURU')}</Text>
          <PhoneNumberInput
            label={_('Nomor HP')}
            changeEvent={this.handleChange}
            value={this.state.value}
            fontSize={25}
            errorLabel={this.state.error}
          />

          <View style={{
            width: '90%',
            marginBottom: 16,
            marginTop: 40
          }}>
            <PrimaryButton
              onPress={() => {
                this.submitPhone()
              }}
              title={_('Login')}/>
          </View>

          <View style={{
            width: '90%'
          }}>
            <SecondaryButton
              onPress={() => {
                this.handleRegistration()
              }}
              title={_('Register')}/>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
