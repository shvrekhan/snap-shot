import React from "react";
import Header from "./header";
import TagNames from "./tags";
import Loader from "./loader"

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidInput: "",
            isLoading: false,
            searchValue: "",
            recivedPhotos: [],
            photoFetchFailed: "",
            fetchError: null,

        };
        this.API_KEY = "3f4b8aebd9d352fa0701390939eb9df6";
    }
    errorSet = (value) => {
        this.setState({
            fetchError: value,
        })

    }

    inputEvent = (event) => {
        this.setState({
            searchValue: event.target.value
        })

    }

    loading = (value) => {
        this.setState({
            isLoading: value,
        });
    }
    tagHandelChange = (event) => {
        this.setState({
            searchValue: event.target.innerText
        }, this.searchImages);
        // console.log(event.target.innerText);
    }

    searchImages = () => {
        console.log(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.API_KEY}&tags=${this.state.searchValue}&per_page=25&format=json&nojsoncallback=1`)
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.API_KEY}&tags=${this.state.searchValue}&per_page=25&format=json&nojsoncallback=1`)
            .then((response) => {
                if (response.ok) {
                    this.setState({
                        Error: false
                    });
                    return response.json();
                } else {
                    this.loading(false);
                    this.fetchError(true);
                }
            })
            .then((data) => {
                // console.log(data);
                if (data.photos.photo.length == 0) {

                } else {
                    let photoArr = data.photos.photo.map((currentPhoto) => {
                        let photoUrl = `https://live.staticflickr.com/${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}_q.jpg`;
                        return photoUrl;
                    })
                    this.setState({
                        recivedPhotos: photoArr
                    })
                }

                // console.log(this.state.recivedPhotos);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    submit = (event) => {
        event.preventDefault();
        if (this.state.searchValue.trim() === 0) {
            this.setState({
                invalidInput: "Enter in search box",
                recivedPhotos: [],
                isLoading: false
            })
        } else {
            this.searchImages();

        }
        // this.setState({
        //     searchValue: event.target.textContent
        // })
        console.log(this.state.searchValue);
    }



    render() {
        return (
            <>
                <Header />

                <main>
                    <form onSubmit={this.submit}>
                        <input
                            type="text"
                            placeholder="Enter a valid Keyword"
                            onChange={this.inputEvent}
                            value={this.state.searchValue}
                        ></input>
                        <button type="submit">

                        </button>
                    </form>
                </main>
                <TagNames tags={["Mountain", "Beaches", "Birds", "Food"]} tagHandel={this.tagHandelChange} />

                <p>{this.state.invalidInput}</p>

                <h1>{this.state.searchValue}</h1>
                {console.log(this.state.recivedPhotos.length)};
                {this.state.isLoading ? <Loader /> : <>
                    <div className="image-section" >
                        {this.state.recivedPhotos.map((photo) => {
                            return (
                                <img src={photo} key={photo} />
                            )

                        })}
                    </div>
                </>}



            </>
        )
    }
}

export default SearchBar;