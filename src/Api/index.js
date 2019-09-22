class Api {
  constructor() {
    console.log("Beer Api instantiated");
  }

  getListValue(params) {
    //"http://starlord.hackerearth.com/beercraft"
    //  console.log("params in get list value",params)
    return new Promise(function(resolve, reject) {
      try {
        fetch("http://192.168.1.41:7000/beer")
          .then(response => response.json())
          .then(responseJson => {
            resolve(responseJson);
          })
          .catch(error => {
            // console.log(error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  checkLogin(params) {
    return new Promise(function(resolve, reject) {
      fetch("http://192.168.1.41:7000/login", {
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
      fetch("http://192.168.1.41:7000/signup", {
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
  handleCheckProfile(params) {
    profileUrl = "http://192.168.1.41:7000/users/get_profile/" + params.user;
    return new Promise(function(resolve, reject) {
      try {
        fetch(profileUrl)
          .then(response => response.json())
          .then(responseJson => {
            resolve(responseJson);
          })
          .catch(error => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  handleUpdateProfile(params) {
    bodyObj = params.updateObj;
    return new Promise(function(resolve, reject) {
      fetch("http://192.168.1.41:7000/users/create_profile", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(bodyObj)
      })
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default new Api();
