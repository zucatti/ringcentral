require('dotenv').config();
const SDK = require('@ringcentral/sdk').SDK;

RINGCENTRAL_CLIENTID = process.env.RINGCENTRAL_CLIENTID;
RINGCENTRAL_CLIENTSECRET = process.env.RINGCENTRAL_CLIENTSECRET;
RINGCENTRAL_SERVER = 'https://platform.ringcentral.com';

RINGCENTRAL_USERNAME = process.env.RINGCENTRAL_USERNAME;
RINGCENTRAL_PASSWORD = process.env.RINGCENTRAL_PASSWORD;
RINGCENTRAL_EXTENSION = process.env.RINGCENTRAL_EXTENSION;

var rcsdk = new SDK({
    server: RINGCENTRAL_SERVER,
    clientId: RINGCENTRAL_CLIENTID,
    clientSecret: RINGCENTRAL_CLIENTSECRET,
});
var platform = rcsdk.platform();
platform
    .login({
        username: RINGCENTRAL_USERNAME,
        password: RINGCENTRAL_PASSWORD,
        extension: RINGCENTRAL_EXTENSION,
    })
    .then(function(resp) {
        platform
            .post('/rcvideo/v1/bridges', {
                name: 'Test Meeting',
                allowJoinBeforeHost: true,
                muteAudio: false,
                muteVideo: true,
            })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(json) {
                console.log('Start Your Meeting: ' + json.joinUri);
            });
    });