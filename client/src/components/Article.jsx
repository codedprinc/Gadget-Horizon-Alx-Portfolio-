import React from 'react';

const Article = ({ brand, model, price, imageUrl, description }) => {
  return (
    <div>
      <article className="m-5 p-5 w-97.5 rounded border border-pink-600 border-solid">
        <div>
          <div id="heart">&#128420;</div>
          <div>
            <img src={imageUrl || '/placeholder.jpg'} alt={`${brand} ${model}`} />
          </div>
          <div className="items-center flex flex-row justify-between mb-5">
            <h2>{brand} {model}</h2>
            <div>&#36;{price.toFixed(2)}</div>
          </div>
          <div id="description">{description}</div>
          <div>&#9734;&#9734;&#9734;&#9734;</div>
        </div>
      </article>
    </div>
  );
};

export default Article;