import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Preguntas from "./PreguntasFrecuentes";


class Layout extends Component {
    render () {
        const { children } = this.props
        return (
            <div>
                <Header />
                {children}
                <Preguntas />
                <Footer />
            </div>
        );
    }
}

export default Layout;