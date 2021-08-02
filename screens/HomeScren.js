import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: "http://localhost:5000",
    };
  }
  getPlanets = (min, max) => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        return this.setState({
          listData: this.state.listData.concat(
            response.data.data.slice(min, max)
          ),
        });
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  endReached = () => {
    this.getPlanets(
      this.state.listData.length,
      this.state.listData.length + 15
    );
  };
  componentDidMount() {
    this.getPlanets(0, 15);
  }
  render() {
    const { listData } = this.state;
    if (!listData.length) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.listData}
          onEndReached={this.endReached}
          onEndReachedThreshold={0.7}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                key={index}
                title={`Planet: ${item.name}`}
                subtitle={`Distance From Earth: ${item.distance_from_earth}`}
                titleStyle={styles.title}
                containerStyle={styles.listContainer}
                bottomDivider
                // chevron
                onPress={() => {
                  console.log("button clicked");
                  this.props.navigation.navigate("Details", {
                    planet_name: item.name,
                  });
                }}
                keyExtractor={(_item, index) => index.toString()}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#edc988" },
  upperContainer: { flex: 0.1, justifyContent: "center", alignItems: "center" },
  headerText: { fontSize: 30, fontWeight: "bold", color: "#132743" },
  lowerContainer: { flex: 0.9 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainerText: { fontSize: 20 },
  title: { fontSize: 18, fontWeight: "bold", color: "#d7385e" },
  listContainer: { backgroundColor: "#eeecda" },
});
