import React, { Component } from "react"
import ReactJson from "react-json-view"

class DictionaryComponent extends Component {
  constructor(props) {
    super(props)

    const { data, id } = this.props.data
    const json = JSON.parse(data)

    this.state = { json, id }
  }

  handleAdd(json) {
    this.setState({ json: json.updated_src })
  }

  handleEdit(json) {
    this.setState({ json: json.updated_src })
  }

  handleDelete(json) {
    this.setState({ json: json.updated_src })
  }

  render() {
    const { json, id } = this.state

    return (
      <div style={{ marginBottom: "50px" }}>
        <p>{id}</p>
        <ReactJson
          onAdd={this.handleAdd.bind(this)}
          onEdit={this.handleEdit.bind(this)}
          onDelete={this.handleDelete.bind(this)}
          src={json}
        />
      </div>
    )
  }
}

export default DictionaryComponent
