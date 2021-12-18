module.exports = (sequelize, dataType) => {
    let cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: dataType.DATE
        },
        updated_at: {
            type: dataType.DATE
        },
        first_name: {
            type: dataType.STRING
        },
        last_name: {
            type: dataType.STRING
        },
        rating: {
            type: dataType.DECIMAL
        },
        favorite_movie_id: {
            type: dataType.INTEGER
        }
    }

    let config = {
        tableName: 'actors',
        timestamps: false,
    }
    
    const Actor = sequelize.define('Actores', cols, config)

    Actor.associate = function(modelos){
        Actor.belongsToMany(modelos.Pelicula, {
            as: "peliculas",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })
    }
    
    return Actor;
    
}