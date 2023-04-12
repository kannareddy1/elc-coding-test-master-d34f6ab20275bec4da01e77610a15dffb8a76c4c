/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const {re}      = require("@babel/core/lib/vendor/import-meta-resolve");
const hostname  = 'localhost';
const port      = 3035;

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format
    let url = req.url;

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (url.startsWith('/search')) {
        // In case of page reload, fetch all items
        let result = data.filter(e => e.isActive === "true");

        if (url.indexOf('?') !== -1) {
            let queryString = '?' + url.split('?')[1];
            let searchParams = new URLSearchParams(queryString);
            if (searchParams.has('q')) {

                result = result.filter(e => {
                    return e.name.toLowerCase().indexOf(searchParams.get('q')) !== -1
                        || e.about.toLowerCase().indexOf(searchParams.get('q')) !== -1
                        || e.tags.join(',').indexOf(searchParams.get('q')) !== -1
                });
            }
        }
        res.write(JSON.stringify(result));
    }

    res.end(); //end the response
}).listen( port );


console.log(`[Server running on ${hostname}:${port}]`);
