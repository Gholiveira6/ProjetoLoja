import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { set, z } from "zod";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  email: z.string().email({ message: "Email Inválido" }),
  password: z.string(),
});

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const result = schema.safeParse({ email, password });

    if (!result.success) {
      setEmail(result.error.issues[0].message);
      return;
    }

    if (password !== "123456") {
      setError("Senha Incorreta");
      return;
    }

    login(email);
    router.push("/profile");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
