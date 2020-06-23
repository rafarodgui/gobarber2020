import React, { useCallback, useRef } from 'react';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

import getValidationErrors from '../../util/getValidationErrors';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
    Container,
    Title,
    IAlreadyHaveAnAccount,
    IAlreadyHaveAnAccountButtonText,
} from './styles';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const navigation = useNavigation();

    const passwordInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);

    const handleSignup = useCallback(
        async (data: SignupFormData) => {
            try {
                const schema = Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                    email: Yup.string()
                        .required('E-mail is required')
                        .email('You must enter a valid email'),
                    password: Yup.string().min(
                        6,
                        'You must type at least 6 caracters'
                    ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/users', data);

                Alert.alert('account created successfuly');

                navigation.goBack();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }
                Alert.alert('Error', 'Create account error');
            }
        },
        [navigation]
    );

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Create Account</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignup}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Name"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />

                            <Input
                                ref={emailInputRef}
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Password"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />

                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm();
                                }}
                            >
                                Access
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <IAlreadyHaveAnAccount onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#f4ede8" />
                <IAlreadyHaveAnAccountButtonText>
                    I already have an account
                </IAlreadyHaveAnAccountButtonText>
            </IAlreadyHaveAnAccount>
        </>
    );
};

export default Signup;
