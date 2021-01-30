import React from "react";
import PropTypes from "prop-types";
import BookItem from "../BookItems/BookItem";
interface Props {
    showError:boolean;
    errorMessage:string;
}
export default class ErrorElement extends React.Component<Props>{
    render() {
        const {errorMessage = '', showError = false} = this.props;
        return (
                showError ?
                    <div style={{color: '#F00', textAlign: 'center', alignContent: 'center'}}>
                        Error: {errorMessage}
                    </div>
                    :
                    <div/>
            )
    }
}
BookItem.propTypes = {
    showError: PropTypes.string,
    errorMessage: PropTypes.string,
};
