import './globals.css'
import type { Metadata } from 'next'

// 修改这里的 metadata
export const metadata: Metadata = {
  title: 'AI恋爱预测 - 测试你们的缘分',
  description: '使用AI技术预测两个人的缘分匹配度',
  keywords: '恋爱预测,缘分测试,AI预测,姻缘测试',
  authors: [{ name: '你的名字' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',  // 如果你有自定义图标的话
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}