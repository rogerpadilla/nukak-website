import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { startCase } from './strings';

const docsDirectory = path.join(process.cwd(), 'docs');

function getFileNames(): string[] {
  return fs.readdirSync(docsDirectory);
}

function getFileTitle(id: string): string {
  return startCase(id);
}

function getFileId(fileName: string): string {
  return fileName.replace(/\.md$/, '');
}

export function getFileIds() {
  const fileNames = getFileNames();
  return fileNames.map((fileName) => ({
    params: {
      id: getFileId(fileName),
    },
  }));
}

export async function getFiles(): Promise<FileMetadata[]> {
  const fileNames = getFileNames();
  const docs = await Promise.all(fileNames.map((fileName) => getFile(fileName)));
  return docs.sort((a, b) => a.index - b.index);
}

export async function getFile(fileName: string, includeBody?: boolean): Promise<FileMetadata> {
  const id = getFileId(fileName);
  const title = getFileTitle(id);
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const doc: FileMetadata = { id, title, ...matterResult.data };
  if (includeBody) {
    doc.body = matterResult.content;
  }
  return doc;
}

export interface FileMetadata {
  id: string;
  title: string;
  body?: string;
  index?: number;
}
