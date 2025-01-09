import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Header = ({
  onpressAnimationListIcon,
}: {
  onpressAnimationListIcon: () => void;
}) => {
  return (
    <SafeAreaView
      style={{
        height: 100,
        width: "100%",
        backgroundColor: "rgba(255,255,255,.5)",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={onpressAnimationListIcon}>
          <Image
            source={{
              uri: "https://icons.veryicon.com/png/o/miscellaneous/01-monochrome-linear-icon-library/menu-bar.png",
            }}
            style={{
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#232423",
          }}
        >
          Contacts
        </Text>
        <Image
          source={{
            uri: "https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png",
          }}
          style={{
            height: 25,
            width: 25,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;
