import React, { Component } from "react"
import { sortBy } from "lodash"

import { getLanguages } from "../models/language"
import { getDictionaries } from "../models/dictionary"
import { getMorphemes, getWord } from "../models/morpheme"

import TextButton from "./common/textButton"

import Dictionary from "./dictionary"
import EditMorpheme from "./morpheme"
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

    this.matchesSetLanguage = this.matchesSetLanguage.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const languages = await getLanguages()
    const dictionaries = await getDictionaries()
    const morphemes = await getMorphemes()
    const selectedLanguage = languages[0]

    this.setState({ languages, selectedLanguage, dictionaries, morphemes })
  }

  async fetchWord(id) {
    const { word, derivedFrom } = await getWord(id)
    this.setState({
      selectedMorpheme: word,
      derivations: derivedFrom
    })
  }

  matchesSetLanguage(model) {
    return model.languageId == this.state.selectedLanguage.id
  }

  render() {
    const {
      languages,
      selectedLanguage,
      dictionaries,
      morphemes,
      selectedMorpheme,
      selectedView,
      inContext,
      derivations
    } = this.state

    const morphemeComponent = morpheme => {
      const selected = selectedMorpheme && morpheme.id === selectedMorpheme.id
      const color = selected ? "blue" : selectedMorpheme ? "#a9a9a9" : "black"
      return (
        <TextButton
          margin="0 0 10px 0"
          color={color}
          onClick={() => {
            if (selected) return
            this.fetchWord(morpheme.id)
          }}
          key={morpheme.id}
        >
          {morpheme.value}
        </TextButton>
      )
    }

    const data = (() => {
      switch (selectedView) {
        case "dictionaries":
          return dictionaries
            .filter(this.matchesSetLanguage)
            .map(data => <Dictionary key={data.id} data={data} />)

        case "morphemes":
          const filtered = morphemes.filter(this.matchesSetLanguage)
          return sortBy(filtered, "value").map(morphemeComponent)

        case "clause generator":
          return (
            <ClauseGenerator
              setMorpheme={this.fetchWord.bind(this)}
              selectedLanguage={selectedLanguage}
            />
          )

        default:
          return null
      }
    })()

    return (
      <div>
        <h2 style={{ textAlign: "center" }}>PYROGEN</h2>

        <h3>MENU</h3>

        <div style={{ display: "flex", marginTop: "25px" }}>
          <b style={{ width: "90px" }}>Language:</b>
          {languages.sort().map(language => (
            <TextButton
              casing="capitalize"
              selected={language.id === selectedLanguage.id}
              key={language.id}
              onClick={() => this.setState({ selectedLanguage: language })}
            >
              {language.name}
            </TextButton>
          ))}
        </div>

        <br />

        <div style={{ display: "flex" }}>
          <b style={{ width: "90px" }}>View:</b>
          {views.sort().map(view => (
            <TextButton
              casing="capitalize"
              selected={view === selectedView}
              key={view}
              onClick={() =>
                this.setState({
                  selectedView: view,
                  selectedMorpheme: undefined
                })
              }
            >
              {view}
            </TextButton>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#ccc",
            margin: "0 auto",
            marginTop: "30px",
            marginBottom: "30px"
          }}
        />

        <h3>{selectedView.toUpperCase()}</h3>

        <div style={{ display: "flex", marginTop: "25px" }}>
          <div style={{ flex: 1 }}>{data}</div>

          {selectedMorpheme && (
            <EditMorpheme
              languages={languages}
              derivations={derivations}
              morpheme={selectedMorpheme}
              inContext={inContext}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
