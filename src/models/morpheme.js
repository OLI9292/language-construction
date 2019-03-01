import query from "./query"

const morphemeAttrs =
  "id value animacy free nounAttributes blacklist person transitive intransitive irregular grammar languageId dictionaryId"

const wordMorphemeAttrs = "wordId morphemeId value startIndex"

export const getMorphemes = () =>
  query(`query { morphemes { ${morphemeAttrs} } }`, "morphemes")

export const getWord = id =>
  query(
    `query {
      word(id: ${id}) {
        ${morphemeAttrs}
      }
      derivedFrom(id: ${id}) {
        morpheme {
          ${morphemeAttrs}
        }
        relationship {
          ${wordMorphemeAttrs}
        } 
      } 
    }`,
    "morphemes"
  )
