import { FileMetadata, SidenavItem } from '../types';

export function buildSidenavItems(items: FileMetadata[], activeId: string): SidenavItem[] {
  return items.reduce((acc, it) => {
    const isActive = it.id === activeId;
    if (it.root) {
      acc.push({ ...it, isActive });      
    } else {
      const titleParts = it.title.split(' ');
      const groupTitle = titleParts[0];
      const itemTitle = titleParts.slice(1).join(' ');
      let group = acc.find((it) => it.title === groupTitle);
      if (!group) {
        const isActive = it.id.split('-')[0] === activeId.split('-')[0];
        group = { ...it, title: groupTitle, items: [], isActive };
        acc.push(group);
      }
      group.items.push({ ...it, title: itemTitle, isActive });
    }
    return acc;
  }, [] as SidenavItem[]);
}
