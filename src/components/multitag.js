import React, { Component } from 'react'
import ReactTags from 'react-tag-autocomplete'

export default class MultiTag extends Component {
    constructor(props) {
        super(props)

        const selected = this.props.selected.map((sel, i) => ({ id: { sel }.sel, name: { sel }.sel }))
        this.state = {
            tags: selected,
            suggestions: []
        }

        this.reactTags = React.createRef()
    }

    onDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }

    onAddition(tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
    }

    render() {
        return (
            <ReactTags
                ref={this.reactTags}
                tags={this.state.tags}
                suggestions={this.state.suggestions}
                onDelete={this.onDelete.bind(this)}
                onAddition={this.onAddition.bind(this)} 
                allowNew
                placeholderText="Type the name of a company..."/>
        )
    }
}