import { Text, View } from "react-native";

import { LocalWeather } from '@/components/LocalWeather';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LocalWeather/>
    </View>
  );
}
