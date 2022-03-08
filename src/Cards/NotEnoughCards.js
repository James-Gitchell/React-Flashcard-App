import React from "react"
import { Link } from "react-router-dom"

export default function NotEnoughCards({cards, deckId}) {
    return (
        <>
        <h3>Not Enough Cards.</h3>
        <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-secondary">
          <span className="glyphicon glyphicon-plus"></span> Add Cards
        </Link>
        </>
    )
}