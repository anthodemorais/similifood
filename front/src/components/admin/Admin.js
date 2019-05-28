import React, { Component } from 'react';
import AdminProducts from './AdminProducts';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return (
            <div>
                <AdminProducts />
            </div>
        );
    }
}
 
export default Admin;