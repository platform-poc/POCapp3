import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import { useMsal } from "@azure/msal-react";
import { authConfig } from "./authConfig";

import "./index.scss";

function Wrapper({ children }: { children: JSX.Element }) {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    loginWithRedirect
  } = useAuth0();

  const authWithPopup = () => {
    getAccessTokenWithPopup()
      .then(result => {
        console.log("POPUP_TOKEN_SUCCESS", result);
      })
      .catch(error => {
        console.log("POPUP_TOKEN_FAILED", error);
      });
  };

  useEffect(
    () => {
      if (isLoading) return;
      console.log("APP3: getting token silently");
      getAccessTokenSilently()
        .then(result => {
          console.log("SILENT_TOKEN_SUCCESS", result);
        })
        .catch(error => {
          console.log("SILENT_TOKEN_FAILED", error);
          // authWithPopup();
          loginWithRedirect();
        });
    },
    [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  return (<>
    {user && <div>User: {user?.name}</div>}
    {children}
  </>);
}

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: app3</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
    <Wrapper><>Auth initialized!</></Wrapper>
  </div>
);


const AppWrapper = () => {

  const { accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      console.log("APP3_MS_ACC", accounts[0]);
    }
  }, [accounts]);

  if (accounts.length < 1) return <>Loading...</>;

  return (<Auth0Provider
    domain={authConfig.domain}
    clientId={authConfig.clientId}
    useRefreshTokens={true}
    cacheLocation={"localstorage"}
    useRefreshTokensFallback={false}
    authorizationParams={{
      ...authConfig.authorizationParams,
      login_hint: accounts[0]?.username,
      redirect_uri: window.location.href
    }}
  >
    <App />
  </Auth0Provider>)
};

export default AppWrapper;
