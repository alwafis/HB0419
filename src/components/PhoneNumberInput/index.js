import React, {Component} from 'react';
import {TextInput, Text, View} from 'react-native';
import {config} from '../../config/global';


export default class NumberInput extends Component {

  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => {
    if(this.props.value=='')
      this.setState({ isFocused: false })
  };

  handleChange (text){
    if(!isNaN(text) && text.indexOf('.') == -1 && text.length < 14)
      this.props.changeEvent(text,'value');
  }

  render() {
    const { label, style, errorLabel, fontSize, ...props } = this.props;
    const { isFocused } = this.state;
    const errorLabelStyle = {
      textAlign: 'center',
      fontSize: 14,
      color: 'red',
    };
    let input = {
      fontSize: fontSize,
      borderBottomWidth: 2,
      borderBottomColor: config.colors.primary_background,
      textAlign: 'center',
      color: config.colors.primary_background,
      width: '100%'
    }
    let labelStyle = {
      position: 'absolute',
      left: 0,
      top: !isFocused ? 18 : 0,
      fontSize: !isFocused ? fontSize : 14,
      color: !isFocused ? '#aaa' : config.colors.primary_background,
    };
    if(errorLabel!=''){
      labelStyle = {
        position: 'absolute',
        left: 0,
        top: !isFocused ? 18 : 0,
        fontSize: !isFocused ? fontSize : 14,
        color: 'red',
      };
      input = {
        fontSize: fontSize,
        borderBottomWidth: 2,
        borderBottomColor: 'red',
        textAlign: 'center',
        color: config.colors.primary_background,
        width: '100%'
      }
    }
    return (
      <View style={{ paddingTop: 18, width: '90%' }}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={input}
          keyboardType = 'numeric'
          onChangeText={(text) => {
            this.handleChange(text);
          }}
          value={this.props.value}
        />
        <Text style={errorLabelStyle}>
          {errorLabel}
        </Text>
      </View>
    );
  }
}