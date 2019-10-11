
import {
  StyleSheet
} from "react-native";
import {config} from '../../config/global';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%',
    paddingTop: 40
  },
  forceUpdateImageContainer: {
    width: 200,
    height: 100,
    alignItems: 'center',
    marginTop: 80
  },
  forceUpdateImage: {
    width: 300,
    height: 210,
  },
  forceUpdateButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  forceUpdateButton:{
    width: '40%',
    height: 40,
    margin: 40
  },
  descriptionText: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    color: config.colors.primary_background
  },
  buttonContainer: {
    flex: 1,
  }
});

export default styles;