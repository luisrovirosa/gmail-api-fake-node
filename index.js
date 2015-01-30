var express = require('express')
var app = express();
var crypto = require('crypto');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var emails = {
    "1234": {
        from: "Charlie Crews",
        subject: "I'm back",
        preview: "After been 12 years in prison...",
        starred: "true",
        labels: ["professional"],
        new: false
    },
    "2345": {
        from: "Jack Gallagher",
        subject: "The psychiatric revolution",
        preview: "I want to change the way this hospital...",
        starred: "false",
        labels: ["things"],
        new: false

    },
    "3456": {
        from: "Richard Castle",
        subject: "Niki Heat",
        preview: "The detective Niki Heat....",
        starred: "true",
        labels: ["professional"],
        new: false
    },
    "4567": {
        from: "Sheldon Cooper",
        subject: "I'm going to win the Noble price",
        preview: "Dear poor minds, probably you...",
        starred: "false",
        "labels": ["friends"],
        new: false
    }

};

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response, next) {
    var EOF = "<br />";
    var explanation = "The methods are:" + EOF +
        "GET <a href='/email/new'>/email/new</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> To check if there is new email" + EOF +
        "GET <a href='/email/1234'>/email/:id</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> To retrieve the email information" + EOF +
        "POST /email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> To send an email" + EOF +
        "GET <a href='/labels'>/labels</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> To retrieve the list of labels" + EOF +
        "GET <a href='/labels/professional'>/labels/&lt;name&gt;</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> To retrieve the list emails inside a label" + EOF +
        EOF + EOF +
        "The existing email id are: 1234, 2345, 3456 and 4567. If you retrieve a different id it will be generated randomly." + EOF +
        "The existing labels are: friends, professional, events and things." + EOF +

        "";

    response.send(explanation);
});

app.get('/email/new', function (request, response, next) {
    var rnd = randomIntInc(0, 10);
    var result;
    if (rnd < 5) {
        result = {};
    } else if (rnd < 8) {
        result = {
            "12121": createEmail()
        }
    } else {
        result = {
            "112233": createEmail(),
            "223344": createEmail(),
            "334455": createEmail()
        }
    }
    response.send(result);
});

function getEmail(id) {
    var email = emails[id] ? emails[id] : createEmail();
    email.email = email.preview + 'Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in, eum liber hendrerit an. Qui ut wisi vocibus suscipiantur, quo dicit ridens inciderint id. Quo mundi lobortis reformidans eu, legimus senserit definiebas an eos. Eu sit tincidunt incorrupte definitionem, vis mutat affert percipit cu, eirmod consectetuer signiferumque eu per. In usu latine equidem dolores. Quo no falli viris intellegam, ut fugit veritus placerat per. ' +
    'Ius id vidit volumus mandamus, vide veritus democritum te nec, ei eos debet libris consulatu. No mei ferri graeco dicunt, ad cum veri accommodare. Sed at malis omnesque delicata, usu et iusto zzril meliore. Dicunt maiorum eloquentiam cum cu, sit summo dolor essent te. Ne quodsi nusquam legendos has, ea dicit voluptua eloquentiam pro, ad sit quas qualisque. Eos vocibus deserunt quaestio ei. ' +
    'Blandit incorrupte quaerendum in quo, nibh impedit id vis, vel no nullam semper audiam. Ei populo graeci consulatu mei, has ea stet modus phaedrum. Inani oblique ne has, duo et veritus detraxit. Tota ludus oratio ea mel, offendit persequeris ei vim. Eos dicat oratio partem ut, id cum ignota senserit intellegat. Sit inani ubique graecis ad, quando graecis liberavisse et cum, dicit option eruditi at duo. Homero salutatus suscipiantur eum id, tamquam voluptaria expetendis ad sed, nobis feugiat similique usu ex. ' +
    'Eum hinc argumentum te, no sit percipit adversarium, ne qui feugiat persecuti. Odio omnes scripserit ad est, ut vidit lorem maiestatis his, putent mandamus gloriatur ne pro. Oratio iriure rationibus ne his, ad est corrumpit splendide. Ad duo appareat moderatius, ei falli tollit denique eos. Dicant evertitur mei in, ne his deserunt perpetua sententiae, ea sea omnes similique vituperatoribus. Ex mel errem intellegebat comprehensam, vel ad tantas antiopam delicatissimi, tota ferri affert eu nec. Legere expetenda pertinacia ne pro, et pro impetus persius assueverit.';
    return email;
}
app.get('/email/:id', function (request, response, next) {
    var email = getEmail(request.params.id);
    response.send(email);
});

app.post('/email', function (request, response, next) {
    setTimeout(function () {
        response.send("Email sent!");
        //console.log('hello world!');
    }, 2000);
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
})


function createEmail() {
    return {
        from: randomAsciiString(10) + ' ' + randomAsciiString(10),
        subject: randomAsciiString(20),
        preview: randomAsciiString(20),
        started: false,
        labels: [],
        new: true
    }
}

/** Sync */
function randomString(length, chars) {
    if (!chars) {
        throw new Error('Argument \'chars\' is undefined');
    }

    var charsLength = chars.length;
    if (charsLength > 256) {
        throw new Error('Argument \'chars\' should not have more than 256 characters'
        + ', otherwise unpredictability will be broken');
    }

    var randomBytes = crypto.randomBytes(length)
    var result = new Array(length);

    var cursor = 0;
    for (var i = 0; i < length; i++) {
        cursor += randomBytes[i];
        result[i] = chars[cursor % charsLength]
    }
    ;

    return result.join('');
}

var labels = {
    "friends": {
        unread: 0
    },
    "professional": {
        unread: 0
    },
    "events": {
        unread: 1
    },
    "things": {
        unread: 0
    }
};

var emailsInLabel = {
    "friends": [4567, 223344],
    "professional": [1234, 3456],
    "events": [223344, 123123],
    "things": [2345]
}

app.get('/labels', function (request, response, next) {
    response.send(labels);
});

app.get('/labels/:name', function (request, response, next) {
    var emailIds = emailsInLabel[request.params.name] || [];
    var emails = {};
    emailIds.forEach(function (emailId) {
        emails[emailId] = getEmail(emailId);
    });
    response.send(emails);
});


/** Sync */
function randomAsciiString(length) {
    return randomString(length,
        'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789');
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
