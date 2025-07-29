import { Menu, Text, Divider, Grid, Flex, ActionIcon, CloseButton, MenuTarget, NavLink, MenuDropdown, ScrollAreaAutosize, GridCol, Group, useMantineTheme, Select } from "@mantine/core";
import { useRef } from "react";
import { sizes, styles, iluminations, camera, typesTask } from "@/utils/aspectsRatio";
import { IconChevronRight, IconCloudUpload, IconDownload, IconPalette, IconSunLowFilled, IconX } from "@tabler/icons-react";
import Image from "next/image";
import classes from "./Generate.module.css";
import classesDrop from './DropzoneButton.module.css';
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

export interface ImageSettingsProps {
  selectedAspectRatio: typeof sizes[0];
  setSelectedAspectRatio: React.Dispatch<React.SetStateAction<typeof sizes[0]>>;
  selectedStyles?: typeof styles[0];
  setSelectedStyles: React.Dispatch<React.SetStateAction<typeof styles[0] | undefined>>;
  selectedIlumination?: typeof iluminations[0];
  setSelectedIlumination: React.Dispatch<React.SetStateAction<typeof iluminations[0] | undefined>>;
  selectedCamera?: typeof camera[0];
  setSelectedCamera: React.Dispatch<React.SetStateAction<typeof camera[0] | undefined>>;
  menuOpened: boolean;
  setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpenedStyle: boolean;
  setMenuOpenedStyle: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpenedIlumination: boolean;
  setMenuOpenedIlumination: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpenedCamera: boolean;
  setMenuOpenedCamera: React.Dispatch<React.SetStateAction<boolean>>;
  quantityImages: number;
  setQuantityImages: React.Dispatch<React.SetStateAction<number>>;
  uploadedImage: string | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTypeTask: React.Dispatch<React.SetStateAction<typeof typesTask[0]>>;
  selectedTypeTask: typeof typesTask[0];
  menuOpenedTypeTask: boolean;
  setMenuOpenedTypeTask: React.Dispatch<React.SetStateAction<boolean>>;
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  // maskText: string;
  // setMaskText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ImageSettings({
  selectedAspectRatio,
  setSelectedAspectRatio,
  selectedStyles,
  setSelectedStyles,
  selectedIlumination,
  setSelectedIlumination,
  selectedCamera,
  setSelectedCamera,
  setQuantityImages,
  quantityImages,
  menuOpened,
  setMenuOpened,
  menuOpenedStyle,
  setMenuOpenedStyle,
  menuOpenedIlumination,
  setMenuOpenedIlumination,
  menuOpenedCamera,
  setMenuOpenedCamera,
  uploadedImage,
  setUploadedImage,
  selectedTypeTask,
  setSelectedTypeTask,
  menuOpenedTypeTask,
  setMenuOpenedTypeTask,
  selectedModel,
  setSelectedModel,
  // maskText,
  // setMaskText
}: ImageSettingsProps) {
    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { t } = useTranslation('dashboard');

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
      <Text color='#C7C7C7' mt={10}>{t('dashboard.tool.image.seleccionar')}</Text>
        <Select
          mb="md"
          comboboxProps={{ withinPortal: true }}
          data={['Nova Canva']}
          defaultValue={'Nova Canva'}
          placeholder="Selecciona un modelo"
          onChange={(value) => setSelectedModel(value || 'Nova Canva')}
          value={selectedModel.toString()}
        />

      <Text color='#C7C7C7'>{t('dashboard.tool.image.generacion')}</Text>
      <Menu
        width={200}
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
          setMenuOpenedTypeTask(true);
        }}
        onClose={() => {
          setMenuOpenedTypeTask(false);
        }}
        opened={menuOpenedTypeTask}
      >
        <MenuTarget>
          <NavLink mb={15}
            label={
              <Flex align="center" gap="sm">
                {selectedTypeTask ? selectedTypeTask.label : 'Outpainting'}
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
              {t('dashboard.tool.image.generacion')}
            </Text>
            <CloseButton
              onClick={() => setMenuOpened(false)}
              aria-label="Close menu"
              size={20}
            />
          </Flex>
          <Divider />
          <Flex my={10} direction="column" align="flex-start">
            {typesTask.map((task, index) => (
              <Flex style={{ cursor: "pointer" }} direction="column" align="flex-start" key={index} p={'xs'} onClick={() => setSelectedTypeTask(task)}>
                {/* <ActionIcon variant={selectedTypeTask === task.label ? 'outline' : 'light'} aria-label='Aspect Ratio' color='gray' size={60}>
                  <task.icon size={24} />
                </ActionIcon> */}
                <Text>{t(`dashboard.tool.image.typestask.${index}.label`.replace(/-/g, ' '))}</Text>
              </Flex>
            ))}
          </Flex>
          </ScrollAreaAutosize>
        </MenuDropdown>
      </Menu>

      <Text color='#C7C7C7'>{t('dashboard.tool.image.aspectratio')}</Text>
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
          setMenuOpened(true);
        }}
        onClose={() => {
          setMenuOpened(false);
        }}
        opened={menuOpened}
      >
        <MenuTarget>
          <NavLink
            label={
              <Flex align="center" gap="sm">
                <selectedAspectRatio.icon size={16} />
                {selectedAspectRatio.ratio.replace(/-/g, ' ').replace('lg', '')}
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
              {t('dashboard.tool.image.aspectratio')}
            </Text>
            <CloseButton
              onClick={() => setMenuOpened(false)}
              aria-label="Close menu"
              size={20}
            />
          </Flex>
          <Divider />
          <Grid my={10}>
            {sizes.map((ratio, index) => (
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
                  <Text size="xs">{ratio.ratio.replace(/-/g, ' ').replace('lg', '')}</Text>
                </Flex>
              </GridCol>
            ))}
          </Grid>
          </ScrollAreaAutosize>
        </MenuDropdown>
      </Menu>

      <Divider my={10} />
      <Text fz={20} my={10}>
        {t('dashboard.tool.image.efectos')}
      </Text>

      <Text color='#C7C7C7'>{t('dashboard.tool.image.estilo')}</Text>
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
          setMenuOpenedStyle(true);
        }}
        onClose={() => {
          setMenuOpenedStyle(false);
        }}
        opened={menuOpenedStyle}
      >
        <MenuTarget>
          <NavLink
            label={
              <Flex align="center" gap="sm">
                {selectedStyles && selectedStyles.image !== 'ban.png' ? (
                  <Image
                    className={classes.styleImage}
                    src={`https://df50lbm4qcrt6.cloudfront.net/dashboard/styles/${selectedStyles.image}`}
                    alt={selectedStyles.name}
                    width={24}
                    height={24}
                  />
                ) : (
                  <IconPalette size={24} />
                )}
                <Text className={classes.styleName}>{t('dashboard.tool.image.estilo')}</Text>
              </Flex>
            }
            color="gray"
            rightSection={
              <Flex align={"center"} gap="sm">
                {selectedStyles?.name.toLowerCase() !== 'no style' && (
                  <Text size="xs" color="#C7C7C7" ml={5} className={classes.styleName}>
                    {selectedStyles?.name.replace(/-/g, ' ')}
                  </Text>
                )}
                <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
              </Flex>
            }
            active
          />
        </MenuTarget>
        <MenuDropdown>
        <ScrollAreaAutosize mah={'500px'} maw={400} mx="auto" offsetScrollbars scrollbarSize={4}>
          <Flex justify="space-between" align="center" px={10} py={5}>
            <Text size="sm" fw={700}>
              {t('dashboard.tool.image.estilo')}
            </Text>
            <CloseButton
              onClick={() => setMenuOpenedStyle(false)}
              aria-label="Close menu"
              size={20}
            />
          </Flex>
          <Divider />
          <Grid my={10} p={10}>
            {styles.map((style, index) => (
              <GridCol
                span={3}
                key={index}
                onClick={() => setSelectedStyles(style)}
                style={{ cursor: "pointer" }}
              >
                <Flex direction="column" align="center">
                  <ActionIcon variant={selectedStyles === style ? 'outline' : 'light'} aria-label='Estilo' color='gray' size={60}>
                    <Image src={`https://df50lbm4qcrt6.cloudfront.net/dashboard/styles/${style.image}`} alt={style.name} width={60} height={60} />
                  </ActionIcon>
                  <Text size="xs" ta={'center'} className={classes.styleName}>{t(`dashboard.tool.image.styles.${index}.name`.replace(/-/g, ' '))}</Text>
                </Flex>
              </GridCol>
            ))}
          </Grid>
          </ScrollAreaAutosize>
        </MenuDropdown>
      </Menu>
      
      <br />
      
      <Text color='#C7C7C7'>{t('dashboard.tool.image.iluminacion')}</Text>
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
          setMenuOpenedIlumination(true);
        }}
        onClose={() => {
          setMenuOpenedIlumination(false);
        }}
        opened={menuOpenedIlumination}
      >
        <MenuTarget>
          <NavLink
            label={
              <Flex align="center" gap="sm">
                {selectedIlumination && selectedIlumination.image !== 'ban.png' ? (
                  <Image
                    className={classes.styleImage}
                    src={`https://df50lbm4qcrt6.cloudfront.net/dashboard/ilumination/${selectedIlumination.image}`}
                    alt={selectedIlumination.type}
                    width={24}
                    height={24}
                  />
                ) : (
                  <IconSunLowFilled size={24} />
                )}
                <Text className={classes.styleName}>{t('dashboard.tool.image.iluminacion')}</Text>
              </Flex>
            }
            color="gray"
            rightSection={
              <Flex align={"center"} gap="sm">
                {selectedIlumination?.type.toLowerCase() !== 'none' && (
                  <Text size="xs" color="#C7C7C7" ml={5} className={classes.styleName}>
                    {selectedIlumination?.type.replace(/-/g, ' ')}
                  </Text>
                )}
                <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
              </Flex>
            }
            active
          />
        </MenuTarget>
        <MenuDropdown>
        <ScrollAreaAutosize mah={'500px'} maw={400} mx="auto" offsetScrollbars scrollbarSize={4}>
          <Flex justify="space-between" align="center" px={10} py={5}>
            <Text size="sm" fw={700}>
              {t('dashboard.tool.image.iluminacion')}
            </Text>
            <CloseButton
              onClick={() => setMenuOpenedIlumination(false)}
              aria-label="Close menu"
              size={20}
            />
          </Flex>
          <Divider />
          <Grid my={10} p={10}>
            {iluminations.map((style, index) => (
              <GridCol
                span={3}
                key={index}
                onClick={() => setSelectedIlumination(style)}
                style={{ cursor: "pointer" }}
              >
                <Flex direction="column" align="center">
                  <ActionIcon variant={selectedIlumination === style ? 'outline' : 'light'} aria-label='Estilo' color='gray' size={60}>
                    <Image src={`https://df50lbm4qcrt6.cloudfront.net/dashboard/ilumination/${style.image}`} alt={style.type} width={60} height={60} />
                  </ActionIcon>
                  <Text size="xs" ta={'center'} className={classes.styleName}>{t(`dashboard.tool.image.iluminations.${index}.type`.replace(/-/g, ' '))}</Text>
                </Flex>
              </GridCol>
            ))}
          </Grid>
          </ScrollAreaAutosize>
        </MenuDropdown>
      </Menu>
      
      <br />
      
      <Text color='#C7C7C7'>{t('dashboard.tool.image.camara')}</Text>
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
          setMenuOpenedCamera(true);
        }}
        onClose={() => {
          setMenuOpenedCamera(false);
        }}
        opened={menuOpenedCamera}
      >
        <MenuTarget>
          <NavLink
            label={
              <Flex align="center" gap="sm">
                {selectedCamera && selectedCamera.image !== 'ban.png' ? (
                  <Image
                    className={classes.styleImage}
                    src={`https://df50lbm4qcrt6.cloudfront.net/dashboard/camera/${selectedCamera.image}`}
                    alt={selectedCamera.type}
                    width={24}
                    height={24}
                  />
                ) : (
                  <IconSunLowFilled size={24} />
                )}
                <Text className={classes.styleName}>{t('dashboard.tool.image.camara')}</Text>
              </Flex>
            }
            color="gray"
            rightSection={
              <Flex align={"center"} gap="sm">
                {selectedCamera?.type.toLowerCase() !== 'none' && (
                  <Text size="xs" color="#C7C7C7" ml={5} className={classes.styleName}>
                    {selectedCamera?.type.replace(/-/g, ' ')}
                  </Text>
                )}
                <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
              </Flex>
            }
            active
          />
        </MenuTarget>
        <MenuDropdown>
        <ScrollAreaAutosize mah={'500px'} maw={400} mx="auto" offsetScrollbars scrollbarSize={4}>
          <Flex justify="space-between" align="center" px={10} py={5}>
            <Text size="sm" fw={700}>
              {t('dashboard.tool.image.camara')}
            </Text>
            <CloseButton
              onClick={() => setMenuOpenedCamera(false)}
              aria-label="Close menu"
              size={20}
            />
          </Flex>
          <Divider />
          <Grid my={10} p={10}>
            {camera.map((style, index) => (
              <GridCol
                span={3}
                key={index}
                onClick={() => setSelectedCamera(style)}
                style={{ cursor: "pointer" }}
              >
                <Flex direction="column" align="center">
                  <ActionIcon variant={selectedCamera === style ? 'outline' : 'light'} aria-label='Estilo' color='gray' size={60}>
                    <Image src={`https://df50lbm4qcrt6.cloudfront.net/dashboard/camera/${style.image}`} alt={style.type} width={60} height={60} />
                  </ActionIcon>
                  <Text size="xs" ta={'center'} className={classes.styleName}>{t(`dashboard.tool.image.camera.${index}.type`.replace(/-/g, ' '))}</Text>
                </Flex>
              </GridCol>
            ))}
          </Grid>
          </ScrollAreaAutosize>
        </MenuDropdown>
      </Menu>

      <div className={classesDrop.wrapper}>
        <Text color='#C7C7C7' my={10}>{t('dashboard.tool.image.subeimagen')}</Text>
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
                <Dropzone.Accept>{t('dashboard.tool.image.sueltaarchivos')}</Dropzone.Accept>
                <Dropzone.Reject>{t('dashboard.tool.image.filenosupported')}</Dropzone.Reject>
                <Dropzone.Idle>{t('dashboard.tool.image.dragimages')}</Dropzone.Idle>
              </Text>
  
              <Text className={classesDrop.description}>
                {t('dashboard.tool.image.or')} <br />
                <Text component="span" fw={700} fz="md" color={theme.colors.violet[6]} inherit>
                  {t('dashboard.tool.image.click')}
                </Text>
              </Text>
            </div>
          )}
        </Dropzone>
      </div>

      {/* {uploadedImage && (
        <TextInput 
          label={t('dashboard.tool.image.masktext')}
          placeholder={t('dashboard.tool.image.maskplaceholder')}
          disabled={!uploadedImage}
          value={maskText}
          onChange={(e) => setMaskText(e.target.value)}
          my="md"
        />
      )} */}
      
      <Text color='#C7C7C7' my={10}>{t('dashboard.tool.image.numeroimagenes')}</Text>
      <Select
        my="md"
        disabled={!!uploadedImage}
        comboboxProps={{ withinPortal: true }}
        data={['1', '2', '3']}
        defaultValue={'3'}
        placeholder="Selecciona un número"
        classNames={classes}
        onChange={(value) => setQuantityImages(Number(value))}
        value={quantityImages.toString()}
      />
    </>
  );
}