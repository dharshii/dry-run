const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async(req, res) => {
    const urls = req.query.url;
    if(!urls){
        return res.status(400).json({error:'Missing url query parameter'});
    }
    try{
        const responses = await Promise.all(
            urls.map(async url =>{
                try{
                    const response = await axios.get(url);
                    return response.data.numbers;
                } catch(error){
                    return null;
                }
            })
        );
        res.json({results: responses});
    } catch(error){
        res.status(500).json({error:'An error occured'});

    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});