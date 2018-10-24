module.exports = {
	PORT: process.env.PORT || 8080,
	DB_URL: process.env.DB_URL || 'mongodb://localhost/grillbooking',
	JWT_SECRET: process.env.JWT_SECRET || '123abc!@#',
	JWT_EXPIRY: process.env.JWT_EXPIRY || '1d'
};