const axios = require("axios")
const API_URL = require("../lib/config").API_URL

module.exports = (query, route) =>
  axios({
    url: API_URL,
    method: "POST",
    data: { query }
  }).then(result => {
    const data = result.data.data
    if (data.error) {
      console.log("ERR:", data.error)
      return
    }
    if (data[route]) return data[route]
    return data
  })
