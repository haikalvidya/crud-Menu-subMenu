module.exports = {
    HOST: "localhost",
    USER: "haikal",
    PASSWORD: "pass123",
    DB: "crudHomeTest",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000    
    }
}