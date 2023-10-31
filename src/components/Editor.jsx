import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

import PropTypes from 'prop-types';

export default function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = useState('write');

    return (
        <section className="pane editor">
            <MDEditor
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                minEditorHeight={80}
                heightUnits="vh"
            />
            <MDEditor.Markdown source={currentNote.body} />
        </section>
    );
}

Editor.propTypes = {
    currentNote: PropTypes.shape({
        body: PropTypes.string.isRequired,
    }).isRequired,
    updateNote: PropTypes.func.isRequired,
};
