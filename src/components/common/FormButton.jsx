import React, { Component } from 'react'

export default class FormButton extends Component {
    validateFields(needValidation) {
        if (needValidation) {
            let valid = true;
            Object.entries(needValidation).forEach(([key, val]) => {
                valid = valid && val;
            });
            return valid;
        } else{
            return true;
        }
    }

    render() {
        const valid = this.validateFields(this.props.needValidation);
        const buttonProps = {
            "className": "button" + (valid ? '' : ' buttonDisabled'),
            "disabled": !!!valid
        }
        return (
            <button type="submit" {...buttonProps}>{this.props.name}</button>
        )
    }
}
