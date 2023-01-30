import styled, { css } from "styled-components/native";
import { IButtonProps, IButtonTextProps } from ".";

export const Container = styled.TouchableOpacity<Omit<IButtonProps, "title">>`
  width: 100%;
  height: 54px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  ${({ theme, type, disabled }) => css`
    background-color: ${type === "primary"
      ? theme.colors.black
      : "transparent"};

    opacity: ${disabled ? 0.5 : 1};
  `}

  ${({ theme, type }) =>
    type === "warning" &&
    css`
      border: 1px solid ${theme.colors.warning};
    `}
`;

export const Title = styled.Text<IButtonTextProps>`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.font_family.bold};
    font-size: ${theme.font_size.LG}px;
  `}

  ${({ theme, type }) =>
    type === "warning" &&
    css`
      color: ${theme.colors.warning};
      font-family: ${theme.font_family.regular};
    `}
`;
