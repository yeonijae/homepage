import type { Metadata } from "next";
import "./globals.css";
import ScrollAnimationProvider from "@/components/common/ScrollAnimationProvider";

export const metadata: Metadata = {
  title: "연이재한의원 | 병의 근원을 눌러, 보다",
  description: "복진으로 몸을 깊이 읽고, 환자를 따뜻하게 구하며, 오롯이 집중해 제대로 치료하는 한의원. 연이재에서 비로소 진정한 진료를 만나보세요.",
  keywords: ["연이재한의원", "한의원", "복진", "한방치료", "한약", "침치료"],
  openGraph: {
    title: "연이재한의원 | 병의 근원을 눌러, 보다",
    description: "복진으로 몸을 깊이 읽고, 환자를 따뜻하게 구하며, 오롯이 집중해 제대로 치료하는 한의원.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {/* Scroll Animation Observer */}
        <ScrollAnimationProvider />
        {/* Grain Overlay for premium feel */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

