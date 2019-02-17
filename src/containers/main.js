import React, { Component } from 'react';
// import PictureGrid from './pictureGrid';
import PictureGrid from './pictureGrid';  
import Search from './search';
import UpArrow from '../components/up-arrow';
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
            url: `/api?q=${searchValue}`,
            searchValue: searchValue
        });
        this.props.removePictures();
        this.props.searchPictures(searchValue);
    }

    render() {
        let { url, searchValue } = this.state;
        return (
            <div id="top" className="main">
                <Search handleData={this.handleData}/>
                <PictureGrid url={url} searchValue={searchValue} />
                <UpArrow />
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
