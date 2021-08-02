import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `http://localhost:5000/planet?name=${this.props.navigation.getParam(
        "planet_name"
      )}`,
    };
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        return this.setDetails(response.data.data);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };
  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/gas_giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/super_earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/neptune_like.png");
        break;
      default:
        break;
    }
    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };
  componentDidMount() {
    this.getDetails();
  }
  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
              <Text
                style={styles.cardItem}
              >{`Distance From Earth: ${details.distance_from_earth} Light Years`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance From Sun: ${details.distance_from_their_sun}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity: ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Period: ${details.orbital_period}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Speed: ${details.orbital_speed}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Mass: ${details.planet_mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Radius: ${details.planet_radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Type: ${details.planet_type}`}</Text>
            </View>
            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>
                {details.specifications
                  ? `Specifications: ${details.specifications}`
                  : ""}
              </Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ margin: 50 }}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardItem: {
    marginBottom: 10,
  },
});
