const BotCMSUsersMiddleware = require('./botcmsusersmiddleware');

class BotCMSUsers {

    static exportConfig = {
        ext: {
            configs: {
                handlers: {
                    BotHandler: {
                        botcms: {
                            middlewareMethods: [
                                BotCMSUsersMiddleware,
                                // new BotCMSUsersMiddleware(),
                            ],
                        },
                    },
                    DBHandler: {
                        models: {
                            BotCMSUser: require('./model/botcmsuser')
                        }
                    }
                }
            },
        }
    };

    config = {};
    defaults = {};

    constructor (App, config) {
        this.App = App;
        this.MT = this.App.MT;
        this.loadConfig(config);
    }

    async loadConfig (config) {
        this.config = this.MT.mergeRecursive(this.defaults, this.config, config);
    }

}

module.exports = BotCMSUsers;