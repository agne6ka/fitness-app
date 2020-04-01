import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddEntry from "./components/AddEntry";

export default function App() {
  return (
    <View style={styles.container}>
      <AddEntry />
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
