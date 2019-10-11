import {AsyncStorage} from 'react-native';

export const _storeData = async (key, params) => {
    try {
      await AsyncStorage.setItem(key, params);
    } catch (error) {
      console.log(error);
    }
};

export const _retrieveData = async (key) => {
    try {

        const value = await AsyncStorage.getItem(key);
        console.log(value);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(error);
    }
};