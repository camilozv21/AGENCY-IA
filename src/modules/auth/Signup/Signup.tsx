"use client";

import {
  Button,
  Flex,
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
import { useState } from "react";
import { GoogleButton } from "./GoogleButton";
import { GoogleActions } from "./googleAction";
import { useTranslation } from "react-i18next";

interface FormValues { email: string; password: string }

export function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("auth");

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    validateInputOnChange: ["email", "password"],

    initialValues: { email: "", password: "" },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('auth.login.invalido')),
      password: (value) =>
        value.length < 8 ? t('auth.login.minimo') : null,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const { email, password } = values;

    try {
      setIsLoading(true);
      const response = await createNewUser({ email, password });

      if (!response.success) {
        setIsLoading(false);
        notifications.show({
          title: "Error",
          message: response.error || t('auth.signup.creating'),
          color: "red",
        });
        return;
      }

      setIsLoading(false);
      notifications.show({
        title: t('auth.signup.exito'),
        message: t('auth.signup.usuariocreado'),
        color: "green",
      });

      form.reset();
      router.push("/auth/login");
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating user:", error);
      notifications.show({
        title: "Error",
        message: t('auth.signup.creating'),
        color: "red",
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Text className={classes.title} ta="center" mt="md" mb={50}>
          {t('auth.signup.bienvenido')} <br /> {t('auth.signup.crea')}
        </Text>

        <Flex justify="center" mb="md">
          <form action={GoogleActions} style={{ width: "100%" }}>
            <GoogleButton fullWidth size="md" type="submit">
              {t('auth.signup.google')}
            </GoogleButton>
          </form>
        </Flex>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={t('auth.login.email')}
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
            key={form.key("email")}
          />
          <PasswordInput
            label={t('auth.login.password')}
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
            color="var(--yellow-contia)"
            style={{ color: "var(--text-brown)" }}
            loading={isLoading}
          >
            {t('auth.login.registrarse')}
          </Button>
        </form>

        <Text ta="center" mt="md">
          {t('auth.signup.cuenta')}{" "}
          <Link
            href="/auth/login"
            className={classes.link}
          >
            {t('auth.signup.iniciar')}
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
