import { TextProps, TouchableOpacityProps } from "react-native";
import Loading from "../Loading";
import * as S from "./styled";

export interface IButtonBaseProps {
  type?: "primary" | "warning";
  loading?: boolean;
}

export interface IButtonProps extends IButtonBaseProps, TouchableOpacityProps {
  title: string;
}

export interface IButtonTextProps extends IButtonBaseProps, TextProps {}

const Button = ({
  title,
  type = "primary",
  loading = false,
  ...rest
}: IButtonProps) => {
  return (
    <S.Container type={type} {...rest}>
      {loading ? <Loading /> : <S.Title type={type}>{title}</S.Title>}
    </S.Container>
  );
};

export default Button;
