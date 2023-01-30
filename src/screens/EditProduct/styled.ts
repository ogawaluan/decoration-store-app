import { SafeAreaView } from "react-native-safe-area-context";
import { FileImage, WarningCircle } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px 13px;
`;

export const ProductImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  position: relative;
`;

export const ProductImage = styled.Image`
  width: 176px;
  height: 139px;
  border-radius: 8px;
`;

export const ImageAlertContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 10px;
`;

export const Icon = styled(WarningCircle).attrs(({ theme }) => ({
  color: theme.colors.warning,
  size: 20,
}))``;

export const AlertText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.regular};
    font-size: 10px;
    color: ${theme.colors.warning};
    margin-right: 5px;
  `}
`;

export const ProductImageEditButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.mud};
  border-radius: 50px;
  width: 38px;
  height: 38px;
  position: absolute;
  top: -15px;
  right: 90px;
`;

export const ProductImageEditButtonIcon = styled(FileImage).attrs(
  ({ theme }) => ({
    size: 20,
    color: theme.colors.white,
  })
)``;

export const FormContainer = styled.ScrollView``;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.regular};
    font-size: ${theme.font_size.MD}px;
    color: ${theme.colors.mud};
    margin-bottom: 10px;
  `}
`;

export const RatingLabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 36px;
`;

export const RatingButtonContainer = styled.TouchableOpacity``;
