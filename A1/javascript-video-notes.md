### Video 1
- Kurssin esittely.
- Opettajien esittäytyminen.


### Video 2
- Javascriptiä alunperin käytettiin nettisivujen elementtien kanssa.
- Muistuttaa Javaa, mutta ei suoraan mitään tekemistä sen kanssa.

### Video 3
- Javascript koodi kannattaa kirjoittaa ulkoisessa .js tiedostossa.
- node.js on serveripuolen javascript versio.

### Video 4
- Javascriptiä kannattaa kirjoittaa vscodessa
- VS Codeen saa käteviä extensioneja, kuten ESLint.

### Video 5
- VS coden asennus.
- Node.js asennus.

### Video 6
- console.log(); printtaa konsoliin 
- %s tai ${} avulla voi printata muuttujia console.log() funktiossa.

### Video 7
- Kommentti kirjoitetaan yhdelle riville // avulla 
- Komentti kirjoitetaan usealle riville /**/ avulla

### Video 8
- Kommentissa voi käyttää //TODO, muistuttamaan asioita, mitä pitää tehdä
- Kommentoinnilla voi kommentoida esim funktiota, joita ei sillä hetkellä halua suorittaa, mutta ei halua poistaakkaan.

### Video 9
- Javascriptissä voi olla 3 erilaista muuttujaa, var, let, const
- var vanha tapa, let uusi tapa, muuttuvalle muuttujalle, const muuttujalle jota ei voi muuttaa.

### Video 10
- Miten käytetään var, let ja const
- Ei voi käyttää muuttujia, ennenkuin ne on alustettu tai saadaan runtime error.

### Video 11
- String muuttujissa("") toimii myös + operaatio
- +-operaatiota käyttäessä pitää olla tarkkana onko kyseessä string tyyppinen vai integer tyyppinen muuttuja. 

### Video 12
- Välit pitää lisätä itse string tyyppiseen muuttujaan 
- console.log voi yhdistellä string ja/tai integer muuttujia +-operaatiolla.

### Video 13
- +-operaation käyttöä console.log() funktiossa voi välttää käyttämällä ${} 

### Video 14
-  Voidaan käyttää **`${}`** esim let str = "fun"; console.log(`${str}`);

### Video 15
- Javascript on heikosti tyypitetty kieli, eli muuttujien tyyppi voi muuttua ajon aikana.
- Javascript ei erottele integer tai float.
- Typeof kertoo mitä tyyppiä kyseinen muuttuja edustaa
- Instancseof voi testata onko kyseinen muuttuja kyseistä tyyppiä

### Video 16
- Miltä typeof näyttää käytännössä 
- Miltä instanceof näyttää käytännössä.
- Esim const b = true; console.log(typeof b); printtaa "boolean"

### Video 17
- Javascriptissä voi tehdä matematiikkaa +, -, / , *, %, ++ ja -- avulla.
- % on jakojäännös
- -- ja ++ muuttaa lukua yhdellä eri suuntiin.
- Javascriptissä valmiita matematiikka funktiota kuten Math.squrt(5);

### Video 18
- let num1 = 100; console.log(num1 + 25); printtaa 125.
- let num1 = 100; console.log(num1 - 100); printtaa 0;

### Video 19
- numeroiden ja string muuttujien vaihtaminen tapahtuu funktiolla: parseInt(), parseFloat() tai toString() avulla.

### Video 20
- let str = "42"; let num1 = parseInt(str); muuttaa num1 olemaan integer tyyppinen luku 42.

### Video 21
- Välttääkseen ajoakaisia ongelmia kannattaa käyttää try, catch ja finally.
- try blokkaa koodin joka saattaa "throw an exception"
- catch lohko suoritetaan jos vastaanotetaan exception
- finally vapaaehtoinen, joka suoritetaan joko try tai catch blockin jälkeen.

### Video 22
- Demotaan try, catch, throw käyttöä.

### Video 23
- Date-olion avulla luodaan päivämääriä.
- const now = new Date();


### Video 24
- Date-oliolla valmitaa funktiota kuten, setMonth(), setYear(), setDate(), setHours(), setMinutes(), setSeconds(), getDay().

### Video 25
- Muuttujia voidaan verrata operaatiolla <, >, >= ,<=, ==, ===, !=, !==

### Video 26
- ==-operaatio testaa arvoa
- ===-operaatio testaa arvoa, sekä tyyppiä.

### Video 27
- !-operaatio toimii negaationa
- string tyypit on case sensitive
- &&-operaatio toimii AND operaationa
- ||-operaatio toimii OR operaationa

### Video 28
- switch-rakenteessa on eri case tyypin, jotka annetaan parametreina switch() sulkujen sisälle. Sen lisäksi on default case, joka suoritetaan jos mikään muu case ei vastaa sitä.

### Video 29
- Arrary on lista arvoja.
- Jokaisella Arrayn arvolla on oma indeksi

### Video 30
- Array voidaan luoda let arr = []; 
- Array voidaan luoda let arr = Array(5);  

### Video 31
- Arrayhin voi lisätä arvoja luomisen aikana tai luomisen jälkeen.
- Arrayn indeksi alkaa aina 0. 


### Video 32
- Arrayhin voi asettaa tuottetia: let arr = ["A", "B", "C"];
- Arrayhin voi asettaa tuotteita: let arr = Array(3); arr[0] = "A"; arr[1] = "B"; arr[2] = "C";

### Video 33
- Arrayssa valmiita funktiota, kuten push(), pop(), shift(), unshift()


### Video 34
- pop() poistaa viimeisimmän arvon
- push() lisää uuden arvon
- shift() poistaa viimeisen arvon ja palauttaa sen
- unshift() lisää uuden arvon eteen ja palauttaa pituuden.

### Video 35
- Loopin avulla voi toistaa osan koodia toistuvasti
- käytetään while, for tai for of

### Video 36
- while() sulkeisiin lisätään ehto kauan looppi pyörii
- for(let i = 0; "ehto"; i++) ehdoksi yleensä asetetaan jokin ehto i kanssa.
- for(let x of arr) voidaan käyttää kun on array arr josta halutaan käydä läpi kaikki arvot x.

### Video 37
- Funktio on oma scope koodissa, joka voi ottaa syötteen, sekä tekee jotain ja voi palauttaa arvoja.
- Funktiot mahdollistaa uudelleenkäytettävyyttä ja parantaa ylläpidettävyyttä
- funktion parametrit toimii inputtina ja tulee funktion () sisälle.
- return statement toimii tapana palauttaa funktiosta arvoja.

### Video 38
-  funktio määritellään käyttämällä "function" keywordia ja lisätään perään funktion nimi ja sulkeet
-  funtio kutstuaan kirjoittamalla funktion nimi ja sulkeet ja tarvittaessa parametrit.

### Video 39
- Nuolifunktio täytyy asettaa muuttujaan tai käyttää heti.
- Nuolifunktio muuttaa "this" kontekstia funktion sisällä.
- Nuolifunktio Vähentää kirjoittamista 

### Video 40
- Demonstroidaan nuolifunktion kirjoittamista ja käyttöä.
- const add = (a,b) => a + b; console.log(add(2,3)); printtaa 5.

### Video 41
- JSON = JavaScript Object Notation tiedosto on tapa esittää ja siirtää dataa tekstitiedostona.
- Arvot kirjoitetaan tiedostossa {} merkkien sisälle erotellen pilkuilla ja voidaan taulukoida niitä kirjoittamalla ne [] merkkien sisälle.

### Video 42
- Teksti voidaan muuttaa JSON objektiksi JSON.parse avulla
- Muutetaan javascriptin taulukko json tekstiksi JSON.stringify avulla.

### Video 43
- objektit voi sisältää muuttujia, että funktiota
- objektin voi luoda constructorin avulla 
- this keyword viittaa kyseisen objektin ominaisuuksiin. 

### Video 44
- Näytetään miten objektit auttavat mallintamaan tietoa ja siihen littyviä toimintoja
- demotaan this keywordin käyttöä

### Video 45
- setTimeout() funktion avulla voidaan suorittaa koodia viivellä, ilman että jäädään jumiin.
- Promises on tapa käsitellä pitkiä operaatiota, kuten tietokantakutsuja.

### Video 46
- PromiseTimeout("viive").then avulla voidaan käsitellä toimintoja, jotka suoritetaan kun viive on kulunut.
- .then() avulla voidaan tehdä useita asynkronisia toimintoja järjestyksessä.

### Video 47
- async/await on selkeämpi tapa toteuttaa PromiseTimeout().then putkitus.
- async funktion sisällä await pysäyttää funktion suorittamisen siihen asti, että promise on suoritettu.
- Eli await mahdollistaa koodin pysäyttämisen kyseisen funktion sisällä ja muuten koodin jatkamisen normaalisti. 

### Video 48
- Videolla demotaan asyncin ja await käyttöä
- Näytetään miksi async funktiota kutsuessa pitää olla await edessä.

### Video  49
-  Paketit on valmiita koodikomponentteja/kirjastoja, joita joku toinen on kirjoittanut ja joita voidaan käyttää omassa koodissa.
- Paketit on riippuvuuksia koodissa.
- Paketit mahdollistaa vähemmän koodin kirjoittamisen

### Video 50
- npm init -Y luo package.json filen.
- npm avulla voi ladata paketteja.

### Video 51
- Ohjeistetaan, että opittua tietoa kannattaa alkaa käyttämään käytännössä
