import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';

import user from "./reducers/user";
import session from "./reducers/session";
import dashboard from "./reducers/dashboard";
import email from "./reducers/email";
import optionOrder from "./reducers/optionOrder";
import stockOrder from "./reducers/stockOrder";
import history from "./reducers/history";
import report from "./reducers/report";
import setting from "./reducers/setting";
import stock from "./reducers/stock";
import import_ from "./reducers/import";
import comment from "./reducers/comment";
import profile from "./reducers/profile";
import watchList from "./reducers/watchList";
import watchStock from "./reducers/watchStock";
import followerList from "./reducers/followerList";
import notification from "./reducers/notification";
import stockNews from "./reducers/stockNews";
import discover from "./reducers/discover";
import faq from "./reducers/faq";
import optionHistory from "./reducers/optionHistory";
import event from "./reducers/event";
import { i18nReducer } from "react-redux-i18n";
import note from "./reducers/note";
import knowledge from "./reducers/knowledge";
import knowledgeCategory from "./reducers/knowledgeCategory";
import balance from "./reducers/balance";
import calendar from "./reducers/calendar";
import marketWinLow from "./reducers/marketWinLow";
import legal from "./reducers/legal";
import optionTrade from "./reducers/optionTrade";
import pending from "./reducers/pending";

const appReducer = combineReducers({
    balance,
    calendar,
    comment,
    dashboard,
    discover,
    email,
    event,
    faq,
    followerList,
    history,
    import_,
    i18n: i18nReducer,
    knowledge,
    knowledgeCategory,
    legal,
    marketWinLow,
    note,
    notification,
    optionHistory,
    optionOrder,
    optionTrade,
    pending,
    profile,
    session,
    stockOrder,
    report,
    routing: routerReducer,
    setting,
    stock,
    stockNews,
    user,
    watchList,
    watchStock
});

const rootReducer = (state, action) => {
    // if (action.type === DESTROY_SESSION) {
    //state = undefined;
    //storage.removeItem('persist:root');
    //state = {};
    //action = {};
    //
    //}

    return appReducer(state, action);
};

export default rootReducer;