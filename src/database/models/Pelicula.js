module.exports = (sequelize, dataType) => {
	let cols = {
		id: { type: dataType.INTEGER, primaryKey: true, autoIncrement: true },
		created_at: {
			type: dataType.DATE,
			allowNull: true,
		},
		updated_at: {
			type: dataType.DATE,
			allowNull: true,
		},
		title: {
			type: dataType.STRING,
			allowNull: false,
		},
		rating: {
			type: dataType.DECIMAL,
			allowNull: true,
		},
		awards: {
			type: dataType.INTEGER,
			allowNull: true,
		},
		release_date: {
			type: dataType.DATE,
			allowNull: true,
		},
		length: {
			type: dataType.INTEGER,
			allowNull: true,
		},
		genre_id: {
			type: dataType.INTEGER,
			allowNull: true,
		},
	};

	let config = {
		tableName: 'movies',
		timestamps: false,
	};

	const Pelicula = sequelize.define('Pelicula', cols, config);

	Pelicula.associate = function (modelos) {
		Pelicula.belongsTo(modelos.Genero, {
			as: 'genero',
			foreignKey: 'genre_id',
		}),
			Pelicula.belongsToMany(modelos.Actores, {
				as: 'actores',
				through: 'actor_movie',
				foreignKey: 'movie_id',
				otherKey: 'actor_id',
				timestamps: false,
			});
	};

	return Pelicula;
};
