var express = require('express')
var app = express();
var crypto = require('crypto');

var emails = {
    "1234": {
        "from": "Charlie Crews",
        "subject": "I'm back",
        "preview": "After been 12 years in prison...",
        "starred": "true"
    },
    "2345": {
        "from": "Jack Gallagher",
        "subject": "The psiquiatric revolution",
        "preview": "I want to change the way this hospital...",
        "starred": "false"
    },
    "3456": {
        "from": "Richard Castle",
        "subject": "Niki Heat",
        "preview": "The detective Niki Heat....",
        "starred": "true"
    },
    "4567": {
        "from": "Sheldon Cooper",
        "subject": "I'm going to win the Noble price",
        "preview": "Dear poor minds, probably you...",
        "starred": "false"
    }

};

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    response.send("Hello world");
});

app.get('/email/new', function (request, response) {
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

app.get('/email/:id', function (request, response) {
    var email = emails[request.params.id] ? emails[request.params.id] : createEmail();
    email.email = email.preview + 'Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in, eum liber hendrerit an. Qui ut wisi vocibus suscipiantur, quo dicit ridens inciderint id. Quo mundi lobortis reformidans eu, legimus senserit definiebas an eos. Eu sit tincidunt incorrupte definitionem, vis mutat affert percipit cu, eirmod consectetuer signiferumque eu per. In usu latine equidem dolores. Quo no falli viris intellegam, ut fugit veritus placerat per. ' +
    'Ius id vidit volumus mandamus, vide veritus democritum te nec, ei eos debet libris consulatu. No mei ferri graeco dicunt, ad cum veri accommodare. Sed at malis omnesque delicata, usu et iusto zzril meliore. Dicunt maiorum eloquentiam cum cu, sit summo dolor essent te. Ne quodsi nusquam legendos has, ea dicit voluptua eloquentiam pro, ad sit quas qualisque. Eos vocibus deserunt quaestio ei. ' +
    'Blandit incorrupte quaerendum in quo, nibh impedit id vis, vel no nullam semper audiam. Ei populo graeci consulatu mei, has ea stet modus phaedrum. Inani oblique ne has, duo et veritus detraxit. Tota ludus oratio ea mel, offendit persequeris ei vim. Eos dicat oratio partem ut, id cum ignota senserit intellegat. Sit inani ubique graecis ad, quando graecis liberavisse et cum, dicit option eruditi at duo. Homero salutatus suscipiantur eum id, tamquam voluptaria expetendis ad sed, nobis feugiat similique usu ex. ' +
    'Eum hinc argumentum te, no sit percipit adversarium, ne qui feugiat persecuti. Odio omnes scripserit ad est, ut vidit lorem maiestatis his, putent mandamus gloriatur ne pro. Oratio iriure rationibus ne his, ad est corrumpit splendide. Ad duo appareat moderatius, ei falli tollit denique eos. Dicant evertitur mei in, ne his deserunt perpetua sententiae, ea sea omnes similique vituperatoribus. Ex mel errem intellegebat comprehensam, vel ad tantas antiopam delicatissimi, tota ferri affert eu nec. Legere expetenda pertinacia ne pro, et pro impetus persius assueverit.';
    response.send(email);
});

app.post('/email', function (request, response) {
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
        started: false
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

/** Sync */
function randomAsciiString(length) {
    return randomString(length,
        'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789');
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
