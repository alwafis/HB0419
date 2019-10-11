import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import CodeInput from 'react-native-confirmation-code-field';
import {config} from '../../config/global';

const VerificationCodeField = (props) => (
    <CodeInput
        {...props}
        codeLength={6}
        variant={'border-b'}
        activeColor={config.colors.primary_background}
        inactiveColor={config.colors.field_inactive}
    />
    
);
export default VerificationCodeField;