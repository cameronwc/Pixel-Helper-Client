import React, { Component } from 'react';
import Navbar from './navbar';
// import PictureGrid from './pictureGrid';
import PictureGrid from './pictureGridv2';  
import { connect } from 'react-redux';
import { searchPictures } from "../store/actions/search";
import { removePictures } from "../store/actions/pictures";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '/api',
            searchValue: ''
        }
        this.handleData = this.handleData.bind(this);
    }

    handleData = (searchValue) => {
        this.setState({
            url: `/api?q=${searchValue}`
        });
        this.props.removePictures();
        this.props.searchPictures(searchValue);
    }

    render() {
        let { url } = this.state;
        return (
            <div className="main">
                <Navbar handleData={this.handleData} />
                <PictureGrid url={url} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchValue: state.search.searchValue
    };
}

export default connect(mapStateToProps, { removePictures, searchPictures})(Main);
