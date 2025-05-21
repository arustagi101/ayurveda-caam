import { GetStaticProps } from 'next';
import Head from 'next/head';
import { promises as fs } from 'fs';
import path from 'path';
import Layout from '../components/Layout';
import MarkdownContent from '../components/MarkdownContent';

interface PrivacyPolicyProps {
  privacyPolicy: string;
}

export default function PrivacyPolicy({ privacyPolicy }: PrivacyPolicyProps) {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="California Association of Ayurvedic Medicine Privacy Policy" />
      </Head>
      <MarkdownContent markdown={privacyPolicy} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'public', 'privacy-policy.md');
  const privacyPolicy = await fs.readFile(filePath, 'utf8');

  return {
    props: {
      privacyPolicy,
    },
  };
};
