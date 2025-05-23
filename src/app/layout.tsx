import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Martel_Sans } from 'next/font/google';
import "./globals.css";

// Configure the Martel Sans font
const martelSans = Martel_Sans({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['latin', 'devanagari', 'latin-ext'], // Specify relevant subsets
  display: 'swap',    // Font display strategy
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${martelSans.className} antialiased font-martel theme-light`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
