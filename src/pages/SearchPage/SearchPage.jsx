import { Component } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";

class SearchPage extends Component {
  render() {
    return (
      <SearchForm handleModal={this.props.handleModal} />
    );
  }
}

export default SearchPage;
