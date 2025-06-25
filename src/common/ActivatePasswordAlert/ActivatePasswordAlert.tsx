"use client";

import { Alert, UnstyledButton } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from "./ActivatePasswordAlert.module.css";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";

export default function ActivatePasswordAlert({ user }: { user?: { email: string, name: string, image: string } }) {
  const userData = useAppSelector((state) => state.user.data);
  const loading = useAppSelector((state) => state.user.isLoading);
  const pathname = usePathname();

  const handleResetToken = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/resetToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email }),
    });
  };

  if (!user || loading || !userData) {
    return null;
  }

  if (!userData.resetPasswordTime) {
    return null;
  }

  const resetTime = new Date(userData.resetPasswordTime);
  const now = new Date();
  const diffMs = resetTime.getTime() - now.getTime();

  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
  const diffMinutes = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)));

  const isExpired = diffMs <= 0 || (diffHours === 0 && diffMinutes === 0);

  if (pathname.includes('dashboard/tool/text-to-image')) return null;
  if (pathname.includes('dashboard/tool/text-to-video')) return null;

  return (
    <Alert
      style={{ zIndex: 11 }}
      variant="filled"
      mx={10}
      mt={5}
      color="var(--yellow-contia)"
      withCloseButton
      onClose={() => {}}
      title={
        isExpired ? (
          <>
            El tiempo expiró. Resetea tu token haciendo click&nbsp;
            <UnstyledButton
              type="button"
              onClick={handleResetToken}
              style={{
                color: "var(--text-brown)",
                textDecoration: "underline",
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
                background: "none",
                border: "none",
              }}
            >
              aquí
            </UnstyledButton>
            .
          </>
        ) : (
          `Activa tu contraseña, para ello revisa tu bandeja de entrada del correo, tienes: ${diffHours} horas y ${diffMinutes} minutos para hacerlo.`
        )
      }
      icon={<IconInfoCircle />}
      classNames={{ label: classes.label, icon: classes.icon, closeButton: classes.closeButton }}
    />
  );
}
