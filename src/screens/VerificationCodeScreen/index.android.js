import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Styles from './styles';
import { sendMessage, sendVerification, clearData } from './action';
import {VerificationCodeInput, PrimaryButton, SecondaryButton} from '../../components';
import GLOBAL from '../../config/state';
import {config} from '../../config/global';
import _ from '../../utils/language';

class VerificationCode extends Component {

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
    phone:'',
    error:'',
    delay_time:'',
    messageShown: false,
    delay_time_seconds:'',
    is_ticking: true,//state to check if it is ticking or not
    verification_code:''
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  checkDiffPeriod(){
    if(GLOBAL.LAST_SMS !== '')
      return ~~((new Date).getTime()/1000) - GLOBAL.LAST_SMS;
    else
      return 0;
  }
  componentDidMount() {
    this.setState({
      phone: this.props.navigation.getParam('phone_number', '')
    });
    if(GLOBAL.LAST_SMS === ''){
      this.props.sendMessage(this.state.phone);
      GLOBAL.LAST_SMS = ~~((new Date).getTime()/1000);
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount(){
    this.props.clearVerificationData();
  }
  
  tick(){
    if(this.state.is_ticking == true){
      if(this.state.delay_time_seconds === 0){
        this.setState({
          delay_time:'',
          is_ticking: false
        });
      }
      else if(GLOBAL.LAST_SMS !== ''){
        const seconds = config.period.sms_delay - this.checkDiffPeriod();
        this.setState({
          delay_time_seconds: seconds,
          delay_time: ' (' + this.minutesFormat(seconds) + ')'
        });

        this.props.navigation.setParams({
          delay_time_seconds: seconds,
        });
      }
    }
  }
  minutesFormat(time)
  {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like '1:01' or '4:03:59' or '123:03:59'
    var ret = '';

    if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }
  handleChange(input){
    this.props.clearVerificationData();
    this.setState({
      verification_code: input
    });
  }
  
  handleSubmit(){
    if(isNaN(this.state.verification_code)){
      this.setState({
        error: _('Verification harus berupa angka')
      });
    }
    else{
      this.props.sendVerification({
        phone: this.state.phone,
        verification_code: this.state.verification_code
      });
    }
  }

  handleResend(){
    if(this.state.delay_time_seconds<=0 && this.state.is_ticking === false){
      this.props.sendMessage(this.state.phone);
      GLOBAL.LAST_SMS = ~~((new Date).getTime()/1000);
      this.setState({
        delay_time_seconds: config.period.sms_delay,
        is_ticking: true
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    return true;
  };

  goBackTo = () => {
    const goBackTo = this.props.navigation.state.params.onBackTo;
    const timeout = this.state.delay_time_seconds;

    this.props.clearVerificationData();
    clearInterval(this.intervalHandle);
    GLOBAL.LAST_SMS = '';

    this.props.navigation.replace(goBackTo,{
      timeout: timeout
    });
  };

  
  intervalHandle = setInterval(this.tick.bind(this), 1000);
  showSuccess(){
    this.setState({
      messageShown: true
    });
    showMessage({
      message: _('Selamat'),
      description: _('Anda telah berhasil melakukan login'),
      type: 'success',
      hideStatusBar: true,
      backgroundColor: config.colors.primary_background, // background color
      color: '#fff', // text color
      position: 'bottom'
    });
  }
  render() {
    return (
      <View style={Styles.container}>
        <KeyboardAvoidingView
          style={Styles.innerContainer}
          behavior='padding'
        >
          {(this.props.send_verification_res && this.state.messageShown===false) && this.showSuccess()}
          <View style={{
            width: '100%',
            marginBottom: 16,
            marginTop: 20
          }}>
            <Text
              style={Styles.title}>
              {_('Silahkan masukkan kode OTP yang dikirim ke nomor handphone anda') +
              ' (' + this.state.phone + ')'} 
            </Text>
            <Text style={{color: 'blue',textAlign: 'center'}}
              onPress={() => this.goBackTo()}>
              {_('Change number')}?
            </Text>
            <Text
              style={Styles.code}>
              {_('Kode OTP')}
            </Text>
          </View>
          <VerificationCodeInput
            onFulfill={this.handleChange}/>
            
          <View style={{
            height: 10,
          }}/>
          <View style={{
            width: '100%',
            marginBottom: 10,
            marginTop: 40
          }}>

            <Text
              style={{
                color: 'red',
                textAlign: 'center'
              }}
            >
              {this.props.send_verification_err && this.props.send_verification_err.status}
            </Text>
            <PrimaryButton
              onPress={() => {
                this.handleSubmit()
              }}
              title={_('Lanjutkan')}/>
          </View>

          <View style={{
            width: '100%'
          }}>
            <SecondaryButton
              disabled={(this.state.delay_time_seconds!==0)?true:false}
              onPress={() => {
                this.handleResend()
              }}
              title={_('Kirim ulang kode otp') + this.state.delay_time}/>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  send_verification: state.verify_code.send_verification,
  send_verification_res: state.verify_code.send_verification_res,
  send_verification_err: state.verify_code.send_verification_err,
  send_message_fetch: state.send_sms.send_message_fetch,
  send_message_res: state.send_sms.send_message_res,
  send_message_err: state.send_sms.send_message_err,
});

const mapDispatchToProps = dispatch => ({
  sendVerification: (verification_code) => dispatch(sendVerification(verification_code)),
  clearVerificationData: () => dispatch(clearData()),
  sendMessage: (param) => dispatch(sendMessage(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerificationCode);
