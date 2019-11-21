const {BaseEntity, Entity, PrimaryGeneratedColumn, Column} = require("typeorm");
/*export */ class User /*extends BaseEntity*/ {

    constructor(id, user_id, username, full_name, first_name, last_name, bridge, driver, createdon) {
        // super();
        this.id = id;
        this.user_id = user_id;
        this.username = username;
        this.full_name = full_name;
        this.first_name = first_name;
        this.last_name = last_name;
        this.bridge = bridge;
        this.driver = driver;
        this.createdon = createdon;
    }
}

module.exports = {
    User: User
};