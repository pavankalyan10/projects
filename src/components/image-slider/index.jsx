import { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImage(getUrl) {
    setLoading(true);
    try {
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImage(url);
  }, [url]);

  console.log(images);
  if (loading) {
    return <div>Loading data! please wait</div>;
  }

  if (errorMsg !== null) {
    return <div>Error Occured! {errorMsg}</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill className="arrow arrow-left" />
      {images && images.length
        ? images.map((imageItem) => {
            <img
              key={imageItem.id}
              src={imageItem.download_url}
              alt="ima"
              className="current-image"
            />;
          })
        : null}
      <BsArrowRightCircleFill className="arrow arrow-right" />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button key={index} className="current-indicator"></button>
            ))
          : null}
      </span>
    </div>
  );
}
