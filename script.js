/* Basic Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body Styling */
body {
    background-color: #F5E8C7; /* Parchment beige */
    color: #333;
    font-family: 'Cinzel', serif;
    text-align: center;
    line-height: 1.6;
}

/* Header */
header {
    background-color: #333;
    padding: 20px;
    color: #FFD700; /* Gold */
}
header h1 {
    font-size: 2.5em;
    text-shadow: 2px 2px 4px #000;
}
header img {
    width: 100px;
    margin-top: 10px;
    transition: transform 0.3s ease; /* For JS animation */
}
header p {
    font-size: 1.2em;
    font-style: italic;
}

/* Sections */
section {
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
}
h2 {
    color: #FFD700;
    font-size: 1.8em;
    margin-bottom: 15px;
    text-shadow: 1px 1px 2px #000;
}
p, li {
    font-size: 1.1em;
}
ul {
    list-style: none;
    text-align: left;
    display: inline-block;
}
a {
    color: #FFD700;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}

/* Meme Gallery */
.gallery img {
    width: 200px;
    margin: 10px;
    border: 3px solid #333;
}

/* Footer */
footer {
    background-color: #333;
    color: #FFD700;
    padding: 15px;
    font-size: 0.9em;
    position: fixed;
    bottom: 0;
    width: 100%;
}
