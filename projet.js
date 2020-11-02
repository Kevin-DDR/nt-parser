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

    let tmp = words;
    tmp.shift();
    tmp.shift();
    this.objet = tmp.join(" ");

    if(this.sujet.match("^\\?.*")){
      this.wildSujet = true;
      if(this.sujet.match("^\\?@.*")){
        this.hasAnnoSujet = true;
        let tmp = this.sujet.split("@")
        this.annoSujet = tmp[1]
      }
    }

    if(this.predicat.match("^\\?.*")){
      this.wildPredicat = true;
      if(this.predicat.match("^\\?@.*")){
        this.hasAnnoPredicat = true;
        let tmp = this.predicat.split("@")
        this.annoPredicat = tmp[1]
      }
    }

    if(this.objet.match("^\\?.*")){
      this.wildObjet = true;
      if(this.objet.match("^\\?@.*")){
        this.hasAnnoObjet = true;
        let tmp = this.objet.split("@")
        this.annoObjet = tmp[1]
      }
    }
  }
}

function openFile(path, requete){
  fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let compteur = 0;

    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
      if(line.trim() != ""){
        let printLine = true;

        words = line.split(" ");

        let sujet = words[0]
        let predicat = words[1]
        
        tmp = words;
        tmp.shift();
        tmp.shift();
        tmp.pop();
        let objet = tmp.join(" ");


        if (requete.wildSujet && requete.hasAnnoSujet){
          if (!sujet.match(".*@"+requete.annoSujet+"$")){
            printLine = false;
          }
        }else if(!requete.wildSujet &&  sujet != requete.sujet){
          printLine = false;
        }

        if (requete.wildPredicat && requete.hasAnnoPredicat){
          if (!predicat.match(".*@"+requete.annoPredicat+"$")){
            printLine = false;
          }
        }else if(!requete.wildPredicat &&  predicat != requete.predicat){
          printLine = false;
        }

        if (requete.wildObjet && requete.hasAnnoObjet){
          if (!objet.match(".*@"+requete.annoObjet+"$")){
            printLine = false;
          }
        }else if(!requete.wildObjet &&  objet != requete.objet){
          printLine = false;
        }


        if(printLine){
          console.log(line)
          compteur++;
        } 
      }
    });
    console.error(compteur)
  });
}




let requete = new Requete(process.argv[3])
openFile(process.argv[2], requete);

