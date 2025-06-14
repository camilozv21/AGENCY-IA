'use client';

import { ActionIcon, CloseButton, Divider, Flex, Grid, GridCol, Group, Menu, MenuDropdown, MenuTarget, NavLink, ScrollAreaAutosize, Select, Text, useMantineTheme } from "@mantine/core";
import { SidebarParametersProps } from "./SidebarParameters";
import { IconChevronRight, IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { sizesVideo } from "@/utils/aspectsRatio";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import classesDrop from "./DropzoneButton.module.css"
import { useRef } from "react";

export default function VideoParameters(
  {
    selectedAspectRatio,
    setSelectedAspectRatio,
    duration,
    setDuration,
    selectedModel,
    setSelectedModel,
    menuAspectRatio,
    setMenuAspectRatio,
    uploadedImage,
    setUploadedImage,
  }: SidebarParametersProps
) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
      <Text color='#C7C7C7'>Aspect Ratio</Text>
      <Menu
        width={320}
        offset={isMobile ? 10 : 25}
        shadow="md"
        position={isMobile ? "bottom" : "right-start"}
        closeOnClickOutside
        closeOnEscape
        closeOnItemClick
        clickOutsideEvents={['mousedown', 'touchstart']}
        keepMounted={true}
        transitionProps={{ duration: 150, transition: 'fade' }}
        onOpen={() => {
          setMenuAspectRatio(true);
        }}
        onClose={() => {
          setMenuAspectRatio(false);
        }}
        opened={menuAspectRatio}
      >
        <MenuTarget>
          <NavLink mb={15}
            label={
              <Flex align="center" gap="sm">
                <selectedAspectRatio.icon size={16} />
                {selectedAspectRatio ? selectedAspectRatio.ratio : '9:16'}
              </Flex>
            }
            color="gray"
            rightSection={
              <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
            }
            active
          />
        </MenuTarget>
        <MenuDropdown>
          <ScrollAreaAutosize mah={'500px'} maw={400} scrollbars='y' mx="auto" offsetScrollbars scrollbarSize={4}>
            <Flex justify="space-between" align="center" px={10} py={5}>
              <Text size="sm" fw={700}>
                Aspect Ratio
              </Text>
              <CloseButton
                onClick={() => setMenuAspectRatio(false)}
                aria-label="Close menu"
                size={20}
              />
            </Flex>
            <Divider />
            <Grid my={10}>
              {sizesVideo.map((ratio, index) => (
                <GridCol
                  span={3}
                  key={index}
                  onClick={() => setSelectedAspectRatio(ratio)}
                  style={{ cursor: "pointer" }}
                >
                  <Flex direction="column" align="center">
                    <ActionIcon variant={selectedAspectRatio === ratio ? 'outline' : 'light'} aria-label='Aspect Ratio' color='gray' size={60}>
                      <ratio.icon size={24} />
                    </ActionIcon>
                    <Text size="xs">{ratio.ratio.replace(/-/g, ' ')}</Text>
                  </Flex>
                </GridCol>
              ))}
            </Grid>
          </ScrollAreaAutosize>
        </MenuDropdown>
      </Menu>

      <Text color='#C7C7C7' mt={10}>Seleccionar modelo</Text>
      <Select
        mb="md"
        comboboxProps={{ withinPortal: true }}
        data={['Nova Reel', 'Veo 2']}
        defaultValue={'Nova Reel'}
        placeholder="Selecciona un modelo"
        onChange={(value) => setSelectedModel(value || 'Nova Reel')}
        value={selectedModel.toString()}
      />

      <div className={classesDrop.wrapper}>
        <Text color='#C7C7C7' my={10}>Sube tu propia imagen</Text>
        <Dropzone
          openRef={openRef}
          onDrop={handleDrop}
          className={classesDrop.dropzone}
          radius="md"
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg, MIME_TYPES.webp]}
          maxSize={30 * 1024 ** 2}
        >
          {uploadedImage ? (
            <>
              <img 
                src={uploadedImage} 
                alt="Preview" 
                style={{ width: "100%", height: "auto", objectFit: "contain" }} 
              />
              {/* <IconX 
                size={24}
                style={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20, 
                  cursor: 'pointer', 
                  background: 'rgba(0, 0, 0, 0.5)', 
                  borderRadius: '10%',
                  zIndex: 100
                }}
                onClick={() => setUploadedImage(null)}
              /> */}
            </>
          ) : (
            <div style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload size={50} color={theme.colors.violet[6]} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload size={50} stroke={1.5} className={classesDrop.icon} />
                </Dropzone.Idle>
              </Group>
  
              <Text ta="center" fw={700} fz="lg" mt="xl">
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Reject>File not supported</Dropzone.Reject>
                <Dropzone.Idle>Drag your images here</Dropzone.Idle>
              </Text>
  
              <Text className={classesDrop.description}>
                Or <br />
                <Text component="span" fw={700} fz="md" color={theme.colors.violet[6]} inherit>
                  click to upload
                </Text>
              </Text>
            </div>
          )}
        </Dropzone>
      </div>
    </>
  )
}
