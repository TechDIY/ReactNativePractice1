class FetchData  {

  getData() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
      })
      .catch((error) =>{
        console.error(error);
      });
  }
}

export let data = new FetchData();