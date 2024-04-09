const axios = require('axios');




function ListenKey(apiKey, url = "https://api.binance.com/api/v3/userDataStream") {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url,
        headers: {
            'X-MBX-APIKEY': apiKey
        }
    };
    return axios.request(config).then(r => r.data)
}

ListenKey("").then(console.log)