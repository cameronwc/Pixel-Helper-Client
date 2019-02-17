import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchPictures } from "../../store/actions/search";
import { removePictures } from "../../store/actions/pictures";
import './search.css';

class Main extends Component {
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
        let { searchValue } = this.state;
        return (
            <div className="search-box">
                <div className="overlay">
                    <div className="nav">
                        <div className="left">
                            <div className="title">
                                <a href="/">
                                    <h3>Pixel Helper</h3>
                                </a>
                            </div>
                        </div>
                        <div className="right">
                            <a href="https://github.com/cameronwc/Pixel-Helper-Client.git">
                                <h3>GITHUB</h3>
                            </a>
                            <a href="https://pixel-helper-api.herokuapp.com/api">
                                <h3>API</h3>
                            </a>
                        </div>
                    </div>
                    <div className="header-body">
                        <div className="searchBar">
                            <div className="title">
                                <h1>Find the perfect picture for:</h1>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <input className="search" type="text" name="searchValue" onChange={this.handleChange} value={searchValue} placeholder="Mountains" />
                                <button type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchValue: state.search.searchValue
    };
}

export default connect(mapStateToProps, { removePictures, searchPictures })(Main);
