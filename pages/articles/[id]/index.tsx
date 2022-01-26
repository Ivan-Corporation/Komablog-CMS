import {GetStaticPaths, GetStaticProps} from 'next';
import client from "../../../contentful";
import {IArticle, IArticleFields, IHome, IHomeFields} from "../contentful-types";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Head from "next/head";
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';




export default function Article({page}: { page: IArticle, articles:IArticle[], image: string }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <main>
            <Head>
                <title>{page.fields.title}</title>
            </Head>
            <Container maxWidth="lg" style={{paddingTop:'50px'}}>

                <div style={{padding:'8px'}}>
                <Link href='/'><Button variant="contained" color="info"><ArrowBackIcon/> Назад</Button></Link>
                </div>
                
                <Image src={`http:${page.fields.image?.fields.file.url!}`} width='1200px' height='500px' />
                <h1>
                    {page.fields.title}
                </h1>
                <div>
                    {documentToReactComponents(page.fields.content!)}
                </div>
                <Backdrop open={open} />
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              sx={{ position: 'relative', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
            >
            
                <SpeedDialAction
                  
                  icon={<SaveIcon />}
                  tooltipTitle={'Сохранить'}
                  tooltipOpen
                  onClick={handleClose}
                />
                <SpeedDialAction
                  
                  icon={<ShareIcon />}
                  tooltipTitle={'Поделиться'}
                  tooltipOpen
                  onClick={handleClose}
                />
             
            </SpeedDial>
                
                </Container>
            
            
        </main>
    )
}

export const getStaticPaths: GetStaticPaths = async (args) => {
    const articles = await client.getEntries<IArticleFields>({
        content_type: 'article'
    })

    return {
        paths: articles.items.map(article => {
            return {
                params: {
                    id: article.fields.slug
                }
            }
        }),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (args) => {
    const article = await client.getEntries<IArticleFields>({
        content_type: 'article',
        'fields.slug': args.params!.id!,
        limit: 1
    });

    const [page] = article.items;

    return {
        props: {
            page
        }
    }
}