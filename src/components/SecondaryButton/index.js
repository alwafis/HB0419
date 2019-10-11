import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {config} from '../../config/global';


const Styles = {
  button: {
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    borderColor: config.colors.primary_background,
    borderWidth: 1,
    padding: 10
  },
  buttonDisabled: {
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    borderColor: config.colors.primary_background,
    borderWidth: 1,
    padding: 10,
    opacity: 0.3
  },
  textButton: {
    fontSize: 16,
    color: config.colors.primary_background,
    textTransform: 'uppercase'
  }
};
const SecondaryButton = (props) => (<TouchableOpacity
    {...props}
    style={props.disabled?Styles.buttonDisabled:Styles.button}
    onPress={props.onPress}>
    <Text style={Styles.textButton}> {props.title} </Text>
</TouchableOpacity>);
export default SecondaryButton;