

class Api{
    constructor(){
        console.log("Beer Api instantiated");
    }

    getListValue(params) {
        console.log("params in get list value",params)
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
}

export default new Api()