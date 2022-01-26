import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Image from 'next/image';
import logo from '../public/images/logo.png'
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import Breadcrumbs from '@mui/material/Breadcrumbs';





function MyApp({ Component, pageProps }: AppProps) {






  return (<>
    <AppBar position="static" color="primary" style={{height:'110px'}}>
          <Typography align="center" variant='h2'>Komablog</Typography> 
          <Typography align="center" variant='subtitle1'>Create articles <ArticleIcon /> with Contenful CMS support </Typography> 
        </AppBar>
        
  <Component {...pageProps} />
  </>
  )
}
export default MyApp
