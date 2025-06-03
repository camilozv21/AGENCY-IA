"use server";

import { signIn } from "@/auth";

export async function CredentialsActions(formData: FormData) {
  await signIn("credentials", formData);
}