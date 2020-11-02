const readline = require('readline');
fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Requete{
  constructor(requete) {
    let words = requete.split(" ");
    this.sujet = words[0]
    this.predicat = words[1]
    this.objet = words[2]

    if(words[0].match("^\\?.*")){
      console.log("Sujet est une wildcard");
      this.wildSujet = true;
      if(words[0].match("^\\?@.*")){
        console.log("Sujet a une annotation")
        this.hasAnnoSujet = true;
        let tmp = words[0].split("@")
        this.annoSujet = tmp[1]
      }
    }

    if(words[1].match("^\\?.*")){
      console.log("Predicat est une wildcard");
      this.wildPredicat = true;
      if(words[1].match("^\\?@.*")){
        console.log("Predicat a une annotation")
        this.hasAnnoPredicat = true;
        let tmp = words[1].split("@")
        this.annoPredicat = tmp[1]
      }
    }

    if(words[2].match("^\\?.*")){
      console.log("Objet est une wildcard");
      this.wildObjet = true;
      if(words[2].match("^\\?@.*")){
        console.log("Objet a une annotation")
        this.hasAnnoObjet = true;
        let tmp = words[2].split("@")
        this.annoObjet = tmp[1]
      }
    }
  }
}



function openFile(path, requete){
  console.log(path);
  fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log("Ouverture réussie");

    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
      let printLine = true;
      
      words = line.split(" ");
      if (requete.wildSujet && requete.hasAnnoSujet){
        if (!words[0].match(".*@"+requete.annoSujet+"$")){
          printLine = false;
        }
      }else if(!requete.wildSujet &&  words[0] != requete.sujet){
        printLine = false;
      }


      if(printLine) console.log(line)
    });
  });
}




let requete = new Requete(process.argv[3])
console.log(requete)
openFile(process.argv[2], requete);
