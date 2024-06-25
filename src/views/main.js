import { Text, View, Platform, SafeAreaView, StatusBar } from "react-native";
import Tabs from "../componentes/tabs";
import Timer from "../componentes/timer";
import Boton from "../componentes/boton";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";

export default function Main() {
  const colores = ["#5170D5", "#5CAFF2", "#5CDEF2"];

  const [seleccion, setSeleccion] = useState("POMO" | "SHORT" | "LONG");
  const [activo, setActivo] = useState(false);
  const [tiempo, setTiempo] = useState(25 * 60);
  const [pausa, setPausa] = useState(false);

  const playSonido = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/alarma2.mp3")
    );
    await sound.playAsync();
  };

  useEffect(() => {
    let interval = null;

    if (activo) {
      interval = setInterval(() => {
        setTiempo(tiempo - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (tiempo === 0) {
      setActivo(false);
      setTiempo(seleccion === 0 ? 1500 : seleccion === 1 ? 300 : 600);
      playSonido();
    }

    return () => clearInterval(interval);
  }, [tiempo, activo]);

  return (
    <SafeAreaView
      style={[{ flex: 1 }, { backgroundColor: colores[seleccion] }]}
    >
      <StatusBar style="light" />
      <View style={{ marginTop: Platform.OS === "android" && 30 }}>
        <Tabs
          seleccion={seleccion}
          setSeleccion={setSeleccion}
          tiempo={tiempo}
          setTiempo={setTiempo}
        />
        <Timer t={tiempo} />
        <Boton activo={activo} setActivo={setActivo} />
      </View>
    </SafeAreaView>
  );
}
