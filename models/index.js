const Sequelize = require('sequelize');
//const db = new Sequelize('postgres://localhost:5432/wikistack');

const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            const title = this.getDataValue('title');
            return '/wiki/' + title;
        },
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    // date wasn't originally on the table ... maybe it will need to be removed later
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: true
        }
    }

});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z]+$",'i'] //only  allows letters
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Page.beforeValidate((pageInstance, options) => {
    console.log("ARE WE VALIDATING?? ", pageInstance)
    pageInstance.urlTitle = pageInstance.title.replace(/\s+/g, '_').replace(/\W/g, '');
})

module.exports = {
  db,
  Page: Page,
  User: User
};
