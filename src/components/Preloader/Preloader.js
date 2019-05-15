import React, { Component } from 'react';
import './Preloader.css';

class Preloader extends Component {
    render() {
        return (
            <div className="preloader">
                <div className="lines">
                    <div className="line line-1"></div>
                    <div className="line line-2"></div>
                    <div className="line line-3"></div>
                </div>

                <div className="loading-text">LOADING</div>
            </div>
        )
    }
}

export default Preloader;