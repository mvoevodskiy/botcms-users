const TypeORM = require('typeorm');
const { User } = require('./model/User');

class BotCMSUsersMiddleware {

    init (target) {
        return next => async () => {
            console.log('BOTCMS USERS. INIT');
            Object.defineProperty(process, 'BotCMSUsers', {
                value: this,
                writable: true,
                enumerable: true,
                configurable: true
            });
            const result = await next();

            console.log('BOTCMS USERS. DB INIT END');
            return result;
        }
    }

    initDB (target) {
        return next => async () => {
            console.log('BOTCMS USERS. DB INIT');
            console.log('BOTCMS USERS. ENTITIES', target.dbParams.entities);
            target.dbParams.entities.push(process.cwd() + '/node_modules/botcms-users/lib/entity/*.js');
            console.log('BOTCMS USERS. ENTITIES', target.dbParams.entities);
            const result = await next();

            console.log('BOTCMS USERS. DB INIT END');
            return result;
        }
    }

    successDB (target) {
        return next => () => {
            console.log('BOTCMS USERS. DB INIT SUCCESS');
            this.DB = target.DB;
            return next();
        }
    }

    failDB (target) {
        return next => error => {
            console.error('BOTCMS USERS. DB FAIL. FATAL');
            console.error(error);
            process.exit(-1);
        }
    }

    handleUpdate (target) {
        return next => async ctx => {

            new Promise(async resolve => {
                console.log('BOTCMS USER. HADNLE UPDATE. BEGIN');
                let userRepository = this.DB.getRepository('User');
                let localUser;
                let requestUserId = ctx.Message.sender.id === target.SELF_SEND ? 0 : ctx.Message.sender.id;
                if (requestUserId === 0) {
                    let selfUserInfo = await ctx.Bridge.fetchUserInfo();
                    requestUserId = selfUserInfo.id;
                }
                console.log('BOTCMS USER. HADNLE UPDATE. REQUEST USER ID: ', requestUserId);
                localUser = await userRepository.findOne({
                    user_id: requestUserId,
                    driver: ctx.Bridge.driverName,
                });
                console.log('BOTCMS USER. HADNLE UPDATE. LOCAL USER ', localUser);
                if (target.T.empty(localUser)) {
                    let userInfo = await ctx.Bridge.fetchUserInfo(requestUserId);
                    console.log(userInfo);
                    localUser = new User;
                    localUser.user_id = userInfo.id;
                    localUser.username = userInfo.username;
                    localUser.full_name = userInfo.full_name;
                    localUser.first_name = userInfo.first_name;
                    localUser.last_name = userInfo.last_name;
                    localUser.type = userInfo.type;
                    localUser.bridge = ctx.Bridge.name;
                    localUser.driver = ctx.Bridge.driverName;
                    localUser.createdon = Date.now() / 1000 | 0;
                    userRepository.save(localUser);
                }
            });
            return next(ctx);
        }
    }
}

module.exports = BotCMSUsersMiddleware;