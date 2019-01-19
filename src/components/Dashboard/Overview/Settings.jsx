import React, { Component } from 'react';
import FormButton from '../../common/FormButton';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            name: this.props.data.name,
            surname: this.props.data.surname,
            phone: this.props.data.phone,
            email: '',
            defaultPricePerHour: this.props.data.defaultPricePerHour,
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    render() {
        return (
            <div id="modalWrapper" className='noBlur my-5 py-5'>
                <div id="modal">
                    <div className="row justify-content-end mb-3"><div className="col text-right link" onClick={this.props.close}>X</div></div>
                    <form id="settings" className="text-center" onSubmit={e => { e.preventDefault(); this.props.onSubmit(this.state); }}>
                        <div className="form-row">
                            <div className="form-group col text-left">
                            <h6 className='title'>Name</h6>
                                <input className="inputField" name="name" field="name" type="text" placeholder="Name" defaultValue={this.state.name} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col text-left">
                            <h6 className='title'>Surname</h6>
                                <input className="inputField" name="surname" field="surname" type="surname" placeholder="Surname" defaultValue={this.state.surname} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col text-left">
                            <h6 className='title'>Phone</h6>
                                <input className="inputField" name="phone" field="phone" type="phone" placeholder="Phone" defaultValue={this.state.phone} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col text-left">
                            <h6 className='title'>Email</h6>
                                <input className="inputField" name="email" field="email" type="email" placeholder={this.props.data.email} defaultValue={this.props.data.email} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col text-left">
                            <h6 className='title'>Price per hour</h6>
                                <input className="inputField" name="defaultPricePerHour" field="defaultPricePerHour" type="number" placeholder="$ per hour" defaultValue={this.state.defaultPricePerHour} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col text-left">
                                <FormButton name="update" />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}
