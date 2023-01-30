import styled, { css } from "styled-components/native";
import Button from "../../Button";

export const Modal = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.regular};
    font-size: ${theme.font_size.MD}px;
    color: ${theme.colors.black};
    margin-bottom: 24px;
    text-align: center;
  `}
`;

export const TitleBold = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.bold};
  `}
`;

export const CustomButton = styled(Button)`
  margin-top: 10px;
`;
