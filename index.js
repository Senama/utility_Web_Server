
const express = require('express')();
const request = require('request');
const port = 3000;

const gifReq = (searchQuery, cb) => {
    const baseURL = `http://api.giphy.com/v1/gifs/search`;
    const key = `bfsCXS3RxM1C67kFjmIb0ZUBQVUHPVGh`;
    request.get(`${baseURL}?q=${searchQuery}&api_key=${key}`, (err, res, body) => {
        const data = JSON.parse(body);
        cb(data);
    });
}

express.get('/math/add', (request, response) => {
    const callA = Object.keys(request.query);
    const callB = Object.values(request.query);

    const responseObj = {
        input:{}, 
        sumString:'', 
        sum:0,
    }
    
    for (let i = 0; i < callA.length; i++){
        if (!(parseInt(callB[i], 10))) {
            response.json({
                'error': `You passed a non-number value into the parameters.`,
            });
            return;
        }
        
        responseObj.input[`${callA[i]}`] = callB[i];
        
        if (i !== callA.length - 1) {
            responseObj.sumString += `${callB[i]} + `;
        } else {
            responseObj.sumString += `${callB[i]}`;
        }

        responseObj.sum += parseInt(callB[i], 10);
    }
    
    response.json(responseObj);
});

express.get('/math/multiply', (request, response) => {
    const callA = Object.keys(request.query);
    const callB = Object.values(request.query);
   
    const responseObj = {
       input: {},
       productString: '',
       product:1,
    } 

    for (let i = 0; i < callA.length; i++) {
        if (!(parseInt(callB[i], 10))) {
            response.json({
                'error': `You passed a non-number value into the parameters.`,
            });
            return;
        }
    
        responseObj.input[`${callA[i]}`] = callB[i];

        if (i !== callA.length - 1) {
           responseObj.productString += `${callB[i]} * `
        } else {
           responseObj.productString += `${callB[i]}`
        }

        responseObj.product *= callB[i];
    }
    response.json(responseObj);
});

express.get('/gif', (request, response) => {
    const gifArr = [];
    const callB = Object.values(request.query);

    if (callB.length > 1) {
        response.json({
            'error': `You passed a non-number value into the parameters.`,
        });
        return;
    }

    gifReq(callB[0], (data) => {
        for (let i = 0; i < data.data.length; i++) {
            gifArr.push(data.data[i].images.original.url);
        }
        response.json(gifArr);
    });
});

express.listen(port, () => {
    console.log('app is listening');
});
