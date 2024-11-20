import "./global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import JournalScreen from "./src/pages/journal";
import ChatScreen from "./src/pages/chat";
import ProfileScreen from "./src/pages/profile";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView edges={["top"]} className="flex-1 bg-white">
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#358860",
            tabBarInactiveTintColor: "#A1A1AA",
            tabBarStyle: {
              backgroundColor: "white",
              borderTopWidth: 1,
              borderTopColor: "#F1F1F1",
            },
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Chat") {
                iconName = "message-circle";
              } else if (route.name === "Journal") {
                iconName = "book";
              } else if (route.name === "Profile") {
                iconName = "user";
              }
              return <Feather name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Journal" component={JournalScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
