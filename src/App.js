import { useEffect, useState } from "react";
import quotesSvg from "./quote-left-solid.svg";

const App = () => {
  const [img, setImg] = useState("");
  const [imgAlt, setImgAlt] = useState("");
  const [authr, setAuthr] = useState("");
  const [content, setContent] = useState("");

  async function getQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
      setAuthr(data.author);
      setContent(data.content);
    } else {
      setAuthr("Henry Ford");
      setContent("My best friend is the one who brings out the best in me.");
    }
  }

  async function getImage(w,h) {
    const rdnNum = new Date().getTime();
    const response = await fetch(
      `https://source.unsplash.com/collection/645558/${w}x${h}/?sig=${rdnNum}`
    );
    if (response.ok) {
      const link = response.url;

      const slidingTagLiAfterStyle = document.createElement("style");
      slidingTagLiAfterStyle.innerHTML = `body:before {
        background-image: url(${link})
      }`;
      document.head.appendChild(slidingTagLiAfterStyle);
    }
  }

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    getImage(w,h);

    getQuote();
  }, []);

  return (
    <div className="container">
      <div className="title">
        <img src={quotesSvg} alt="" />
        Random Quotes
      </div>
      {content !== "" ? (
        <div className="quote">
          <p>{content}</p>
          <span className="author">"{authr}"</span>
        </div>
      ) : (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className="empty"></div>
      <div className="footer">
        <p>
          Images from{" "}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer">
            unsplash
          </a>
        </p>
        <p>
          Quotes from{" "}
          <a
            href="https://github.com/lukePeavey/quotable"
            target="_blank"
            rel="noreferrer"
          >
            quotable
          </a>
        </p>

        <a className="randomBtn" href="/">
          New Quote
        </a>
      </div>
    </div>
  );
};

export default App;
