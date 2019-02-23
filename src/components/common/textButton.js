import styled from "styled-components"

export default styled.p`
  color: ${p => p.color || (p.selected ? "blue" : "#a9a9a9")};
  margin: ${p => p.margin || "0 20px"}
  cursor: pointer;
  text-transform: ${p => p.casing || ""};
`
