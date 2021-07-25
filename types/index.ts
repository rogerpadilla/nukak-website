export interface FileMetadata {
  id?: string;
  title?: string;
  weight?: number;
  body?: string;
  group?: boolean;
}

export interface SidenavItem {
  id?: string;
  title?: string;
  weight?: number;
  items?: SidenavItem[];
  isActive?: boolean;
}
