import { AntDesign } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  margin-top: 32px;
  flex-direction: row;
  padding: 0 10px;
`;

export const CardImage = styled.Image`
  width: 74px;
  height: 66px;
  margin-right: 16px;
  border-radius: 4px;
`;

export const CardDescriptionContainer = styled.View``;

export const CardTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.bold};
    font-size: ${theme.font_size.MD}px;
    color: ${theme.colors.black};
    line-height: 17px;
  `}
`;

export const CardType = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.regular};
    font-size: ${theme.font_size.MD}px;
    color: ${theme.colors.mud};
    line-height: 17px;
  `}
`;

export const CardDate = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.regular};
    font-size: 10px;
    color: ${theme.colors.mud};
  `}
`;

export const RatingContainer = styled.View`
  flex-direction: row;
`;

export const CardActionsContainer = styled.View`
  margin-left: auto;
`;

export const CardActionButton = styled.TouchableOpacity`
  align-items: flex-end;
`;

export const CardActionButtonIcon = styled(AntDesign).attrs(({ theme }) => ({
  color: theme.colors.mud,
  size: 24,
}))``;

export const CardPrice = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.bold};
    font-size: ${theme.font_size.LG}px;
    margin-top: auto;
  `}
`;
