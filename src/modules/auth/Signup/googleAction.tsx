"use server";

import { auth, signIn, signOut } from "@/auth";

export async function GoogleActions() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    await signOut();
  } else {
    await signIn("google", {redirectTo: "/dashboard"});
  }
}