import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { titleCase } from './strings';
import { FileMetadata } from '../types';

const docsDirectory = path.join(process.cwd(), 'docs');

function getFileNames(): string[] {
  return fs.readdirSync(docsDirectory);
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
  return docs.sort((a, b) => a.weight - b.weight);
}

export async function getFile(fileName: string, includeBody?: boolean): Promise<FileMetadata> {
  const id = getFileId(fileName);
  const title = titleCase(id);
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const doc: FileMetadata = { id, title, ...matterResult.data };
  if (includeBody) {
    doc.body = matterResult.content;
  }
  return doc;
}

