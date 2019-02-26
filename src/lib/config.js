import * as dotenv from "dotenv"
dotenv.config()

export const CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:5000/graphql"
}
