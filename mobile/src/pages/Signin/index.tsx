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

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../util/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreatAccountButton,
    CreatAccountButtonText,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const Signin: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const { signIn, user } = useAuth();

    console.log(user);

    const handleSignIn = useCallback(async (data: SignInFormData) => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail is required')
                    .email('You must enter a valid email'),
                password: Yup.string().required('Password is required'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
            Alert.alert('Error', 'Login error, check the data');
        }
    }, []);

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
                            <Title>Sign-in</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
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
                                name="password"
                                icon="lock"
                                placeholder="Password"
                                secureTextEntry
                                autoCapitalize="none"
                                returnKeyType="send"
                                onSubmitEditing={() =>
                                    formRef.current?.submitForm()
                                }
                            />

                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm();
                                }}
                            >
                                Access
                            </Button>
                        </Form>

                        <ForgotPassword>
                            <ForgotPasswordText>
                                Forgot Password?
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreatAccountButton onPress={() => navigation.navigate('Signup')}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreatAccountButtonText>Create account</CreatAccountButtonText>
            </CreatAccountButton>
        </>
    );
};

export default Signin;
