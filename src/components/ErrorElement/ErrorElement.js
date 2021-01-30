import React from "react";
import PropTypes from "prop-types";
interface Props {
    showError:boolean;
    errorMessage:string;
    style?: StyleSheet,
}
export default class ErrorElement extends React.Component<Props>{
    render() {
        const {errorMessage = '', showError = false, style} = this.props;
        return (
                showError ?
                    <div style={{color: '#F00', fontSize: 24, textAlign: 'center', alignContent: 'center', ...style}}>
                        Error: {errorMessage}
                    </div>
                    :
                    <div style={{...style}}/>
            )
    }
}
ErrorElement.propTypes = {
    showError: PropTypes.string,
    errorMessage: PropTypes.string,
    style: PropTypes.object,
};
