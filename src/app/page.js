import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import classes from './page.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mohammer5&apos;s github page</title>
      </Head>

      <h1 className={classes.title}>Index</h1>
      <ul className={classes.linkList}>
        <li><Link href="/cv">CV</Link></li>
        <li><Link href="/way-of-working">Way of working</Link></li>
      </ul>
    </div>
  )
}
