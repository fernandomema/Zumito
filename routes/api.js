const express = require("express");
const { body, validationResult } = require('express-validator');
const jwt = require('express-jwt');
const { paginate } = require('@modules/utils/utils');

var app = express();

app.get(
    '/emojis',
    function (req, res) {
        let emojis = [];
        if (req.query.page && req.query.size) {
            emojis = paginate(Array.from(discordClient.emojis.cache.values()), req.query.size, req.query.page)
        } else {
            emojis = discordClient.emojis.cache;
        }
        return res.status(200).json(emojis);
    }
)

app.get(
    '/guilds/count',
    function (req, res) {
        res.set('Cache-control', `public, max-age=86400`); // 24h cache
        return res.status(200).json({
            count: discordClient.guilds.cache.size
        });
    }
)

app.get(
    '/guild/config', 
    jwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256'] }),
    body('guild').custom(value => {
        return value !== undefined;
    }),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        return res.status(200).json({
            test: 'test'
        });
    }
)

module.exports = app;