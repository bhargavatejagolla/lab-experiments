# CodeLab Hub · Full Stack Web Development (ZFSD) Code Reader

A modern, responsive, and user-friendly web portal designed to help you read, explore, compare, and study all your Full Stack Web Development experiments organized by **Simple** and **Complex** levels.

---

## 🚀 How to Launch the Website

You have **two super easy ways** to open the website:

### Option 1: Direct Double-Click (Zero Setup)
1. Double-click **`open_website.bat`** (or right-click `index.html` and choose **Open with > Google Chrome / Microsoft Edge**).
2. The website will open immediately with full functionality, syntax highlighting, and interactive previews!

### Option 2: Local HTTP Server (Optional)
If you prefer running through a localhost web server:
1. Double-click **`start_server.bat`**.
2. It starts a lightweight local server and opens **`http://localhost:8080`** in your browser.

---

## 🌟 Key Features of the Website

### 1. 🎚️ Simple vs. Complex Categorization
- **All Experiments (12)**: Overview of all lab modules.
- **🟢 Simple Track (Exp 1 - 6)**: Fundamental syntax, built-ins, and core mechanisms.
- **🟣 Complex Track (Exp 1 - 6)**: Advanced architectures, databases, REST APIs, JWT tokens, and React SPAs.
- **⚖️ Side-by-Side Comparison Matrix**: A dedicated comparison view analyzing Experiment 1 through 6 side-by-side to understand the architectural leap between Simple and Complex.

### 2. 💻 Code Reader IDE
- **Syntax Highlighting**: Powered by PrismJS with dark and light themes.
- **Multi-File Switcher**: For multi-file experiments (e.g. `StudentCRUD.java` & `working.sql`, or XML schema files `bookstore.dtd`, `bookstore.xml`, `bookstore.xsd`, `validate.py`), easily switch between tabs.
- **Code Tools**:
  - 📋 **Copy Code**: One-click copy with toast confirmation.
  - 💾 **Download File**: Download individual source files.
  - ↩️ **Wrap Lines**: Toggle word wrap for long code lines.
  - 🔤 **Font Sizer**: Zoom in (`A+`) or zoom out (`A-`) for comfortable reading.

### 3. 🧪 Live Previews & Interactive Simulators
- **HTML/CSS/JS Experiments** (`shopping.html`, `weather.html`, `register.html`, Simple `index.html`): Embedded interactive sandbox iframe with **Desktop**, **Tablet**, and **Mobile (375px)** responsive viewport toggles!
- **Interactive Backend Simulators**:
  - **Exp 3 Simple (ES6)**: Run arrow functions, callbacks, Promises, and async/await in a live browser console.
  - **Exp 3 Complex (Java JDBC)**: Interactive MySQL terminal simulator for Insert, Display, Update, and Delete operations!
  - **Exp 4 Simple (XML Validation)**: Interactive Python lxml DTD & XSD validator simulator.
  - **Exp 4 Complex (Express REST API)**: Interactive REST API playground to test `GET /students`, `POST`, `PUT`, and `DELETE` requests returning formatted JSON.
  - **Exp 5 Simple (Sessions & Cookies)**: Interactive session counter simulator.
  - **Exp 5 Complex (JWT Authentication)**: Interactive login tester generating real JWT tokens and verifying Bearer authorization against protected `/profile` route!
  - **Exp 6 Simple (Node Core Modules)**: System introspection & EventEmitter trigger.
  - **Exp 6 Complex (React Router SPA)**: Simulated React route navigation without page reloads!

### 4. 📚 Study & Lab Exam Support
- **Aim & Objectives**: Clear problem statements for each experiment.
- **Core Concepts**: Key theoretical concepts explained.
- **Step-by-Step Walkthrough**: Explanations of line ranges and logic flow.
- **How to Run**: Ready-to-copy terminal commands for Windows PowerShell and Command Prompt.
- **💡 Viva Voce Exam Prep**: Accordion cards containing frequent viva questions and concise answers for external lab exams.
- **✅ Revision Tracker**: Check "Mark as Revised" on each experiment; your progress is automatically saved in `localStorage`.
- **🔍 Instant Search**: Press `Ctrl + K` or `/` to search across all experiment titles, tags, code snippets, and topics in real-time.

---

## 📋 Experiments Overview

| Exp # | 🟢 Simple Level | 🟣 Complex Level | Key Technology |
|---|---|---|---|
| **Exp 1** | Responsive Landing Page (`index.html`) | E-Commerce Store & Shopping Cart (`shopping.html`) | Bootstrap 5 vs Pure CSS Grid & Flexbox |
| **Exp 2** | Client-Side Form Validation (`register.html`) | Dynamic Weather Dashboard (`weather.html`) | Synchronous DOM Validation vs Async Fetch API + Chart.js |
| **Exp 3** | Modern ES6+ JavaScript (`es6.js`) | Java JDBC MySQL Student CRUD (`StudentCRUD.java`) | Arrow Fns & Promises vs Enterprise Relational Database CRUD |
| **Exp 4** | XML Validation with Python (`validate.py`) | Express.js RESTful CRUD Service (`server.js`) | DTD & XSD Schemas vs JSON REST Microservices |
| **Exp 5** | Express Sessions & Cookies (`server.js`) | Stateless JWT Authentication (`server.js`) | Stateful Memory Sessions vs Scalable Cryptographic Tokens |
| **Exp 6** | Node.js Core Modules (`server.js`) | React SPA with React Router (`App.jsx`) | Low-level HTTP & Events vs Modern Component SPA Architecture |

---

## 🛠️ Maintenance & Updating Code

If you ever edit or add code to any of your experiment folders (`simple/` or `complex/`), simply run:
\`\`\`powershell
node build.js
\`\`\`
This will automatically refresh `data.js` so your website reflects the latest code changes instantly!
