

class Api{
    constructor(){
        console.log("Beer Api instantiated");
    }

    getListValue(params) {
      //  console.log("params in get list value",params)
        return new Promise(function(resolve, reject) {
          try {
            fetch("http://starlord.hackerearth.com/beercraft")
              .then(response => response.json())
              .then(responseJson => {
                resolve(responseJson);
              })
              .catch(error => {
                console.log(error);
                reject(error);
              });
          } catch (error) {
            reject(error);
          }
        });
      }

      checkLogin(params) {
        return new Promise(function(resolve, reject) {
          fetch("http://192.168.1.41:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: params.user,
              password: params.pass
            })
          })
            .then(res => res.json().then(response => resolve(response)))
            .catch(error => {
              console.log("rejecting error", error);
              reject(error);
            });
        });
      }

      checkSignUp(params) {
        return new Promise(function(resolve, reject) {
          fetch("http://192.168.1.41:3000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: params.user,
              password: params.pass
            })
          })
            .then(res => res.json().then(response => resolve(response)))
            .catch(error => {
              console.log("rejecting error", error);
              reject(error);
            });
        });
      }
}

export default new Api()