$.holdReady(true)

const starscale_hp      = [1, 1.05,  1.12,  1.21,  1.35 ]
const starscale_attack  = [1, 1.1,   1.22,  1.36,  1.53 ]
const starscale_healing = [1, 1.075, 1.175, 1.295, 1.445]
const school_longname = {"Abydos": "Abydos High School", "Gehenna": "Gehenna Academy", "Hyakkiyako": "Allied Hyakkiyako Academy", "Millennium": "Millennium Science School", "RedWinter": "Red Winter Federal Academy", "Shanhaijing": "Shanhaijing Senior Secondary School", "Trinity": "Trinity General School", "Valkyrie": "Valkyrie Police Academy", "ETC": "Others"}

var student_db = {}
var pathJSON = "./data/"

$.getJSON("./data/student_data.json", function(result) {
    student_db = result
    $.holdReady(false)
})

var student
var studentSelectorModal

var stat_preview_stars = 3

$(document).ready(function() {
    studentSelectorModal = new bootstrap.Modal(document.getElementById("modStudents"), {})

    var urlVars = new URL(window.location.href).searchParams

    $(window).on('popstate', function() {
        var urlVars = new URL(window.location.href).searchParams
        loadStudent(urlVars.get("chara"))
    })

    if (urlVars.has("chara")) {
        loadStudent(urlVars.get("chara"))
    } else if (localStorage.getItem("chara")) {
        loadStudent(localStorage.getItem("chara"))
    } else {
        loadStudent("Haruna")
    }

    populateStudentList("none")
})

function hookTooltips() {
    //hook bs tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    })
}

function populateStudentList(grouping = "none") {
    
    if (grouping == "none") {
        var groupedResults
        groupedResults = student_db.students
        groupedResults.sort((a,b) => a.name_en > b.name_en)
    
        $("#ba-student-search-results").empty()
    
        var resultsHTML = `<div class="d-flex flex-row p-2">
        <ul class="ba-student-searchresult-grid align-top">
        `
    
        $.each(groupedResults, function(i, el){
            resultsHTML += `
            <li class="ba-student-searchresult-item"><img onclick="loadStudent('${el["name_dev"]}')" class="ba-student-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el["name_en"]}" src="images/student/icon/Student_Portrait_${el["name_dev"]}.png"></li>
            `
        })
    
        resultsHTML +=
            `
            </ul>
            </div>
            `
        $("#ba-student-search-results").append(resultsHTML)
    } else if (grouping == "school") {
        var groupedResults = {"Abydos": [], "Gehenna": [], "Hyakkiyako": [], "Millennium": [], "RedWinter": [], "Shanhaijing": [], "Trinity": [], "Valkyrie": [], "ETC": []}
        $.each(student_db.students, function(i, el){
            groupedResults[el.school].push(el)
        })

        $("#ba-student-search-results").empty()
    
        var resultsHTML = ''

        $.each(["Abydos", "Gehenna", "Hyakkiyako", "Millennium", "RedWinter", "Shanhaijing", "Trinity", "Valkyrie", "ETC"], function(i, el){

            resultsHTML += `
            <div class="d-flex flex-row">
            <img class="d-inline-block align-self-center me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${school_longname[el]}" src="images/schoolicon/School_Icon_${el.toUpperCase()}.png" style="height: 72px; width: auto; object-fit: contain;">
            <div class="flex-grow-1" ><ul class="ba-student-searchresult-grid align-top">
            `
            groupedResults[el].sort((a,b) => a.name_en > b.name_en)
            $.each(groupedResults[el], function(i2, el2){
                resultsHTML += `
                <li class="ba-student-searchresult-item"><img onclick="loadStudent('${el2["name_dev"]}')" class="ba-student-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el2["name_en"]}" src="images/student/icon/Student_Portrait_${el2["name_dev"]}.png"></li>
                `
            })

            resultsHTML +=
            `
            </ul></div></div>
            <div class="ba-student-searchresult-groupseparator"></div>
            `
        }) 

        resultsHTML +=
            `
            </div>
            `
        $("#ba-student-search-results").append(resultsHTML)

    } else if (grouping == "weapon") {
        var groupedResults = {"SG": [], "SMG": [], "AR": [], "GL": [], "HG": [], "SR": [], "RG": [], "MG": [], "MT": []}
        $.each(student_db.students, function(i, el){
            groupedResults[el.weapon_type].push(el)
        })

        $("#ba-student-search-results").empty()
    
        var resultsHTML = ''

        $.each(["SG", "SMG", "AR", "GL", "HG", "SR", "RG", "MG", "MT"], function(i, el){

            resultsHTML += `
            <div class="d-flex flex-row">
            <img class="d-inline-block align-self-center me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el}" src="images/weapontype/Weapon_Icon_${el}.png" style="height: 60px; width: auto; object-fit: contain;">
            <div class="flex-grow-1" ><ul class="ba-student-searchresult-grid align-top">
            `
            groupedResults[el].sort((a,b) => a.name_en > b.name_en)
            $.each(groupedResults[el], function(i2, el2){
                resultsHTML += `
                <li class="ba-student-searchresult-item"><img onclick="loadStudent('${el2["name_dev"]}')" class="ba-student-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el2["name_en"]}" src="images/student/icon/Student_Portrait_${el2["name_dev"]}.png"></li>
                `
            })

            resultsHTML +=
            `
            </ul></div></div>
            <div class="ba-student-searchresult-groupseparator"></div>
            `
        }) 

        resultsHTML +=
            `
            </div>
            `
        $("#ba-student-search-results").append(resultsHTML)

    } else if (grouping == "rarity") {
        var groupedResults = {"3": [], "2": [], "1": []}
        $.each(student_db.students, function(i, el){
            groupedResults[el.stars.toString()].push(el)
        })

        $("#ba-student-search-results").empty()
    
        var resultsHTML = ''

        $.each(["3", "2", "1"], function(i, el){

            resultsHTML += `
            <div class="d-flex flex-row">
            <img class="d-inline-block align-self-center me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el}" src="images/ui/Star_${el}.png" style="height: 32px; width: auto; object-fit: contain;">
            <div class="flex-grow-1" ><ul class="ba-student-searchresult-grid align-top">
            `
            groupedResults[el].sort((a,b) => a.name_en > b.name_en)
            $.each(groupedResults[el], function(i2, el2){
                resultsHTML += `
                <li class="ba-student-searchresult-item"><img onclick="loadStudent('${el2["name_dev"]}')" class="ba-student-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el2["name_en"]}" src="images/student/icon/Student_Portrait_${el2["name_dev"]}.png"></li>
                `
            })

            resultsHTML +=
            `
            </ul></div></div>
            <div class="ba-student-searchresult-groupseparator"></div>
            `
        }) 

        resultsHTML +=
            `
            </div>
            `
        $("#ba-student-search-results").append(resultsHTML)

    } else if (grouping == "role") {
        var groupedResults = {"Tank": [], "Attacker": [], "Healer": [], "Support": [], "T.S.": []}
        $.each(student_db.students, function(i, el){
            groupedResults[el.role].push(el)
        })

        $("#ba-student-search-results").empty()
    
        var resultsHTML = ''

        $.each(["Tank", "Attacker", "Healer", "Support", "T.S."], function(i, el){

            resultsHTML += `
            <div class="d-flex flex-row">
            <img class="d-inline-block align-self-center me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el}" src="images/tactical/Role_${el.replace("T.S.","TacticalSupport")}.png" style="height: 58px; width: auto; object-fit: contain;">
            <div class="flex-grow-1" ><ul class="ba-student-searchresult-grid align-top">
            `
            groupedResults[el].sort((a,b) => a.name_en > b.name_en)
            $.each(groupedResults[el], function(i2, el2){
                resultsHTML += `
                <li class="ba-student-searchresult-item"><img onclick="loadStudent('${el2["name_dev"]}')" class="ba-student-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el2["name_en"]}" src="images/student/icon/Student_Portrait_${el2["name_dev"]}.png"></li>
                `
            })

            resultsHTML +=
            `
            </ul></div></div>
            <div class="ba-student-searchresult-groupseparator"></div>
            `
        }) 

        resultsHTML +=
            `
            </div>
            `
        $("#ba-student-search-results").append(resultsHTML)

    } else if (grouping == "class") {
        var groupedResults = {"Striker": [], "Special": []}
        $.each(student_db.students, function(i, el){
            groupedResults[el.type].push(el)
        })

        $("#ba-student-search-results").empty()
    
        var resultsHTML = ''

        $.each(["Striker", "Special"], function(i, el){

            resultsHTML += `
            <div class="d-flex flex-row">
            <img class="d-inline-block align-self-center me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el}" src="images/ui/Class_${el}.png" style="height: 22px; width: 80px; object-fit: contain;">
            <div class="flex-grow-1" ><ul class="ba-student-searchresult-grid align-top">
            `
            groupedResults[el].sort((a,b) => a.name_en > b.name_en)
            $.each(groupedResults[el], function(i2, el2){
                resultsHTML += `
                <li class="ba-student-searchresult-item"><img onclick="loadStudent('${el2["name_dev"]}')" class="ba-student-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el2["name_en"]}" src="images/student/icon/Student_Portrait_${el2["name_dev"]}.png"></li>
                `
            })

            resultsHTML +=
            `
            </ul></div></div>
            <div class="ba-student-searchresult-groupseparator"></div>
            `
        }) 

        resultsHTML +=
            `
            </div>
            `
        $("#ba-student-search-results").append(resultsHTML)

    }



    hookTooltips()
}

function loadStudent(studentName) {

    student = find(student_db.students,"name_dev",studentName)

    if (student.length == 1) {
        console.log(student[0])
        student = student[0]

        $('#ba-student-img').attr('src', 'images/student/' + student.student_img)
        $('#ba-student-img-sm').attr('src', 'images/student/' + student.student_img)
        
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-student-container").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/${student.background_img}.jpg`

        $('#ba-student-name-en').text(student.name_en)
        $('#ba-student-name-jp').text(student.name_jp)
        $("#ba-student-class").attr("src", `images/ui/Class_${student.type}.png`)

        $("#ba-student-role-label").text(student.role)
        $("#ba-student-role-icon").attr("src", `images/tactical/Role_${student.role.replace("T.S.", "TacticalSupport")}.png`)

        if (student.attack_type == "Explosive") {
            $("#ba-student-attacktype").removeClass("ba-type-mystic ba-type-pierce").addClass("ba-type-explosive")
            $(".ba-skill").removeClass("ba-skill-yellow ba-skill-blue").addClass("ba-skill-red")
        } else if (student.attack_type == "Piercing") {
            $("#ba-student-attacktype").removeClass("ba-type-mystic ba-type-explosive").addClass("ba-type-pierce")
            $(".ba-skill").removeClass("ba-skill-red ba-skill-blue").addClass("ba-skill-yellow")
        } else if (student.attack_type == "Mystic") {
            $("#ba-student-attacktype").removeClass("ba-type-pierce ba-type-explosive").addClass("ba-type-mystic")
            $(".ba-skill").removeClass("ba-skill-yellow ba-skill-red").addClass("ba-skill-blue")
        }

        if (student.defense_type == "Light") {
            $("#ba-student-defensetype").removeClass("ba-type-mystic ba-type-pierce").addClass("ba-type-explosive")
        } else if (student.defense_type == "Heavy") {
            $("#ba-student-defensetype").removeClass("ba-type-mystic ba-type-explosive").addClass("ba-type-pierce")
        } else if (student.defense_type == "Special") {
            $("#ba-student-defensetype").removeClass("ba-type-pierce ba-type-explosive").addClass("ba-type-mystic")
        }
        
        $("#ba-student-school-label").text(student.school)
        $("#ba-student-school-img").attr("src", "images/schoolicon/School_Icon_" + student.school.toUpperCase().replace(" ","").replace("OTHERS", "ETC") + ".png")
        $('#ba-student-school-img').tooltip('dispose').tooltip({title: school_longname[student.school], placement: 'bottom'})
        $("#ba-student-position").text(student.position.toUpperCase())
        $("#ba-student-attacktype-label").text(student.attack_type)
        $("#ba-student-defensetype-label").text(student.defense_type)

        $("#ba-student-terrain-street").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.street_adaption + ".png")
        $("#ba-student-terrain-outdoor").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.outdoor_adaption + ".png")
        $("#ba-student-terrain-indoor").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.indoor_adaption + ".png")
        $('#ba-student-terrain-street').tooltip('dispose').tooltip({title: getAdaptionText('street', student.street_adaption), placement: 'left'})
        $('#ba-student-terrain-outdoor').tooltip('dispose').tooltip({title: getAdaptionText('outdoor', student.outdoor_adaption), placement: 'left'})
        $('#ba-student-terrain-indoor').tooltip('dispose').tooltip({title: getAdaptionText('indoor', student.indoor_adaption), placement: 'left'})

        if (student.uses_cover) {
            $("#ba-student-usescover-icon").show()
        } else {
            $("#ba-student-usescover-icon").hide()
        }

        $("#ba-student-weapontype-label").text(student.weapon_type)
        $(".ba-type-weapon").css("background-image", "url('images/weapontype/Weapon_Icon_" + student.weapon_type_img + ".png')")

        $("#ba-student-stars").attr("src", "images/ui/Star_" + student.stars + ".png")

        $("#ba-student-gear-1").attr("src", "images/equipment/Equipment_Icon_" + student.gear_1 + "_Tier1.png")
        $("#ba-student-gear-2").attr("src", "images/equipment/Equipment_Icon_" + student.gear_2 + "_Tier1.png")
        $("#ba-student-gear-3").attr("src", "images/equipment/Equipment_Icon_" + student.gear_3 + "_Tier1.png")
        $('#ba-student-gear-1').tooltip('dispose').tooltip({title: student.gear_1, placement: 'bottom'})
        $('#ba-student-gear-2').tooltip('dispose').tooltip({title: student.gear_2, placement: 'bottom'})
        $('#ba-student-gear-3').tooltip('dispose').tooltip({title: student.gear_3, placement: 'bottom'})


        //Skills
        $("#ba-skill-ex-name").text(student.skill_ex_name)
        $("#ba-skill-normal-name").text(student.skill_normal_name)
        $("#ba-skill-passive-name").text(student.skill_passive_name)
        $("#ba-skill-sub-name").text(student.skill_sub_name)

        student.skill_ex_cost[0] == student.skill_ex_cost[4] ? $("#ba-skill-ex-cost").removeClass("ba-skill-emphasis") : $("#ba-skill-ex-cost").addClass("ba-skill-emphasis")

        //Stats
        $('#ba-statpreview-level').text("Lv." + $("#ba-statpreview-levelrange").val())
        $('#ba-skill-level').text("Lv." + $("#ba-skillpreview-range").val())
        $('#ba-skill-ex-level').text("Lv." + $("#ba-skillpreview-exrange").val())
        $('#ba-weaponpreview-level').text("Lv." + $("#ba-weaponpreview-levelrange").val())
        $('#ba-bond-level').text($("#ba-bond-levelrange").val())

        //Weapon
        $("#ba-student-weapon-name").text(student.weapon_name_en)
        $("#ba-weapon-name-jp").text(student.weapon_name_jp)
        
        $("#ba-student-weapon-img").attr("src", `images/weapon/Weapon_Icon_${student.id}.png`)

        var url = new URL(window.location.href)

        if (url.searchParams.get("chara") !== student.name_dev) {
            url.searchParams.set("chara", student.name_dev)
            history.pushState(null, '', url)
        }
        
        $.each(student.weapon_bonus_stats, function(i, el) {
            $(`#ba-weapon-stat-${i+1}`).text(getStatName(student.weapon_bonus_stats[i]))
            $(`#ba-weapon-stat-${i+1}-amount`).text(student.weapon_bonus_stats_parameters[i][0])
        }) 

        if (student.weapon_bonus_stats.length > 2) {
            $('#ba-weapon-stat-row2').show()
        } else {
            $('#ba-weapon-stat-row2').hide()
        }

        //Profile
        $('#ba-student-fullname-en').text(student.fullname_en)
        $('#ba-student-fullname-jp').text(student.fullname_jp)
        $("#ba-profile-school-img").attr("src", "images/schoolicon/School_Icon_" + student.school.toUpperCase().replace(" ","").replace("OTHERS", "ETC") + ".png")
        $('#ba-student-schoolclub-label').text(`${school_longname[student.school]} / ${student.club_en}`)
        
        if (student.recollection_lobby) {
            $(".ba-student-lobby").show()
            $("#ba-student-lobby-img").attr("src", `images/student/lobby/Lobbyillust_Icon_${student.name_dev}_01_Small.png`)
            $("#ba-student-lobby-unlock").text(student.recollection_lobby)
        } else {
            $(".ba-student-lobby").hide()
        }
        
        $('#ba-student-profile-age').text(student.age)
        $('#ba-student-profile-birthday').text(student.birthday)
        $('#ba-student-profile-hobbies').text(student.hobbies)
        $('#ba-student-profile-height').text(student.height)
        $('#ba-student-profile-cv').text(student.cv)
        $('#ba-student-profile-illustrator').text(student.illustrator)

        $('#ba-student-bond-1').text(getStatName(student.bond_stat[0]))
        $('#ba-student-bond-2').text(getStatName(student.bond_stat[1]))

        document.title = `Schale DB | ${student.name_en}`

        recalculateWeaponPreview()
        recalculateStatPreview()
        recalculateSkillPreview()
        recalculateBondPreview()

        localStorage.setItem("chara", student.name_dev)
        studentSelectorModal.hide()
    }
}

function getAdaptionText(terrain, rank) {
    var text = 'Deals '
    switch (rank) {
        case "D":
            text += `20% less damage in ${terrain} terrain. `
            break
        case "C":
            text += `10% less damage in ${terrain} terrain.`
            break
        case "B":
            text += `normal damage in ${terrain} terrain.` 
            break
        case "A":
            text += `10% more damage in ${terrain} terrain.`
            break
        case "S":
            text += `20% more damage in ${terrain} terrain.` 
            break
        case "SS":
            text += `30% more damage in ${terrain} terrain.` 
            break
    }
    return text
}

function getStatName(stat) {
    switch (stat) {
        case "maxhp":
            return "Max HP"
        case "attack_power":
            return "Attack"
        case "defense_power":
            return "Defense"
        case "heal_power":
            return "Healing Power"
        default:
            return null
    }
}

function changeStatPreviewLevel(el) {
    $('#ba-statpreview-level').text("Lv." + el.value)
    recalculateStatPreview()
}

function changeSkillPreviewLevel(el) {
    $('#ba-skill-level').text("Lv." + el.value)
    recalculateSkillPreview()
}

function changeEXSkillPreviewLevel(el) {
    $('#ba-skill-ex-level').text("Lv." + el.value)
    recalculateSkillPreview()
}

function changeWeaponPreviewLevel(el) {
    $('#ba-weaponpreview-level').text("Lv." + el.value)
    recalculateWeaponPreview()
}

function changeBondLevel(el) {
    $('#ba-bond-level').text(el.value)
    recalculateBondPreview()
}

function recalculateWeaponPreview() {

    var level = $("#ba-weaponpreview-levelrange").val()

    var levelscale = ((level-1)/99).toFixed(4)

    $.each(student.weapon_bonus_stats, function(i, el) {
        $(`#ba-weapon-stat-${i+1}-amount`).text(Math.round(student.weapon_bonus_stats_parameters[i][0] + (student.weapon_bonus_stats_parameters[i][1]-student.weapon_bonus_stats_parameters[i][0]) * levelscale))
    }) 

}

function recalculateStatPreview() {

    var level = $("#ba-statpreview-levelrange").val()

    var levelscale = ((level-1)/99).toFixed(4)

    var maxHP = Math.ceil(Math.round(student.maxhp_1 + (student.maxhp_100-student.maxhp_1) * levelscale) * starscale_hp[stat_preview_stars-1])
    var attack = Math.ceil(Math.round(student.attack_power_1 + (student.attack_power_100-student.attack_power_1) * levelscale) * starscale_attack[stat_preview_stars-1])
    var defense = Math.round(student.defense_power_1 + (student.defense_power_100-student.defense_power_1) * levelscale)
    var healing = Math.ceil(Math.round(student.heal_power_1 + (student.heal_power_100-student.heal_power_1) * levelscale) * starscale_healing[stat_preview_stars-1])

    $('#ba-student-stat-maxhp').text(maxHP)
    $('#ba-student-stat-attack').text(attack)
    $('#ba-student-stat-defense').text(defense)
    $('#ba-student-stat-healing').text(healing)

    $('#ba-student-stat-accuracy').text(student.accuracy)
    $('#ba-student-stat-evasion').text(student.evasion)
    $('#ba-student-stat-crit').text(student.critical)
    $('#ba-student-stat-critdmg').text("200%")

    $('#ba-student-stat-stability').text(student.stability)
    $('#ba-student-stat-range').text(student.range)
    $('#ba-student-stat-ccpower').text("100%")
    $('#ba-student-stat-ccresist').text("100%")

    $('#ba-student-stat-ammo').text(student.ammo_count + " (" + student.ammo_cost + ")")
    $('#ba-student-stat-costrecovery').text(student.cost_recovery)
}

function recalculateSkillPreview() {
    
    var skillLevel = $("#ba-skillpreview-range").val()
    var skillLevelEX = $("#ba-skillpreview-exrange").val()

    $('#ba-skill-ex-icon').attr("src", "images/skill/" + student.skill_ex_icon)
    $('#ba-skill-normal-icon').attr("src", "images/skill/" + student.skill_normal_icon)
    $('#ba-skill-passive-icon').attr("src", "images/skill/" + student.skill_passive_icon)
    $('#ba-skill-sub-icon').attr("src", "images/skill/" + student.skill_sub_icon)

    $('#ba-skill-ex-description').html(getSkillText(student.skill_ex_description, student.skill_ex_parameters, skillLevelEX))
    $('#ba-skill-normal-description').html(getSkillText(student.skill_normal_description, student.skill_normal_parameters, skillLevel))
    $('#ba-skill-passive-description').html(getSkillText(student.skill_passive_description, student.skill_passive_parameters, skillLevel))
    $('#ba-skill-sub-description').html(getSkillText(student.skill_sub_description, student.skill_sub_parameters, skillLevel))

    $('#ba-skill-ex-cost').text(student.skill_ex_cost[skillLevelEX-1])
    
}

function recalculateBondPreview() {
    var level = $("#ba-bond-levelrange").val()
    var stat1 = 0, stat2 = 0

    for (let i = 1; i < Math.min(level,20); i++) {
        stat1 += student.bond_stat_value[i-1][0]
        stat2 += student.bond_stat_value[i-1][1]
    }

    $("#ba-student-bond-1-amount").text(stat1)
    $("#ba-student-bond-2-amount").text(stat2)    
}

function getSkillText(text, params, level) {
    
    var result = text
    var paramCount = 1
    var regex
    while (result.includes("<?"+paramCount+">")) {
        result = result.replace("<?"+paramCount+">", "<span class=\"ba-skill-emphasis\">" + params[paramCount-1][level-1] + "</span>")
        paramCount += 1
    }

    regex = /<d:(\w+)>/g
    result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Debuff_$1.png\">")

    regex = /<b:(\w+)>/g
    result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Buff_$1.png\">")

    regex = /<c:(\w+)>/g
    result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_CC_$1.png\">")

    regex = /<s:(\w+)>/g
    result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Special_$1.png\">")

    return result
}

function changeStatPreviewStars(stars) {
    stat_preview_stars = stars

    for (let i = 1; i <= 5; i++) {
        i <= stars ? $("#ba-statpreview-star-" + i).attr("src", "images/ui/Common_Icon_Formation_Star.png") : $("#ba-statpreview-star-" + i).attr("src", "images/ui/Common_Icon_Formation_Star_Disable.png")
    }
    
    recalculateStatPreview()
}

function find(obj, key, value) {
    var result = []

    $.each(obj, function(i, el) {
        if (el[key] == value) {
            result.push(el)
        }
    })

    return result
}