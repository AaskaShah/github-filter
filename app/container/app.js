import React, { Component } from "react";
import Data from "./../services/github_api";
import _ from 'lodash';
import Repositories from "./../components/repositories";
import { DropdownButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
//import {Loading} from "./../components/loading"

const cursorStyle = {
	cursor: 'pointer'
}

const bodyStyle = {
	margin: "20px 50px 20px 50px"
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			info: [],
			lang_title : "Select",
		}
		this.gotoUrl = this.gotoUrl.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		Data("").then(res => {
			this.setState({ info: res.data.items })
		})
	}

	gotoUrl(url) {
		console.log("in goto url");
		window.open(url);
	}

	handleSelect(lang) {
		console.log("in handleSelect");
		this.setState({lang_title: lang});
		if(lang=="Select"){
			Data("").then(res => {
				this.setState({ info: res.data.items })
			})
		}
		else{
			Data("language:"+lang).then(res => {
				this.setState({ info: res.data.items })
			})
		}
	}

	render() {
		const that = this;
		return this.state.info.length ?
			<div className="row" style={bodyStyle}>
				<div className="col s3">
					
					<div className="row">
						<h1>Filters</h1>
					</div>
					<div className="row">
						<h3>Languages</h3>
						<ButtonToolbar>
							<DropdownButton title={this.state.lang_title} id="dropdown-languages">
								<MenuItem eventKey="1" onSelect={_.partial(that.handleSelect, "Select")}>Select</MenuItem>
								<MenuItem eventKey="1" onSelect={_.partial(that.handleSelect, "javaScript")}>JavaScript</MenuItem>
								<MenuItem eventKey="2" onSelect={_.partial(that.handleSelect, "ruby")}>Ruby</MenuItem>
								<MenuItem eventKey="3" onSelect={_.partial(that.handleSelect, "python")}>Python</MenuItem>
							</DropdownButton>
						</ButtonToolbar>
					</div>
					
				</div>
				<div className="col s9">
					<ul className="row"> {this.state.info.map(function (item, i) {
						return (
							<div onClick={_.partial(that.gotoUrl, item.html_url)} style={cursorStyle}>
								<Repositories key={i} name={item.full_name} description={item.description} language={item.language} stars={item.stargazers_count} forks={item.forks} avatar={item.owner.avatar_url} />
							</div>
						)
					})
					}
					</ul>
				</div>
			</div>
			:
			(
				<div className="loading">
					<center>
						<i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
					</center>
				</div>
			)
	}
}

module.exports = App;