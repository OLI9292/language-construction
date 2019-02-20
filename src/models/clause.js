import query from "./query"

export const getClauses = (template, tense) =>
  query(
    `query { clauses(template: "${template}", tense: "${tense}") }`,
    "clauses"
  )
