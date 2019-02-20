const axios = require("axios")
const API_URL = "http://localhost:5000/graphql"

module.exports = (query, route) =>
  axios({
    url: API_URL,
    method: "POST",
    data: { query }
  }).then(result => {
    if (result.data.data.error) {
      console.log("ERR:", result.data.data.error)
      return
    }
    console.log(route, result.data.data)
    return result.data.data[route]
  })
