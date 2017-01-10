import fs from 'fs';
import { join } from 'path';
import mongoose from 'mongoose';

export default (config, callback) => {
    let models = join(__dirname, 'models');

    // Bootstrap models
    fs.readdirSync(models)
        .filter(file => ~file.search(/^[^\.].*\.js$/))
        .forEach(file => require(join(models, file)));

    // Perform connection
    let uri = 'mongodb://' + config.dbHost + '/' + config.dbName;
    let options = { server: { socketOptions: { keepAlive: 1 } } };
    let connection = mongoose.connect(uri, options).connection;

    connection
        .on('error', console.log)
        .on('disconnected', () => {
            console.log('disconnected');
        })
        .once('open', () => {
            console.log('connected to db');
        });


	callback(mongoose);
}
