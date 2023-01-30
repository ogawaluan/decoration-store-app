import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainerStyle: {
    minHeight: 200,
    minWidth: 200,
    width: 300,
    padding: 35,
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 10,
  },
});
