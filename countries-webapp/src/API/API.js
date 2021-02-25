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
 }

 export default API;