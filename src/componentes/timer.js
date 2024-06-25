import { View, Text, StyleSheet } from "react-native";

export default Timer = ({ t }) => {
  const formatoTiempo = `${Math.floor(t / 60)
    .toString()
    .padStart(2, "0")} : ${(t % 60).toString().padStart(2, "0")}`;
  return (
    <View style={styles.contenedor}>
      <Text style={styles.text}>{formatoTiempo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 90,
    borderWidth: 1,
    backgroundColor: "#F5A53A",
    margin: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 50,
  },
});
