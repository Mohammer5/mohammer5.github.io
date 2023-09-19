import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import classes from './layout.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mohammer5\'s github pages',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={classes.page}>
          <div className={classes.homeLink}>
            <Link href="/">Home</Link>
          </div>
          
          <div className={classes.wrapper}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
