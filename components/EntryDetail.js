import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import MetricCard from "./MetricCard";
import { white } from "../utils/colors";
import TextButton from "./TextButton";
import { addEntry } from "../actions";
import { removeEntry } from "../utils/api";
import { CommonActions } from "@react-navigation/native";

class EntryDetail extends Component {
  static navigationOptions = () => {
    const { entryId } = this.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`,
    };
  };

  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  render() {
    const { metrics } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton style={{ margin: 20 }} onPress={this.reset}>
          RESET
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

function mapDispatchToProps(dispatch, { route, navigation }) {
  const { entryId } = route.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        })
      ),
    goBack: () => navigation.dispatch(CommonActions.goBack()),
  };
}

function mapStateToProps(entries, { route }) {
  const { entryId } = route.params;
  return {
    metrics: entries[entryId],
    entryId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
