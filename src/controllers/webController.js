// const path = require('path')

const controller = {
    getHome: function(req, res, next) {
        res.render('index', { title: 'Digital Movies' });
    }
}

module.exports = controller