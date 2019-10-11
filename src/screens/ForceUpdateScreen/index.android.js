import React, { Component } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
} from "react-native";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Spinner from "react-native-spinkit";
import Modal from "./components/Modal";
import Styles from "./styles";
import { versionFetch } from './action';
import {version} from '../../../package.json';


class ForceUpdate extends Component {
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
    flash: false,
    modalShow: false,
    isLoading: false,
    forceUpdate: 0
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.props.checkVersion();
    if(this.props.version_res != null){
      if(this.props.version_res[0].latest_public_version!=version){
        this.setState({
          modalShow: true
        });
      }
      else{
        this.props.navigation.navigate('Auth');
      }
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

  closeModal(){
    this.setState({
      modalShow: false
    });
  }

  render() {
    return (
      <View style={Styles.container}>
        <Spinner 
          isVisible={true} 
          size={100}
          type={'Bounce'}
          color={'#0f7b44'}/>
        <Modal 
          visible={this.state.modalShow}
          closeModal={this.closeModal}
          styles={Styles}
          canClose={this.props.version_res != null ? this.props.version_res[0].force_update : false}
          updateLink={this.props.version_res != null && this.props.version_res[0].store_location}/>
      </View>
      
    );
  }
}

const mapStateToProps = state => ({
  version_fetch: state.force_update.version_fetch,
  version_res: state.force_update.version_res,
  version_err: state.force_update.version_err,
});

const mapDispatchToProps = dispatch => ({
  checkVersion: () => dispatch(versionFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForceUpdate);
