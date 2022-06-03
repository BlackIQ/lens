const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const linkModule = new Scheme({
    link: {
        type: String,
        required: true
    },
    lensLink: {
        type: String,
        required: true
    },
    views: {
        type: Int32Array,
        required: true
    }
}, {
    timestamps: true
});

const Link = mongoose.model('link', linkModule);

module.exports = Link;