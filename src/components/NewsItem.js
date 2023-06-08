import React from 'react'

const NewsItem = (props) => {
  let { title, description, imgurl, newsurl, author, date } = props; //this.props
  let mystyle = {
    color: props.mode === 'black' ? 'white' : 'black',
    backgroundColor: props.mode === 'black' ? 'black' : 'white',
    border: `1px solid ${props.mode === 'black' ? 'linen' : 'black'}`
  }
  return (
    <div className="my-4 mx-1">
      <div className="card" style={mystyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger" style={{ left: '80%', zIndex: '1' }}>{props.source}</span>
        </div>
        <img src={imgurl ? imgurl : "https://cdn.ndtv.com/common/images/ogndtv.png"} className="card-img-top" alt="..." />
        <div className="card-body" >
          <h5 className="card-title">{title ? title.slice(0, 45) : ""}....</h5>
          <p className="card-text">{description ? description.slice(0, 88) : ""}....</p>
          <p className="card-text "><small className={`text-${mystyle.color}-50`}>By {author ? author : "Unknown"} on "{new Date(date).toGMTString()}" </small></p>
          <a href={newsurl ? newsurl : ""} className="btn btn-sm btn-outline-primary">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem    