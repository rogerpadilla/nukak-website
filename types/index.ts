export interface FileMetadata {
  id?: string;
  title?: string;
  content?: string;
  weight?: number;
  group?: boolean;
}

export interface SidenavItem {
  id?: string;
  title?: string;
  weight?: number;
  items?: SidenavItem[];
  isActive?: boolean;
}
