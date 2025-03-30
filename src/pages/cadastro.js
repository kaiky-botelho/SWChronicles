import React, { Component } from "react"; // Importando corretamente o Component
import { StyleSheet, Image, Text } from "react-native";
import { Container, Input, TittleForm, SubTittleForm, ButtonBlue, ButtonBlueText, ButtonOutline, ButtonOutlineText } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Certifique-se de importar o AsyncStorage

export default class Cadastro extends Component {

    state = {
        nome: "",
        email: "",
        senha: "",
    };

    handleVoltar = () => {
        this.props.navigation.navigate("Login");
    }

    handleCadastro = async () => {
        const { nome, email, senha } = this.state;
        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        const user = {
            nome,
            email,
            senha,
        };

        await AsyncStorage.setItem("user", JSON.stringify(user)); // Armazenando os dados
        alert("Cadastro realizado com sucesso!");
        this.props.navigation.navigate("Login"); // Navegando de volta para a tela de login
    }

    render() {
        return (
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
