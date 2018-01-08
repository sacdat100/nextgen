var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());

app.get('/', function(req, res){
    console.log(req.body);
    res.send("Hello world!");
});

app.post('/public/login', function(req, res){
    console.log("In /public/login" + req.body);
    res.send( {"greeting" : "Hello world"} );
});

app.post('/public/getEncParam', function(req, res){
    console.log("in /public/getEncParam" + req.body);

    var data = {
        'rsa_exp':'0003',
        'rsa_mod':
        'D423D0B8F981DCC4E904EAC3E4086970CEC123DEC771D887221CDF81BF68BED97FED65175BBD9C9ED5EDECB28CF268B6C3CF247746C27E6F0EC80663CF011193A9DBE288A5C9D007181504D1B39B0159C519FAC7A8EF3C0BD23AACCFF6C3E2C7DA6CF37C36DBE73C8634D5C40ADD02AF58BF5DAFEE4B6E1DC07B6491BF91566F66DA290DC97EFFF3B70641B3452E6CC9642B05119F8B4B869974F77E3E5E199FAE74BE10CD09D28AB67CFCE768D7E5EF96F509A3DAE5A4C3AAB676ECC160BE472F6EFFFC7C72716972FD70AF21FCCB01E5F6432D54246DAE67947B354E4177AAB992147B20FC178DE4821447A0CF0B1751D872E0F3CC583A8A88E9DA35689975',
        'randomNumber':'8201EECB25B8B227CCAA540F7E402EB6',
        'sessionId':'0001H_cDEStzFWEMQYeBuy3OAfakFxm4G-44C7Zh8sc8ICsRK59rNpEARO62rdl2DoarYrOT_A7rJxyzVURSyhUbPXUlyNM'
    }
    res.send( data );
});

app.listen(3000);