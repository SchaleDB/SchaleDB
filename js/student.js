$.holdReady(true)

const starscale_hp      = [1, 1.05,  1.12,  1.21,  1.35 ]
const starscale_attack  = [1, 1.1,   1.22,  1.36,  1.53 ]
const starscale_healing = [1, 1.075, 1.175, 1.295, 1.445]

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
    populateStudentList("none")
    loadStudent("Haruna")
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
        var groupedResults = {"Abydos": [], "Gehenna": [], "Hyakkiyako": [], "Millennium": [], "Red Winter": [], "Shanhaijing": [], "Trinity": [], "Valkyrie": [], "Others": []}
        $.each(student_db.students, function(i, el){
            groupedResults[el.school].push(el)
        })

        $("#ba-student-search-results").empty()
    
        var resultsHTML = ''

        $.each(["Abydos", "Gehenna", "Hyakkiyako", "Millennium", "Red Winter", "Shanhaijing", "Trinity", "Valkyrie", "Others"], function(i, el){

            resultsHTML += `
            <div class="d-flex flex-row">
            <img class="d-inline-block align-self-center me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el}" src="images/schoolicon/School_Icon_${el.toUpperCase().replace(" ","").replace("OTHERS", "ETC")}.png" style="height: 72px; width: auto; object-fit: contain;">
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
        //$('#ba-student-spr').style.setProperty('--student-spr', url("images/student/' + student.student_img + '"))
        $("body").css('background-image', 'url("images/background/' + student.background_img + '.jpg")')

        $('#ba-student-name-en').text(student.name_en)
        $('#ba-student-name-jp').text(student.name_jp)

        if (student.type == "Striker") {
            $("#ba-student-class").text("STRIKER")
            $("#ba-student-class").removeClass("ba-type-special").addClass("ba-type-striker")
        } else if (student.type == "Special") {
            $("#ba-student-class").text("SPECIAL")
            $("#ba-student-class").removeClass("ba-type-striker").addClass("ba-type-special")
        }

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
        $("#ba-student-position").text(student.position.toUpperCase())
        $("#ba-student-attacktype-label").text(student.attack_type)
        $("#ba-student-defensetype-label").text(student.defense_type)

        $("#ba-student-terrain-street").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.street_adaption + ".png")
        $("#ba-student-terrain-outdoor").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.outdoor_adaption + ".png")
        $("#ba-student-terrain-indoor").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.indoor_adaption + ".png")


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
        $('#ba-student-gear-1').tooltip('dispose').tooltip({title: student.gear_1})
        $('#ba-student-gear-2').tooltip('dispose').tooltip({title: student.gear_2})
        $('#ba-student-gear-3').tooltip('dispose').tooltip({title: student.gear_3})


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


        //Weapon
        $("#ba-student-weapon-name").text(student.weapon_name)
        $("#ba-student-weapon-img").attr("src", `images/weapon/Weapon_Icon_${student.id}.png`)
        


        recalculateStatPreview()
        recalculateSkillPreview()

        studentSelectorModal.hide()
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