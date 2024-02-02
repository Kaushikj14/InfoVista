import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  captitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello I am Constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }

    document.title = `${this.captitalizeFirstLetter(this.props.category)} - InfoVista`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState(
      {
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,

      });
      this.props.setProgress(100);
  }

  // It is a lifecycle method (it will run after render method)
  async componentDidMount() {
    this.updateNews();

  }

  handlePreviousClick = async () => {
    // changing state in this function
    console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=d2e014fd776848d6871d18f80604b1f1&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});

    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedData.articles,
    //   loading:false,
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }
  handleNextClick = async () => {
    console.log("Next");
    this.setState({ page: this.state.page + 1 })
    this.updateNews();

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState(
      {
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      })
  };


  render() {
    return (
      // <div className='container my-3'>

      // </div>
      <>
        <h1 className='text-center'>InfoVista - Top {this.captitalizeFirstLetter(this.props.category)} Headlines</h1>


        {this.state.loading&& <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}
        >

          <div className='container'>


            <div className='row'>
              {this.state.articles.map((element) => {
                // console.log(element);
                // passsing key is important so that it can easily identify how objects are unique from each other
                return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              },)};


            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
  <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
  <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

</div> */}
      </>
    )
  }
}
