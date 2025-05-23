import { promises as fs } from 'fs';
import path from 'path';

export async function fetchMarkdownContent(fileName: string, rootDir: string = 'public') {
    const filePath = path.join(process.cwd(), rootDir, fileName);
    const content = await fs.readFile(filePath, 'utf8');
    return content;
}