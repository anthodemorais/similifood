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
                    localStorage.setItem("token", json.token);
                    sessionStorage.setItem("id_user", json.id_user);
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

    addFeedback: (content, box_id) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + 'feedbacks', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(
                    {
                        content: content,
                        user_id: sessionStorage.getItem("id_user"),
                        box_id: box_id
                    })
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    payment: (price, token) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + "payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({price: price, tokenId: token.id})
            }).then(response => resolve(response));
        }
    )},

    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `user/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    order: (box_id, adress, quantity) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + 'order', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(
                    {
                        user_id: sessionStorage.getItem("id_user"),
                        box_id: box_id,
                        adress: adress,
                        quantity: quantity
                    })
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    isConnected: false

}

export default api