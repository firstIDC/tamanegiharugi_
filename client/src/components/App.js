import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

// pages for this product
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import LandingPage from "./views/LandingPage/LandingPage.js";
import Lotto7 from "./views/Lotto7/Lotto7.js";
import Lotto6 from "./views/Lotto6/Lotto6.js";
import LottoMini from "./views/LottoMini/LottoMini.js";
import LuckyNumberInfo from "./views/LuckyNumberInfo/LuckyNumberInfo.js";
// import LoginPage from "./views/LoginPage/LoginPage.js";
// import RegisterPage from "./views/RegisterPage/RegisterPage.js";
// import MovieDetail from "./views/MovieDetail/MovieDetail";
// import FavoritePage from "./views/FavoritePage/FavoritePage";

//null   Anyone Can go inside
//true   로그인 한 사람만 접속 가능
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div id='mainBox'
      //  style={{ paddingTop: '69px'}}
       >
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/lotto6" component={Auth(Lotto6, null)} />
          <Route exact path="/lotto7" component={Auth(Lotto7, null)} />
          <Route exact path="/minilotto" component={Auth(LottoMini, null)} />
          <Route exact path="/luckyNumberInfo" component={Auth(LuckyNumberInfo, null)} />
          <Route exact path="/luckyNumberInfo/:year/:month/:type" component={Auth(LuckyNumberInfo, null)} />
          {/* <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} /> */}
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
