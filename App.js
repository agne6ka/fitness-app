import React from "react";
import { getMetricMetaInfo } from "./utils/helpers";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      {getMetricMetaInfo("bike").getIcon()}
      <Text>Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
