import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JournalScreen = () => {
  return (
    <SafeAreaView edges={["right", "left"]} className="flex-1 bg-neutral-50">
      <View className="px-4 py-3 border-b border-neutral-200 bg-white">
        <Text className="text-lg font-medium text-neutral-700">Journal</Text>
      </View>
    </SafeAreaView>
  );
};

export default JournalScreen;
