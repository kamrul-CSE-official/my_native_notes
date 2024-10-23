import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Edit3, ArrowRight } from "lucide-react-native";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

export default function LandingPage() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar style="auto" />
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center">
              <Edit3 size={28} color="#3b82f6" />
              <Text className="ml-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                My Notes
              </Text>
            </View>
          </View>

          <View className="items-center mb-8">
            <LottieView
              source={require("../assets/lottie/note.json")}
              autoPlay
              loop
              style={{ width: 250, height: 250 }}
            />
          </View>

          <View className="mb-12">
            <Text className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Capture Your Thoughts Anytime
            </Text>
            <Text className="text-xl text-gray-600 dark:text-gray-300 mb-6 text-center">
              Organize your ideas and memories with ease.
            </Text>
            <Link href="/" asChild>
              <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-full flex-row items-center justify-center">
                <Text className="text-white font-bold text-lg mr-2">
                  Get Started
                </Text>
                <ArrowRight size={20} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <Text className="text-sm text-gray-600 dark:text-gray-300 text-center">
          © 2024 My Notes || MD.Kamrul Hasan. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}
