import React from 'react';
import { hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { white, red } from '@material-ui/core/colors';
import App from './app';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo'
import initStore from '../redux/store/store.js';
import combinedReducers from '../redux/reducers/index.js';
import { Provider } from "react-redux";
import _ from 'lodash';
import Spinner from 'react-spinkit';
import Typography from '@material-ui/core/Typography';
// const client = new ApolloClient({
//   uri: "https://api.github.com/graphql"
// });


import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
//
// const httpLink = createHttpLink({
//   uri: 'https://api.github.com/graphql',
// });
//
//
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       authorization: 'Bearer 48c9fcedf75eaad04b6837a7792d2097e453413a'
//     }
//   }
// });

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.gitApiKey}`
      }
    });
  }
});




export default class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    // const jssStyles = document.getElementById('jss-server-side');
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }
    console.log(`${process.env.gitApiKey}`);
    this.setState({
        appStore: initStore(combinedReducers, { fieldState: {}, appState: {} })
    });
  }



  componentWillMount(){

  }

  render() {
    return _.get(this.state,'appStore',false) ? (<Provider store={this.state.appStore} firebase={this.state.firebase}>
      <App {...this.props} />
    </Provider>) : (<div >
    <Spinner name="pacman" style={{position: 'absolute', top: '50%', left: '50%'}}/>
    <Typography style={{position: 'absolute', top: '60%', left: '50%'}}>
      Loading
    </Typography>
    </div>);
  }
}
//
// Create a theme instance.
const muiTheme = createMuiTheme({
  palette: {
    primary: white,
    secondary: white,
    accent: white,
    type: 'light',
  },
});

hydrate(
  <ApolloProvider client={client}>
  <MuiThemeProvider theme={muiTheme}>
   <Main />
 </MuiThemeProvider>
 </ApolloProvider>,
  document.querySelector('#root'),
);
