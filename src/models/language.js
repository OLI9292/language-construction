import query from "./query"

const languageAttrs = "id name"

export const getLanguages = () =>
  query(`query { languages { ${languageAttrs} } }`, "languages")
