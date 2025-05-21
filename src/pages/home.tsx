import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Sponsors from '../components/Sponsors';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <section className="section-bg-secondary">
        <Mission />
      </section>
      <section className="section-bg-primary">
        <Sponsors />
      </section>
    </Layout>
  );
}
