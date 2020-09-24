module.exports = {
  servers: {
    one: {
      host: 'YOUR-HOST.com',
      username: 'USERNAME',
      pem: 'pem PATH'
      // password: 'server-password' // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'APP-NAME',
    path: '../',
    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      // TODO: Change to your app's url
      ROOT_URL: 'app.com',
      PORT: 80,
      MONGO_URL: 'mongodb://mongodb:27017/DB-NAME',
    },
    docker: {
      image: 'abernix/meteord:node-8.4.0-base',
    },
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};