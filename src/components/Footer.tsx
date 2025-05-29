"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail } from "lucide-react";

// Using shadcn Input component
import { Input } from "@/components/ui/input";
import CAAMButton from './CAAMButton';


type SocialLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/CaliforniaAyurveda',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/CALIFORNIAAYURVEDA',
    icon: Instagram,
  },
  {
    name: 'Email',
    href: 'mailto:hello@caam-ayurveda.org',
    icon: Mail,
  },
];

import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement actual newsletter signup logic here
    // For example, get form data and send to an API endpoint
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    console.log('Newsletter signup:', { name, email });
    alert('Thank you for subscribing! (This is a placeholder)');
    event.currentTarget.reset(); // Optionally reset the form
  };
  
  return (
    <footer className="border-t" style={{ borderColor: 'var(--dark-green)' }}>
      <div className="container py-12">
        <div className="flex flex-wrap -mx-4 h-full">
          {/* Left Column - Logo and Mission - 40% */}
          <div className="w-full md:w-2/5 px-4 mb-8 md:mb-0 flex flex-col h-full">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-20 w-40">
                  <Image 
                    src="/assets/logos/caam-logo-dark.png" 
                    alt="CAAM Logo" 
                    fill
                    sizes="(max-width: 768px) 100vw, 160px"
                    className="object-contain"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  California Association of Ayurvedic Medicine
                </h3>
              </div>
              <p className="text-sm mb-6 max-w-md">
                Advancing Ayurveda in California through education, community, and advocacy for holistic health and wellness.
              </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ name, href, icon: Icon }) => (
                    <Button
                      key={name}
                      variant="outline"
                      size="icon"
                      className="rounded-full h-9 w-9"
                      asChild
                    >
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Newsletter - 40% */}
          <div className="w-full md:w-2/5 px-4 mb-8 md:mb-0 h-full">
            <div className="h-full flex flex-col">
              <div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">Stay Updated</h3>
                <p className="text-sm">
                  Subscribe to our newsletter for the latest news and updates.
                </p>
              </div>
              <form className="space-y-3 mt-1" onSubmit={handleNewsletterSubmit}>
                    <Input 
                      id="name"
                      type="text" 
                      placeholder="Your name" 
                      className="w-full"
                    />
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="Your email"
                      className="w-full"
                      required
                    />
                  
                  <CAAMButton 
                    type="submit"
                    variant="outline"
                    className="w-full"
                  >
                    Subscribe
                  </CAAMButton>
              </form>
            </div>
          </div>

          {/* Right Column - Sponsor - 20% */}
          <div className="w-full md:w-1/5 px-4 h-full">
            <div className="h-full flex flex-col sponsor-card overflow-hidden group">
              <div className="px-5 pt-5 pb-3 text-center">
                <span className="inline-block sponsor-badge">
                  PLATINUM SPONSOR
                </span>
              </div>
              <div className="flex-1 flex flex-col">
                <a
                  href="https://athreyaayurveda.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                >
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 p-2 w-full h-full flex items-center justify-center">
                      <div className="relative w-full h-36">
                        <Image 
                          src="/assets/sponsors/athreya-sponsor-footer.png" 
                          alt="Athreya - Platinum Sponsor" 
                          fill
                          sizes="(max-width: 768px) 100vw, 144px"
                          className="object-contain transition-all duration-300 group-hover:scale-105"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--dark-green)' }}>
          <p className="text-sm">
            &copy; {currentYear} California Association of Ayurvedic Medicine. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Button variant="link" className="h-auto p-0 hover:text-primary font-medium" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="link" className="h-auto p-0 hover:text-primary font-medium" asChild>
              <Link href="/terms">Terms of Use</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
