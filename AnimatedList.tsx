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

const BG_IMG =
  "https://images.pexels.com/photos/36445/rose-close-up-pink-flower.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

// Wrap FlatList with Animated.createAnimatedComponent
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

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
      <AnimatedFlatList
        data={DATA}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
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
          const inputRange = [
            (index - 1) * ITEM_SIZE, // Before this item
            index * ITEM_SIZE, // Item is at its normal position
            (index + 1) * ITEM_SIZE, // Next item begins to appear
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 0], // Scale smaller before and after
            extrapolate: "clamp",
          });

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 0.5], // Fade out before and after
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                style.card,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            >
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
                <Text style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}>
                  {item?.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
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
