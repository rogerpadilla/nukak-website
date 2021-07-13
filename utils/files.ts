import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import emoji from 'remark-emoji';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
const images = require('remark-images');
import { startCase } from './strings';

const docsDirectory = path.join(process.cwd(), 'docs');

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
  const docsPromise = fileNames.map((fileName) => getFile(fileName));
  const docs = await Promise.all(docsPromise);
  return docs.sort((a, b) => {
    if (a.date || b.date) {
      if (a.date) {
        return a.date.localeCompare(b.date);
      }
      return b.date.localeCompare(a.date) * -1;
    }
    return a.id.localeCompare(b.id);
  });
}

export async function getFile(fileName: string, includeBody?: boolean): Promise<FileMetadata> {
  const id = getFileId(fileName);
  const title = getFileTitle(id);
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const doc: FileMetadata = { id, title, ...matterResult.data };
  if (includeBody) {
    doc.body = await serialize(matterResult.content, { mdxOptions: { remarkPlugins: [images, emoji] } });
  }
  return doc;
}

function getFileNames(): string[] {
  return fs.readdirSync(docsDirectory);
}

function getFileId(fileName: string): string {
  return fileName.replace(/\.md$/, '');
}

function getFileTitle(id: string): string {
  return startCase(id);
}

export interface FileMetadata {
  id: string;
  title: string;
  date?: string;
  body?: MDXRemoteSerializeResult;
}
