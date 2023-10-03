// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, OAuthProvider, browserLocalPersistence, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "[REDACTED]",
    authDomain: "[REDACTED]",
    projectId: "[REDACTED]",
    storageBucket: "[REDACTED]",
    messagingSenderId: "[REDACTED]",
    appId: "[REDACTED]",
    measurementId: "[REDACTED]"
};

const twitchScopes = [
    "clips:edit",
    "channel:edit:commercial",
    "channel:manage:broadcast",
    "channel:manage:redemptions",
    "channel:read:redemptions",
    "channel:read:subscriptions",
    "moderation:read",
    "moderator:read:followers",
    "user:read:email",
    "bits:read"
];

export let app: FirebaseApp;
export let analytics: Analytics;
export let fireBaseAuth: Auth;
export let firebaseOAuthProvider: OAuthProvider;

export async function initializeFirebaseAsync() {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    fireBaseAuth = getAuth(app);
    firebaseOAuthProvider = new OAuthProvider("oidc.twitch.tv");
    firebaseOAuthProvider.addScope(twitchScopes.join(" "));
    firebaseOAuthProvider.setCustomParameters({
        force_verify: "true",
        claims: '{"userinfo":{"email":null,"email_verified":null,"picture":null,"updated_at":null}}'
    });
    await fireBaseAuth.setPersistence(browserLocalPersistence);
}
