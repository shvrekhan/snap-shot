import React from "react";
import Header from "./header";
import TagNames from "./tags";
import Loader from "./loader"

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidInput: "",
            titleHeading: "",
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
            searchValue: event.target.innerText,
            titleHeading: event.target.innerText + " " + "Pictures"
        }, this.searchImages);
        // console.log(event.target.innerText);
    }

    searchImages = () => {
        this.loading(true);
        // console.log(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.API_KEY}&tags=${this.state.searchValue}&per_page=25&format=json&nojsoncallback=1`)
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.API_KEY}&tags=${this.state.searchValue}&per_page=25&format=json&nojsoncallback=1`)
            .then((response) => {
                if (response.ok) {
                    this.setState({
                        fetchError: false
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
                    console.log("0 photos")

                } else {
                    let photoArr = data.photos.photo.map((currentPhoto) => {
                        let photoUrl = `https://live.staticflickr.com/${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}_q.jpg`;
                        return photoUrl;
                    })
                    this.setState({
                        recivedPhotos: photoArr

                    })
                    this.loading(false);
                }

                // console.log(this.state.recivedPhotos);
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    fetchError: true,
                    photoFetchFailed: "Api fetch failed please try with different and valid keyword"
                })
                this.loading(false);
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
            this.setState({
                titleHeading: `${this.state.searchValue} Pictures`
            })
            this.searchImages();

        }

    }



    render() {
        return (
            <>
                <div className="parent">
                    <Header />

                    <main>
                        <form onSubmit={this.submit} className="form-flex">
                            <input
                                type="text"
                                placeholder="Enter a valid Keyword"
                                onChange={this.inputEvent}
                                value={this.state.searchValue}
                            ></input>
                            <button type="submit" className="search">
                                search
                            </button>
                        </form>
                    </main>
                    <TagNames tags={["Mountain", "Beaches", "Birds", "Food"]} tagHandel={this.tagHandelChange} />
                    {this.state.fetchError ? <p className="error-msg">{this.state.photoFetchFailed}</p> : <h1>{this.state.titleHeading}</h1>}



                    {console.log(this.state.recivedPhotos.length)};
                    {console.log(this.state.isLoading)}
                    {this.state.isLoading ? <Loader /> :
                        <div className="image-section" >
                            {this.state.recivedPhotos.map((photo) => {
                                return (
                                    <img src={photo} key={photo} />
                                )

                            })}
                        </div>
                    }
                </div>


            </>
        )
    }
}

export default SearchBar;