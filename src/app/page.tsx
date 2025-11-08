import Hero from '@/components/Hero';
import ProblemStatement from '@/components/ProblemStatement';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemStatement />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  );
}
