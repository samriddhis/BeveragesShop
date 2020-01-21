class Api {
  constructor() {
   // console.log("Beer Api instantiated");
  }

  getListValue(params) {
    //"http://starlord.hackerearth.com/beercraft"
    //  console.log("params in get list value",params)
    return new Promise(function(resolve, reject) {
      try {
        fetch("https://aqueous-refuge-84015.herokuapp.com/beer")
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
      fetch("https://aqueous-refuge-84015.herokuapp.com/login", {
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
      fetch("https://aqueous-refuge-84015.herokuapp.com/signup", {
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
  handleGetProfile(params) {
    profileUrl = "https://aqueous-refuge-84015.herokuapp.com/users/get_profile/" + params.user;
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
      fetch("https://aqueous-refuge-84015.herokuapp.com/users/create_profile", {
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
  uploadImage(params) {
    let data = new FormData();
    data.append("file", {
      name: "image",
      type: Platform.OS === "android" ? "image/mp4" : "image/mov",
      uri:
        Platform.OS === "android"
          ? params.image.uri
          : params.image.uri.replace("file://", "")
    });
    data.append("upload_preset", "csho8gae");
    return new Promise(function(resolve, reject) {
      try {
        fetch("https://api.cloudinary.com/v1_1/ddxz5smac/image/upload", {
          method: "POST",
          body: data
        })
          .then(response => {
            response
              .json()
              .then(res => {
                console.log("response is", res);
                resolve(res);
              })
              .catch(error => reject(error));
          })
          .catch(error => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new Api();
