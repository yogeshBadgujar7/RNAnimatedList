import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import Header from "./Header";
import { DATA } from "./DummyArray";
import AnimatedList from "./AnimatedList";

const BG_IMG =
  "https://images.pexels.com/photos/36445/rose-close-up-pink-flower.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

// Wrap FlatList with Animated.createAnimatedComponent
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default () => {
  const [isAnimatedList, setIsAnimatedList] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar hidden />
      <Image
        source={{
          uri: BG_IMG,
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={50}
      />
      <Header
        onpressAnimationListIcon={() => {
          setIsAnimatedList(!isAnimatedList);
        }}
      />
      {isAnimatedList ? (
        <AnimatedList />
      ) : (
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: 10,
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  height: 200,
                }}
              />
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <Animated.View style={[style.card]}>
                <Image source={{ uri: item?.image }} style={style.avatar} />
                <View
                  style={{
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>
                    {item?.name}
                  </Text>
                  <Text style={{ fontSize: 15, opacity: 0.7 }}>
                    {item?.jobTitle}
                  </Text>
                  <Text
                    style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}
                  >
                    {item?.email}
                  </Text>
                </View>
              </Animated.View>
            );
          }}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: SPACING / 2,
  },
});
