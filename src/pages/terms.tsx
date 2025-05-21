import { GetStaticProps } from 'next';
import Head from 'next/head';
import { promises as fs } from 'fs';
import path from 'path';
import Layout from '../components/Layout';
import MarkdownContent from '../components/MarkdownContent';

interface TermsOfUseProps {
  terms: string;
}

export default function TermsOfUse({ terms }: TermsOfUseProps) {
  return (
    <Layout>
      <Head>
        <title>Terms of Use</title>
        <meta name="description" content="California Association of Ayurvedic Medicine Terms of Use" />
      </Head>
      <MarkdownContent markdown={terms} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'public', 'terms-of-use.md');
  const terms = await fs.readFile(filePath, 'utf8');

  return {
    props: {
      terms,
    },
  };
};
