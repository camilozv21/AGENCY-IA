import { ScrollAreaAutosize, Group, Text, Divider } from "@mantine/core";
import classes from "./Generate.module.css";
import ImageSettings, { ImageSettingsProps } from "./ImageSettings";

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
}: ImageSettingsProps) {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <ScrollAreaAutosize mah="90vh" maw={400} mx="auto">
          <Group className={classes.header} justify="space-between">
            <Text fz={20}>Ajustes de Imagen</Text>
          </Group>
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
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
            menuOpenedStyle={menuOpenedStyle}
            setMenuOpenedStyle={setMenuOpenedStyle}
            menuOpenedIlumination={menuOpenedIlumination}
            setMenuOpenedIlumination={setMenuOpenedIlumination}
            menuOpenedCamera={menuOpenedCamera}
            setMenuOpenedCamera={setMenuOpenedCamera}
          />
        </ScrollAreaAutosize>
      </div>
    </nav>
  );
}