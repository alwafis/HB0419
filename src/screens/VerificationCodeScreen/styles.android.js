
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
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#5d5d5d',
    marginTop: 20
  },
  code: {
    textAlign: 'center',
    fontSize: 24,
    color: '#5d5d5d',
    marginTop: 60
  }
});

export default styles;