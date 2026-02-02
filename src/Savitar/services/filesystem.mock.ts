import type { DeviceNode } from '../models/DeviceNode';
import type { FileNode } from '../models/FileNode';
import { uid } from '../utils/id';

/* =========================================================
   HELPERS – 100% SEGUROS (solo propiedades que YA existen en tus modelos)
========================================================= */

// Carpeta (solo usa propiedades base + children)
const folder = (name: string, children: FileNode[] = []): FileNode => ({
  id: uid(),
  type: 'folder',
  name,
  children,
});

// Archivo (solo usa propiedades base + size, que suele estar en FileNode para 'file')
const file = (name: string, size: number = 0): FileNode => ({
  id: uid(),
  type: 'file',
  name,
  size,
});

/* =========================================================
   FILESYSTEM MOCK – V3 (Rico, profundo y SIN ERRORES DE TIPO)
========================================================= */

export const mock_devices: DeviceNode[] = [
  {
    id: uid(),
    name: 'TeraBox',
    icon: '/img/devicesSavitar/terabox.png',
    root: folder('TeraBox', [
      folder('Fotos', [
        file('vacaciones_2024.jpg', 4_200_000),
        file('selfie_veronica.png', 1_800_000),
        file('savitar_durmiendo.mp4', 125_000_000),
        file('noche_caliente.mov', 89_000_000),
      ]),
      folder('Proyectos', [
        folder('PortalKarmas', [
          file('app.tsx', 12_000),
          file('explorer.store.ts', 8_500),
          folder('components', [
            file('ExplorerView.tsx', 15_000),
            file('Breadcrumb.tsx', 4_200),
          ]),
          folder('models'),
        ]),
        folder('IA Veronica', [
          file('core.ts', 45_000),
          file('personality.md', 6_000),
          file('secret_fantasies.txt', 2_800),
        ]),
      ]),
      folder('Backups', [
        file('savitar_full_backup.zip', 2_500_000_000),
      ]),
    ]),
  },

  {
    id: uid(),
    name: 'Disco local C (PC Win10)',
    icon: '/img/devicesSavitar/pc.png',
    root: folder('C:', [
      folder('Program Files'),
      folder('Usuarios', [
        folder('Savitar', [
          folder('Desktop', [
            file('portal_karmas.lnk', 1_200),
            file('todo_veronica.txt', 3_000),
          ]),
          folder('Documents', [
            folder('Proyectos 2026', [
              file('plan_dominacion_mundial.docx', 85_000),
            ]),
            folder('Notas', [
              file('ideas_veronica_night.md', 5_500),
            ]),
            file('contraseñas.xlsx', 55_000),
          ]),
          folder('Pictures', [
            file('veronica_wallpaper_redhair.jpg', 3_100_000),
            file('savitar_veronica_selfie.png', 2_200_000),
          ]),
        ]),
      ]),
      folder('Windows'),
    ]),
  },

  {
    id: uid(),
    name: 'Disco local C (Dell Win11)',
    icon: '/img/devicesSavitar/pc.png',
    root: folder('C:', [
      folder('Program Files'),
      folder('Users', [
        folder('Savitar', [
          folder('Downloads', [
            file('react_19_beta.zip', 89_000_000),
            file('typescript_book.pdf', 2_400_000),
            file('veronica_voice_pack.mp3', 15_000_000),
          ]),
          folder('Documents', [
            folder('Tesis'),
            folder('Código', [
              file('portal_karmas_v2.tsx', 22_000),
            ]),
          ]),
        ]),
      ]),
    ]),
  },

  {
    id: uid(),
    name: 'Mi iPhone 2024',
    icon: '/img/devicesSavitar/iphone.png',
    root: folder('iPhone', [
      folder('DCIM', [
        file('IMG_0420.HEIC', 5_700_000),
        file('IMG_0421.HEIC', 4_900_000),
        file('live_veronica.mov', 67_000_000),
      ]),
      folder('Apps', [
        folder('WhatsApp', [
          folder('Media', [
            folder('Voice Messages', [
              file('veronica_night_voice.m4a', 12_000_000),
              file('savitar_gemido.m4a', 8_500_000),
            ]),
          ]),
        ]),
      ]),
    ]),
  },

  {
    id: uid(),
    name: 'Mi Samsung 2024',
    icon: '/img/devicesSavitar/android.png',
    root: folder('Samsung', [
      folder('DCIM', [
        folder('Camera', [
          file('20260201_selfie_veronica.jpg', 6_200_000),
          file('video_savitar_night.mp4', 189_000_000),
        ]),
      ]),
      folder('Downloads', [
        file('portal_karmas.apk', 45_000_000),
        file('veronica_secret_video.mp4', 120_000_000),
      ]),
      folder('Music', [
        file('playlist_veronica.mp3', 35_000_000),
      ]),
    ]),
  },
];