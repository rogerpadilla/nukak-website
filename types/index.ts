export interface FileMetadata {
  id?: string;
  title?: string;
  index?: number;
  body?: string;
  group?: boolean;
}

export interface SidenavItem {
  id?: string;
  title?: string;
  index?: number;
  items?: SidenavItem[];
  isActive?: boolean;
}
