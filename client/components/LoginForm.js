import React, { Component } from "react";
import AuthForm from "./AuthForm";
import mutation from "../mutations/Login";
import query from "../queries/CurrentUser";
import { graphql } from "react-apollo";

class LoginForm extends Component {
  constructor(props) {
    super(props);
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
        const errors = res.graphQLErros.map(error => error.message);
      });
  }
  render() {
    return (
      <div>
        <AuthForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
