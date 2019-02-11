import React, { Component } from 'react';
import {connect} from 'react-redux';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleData(this.state.searchValue)
        this.setState({
            searchValue: ""
        })
    }

    render() {
        const { searchValue } = this.state;

        return (
            <nav id="nav" className="row">
                <a href="/" className="left logo">
                    {/* <img src="" alt="Pixel Helper logo" /> */}
                    PIXEL HELPER
                    </a>
                <div className="middle">
                    <form onSubmit={this.handleSubmit}>
                        <input className="search" type="text" name="searchValue" onChange={this.handleChange} value={searchValue} placeholder="Mountains" />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className="right">
                    <a href="https://localhost:3000/api">
                        API
                    </a>
                </div>
            </nav>
        )
    }
}


export default connect(null, null)(Navbar);
