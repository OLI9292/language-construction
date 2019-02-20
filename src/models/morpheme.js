import query from "./query"

const morphemeAttrs =
  "id value animacy free copula person transitive intransitive irregular grammar languageId dictionaryId"

export const getMorphemes = () =>
  query(`query { morphemes { ${morphemeAttrs} } }`, "morphemes")
