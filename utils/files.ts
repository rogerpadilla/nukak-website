import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { titleCase } from './strings';
import { FileMetadata } from '../types';

const docsDirectory = path.join(process.cwd(), 'docs');

export function getFileIds(): string[] {
  return fs.readdirSync(docsDirectory).map((filePath) => getFileId(filePath));
}

function getFileId(fileName: string): string {
  return fileName.replace(/\.md$/, '');
}

export function getFileParams() {
  const ids = getFileIds();
  return ids.map((id) => ({ params: { id, }, }));
}

export function getFiles(): FileMetadata[] {
  const fileNames = getFileIds();
  const docs = fileNames.map((fileName) => getFile(fileName));
  return docs.sort((a, b) => a.weight - b.weight);
}

export function getFile(id: string): FileMetadata {
  const title = titleCase(id);
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);
  const doc: FileMetadata = { id, title, content, ...data };
  return doc;
}
