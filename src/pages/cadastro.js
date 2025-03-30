import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Input, TittleForm, SubTittleForm, ButtonBlue, ButtonBlueText, ButtonOutline, ButtonOutlineText } from "../styles";

export default function Cadastro() {

    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate("Login");
    }

    return(
        <Container style={styles.fundo}>
            <Image
                source={require("../../assets/logo-a.png")}
            />
            <TittleForm>
            FAÇA SEU CADASTRO E ENTRE NO MUNDO DE STAR WARS!!!
            </TittleForm>
            <SubTittleForm>Realize Seu Cadastro</SubTittleForm>
            <Input
                placeholder="Nome"
            />
            <Input
                placeholder="Email"
            />
            <Input
                placeholder="Senha"
                secureTextEntry={true}
            /> 
            <ButtonBlue>
                <ButtonBlueText>Cadastrar</ButtonBlueText>
            </ButtonBlue>
            <ButtonOutline style={styles.button} onPress={handleLogin}>
                <ButtonOutlineText style={styles.textButton}>Voltar</ButtonOutlineText>
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