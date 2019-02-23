import { compact, toString, sortBy } from "lodash"

import React, { Component } from "react"

import TextButton from "./common/textButton"

const attrs = [
  "animacy",
  "free",
  "copula",
  "person",
  "transitive",
  "intransitive",
  "irregular"
]

class EditMorpheme extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { morpheme, inContext, derivations, languages } = this.props

    return (
      <div style={{ flex: 1, borderLeft: "1px solid #ccc" }}>
        <div style={{ marginLeft: "20px" }}>
          <h3>{morpheme.value.toUpperCase()}</h3>

          {compact(
            attrs.map(
              attr =>
                morpheme[attr] != null && (
                  <p key={attr}>
                    {attr}: {toString(morpheme[attr])}
                  </p>
                )
            )
          )}

          {derivations && (
            <div>
              <h3>DERIVATIONS</h3>
              {sortBy(derivations, "startIndex").map(derivation => {
                const { relationship } = derivation
                const { languageId } = derivation.morpheme
                const { value, startIndex } = relationship
                const language = languages.find(l => l.id == languageId)
                return (
                  <p key={startIndex}>
                    {value} ({language.name})
                  </p>
                )
              })}
            </div>
          )}

          {inContext && (
            <div>
              <h3>IN CONTEXT</h3>
              {Object.keys(inContext).map(attr => (
                <p key={attr}>
                  {attr}: {toString(inContext[attr])}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default EditMorpheme
