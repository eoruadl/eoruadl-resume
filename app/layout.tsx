import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: '이력서 | 포트폴리오',
  description:
    '사용자 경험과 시스템 안정성을 함께 고려하는 소프트웨어 엔지니어의 이력서 및 프로젝트 포트폴리오 사이트입니다.',
  openGraph: {
    title: '이력서 | 포트폴리오',
    description:
      '사용자 경험과 시스템 안정성을 함께 고려하는 소프트웨어 엔지니어의 이력서 및 프로젝트 포트폴리오 사이트입니다.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
