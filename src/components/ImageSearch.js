import React, { useState } from "react";
import axios from "axios";
import Editor from "./Editor";

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async () => {
    const API_URL = "https://api.unsplash.com/search/photos";
    const API_KEY = "BYTyTwGcM9H-k0SKoQHhmca5AtlwUwfAKk8rZJI2CaQ";

    try {
      const response = await axios.get(
        `${API_URL}?query=${query}&client_id=${API_KEY}`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container bg-slate-50 w-full">
      {!selectedImage && (
        <>
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="border border-gray-300 rounded-l-sm p-2 my-2 w-[50%]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your search term"
            />
            <button
              onClick={handleSearch}
              className="bg-transparent border border-gray-300 rounded-r-sm text-white py-2 px-4"
            >
              🔍
            </button>
          </div>

          <div className="image-results flex flex-wrap">
            {images.map((image) => (
              <div key={image.id} className="w-1/4 relative">
                <div className="image-container bg-white rounded relative border border-rose-400 p-1 m-3">
                  <img src={image.urls.small} alt={image.description} />
                  <button
                    onClick={() => handleImageSelect(image)}
                    className="bg-blue-500 text-white rounded px-2 py-1 m-2 absolute top-0 right-0"
                  >
                    Add Caption
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedImage && <Editor selectedImage={selectedImage} />}
    </div>
  );
};

export default ImageSearch;
