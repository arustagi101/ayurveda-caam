import MarkdownContent from '@/components/MarkdownContent';
import { fetchMarkdownContent } from '@/lib/fetchMarkdown';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | CAAM",
  description: "California Association of Ayurvedic Medicine Privacy Policy",
};

export default async function PrivacyPolicy() {
  const privacyPolicy = await fetchMarkdownContent('privacy-policy.md');
  
  return (
    <MarkdownContent markdown={privacyPolicy} />
  );
}
