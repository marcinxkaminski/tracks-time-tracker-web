import React, { Component } from 'react'
import FormButton from './FormButton';

export default class Share extends Component {
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div id="modalWrapper" className='noBlur'>
                <div id="modal">
                    <div className="row justify-content-end mb-3"><div className="col text-right link" onClick={this.props.close}>X</div></div>
                    <form id="calendar" className="text-center" onSubmit={e => { e.preventDefault(); this.props.onSubmit(this.state) }}>
                        <div className="form-row my-3">
                            <div className="form-group col">
                                <h6 className="formFieldTitle"><strong>Share to:</strong></h6>
                                <input className="inputField" name="email" field="email" type="email" placeholder="Email" onChange={this.onChange} required />
                            </div>
                        </div>

                        <div className="form-row my-5">
                            <div className="form-group col">
                                <FormButton needValidation={({ ...this.state })} name="share" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
