import React, { Component } from 'react';
import PictureItem from '../components/pictureItem';
import { chunkArray } from '../helpers';
import { fetchPictures, removePictures } from "../store/actions/pictures";
import { connect } from "react-redux";


class PictureGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
        this.chunkArray = chunkArray.bind(this);
        // Local Functions
        this.fillPictureGrid = this.fillPictureGrid.bind(this);
        this.placePictures = this.placePictures.bind(this);
        this.onWindowHitBottom();
        this.fillPictureGrid();
    }

    onWindowHitBottom() {
        window.onscroll = () => {
            const { isLoading } = this.state;
            if (isLoading) return;
            let currentPixels = window.innerHeight + document.documentElement.scrollTop;
            let totalPixels = document.documentElement.offsetHeight * 0.95;

            // Checks that the page has scrolled to the bottom
            if (currentPixels >= totalPixels) {
                this.setState({
                    isLoading: true
                })
                this.fillPictureGrid(currentPixels);
            }
        }
    }

    fillPictureGrid(currentPixels = 0) {
        let { pictures, pageCount, url } = this.props;
        let newPictures = this.props.fetchPictures(pictures, url, pageCount)
        newPictures.then(() => {
            setTimeout(() => {
                this.setState({
                    isLoading: false
                })
            }, 1000)
        })
        window.scrollBy(0, currentPixels);
    }

    placePictures() {
        const { pictures } = this.props;
        let pictureList = <div className="spinner"></div>
        if (pictures != null) {
            pictureList = pictures.map(p => (
                <PictureItem url={p.display_url} key={p.id} />
            ))
            pictureList = this.chunkArray(pictureList, 4);
            pictureList = pictureList.map((p) => (
                <div className="col" key={p.id}>
                    {p}
                </div>
            ));
        }
        return pictureList;
    }

    componentWillUpdate() {
        let {url} = this.props;
        if(url !== '/api') {
            removePictures();
            this.fillPictureGrid()
        }
    }

    render() {
        let pictureList = this.placePictures();

        let {isLoading} = this.state;
        let loader = <div className="spinner"></div>
        if (!isLoading) {
            loader = null;
        }

        return (
            <div className="picture-grid" id="picture-grid">
                <div className="container">
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
        pageCount: state.pictures.pageCount
    };
}

export default connect(mapStateToProps, { fetchPictures, removePictures })(PictureGrid);
