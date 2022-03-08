import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../Home/Home";
import NotFound from "./NotFound";
import DeckView from "../Deck/DeckView";
import NewDeck from "../Deck/NewDeck";
import EditDeck from "../Deck/EditDeck";
import NewCard from "../Cards/NewCard";
import EditCard from "../Cards/EditCard";
import Study from "../Cards/Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/decks/new"}>
           <NewDeck />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <DeckView />
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route exact path={"/decks/:deckId/cards/new"}>
            <NewCard />
          </Route>
          <Route exact path={'/decks/:deckId/cards/:cardId/edit'}>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
