import App from 'next/app';
import { TinaCMS, TinaProvider } from 'tinacms';
import {
  // useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github';
// import { HtmlFieldPlugin, MarkdownFieldPlugin } from 'react-tinacms-editor';

// const enterEditMode = () => {
//   return fetch(`/api/preview`).then(() => {
//     window.location.href = window.location.pathname;
//   });
// };

// const exitEditMode = () => {
//   return fetch(`/api/reset-preview`).then(() => {
//     window.location.reload();
//   });
// };

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null;
  const headers = new Headers();

  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  const resp = await fetch(`/api/preview`, { headers: headers });
  const data = await resp.json();

  if (resp.status == 200) window.location.href = window.location.pathname;
  else throw new Error(data.message);
};

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

export const EditLink = ({ cms }) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
};

const MyApp = ({ Component, pageProps }) => {
  console.log('pageProps in MyApp', pageProps);
  let cms = new TinaCMS({
    enabled: pageProps.preview,
    apis: {
      github: new GithubClient({
        proxy: '/api/proxy-github',
        authCallbackRoute: '/api/create-github-access-token',
        clientId: process.env.GITHUB_CLIENT_ID,
        baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      }),
    },
    sidebar: pageProps.preview,
    toolbar: pageProps.preview,
    // plugins: [MarkdownFieldPlugin],
  });
  console.log('CMS', cms);
  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        // editMode={pageProps.preview}
        // enterEditMode={enterEditMode}
        // exitEditMode={exitEditMode}
        onLogin={onLogin}
        onLogout={onLogout}
        error={pageProps.error}
      >
        <EditLink cms={cms} />
        <Component {...pageProps} />
      </TinacmsGithubProvider>
    </TinaProvider>
  );
};

export default MyApp;
