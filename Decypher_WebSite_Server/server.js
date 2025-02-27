const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const secretManagerServiceClient = new SecretManagerServiceClient();
const process = require('process');

const get_secrets = async () => {
    let config = {};
    try {
        let [accessResponse] = [];
        [accessResponse] = await secretManagerServiceClient.accessSecretVersion({
            name: "projects/" + process.env.PROJECT_NAME + "/secrets/nodejs_email_sales/versions/latest"
        });
        config = JSON.parse(accessResponse.payload.data.toString("utf8"));
        return config;
    } catch(error) {
        console.error("server.js", "get_secrets", error);
        return error;
    }
};

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const serveStatic = require('serve-static');
const nodejsNodemailerOutlook = require('nodejs-nodemailer-outlook');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use('/js', express.static('www/js'), serveStatic('www/js', {'icons': true}));
app.use('/css', express.static('www/css'), serveStatic('www/css', {'icons': true}));
app.use('/images', express.static('www/images'), serveStatic('www/images', {'icons': true}));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('www/index.html'));
});

app.use('/index.html', function(req, res) {
    res.redirect('/');
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve('www/about.html'));
});

app.get('/services.html', (req, res) => {
    res.sendFile(path.resolve('www/services.html'));
});

app.get('/case_studies.html', (req, res) => {
    res.sendFile(path.resolve('www/case_studies.html'));
});


app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve('www/contact.html'));
});

get_secrets().then((config) => {
    app.post('/contact_form_send', (req, res) => {
        nodejsNodemailerOutlook.sendEmail({
            auth: {
                user: config["email_user"],
                pass: config["email_pass"]
            },
            secure: false,
            from: config["email_user"],
            to: config["email_user"],
            subject: 'New Contact Info',
            text: req.body["first_name"] + " " + req.body["last_name"] + "\nCompany: " + req.body["company"] + "\nEmail: " + req.body["email_address"] + "\nPhone: " + req.body["phone_number"] + "\nMessage:\n" + req.body["message"],
            onError: (e) => {
                // console.log(e);
            },
            onSuccess: (i) => {
                // console.log(i);
            }
        });
    });
}, (error) => {
    console.error("server.js", "get_secrets callback", error);
});

get_secrets().then((config) => {
    app.post('/case_studies_form_send', (req, res) => {
        nodejsNodemailerOutlook.sendEmail({
            auth: {
                user: config["email_user"],
                pass: config["email_pass"]
            },
            secure: false,
            from: config["email_user"],
            to: config["email_user"],
            subject: 'Case Study Info',
            text: req.body["first_name"] + " " + req.body["last_name"] + "\nCompany: " + req.body["company"] + "\nEmail: " + req.body["email_address"] + "\nPhone: " + req.body["phone_number"] + "\nMessage:\n" + req.body["message"],
            onError: (e) => {
                // console.log(e);
            },
            onSuccess: (i) => {
                // console.log(i);
            }
        });
    });
}, (error) => {
    console.error("server.js", "get_secrets callback", error);
});

app.listen(8080);
