import React, { Component } from "react"

import { getLanguages } from "../models/language"
import { getDictionaries } from "../models/dictionary"
import { getMorphemes } from "../models/morpheme"

import Dictionary from "./dictionary"
import ClauseGenerator from "./clauseGenerator"

const views = ["clause generator", "dictionaries", "morphemes"]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      languages: [],
      dictionaries: [],
      morphemes: [],
      selectedView: views[0]
    }
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const languages = await getLanguages()
    const dictionaries = await getDictionaries()
    const morphemes = await getMorphemes()
    const selectedLanguage = languages[0].id

    this.setState({ languages, selectedLanguage, dictionaries, morphemes })
  }

  render() {
    const {
      languages,
      selectedLanguage,
      dictionaries,
      morphemes,
      selectedView
    } = this.state

    const buttonStyle = selected => ({
      color: selected ? "blue" : "black",
      margin: "0 20px",
      cursor: "pointer",
      textTransform: "capitalize"
    })

    const languageNavigation = languages.sort().map(({ id, name }) => {
      const selected = id === selectedLanguage
      return (
        <p
          style={buttonStyle(selected)}
          key={id}
          onClick={() => this.setState({ selectedLanguage: id })}
        >
          {name}
        </p>
      )
    })

    const viewNavigation = views.sort().map(view => {
      const selected = view === selectedView
      return (
        <p
          style={buttonStyle(selected)}
          key={view}
          onClick={() => this.setState({ selectedView: view })}
        >
          {view}
        </p>
      )
    })

    const data = (() => {
      switch (selectedView) {
        case "dictionaries":
          return dictionaries
            .filter(
              ({ languageId }) => languageId === parseInt(selectedLanguage, 10)
            )
            .map(data => <Dictionary key={data.id} data={data} />)

        case "morphemes":
          return morphemes
            .map(data => data.value)
            .sort()
            .map(value => <p key={value}>{value}</p>)

        case "clause generator":
          return <ClauseGenerator />

        default:
          return null
      }
    })()

    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Pyrogen</h2>

        <h3>Menu</h3>

        <div style={{ display: "flex" }}>
          <b>Language:</b>
          {languageNavigation}
        </div>

        <br />

        <div style={{ display: "flex" }}>
          <b>View:</b>
          {viewNavigation}
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#ccc",
            margin: "0 auto",
            marginTop: "40px",
            marginBottom: "40px"
          }}
        />

        <h3 style={{ textTransform: "capitalize" }}>{selectedView}</h3>

        {data}
      </div>
    )
  }
}

export default App
