import React, { Component } from 'react'

export default class NewsItem extends Component {

  
  
  render() {
    // destructuring
    let {title ,description ,imageUrl ,newsUrl ,author ,date} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img src={imageUrl?imageUrl:"https://static.toiimg.com/thumb/msid-107216675,width-1070,height-580,imgsize-31926,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toUTCString() }</small></p>
            <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
