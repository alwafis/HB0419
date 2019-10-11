import React, { Component } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class LoginScreen extends Component {
  componentDidMount() {
    this.getCapturedImage();
  }

  getCapturedImage = () => {
    try {
      const imageURI = this.props.navigation.state.params.uri;
      console.log("LoginScreen@getCapturedImage", imageURI);
    } catch (error) {}
  };

  render() {
    return (
      <SafeAreaView>
        <Icon name="facebook-square" size={25} />
        <Text>aaaa</Text>
        <Icon name="google" size={25} />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Camera", {
              onBackTo: "Login",
              onCaptureTo: "Login"
            })
          }
        >
          <Icon name="camera" size={25} />
          <Text>Trigger Camera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
