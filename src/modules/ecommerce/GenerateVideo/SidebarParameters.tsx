'use client';

import { Divider, Drawer, UnstyledButton } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconLogout2 } from '@tabler/icons-react'
import classes from './SidebarParameters.module.css'
import React, { useEffect } from 'react'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import VideoParameters from './VideoParameters';
import { sizesVideo } from '@/utils/aspectsRatio';
import { useTranslation } from 'react-i18next';

export interface SidebarParametersProps {
  selectedAspectRatio: typeof sizesVideo[0];
  setSelectedAspectRatio: (aspectRatio: typeof sizesVideo[0]) => void;
  // duration: number;
  // setDuration: (duration: number) => void;
  // selectedModel: string;
  // setSelectedModel: (model: string) => void;
  menuAspectRatio: boolean;
  setMenuAspectRatio: (menuAspectRatio: boolean) => void;
  uploadedImage: string | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SidebarParameters({
  selectedAspectRatio,
  setSelectedAspectRatio,
  // duration,
  // setDuration,
  // selectedModel,
  // setSelectedModel,
  menuAspectRatio,
  setMenuAspectRatio,
  uploadedImage,
  setUploadedImage
}: SidebarParametersProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isBigScreen = useMediaQuery('(min-width: 1402px)');
  const [opened, { open, close }] = useDisclosure(!isMobile);
  const router = useRouter();
  const { t } = useTranslation('dashboard');

    useEffect(() => {
      if (isMobile) {
        close();
      } else {
        open();
      }
    }, [isMobile, open, close]);

  return (
    <>
      <Drawer
        opened={opened} 
        onClose={close} 
        keepMounted
        closeOnEscape={false}
        withCloseButton={!isBigScreen}
        withOverlay={false}
        size={"auto"}
        title={t('dashboard.tool.video.ajustes')}
      >
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Divider my={10} />
            <VideoParameters
              selectedAspectRatio={selectedAspectRatio}
              setSelectedAspectRatio={setSelectedAspectRatio}
              // duration={duration}
              // setDuration={setDuration}
              // selectedModel={selectedModel}
              // setSelectedModel={setSelectedModel}
              menuAspectRatio={menuAspectRatio}
              setMenuAspectRatio={setMenuAspectRatio}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
        </nav>
      </Drawer>
      <UnstyledButton variant="default" onClick={open} className={classes.buttonAdjustments}>
        <IconAdjustmentsHorizontal stroke={2} />
      </UnstyledButton>

      <UnstyledButton variant="default" onClick={router.back} className={classes.buttonGoBack}>
        <IconLogout2 stroke={2} />
      </UnstyledButton>
    </>
  )
}
