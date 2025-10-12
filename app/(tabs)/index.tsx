import { Link } from "expo-router";
import { View } from "react-native";
import { styles } from "../../styles/auth.styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href={"/(auth)/login"}>Visit notification route</Link>
    </View>
  );
}
