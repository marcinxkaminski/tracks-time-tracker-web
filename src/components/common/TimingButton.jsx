import React, { Component } from 'react'

export default class TimingButton extends Component {
    render() {
        const buttonProps = {
            "className": "buttonTiminig font-weight-bold" + (this.props.running ? ' buttonWorking' : ''),
        }
        return (
            <button onClick={this.props.onClick} {...buttonProps}>{this.props.running ? 'Stop Working' : 'Start Working'}</button>
        )
    }
}
