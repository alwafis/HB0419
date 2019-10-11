import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from "prop-types";
import Styles from "./styles";
import { templateOnly } from './action';
import _ from "../../utils/language";
import { config } from "../../config/global";


class RoleChooser extends Component {
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
  };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.props.templateOnly();
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

  goToRegistration(param){
    this.props.navigation.navigate('RegistrationMain',{
      user_role: param,
      onBackTo: 'RoleChooser'
    });
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text
          style={{
            textAlign: 'center',
            margin: '10%',
            marginTop: 100,
            fontSize: 20
          }}
        >
          {_('Apa peran yang ingin anda ambil dalam aplikasi ini?')}
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 150
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
              width: 250,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#3abc88',
              borderWidth: 1,
            }}
            onPress={() => this.goToRegistration(1)}
          >
            <Icon
              name={'shipping-fast'}
              size={30}/>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 24,
                  marginLeft: 10
                }}
              >
                {config.user_role[1]}
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 20,
              width: 250,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#3abc88',
              borderWidth: 1,
              marginTop: 16
            }}
            onPress={() => this.goToRegistration(2)}
          >
            <Icon
              name={'shopping-bag'}
              size={30}/>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 24,
                  marginLeft: 10
                }}
              >
                {config.user_role[2]}
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  templateOnly: () => dispatch(templateOnly()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleChooser);
