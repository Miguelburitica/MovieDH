module.exports = (sequelize, dataType) => {
	let cols = {
		id: {
			type: dataType.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		created_at: {
			type: dataType.DATE,
		},
		updated_at: {
			type: dataType.DATE,
		},
		name: {
			type: dataType.STRING,
		},
		ranking: {
			type: dataType.INTEGER,
		},
		active: {
			type: dataType.INTEGER,
		},
	};

	let config = {
		tableName: 'genres',
		timestamps: false,
	};

	const Genero = sequelize.define('Genero', cols, config);

	Genero.associate = function (modelos) {
		Genero.hasMany(modelos.Pelicula, {
			as: 'peliculas',
			foreignKey: 'genre_id',
		});
	};

	return Genero;
};
