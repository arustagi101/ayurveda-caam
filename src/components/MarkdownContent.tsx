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
      <style jsx global>{`
        .prose {
          color: #000 !important;
        }
        .prose * {
          color: inherit !important;
        }
        .prose ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin: 1rem 0 !important;
        }
        .prose li {
          margin: 0.5rem 0 !important;
        }
        .prose a {
          color: #2563eb !important;
        }
        .prose a:hover {
          color: #1e40af !important;
        }
        .prose h1, 
        .prose h2, 
        .prose h3, 
        .prose h4, 
        .prose h5, 
        .prose h6 {
          color: #000 !important;
          margin-top: 1.5em !important;
          margin-bottom: 0.5em !important;
        }
      `}</style>
    </div>
  );
}
