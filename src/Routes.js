import React from "react";
import { Redirect, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import {
  Portfolio as PortfolioView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Report as ReportView,
  History as HistoryView,
  Wall as WallView,
  NotFound as NotFoundView,
  Watchlist as WatchlistView,
  Suscription as SuscriptionView,
  Profile as ProfileView,
  Comment as CommentView,
  Recovery as RecoveryView,
  Reset as ResetView,
  Stock as StockView,
  Discover as DiscoverView,
  Faq as FaqView,
  Knowledge as KnowledgeView,
  Balance as BalanceView
} from "./views";
import Menu from "./menu";


//
const Routes = (props) => {
  return (// JSON.stringify()

    <Router basename="/" >
      {
        Object.keys(props.auth).length > 0 ? (
          <Switch>
            <Redirect exact from="/" to={Menu.portfolio.url} />
            <RouteWithLayout
              component={PortfolioView}
              exact
              layout={MainLayout}
              path={Menu.portfolio.url}
            />
            <RouteWithLayout
              component={ReportView}
              exact
              layout={MainLayout}
              path={Menu.report.url}
            />
            <RouteWithLayout
              component={StockView}
              // exact
              layout={MainLayout}
              path={Menu.stock.url}

            />
            <RouteWithLayout
              component={HistoryView}
              exact
              layout={MainLayout}
              path={Menu.history.url}
            />

            <RouteWithLayout
              component={BalanceView}
              exact
              layout={MainLayout}
              path={Menu.balance.url}
            />
            <RouteWithLayout
              component={WatchlistView}
              exact
              layout={MainLayout}
              path={Menu.watchlist.url}
            />
            <RouteWithLayout
              component={WallView}
              exact
              layout={MainLayout}
              path={Menu.wall.url}
            />
            <RouteWithLayout
              component={CommentView}
              exact
              layout={MainLayout}
              path={Menu.comment.url}
            />
            <RouteWithLayout
              component={DiscoverView}
              exact
              layout={MainLayout}
              path={Menu.discover.url}
            />
            <RouteWithLayout
              component={FaqView}
              exact
              layout={MainLayout}
              path={Menu.faq.url}
            />
            <RouteWithLayout
              component={KnowledgeView}
              exact
              layout={MainLayout}
              path={Menu.knowledge.url}
            />
            <RouteWithLayout
              component={SuscriptionView}
              exact
              layout={MainLayout}
              path={Menu.suscription.url}
            />
            <RouteWithLayout
              component={ProfileView}
              exact
              layout={MainLayout}
              path={Menu.profile.url}
            />
            <RouteWithLayout
              component={AccountView}
              exact
              layout={MainLayout}
              path={Menu.account.url}
            />
            <RouteWithLayout
              component={SettingsView}
              exact
              layout={MainLayout}
              path={Menu.setting.url}
            />
            <RouteWithLayout
              component={SignInView}
              exact
              layout={MinimalLayout}
              path={Menu.exit.url}
            />
            <RouteWithLayout
              component={NotFoundView}
              exact
              layout={MinimalLayout}
              path="/not-found"
            />
            <Redirect to="/not-found" />

          </Switch>
        ) :
          (
            <Switch>
              <Redirect exact from="/" to={Menu.exit.url} />
              <RouteWithLayout
                component={SignInView}
                exact
                layout={MinimalLayout}
                path={Menu.exit.url}
              />
              <RouteWithLayout
                component={SignUpView}
                exact
                layout={MinimalLayout}
                path={Menu.signup.url}
              />
              <RouteWithLayout
                component={RecoveryView}
                exact
                layout={MinimalLayout}
                path={Menu.recovery.url}
              />
              <RouteWithLayout
                component={NotFoundView}
                exact
                layout={MinimalLayout}
                path={Menu.exit.url}
              />
              <RouteWithLayout
                component={ResetView}
                exact
                layout={MinimalLayout}
                path={Menu.reset.url}
              />

              <Redirect to={Menu.exit.url} />
            </Switch>
          )
      }
    </ Router>
  );
};



const mapStateToProps = (reducer) => {
  return {
    auth: reducer.session.auth,
    // lang: reducer.configuration.lang,
  };
};


export default connect(mapStateToProps, null)(Routes);

