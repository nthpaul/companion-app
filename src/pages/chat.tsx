import { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useChat } from "../hooks/useChat";

export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
};

export default function ChatScreen() {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    await sendMessage(inputText);
    setInputText("");
    flatListRef.current?.scrollToEnd();
  };

  const MessageBubble = ({ item }: { item: Message }) => (
    <View className="mb-3">
      <View
        className={`max-w-[85%] ${item.isUser ? "self-end" : "self-start"}`}
      >
        {!item.isUser && (
          <View className="flex-row items-center mb-1 ml-1">
            <View className="w-6 h-6 rounded-full bg-emerald-100 items-center justify-center">
              <Feather name="smile" size={14} color="#8B5CF6" />
            </View>
            <Text className="text-xs text-zinc-400 ml-2">Claude</Text>
          </View>
        )}
        <View
          className={`
          p-3.5 rounded-2xl
          ${
            item.isUser
              ? "bg-emerald-600 rounded-tr-none"
              : "bg-white rounded-tl-none shadow-sm border border-zinc-100"
          }
        `}
        >
          <Text
            className={`text-[15px] leading-[22px] ${
              item.isUser ? "text-white" : "text-zinc-700"
            }`}
          >
            {item.text}
          </Text>
        </View>
        <Text
          className={`text-xs mt-1 text-zinc-400 ${
            item.isUser ? "text-right mr-1" : "ml-1"
          }`}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  const TypingIndicator = () => (
    <View className="flex-row items-center space-x-1 ml-1 mb-3">
      <View className="w-6 h-6 rounded-full bg-emerald-100 items-center justify-center mb-1">
        <ActivityIndicator size="small" color="#8B5CF6" />
      </View>
      <Text className="text-xs text-zinc-400">Claude is typing...</Text>
    </View>
  );

  return (
    <SafeAreaView edges={["right", "left"]} className="flex-1 bg-zinc-50">
      <View className="px-4 py-3 border-b border-zinc-100 bg-white">
        <Text className="text-lg font-semibold text-zinc-800">Chat</Text>
      </View>

      <FlatList
        ref={flatListRef}
        className="flex-1 px-4"
        data={messages}
        renderItem={({ item }) => <MessageBubble item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListFooterComponent={isLoading ? <TypingIndicator /> : null}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View className="p-4 bg-white border-t border-zinc-100">
        <View className="flex-row items-center bg-zinc-50 rounded-2xl px-4 py-2">
          <TextInput
            className="flex-1 text-[15px] text-zinc-700 min-h-[40px]"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#A1A1AA"
            multiline
            // maxHeight={120}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
            className={`ml-2 p-2 ${
              !inputText.trim() || isLoading ? "opacity-40" : ""
            }`}
          >
            <Feather name="send" size={22} color="#358860" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
