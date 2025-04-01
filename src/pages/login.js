import React, { useState } from "react";
import { StyleSheet, Image, Text } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        const users = await AsyncStorage.getItem("users");
        if (!users) {
            setErrorMessage("Usuário não encontrado!");
            return;
        }
        
        const usersList = JSON.parse(users);
        const user = usersList.find((user) => user.email === email && user.senha === senha);
    
        if (user) {
            await AsyncStorage.setItem("loggedInEmail", email); // 🔥 Armazena o email do usuário logado
            navigation.navigate("Main");
        } else {
            setErrorMessage("Email ou senha incorretos!");
        }
    };
    

    const handleRegister = () => {
        navigation.navigate("Cadastro");
    };

    return (
        <Container style={styles.fundo}>
            <Image source={require("../../assets/logo-a.png")} />
            <TittleForm>
                DA AMEAÇA FANTASMA À ASCENSÃO SKYWALKER, A HISTÓRIA TE ESPERA!!!
            </TittleForm>
            <SubTittleForm>Realize Seu Login</SubTittleForm>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Senha"
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
            />
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <ButtonBlue onPress={handleLogin}>
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
    errorText: {
        color: "red",
        marginTop: 10,
    },
});
