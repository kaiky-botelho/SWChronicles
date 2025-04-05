import React, { Component } from "react";
import { StyleSheet, Image, Text } from "react-native";
import {
    Container,
    Input,
    TittleForm,
    SubTittleForm,
    ButtonBlue,
    ButtonBlueText,
    ButtonOutline,
    ButtonOutlineText
} from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Cadastro extends Component {
    state = {
        nome: "",
        email: "",
        senha: "",
    };

    handleVoltar = () => {
        this.props.navigation.navigate("Login");
    };

    handleCadastro = async () => {
        const { nome, email, senha } = this.state;

        // Verifica se todos os campos foram preenchidos
        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        // Verifica se o e-mail é válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Digite um e-mail válido!");
            return;
        }

        const user = {
            nome,
            email,
            senha,
        };

        try {
            const storedUsers = await AsyncStorage.getItem("users");
            let users = storedUsers ? JSON.parse(storedUsers) : [];

            users.push(user);

            await AsyncStorage.setItem("users", JSON.stringify(users));

            alert("Cadastro realizado com sucesso!");
            this.props.navigation.navigate("Login");
        } catch (error) {
            alert("Erro ao salvar os dados. Tente novamente.");
            console.error(error);
        }
    };

    render() {
        return (
            <Container style={styles.fundo}>
                <Image source={require("../../assets/logo-a.png")} />
                <TittleForm>
                    FAÇA SEU CADASTRO E ENTRE NO MUNDO DE STAR WARS!!!
                </TittleForm>
                <SubTittleForm>Realize Seu Cadastro</SubTittleForm>

                <Input
                    placeholder="Nome"
                    value={this.state.nome}
                    onChangeText={(nome) => this.setState({ nome })}
                />
                <Input
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                />
                <Input
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={this.state.senha}
                    onChangeText={(senha) => this.setState({ senha })}
                />

                <ButtonBlue onPress={this.handleCadastro}>
                    <ButtonBlueText>Cadastrar</ButtonBlueText>
                </ButtonBlue>

                <ButtonOutline style={styles.button} onPress={this.handleVoltar}>
                    <ButtonOutlineText style={styles.textButton}>Voltar</ButtonOutlineText>
                </ButtonOutline>
            </Container>
        );
    }
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
