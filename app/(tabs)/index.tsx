import { Loader } from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { STORIES } from "@/constants/mock-data";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/feed.styles";

export default function Index() {
  const { signOut } = useAuth();
  const router = useRouter();
  const posts = useQuery(api.posts.getFeedPosts)

  if(posts === undefined) return <Loader />

  if(posts.length === 0) return <NoPostsFound />

  const handleSignOut = async () => {
    try {
      await signOut();         // encerra a sessão no Clerk
      router.replace("/login"); // redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insta Dev</Text>
        <TouchableOpacity onPress={() => handleSignOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 60}}
      >
        <FlatList 
          data={posts}
          renderItem={({item}) => <Post post={item}/>}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60}}
          ListHeaderComponent={<StoriesSection />}
        />
      </ScrollView>

    </View>
  );
}

const StoriesSection = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer} >
        {STORIES.map((story) => (
          <Story key={story.id} story={story}/>
        ))}
    </ScrollView> 
  )
}

const NoPostsFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 20, color: COLORS.primary }}>No posts yet</Text>
  </View>
);
