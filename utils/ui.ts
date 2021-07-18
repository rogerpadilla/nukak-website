import { FileMetadata, SidenavItem } from '../types';

export function buildSidenavItems(items: FileMetadata[], activeId: string): SidenavItem[] {
  return items.reduce((acc, it) => {
    const isActive = it.id === activeId;
    if (it.group) {
      const titleParts = it.title.split(' ');
      const itemTitle = titleParts[0];
      const groupTitle = titleParts[1];
      let group = acc.find((it) => it.title === groupTitle);
      if (!group) {
        const isActive = it.id.split('-')[1] === activeId.split('-')[1];
        group = { ...it, title: groupTitle, items: [], isActive };
        acc.push(group);
      }
      group.items.push({ ...it, title: itemTitle, isActive });
    } else {
      acc.push({ ...it, isActive });
    }
    return acc;
  }, [] as SidenavItem[]);
}
