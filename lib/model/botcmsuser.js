module.exports = (Sequelize) => {
    return {
        user_id: Sequelize.INTEGER,
        username: Sequelize.STRING,
        full_name: Sequelize.STRING,
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        bridge: Sequelize.STRING(20),
        driver: Sequelize.STRING,
    };
};