import React, { Component } from 'react';

export default class Detailpage extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <div id="idRed" class="label">
                    Red
            </div>
                <div class="aria-widget-slider">
                    <div class="rail" style="width: 300px;">
                        <div id="idRedValue"
                            role="slider"
                            tabindex="0"
                            class="thumb"
                            aria-valuemin="0"
                            aria-valuenow="0"
                            aria-valuemax="255"
                            aria-labelledby="idRed">
                        </div>
                    </div>
                    <div class="value">
                        0
                    </div>
                </div>
            </div>
        )
    }
}