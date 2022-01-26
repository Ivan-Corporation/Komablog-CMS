import {GetStaticPaths, GetStaticProps} from 'next';
import client from "../../../contentful";
import {IArticle, IArticleFields} from "../../../contentful-types";
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



const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

export default function Article({page}: { page: IArticle }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <main>
            <Head>
                <title>{page.fields.title}</title>
            </Head>
            <div>
                <h1>
                    {page.fields.title}
                </h1>
                <div>
                    {documentToReactComponents(page.fields.content!)}
                </div>
            </div>
            
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