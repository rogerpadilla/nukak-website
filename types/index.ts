export interface FileMetadata {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  weight?: number;
  root?: boolean;
}

export interface SidenavItem extends FileMetadata {
  items?: SidenavItem[];
  isActive?: boolean;
}

export type Theme = 'dark' | 'light';
