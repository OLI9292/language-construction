const axios = require("axios")
const { CONFIG } = require("../lib/config")

module.exports = (query, route) =>
  axios({
    url: CONFIG.API_URL,
    method: "POST",
    data: { query }
  })
    .then(result => {
      const data = result.data.data
      if (data.error) {
        console.log("ERR:", data.error)
        return
      }
      if (data[route]) return data[route]
      return data
    })
    .catch(error => console.log("ERR:", error))
