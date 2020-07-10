import { useCallback } from 'react';
import Head from 'next/head';
import { join } from 'path';
import matter from 'gray-matter';
import SampleMDX from '../content/sample.md';
import dynamic from 'next/dynamic';

// tinaCMS
import { useCMS, useForm, usePlugin } from 'tinacms';
import {
  getGithubPreviewProps,
  parseJson,
  parseMarkdown,
} from 'next-tinacms-github';
import { useLocalMarkdownForm } from 'next-tinacms-markdown';
import { GetStaticProps } from 'next';
import { useGithubJsonForm, useGithubMarkdownForm } from 'react-tinacms-github';
import { usePlugins } from 'tinacms';
import { HtmlFieldPlugin, MarkdownFieldPlugin } from 'react-tinacms-editor';

export default function Home({ file }) {
  MarkdownFieldPlugin.__type = 'field';
  const formOptions = {
    label: 'Home Pagez',
    fields: [
      { name: 'title', label: 'Post Titles', component: 'text' },
      {
        name: 'markdownBody',
        label: 'Post body',
        component: MarkdownFieldPlugin.Component,
      },
    ],
  };
  // const formOptions = {
  //   label: "Home Page",
  //   fields: [{ name: "title", component: "text" }],
  // };
  const result = useGithubMarkdownForm(file, formOptions);
  console.log('result', result);
  // const result = useLocalMarkdownForm(file, formOptions);
  // const result = useGithubJsonForm(file, formOptions);
  const [data, form] = result;
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          {/* <SampleMDX /> */}
          {/**
           * Render the title from `home.json`
           */}
          {/* {data.title}
          {con.markdownBody} */}
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        {/* <Hello /> */}
      </main>
    </div>
  );
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function (passedProps) {
  const { preview, previewData } = passedProps;

  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/sample.md',
      parse: parseMarkdown,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/sample.md',
        data: dynamic(async () => await import('../content/sample.md').default),
        // data: (await import('../content/sample.md')).default,
      },
    },
  };
};
