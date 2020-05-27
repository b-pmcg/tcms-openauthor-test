import App from "next/app";
import { TinaCMS, TinaProvider } from "tinacms";
import {
  useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
} from "react-tinacms-github";

const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname;
  });
};

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

export const EditLink = ({ editMode }) => {
  const github = useGithubEditing();

  return (
    <button onClick={editMode ? github.exitEditMode : github.enterEditMode}>
      {editMode ? "Exit Edit Mode" : "Edit This Site"}
    </button>
  );
};

const MyApp = ({ Component, pageProps }) => {
  let cms = new TinaCMS({
    apis: {
      github: new GithubClient({
        proxy: "/api/proxy-github",
        authCallbackRoute: "/api/create-github-access-token",
        clientId: process.env.GITHUB_CLIENT_ID,
        baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      }),
    },
    sidebar: {
      hidden: !pageProps.preview,
    },
    toolbar: {
      hidden: !pageProps.preview,
    },
  });
  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        editMode={pageProps.preview}
        enterEditMode={enterEditMode}
        exitEditMode={exitEditMode}
        error={pageProps.error}
      >
        <EditLink editMode={pageProps.preview} />
        <Component {...pageProps} />
      </TinacmsGithubProvider>
    </TinaProvider>
  );
};

export default MyApp;
