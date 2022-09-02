import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '../components/ui/Navigation';
import {PeopleProvider} from '../components/context/PeopleProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PeopleProvider>
      <Navigation />
      <Component {...pageProps} />
    </PeopleProvider>
  )
}

export default MyApp
