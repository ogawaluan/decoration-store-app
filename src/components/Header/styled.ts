import { Ionicons } from "@expo/vector-icons";
import { TextProps, TouchableOpacityProps, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

interface IHeaderBaseProps {
  hasBackButton?: boolean;
}

interface IHeaderStyleContainerProps extends IHeaderBaseProps, ViewProps {}
interface IHeaderStyleTextProps extends IHeaderBaseProps, TextProps {}
interface IHeaderStyleButtonProps
  extends IHeaderBaseProps,
    TouchableOpacityProps {}

export const Container = styled.View<IHeaderStyleContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 21px 16px;
  background-color: ${({ theme, hasBackButton }) =>
    hasBackButton ? theme.colors.white : theme.colors.black};
`;

export const BackButton = styled.TouchableOpacity<IHeaderStyleButtonProps>`
  flex: 1;
`;

export const BackIcon = styled(Ionicons).attrs<IHeaderBaseProps>(
  ({ theme, hasBackButton }) => ({
    color: hasBackButton ? theme.colors.black : theme.colors.white,
    size: 32,
  })
)``;

export const TitleBold = styled.Text<IHeaderStyleTextProps>`
  ${({ theme, hasBackButton }) => css`
    font-family: ${theme.font_family.bold};
    font-size: ${theme.font_size.XL}px;
    color: ${hasBackButton ? theme.colors.black : theme.colors.white};
    flex: 1.9;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_family.light};
  `}
`;
