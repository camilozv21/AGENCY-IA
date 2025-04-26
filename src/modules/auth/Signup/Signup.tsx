"use client";

import {
  Button,
  // Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import classes from "./Signup.module.css";
import { useForm } from "@mantine/form";
import { createNewUser } from "@/services/auth/signup";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormValues { email: string; password: string }

export function Signup() {
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
      const response = await createNewUser({ email, password });

      if (!response.success) {
        notifications.show({
          title: "Error",
          message: response.error || "Error creating user",
          color: "red",
        });
        return;
      }

      notifications.show({
        title: "Success",
        message: "User created successfully",
        color: "green",
      });

      form.reset();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error creating user:", error);
      notifications.show({
        title: "Error",
        message: "Error creating user",
        color: "red",
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Text className={classes.title} ta="center" mt="md" mb={50}>
          ¡Bienvenido! <br /> Crea tu cuenta
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
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            color="#F3C96B"
            style={{ color: "#1E1E2D" }}
          >
            Registrarse
          </Button>
        </form>

        <Text ta="center" mt="md">
          Ya tienes una cuenta?{" "}
          <Link
            href="/auth/login"
            className={classes.link}
          >
            Iniciar sesión
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
