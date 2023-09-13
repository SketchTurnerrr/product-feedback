import './globals.css';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
export const dynamic = 'force-dynamic'; // this line is for the build to work :/

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Feedback',
  description: 'Frontend mentor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={jost.className}>{children}</body>
    </html>
  );
}
