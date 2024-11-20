import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
};

const sampleMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! How are you feeling today?",
    isUser: false,
    timestamp: "9:41 AM",
  },
  {
    id: "2",
    text: "I've been feeling a bit overwhelmed lately with work...",
    isUser: true,
    timestamp: "9:42 AM",
  },
  {
    id: "3",
    text: "I understand how challenging that can be. Would you like to tell me more about what's been overwhelming you?",
    isUser: false,
    timestamp: "9:42 AM",
  },
];

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(sampleMessages);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to listen and help. Can you tell me more about what's been happening?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View className="mb-4">
      <View
        className={`max-w-[85%] ${item.isUser ? "self-end" : "self-start"}`}
      >
        {!item.isUser && (
          <View className="flex-row items-center mb-1 ml-1">
            <View className="w-6 h-6 rounded-full bg-violet-100 items-center justify-center">
              <Feather name="smile" size={14} color="#8B5CF6" />
            </View>
            <Text className="text-xs text-zinc-400 ml-2">Therapist</Text>
          </View>
        )}
        <View
          className={`p-3.5 rounded-2xl ${
            item.isUser
              ? "bg-violet-600 rounded-tr-none"
              : "bg-white rounded-tl-none shadow-sm border border-zinc-100"
          }`}
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

  return (
    <SafeAreaView edges={["right", "left"]} className="flex-1 bg-zinc-50">
      {/* Header */}
      <View className="px-4 py-3 border-b border-zinc-100 bg-white">
        <Text className="text-lg font-semibold text-zinc-800">Chat</Text>
      </View>

      {/* Messages */}
      <FlatList
        className="flex-1 px-4"
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      />

      {/* Input */}
      <View className="p-4 bg-white border-t border-zinc-100">
        <View className="flex-row items-center bg-zinc-50 rounded-2xl px-4 py-2">
          <TextInput
            className="flex-1 text-[15px] text-zinc-700 min-h-[40px]"
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#A1A1AA"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!message.trim()}
            className={`ml-2 p-2 ${!message.trim() ? "opacity-40" : ""}`}
          >
            <Feather name="send" size={22} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
