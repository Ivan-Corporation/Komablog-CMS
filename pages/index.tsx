/* eslint-disable react/jsx-key */
import Head from 'next/head'
import {GetStaticProps} from "next";
import Link from 'next/link';
import client from "../contentful";
import {IArticle, IArticleFields, IHome, IHomeFields} from "../contentful-types";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import  Typography from '@mui/material/Typography';
import  Image from 'next/image';
import { CardActionArea } from '@material-ui/core';





export default function Home(props: { title: string, homePage: IHome, articles: IArticle[], image: string}): JSX.Element {




    return (
        <div>
            <Head>
                <title>{props.homePage.fields.title}</title>
            </Head>

            <main>
                {/* <div>
                    
                    <Typography align="center" variant="h2">{props.homePage.fields.title}</Typography>
                    <div>
                        {documentToReactComponents(props.homePage.fields.description!)}
                    </div>
                </div> */}

                <Container maxWidth="lg" style={{paddingTop:'50px'}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 

                        {props.articles.map((article, index) => {
                            return (
                                
                                <Link href={`/articles/${article.fields.slug}`} >

                                <Grid item xs={12} sm={6} md={4} >
                                <CardActionArea>
                                <Card className='articles' style={{height:'500px'}}>
                                <CardMedia
                                  component="img"
                                  height="300"
                                  image={`http:${article.fields.image?.fields.file.url}`}
                                  alt={article.fields.title}
                                />
                                  <Typography align="center" gutterBottom variant="h5" component="h2" style={{paddingTop:'20px'}}>
                                    <b>{article.fields.title}</b>
                                    </Typography>
                                    
                                    <Typography align="center" variant="subtitle2">
                                    {article.fields.description}
                                    </Typography>
                                  </Card>
                                  </CardActionArea>
                                </Grid>
                                </Link>
                                
                                      
                            )
                        })}
              </Grid>
              </Container>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const homePage = await client.getEntries<IHomeFields>({
        content_type: 'home',
        limit: 1
    });

    const articles = await client.getEntries<IArticleFields>({
        content_type: 'article'
    })

    const page = homePage.items[0];

    return {
        props: {
            homePage: page,
            articles: articles.items
        }
    }
}