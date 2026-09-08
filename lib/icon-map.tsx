import {
  Send,
  Code2,
  PencilRuler,
  FileImage,
  User,
  LayoutGrid,
  BookOpen,
  Server,
  Github,
  Link2,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  send: Send,
  "code-2": Code2,
  "pencil-ruler": PencilRuler,
  image: FileImage,
  user: User,
  "layout-grid": LayoutGrid,
  "book-open": BookOpen,
  server: Server,
  github: Github,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Link2;
}
