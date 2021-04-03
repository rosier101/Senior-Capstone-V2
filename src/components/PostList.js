import React, { Component } from 'react'
import axios from 'axios';

class PostList extends Component {
    constructor(props) {
		super(props)

	  this.state = {
      posts: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
        //this is the get request for bernie
			.get('')
			.then(response => {
				console.log(response)
				this.setState({ posts: response.data })
			})
            //if no data then throw an error
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { posts, errorMsg } = this.state
		return (
			<div>
				List of posts
                {//example on how to retrieve specific data
                }
				{posts.length
					? posts.map(post => <div key={post.id}>{post.title}</div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}


export default PostList
