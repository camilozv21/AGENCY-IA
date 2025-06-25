"use client";

import { userInfoFailure, userInfoStart, userInfoSuccess } from "@/lib/features/user/user";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

export default function SetupData({ user }: { user?: { email: string, name: string, image: string } }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;

    const setupUserData = async () => {
      try {
        dispatch(userInfoStart());
        const response = await fetch(`/api/user?email=${user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al configurar los datos del usuario');
        }

        const data = await response.json();
        dispatch(userInfoSuccess(data));
        console.log('Datos del usuario configurados:', data);
      } catch (error) {
        dispatch(userInfoFailure(error instanceof Error ? error.message : 'Error desconocido'));
        console.error('Error al configurar los datos del usuario:', error);
      }
    };

    setupUserData();
  }, [user, dispatch]);

  return null;
}
