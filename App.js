import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import EntryDetail from "./components/EntryDetail";
import reducer from "./reducers";
import { purple, white } from "./utils/colors";
import Constants from "expo-constants";

function RenderStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="EntryDetail" component={EntryDetail} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <RenderStatusBar backgroundColor={purple} barStyle="light-content" />
        <NavigationContainer>
          <Tabs.Navigator
            initialRouteName="AddEntry"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let icon;
                if (route.name === "AddEntry") {
                  icon = (
                    <FontAwesome name="plus-square" size={size} color={color} />
                  );
                } else if (route.name === "History") {
                  icon = (
                    <Ionicons name="ios-bookmarks" size={size} color={color} />
                  );
                }
                return icon;
              },
            })}
            tabBarOptions={{
              activeTintColor: Platform.OS === "ios" ? purple : white,
              style: {
                height: 80,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 6,
                shadowOpacity: 1,
              },
            }}
          >
            <Tabs.Screen name="AddEntry" component={AddEntry} />
            <Tabs.Screen name="HistoryStack" component={HistoryStack} />
          </Tabs.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
