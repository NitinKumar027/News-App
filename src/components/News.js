import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './SpinnerD';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalresults] = useState(0);
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResults: 0
    //     }
    // };

    const capitalizefirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        document.title = `NewsApp : ${props.category === 'general' ? 'Home' : capitalizefirstletter(props.category)}`;
        updateNews();
        // setPage(page+1);
    }, [])
    // async componentDidMount(){
    //     this.updateNews();
    //     this.setState({page : this.state.page +1});
    // };

    const updateNews = async () => {
        props.setprog(20);
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pgsize}`;
        // this.setState({loading: true});  //fro buttons but false in constructor
        let data = await fetch(url);
        props.setprog(50);
        let parsedData = await data.json();
        props.setprog(70);
        setArticles(parsedData.articles);
        setTotalresults(parsedData.totalResults);
        setLoading(false);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // });
        props.setprog(100);
    };

    // prevPage= async()=>{
    //    this.setState({page: this.state.page -1});
    //    this.updateNews();
    // }
    // nextPage= async()=>{
    //    this.setState({page: this.state.page +1});
    //    this.updateNews();
    // }  

    const fetchMoreData = async () => {
        // this.setState({page: page +1});
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pgsize}`;
        setPage(page + 1);//after bcz set[age is async func ,it takes time and before that url runs thats why]
        // this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalresults(parsedData.totalResults);
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // });
    };


    return (
        <>
            <h1 className="text-center" style={{ margin: '0px 0px 30px 0px', marginTop: '80px', color: props.mode === 'white' ? 'black' : 'white' }}>NewsApp - Top {capitalizefirstletter(props.category)} Headlines</h1>

            {loading && <Spinner />}
            {/* used button to go on next page
        <div className="row">
            {!this.state.loading && this.state.articles.map((ele)=>{
                 return <div className="col-md-4" key={ele.url}>
                        <NewsItem title={ele.title} description={ele.description} imgurl={ele.urlToImage} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
                        </div>
            })}
        </div>  */}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                <div className="container">
                    <div className="row">
                        {articles.map((ele) => {
                            return <div className="col-md-3" key={ele.url}> {/* median devices in Btrp Css contain 12 grids so 4*3items contain whole container */}
                                <NewsItem title={ele.title} description={ele.description} imgurl={ele.urlToImage} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} mode={props.mode} changeMode={props.changeMode} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prevPage} > &larr; Previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/props.pgsize)} type="button" className="btn btn-dark" onClick={this.nextPage} >Next &rarr;</button>
        </div> */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News