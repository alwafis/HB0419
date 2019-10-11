
import {
  StyleSheet
} from "react-native";
import {config} from '../../config/global';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainer: {
    paddingTop: 40
  },
  headSection: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  logoImage: {
    width: 104,
    height: 160,
    resizeMode: 'stretch',
    marginBottom: 30
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
  buttonSecondary: {
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    borderColor: config.colors.primary_background,
    borderWidth: 1,
    padding: 10
  },
  button: {
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: config.colors.primary_background,
    padding: 10
  },
  buttonContainer: {
    flex: 1,
  },
  textButtonSecondary: {
    fontSize: 16,
    color: config.colors.primary_background
  },
  textButton:{
    fontSize: 16,
    color: 'white'
  },
  descriptionText:{
    width: '100%',
    textAlign: 'center',
    color: config.colors.primary_background,
    fontSize: 48
  },
});

export default styles;