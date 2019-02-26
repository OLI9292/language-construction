import query from "./query"

export const getClauses = (languageId, template, tense, number) =>
  query(
    `query {
      clauses(
        languageId: ${languageId},
        template: "${template}",
        tense: "${tense}",
        number: "${number}"
      )
    }`,
    "clauses"
  )
