import React, { useEffect, useContext, Suspense } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "./contexts/auth-context";
import { userActions } from "./store/user";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const InboxPage = React.lazy(() => import("./pages/InboxPage"));
const ExplorePage = React.lazy(() => import("./pages/ExplorePage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const DetailPage = React.lazy(() => import("./pages/DetailPage"));
const SettingPage = React.lazy(() => import("./pages/SettingPage"));

function App() {
    const { token, isLoggedIn } = useContext(AuthContext);

    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCy3DlecRc2J-D1JH_4vF-B1ssMgnulLg4",
                {
                    method: "POST",
                    body: JSON.stringify({ idToken: token }),
                    headers: { "Content-Type": "application/json" },
                }
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then((data) => {
                            let errorMessage = "Authentication failed!";
                            if (data && data.error && data.error.message) {
                                errorMessage = data.error.message;
                            }
                            throw new Error(errorMessage);
                        });
                    }
                })
                .then((responseData) => {
                    dispatch(
                        userActions.getUserInfor({
                            username: responseData.users[0].displayName,
                            photoUrl: responseData.users[0].photoUrl
                                ? responseData.users[0].photoUrl
                                : "https://firebasestorage.googleapis.com/v0/b/instagram-clone-12b86.appspot.com/o/images%2FunsetAvatar.png?alt=media&token=28069a16-4eea-47ee-b069-67927cfdb3c6",
                            localId: responseData.users[0].localId,
                            email: responseData.users[0].email,
                        })
                    );
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    }, [dispatch, token]);

    return (
        <React.Fragment>
            <MainNavigation />
            <Layout>
                <Suspense
                    fallback={
                        <div className="centered">
                            <LoadingSpinner />
                        </div>
                    }
                >
                    <Switch>
                        <Route path="/" exact>
                            {!isLoggedIn && <Redirect to="/login" />}
                            {isLoggedIn && <HomePage />}
                        </Route>
                        {!isLoggedIn && (
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                        )}
                        {isLoggedIn && (
                            <Route path="/inbox">
                                <InboxPage />
                            </Route>
                        )}
                        {isLoggedIn && (
                            <Route path="/explore">
                                <ExplorePage />
                            </Route>
                        )}
                        {isLoggedIn && (
                            <Route path="/profile" exact>
                                <ProfilePage />
                            </Route>
                        )}
                        {isLoggedIn && (
                            <Route path="/profile/edit">
                                <SettingPage />
                            </Route>
                        )}
                        {isLoggedIn && (
                            <Route path="/post/:postId">
                                <DetailPage />
                            </Route>
                        )}
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </Suspense>
            </Layout>
        </React.Fragment>
    );
}

export default App;
