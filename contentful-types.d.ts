// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IArticleFields {
  /** Заголовок */
  title: string;

  /** slug */
  slug?: string | undefined;

  /** Описание */
  description?: string | undefined;

  /** Изображение */
  image?: Asset | undefined;

  /** Контент */
  content: Document;
}

export interface IArticle extends Entry<IArticleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "article";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IHomeFields {
  /** Заголовок */
  title?: string | undefined;

  /** Описание */
  description?: Document | undefined;

  /** Фон */
  background?: Asset | undefined;
}

export interface IHome extends Entry<IHomeFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "home";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE = "article" | "home";

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
