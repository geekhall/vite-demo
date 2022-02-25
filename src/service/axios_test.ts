const axios = require('axios')

axios.get('http://localhost:8888/hello').then(function (response) {
  console.log(response.body)
  //   console.log(response.data)
  //   console.log(response.status)
  //   console.log(response.statusText)
  //   console.log(response.headers)
  //   console.log(response.config)
})
