import React from "react";
import Header from "./header";
import TagNames from "./tags";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchValue: "",
            recivedPhotos: [],
            photoFetchFailed: "",
            Error: null,

        };
        this.API_KEY = "3f4b8aebd9d352fa0701390939eb9df6";
    }

    inputEvent = (event) => {
        this.setState({
            searchValue: event.target.value
        })
        this.searchImages();
        // console.log(this.state.searchValue);
    }
    searchImages = () => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.API_KEY}&tags=${this.state.searchValue}&per_page=25&format=json&nojsoncallback=1`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let photoArr = data.photos.photo.map((currentPhoto) => {
                    let photoUrl = `https://live.staticflickr.com/${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}_q.jpg`;
                    return photoUrl;
                })
                this.setState({
                    recivedPhotos: photoArr
                })
                // console.log(this.state.recivedPhotos);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    submit = (event) => {
        event.preventDefault();
        this.setState({
            searchValue: event.target.textContent
        })
        console.log(this.state.searchValue);
        this.searchImages();
    }



    render() {
        return (
            <>
                <Header />
                <form onSubmit={this.submit}>
                    <input
                        onChange={this.inputEvent}
                        value={this.state.searchValue}
                    ></input>
                    <button type="submit">button</button>
                </form>

                <p>Error msg comes here</p>

                <h1>Searched image title comes here</h1>
                {console.log(this.state.recivedPhotos.length)};
                <div className="image-section" >
                    {this.state.recivedPhotos.map((photo) => {
                        return (
                            <img src="https://live.staticflickr.com/65535/51828731574_e0debf0a22_q.jpg" />
                        )

                    })}
                </div>


            </>
        )
    }
}

export default SearchBar;