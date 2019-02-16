import React, { Component } from 'react';
import PictureItem from '../components/pictureItem';
import { chunkArray } from '../helpers';
import { fetchPictures, removePictures } from "../store/actions/pictures";
import { connect } from "react-redux";

class PictureGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            url: "/api",
            searchValue: ""
        }
        this.chunkArray = chunkArray.bind(this);
        this.fillPictureGrid();
        this.onWindowHitBottom();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.url !== prevState.url) {
            return {
                url: nextProps.url,
                searchValue: nextProps.searchValue
            }
        } else return null
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.url !== this.props.url) {
            this.setState({
                url: this.props.url,
                searchValue: this.props.searchValue
            })
            this.props.removePictures();
            this.fillPictureGrid();
        }
    }

    fillPictureGrid() {
        let { pictures, pageCount } = this.props;
        let { url } = this.state;
        this.setState({ isLoading: true })
        let updatedPictures = this.props.fetchPictures(pictures, url, pageCount)
        updatedPictures.then(() => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 1000)
        })
    }

    placePictures() {
        const { pictures } = this.props;
        let pictureList = <div className="spinner"></div>
        if (pictures != null) {
            pictureList = pictures.map(p => ( <PictureItem photo={p} key={p.id} /> ))
            pictureList = this.chunkArray(pictureList, 4);
            pictureList = pictureList.map((p) => (
                <div className="col" key={p.id}>
                    {p}
                </div>
            ));
        }
        if(pictures.length === 0) {
            pictureList = <h2>No results found. Please try a different search query.</h2>
        }
        return pictureList;
    }

    onWindowHitBottom() {
        window.onscroll = () => {
            const { isLoading } = this.state;
            if (isLoading) return;
            let currentPixels = window.innerHeight + document.documentElement.scrollTop;
            let totalPixels = document.documentElement.offsetHeight * 0.95;

            // Checks that the page has scrolled to the bottom
            if (currentPixels >= totalPixels) {
                this.fillPictureGrid(currentPixels);
            }
        }
    }

    render() {
        let pictureList = this.placePictures();
        
        let { isLoading, searchValue } = this.state;
        let loader = <div className="spinner"></div>
        if (!isLoading) {
            loader = null;
            // if (searchValue !== "") {
            //     searchValue = <h2>Displaying pictures for: <span className="query">{searchValue}</span></h2>
            // }
        }

        return (
            <div className="picture-grid" id="picture-grid">
                <div className="container">
                    <div className="title">
                        {searchValue}
                    </div>
                    <div className="row">
                        {pictureList}
                    </div>
                </div>
                {loader}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        pictures: state.pictures.pictures,
        pageCount: state.pictures.pageCount,
    };
}

export default connect(mapStateToProps, { fetchPictures, removePictures })(PictureGrid);
