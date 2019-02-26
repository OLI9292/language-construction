import React, { Component } from "react"
import { compact, toString, sortBy } from "lodash"
import ReactJson from "react-json-view"

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

    const attrComponent = attr => {
      if (morpheme[attr] === null) return null
      if (attr === "irregular") {
        return (
          <div style={{ display: "flex" }} key={attr}>
            <p style={{ margin: "0 10px 0 0" }}>{attr}:</p>
            <ReactJson
              displayObjectSize={false}
              displayDataTypes={false}
              enableClipboard={false}
              src={JSON.parse(morpheme[attr])}
            />
          </div>
        )
      }
      return (
        <p key={attr}>
          {attr}: {toString(morpheme[attr])}
        </p>
      )
    }

    return (
      <div style={{ flex: 1, borderLeft: "1px solid #ccc" }}>
        <div style={{ marginLeft: "20px" }}>
          <h3>{morpheme.value.toUpperCase()}</h3>

          {compact(attrs.map(attrComponent))}

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
