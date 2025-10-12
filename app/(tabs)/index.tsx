import { Link } from "expo-router";
import { View } from "react-native";
import { styles } from "../../styles/auth.styles.js";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href={"/(tabs)/notifications"}>Visit notification route</Link>
    </View>
  );
}
