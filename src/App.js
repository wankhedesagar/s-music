import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import Sppiner from "./component/Sppiner";

function App() {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const getTracks = async () => {
    setIsLoading(true)
    let data = await fetch(
      `https://v1.nocodeapi.com/swankhede/spotify/yourApikay/search?q=${keyword === "" ? "trending" :  keyword }&type=track`
    );
    let convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
    setIsLoading(false)
  };

  useEffect(() => {
getTracks()
  },[])

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            S-Music
          </a>

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search Music"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success text-white">
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
     
        <div className="row mt-4">
          {isLoading && <Sppiner/> }
          {/* {isLoading && <h1 className="text-center">Loading...</h1> } */}
          {tracks.map((element,index) => {
            return (
              <div key={element.album.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <img
                    src={element.album.images[0].url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      Artist: {element.album.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release Date: {element.album.release_date}
                    </p>
                    <audio
                      src={element.preview_url}
                      controls
                      className="w-100"
                    ></audio>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
