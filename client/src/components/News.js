import React, { Component } from 'react'
import PropTypes from 'prop-types'

const apiKey = process.env.REACT_APP_NEWS_API_KEY;

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        isDarkMode: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            darkMode: false
        }
        document.title = `${this.props.category} - On-Board Break`;
        this.iframeRef = React.createRef(); // Initialize iframeRef
    }

    async update() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log('Parsed Data:', parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    updateIframeStyle = () => {
        if (this.iframeRef.current) {
            const mode = this.props.isDarkMode ? 'dark' : 'light';
            this.iframeRef.current.contentWindow.postMessage({ darkMode: mode }, '*'); // Send dark mode state to iframe
        }
    };

    componentDidMount() {
        // Fetch articles
        this.update();
        // Update the iframe style after fetching articles
        this.updateIframeStyle();
        window.addEventListener('message', this.handleMessage); // Listen for messages from the parent
    }

    componentDidUpdate(prevProps) {
        // Update iframe style if dark mode changes
        if (prevProps.isDarkMode !== this.props.isDarkMode) {
            this.updateIframeStyle();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.handleMessage); // Clean up listener
    }

    handlePrevClick = async () => {
        console.log("Previous");
        this.setState({ page: this.state.page - 1 });
        this.update();
    }

    handleNextClick = async () => {
        console.log("Next");
        this.setState({ page: this.state.page + 1 });
        this.update();
    }

    render() {
        return (
            <>
                <iframe 
                    id="news-iframe" 
                    title="News Content" // Add a title for accessibility
                    src="http://localhost:3001" 
                    ref={this.iframeRef} 
                    height="1000" 
                    width="1680" 
                    frameBorder="0" 
                    scrolling="yes" 
                    style={{ backgroundColor: this.props.isDarkMode ? '#333' : '#fff' }} 
                />
            </>
        )
    }
}

export default News;
