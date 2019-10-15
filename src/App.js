import React, { Component } from 'react';

class App extends Component {
	constructor() {
		super();
    this.state = {
      value: '',
      images: [],
    };
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
    fetch('https://api.unsplash.com/search/photos/?client_id=30086014b47d3da23e1a9b2fa85837f0ca041c5ce34d4bfab637c45988c5ce08&page=1&per_page=10&orientation=portrait&query=' + this.state.value)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
            images: result.results,
            total: result.total,
            value: this.state.value
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
		event.preventDefault();
	}

	render() {
		return (
      <section>
      <nav>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button>SEARCH</button>
        </form>
      </nav>
      {this.state.images.map(image => (<img class="grid-item" src={image.urls.regular} key={image.id} alt="" />))}
      </section>
		);
	}
}
export default App;