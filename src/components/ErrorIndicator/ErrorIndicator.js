import React, { Component } from 'react';
import styled from 'styled-components';
import './ErrorIndicator.css';

let ErrorMessageWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
`

class ErrorIndicator extends Component {
    render() {
        return (
            <ErrorMessageWrapper>
                <section className="error-container">
                    <span className="four"><span className="screen-reader-text">4</span></span>
                    <span className="zero"><span className="screen-reader-text">0</span></span>
                    <span className="four"><span className="screen-reader-text">4</span></span>
                </section>
                <h2>Something has gone terribly wrong</h2>
                <p>You may have entered an incorrect city. Please, reload this page</p>
            </ErrorMessageWrapper>
        );
    }
}

export default ErrorIndicator;