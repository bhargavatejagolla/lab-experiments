const fs = require('fs');
const path = require('path');

function readFileSafe(relPath) {
    try {
        const fullPath = path.join(__dirname, relPath);
        return fs.readFileSync(fullPath, 'utf8');
    } catch (e) {
        console.error('Error reading ' + relPath, e);
        return '';
    }
}

// All experiments definitions
const experiments = [
    // -------------------------------------------------------------
    // SIMPLE 1
    // -------------------------------------------------------------
    {
        id: 'simple-1',
        level: 'simple',
        expNum: 1,
        title: 'Responsive Landing Page',
        subtitle: 'Bootstrap 5 Responsive Grid & UI Components',
        category: 'Frontend & UI',
        path: 'simple/Experiment-1',
        tags: ['HTML5', 'Bootstrap 5', 'Responsive Grid', 'Forms'],
        aim: 'To design and implement a responsive web application landing page using the Bootstrap 5.3 CSS framework.',
        summary: 'A clean, responsive company homepage built with Bootstrap 5.3 featuring a top navigation bar, centered hero section, registration form, login form, and dark footer.',
        concepts: [
            'Bootstrap 5 CDN stylesheet integration',
            '12-Column Responsive Grid (container, col-md-5)',
            'Mobile-first responsive layout mechanics',
            'Form input controls (form-control, mb-2) and utility buttons (btn-primary, btn-success, w-100)'
        ],
        walkthrough: [
            { lines: '1-8', title: 'HTML Document Head & Bootstrap CDN', text: 'Sets UTF-8 encoding, mobile viewport meta tag (width=device-width, initial-scale=1), and links the Bootstrap 5.3.3 CSS bundle via jsDelivr CDN.' },
            { lines: '12-17', title: 'Responsive Navbar', text: 'Uses Bootstrap .navbar, .bg-primary, and .navbar-dark classes to create a branded horizontal navigation bar with links to #home, #register, and #login.' },
            { lines: '20-23', title: 'Hero Banner Section', text: 'A centered container (text-center p-5) introducing the website with a main heading and subtitle.' },
            { lines: '27-33', title: 'Registration Form', text: 'Enclosed in a col-md-5 container to occupy 5 of 12 grid columns on desktops while expanding to 100% on phones. Includes Name, Email, and Password inputs.' },
            { lines: '37-43', title: 'Login Form Section', text: 'Features email and password inputs with a full-width green login button (btn-success w-100).' },
            { lines: '47-49', title: 'Footer', text: 'Sticky dark footer (bg-dark text-white text-center p-2) with copyright information.' }
        ],
        howToRun: [
            { cmd: 'Double click index.html', desc: 'Open directly in Chrome, Edge, Brave, or Firefox without any web server required.' },
            { cmd: 'npx serve .', desc: 'Optional: Run a quick local HTTP server.' }
        ],
        vivaQuestions: [
            { q: 'What is Bootstrap and why is it widely used?', a: 'Bootstrap is a free, open-source CSS framework designed for responsive, mobile-first front-end web development. It provides pre-styled components and a 12-column grid system.' },
            { q: 'What does the class col-md-5 mean in Bootstrap?', a: 'It specifies that on medium screens (>=768px wide) and above, the element spans 5 out of 12 columns. On smaller devices (<768px), it automatically defaults to full 100% width.' },
            { q: 'What is the purpose of <meta name="viewport" content="width=device-width, initial-scale=1">?', a: 'It instructs mobile browsers to render the page to the width of the physical screen and sets the initial zoom level to 1.0, enabling proper responsive behavior.' }
        ],
        files: [
            { name: 'index.html', relPath: 'simple/Experiment-1/index.html', language: 'html', content: readFileSafe('simple/Experiment-1/index.html') }
        ],
        liveType: 'html',
        liveFile: 'simple/Experiment-1/index.html'
    },

    // -------------------------------------------------------------
    // COMPLEX 1
    // -------------------------------------------------------------
    {
        id: 'complex-1',
        level: 'complex',
        expNum: 1,
        title: 'E-Commerce Store & Shopping Cart Layout',
        subtitle: 'Pure CSS Grid Auto-Fit, Flexbox & Media Queries',
        category: 'Frontend & CSS Grid',
        path: 'complex/experiment-1',
        tags: ['HTML5', 'CSS Grid', 'CSS Flexbox', 'Media Queries', 'E-Commerce'],
        aim: 'To design a responsive e-commerce web application layout using custom CSS Grid, Flexbox, and Media Queries from scratch without any external CSS framework.',
        summary: 'A complete multi-section shopping store interface featuring a responsive flex navigation bar, user registration and login cards, a dynamic product catalog powered by CSS Grid with auto-fit columns, and a cart checkout summary.',
        concepts: [
            'CSS Grid with repeat(auto-fit, minmax(200px, 1fr)) for fluid auto-wrapping columns',
            'CSS Flexbox navigation with justify-content: space-around and flex-wrap: wrap',
            'Mobile responsiveness via @media (max-width: 600px) media query',
            'Semantic HTML5 sectioning and internal anchor navigation'
        ],
        walkthrough: [
            { lines: '8-14', title: 'CSS Base & Body Styling', text: 'Defines Arial typography and a vibrant background theme with reset zero margins.' },
            { lines: '16-24', title: 'Flexbox Navigation Bar', text: 'Sets up a dark navy navbar using Flexbox with space-around distribution and text decoration.' },
            { lines: '37-41', title: 'CSS Grid Product Catalog', text: 'Defines .products with display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;. Automatically computes the number of columns based on screen width.' },
            { lines: '43-48', title: 'Product Card Styling', text: 'Cards styled with soft background (#e6f0ff), rounded corners (border-radius: 10px), and centered content.' },
            { lines: '64-70', title: 'Mobile Responsive Media Query', text: 'At max-width: 600px, flips the navbar flex direction to column with 10px spacing for mobile ergonomics.' },
            { lines: '72-137', title: 'HTML Structure', text: 'Contains #register, #login, #catalog (Phone, Laptop, Headphones cards), and #cart sections with checkout button.' }
        ],
        howToRun: [
            { cmd: 'Double click shopping.html', desc: 'Open directly in your web browser.' }
        ],
        vivaQuestions: [
            { q: 'What is the key difference between CSS Grid and CSS Flexbox?', a: 'Flexbox is one-dimensional (handles items either along a row OR a column), whereas CSS Grid is two-dimensional (manages rows and columns simultaneously).' },
            { q: 'How does repeat(auto-fit, minmax(200px, 1fr)) work?', a: 'auto-fit creates as many columns as will fit in the container. minmax(200px, 1fr) ensures each column is at least 200px wide, and stretches equally (1fr) to fill any extra space.' },
            { q: 'What happens to the navigation on screens narrower than 600px?', a: 'The media query @media(max-width: 600px) applies flex-direction: column, stacking the navigation links vertically for mobile usability.' }
        ],
        files: [
            { name: 'shopping.html', relPath: 'complex/experiment-1/shopping.html', language: 'html', content: readFileSafe('complex/experiment-1/shopping.html') }
        ],
        liveType: 'html',
        liveFile: 'complex/experiment-1/shopping.html'
    },

    // -------------------------------------------------------------
    // SIMPLE 2
    // -------------------------------------------------------------
    {
        id: 'simple-2',
        level: 'simple',
        expNum: 2,
        title: 'Client-Side Form Validation',
        subtitle: 'JavaScript Form Event Interception & DOM Validation',
        category: 'Frontend & JavaScript',
        path: 'simple/experiment-2',
        tags: ['HTML5 Forms', 'JavaScript', 'DOM API', 'Event Handling'],
        aim: 'To validate HTML form inputs (name, email, password) using client-side JavaScript before form submission.',
        summary: 'A client-side registration form with JavaScript validation intercepted via onsubmit="return validate()". Verifies that Name is non-empty, Email contains "@", and Password is at least 6 characters.',
        concepts: [
            'Form submission interception with onsubmit="return validate()"',
            'DOM element value retrieval using document.getElementById().value',
            'Input validation logic using if conditions and string methods (includes, .length)',
            'Preventing invalid form submissions by returning false'
        ],
        walkthrough: [
            { lines: '8-14', title: 'HTML Form Setup', text: 'Defines <form onsubmit="return validate()"> with input fields for name, email, and password.' },
            { lines: '17-20', title: 'Reading Form Values', text: 'Extracts values from input elements by their IDs: name, email, pass.' },
            { lines: '22-25', title: 'Name Validation', text: 'Checks if name == "". If empty, alerts "Enter your name" and returns false to abort submission.' },
            { lines: '27-30', title: 'Email Validation', text: 'Checks !email.includes("@"). If missing the "@" symbol, alerts "Enter a valid email" and returns false.' },
            { lines: '32-35', title: 'Password Length Validation', text: 'Enforces minimum password length of 6 characters via pass.length < 6.' },
            { lines: '37-39', title: 'Submission Success', text: 'Alerts "Registration Successful!" and returns true, permitting form submission.' }
        ],
        howToRun: [
            { cmd: 'Double click register.html', desc: 'Open in any browser and test by submitting blank or invalid inputs.' }
        ],
        vivaQuestions: [
            { q: 'Why do we return false in an onsubmit handler when validation fails?', a: 'Returning false cancels the default submission event, preventing the browser from navigating away or reloading.' },
            { q: 'Why is client-side validation alone not sufficient for real-world applications?', a: 'Client-side validation can be bypassed by disabling JavaScript, editing the DOM, or sending HTTP requests directly via tools like Postman. Server-side validation is always mandatory.' },
            { q: 'How does email.includes("@") differ from RegExp validation?', a: 'includes("@") is a simple substring check. A RegExp pattern verifies full RFC-compliant syntax including username, domain name, and top-level domain.' }
        ],
        files: [
            { name: 'register.html', relPath: 'simple/experiment-2/register.html', language: 'html', content: readFileSafe('simple/experiment-2/register.html') }
        ],
        liveType: 'html',
        liveFile: 'simple/experiment-2/register.html'
    },

    // -------------------------------------------------------------
    // COMPLEX 2
    // -------------------------------------------------------------
    {
        id: 'complex-2',
        level: 'complex',
        expNum: 2,
        title: 'Dynamic Weather Dashboard with Chart.js API',
        subtitle: 'Async/Await REST API Integration & Dynamic Chart Rendering',
        category: 'Frontend & Async API',
        path: 'complex/experiment-2',
        tags: ['JavaScript ES8', 'Fetch API', 'OpenWeather REST API', 'Chart.js', 'Canvas'],
        aim: 'To integrate an external REST API using JavaScript async/await and visualize weather metrics dynamically with Chart.js on an HTML5 canvas.',
        summary: 'An interactive weather dashboard where users enter any city name to fetch live weather data from OpenWeatherMap API. Dynamically updates current temperature on the DOM and renders Min, Current, and Max temperatures in a responsive Chart.js bar chart.',
        concepts: [
            'Asynchronous HTTP requests with fetch() and async/await',
            'Query parameter encoding via encodeURIComponent()',
            'Parsing JSON API responses and handling error states (!response.ok)',
            'Chart.js instance lifecycle management (chart.destroy() to prevent memory leaks)'
        ],
        walkthrough: [
            { lines: '6-8', title: 'External Chart.js Library', text: 'Loads the Chart.js visualization library from jsDelivr CDN.' },
            { lines: '11-16', title: 'Input & Visualization Canvas', text: 'City input field, "Get Weather" trigger button, result header, and <canvas id="chart"> element.' },
            { lines: '19-25', title: 'Asynchronous API Request', text: 'Retrieves city input, builds query URL with OpenWeather API key and metric units, then initiates fetch(url).' },
            { lines: '26-36', title: 'Response Parsing & Error Handling', text: 'Awaits response.json(). If response is not ok (e.g., city not found), throws an error to display to the user.' },
            { lines: '37-41', title: 'DOM Update & Chart Teardown', text: 'Displays temperature in <h3> and calls window.myChart.destroy() if an existing chart was already rendered.' },
            { lines: '42-57', title: 'Chart.js Bar Chart Initialization', text: 'Creates a new bar chart showing Minimum, Current, and Maximum temperatures extracted from data.main.' }
        ],
        howToRun: [
            { cmd: 'Double click weather.html', desc: 'Open in browser with an active internet connection, enter a city name (e.g. Hyderabad, London, Tokyo) and click "Get Weather".' }
        ],
        vivaQuestions: [
            { q: 'Why is window.myChart.destroy() essential before creating a new chart?', a: 'Chart.js attaches event listeners and canvas references. If you create a new chart on the same canvas without destroying the old instance, both instances collide, causing glitches and memory leaks.' },
            { q: 'What does encodeURIComponent() do?', a: 'It safely encodes special characters and spaces in URL query parameters (e.g., "New York" becomes "New%20York") so the HTTP request remains valid.' },
            { q: 'What advantages does async/await provide over Promise chaining (.then)?', a: 'It makes asynchronous code read like synchronous sequential code, eliminates nested indentation, and allows unified error handling using standard try...catch blocks.' }
        ],
        files: [
            { name: 'weather.html', relPath: 'complex/experiment-2/weather.html', language: 'html', content: readFileSafe('complex/experiment-2/weather.html') }
        ],
        liveType: 'html',
        liveFile: 'complex/experiment-2/weather.html'
    },

    // -------------------------------------------------------------
    // SIMPLE 3
    // -------------------------------------------------------------
    {
        id: 'simple-3',
        level: 'simple',
        expNum: 3,
        title: 'Modern ES6+ JavaScript Fundamentals',
        subtitle: 'Arrow Functions, Callbacks, Promises, and Async/Await',
        category: 'Core JavaScript',
        path: 'simple/experiment-3',
        tags: ['JavaScript ES6+', 'Arrow Functions', 'Callbacks', 'Promises', 'Async/Await'],
        aim: 'To study and implement core ES6+ JavaScript features: Arrow Functions, Callbacks, Promises, and Async/Await.',
        summary: 'Demonstrates modern ECMAScript asynchronous patterns: arrow functions with implicit return, higher-order functions executing callbacks, Promise generation and consumption with .then(), and non-blocking asynchronous execution with async/await.',
        concepts: [
            'Concise Arrow function syntax and lexical scoping',
            'Passing and invoking callback functions',
            'Promise lifecycle (Pending, Resolved/Fulfilled, Rejected)',
            'Syntactic sugar of async/await over Promises'
        ],
        walkthrough: [
            { lines: '1-2', title: 'Arrow Function', text: 'Defines const add = (a, b) => a + b; showcasing concise syntax and implicit return value.' },
            { lines: '4-9', title: 'Callback Functions', text: 'Function greet(name, callback) accepts a callback function and invokes it after printing greeting message.' },
            { lines: '11-14', title: 'Promises & .then()', text: 'Instantiates new Promise((resolve) => { resolve("Promise resolved"); }) and listens for fulfillment with .then().' },
            { lines: '16-24', title: 'Async / Await', text: 'async function display() pauses execution at await new Promise(...) until resolved, cleanly logging "Hello Bro!".' }
        ],
        howToRun: [
            { cmd: 'node es6.js', desc: 'Run using Node.js in the terminal.' },
            { cmd: 'Console in DevTools', desc: 'Open any browser (F12 -> Console) and paste the code to execute.' }
        ],
        vivaQuestions: [
            { q: 'How does "this" work in arrow functions compared to normal functions?', a: 'Normal functions bind "this" based on how they are called (runtime binding). Arrow functions do not bind their own "this"; they lexically inherit "this" from the enclosing scope.' },
            { q: 'What is the purpose of Promises in JavaScript?', a: 'Promises represent the eventual completion (or failure) of an asynchronous operation, preventing "Callback Hell" through chainable .then() and .catch() handlers.' },
            { q: 'What does the await keyword do?', a: 'It pauses the execution of an async function until the awaited Promise settles (resolves or rejects), without blocking the main browser thread.' }
        ],
        files: [
            { name: 'es6.js', relPath: 'simple/experiment-3/es6.js', language: 'javascript', content: readFileSafe('simple/experiment-3/es6.js') }
        ],
        liveType: 'js-runner',
        liveCode: readFileSafe('simple/experiment-3/es6.js')
    },

    // -------------------------------------------------------------
    // COMPLEX 3
    // -------------------------------------------------------------
    {
        id: 'complex-3',
        level: 'complex',
        expNum: 3,
        title: 'Java JDBC & MySQL Student CRUD Application',
        subtitle: 'Enterprise Database Connectivity with PreparedStatements',
        category: 'Backend & Database',
        path: 'complex/experiment-3',
        tags: ['Java SE', 'JDBC', 'MySQL', 'SQL DDL/DML', 'PreparedStatements'],
        aim: 'To build a complete interactive CLI CRUD application in Java SE using JDBC (Java Database Connectivity) and MySQL with PreparedStatements.',
        summary: 'A robust database connectivity application in Java that establishes a connection with a local MySQL database (college), providing an interactive terminal menu for Inserting, Displaying, Updating, and Deleting student records using SQL PreparedStatements.',
        concepts: [
            'JDBC Architecture: DriverManager, Connection, PreparedStatement, ResultSet',
            'SQL table creation and primary key constraints (working.sql)',
            'Preventing SQL injection vulnerabilities using parameterized PreparedStatement',
            'Executing DML statements (executeUpdate) vs queries (executeQuery)',
            'Safe resource management with con.close() and sc.close()'
        ],
        walkthrough: [
            { lines: '1-4 (working.sql)', title: 'MySQL Schema Setup', text: 'Creates student table with id INT PRIMARY KEY, name VARCHAR(50), and marks INT in college database.' },
            { lines: '6-9', title: 'Database Connection', text: 'Uses DriverManager.getConnection("jdbc:mysql://localhost:3306/college", "root", "password") to establish JDBC bridge.' },
            { lines: '13-17', title: 'CLI Menu Loop', text: 'Infinite while-loop presenting options: 1.Insert, 2.Display, 3.Update, 4.Delete, 5.Exit.' },
            { lines: '22-34', title: 'Insert Operation (Create)', text: 'Reads user input, compiles INSERT INTO student VALUES (?, ?, ?), sets typed parameters (setInt, setString), and runs executeUpdate().' },
            { lines: '36-45', title: 'Display Operation (Read)', text: 'Executes SELECT * FROM student via Statement, iterating through rows using rs.next() and reading columns.' },
            { lines: '47-57', title: 'Update Operation (Update)', text: 'Updates student marks for given ID using UPDATE student SET marks=? WHERE id=?.' },
            { lines: '59-67', title: 'Delete Operation (Delete)', text: 'Removes student record by primary key using DELETE FROM student WHERE id=?.' }
        ],
        howToRun: [
            { cmd: 'mysql -u root -p < working.sql', desc: '1. Create database table in MySQL.' },
            { cmd: 'javac StudentCRUD.java', desc: '2. Compile Java source file.' },
            { cmd: 'java -cp ".;mysql-connector-j-8.3.0.jar" StudentCRUD', desc: '3. Execute with MySQL JDBC Connector jar in classpath.' }
        ],
        vivaQuestions: [
            { q: 'Why is PreparedStatement preferred over Statement in JDBC?', a: '1. Performance: Queries are pre-compiled and cached on the database server. 2. Security: Parameter values are sanitized automatically, preventing SQL Injection attacks.' },
            { q: 'What is the difference between executeQuery() and executeUpdate()?', a: 'executeQuery() is used for SELECT queries and returns a ResultSet. executeUpdate() is used for INSERT, UPDATE, DELETE, or DDL statements and returns an integer count of affected rows.' },
            { q: 'What does ResultSet.next() do?', a: 'It advances the cursor to the next row of the query result set and returns true if a record exists, or false when the end of results is reached.' }
        ],
        files: [
            { name: 'StudentCRUD.java', relPath: 'complex/experiment-3/StudentCRUD.java', language: 'java', content: readFileSafe('complex/experiment-3/StudentCRUD.java') },
            { name: 'working.sql', relPath: 'complex/experiment-3/working.sql', language: 'sql', content: readFileSafe('complex/experiment-3/working.sql') }
        ],
        liveType: 'jdbc-sim'
    },

    // -------------------------------------------------------------
    // SIMPLE 4
    // -------------------------------------------------------------
    {
        id: 'simple-4',
        level: 'simple',
        expNum: 4,
        title: 'XML Schema Validation (DTD vs XSD) with Python',
        subtitle: 'Document Type Definition, XML Schema & Python lxml Parser',
        category: 'Data Formats & Python',
        path: 'simple/experiment-4',
        tags: ['XML', 'DTD', 'XSD (XML Schema)', 'Python 3', 'lxml'],
        aim: 'To define structured hierarchical data in XML and validate it against DTD and XML Schema (XSD) specifications using Python.',
        summary: 'A complete XML data validation workflow. Models a bookstore catalog in XML, defines structural rules via DTD, defines strict typed constraints via XSD, and executes automated validation using Python with the lxml library.',
        concepts: [
            'Hierarchical data representation in XML syntax',
            'Document Type Definition grammar (<!ELEMENT bookstore (book+)>)',
            'XML Schema data types (xs:string, xs:decimal, maxOccurs="unbounded")',
            'Automated schema parsing and validation using Python lxml.etree'
        ],
        walkthrough: [
            { lines: '1-6 (bookstore.dtd)', title: 'DTD Definition', text: 'Specifies bookstore contains 1 or more book elements (book+), each requiring title, author, and price with parsed character data (#PCDATA).' },
            { lines: '1-9 (bookstore.xml)', title: 'Sample XML Document', text: 'Specifies SYSTEM "bookstore.dtd" and populates a sample Python book entry with author and price.' },
            { lines: '1-18 (bookstore.xsd)', title: 'XSD Schema Definition', text: 'Defines elements under W3C XMLSchema namespace with explicit types (xs:string, xs:decimal) and sequence rules.' },
            { lines: '1-11 (validate.py)', title: 'Python Validation Script', text: 'Uses etree.parse(), etree.DTD(), and etree.XMLSchema() to validate the document and print boolean validity results.' }
        ],
        howToRun: [
            { cmd: 'pip install lxml', desc: '1. Install Python lxml parser library.' },
            { cmd: 'python validate.py', desc: '2. Execute script to validate XML against DTD and XSD.' }
        ],
        vivaQuestions: [
            { q: 'What are the main differences between DTD and XSD?', a: 'DTD uses non-XML syntax and lacks support for data types (all values are text strings). XSD is written in XML syntax, supports rich data types (integer, decimal, date, string), and supports namespaces.' },
            { q: 'What does #PCDATA mean in a DTD file?', a: 'It stands for "Parsed Character Data" - text that will be examined by the XML parser for tags and entities.' },
            { q: 'What does the qualifier "+" mean in (book+)?', a: 'It indicates that one or more instances of the book element must appear inside the parent element.' }
        ],
        files: [
            { name: 'bookstore.dtd', relPath: 'simple/experiment-4/bookstore.dtd', language: 'dtd', content: readFileSafe('simple/experiment-4/bookstore.dtd') },
            { name: 'bookstore.xml', relPath: 'simple/experiment-4/bookstore.xml', language: 'xml', content: readFileSafe('simple/experiment-4/bookstore.xml') },
            { name: 'bookstore.xsd', relPath: 'simple/experiment-4/bookstore.xsd', language: 'xml', content: readFileSafe('simple/experiment-4/bookstore.xsd') },
            { name: 'validate.py', relPath: 'simple/experiment-4/validate.py', language: 'python', content: readFileSafe('simple/experiment-4/validate.py') }
        ],
        liveType: 'xml-sim'
    },

    // -------------------------------------------------------------
    // COMPLEX 4
    // -------------------------------------------------------------
    {
        id: 'complex-4',
        level: 'complex',
        expNum: 4,
        title: 'Express.js RESTful CRUD Microservice',
        subtitle: 'REST API Endpoints with HTTP Methods & Status Codes',
        category: 'Backend & REST API',
        path: 'complex/experiment-4',
        tags: ['Node.js', 'Express.js v5', 'REST API', 'HTTP Verbs', 'JSON'],
        aim: 'To build a RESTful Web API using Express.js providing full CRUD endpoints (GET, POST, PUT, DELETE) with JSON serialization and HTTP response codes.',
        summary: 'A modular Express.js REST API service managing an in-memory student database collection. Implements endpoints for retrieving all students (GET /students), adding a new student (POST /students), updating marks/name (PUT /students/:id), and deleting a student (DELETE /students/:id).',
        concepts: [
            'REST API architectural style and semantic HTTP verbs',
            'Express body-parsing middleware app.use(express.json())',
            'Extracting URL route parameters via req.params.id',
            'Validating incoming request payloads and returning proper HTTP status codes (200, 400, 404)'
        ],
        walkthrough: [
            { lines: '1-4', title: 'Express Setup & JSON Middleware', text: 'Imports Express and applies app.use(express.json()) to parse incoming JSON request bodies.' },
            { lines: '6-9', title: 'In-Memory Data Store', text: 'Initializes students array containing sample records { id, name, marks }.' },
            { lines: '11-14', title: 'GET /students (Read)', text: 'Responds with the complete students array in JSON format.' },
            { lines: '16-25', title: 'POST /students (Create)', text: 'Extracts { id, name, marks } from req.body. If fields are missing, returns 400 Bad Request. Otherwise pushes new student and returns success.' },
            { lines: '27-36', title: 'PUT /students/:id (Update)', text: 'Finds student matching req.params.id. If not found, returns 404 Not Found. Otherwise updates name and marks.' },
            { lines: '38-42', title: 'DELETE /students/:id (Delete)', text: 'Filters out student matching req.params.id from the array and confirms deletion.' },
            { lines: '44-46', title: 'Server Listener', text: 'Starts Express listener on port 3000.' }
        ],
        howToRun: [
            { cmd: 'npm install', desc: '1. Install Express dependencies.' },
            { cmd: 'node server.js', desc: '2. Start the REST API server on port 3000.' },
            { cmd: 'curl http://localhost:3000/students', desc: '3. Test GET endpoint with curl or Postman.' }
        ],
        vivaQuestions: [
            { q: 'What is a RESTful API and what are its key principles?', a: 'REST (Representational State Transfer) is an architectural style for networked applications. Key constraints include stateless communication, client-server separation, uniform interface (standard HTTP verbs), and resource-based URIs.' },
            { q: 'What is the role of app.use(express.json())?', a: 'It is built-in Express middleware that parses incoming HTTP requests with JSON payloads and makes the parsed data available under req.body.' },
            { q: 'What is the difference between PUT and POST in REST API conventions?', a: 'POST is used to create a new resource on the server. PUT is used to replace/update an existing resource (or create if absent) at a specific URI.' }
        ],
        files: [
            { name: 'server.js', relPath: 'complex/experiment-4/server.js', language: 'javascript', content: readFileSafe('complex/experiment-4/server.js') },
            { name: 'package.json', relPath: 'complex/experiment-4/package.json', language: 'json', content: readFileSafe('complex/experiment-4/package.json') }
        ],
        liveType: 'rest-sim'
    },

    // -------------------------------------------------------------
    // SIMPLE 5
    // -------------------------------------------------------------
    {
        id: 'simple-5',
        level: 'simple',
        expNum: 5,
        title: 'Express Session & Cookie State Management',
        subtitle: 'Stateful User Tracking with express-session & Cookies',
        category: 'Backend & State Management',
        path: 'simple/experiment-5',
        tags: ['Node.js', 'Express.js', 'express-session', 'HTTP Cookies', 'State Management'],
        aim: 'To implement stateful session management and HTTP cookie handling in an Express.js web server.',
        summary: 'Demonstrates maintaining state across HTTP requests. Uses the express-session middleware to track session visit counts on the server and res.cookie to set client-side browser cookies.',
        concepts: [
            'HTTP statelessness vs stateful sessions',
            'Configuring session secrets and cookie attributes',
            'Setting browser cookies with res.cookie("username", "Teja")',
            'Persistent session properties on req.session (e.g. req.session.visits)'
        ],
        walkthrough: [
            { lines: '1-3', title: 'Imports & Express Init', text: 'Imports express and express-session middleware.' },
            { lines: '6-12', title: 'Session Middleware Configuration', text: 'Configures session with secret key "abc123", resave: false, and saveUninitialized: true.' },
            { lines: '14-19', title: 'Cookie Setting & Visit Counter', text: 'Sets cookie "username" to "Teja", increments req.session.visits = (req.session.visits || 0) + 1, and sends HTML showing visit count.' },
            { lines: '21-23', title: 'Server Activation', text: 'Starts HTTP listener on port 3000.' }
        ],
        howToRun: [
            { cmd: 'npm install', desc: '1. Install express and express-session.' },
            { cmd: 'node server.js', desc: '2. Start the session server.' },
            { cmd: 'Open http://localhost:3000', desc: '3. Refresh page repeatedly to observe the session visit counter incrementing.' }
        ],
        vivaQuestions: [
            { q: 'Where are cookies stored vs where are sessions stored?', a: 'Cookies are stored on the client browser. Sessions are stored on the server (in memory or database), with only an encrypted session ID cookie (connect.sid) stored on the client.' },
            { q: 'Why is a secret key required in express-session?', a: 'The secret is used to sign the session ID cookie with HMAC encryption to prevent clients from tampering with or forging session IDs.' },
            { q: 'What does saveUninitialized: true mean?', a: 'It forces a session that is "uninitialized" (new and not yet modified) to be saved to the session store.' }
        ],
        files: [
            { name: 'server.js', relPath: 'simple/experiment-5/server.js', language: 'javascript', content: readFileSafe('simple/experiment-5/server.js') },
            { name: 'package.json', relPath: 'simple/experiment-5/package.json', language: 'json', content: readFileSafe('simple/experiment-5/package.json') }
        ],
        liveType: 'session-sim'
    },

    // -------------------------------------------------------------
    // COMPLEX 5
    // -------------------------------------------------------------
    {
        id: 'complex-5',
        level: 'complex',
        expNum: 5,
        title: 'Stateless JWT Authentication & Protected Middleware',
        subtitle: 'JSON Web Tokens, Bearer Authentication & Middleware Security',
        category: 'Backend & Web Security',
        path: 'complex/experiment-5',
        tags: ['Node.js', 'Express.js', 'JWT (jsonwebtoken)', 'Bearer Token', 'Middleware Auth'],
        aim: 'To implement secure stateless authentication and route authorization using JSON Web Tokens (JWT) in Express.js.',
        summary: 'Production-pattern token authentication. Exposes a /login route that validates user credentials and issues a signed JWT valid for 1 hour, a custom verifyToken middleware that validates the Authorization: Bearer <token> header, and a protected /profile endpoint.',
        concepts: [
            'JSON Web Token structure: Header, Payload, Signature',
            'Stateless authentication (zero server-side session storage)',
            'Generating cryptographically signed tokens with jwt.sign()',
            'Custom Express middleware pattern for authorization checks',
            'Verifying tokens with jwt.verify() and attaching payload to req.user'
        ],
        walkthrough: [
            { lines: '1-6', title: 'Imports & Secret Key', text: 'Requires express and jsonwebtoken, enables JSON parsing, and sets secret key "Anjibunny@123".' },
            { lines: '9-19', title: 'Login & Token Generation', text: 'Validates admin / 1234. If credentials match, generates a signed JWT containing { username } payload expiring in 1 hour via jwt.sign().' },
            { lines: '22-32', title: 'JWT Verification Middleware', text: 'Extracts token from req.headers.authorization. If missing, returns 403 Forbidden. Calls jwt.verify(): if invalid returns 401, if valid attaches req.user = user and calls next().' },
            { lines: '35-40', title: 'Protected Route /profile', text: 'Guards /profile using verifyToken middleware; returns welcome message and user data only for valid tokens.' },
            { lines: '42-44', title: 'Server Listener', text: 'Runs HTTP server on port 3000.' }
        ],
        howToRun: [
            { cmd: 'npm install', desc: '1. Install express and jsonwebtoken.' },
            { cmd: 'node server.js', desc: '2. Start authentication server.' },
            { cmd: 'POST /login {"username":"admin","password":"1234"}', desc: '3. Obtain JWT token.' },
            { cmd: 'GET /profile with header "Authorization: Bearer <token>"', desc: '4. Access protected profile route.' }
        ],
        vivaQuestions: [
            { q: 'What are the three parts of a JWT and how are they separated?', a: 'A JWT consists of three parts separated by dots (.): 1. Header (algorithm and token type), 2. Payload (user claims and expiry), 3. Signature (HMAC or RSA hash ensuring data has not been modified).' },
            { q: 'Why is JWT authentication called "stateless"?', a: 'The server does not need to store token records in memory or a database. All identity and permission claims are encapsulated within the token itself and cryptographically verified on every request.' },
            { q: 'What is the HTTP 401 status code vs 403 status code?', a: '401 Unauthorized means authentication is missing or invalid. 403 Forbidden means the server understood who you are, but you do not have permission to access the resource.' }
        ],
        files: [
            { name: 'server.js', relPath: 'complex/experiment-5/server.js', language: 'javascript', content: readFileSafe('complex/experiment-5/server.js') },
            { name: 'package.json', relPath: 'complex/experiment-5/package.json', language: 'json', content: readFileSafe('complex/experiment-5/package.json') }
        ],
        liveType: 'jwt-sim'
    },

    // -------------------------------------------------------------
    // SIMPLE 6
    // -------------------------------------------------------------
    {
        id: 'simple-6',
        level: 'simple',
        expNum: 6,
        title: 'Node.js Core Modules & Event-Driven Architecture',
        subtitle: 'Zero-Dependency HTTP Server, OS, Path & EventEmitter',
        category: 'Core Node.js',
        path: 'simple/experiment-6',
        tags: ['Node.js Core', 'HTTP Module', 'OS Module', 'Path Module', 'EventEmitter'],
        aim: 'To explore core built-in Node.js runtime modules (http, os, path, events) without third-party npm packages.',
        summary: 'Demonstrates low-level Node.js architecture: creating an HTTP server with the http module, retrieving operating system metrics with os, extracting filenames with path, and implementing event-driven pub/sub with EventEmitter.',
        concepts: [
            'Built-in Node.js runtime standard library modules',
            'Creating an HTTP web server with http.createServer()',
            'Operating system inspection with os.platform()',
            'File path manipulation with path.basename(__filename)',
            'Observer pattern with EventEmitter (.on() and .emit())'
        ],
        walkthrough: [
            { lines: '1-4', title: 'Importing Built-in Modules', text: 'Loads core Node.js modules: http, os, path, and events (EventEmitter).' },
            { lines: '6-9', title: 'Event Registration', text: 'Instantiates EventEmitter and registers a listener: event.on("hello", () => console.log("Event occurred!")).' },
            { lines: '12-17', title: 'HTTP Server Handler', text: 'Creates HTTP server writing OS platform name, current filename, and success status into the response stream.' },
            { lines: '20-23', title: 'Triggering Event & Server Start', text: 'Fires event.emit("hello") and starts server listening on port 3000.' }
        ],
        howToRun: [
            { cmd: 'node server.js', desc: 'Run with Node.js directly (no npm install required!).' },
            { cmd: 'Open http://localhost:3000', desc: 'View server response in browser.' }
        ],
        vivaQuestions: [
            { q: 'What is an EventEmitter in Node.js?', a: 'A core class in the events module that facilitates the Observer pattern, allowing objects to subscribe to (.on()) and emit (.emit()) named events asynchronously.' },
            { q: 'Why is Node.js called single-threaded yet capable of asynchronous I/O?', a: 'Node.js runs JavaScript on a single thread using an Event Loop, but offloads blocking I/O tasks to the libuv thread pool and operating system asynchronously.' },
            { q: 'What does path.basename(__filename) return?', a: 'It extracts and returns just the file name with extension (e.g., "server.js") from the complete absolute file path.' }
        ],
        files: [
            { name: 'server.js', relPath: 'simple/experiment-6/server.js', language: 'javascript', content: readFileSafe('simple/experiment-6/server.js') }
        ],
        liveType: 'node-core-sim'
    },

    // -------------------------------------------------------------
    // COMPLEX 6
    // -------------------------------------------------------------
    {
        id: 'complex-6',
        level: 'complex',
        expNum: 6,
        title: 'React SPA with Vite & React Router DOM',
        subtitle: 'Single Page Application Routing & Component Composition',
        category: 'Frontend & React SPA',
        path: 'complex/experiment-6',
        tags: ['React 18/19', 'React Router DOM', 'Vite', 'JSX', 'Single Page Application'],
        aim: 'To develop a client-side Single Page Application (SPA) using React, JSX, Vite, and React Router DOM with seamless multi-view transitions.',
        summary: 'A complete Student Management Single Page Application (SPA) built with React and Vite. Employs BrowserRouter, Routes, Route, and <Link> components from React Router to navigate across Register, Login, Contact, and About views without page reloads, utilizing reusable card wrapper components.',
        concepts: [
            'Single Page Application (SPA) principles and client-side history routing',
            'React Router DOM: BrowserRouter, Routes, Route, and <Link>',
            'Component reusability using props.children composition',
            'Modern React project structure with Vite build tool and modular CSS'
        ],
        walkthrough: [
            { lines: '1-8 (src/main.jsx)', title: 'Root Mounting', text: 'Initializes React DOM root using createRoot and wraps <App /> in <StrictMode>.' },
            { lines: '4-11 (src/App.jsx)', title: 'Reusable Pages Card Wrapper', text: 'Creates Pages({ title, children }) functional component rendering a titled card containing child elements passed via props.children.' },
            { lines: '14-23 (src/App.jsx)', title: 'BrowserRouter & Nav Links', text: 'Sets up <BrowserRouter>, title, and <nav> with <Link to="..."> for client-side navigation without page refresh.' },
            { lines: '25-68 (src/App.jsx)', title: 'Route Definitions', text: 'Maps routes: / for Registration, /login for Login, /contact for College Contact, and /about for System About.' }
        ],
        howToRun: [
            { cmd: 'cd complex/experiment-6', desc: '1. Change directory to React project.' },
            { cmd: 'npm install', desc: '2. Install React and React Router dependencies.' },
            { cmd: 'npm run dev', desc: '3. Launch Vite development server.' },
            { cmd: 'Open http://localhost:5173', desc: '4. Interact with the multi-route React Single Page Application.' }
        ],
        vivaQuestions: [
            { q: 'What is a Single Page Application (SPA)?', a: 'An SPA is a web application that loads a single initial HTML page and dynamically rewrites the DOM as the user interacts with the app, eliminating the need for full page refreshes.' },
            { q: 'Why do we use <Link to="..."> instead of standard <a href="..."> in React Router?', a: '<a href="..."> triggers a full browser reload, resetting all state and re-downloading assets. <Link> intercepts the click, updates the URL via HTML5 History API, and dynamically swaps components in memory.' },
            { q: 'What is props.children in React?', a: 'props.children is an automatic prop passed to components that contains whatever JSX or elements are nested between the opening and closing tags of the component.' }
        ],
        files: [
            { name: 'src/App.jsx', relPath: 'complex/experiment-6/src/App.jsx', language: 'javascript', content: readFileSafe('complex/experiment-6/src/App.jsx') },
            { name: 'src/main.jsx', relPath: 'complex/experiment-6/src/main.jsx', language: 'javascript', content: readFileSafe('complex/experiment-6/src/main.jsx') },
            { name: 'src/App.css', relPath: 'complex/experiment-6/src/App.css', language: 'css', content: readFileSafe('complex/experiment-6/src/App.css') },
            { name: 'src/index.css', relPath: 'complex/experiment-6/src/index.css', language: 'css', content: readFileSafe('complex/experiment-6/src/index.css') },
            { name: 'index.html', relPath: 'complex/experiment-6/index.html', language: 'html', content: readFileSafe('complex/experiment-6/index.html') },
            { name: 'package.json', relPath: 'complex/experiment-6/package.json', language: 'json', content: readFileSafe('complex/experiment-6/package.json') },
            { name: 'vite.config.js', relPath: 'complex/experiment-6/vite.config.js', language: 'javascript', content: readFileSafe('complex/experiment-6/vite.config.js') }
        ],
        liveType: 'react-sim'
    }
];

// Comparison Matrix Data
const comparisons = [
    {
        expNum: 1,
        title: 'Web Page Layout & Responsive Architecture',
        topic: 'Experiment 1: Responsive Layouts',
        simpleTitle: 'Simple: Bootstrap 5 Landing Page',
        simpleSummary: 'Uses Bootstrap 5 pre-built 12-column grid classes (container, col-md-5), ready-to-use form controls, and navbar utilities.',
        simplePros: ['Rapid prototyping with pre-baked styles', 'Consistent cross-browser baseline', 'Little custom CSS needed'],
        complexTitle: 'Complex: Custom CSS Grid & Flexbox Store',
        complexSummary: 'Builds a multi-section e-commerce catalog from scratch using pure CSS Grid repeat(auto-fit, minmax(200px, 1fr)) and custom media queries.',
        complexPros: ['Zero dependency overhead (pure vanilla CSS)', 'Fine-grained two-dimensional layout control', 'Fluid auto-fitting cards without rigid grid columns'],
        takeaway: 'Simple leverages CSS framework abstractions for rapid assembly; Complex tests mastery of native modern CSS Grid math and responsive Flexbox mechanics.'
    },
    {
        expNum: 2,
        title: 'Client-Side Interaction & Asynchronous Data',
        topic: 'Experiment 2: Forms vs External APIs',
        simpleTitle: 'Simple: DOM Form Validation',
        simpleSummary: 'Synchronously intercepts form submit event to inspect user strings using .includes("@") and .length before allowing browser submission.',
        simplePros: ['Instant immediate feedback to user', 'Zero external libraries or network requests', 'Direct DOM value inspection'],
        complexTitle: 'Complex: OpenWeather API & Chart.js',
        complexSummary: 'Connects to a live 3rd-party REST API over HTTP using async/await, parses JSON data, and visualizes dynamic temperatures on an HTML5 canvas using Chart.js.',
        complexPros: ['Real-world external API integration', 'Asynchronous data processing and error handling', 'Rich interactive data visualization on canvas'],
        takeaway: 'Simple focuses on synchronous input sanitization; Complex introduces asynchronous networking, REST consumption, and data visualization.'
    },
    {
        expNum: 3,
        title: 'Language Paradigms & Data Persistence',
        topic: 'Experiment 3: ES6 Asynchrony vs Enterprise JDBC CRUD',
        simpleTitle: 'Simple: ES6+ JavaScript Foundations',
        simpleSummary: 'Explores modern JavaScript syntax: arrow functions, higher-order callback patterns, Promise chaining, and async/await syntax.',
        simplePros: ['Core runtime language fluency', 'Foundation for all modern frontend and backend JS', 'Zero infrastructure needed'],
        complexTitle: 'Complex: Java JDBC & MySQL Database CRUD',
        complexSummary: 'Builds an interactive console enterprise database app using Java SE, JDBC drivers, and MySQL relational tables with PreparedStatements.',
        complexPros: ['Real relational database persistence', 'Enterprise parameterized SQL security', 'Comprehensive CRUD transaction lifecycle'],
        takeaway: 'Simple masters asynchronous JavaScript language syntax; Complex demonstrates enterprise compiled backend architecture communicating with relational SQL databases.'
    },
    {
        expNum: 4,
        title: 'Data Modeling & Service Architecture',
        topic: 'Experiment 4: XML Validation vs Express REST API',
        simpleTitle: 'Simple: XML Schema Validation (DTD vs XSD)',
        simpleSummary: 'Defines hierarchical XML data and validates structural grammar against DTD and strict typed schema against XSD using Python lxml.',
        simplePros: ['Strict structural validation standards', 'Formal data definition contract', 'Cross-platform data interchange'],
        complexTitle: 'Complex: Express.js RESTful CRUD Service',
        complexSummary: 'Constructs an HTTP microservice with Express.js exposing CRUD endpoints (GET, POST, PUT, DELETE) handling JSON payloads and status codes.',
        complexPros: ['De-facto modern web service standard (JSON over HTTP)', 'Dynamic programmable endpoints', 'Direct integration with modern web and mobile apps'],
        takeaway: 'Simple explores declarative static schema validation contracts (XML/XSD); Complex builds dynamic programmable REST microservices that power modern web applications.'
    },
    {
        expNum: 5,
        title: 'State & Security Architecture',
        topic: 'Experiment 5: Session State vs JWT Authentication',
        simpleTitle: 'Simple: Cookies & Server Sessions',
        simpleSummary: 'Tracks stateful user visits across HTTP requests by setting browser cookies and storing visitor counters in server-side session memory.',
        simplePros: ['Server has full control over active sessions', 'Easy session revocation and immediate invalidation', 'Browser handles cookie transmission automatically'],
        complexTitle: 'Complex: Stateless JWT Token Authentication',
        complexSummary: 'Implements production token-based authentication using cryptographically signed JSON Web Tokens (JWT), Bearer headers, and custom middleware.',
        complexPros: ['Completely stateless (infinitely scalable horizontally)', 'Cross-domain & mobile friendly', 'Encapsulates claims and expiration inside token'],
        takeaway: 'Simple uses stateful server-bound sessions; Complex implements modern cloud-scale stateless JWT authentication with route protection middleware.'
    },
    {
        expNum: 6,
        title: 'Runtime Mechanics vs Component SPA Architecture',
        topic: 'Experiment 6: Node Built-ins vs React SPA',
        simpleTitle: 'Simple: Core Node.js Standard Modules',
        simpleSummary: 'Creates an HTTP server and explores system introspection using only built-in runtime modules (http, os, path, events) without npm.',
        simplePros: ['Deep understanding of Node.js engine mechanics', 'Zero dependency attack surface and zero bloat', 'Mastery of event emitter patterns'],
        complexTitle: 'Complex: React SPA with React Router & Vite',
        complexSummary: 'Builds a client-side Single Page Application using React 18/19, JSX, Vite, and React Router DOM for route navigation without page reloads.',
        complexPros: ['Modern component-driven declarative UI', 'Instant client-side route transitions without flicker', 'Industry standard modern frontend tech stack'],
        takeaway: 'Simple exposes the raw Node.js runtime and event-driven architecture; Complex builds modern component-driven Single Page Applications using React and React Router.'
    }
];

const jsPayload = `// CodeLab Hub Dataset
window.APP_DATA = ${JSON.stringify({ experiments, comparisons }, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'data.js'), jsPayload, 'utf8');
console.log('Successfully wrote data.js (' + fs.statSync(path.join(__dirname, 'data.js')).size + ' bytes)');
