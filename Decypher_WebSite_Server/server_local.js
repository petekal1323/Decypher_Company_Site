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

app.post('/contact_form_send', (req, res) => {
    nodejsNodemailerOutlook.sendEmail({
        auth: {
            user: 'info@decyphercorp.com', //TODO: Please replace with your own email address
            pass: '' //TODO: Please replace with your own email password
        },
        secure: false,
        from: 'info@decyphercorp.com', //TODO: Please replace with your own email address
        to: 'info@decyphercorp.com', //TODO: Please replace with your own email address
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

app.post('/case_studies_form_send', (req, res) => {
    nodejsNodemailerOutlook.sendEmail({
        auth: {
            user: 'info@decyphercorp.com', //TODO: Please replace with your own email address
            pass: '' //TODO: Please replace with your own email password
        },
        secure: false,
        from: 'info@decyphercorp.com', //TODO: Please replace with your own email address
        to: 'info@decyphercorp.com', //TODO: Please replace with your own email address
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


app.listen(8080);
