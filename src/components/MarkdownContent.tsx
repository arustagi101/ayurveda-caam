'use client'

import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  markdown: string;
}

export default function MarkdownContent({ markdown }: MarkdownContentProps) {

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
