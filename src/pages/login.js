import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { 
    ButtonBlue, 
    ButtonBlueText, 
    ButtonOutline, 
    ButtonOutlineText, 
    Container, 
    Input, 
    TittleForm,
    SubTittleForm
} from "../styles";

export default function Login() {

    const navigation = useNavigation();

    const handleMain = () => {
        navigation.navigate("Main");
    }

    const handleRegister = () => {
        navigation.navigate("Cadastro");
    }

    return (
        <Container style={styles.fundo}>
            <Image

                source={require("../../assets/logo-a.png")}
            />
            <TittleForm>
                DA AMEAÇÃO FANTASMA À ASCENSÃO SKYWALKER, A HISTÓRIA TE ESPERA!!!
            </TittleForm>
            <SubTittleForm>Realize Seu Login</SubTittleForm>
            <Input
                placeholder="Email"
            />
            <Input
                placeholder="Senha"
                secureTextEntry={true}
            />

            <ButtonBlue onPress={handleMain}>
                <ButtonBlueText>Entrar</ButtonBlueText>
            </ButtonBlue>
            <ButtonOutline style={styles.button} onPress={handleRegister}>
                <ButtonOutlineText style={styles.textButton}>Cadastrar</ButtonOutlineText>
            </ButtonOutline>
        </Container>
    );
}

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: "#FFFBEC",
    },
    button: {
        borderColor: "#394F9A",
    },
    textButton: {
        color: "#394F9A",
    },
});