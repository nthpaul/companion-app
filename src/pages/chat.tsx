import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const ChatScreen = () => {
  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className="flex-1 bg-neutral-50"
    >
      {/* Header */}
      <View className="px-4 py-3 border-b border-neutral-200 bg-white">
        <Text className="text-lg font-medium text-neutral-700">Chat</Text>
      </View>

      {/* Messages */}
      <FlatList
        className="flex-1 p-4"
        data={[]}
        renderItem={({ item }: { item: Message }) => (
          <View
            className={`max-w-[80%] p-3 rounded-2xl mb-2 ${
              item.isUser
                ? "bg-violet-600 self-end rounded-br-sm"
                : "bg-white self-start rounded-bl-sm shadow-sm"
            }`}
          >
            <Text className={item.isUser ? "text-white" : "text-neutral-700"}>
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Input */}
      <View className="p-4 border-t border-neutral-200 bg-white">
        <View className="flex-row items-center bg-neutral-100 rounded-full px-4 py-2">
          <TextInput
            className="flex-1 text-neutral-700"
            placeholder="Message..."
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity className="ml-2">
            <Feather name="send" size={24} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
