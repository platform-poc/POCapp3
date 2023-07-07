export const authConfig = {
    domain: "dev-iq345rwyskpqun4m.us.auth0.com",
    clientId: "JJWH22MlvtyrpI4sz5iY0624akrVmwaf",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: "http://localhost:9081/sample/",
      connection: "AzureAd"
    }
}