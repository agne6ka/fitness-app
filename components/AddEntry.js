import React, { Component } from "react";
import { getMetricMetaInfo } from "../utils/helpers";
import { View } from "react-native";

export default class AddEntry extends Component {
  render() {
    return <View>{getMetricMetaInfo("bike").getIcon()}</View>;
  }
}
