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
            url: "/api"
        }
        this.chunkArray = chunkArray.bind(this);
        this.fillPictureGrid();
        this.onWindowHitBottom();
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.url !== prevState.url) {
            return {
                url: nextProps.url
            }
        } else return null
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.url !== this.props.url) {
            this.setState({
                url: this.props.url
            })
            this.props.removePictures();
            this.fillPictureGrid();
        }
    }

    fillPictureGrid(currentPixels = 0) {
        let { pictures, pageCount } = this.props;
        let { url } = this.state;
        this.setState({
            isLoading: true
        })
        let newPictures = this.props.fetchPictures(pictures, url, pageCount)
        newPictures.then(() => {
            setTimeout(() => {
                this.setState({
                    isLoading: false
                })
            }, 1000)
        })
        // window.scrollBy(0, currentPixels);
    }

    placePictures() {
        const { pictures } = this.props;
        let pictureList = <div className="spinner"></div>
        if (pictures != null) {
            pictureList = pictures.map(p => (
                <PictureItem photo={p} key={p.id} />
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

        let { isLoading } = this.state;
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
