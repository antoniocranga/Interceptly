import PropTypes from 'prop-types';

// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
import { foundation } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

// ==============================|| CODE HIGHLIGHTER ||============================== //

export default function SyntaxHighlight({ children, language = 'javascript', ...others }) {
    return (
        <SyntaxHighlighter language={language} style={foundation} {...others}>
            {children}
        </SyntaxHighlighter>
    );
}
