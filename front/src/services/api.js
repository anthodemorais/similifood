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
                    localStorage.setItem("admin", json.admin);
                    api.isConnected = true;
                    resolve(json.token);
                });
            });
        });
    },

    register: (email, password, name) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + 'register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: email, password: password, name: name})
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

    getRecipeById: (id) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `recipes/${id}`, {
                method: 'GET'
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json);
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
                    "Content-Type": "application/json"
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

    addProduct: (name, price, description, animal, img_name, age, weight, fur) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `products/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ admin: localStorage.getItem("admin") === "1", name, price, description, animal, img_name, age, weight, fur})
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    addRecipe: (name, steps, preparation_time, cook_time, difficulty, id_box) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `recipe/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ admin: localStorage.getItem("admin") === "1", name, steps, preparation_time, cook_time, difficulty, id_box})
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    addIngredientForRecipe: (recipe_id, ingredient) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `recipes/ingredients/${recipe_id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ admin: localStorage.getItem("admin") === "1", ingredient})
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    addToolForRecipe: (recipe_id, tool) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `recipes/tools/${recipe_id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ admin: localStorage.getItem("admin") === "1", tool})
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `products/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ admin: localStorage.getItem("admin") === "1"})
            }).then((results) => {
                results.json().then((json) => {
                    resolve(json.result);
                });
            });
        });
    },

    updateEmail: (id, email) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + "user/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({email: email})
            }).then(response => resolve(response));
        }
    )},

    updatePwd: (id, pwd) => {
        return new Promise((resolve, reject) => {
            fetch(api.url + "user/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({password: pwd})
            }).then(response => resolve(response));
        }
    )},

    getMyOrders: () => {
        return new Promise((resolve, reject) => {
            fetch(api.url + `order/${sessionStorage.getItem("id_user")}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
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