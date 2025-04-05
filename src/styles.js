import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

export const ButtonOutline = styled.TouchableOpacity`
    background-color: transparent;
    border-width: 2px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 5px;
    width: 80%;
    align-items: center;
    max-width: 180px;
`;

export const ButtonOutlineText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;

export const ButtonBlue = styled.TouchableOpacity`
  background-color: #394F9A;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  width: 80%;
  align-items: center;
  max-width: 180px;
`;

export const ButtonBlueText = styled.Text`
    color: #FFFBEC;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;

export const Tittle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #394F9A;
  text-align: center;
  text-transform: uppercase;
`;

export const Paragraph = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2d2d2d;
  text-align: center;
  margin-bottom: 40px;
`;

export const SmallText = styled.Text`
  font-size: 14px;
  color: #2d2d2d;
  text-align: center;
  margin-top: 20px;
`;

export const TextUnderline = styled.Text`
  font-size: 14px;
  color: #394F9A;
  font-weight: bold;
  text-decoration: underline;
  `;

export const ContainerScroll = styled.ScrollView`
  flex: 1;
  background-color: #FFFBEC;
  gap: 20px;
  padding: 20px;
`;

// Formulario
export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#394F9A",
})`
    padding: 10px;
    width: 80%;
    max-width: 300px;
    color: #2d2d2d;
    border-color: #394F9A;
    border-width: 2px;
    border-radius: 5px;
    height: 50px;
    background-color: #FFFDF6;
`;

export const TittleForm = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #394F9A;
    text-align: center;
`;

export const SubTittleForm = styled.Text`
    font-size: 16px;
    color: #263C86;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #394F9A;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  height: 50px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: #ccc;
  border-radius: 8px;
`;

// Main
export const ButtonOutlineImage = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: #394F9A;
  padding: 10px;
  border-radius: 10px;
  margin-bottom:40px;
  position: relative;
`;

export const ButtonOutlineImageIcon = styled.Image`
  width: 80px;
  height: 80px;
  position: absolute;
  top: -28px;
  right: 10px;
`;

export const TextButtonImage = styled.Text`
  margin-left: 10px;
  font-size: 28px;
  font-weight: bold;
  color: #394f9a;
`;

// Itens Adicionados
export const ContainerItem = styled.View`
  align-items: center;
  margin: 0 20px 30px;
  border-width: 2px;
  border-color: #394F9A;
  padding: 10px;
  align-self: center;
  display: flex;
`;

export const PlanetInfoContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #FFFBEC;
  border: 2px solid #394F9A;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  max-width: 300px;
  align-self: stretch;
`;

export const PlanetInfoText = styled.Text` 
  font-size: 18px;
  color: #394F9A;
  font-weight: bold;
  margin-bottom: 10px;
  align-items: center;
`;

export const InfoContainer = styled.View`
  padding: 20px;
  background-color: #FFFBEC;
  border: 2px solid #394F9A;
  border-radius: 10px;
  margin: 10px;
  width: 100%;
  max-width: 350px; 
  align-self: stretch; 
  display: flex;
  
`;

export const ItemContainerText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  `;

export const ItemTitle = styled.Text` 
  font-size: 32px;
  color: #394F9A;
  font-weight: 900;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: center;
  text-transform: uppercase
  `;

export const ItemSubTitle = styled.Text`
  font-size: 20px; 
  color: #394F9A;
  font-weight: bold;
  margin-bottom: 10px;
  `;

export const ItemText = styled.Text`
  font-size: 16px;
  color: #2d2d2d;
  font-weight: 500;
  margin-bottom: 10px;
  `;

export const FilmeImage = styled.Image`
display: flex;
  width: 100%;
  max-width: 300px;
  height: 350px; 
  border-radius: 10px;
  align-items: center;
`;

export const MoreButton = styled.TouchableOpacity`
  background-color: #394F9A;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const MoreButtonText = styled.Text`

  color: #FFFBEC;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

export const OpeningCrawlTittle = styled.Text`
  font-size: 28px;
  color: #394F9A;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
`;

export const OpeningCrawlText = styled.Text`
  font-size: 20px;
  color: #2d2d2d;
  font-weight: 700;
  text-align: center;
  padding: 10px;
`;

export const FineLine = styled.View`
  border-bottom-width: 2px;
  border-color: #394F9A;
  margin: 10px 0;
`;