import { Divider, Drawer, UnstyledButton } from "@mantine/core";
import classes from "./Generate.module.css";
import ImageSettings, { ImageSettingsProps } from "./ImageSettings";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconAdjustmentsHorizontal, IconLogout2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SidebarFilters({
  selectedAspectRatio,
  setSelectedAspectRatio,
  selectedStyles,
  setSelectedStyles,
  selectedIlumination,
  setSelectedIlumination,
  selectedCamera,
  setSelectedCamera,
  menuOpened,
  setMenuOpened,
  menuOpenedStyle,
  setMenuOpenedStyle,
  menuOpenedIlumination,
  setMenuOpenedIlumination,
  menuOpenedCamera,
  setMenuOpenedCamera,
  quantityImages,
  setQuantityImages,
  uploadedImage,
  setUploadedImage,
  setSelectedTypeTask,
  selectedTypeTask,
  menuOpenedTypeTask,
  setMenuOpenedTypeTask
}: ImageSettingsProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isBigScreen = useMediaQuery('(min-width: 1402px)');
  const [opened, { open, close }] = useDisclosure(!isMobile);
  const router = useRouter();

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
        title='Ajustes de Imagen'
      >
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            {/* <ScrollAreaAutosize mah="90vh" maw={400} mx="auto" scrollbarSize={10} type="always" classNames={{ viewport: classes.viewportScroll }}> */}
              {/* <Group className={classes.header} justify="space-between">
                <Text fz={20}>Ajustes de Imagen</Text>
              </Group> */}
              <Divider my={10} />
              <ImageSettings
                selectedAspectRatio={selectedAspectRatio}
                setSelectedAspectRatio={setSelectedAspectRatio}
                selectedStyles={selectedStyles}
                setSelectedStyles={setSelectedStyles}
                selectedIlumination={selectedIlumination}
                setSelectedIlumination={setSelectedIlumination}
                selectedCamera={selectedCamera}
                setSelectedCamera={setSelectedCamera}
                setQuantityImages={setQuantityImages}
                quantityImages={quantityImages}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
                menuOpenedStyle={menuOpenedStyle}
                setMenuOpenedStyle={setMenuOpenedStyle}
                menuOpenedIlumination={menuOpenedIlumination}
                setMenuOpenedIlumination={setMenuOpenedIlumination}
                menuOpenedCamera={menuOpenedCamera}
                setMenuOpenedCamera={setMenuOpenedCamera}
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
                setSelectedTypeTask={setSelectedTypeTask}
                selectedTypeTask={selectedTypeTask}
                menuOpenedTypeTask={menuOpenedTypeTask}
                setMenuOpenedTypeTask={setMenuOpenedTypeTask}
              />
            {/* </ScrollAreaAutosize> */}
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
  );
}