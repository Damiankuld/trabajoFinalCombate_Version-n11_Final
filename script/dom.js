//----------------------------DOM----------------------------//
//-----------------------------------------------------------//
//Boton de combate
$('#buttonCombat').show();
//Heroes
//mostrar skills
const showContent = (hero, entidad, storage, turno, skillID) => {
    //Orden de atque
    position += 1;

    //nombre y estadisticas
    $(`#statsHero`).empty().append(`<p>${localStorage.getItem(storage)}</p>`);
    $(`#nameHero`).empty().append(`<p>${entidad.name}</p>`);

    //portrait
    let portrait = document.querySelector(`#portraitHero`);
    portrait.innerHTML = `<img src="assets/images/chapters/portraits/${hero}.png">`;

    //quitar todas las selecciones
    $(`.heroe`).removeClass("columna-hover");

    //agregar nueva seleccion
    //$(`#position${turno - 1}`).addClass("columna-hover");
    let selected = document.querySelector(`#position${turno - 1}`);
    selected.classList.add("columna-hover");
}
//skills info
const showSkill = (i, skill, heroe, objetivos, entidad) => {
    //remover todos los selectores
    $(`.skillHero`).removeClass('select_skill_hover');

    //selector actual
    $(`#skill${heroe}${skill}`).addClass('select_skill_hover');

    $(`.monster`).removeClass("columnaN2-hover");
    $(`.heroe`).removeClass("columna-hover-heal");
    console.log(objetivos)
    switch (objetivos) {
        case '1-2':
            //los dos primeros enemigos
            $(`#enemy1`).addClass('columnaN2-hover');
            $(`#enemy2`).addClass('columnaN2-hover');
            break;
        case '2-3':
            //los dos ultimos enemigos
            $(`#enemy2`).addClass('columnaN2-hover');
            $(`#enemy3`).addClass('columnaN2-hover');
            break;
        case 3:
            //los tres enemigos
            $(`.monster`).addClass('columnaN2-hover');
            break;
        case 'heal-2':
            //selector de heroes
            $('#position2').addClass('columna-hover-heal');
            $('#position3').addClass('columna-hover-heal');
            break;
        case 'heal-1':

        default:
            break;
    }
    //guardar skill para utilizar en el boton de ataque
    skillFocus = `${i}${skill}`;
    //info de skill
    if (skill === 1) {
        $('.infoSkill').empty().append(`
        <h3>${entidad.skills.skill1.name}</h3>
        <p>${entidad.skills.skill1.tipo}: ${entidad.skills.skill1.daño}</p>
        `);
    } else if (skill === 2) {
        $('.infoSkill').empty().append(`
        <h3>${entidad.skills.skill2.name}</h3>
        <p>${entidad.skills.skill2.tipo}: ${entidad.skills.skill2.daño}</p>
        `);
    } else {
        $('.infoSkill').empty().append(`
        <h3>${entidad.skills.skill3.name}</h3>
        <p>${entidad.skills.skill3.tipo}: ${entidad.skills.skill3.daño}</p>
        `);
    }
}
//curacion individual de arbalestera
$('#position1').removeAttr('onclick');
//$("#position1").off( "click" );
const positionHeal = (hero) => {
    healPosition = hero;
    $('.heroe').removeClass('columna-hover-heal');
    if (hero === 'hpHero1') {
        $('#position1').addClass('columna-hover-heal');
    } else if (hero === 'hpHero2') {
        $('#position2').addClass('columna-hover-heal');
    } else {
        $('#position3').addClass('columna-hover-heal');
    }
}
//onlick for heal
//boton para confirmar ataque
const botonAtaque = () => {
    switch (skillFocus) {
        case '01':
            cruzado.accionHero(dado(1, 6), 'damage', '', '', objetivoPosition);
            skillAnimation('cruzadoSkill1', 'cruzado', 'crusader_sword', 'animacion-crusado-skill-1', 'crusader_sword_animation', 'animacion-crusado-skill-1-anim', '', '1');
            break;
        case '02':
            cruzado.accionHero(dado(1, 6), 'damage', '', '', 'hpEnemy1', 'hpEnemy2');
            skillAnimation('cruzadoSkill2', 'cruzado', 'crusader_scroll', 'animacion-crusado-skill-2-body', 'crusader_scroll_animation', 'animacion-crusado-skill-2-anim', '', '1-2');
            break;
        case '03':
            cruzado.accionHero(dado(1, 3), 'heal', 'hpHero2', 'hpHero3');
            skillAnimation('cruzadoSkill3', 'cruzado', 'crusader_banner', 'animacion-crusado-skill-3-body', 'none', 'animacion-crusado-skill-1-anim', `style= 'height: 690px'`, '1');
            break;
        case '11':
            barbara.accionHero(dado(1, 8), 'damage', '', '', objetivoPosition);
            skillAnimation('barbaraSkill1', 'barbara', 'hellion_attack', 'animacion-barbara-skill-1-body', 'animacion_attack', 'animacion-barbara-skill-1-anim', `style= 'height: 390px'`, '1');
            break;
        case '12':
            barbara.accionHero(dado(1, 8), 'damage', '', '', 'hpEnemy2', 'hpEnemy3');
            skillAnimation('barbaraSkill2', 'barbara', 'hellion_leap', 'animacion-barbara-skill-2-body', 'animacion_leap', 'animacion-barbara-skill-2-anim', `style= 'height: 590px'`, '2-3');
            break;
        case '13':
            barbara.accionHero(dado(1, 8), 'damage', '', '', 'hpEnemy1', 'hpEnemy2', 'hpEnemy3');
            skillAnimation('barbaraSkill3', 'barbara', 'hellion_shout', 'animacion-barbara-skill-3-body', 'none', 'animacion-barbara-skill-3-anim', `style= 'height: 570px'`, '3');
            break;
        case '21':
            arbalestera.accionHero(dado(1, 8), 'damage', '', '', objetivoPosition);
            skillAnimation('arbalesteraSkill1-a', 'arbalestera', 'arbalestera_shot', 'animacion-arbalestera-skill-1-body', 'none', 'animacion-arbalestera-skill-1-anim', `style= 'height: 425px'`, '1');
            break;
        case '22':
            arbalestera.accionHero(dado(1, 8), 'damage', '', '', 'hpEnemy1', 'hpEnemy2', 'hpEnemy3');
            skillAnimation('arbalesteraSkill2-a', 'arbalestera', 'arbalestera_artillery', 'animacion-arbalestera-skill-2-body', 'none', 'animacion-arbalestera-skill-2-anim', `style= 'height: 350px'`, '3');
            break;
        default:
            arbalestera.accionHero(dado(1, 5), 'heal', healPosition);
            skillAnimation('arbalesteraSkill3', 'arbalestera', 'arbalestera_bandage', 'animacion-arbalestera-skill-3-body', 'none', 'animacion-arbalestera-skill-3-anim', `style= 'height: 370px'`, '1');
            break;
    }
}
//eleccion incial
$('#skillBarbara').hide();
$('#skillArbalestera').hide();
$('#skillCruzado').hide();

//mostrar entidades
//enemigo n1
$('#enemySpot1').empty().prepend(`
<div id="enemy1" class='columnaN2 monster''
onclick="showContentEnemy(esqueletoEscudero,'hpEnemy1',1, 'esqueletoEscudero', 'Golpe con escudo', '1-6', 2);">
<img class='lenght' src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender.gif">
</div>`);
//enemigo n2
$('#enemySpot2').empty().prepend(`
<div id="enemy2" class='columnaN2 monster''
onclick="showContentEnemy(esqueletoGuerrero, 'hpEnemy2',2, 'esqueletoGuerrero', 'Garrote', '1-8', 2);">
<img class='lenght' src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_common.gif" alt="esqGuerrero">
</div>`);
//enemigo n3
$('#enemySpot3').empty().prepend(`
<div id="enemy3" class='columnaN2 monster''
onclick="showContentEnemy(esqueletoArbalestero,'hpEnemy3',3, 'esqueletoArbalestero', 'Disparo preciso', '1-8', 2);">
<img class='lenght' src="assets/images/enemys/ruinas/esqueletoArbalestero/skeleton_arbalist.gif" alt="esqArbalestero">
</div>`);
//-----------------------------------------------------------//
//Enemy
//mostrar contenido de enemigo
const showContentEnemy = (name, position, columna, defend, skill, skillDmg, colNum) => {
    //nombre
    $(`#nameEnemy`).empty().append(`<p>${name.name}</p>`);
    //vida
    $(`#hpEnemy`).empty().append(`<p>Puntos de vida: ${localStorage.getItem(position)}</p>`);
    //habilidad
    $('#statsEnemyDown').empty().append(`
    <p>Habilidad</p>
    <p class="skill-enemy">${skill}</p>
    <p></p>
    <p class="skill-enemy">Daño: ${skillDmg}</p>
    `);
    //variables de objetivo
    objetivoName = name.name;
    objetivoPosition = position;
    defendName = defend;

    //quitar todas las selecciones
    $(`.monster`).removeClass(`columnaN2-hover`);
    //agregar la actual
    $(`#enemy${columna}`).addClass(`columnaN${colNum}-hover`);
}
//-----------------------------------------------------------//
//-------------------------animacion-------------------------//
//funciones de animacion
const mostrarAnimaciones = () => {
    //unidades
    $('#position1').hide();
    $('#position2').hide();
    $('#position3').hide();
    $('#enemy1').hide();
    $('#enemy2').hide();
    $('#enemy3').hide();
    $('#boss').hide();
    //health bar
    $('.health-bar').hide();
    //info bars
    $('.infoSkill').empty();
    //unidades seleccionadas
    $('.animacionHero').fadeIn();
    $('.animacionHeroEfecto').fadeIn();
    $('.animacionEnemy').fadeIn();
    $('.animacionEnemyEfecto').fadeIn();
    //mostrar daño
    $('.contenedorDamageEnemy').fadeIn();
    $('.contenedorHeroDamage').fadeIn();
}
const ocultarAnimaciones = () => {
    //animaciones
    $('.animacionHero').hide();
    $('.animacionHeroEfecto').hide();
    $('.animacionEnemy').hide();
    $('.animacionEnemyEfecto').hide();
    //puntos de damage o heal
    $('.contenedorDamageEnemy').hide();
    $('.contenedorHeroDamage').hide();
    //unidades
    $('#position1').show();
    $('#position2').show();
    $('#position3').show();
    $('#enemy1').show();
    $('#enemy2').show();
    $('#enemy3').show();
    //health bar
    $('.health-bar').show();

    if (stillAlive('hpBoss1')) {  //detectar si el boss sigue con vida para atacar
        $('#enemy0').show();
        $('#boss').show();
    };
}

const animacionDeAtaque = (enemySpace, initialSpot, enemyDamage) => {
    $('#statsEnemy').hide();          //esconder info de enemigo
    $('#infoHero').hide();            //esconder info de heroe
    $('.animacionEnemyEfecto').hide();
    //posicion incial del enemigo
    $('.animacionEnemy').animate({
        right: `${initialSpot}`,
    }, 0);

    //animacion heroe
    $('.animacionHero').animate({
        right: `150`,
    }, 600, () => {
        $('.animacionHero').animate({
            right: `90`,
        }, 1000);
    });

    //animacion heroe efecto

    $('.animacionHeroEfecto').animate({
        'margin-left': '580',
        opacity: 1.0,
    }, 600, () => {
        $('.animacionHeroEfecto').animate({
            'margin-left': '690',
            opacity: 0.0,
        }, 1000);
    });

    //animacion enemigo
    $('.animacionEnemy').animate({
        right: `${enemySpace}`,
    }, 600, () => {
        $('.animacionEnemy').animate({
            right: `${enemySpace - 40}`,
        }, 1000);
    });

    //animacion damage
    $(`.contenedorDamageEnemy`).animate({
        left: `${enemyDamage}`,
        top: '420',
        opacity: 0.8,
    }, 1600, () => {
        $(`.contenedorDamageEnemy`).animate({
            left: `${enemyDamage + 40}`,
            top: '360',
            opacity: 0.0,
        }, 2000);
    });

    //animacion background
    $('.battle').animate({
        opacity: 1,
    }, 600);
    $('.battle').animate({
        opacity: 1,
    }, 1000, function () {                //Recetear cambios

        ocultarAnimaciones();             //esconder animciones
        $('#statsEnemy').show();          //mostrar info de enemigo
        $(`#nameEnemy`).text('');         //vaciar info
        $(`#hpEnemy`).text('');           //vaciar info
        //clases de objetivos
        $('.animacionHero').removeClass('col-2-hero');
        $('.animacionHero').removeClass('col-3-hero');

        $('#infoHero').show();            //mostrar info de heroe

        $('.animacionHero').animate({
            right: '420',
        }, 0);
        $('.animacionHeroEfecto').animate({
            'margin-left': '0',
        }, 0);
        $('.animacionEnemy').animate({
            right: '890',
        }, 0);
        $(`.contenedorDamageEnemy`).animate({
            left: '960',
            top: '510',
        }, 0);
    });
}
const animacionDeCuracion = () => {
    //info de heroe
    $('#infoHero').hide();
    //info de enemigo
    $('#statsEnemy').hide();
    //daño de enemigo
    $(`.contenedorDamageEnemy`).hide();
    //animacion de enemigo
    $('.animacionEnemy').hide();
    //barras de vida
    $('.health-bar').hide();

    //animacion heal
    $(`.contenedorDamageHero`).addClass('contenedorDamageHero-color-green');
    $(`.contenedorDamageHero`).animate({
        left: '610',
        top: '450',
        opacity: 0.8,
    }, 600, () => {
        $(`.contenedorDamageHero`).animate({
            left: '570',
            top: '400',
            opacity: 0.1,
        }, 1000);
    });
    //posicion incial
    $('.animacionHero').animate({
        right: '300',
    }, 0);
    //animacion heroe
    $('.animacionHero').animate({
        right: `50`,
    }, 600, () => {
        $('.animacionHero').animate({
            right: `-90`,
        }, 1000);
    });
    //animacion heroe efecto
    $('.animacionHeroEfecto').animate({
        'margin-left': '580',
        opacity: 1.0,
    }, 600, () => {
        $('.animacionHeroEfecto').animate({
            'margin-left': '700',
            opacity: 0.0,
        }, 1000);
    });

    //animacion background
    $('.battle').animate({
        opacity: 1,
    }, 600);
    $('.battle').animate({
        opacity: 1,
    }, 1000, function () {                //Recetear cambios

        ocultarAnimaciones();             //esconder animciones
        $('#statsEnemy').show();          //mostrar info de enemigo
        $(`#nameEnemy`).text('');         //vaciar info
        $(`#hpEnemy`).text('');           //vaciar info
        //barras de vida
        $('.health-bar').show();
        //info de heroe
        $('#infoHero').show();
        //posiciones iniciales           
        $('.animacionHero').animate({
            right: '420',
        }, 0);
        $('.animacionHeroEfecto').animate({
            'margin-left': '0',
        }, 0);
        //clases de objetivos
        $('.animacionHero').removeClass('col-2-hero');
        $('.animacionHero').removeClass('col-3-hero');
        $(`.contenedorDamageHero`).hide();
        $(`.contenedorDamageHero`).removeClass('contenedorDamageHero-color-green');
        $(`.heroe`).removeClass("columna-hover-heal");

    });
}
//-----------------------------------------------------------//
//-----------------------heroes-skills-----------------------//
const skillAnimation = (skill, chapter, animHeroe, classHero, animSkill, classAnim, style, objetivos) => {
    //audio
    audios(`${skill}`);
    //esconder unidades
    mostrarAnimaciones();
    //posicion de ataque
    $('.animacionHero').empty().append(`<img ${style} class="${classHero}" src="assets/images/chapters/${chapter}/animacion/${animHeroe}.png"/>`);
    $('.animacionHeroEfecto').empty().append(`<img class="${classAnim}" src="assets/images/chapters/${chapter}/animacion/${animSkill}.png"/>`);
    //posicion de defensa enemigo
    $('.animacionEnemy').empty();
    //posturas de defensa
    switch (face) {
        case 1: //face 1- enemigos comunes
            if (face === 1) {
                switch (objetivos) {
                    case '1':
                        switch (defendName) {
                            case 'esqueletoEscudero':
                                if (stillAlive('hpEnemy1')) { $('.animacionEnemy').append('<img class="skeleton-defend-1" src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_dead-little.png"/>'); };
                                break;
                            case 'esqueletoGuerrero':
                                if (stillAlive('hpEnemy2')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                                break;
                            default:
                                if (stillAlive('hpEnemy3')) { $('.animacionEnemy').append('<img style= "height: 430px" class="skeleton-defend-3" src="assets/images/enemys/ruinas/esqueletoArbalestero/arbalist_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoArbalestero/skeleton_arbalist_dead-little.png"/>'); };
                                break;
                        }
                        break;
                    case '1-2':
                        $('.animacionEnemy').addClass('col-2-hero');
                        if (stillAlive('hpEnemy1')) { $('.animacionEnemy').append('<img class="skeleton-defend-1" src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_dead-little.png"/>'); }
                        if (stillAlive('hpEnemy2')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                        break;
                    case '2-3':
                        $('.animacionEnemy').addClass('col-2-hero');
                        if (stillAlive('hpEnemy2')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                        if (stillAlive('hpEnemy3')) { $('.animacionEnemy').append('<img style= "height: 430px" class="skeleton-defend-3" src="assets/images/enemys/ruinas/esqueletoArbalestero/arbalist_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoArbalestero/skeleton_arbalist_dead-little.png"/>'); };
                    default:
                        $('.animacionEnemy').addClass('col-3-hero');
                        if (stillAlive('hpEnemy1')) { $('.animacionEnemy').append('<img class="skeleton-defend-1" src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_dead-little.png"/>'); }
                        if (stillAlive('hpEnemy2')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                        if (stillAlive('hpEnemy3')) { $('.animacionEnemy').append('<img style= "height: 430px" class="skeleton-defend-3" src="assets/images/enemys/ruinas/esqueletoArbalestero/arbalist_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead dead-atack" src="assets/images/enemys/ruinas/esqueletoArbalestero/skeleton_arbalist_dead-little.png"/>'); };
                        break;
                }
            }
        case 2: //face dos boss
            if (face === 2) {
                switch (objetivos) {
                    case '1':
                        switch (defendName) {
                            case 'esqueletoEscudero':
                                if (stillAlive('hpEnemy1')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); }
                                break;
                            case 'esqueletoGuerrero':
                                if (stillAlive('hpEnemy2')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } { $('.animacionEnemy').append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); }
                                break;
                            default:
                                if (stillAlive('hpEnemy3')) { $('.animacionEnemy').append('<img class="nigromante-defend" style= "height: 530px" src="assets/images/enemys/ruinas/nigromante/nigromante_defend.png" alt="">'); } else { }
                                break;
                        }
                        break;
                    case '1-2':
                        $('.animacionEnemy').addClass('col-2-hero');
                        if (stillAlive('hpEnemy1')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                        if (stillAlive('hpEnemy2')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                        break;
                    case '2-3':
                        $('.animacionEnemy').addClass('col-2-hero');
                        if (stillAlive('hpEnemy2')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                        if (stillAlive('hpEnemy3')) { $('.animacionEnemy').append('<img class="nigromante-defend" style= "height: 530px" src="assets/images/enemys/ruinas/nigromante/nigromante_defend.png" alt="">'); } else {  }
                        break;
                    default:
                        $('.animacionEnemy').addClass('col-3-hero');
                        if (stillAlive('hpEnemy1')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                        if (stillAlive('hpEnemy2')) { $('.animacionEnemy').append('<img style= "height: 410px" class="skeleton-defend-2" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>'); } else { $('.animacionEnemy').append('<img class="dead" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_dead-little.png"/>'); };
                        if (stillAlive('hpEnemy3')) { $('.animacionEnemy').append('<img class="nigromante-defend" style= "height: 530px" src="assets/images/enemys/ruinas/nigromante/nigromante_defend.png" alt="">'); } else { }
                        break;
                }
            } else { };
            break;
    };
    //animacion heroe
    switch (chapter) {
        case 'cruzado':
            switch (skill) {
                case 'cruzadoSkill3':
                    $('.animacionHero').addClass('col-3-hero');
                    //animacion de aliados
                    $('.animacionHero').append(`
                    <img class="skill3-cruzader-heal-1" style= "height: 540px" src="assets/images/chapters/barbara/animacion/hellion_defend.png">
                    <img class="skill3-cruzader-heal-2" style= "height: 420px" src="assets/images/chapters/arbalestera/animacion/arbalestera_defend.png">
                    `);
                    animacionDeCuracion();
                    break;
                case 'cruzadoSkill2':
                    animacionDeAtaque(680, 890, 1080);
                    break;
                case 'cruzadoSkill1':
                    animacionDeAtaque(680, 890, 1080);
                    break;
                default:
                    break;
            }
            break;
        case 'barbara':
            animacionDeAtaque(590, 890, 1150);
            break;
        default:
            switch (skill) {
                case 'arbalesteraSkill3':
                    if (healPosition === 'hpHero1') {
                        $('.animacionHero').append('<img class="skill3-arbalest-heal-1" style= "height: 490px" src="assets/images/chapters/cruzado/animacion/crusader_defend.png">');
                    } else {
                        $('.animacionHero').append(`<img class="skill3-arbalest-heal-2" style= "height: 510px" src="assets/images/chapters/barbara/animacion/hellion_defend.png">`);
                    }
                    animacionDeCuracion();
                    break;
                default:
                    animacionDeAtaque(480, 790, 1270);
                    break;
            }
            break;
    }
}
//-----------------------------------------------------------//
//--------------------enemy-attack---------------------------//
const enemyAnimation = (song, monster, animEnemy, classEnemy, animSkill, classAnim, style, initialSpot, bossSkill) => {
    //audio
    audios(`${song}`);
    //esconder unidades
    mostrarAnimaciones();
    //posicion de defensa enemigo
    switch (bossSkill) {
        case 'skill2':
            $('.animacionHero').empty();
            if (stillAlive('hpHero2')) { $('.animacionHero').append('<img style= "height: 540px" class="animacion-hero-defend-2" src="assets/images/chapters/barbara/animacion/hellion_defend.png">'); } else { };
            if (stillAlive('hpHero1')) { $('.animacionHero').append('<img style= "height: 490px" class="animacion-hero-defend-1" src="assets/images/chapters/cruzado/animacion/crusader_defend.png">'); } else { };
            $('.animacionHero').addClass('col-2-hero');
            break;
        case 'skill3':
            $('.animacionHero').empty();
            if (stillAlive('hpHero3')) {
                $('.animacionHero').append('<img style= "height: 420px" class="animacion-hero-defend-3" src="assets/images/chapters/arbalestera/animacion/arbalestera_defend.png">');
                console.log(3, stillAlive('hpHero3'))
            } else { };
            if (stillAlive('hpHero2')) {
                $('.animacionHero').append('<img style= "height: 540px" class="animacion-hero-defend-2" src="assets/images/chapters/barbara/animacion/hellion_defend.png">');
                console.log(2, stillAlive('hpHero2'))
            } else { };
            if (stillAlive('hpHero1')) {
                $('.animacionHero').append('<img style= "height: 490px" class="animacion-hero-defend-1" src="assets/images/chapters/cruzado/animacion/crusader_defend.png">');
                console.log(1, stillAlive('hpHero1'))
            } else { };
            $('.animacionHero').addClass('col-3-hero');
            break;
        default:
            switch (objHeroDefend.name) {
                case 'Cruzado':
                    $('.animacionHero').empty().append('<img style= "height: 490px" class="animacion-hero-defend-1" src="assets/images/chapters/cruzado/animacion/crusader_defend.png">');
                    break;
                case 'Barbara':
                    $('.animacionHero').empty().append('<img style= "height: 540px" class="animacion-hero-defend-2" src="assets/images/chapters/barbara/animacion/hellion_defend.png">');
                    break;
                case 'Arbalestera':
                    $('.animacionHero').empty().append('<img style= "height: 420px" class="animacion-hero-defend-3" src="assets/images/chapters/arbalestera/animacion/arbalestera_defend.png">');
                    break;
                default:
                    break;
            }
            break;
    }

    //posicion de ataque
    $('.animacionEnemy').empty().append(`<img ${style} class="${classEnemy}" src="assets/images//enemys/ruinas/${monster}/${animEnemy}.png"/>`);
    $('.animacionEnemyEfecto').empty().append(`<img class="${classAnim}" src="assets/images//enemys/ruinas/${monster}/${animSkill}.png"/>`);
    //animacion enemy
    $('.animacionEnemy').animate({
        right: `${initialSpot}`,
    }, 0, () => {
        $('.animacionEnemy').animate({
            right: `${initialSpot + 270}`,
        }, 600, () => {
            $('.animacionEnemy').animate({
                right: `${initialSpot + 330}`,
            }, 1000);
        });
    });

    //animacion enemigo efecto
    $('.animacionEnemyEfecto').animate({
        //opacity: 0.0,
    }, 400, () => {
        $('.animacionEnemyEfecto').animate({
            'margin-left': '-560',
            opacity: 1.0,
        }, 600, () => {
            $('.animacionEnemyEfecto').animate({
                'margin-left': '-590',
                //opacity: 0.0,
            }, 600);
        });
    });

    //animacion heroe
    $('.animacionHero').animate({
        right: '540',
    }, 600, () => {
        $('.animacionHero').animate({
            right: '580',
        }, 1000);
    });

    //animacion damage
    $(`.contenedorDamageHero`).animate({
        left: '610',
        top: '450',
        opacity: 0.8,
    }, 600, () => {
        $(`.contenedorDamageHero`).animate({
            left: '570',
            top: '400',
            opacity: 0.1,
        }, 1000);
    });

    //animacion background
    $('.battle').animate({
        'background-size': '2300',
    }, 1000);
    $('.battle').animate({
        'background-size': '1600',
    }, 1000, function () {
        ocultarAnimaciones();
        //devolver a posicion inicial
        $('.animacionEnemy').animate({
            right: '890',
        }, 0);
        $('.animacionEnemyEfecto').animate({
            right: '810',
        }, 0);
        $('.animacionHero').animate({
            right: '420',
        }, 0);
        $(`.contenedorDamageHero`).animate({
            left: '750',
            top: '510',
        }, 0);
        //remover clases
        $('.animacionHero').removeClass('col-3-hero');
        $('.animacionHero').removeClass('col-2-hero');
    })
}

//-----------------------------------------------------------//
//-----------------enemy-selection-to-atack------------------//
const selectionEnemy = (columna) => {
    //quitar todas las selecciones
    $(`#enemy1`).removeClass("columnaN2-hover");
    $(`#enemy2`).removeClass("columnaN2-hover");
    $(`#enemy3`).removeClass("columnaN2-hover");
    //agregar la actual
    $(`#enemy${columna}`).addClass("columnaN2-hover");

    //audio
    audios('enemyTurn');

    $('.columnaN2-hover').animate({
        'background-size': '250px',
    }, 500, () => {
        $('.columnaN2-hover').animate({
            'background-size': '200px',
        }, 500)
    })
}

//-----------------------------------------------------------//
//-------------------cambio-de-escenario---------------------//
//cambiar escenario
const cambiarEscenario = () => {
    //ocular plantilla de resultado
    $('#resultado').hide();
    $('.face-boss-container').hide();
    //cambiar clase de escenario
    $('#battle-hall').show();
    $('#battle-hall').removeClass('battle');
    $('#battle-hall').addClass('map');
    $('#BattleStateAll').show();
    //heroes y enemigos
    $('.column-container').hide();  
    //boton de combate
    $('#buttonCombat').hide();      
    //habilidades y estadisticas
    $('#statsHeroUp').hide();
    $('#statsHeroDown').hide();
    $('#statsEnemy').hide();
    //botones de mision
    $('.dungeons').show(); 
    //carga de pantalla
    //$('.').hide();
    $('#battle-hall').removeClass('pantalla-de-carga');
}

const mostrarResultados = () => {
    $('#battle-hall').hide();
    $('#BattleStateAll').hide();
    $('#final-raid-button').hide();

    //$('#selection').hide();
    $('.column-container').hide();  //heroes y enemigos
    $('#buttonCombat').hide();      //boton de combate

    //habilidades y estadisticas
    $('#statsHeroUp').hide();
    $('#statsHeroDown').hide();
    $('#statsEnemy').hide();

    $('#resultado').show();

    //audio
    audios('combatDown');
}
//imprimir resultado de combate
const guardarHP = (encuentro, enemy3OrBoss) => {
    $(`.face-${encuentro}`).empty().prepend(`
    <br>
    <h4>Salud Final:</h4>
    <p>${cruzado.name} tiene ${storageHP('hpHero1')} de vida</p>
    <p>${barbara.name} tiene ${storageHP('hpHero2')} de vida</p>
    <p>${arbalestera.name} tiene ${storageHP('hpHero3')} de vida</p>
    <br>
    <p>${esqueletoEscudero.name} tiene ${storageHP('hpEnemy1')} de vida</p>
    <p>${esqueletoGuerrero.name} tiene ${storageHP('hpEnemy2')} de vida</p>
    <p>${esqueletoArbalestero.name} tiene ${storageHP(enemy3OrBoss)} de vida</p>
    `);
}

//label-informacion del dungeon
const labelDungeonIn = (zona, info, objetivo, dificultad, onclick, mision) => {
    $('.text-slider').empty();
    $('.dungeon-slider-close').animate({
        width: '300',
    }, 1000, () => {
        $('.text-slider').fadeIn();
        if (zona === 'Ruinas') {
            $('.text-slider').prepend(`
            <img src="assets/images/interface/iconos/game.png" onclick="${onclick}">
            `);
        } else {
            $('.text-slider').prepend(`
            <h4 class="no-disponible">No disponible</h4>
            `);
        };
        $('.text-slider').prepend(`
        <h1>${zona}</h1>
        <p>${info}</p>
        <h4>Objetivo de mision</h4>
        <p>${objetivo}</p>
        <h4>Dificultad</h4>
        <p>Nivel ${dificultad}</p>
        `);
    });
    //quitar selecciones anteriores
    $(`.missionOne`).removeClass('mission-hover');
    $(`.missionTwo`).removeClass('mission-hover');
    $(`.missionThree`).removeClass('mission-hover');
    $(`.missionFour`).removeClass('mission-hover');
    //agregar nueva seleccion
    $(`.mission${mision}`).addClass('mission-hover');
}
const labelDungeonOff = () => {
    $('.dungeon-slider-close').animate({
        width: '0',
    }, 1000);
    $('.text-slider').fadeOut();
}
//funcion promesa para carga de escenario
const loadingScreen = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //cambiar clase de escenario
            $('#battle-hall').show();
            $('#battle-hall').removeClass('map');
            $('#battle-hall').addClass('pantalla-de-carga');
            //botones de mision
            $('.dungeons').hide();
            resolve({
                result: 1
            });
        }, time);
    });
}
//funcion promesa para carga de escenario
const dungeonIn = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //botones de mision
            $('.dungeons').hide();
            //cambiar clase de escenario
            $('#battle-hall').show();
            $('#battle-hall').removeClass('map');
            $('#battle-hall').addClass('battle');
            //sala de batalla
            $('#BattleStateAll').show();
            //heroes y enemigos
            $('.column-container').show();
            //barras de vida
            $('.vidaenemy').show();
            $('.heroLive').show();
            //boton de combate
            $('#buttonCombat').hide();
            //habilidades y estadisticas
            $('#statsHeroUp').show();
            $('#statsHeroDown').show();
            $('#statsEnemy').show();
            //resetear localStorage
            localStorageHP();
            //posisicion inicial de heroe
            position = 1;
            //face del encuentro
            face = 1;
            //ocultar skills
            $('#skillCruzado').hide();
            $('#skillBarbara').hide();
            $('#skillArbalestera').hide();
            //remover class bossç
            $('#enemy3').removeClass('columnaN3')
            //heroe inicial
            switchHero();
            $('#enemy1').empty().prepend('<img class="lenght" src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender.gif">');
            $('#enemy2').empty().prepend('<img class="lenght" src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_common.gif">');
            $('#enemy3').empty().prepend('<img class="lenght" src="assets/images/enemys/ruinas/esqueletoArbalestero/skeleton_arbalist.gif">');
            resolve({
                result: 1
            });
        }, time);
    });
}
//funcion asincronica para carga de escenario
const cargarEscenario = async () => {
    audios('combat_start');
    try {
        await loadingScreen(0);
        await dungeonIn(10000);
    } catch (error) {
        console.log(error);
    }
}
//barras de vida
const barraDeVida = (name, vida) => {
    $(`#vida${name}`).empty();
    for (let i = 1; i <= Math.round(vida / 2); i++) {
        $(`#vida${name}`).prepend(`<img src="assets/images/interface/iconos/health_pip_full.png" alt="healthSlot">`);
    };
}
barraDeVida(cruzado.name, cruzado.hP);
barraDeVida(barbara.name, barbara.hP);
barraDeVida(arbalestera.name, arbalestera.hP);
barraDeVida('hpEnemy1', esqueletoEscudero.hP);
barraDeVida('hpEnemy2', esqueletoGuerrero.hP);
barraDeVida('hpEnemy3', esqueletoArbalestero.hP);

//mapa del feudo (inicio)
//cambiarEscenario();
//heroe inicial
switchHero();

