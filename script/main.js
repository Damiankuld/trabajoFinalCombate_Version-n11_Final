//--------------Trabajo_Final_Barrionuebo_Damian--------------/
// Objetos
class entidad {
    constructor(name, hP, storage, info, skill1Name, skill1Damage, skill2Name, skill2Damage, skill3Name, skill3Damage, skill1type, skill2type, skill3type) {
        this.name = name;
        this.hP = hP;
        this.storage = storage;
        this.info = info;
        this.skills = {
            skill1: {
                name: skill1Name,
                daño: skill1Damage,
                tipo: skill1type
            },
            skill2: {
                name: skill2Name,
                daño: skill2Damage,
                tipo: skill2type
            },
            skill3: {
                name: skill3Name,
                daño: skill3Damage,
                tipo: skill3type
            }
        }
    }
    accionHero = (contador, skill, aliado1, aliado2, objetivo1, objetivo2, objetivo3) => {
        //guarda la info del storage en una variable, resta la variable de daño o curacion, vacia el cache para poder resubir la nueva info
        switch (skill) {
            case 'damage':
                if (objetivo1) {
                    damage(contador, objetivo1);
                } else { };
                if (objetivo2) {
                    damage(contador, objetivo2);
                } else { };
                if (objetivo3) {
                    damage(contador, objetivo3);
                } else { };
                //daño en animacion
                $(`.contenedorDamageEnemy`).show().empty().prepend(`${contador}`);
                break;
            default:
                if (aliado1) {
                    heal(contador, aliado1);
                    $(`.contenedorDamageHero`).show().empty().prepend(`${contador}`);
                } else { };
                if (aliado2) {
                    heal(contador, aliado2);
                } else { };
                break;
        }
        //Si el enemigo muere
        if (!(stillAlive('hpEnemy1'))) {
            if (face===1) {
                $('#enemy1').empty().append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_dead.png"/>');     //cadaver enemigo sin accion
            }else{
                $('#enemy1').empty().append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead.png"/>');
            }
        }
        if (!(stillAlive('hpEnemy2'))) {
            $('#enemy2').empty().append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead.png"/>');
        }
        if (!(stillAlive('hpEnemy3'))) {
            if (face === 1) {
                $('#enemy3').empty().append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoArbalestero/skeleton_arbalist_dead.png"/>');
            } else { 
                $('#enemy3').empty()
            }
        }
        //ocultar habilidades
        $('.skillsHero').hide();
        switchHero();
        finDelEncuentro();
    }
    accionEnemy = (daño, objetivo1, objetivo2, objetivo3) => {
        //calcular resultado de vida
        if (objetivo1) {
            console.log('all ok 1')
            damage(daño, objetivo1.storage);
        }else{}
        if (objetivo2) {
            damage(daño, objetivo2.storage);
        }else{}
        if (objetivo3) {
            damage(daño, objetivo3.storage);
        }else{}
        //posicion de defensa
        objHeroDefend = objetivo1;
        //objHeroDefend = objetivo2;
        //objHeroDefend = objetivo3;
        //daño en animacion
        $(`.contenedorDamageHero`).show().empty().prepend(`${daño}`);
        //Si el heroe muere
        if (!(stillAlive('hpHero1'))) {
            $('#position1').empty().append('<img class="deadHero1" src="assets/images/chapters/cruzado/animacion/cruzado_dead.png">'); //cadaver sin accion
        }
        if (!(stillAlive('hpHero2'))) {
            $('#position2').empty().append('<img class="deadHero2" src="assets/images/chapters/barbara/animacion/hellion_dead.png">');
        }
        if (!(stillAlive('hpHero3'))) {
            $('#position3').empty().append('<img class="deadHero3" src="assets/images/chapters/arbalestera/animacion/arbalestera_dead.png">');
        }
        finDelEncuentro();
    }
    accionBoss = (objetivo, daño) => {
        let hp = localStorage.getItem(objetivo.storage);
        hp -= daño;
        localStorage.removeItem(objetivo.storage);
        localStorage.setItem(objetivo.storage, hp);
        objHeroDefend = objetivo;
    }
}
//curacion
const heal = (contador, aliado) => {
    let hp = parseInt(localStorage.getItem(aliado));
    hp += contador;
    localStorage.removeItem(aliado);
    localStorage.setItem(aliado, hp);
    //vida in-game
    if (aliado === 'hpHero1') {
        aliado = cruzado.name
    } else if (aliado === 'hpHero2') {
        aliado === barbara.name
    } else {
        aliado === arbalestera.name
    }
    barraDeVida(aliado, hp);
}
//daño
const damage = (contador, objetivo) => {
    let hp = parseInt(localStorage.getItem(objetivo));
    hp -= contador;
    localStorage.removeItem(objetivo);
    localStorage.setItem(objetivo, hp);
    //vida in-game
    barraDeVida(objetivo, hp);
    //audio
    deathsdoor(hp);
}
//heroes
const cruzado = new entidad("Cruzado", 10, 'hpHero1', "Curtido en la batalla y leal, el Cruzado ha mantenido las líneas del frente en un centenar de guerras santas. O ataca a los enemigos de frente con furia justa, o adopta un papel de apoyo cuerpo a cuerpo aprovechando sus poderosas mejoras defensivas y curaciones.", "Herir",
    "1-6", "Acusacion", "1-6", "Estandarte", "1-3", 'Daño', 'Daño', 'Curacion')
const barbara = new entidad("Barbara", 10, 'hpHero2', "Salvaje, impredecible y absolutamente despiadado, ¡el Hellion se emociona con el derramamiento de sangre! Su enorme guja le otorga un alcance impresionante en combate, mientras que su filo afilado deja heridas duraderas en los enemigos. Versátil e implacable, puede golpear la última fila con su espada y devastar a sus enemigos.", "Cortar", "1-8", "Cisne de hierro", "1-8", "Grito barbarico", "1-6", 'Daño', 'Daño', 'Daño');
const arbalestera = new entidad("Arbalestera", 10, 'hpHero3', "Vestida con una armadura pesada y capaz de vencer a los enemigos con su enorme ballesta, es como una encarnación viviente de un cañón. Su vida de guerra le ha dado muchas habilidades para el campo de batalla, como marcar objetivos, hacer llover flechas sobre sus enemigos e incluso disparar bolas para interrumpir la formación del enemigo. También aprendió a vestirse y tratar heridas, y puede aplicar curaciones improvisadas en el campo de batalla.", "Disparo Preciso", "1-8", "Supresion de fuego", "1-6", "Vendaje", "1-5", 'Daño', 'Daño', 'Curacion');
//enemigos
const esqueletoEscudero = new entidad("Esqueleto Escudero", 1);
const esqueletoGuerrero = new entidad("Esqueleto Guerrero", 1);
const esqueletoArbalestero = new entidad("Esqueleto Arballestero", 1);
//boss
const nigromante = new entidad("Nigromante", 0);
//------------------------------------------------------//
// Variables
let img = new Image();
//skills hero
let skillFocus = "";
let healPosition = "";
//variables de objetivo enemigo
let objetivoName = "";
let objetivoPosition = "";
let heroPosition = "";
let defendName = "";
let objHeroDefend;
//turnos de combate 1=cruzado 2=barbara 3=arbalestera 4=enemigos
let position = 1;
//face del encuentro (1= 3 enemigos comunes) y (2= boss)
let face = 1;
//ronda del encuentro
let ronda = 1;
//------------------------------------------------------//
//Local Storage
const localStorageHP = () => {
    //heroes
    localStorage.setItem('hpHero1', cruzado.hP);
    localStorage.setItem('hpHero2', barbara.hP);
    localStorage.setItem('hpHero3', arbalestera.hP);
    //enemigos
    localStorage.setItem('hpEnemy1', esqueletoEscudero.hP);
    localStorage.setItem('hpEnemy2', esqueletoGuerrero.hP);
    localStorage.setItem('hpEnemy3', esqueletoArbalestero.hP);
    //jefe
    localStorage.setItem('hpBoss1', nigromante.hP);
    //Jefe - limpiar cache
    localStorage.removeItem('hpBoss1');
    localStorage.setItem('hpBoss1', 0);
}
localStorageHP();
//------------------------------------------------------//
//dados
function dado(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//------------------------------------------------------//
//cambiar heroe
const switchHero = () => {
    switch (position) {
        case 1:
            if (stillAlive('hpHero1')) {
                showContent('cruzado', cruzado, 'hpHero1', 2);   //mostrar heroe 1          
                //mostrar info de heroe
                $('#infoHero').show();
                $('#skillCruzado').show();
            } else {
                position = 2;        //cambiar turno
                switchHero();        //reiniciar seleccion de heroe
            }
            break;
        case 2:
            if (stillAlive('hpHero2')) {
                showContent('barbara', barbara, 'hpHero2', 3);  //mostrar heroe 2
                //mostrar info de heroe
                $('#infoHero').show();
                $('#skillBarbara').show();
            } else {
                position = 3;
                switchHero();
            }
            break;
        case 3:
            if (stillAlive('hpHero3')) {
                showContent('arbalestera', arbalestera, 'hpHero3', 4);  //mostrar heroe 3
                //mostrar info de heroe
                $('#infoHero').show();
                $('#skillArbalestera').show();
            } else {
                position = 4;
                switchHero();
            }
            break;
        default:
            $(`#infoHero`).hide();            //ocultar info de heroes
            $('#buttonCombat').fadeIn(1000);        //mostrar boton para finalizar ronda
            position = 1;                     //reinciar turno
            break;
    }
}
const hideloco = () => {
    $(`#infoHero`).hide();
}
//------------------------------------------------------//
//objetivo del enemigo
const objetive = (roll) => {
    if (((stillAlive('hpHero1')) || (stillAlive('hpHero2')) || (stillAlive('hpHero3')))) {
        if (0 === roll) {
            if (stillAlive('hpHero1')) {
                return cruzado;
            } else {
                objetive(dado(0, 2));
            }
        } else if (1 === roll) {
            if (stillAlive('hpHero2')) {
                return barbara;
            } else {
                objetive(dado(0, 2));
            }
        } else {
            if (stillAlive('hpHero3')) {
                return arbalestera;
            } else {
                objetive(dado(0, 2));
            }
        }
    } else {
        return false;
    }
}
//-------------------------------------------------------//
//still alive
//funcion para verificar vida de entidad
const stillAlive = (vida) => {
    return (localStorage.getItem(vida) > 0);
}
//funcion para retirar el valor de la vida he imprimirla en 'guardarHP()'
const storageHP = (vida) => {
    return (localStorage.getItem(vida));
}
//funcion para finalizar encuentro y detectar resultados
const finDelEncuentro = () => {
    switch (face) {
        case 1:
            if (((stillAlive('hpHero1') || stillAlive('hpHero2') || stillAlive('hpHero3')) && ((stillAlive('hpEnemy1')) === false && (stillAlive('hpEnemy2')) === false && (stillAlive('hpEnemy3')) === false)) || (((stillAlive('hpHero1')) === false && (stillAlive('hpHero2')) === false && (stillAlive('hpHero3')) === false) && ((stillAlive('hpEnemy1')) || (stillAlive('hpEnemy2')) || (stillAlive('hpEnemy3'))))) {

                if (((stillAlive('hpHero1')) === false && (stillAlive('hpHero2')) === false && (stillAlive('hpHero3')) === false)) {
                    $('.face-boss-container').fadeIn();
                    guardarHP('inicial', 'hpEnemy3');
                    $('.face-inicial').prepend("<p>¡Los heroes han caido!</p>");
                    $('.vidaenemy').hide();
                    $('.heroLive').hide();
                    //boton de combate
                    $('#buttonCombat').hide();
                    $('.close_icon').empty().append(`<img src="assets/images/interface/plantillas/close_icon.png" alt="close_icon" onclick="cambiarEscenario();">`);
                } else {
                    $('.face-boss-container').fadeIn();
                    guardarHP('inicial', 'hpEnemy3');
                    $('.face-inicial').prepend("<p>¡Ganaron los heroes!</p>");
                    $('.vidaenemy').hide();
                    $('.heroLive').hide();
                    //boton de combate
                    $('#buttonCombat').hide();
                    $('.close_icon').empty().append(`<img src="assets/images/interface/plantillas/close_icon.png" alt="close_icon" onclick="faceJefe();">`);
                }
            } else { }
            break;
        case 2:
            if (((stillAlive('hpHero1') || stillAlive('hpHero2') || stillAlive('hpHero3')) && ((stillAlive('hpEnemy1')) === false && (stillAlive('hpEnemy2')) === false && (stillAlive('hpEnemy3')) === false)) || (((stillAlive('hpHero1')) === false && (stillAlive('hpHero2')) === false && (stillAlive('hpHero3')) === false) && ((stillAlive('hpEnemy1')) || (stillAlive('hpEnemy2')) || (stillAlive('hpEnemy3'))))) {
                $('#final-raid-button').fadeIn();
                //boton de combate
                $('#buttonCombat').hide();
            } else { }
            break;
        default:
            break;
    }
}
const resultado = () => {
    if ((stillAlive('hpHero1') || stillAlive('hpHero2') || stillAlive('hpHero3')) && ((stillAlive('hpEnemy1')) === false && (stillAlive('hpEnemy2')) === false && (stillAlive('hpEnemy3')) === false)) {
        mostrarResultados();
        $('#resultado').addClass('victory');
        $('#v-f').empty().prepend('Victoria');
        guardarHP('final', 'hpEnemy3');
        $('.v-f').prepend("<p>¡Ganaron los heroes!</p>");
        //boton de combate
        $('#buttonCombat').hide();
    } else if (((stillAlive('hpHero1')) === false && (stillAlive('hpHero2')) === false && (stillAlive('hpHero3')) === false) && ((stillAlive('hpEnemy1')) || (stillAlive('hpEnemy2')) || (stillAlive('hpEnemy3')))) {
        mostrarResultados();
        $('#resultado').addClass('defeat');
        guardarHP('final', 'hpEnemy3');
        $('#v-f').empty().prepend('Derrota');
        $('.v-f').prepend("<p>¡Los heroes han caido!</p>");
        //boton de combate
        $('#buttonCombat').hide();
    } else { }
}

//-------------------------------------------------------//
//Combate
//funcion promesa de animacion enemgiga
const promesaAnimacion = (columna, time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (columna) {
                case 1:
                    if (face === 1) {
                        esqueletoEscudero.accionEnemy(dado(1, 6),objetive(dado(0, 2)));
                        enemyAnimation('esqEscuderoSkill1', 'esqueletoEscudero', 'skeleton_shield', 'animacion-skeleton-escudero-skill-1-body', 'none', 'animacion-skeleton-escudero-skill-1-anim', `style= 'height: 400px'`, 610);
                    } else {
                        esqueletoGuerrero.accionEnemy(dado(1, 8),objetive(dado(0, 2)));
                        enemyAnimation('esqGuerreroSkill1', 'esqueletoGuerrero', 'skeleton_common_attack', 'animacion-skeleton-guerrero-skill-1-body', 'none', 'animacion-skeleton-guerrero-skill-1-anim', `style= 'height: 380px'`, 610);
                    }
                    break;
                case 2:
                    esqueletoGuerrero.accionEnemy(dado(1, 8),objetive(dado(0, 2)));
                    enemyAnimation('esqGuerreroSkill1', 'esqueletoGuerrero', 'skeleton_common_attack', 'animacion-skeleton-guerrero-skill-1-body', 'skeleton_garrote', 'animacion-skeleton-guerrero-skill-1-anim', `style= 'height: 380px'`, 610);
                    break;
                case 3:
                    esqueletoArbalestero.accionEnemy(dado(1, 8),objetive(dado(0, 2)));
                    enemyAnimation('esqArbalesteroSkill1', 'esqueletoArbalestero', 'skeleton_crossbow', 'animacion-skeleton-Arbalestero-skill-1-body', 'skeleton_crossbow_shot', 'animacion-skeleton-Arbalestero-skill-1-anim', `style= 'height: 360px'`, 310);
                    break;
                case 4:
                    switch (dado(1, 3)) {
                        case 1:
                            nigromante.accionBoss(dado(0, 8),objetive(dado(0, 2)));
                            enemyAnimation('bossSkill1', 'nigromante', 'nigromante_attack_melee', 'animacion-boss-skill-1-body', 'none', 'animacion-boss-skill-1-efect', `style= 'height: 560px'`, 410, 'skill1');
                            break;
                        case 2:
                            nigromante.accionBoss(dado(0, 6), objetive(dado(0),objetive(dado(1, 2))));
                            enemyAnimation('bossSkill1', 'nigromante', 'nigromante_attack_ranged', 'animacion-boss-skill-2-body', 'none', 'animacion-boss-skill-2-efect', `style= 'height: 660px'`, 410, 'skill2');
                            break;
                        default:
                            nigromante.accionBoss(dado(0, 4),objetive(dado(0)),objetive(dado(1)),objetive(dado(2)));
                            enemyAnimation('bossSkill1', 'nigromante', 'nigromante_attack_ranged', 'animacion-boss-skill-2-body', 'none', 'animacion-boss-skill-3-efect', `style= 'height: 660px'`, 410, 'skill3');
                            break;
                    }
                    break;
                default:
                    break;
            }
            resolve({
                result: columna
            });
        }, time);
    });
}
//funcion promesa de selector enemgigo
const promesaSelect = (columna, time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            selectionEnemy(columna);
            resolve({
                result: columna
            });
        }, time);
    });
}
//funcion asincronica de ataque enemigo en secuencia
const finalizarTurno = async () => {
    audios('combat_start');
    $('#buttonCombat').fadeOut(1000);                   //ocultar boton de finalizar ronda
    try {
        if (stillAlive('hpEnemy1')) {       //detectar si el enemigo sigue con vida para atacar
            await promesaSelect(1, 2500);
            await promesaAnimacion(1, 2000);
        };

        if (((stillAlive('hpHero1')) || (stillAlive('hpHero2')) || (stillAlive('hpHero3')))) {

            if (stillAlive('hpEnemy2')) {       //detectar si el enemigo sigue con vida para atacar
                await promesaSelect(2, 2500);
                await promesaAnimacion(2, 2000);
            };
            if (face === 1) {
                if (stillAlive('hpEnemy3')) {       //detectar si el enemigo sigue con vida para atacar
                    await promesaSelect(3, 2500);
                    await promesaAnimacion(3, 2000);
                };
            };
            if (face === 2) {
                if (stillAlive('hpEnemy3')) {       //detectar si el boss sigue con vida para atacar
                    await promesaSelect(4, 2500);
                    await promesaAnimacion(4, 2000);
                };
            };

            //volver a mostrar la info de los heroes
            $(`#infoHero`).show();

            //ocultar habilidades
            $('.skillsHero').hide();
            //verificar vida de heroes
            switchHero();
        } else { }
    } catch (error) {
        console.log(error);
    }
}
//audios
//reproduccion y volumen
const audios = (id) => {
    audio = document.querySelector(`#${id}`);
    audio.play();
    audio.volume = 0.3;
}
//muerte de entidad
const deathsdoor = (hp) => {
    if (hp <= 0) {
        audios('deathsdoor')
    }
}
//face de jefe
const faceJefe = () => {
    //ocultar plantilla de resultado
    $('.face-boss-container').hide();
    //boss
    $('#enemySpot3').empty().prepend(`
    <div id="enemy3" class="columnaN2 columnaN3 monster"
    onclick="showContentEnemy(nigromante, 'hpEnemy3', '3', 'nigromante', 'skill', '1-8', 2);">
    <img class="lenght_boss" src="assets/images/enemys/ruinas/nigromante/nigromante.gif" alt="boss">
    </div>`);
    //minion 2
    $('#enemySpot2').empty().prepend(`
    <div id="enemy2" class='columnaN2 monster'
    onclick="showContentEnemy(esqueletoGuerrero, 'hpEnemy2',2, 'esqueletoGuerrero', 'Garrote', '1-8', 2);">
    <img class='lenght' src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_common.gif" alt="esqGuerrero">
    </div>`);
    //minion 1
    $('#enemySpot1').empty().prepend(`
    <div id="enemy1" class='columnaN2 monster'
    onclick="showContentEnemy(esqueletoGuerrero, 'hpEnemy1',1, 'esqueletoGuerrero', 'Garrote', '1-8', 2);">
    <img class='lenght' src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_common.gif" alt="esqGuerrero">
    </div>`);

    //vida de minions
    localStorage.removeItem('hpEnemy1');
    localStorage.setItem('hpEnemy1', esqueletoGuerrero.hP);
    localStorage.removeItem('hpEnemy2');
    localStorage.setItem('hpEnemy2', esqueletoGuerrero.hP);
    //vida de jefe
    localStorage.removeItem('hpEnemy3');
    localStorage.setItem('hpEnemy3', 20);
    //face del encuentro
    face = 2;
    //turno de heroes
    position = 1;
    $('.skillsHero').hide();
    switchHero();
    //barras de vida
    barraDeVida('hpEnemy1', esqueletoGuerrero.hP);
    barraDeVida('hpEnemy2', esqueletoGuerrero.hP);
    barraDeVida('hpEnemy3', 20);

    //vida esq arbalestero
    $('#vidaEsqueletoArbalestero').hide();
}