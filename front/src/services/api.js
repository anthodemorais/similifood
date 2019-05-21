let api = {

    url: "http://localhost:8000/",

    getToken: (email, password) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + 'auth', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: email, password: password})
            }).then((results) => {
                results.json().then((json) => {
                    sessionStorage.setItem("token", json.token);
                    api.isConnected = true;
                    resolve(json.token);
                });
            });
        });
    },

    register: (email, password) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + 'register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: email, password: password})
            }).then((results) => {
                results.json().then((json) => {
                    api.getToken(email, password).then((token) => {
                        resolve(token);
                    })
                });
            });
        });
    },

    getProducts: () => {
        return new Promise((resolve, reject) => {
            fetch(api.url + 'products', {
                method: 'GET'
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `products/${id}`, {
                method: 'GET'
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    getFeedbacks: () => {
        return new Promise((resolve, reject) => {
            fetch(api.url + 'feedbacks', {
                method: 'GET'
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json);
                });
            });
        });
    },

    isConnected: false

}

export default api