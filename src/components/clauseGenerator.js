import React, { Component } from "react"

import TextButton from "./common/textButton"

import { getClauses } from "../models/clause"

const templates = ["random", "SVO", "SV", "S=P", "S="]
const tenses = ["random", "past", "present", "future"]
const numbers = ["random", "singular", "plural"]

const DEFAULTS = true
  ? {
      template: "SVO",
      tense: "future",
      number: "singular"
    }
  : {}

class ClauseGenerator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clauses: [],
      selectedTemplate: DEFAULTS.template || templates[0],
      selectedTense: DEFAULTS.tense || tenses[0],
      selectedNumber: DEFAULTS.number || numbers[0]
    }
  }

  async handleClickedGenerate() {
    const { selectedTemplate, selectedTense, selectedNumber } = this.state

    const clauses = await getClauses(
      this.props.selectedLanguage.id,
      selectedTemplate,
      selectedTense,
      selectedNumber
    )

    this.setState({ clauses: JSON.parse(clauses) })
  }

  render() {
    const {
      clauses,
      selectedTemplate,
      selectedTense,
      selectedNumber
    } = this.state

    return (
      <div>
        <div style={{ display: "flex" }}>
          <b style={{ width: "90px" }}>Template:</b>
          {templates.map(template => (
            <TextButton
              selected={template === selectedTemplate}
              key={template}
              onClick={() => this.setState({ selectedTemplate: template })}
            >
              {template}
            </TextButton>
          ))}
        </div>

        <br />

        <div style={{ display: "flex" }}>
          <b style={{ width: "90px" }}>Tense:</b>
          {tenses.map(tense => (
            <TextButton
              selected={tense === selectedTense}
              key={tense}
              onClick={() => this.setState({ selectedTense: tense })}
            >
              {tense}
            </TextButton>
          ))}
        </div>

        <br />

        <div style={{ display: "flex" }}>
          <b style={{ width: "90px" }}>Number:</b>
          {numbers.map(number => (
            <TextButton
              selected={number === selectedNumber}
              key={number}
              onClick={() => this.setState({ selectedNumber: number })}
            >
              {number}
            </TextButton>
          ))}
        </div>

        <br />

        <button onClick={this.handleClickedGenerate.bind(this)}>
          Generate
        </button>

        {clauses.map((clause, idx) => (
          <p key={idx}>
            {clause.map((elem, idx2) => (
              <span
                // onMouseOver={() =>
                //   this.props.setMorpheme(elem.id, elem["in context"])
                // }
                // onMouseLeave={() => this.props.setMorpheme()}
                style={{ marginRight: "2px" }}
                key={`${idx}-${idx2}`}
              >
                {elem.value}
              </span>
            ))}
          </p>
        ))}
      </div>
    )
  }
}

export default ClauseGenerator
