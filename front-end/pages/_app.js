import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css';
import '../styles/index.css'
import '../styles/Resultados.css'
import Layout from "../components/Layout";
import React from "react";
import {Provider} from 'react-redux';
import {createWrapper} from "next-redux-wrapper";
import store from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </Provider>

  )
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
