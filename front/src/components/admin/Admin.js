import React, { Component } from 'react';
import AdminProducts from './AdminProducts';
import AdminRecipe from './AdminRecipe';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return (
            <div>
                <AdminProducts />
                <AdminRecipe />
            </div>
        );
    }
}
 
export default Admin;