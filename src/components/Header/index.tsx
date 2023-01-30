import { useNavigation } from "@react-navigation/native";
import * as S from "./styled";

export interface IHeaderProps {
  titleBold: string;
  title: string;
  hasBackButton?: boolean;
}

const Header = ({ titleBold, title, hasBackButton = false }: IHeaderProps) => {
  const navigation = useNavigation();

  return (
    <S.Container hasBackButton={hasBackButton}>
      {hasBackButton && (
        <S.BackButton onPress={navigation.goBack}>
          <S.BackIcon name="arrow-back" hasBackButton={hasBackButton} />
        </S.BackButton>
      )}

      <S.TitleBold hasBackButton={hasBackButton}>
        {titleBold + " "}
        <S.Title>{title}</S.Title>
      </S.TitleBold>
    </S.Container>
  );
};

export default Header;
