class API {

    static postByQuery(apiUrl, query){
        return fetch(apiUrl, {
            headers: {
             'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query }),
            method: 'POST'
        });
    }

    static postWithBasicAuth(apiUrl, data, authEnconde){
        return fetch(apiUrl, {
            headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Basic ' + authEnconde
            },
            body: JSON.stringify(data),
            method: 'POST'
        });
    }

    static getWithBasicAuth(apiUrl, authEnconde){
        return fetch(apiUrl, {
            headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Basic ' + authEnconde
            },
            method: 'GET'
        });
    }
 }

 export default API;