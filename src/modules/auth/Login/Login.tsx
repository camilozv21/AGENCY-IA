"use client";

import {
  Button,
  // Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import classes from "./Login.module.css";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import type { Login } from "@/types/login.types";
import { useRouter } from "next/navigation";

interface FormValues { email: string; password: string }

export function Login() {
  const router = useRouter();

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    validateInputOnChange: ["email", "password"],

    initialValues: { email: "", password: "" },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
    },
  });

const handleSubmit = async (values: FormValues) => {
  const { email, password } = values;

  try {
    // const response = await loginUser({ email, password });
    const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    
    const response: Login = await responseFetch.json();

    if (response.error) {
      notifications.show({
        title: "Error",
        message: response.error || "No se pudo iniciar sesión",
        color: "red",
      });
      return;
    }

    notifications.show({
      title: "Éxito",
      message: "Inicio de sesión exitoso",
      color: "green",
    });

    form.reset();
    router.push("/dashboard");
  } catch (error) {
      console.error("Error durante el login:", error);
      notifications.show({
        title: "Error",
        message: "Error durante el inicio de sesión",
        color: "red",
      });
    }
};

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Text className={classes.title} ta="center" mt="md" mb={50}>
          ¡Bienvenido de vuelta!
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
            key={form.key("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
            key={form.key("password")}
          />
          {/* <Checkbox label="Mantenerme logeado" mt="xl" size="md" /> */}
          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            color="#F3C96B"
            style={{ color: "#1E1E2D" }}
          >
            Iniciar sesión
          </Button>
        </form>

        <Text ta="center" mt="md">
          Aun no tienes una cuenta?{" "}
          <Link
            href="/auth/signup"
            className={classes.link}
          >
            Registrarse
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
