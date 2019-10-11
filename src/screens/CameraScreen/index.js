import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { RNCamera } from "react-native-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 10,
    alignItems: "center"
  },
  cancel: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 10,
    alignItems: "center"
  },
  flexRow: {
    flexDirection: "row"
  }
});

export default class CameraScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          onBackTo: PropTypes.string.isRequired,
          onCaptureTo: PropTypes.string.isRequired
        }).isRequired
      }).isRequired,
      goBack: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    flash: false,
    isLoading: false
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.goBackTo(); // works best when the goBack is async
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={
            this.state.flash
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            {!this.state.isLoading ? (
              <Icon name="camera" size={25} />
            ) : (
              <ActivityIndicator />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goBackTo} style={styles.cancel}>
            <Icon name="times" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  goBackTo = () => {
    const goBackTo = this.props.navigation.state.params.onBackTo;

    this.props.navigation.navigate(goBackTo);
  };

  takePicture = async () => {
    this.setState({
      isLoading: true
    });

    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const onCaptureTo = this.props.navigation.state.params.onCaptureTo;

      this.props.navigation.navigate(onCaptureTo, { uri: data.uri });
    }

    this.setState({
      isLoading: false
    });
  };
}
