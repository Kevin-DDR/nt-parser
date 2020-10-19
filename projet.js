const readline = require('readline');
fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Phrase{
  constructor(sujet="", predicat="", objet= "") {
    this.sujet = sujet;
    this.predicat = predicat;
    this.objet = objet;
  }
}


function openFile(path, requete = ""){
  console.log(path);
  fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log("Ouverture réussie");

    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
      let phrase = new Phrase();
      let type = 0;
      words = line.split(" ");
      words.forEach((word) => {
        if( word.match("^<.*>$")){
          switch(type){
            case 0:
              phrase.sujet = word;
              type++;
            break;
            case 1:
              phrase.predicat = word;
              type++;
            break;
            case 2:
              phrase.objet = word;
              type = 0;
            break;
          }
        }
      });
    });
  });
}

openFile(process.argv[2]);
