// Making the appropriate connections to express, path, and file system.
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


