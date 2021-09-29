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
                                : "https://scontent.fhan5-3.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=3YCurt1IZskAX8Cznbu&_nc_ht=scontent.fhan5-3.fna&oh=50a9e272c962f81c64b502c784a587bf&oe=616A7778",
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
