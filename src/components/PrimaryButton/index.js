import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {config} from '../../config/global';


const Styles = {
  button: {
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: config.colors.primary_background,
    padding: 10
  },
  buttonDisabled: {
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: config.colors.primary_background,
    padding: 10,
    opacity: .3
  },
  textButton:{
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase'
  }
};
const PrimaryButton = (props) => (<TouchableOpacity
    {...props}
    style={Styles.button}
    style={props.disabled?Styles.buttonDisabled:Styles.button}
    onPress={props.onPress}>
    <Text style={Styles.textButton}> {props.title} </Text>
</TouchableOpacity>);
export default PrimaryButton;