import MarkdownContent from '@/components/MarkdownContent';
import { fetchMarkdownContent } from '@/lib/fetchMarkdown';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Use | CAAM",
  description: "California Association of Ayurvedic Medicine Terms of Use",
};

export default async function Terms() {
  const terms = await fetchMarkdownContent('terms-of-use.md');
  
  return (
    <MarkdownContent markdown={terms} />
  );
}
