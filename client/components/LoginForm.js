import React, { Component } from "react";
import { hashHistory } from "react-router";
import AuthForm from "./AuthForm";
import mutation from "../mutations/login";
import query from "../queries/CurrentUser";
import { graphql } from "react-apollo";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }
  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push("/dashboard");
    }
  }
  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }
  render() {
    return (
      <div>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(LoginForm));
