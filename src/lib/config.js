import * as dotenv from "dotenv"
dotenv.config()

module.exports = {
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:5000/graphql"
}
