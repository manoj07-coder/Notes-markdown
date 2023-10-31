import { useState } from "react"
import MarkDown from 'react-markdown'
import Showdown from "showdown"

import PropTypes from 'prop-types';

export default function Editor({ currentNote, updatedNote}){

    const [selectedTab, setSelectedTab] = useState("write")

    const converter = new Showdown.Converter({
        tables : true,
        simplifiedAutoLink : true,
        strikethrough : true,
        tasklists : true
    })

    return(
        <section className="pane editor">
            <MarkDown 
            value = {currentNote.body}
            onChange = {updatedNote}
            selectedTab = {selectedTab}
            onTabChange = {setSelectedTab}
            generateMarkdownPreview = {(markdown) => 
            Promise.resolve(converter.makeHtml(markdown))
            }
            minEditorHeight = {80}
            heightUnits = "vh"
            />
        </section>
    )
}

Editor.propTypes = {
    currentNote : PropTypes.shape({
        body : PropTypes.string.isRequired,
    }).isRequired,
    updatedNote : PropTypes.func.isRequired,
};