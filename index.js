const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate')

/// Read data from file
// Template
const tempCourse = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
);

////////////////////////////////
// Template
const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse.html`,
    'utf-8'
);

// function replaceTemplate(htmlStr, course){
// const replaceTemplate = (htmlStr, course) => {  // fat arrow function or lambda
//    let output = htmlStr.replace(/{%NAME%}/g, course.corseName);
//    output = output.replace(/{%IMAGE%}/g, course.image);
//    output = output.replace(/{%FROM%}/g, course.from);
//    output = output.replace(/{%INSTRUCTIONS%}/g, course.instructor);
//   output = output.replace(/{%CREDITS%}/g, course.credits);
//   output = output.replace(/{%DESCRIPTION%}/g, course.description);
//    output = output.replace(/{%ID%}/g, course.id);
//    return output;
// }

const dataObj = JSON.parse(tempCourse); //string to JavaScript Object JSON
////////////////////////////////////
//Create Server
// const server = httpServer.createServer(function (req, res) { // call back function
const server = httpServer.createServer((req, res) => {

    // const urlParameter = url.parse(req.url, true);
    // console.log(JSON.stringify(urlParameter.query)); // convert to string
    // console.log(JSON.stringify(urlParameter.pathname)); // convert to string
    const {query, pathname} = url.parse(req.url, true); // object distructor
    if(query.id){ // if there is query parameter named id is read as string
        // Course page
        if(pathname === '/' || pathname.toLowerCase() === '/courses') {
            res.writeHead(200, {  // Everything ran sucessfully
                'Content-type': 'text/html'
            });
            const course = dataObj[Number(query.id)]; // convert string to numeric value
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course);
            //res.end(`We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}${JSON.stringify(course)}`) // convert back to string
            res.end(courseHTML);
        }
        else{res.writable(404, {  // Server didn't find what we were looking for
            'Content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    }
});


//Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000');
});