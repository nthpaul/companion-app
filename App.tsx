import "./global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import JournalScreen from "./src/pages/journal";
import ChatScreen from "./src/pages/chat";
import ProfileScreen from "./src/pages/profile";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView edges={["top"]} className="flex-1 bg-white">
        <Tab.Navigator screenOptions={({ route }) => ({})}>
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Journal" component={JournalScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
