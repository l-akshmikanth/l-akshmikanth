import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lakshmikanth | Web Developer & Invitation Designer",
  description:
    "Lakshmikanth — a passionate web developer from Karnataka, India. Building fast, responsive, and meaningful web experiences: college portals, digital invitations, and more.",
  openGraph: {
    title: "Lakshmikanth | Web Developer & Invitation Designer",
    description:
      "From college portals to digital wedding invitations — I build responsive web experiences that leave a lasting impression.",
    url: "https://l-akshmikanth.github.io/",
    siteName: "Lakshmikanth Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        {children}
      </body>
    </html>
  );
}
