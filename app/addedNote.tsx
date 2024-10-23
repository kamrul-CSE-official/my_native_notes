import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

export default function Component() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("All");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      console.log({ title, content, tag, date });
      setIsSubmitting(false);
      // Reset form fields
      setTitle("");
      setContent("");
      setTag("All");
      //   Toast.show({
      //     type: "success",
      //     text1: "Hello!",
      //     text2: "This is a toast message 👋",
      //   });
    }, 2000);
  };

  const tags = ["All", "Work", "Personal", "Study"];

  const buttonScale = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <Animated.View
            style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
            className="p-6"
          >
            <Text className="text-4xl font-bold text-white mb-8 text-center mt-12">
              Create New Note
            </Text>

            <View className="space-y-6 my-3">
              <View>
                <Text className="text-sm font-medium text-gray-200 mb-2">
                  Title
                </Text>
                <TextInput
                  placeholder="Enter note title"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={title}
                  onChangeText={setTitle}
                  className="bg-white/20 p-4 rounded-lg text-white text-lg"
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-200 mb-2">
                  Content
                </Text>
                <TextInput
                  placeholder="Write your note here..."
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={content}
                  onChangeText={setContent}
                  multiline
                  numberOfLines={6}
                  className="bg-white/20 p-4 rounded-lg text-white text-lg"
                  textAlignVertical="top"
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-200 mb-2">
                  Tag
                </Text>
                <View className="bg-white/20 rounded-lg">
                  <Picker
                    selectedValue={tag}
                    onValueChange={(itemValue) => setTag(itemValue)}
                    dropdownIconColor="white"
                    style={{ color: "white" }}
                  >
                    {tags.map((tagOption) => (
                      <Picker.Item
                        label={tagOption}
                        value={tagOption}
                        key={tagOption}
                        color="black"
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <Animated.View
                className="my-5"
                style={{ transform: [{ scale: buttonScale }] }}
              >
                <TouchableOpacity
                  onPress={() => {
                    animateButton();
                    handleSubmit();
                  }}
                  disabled={isSubmitting}
                  className={`bg-white p-4 rounded-lg flex-row items-center justify-center ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <Text className="text-blue-500 font-bold text-lg">
                      Adding Note...
                    </Text>
                  ) : (
                    <>
                      <Feather name="plus-circle" size={24} color="#4c669f" />
                      <Text className="ml-2 text-blue-500 font-bold text-lg">
                        Add Note
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </Animated.View>

              <Link className="my-3" href="/" asChild>
                <TouchableOpacity className="bg-white/20 p-4 rounded-lg flex-row items-center justify-center">
                  <Feather name="arrow-left" size={24} color="white" />
                  <Text className="ml-2 text-white font-bold text-lg">
                    Back to Notes
                  </Text>
                </TouchableOpacity>
              </Link>

              <Link href="/test" asChild>
                <TouchableOpacity className="bg-white/20 p-4 rounded-lg flex-row items-center justify-center">
                  <Feather name="code" size={24} color="white" />
                  <Text className="ml-2 text-white font-bold text-lg">
                    Test Page
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
