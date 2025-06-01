"use client";

import {
  Button,
  Flex,
  // Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import classes from "./Login.module.css";
import { useForm } from "@mantine/form";
// import { notifications } from "@mantine/notifications";
import Link from "next/link";
import type { Login } from "@/types/login.types";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { userInfoFailure, userInfoStart, userInfoSuccess } from "@/lib/features/user/user";
// import { useAppDispatch } from "@/lib/hooks";
import { GoogleActions } from "../Signup/googleAction";
import { GoogleButton } from "../Signup/GoogleButton";
import { CredentialsActions } from "./CredentialsActions";

interface FormValues { email: string; password: string }

export function Login() {
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useAppDispatch();

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

// const handleSubmit = async (values: FormValues) => {
//   const { email, password } = values;

//   try {
//     // const response = await loginUser({ email, password });
//     dispatch(userInfoStart());
//     setIsLoading(true);
//     const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//     });
    
//     setIsLoading(false);
//     const response: Login = await responseFetch.json();
//     dispatch(userInfoSuccess(response));

//     if (response.error) {
//       dispatch(userInfoFailure(response.error));
//       setIsLoading(false);
//       notifications.show({
//         title: "Error",
//         message: response.error || "No se pudo iniciar sesión",
//         color: "red",
//       });
//       return;
//     }

//     notifications.show({
//       title: "Éxito",
//       message: "Inicio de sesión exitoso",
//       color: "green",
//     });

//     form.reset();
//     router.push("/dashboard");
//   } catch (error) {
//       dispatch(userInfoFailure("Error durante el inicio de sesión"));
//       setIsLoading(false);
//       console.error("Error durante el login:", error);
//       notifications.show({
//         title: "Error",
//         message: "Error durante el inicio de sesión",
//         color: "red",
//       });
//     }
// };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Text className={classes.title} ta="center" mt="md" mb={50}>
          ¡Bienvenido de vuelta!
        </Text>

        <Flex justify="center" mb="md">
          <form action={GoogleActions} style={{ width: "100%" }}>
            <GoogleButton fullWidth size="md" type="submit">
              Inicia sesión con Google
            </GoogleButton>
          </form>
        </Flex>

        <form 
          action={CredentialsActions}
          // onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            name="email"
            size="md"
            {...form.getInputProps("email")}
            key={form.key("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            name="password"
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
            color="var(--yellow-contia)"
            style={{ color: "var(--text-brown)" }}
            // loading={isLoading}
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
