import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

type NoteType = {
  id: number;
  title: string;
  content: string;
  date: string;
  tag: string;
};

const initialNotes: NoteType[] = [
  {
    id: 1,
    title: "Product Meeting",
    content: "Discuss new features and roadmap",
    date: "2023-04-24",
    tag: "Work",
  },
  {
    id: 2,
    title: "Grocery List",
    content: "Milk, eggs, bread, fruits",
    date: "2023-04-25",
    tag: "Personal",
  },
  {
    id: 3,
    title: "React Native Study",
    content: "Learn about hooks and context",
    date: "2023-04-26",
    tag: "Study",
  },
];

const tags = ["All", "Work", "Personal", "Study"];

const backgroundImage = "https://example.com/path/to/your/background-image.jpg";

export default function AllNotes() {
  const [notes, setNotes] = useState<NoteType[]>(initialNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filterNotes = () => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "All" || note.tag === selectedTag;
      const matchesDate = !selectedDate || note.date === selectedDate;
      return matchesSearch && matchesTag && matchesDate;
    });
  };

  const handleSearch = (text: string) => setSearchQuery(text);
  const handleTagSelect = (tag: string) => setSelectedTag(tag);
  const handleDateSelect = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const filteredNotes = filterNotes();

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={{ flex: 1 }}>
      <View className="flex-1 bg-black/50">
        {/* Search Bar */}
        <View className="flex-row items-center justify-between p-4 mt-5">
          <View className="w-full flex-1 flex-row items-center bg-white/20 rounded-full px-4 py-2 mr-4">
            <Feather name="search" size={20} color="white" />
            <TextInput
              className="flex-1 ml-2 text-base text-white placeholder-white/70"
              placeholder="Search notes..."
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              onChangeText={handleSearch}
              value={searchQuery}
            />
          </View>
        </View>

        <ScrollView className="flex-1 px-4 pt-4">
          {/* Filter by Date */}
          <Text className="text-lg font-bold mb-2 text-white">
            Filter by Date
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {Array.from(new Set(notes.map((note) => note.date))).map((date) => (
              <TouchableOpacity
                key={date}
                onPress={() => handleDateSelect(date)}
                className={`px-4 py-2 mr-2 rounded-full ${
                  selectedDate === date ? "bg-blue-500/80" : "bg-white/20"
                }`}
              >
                <Text className="text-white font-semibold">{date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Filter by Tag */}
          <Text className="text-lg font-bold mb-2 text-white">
            Filter by Tag
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => handleTagSelect(tag)}
                className={`px-4 py-2 mr-2 rounded-full ${
                  selectedTag === tag ? "bg-blue-500/80" : "bg-white/20"
                }`}
              >
                <Text className="text-white font-semibold">{tag}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Notes List */}
          {filteredNotes.map((note) => (
            <View
              key={note.id}
              className="bg-white/10 rounded-lg p-4 mb-4 overflow-hidden"
            >
              <Text className="text-lg font-bold mb-2 text-white">
                {note.title}
              </Text>
              <Text className="text-white/80 mb-2">{note.content}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-white/60">{note.date}</Text>
                <View className="bg-white/20 px-2 py-1 rounded-full">
                  <Text className="text-xs text-white/80">{note.tag}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Floating Add Button */}
        <Link href="/addedNote" asChild>
          <TouchableOpacity className="absolute right-4 bottom-4 bg-blue-500/80 rounded-full p-4 flex-row items-center justify-center shadow-lg">
            <Feather name="plus" size={24} color="#fff" />
            <Text className="ml-2 font-bold text-white">Add Note</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
}
