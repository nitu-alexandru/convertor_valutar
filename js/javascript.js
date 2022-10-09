function schimba_bani(){
    var input_valoare_in_lei = document.getElementById('val_lei').value;
    var input_curs_valutar = document.getElementById('curs_valutar').value;
    var v_d = v_din; 
    var v_i = v_in;

    var numaraZecimalele = function(valoare){
        const numar_la_string = String(valoare);
        if(numar_la_string.includes('.')){
            return numar_la_string.split('.')[1].length;
        }
        return 0;
    }

    const spatiu_alb = new RegExp(/\s/);
    const tag_script = new RegExp('<script>');
    const tag_deschidere = new RegExp('<');
    const tag_inchidere = new RegExp('>');


    if (input_valoare_in_lei == ""){
        var id_Err = 1;
        creeaza_mesaj_eroare(id_Err);           
    }else if(input_curs_valutar == ""){
        var id_Err = 2;
        creeaza_mesaj_eroare(id_Err);    
    }else if(spatiu_alb.test(input_valoare_in_lei)){
        var id_Err = 3;
        creeaza_mesaj_eroare(id_Err); 
    }else if(spatiu_alb.test(input_curs_valutar)){
        var id_Err = 4;
        creeaza_mesaj_eroare(id_Err);
    }else if(tag_script.test(input_valoare_in_lei)){
        var id_Err = 5;
        creeaza_mesaj_eroare(id_Err);
    }else if(tag_script.test(input_curs_valutar)){
        var id_Err = 6;
        creeaza_mesaj_eroare(id_Err);
    }else if(tag_deschidere.test(input_valoare_in_lei)){
        var id_Err = 7;
        creeaza_mesaj_eroare(id_Err);
    }else if(tag_deschidere.test(input_curs_valutar)){
        var id_Err = 8;
        creeaza_mesaj_eroare(id_Err);
    }else if(tag_inchidere.test(input_valoare_in_lei)){
        var id_Err = 9;
        creeaza_mesaj_eroare(id_Err);
    }else if(tag_inchidere.test(input_curs_valutar)){
        var id_Err = 10;
        creeaza_mesaj_eroare(id_Err);
    }else if(Number.isNaN(Number(input_valoare_in_lei))){
        var id_Err = 11;
        creeaza_mesaj_eroare(id_Err);
    }else if(Number.isNaN(Number(input_curs_valutar))){
        var id_Err = 12;
        creeaza_mesaj_eroare(id_Err);
    }else if(numaraZecimalele(input_valoare_in_lei) > 2){
        var id_Err = 13;
        creeaza_mesaj_eroare(id_Err);
    }else if(numaraZecimalele(input_curs_valutar) > 4){
        var id_Err = 14;
        creeaza_mesaj_eroare(id_Err);
    }else if(v_d === '-'){
        var id_Err = 15;
        creeaza_mesaj_eroare(id_Err);
    }else if(v_i === '-'){
        var id_Err = 16;
        creeaza_mesaj_eroare(id_Err);
    }else if(v_i === v_d){
        var id_Err = 17;
        creeaza_mesaj_eroare(id_Err);
    }
    else{
        creeaza_output();
        console.log('informatii primite sanitizate');
    }
  
}

function creeaza_output(){
    if(document.getElementById('mesaj_eroare') !== null){
        sterge_element = document.getElementById('mesaj_eroare');
        sterge_element.remove();
    }

    if (document.getElementById('rezultat_schimb') === null){
        var curs = document.getElementById('curs_valutar').value;
        var lei = document.getElementById('val_lei').value;
        var valuta_rezultat = document.getElementById('select2').value;

        // rezultatul conversiei valutare
        var rezultat = curs * lei;
        var rezultat_to_string = rezultat.toString();

        // crearea noului <p> unde vom arunca rezultatul
        var p_nou = document.createElement("p");
        p_nou.setAttribute('id','rezultat_schimb');
        p_nou.innerText = rezultat_to_string.concat(" ", valuta_rezultat);
        document.getElementById('r_5').appendChild(p_nou);
        
    } else {
        sterge_element = document.getElementById('rezultat_schimb');
        sterge_element.remove();
        var curs = document.getElementById('curs_valutar').value;
        var lei = document.getElementById('val_lei').value;
        
        // rezultatul conversiei valutare
        var rezultat = curs * lei;
        var rezultat_to_string = rezultat.toString();
        var valuta_rezultat = document.getElementById('select2').value;
        
        // crearea noului <p> unde vom arunca rezultatul
        var p_nou = document.createElement("p");
        p_nou.setAttribute('id','rezultat_schimb');
        p_nou.innerText = rezultat_to_string.concat(" ", valuta_rezultat);
        document.getElementById('r_5').appendChild(p_nou);
    }
}

function creeaza_mesaj_eroare(codEroare){
     for (let eroare of msj_Eroare){
        if(eroare.id == codEroare){
            mesaj = eroare.mesaj;
            creeaza_output_mesaj_eroare();
            //console.log(eroare.mesaj);
        }
     }   
};

function creeaza_output_mesaj_eroare(){
        // daca exista sau nu p-ul cu rezultat
    if(document.getElementById('rezultat_schimb') !== null){
        sterge_element = document.getElementById('rezultat_schimb');
        sterge_element.remove();
    }
         // daca p-ul cu id mesaj_eroare = null
    if(document.getElementById('mesaj_eroare') === null){
        var p_nou = document.createElement("p");
        p_nou.setAttribute('id','mesaj_eroare');
        p_nou.innerText = mesaj;
        document.getElementById('r_5').appendChild(p_nou);
        console.log(v_din);
    }
    else{
        // daca p-ul cu id mesaj_eroare != null
        sterge_element = document.getElementById('mesaj_eroare');
        sterge_element.remove();
        var p_nou = document.createElement("p");
        p_nou.setAttribute('id','mesaj_eroare');
        p_nou.innerText = mesaj;
        document.getElementById('r_5').appendChild(p_nou);
        console.log(v_din);
    }
};

function schimba_din(){
    var p_nou = document.getElementById('paritatea');
    var vali = document.getElementById('select');
    var vali_2 = vali.options[vali.selectedIndex].text;

    if(vali_2 === "Selecteaza valuta"){
    v_din = "-";
    p_nou.innerText = v_din.concat("/", v_in);
    }else{
    v_din = vali_2;
    p_nou.innerText = v_din.concat("/", v_in);
    }
};

function schimba_in(){
    var p_nou = document.getElementById('paritatea');
    var valii = document.getElementById('select2');
    var valii_2 = valii.options[valii.selectedIndex].text;

    if(valii_2 === "Selecteaza valuta"){
    v_in = "-";
    p_nou.innerText = v_din.concat("/", v_in);
    }else{   
    v_in = valii_2;
    p_nou.innerText = v_din.concat("/", v_in);    
    }
};

var v_din = '-';
var v_in = '-';

var valute = [
    {id: 0, valoare: "err", descriere:""},
    {id: 1, valoare: "EURO", descriere: "euro"},
    {id: 2, valoare: "USD", descriere:"dolari americani"},
    {id: 3, valoare: "LEI", descriere: "lei"}
]

var msj_Eroare = [
    {id: 1, mesaj:"Introduceti valoarea pe care doriti s-o schimbati"},
    {id: 2, mesaj:"Introduceti curs de schimb"},
    {id: 3, mesaj:"Valoare schimbata nu trebuie sa contina spatii albe"},
    {id: 4, mesaj:"Cursul de schimb nu trebuie sa contina spatii albe"},
    {id: 5, mesaj:'Caracter nepermis pt campul "Valoare de schimb"'},
    {id: 6, mesaj:'Caracter nepermis pt campul "Curs de schimb"'},
    {id: 7, mesaj:'Caracter nepermis pt campul "Valoare de schimb"'},
    {id: 8, mesaj:'Caracter nepermis pt campul "Curs de schimb"'},
    {id: 9, mesaj:'Caracter nepermis pt campul "Valoare de schimb"'},
    {id: 10, mesaj:'Caracter nepermis pt campul "Curs de schimb"'},
    {id: 11, mesaj:'Valoare introdusa in campul "Valoare de schimb" este eronata'},
    {id: 12, mesaj:'Valoare introdusa in campul "Curs de schimb" este eronata'},
    {id: 13, mesaj:'Valoare de schimb nu poate avea mai mult de 2 zecimale'},
    {id: 14, mesaj:'Cursul de schimb nu poate avea mai mult de 2 zecimale'},
    {id: 15, mesaj:'Va rugam sa alegeti valuta pe care doriti s-o schimbati'},
    {id: 16, mesaj:'Va rugam sa alegeti valuta in care doriti s-o schimbati'},
    {id: 17, mesaj:'Cele doua valute nu pot egale'}
];
    




