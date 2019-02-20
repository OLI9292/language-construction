import React, { Component } from "react"

import { getClauses } from "../models/clause"

const templates = ["random", "SVO", "SV", "S=P", "S="]
const tenses = ["random", "past", "present"]

class ClauseGenerator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clauses: [],
      selectedTemplate: templates[0],
      selectedTense: tenses[0]
    }
  }

  async handleClickedGenerate() {
    const { selectedTemplate, selectedTense } = this.state
    const clauses = await getClauses(selectedTemplate, selectedTense)
    this.setState({ clauses })
  }

  render() {
    const { clauses, selectedTemplate, selectedTense } = this.state

    const buttonStyle = selected => ({
      color: selected ? "blue" : "black",
      margin: "0 20px",
      cursor: "pointer"
    })

    const templateNavigation = templates.sort().map(template => {
      const selected = template === selectedTemplate
      return (
        <p
          style={buttonStyle(selected)}
          key={template}
          onClick={() => this.setState({ selectedTemplate: template })}
        >
          {template}
        </p>
      )
    })

    const tenseNavigation = tenses.sort().map(tense => {
      const selected = tense === selectedTense
      return (
        <p
          style={buttonStyle(selected)}
          key={tense}
          onClick={() => this.setState({ selectedTense: tense })}
        >
          {tense}
        </p>
      )
    })

    return (
      <div>
        <div style={{ display: "flex" }}>
          <b>Template:</b>
          {templateNavigation}
        </div>

        <br />

        <div style={{ display: "flex" }}>
          <b>Tense:</b>
          {tenseNavigation}
        </div>

        <br />

        <button
          style={{
            backgroundColor: "white"
          }}
          onClick={this.handleClickedGenerate.bind(this)}
        >
          Generate
        </button>

        {clauses.map((clause, idx) => (
          <p key={idx}>{clause}</p>
        ))}
      </div>
    )
  }
}

export default ClauseGenerator
