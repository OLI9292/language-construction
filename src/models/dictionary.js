import query from "./query"

const dictionaryAttrs = "id data languageId"

export const getDictionaries = () =>
  query(`query { dictionaries { ${dictionaryAttrs} } }`, "dictionaries")
