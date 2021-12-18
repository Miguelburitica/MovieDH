const db = require('../database/models/index')

const controller = {
    list: function (req, res) {
        db.Generos.findAll()
            .then(genres =>{
                res.render('genresList', {genres})
            })
            .catch(err => {console.log(err);})
    },
    detail: function (req, res) {
        db.Generos.findByPk(req.params.id, 
            {
                include: [{association: 'peliculas'}]
            })
            .then(genre => res.render('genresDetail', {genre}))
            .catch(err => {console.log(err);})
    }
}

module.exports = controller