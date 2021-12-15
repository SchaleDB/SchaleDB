$.holdReady(true)

const starscale_hp      = [1, 1.05,  1.12,  1.21,  1.35 ]
const starscale_attack  = [1, 1.1,   1.22,  1.36,  1.53 ]
const starscale_healing = [1, 1.075, 1.175, 1.295, 1.445]
const school_longname = {"Abydos": "Abydos High School", "Gehenna": "Gehenna Academy", "Hyakkiyako": "Allied Hyakkiyako Academy", "Millennium": "Millennium Science School", "RedWinter": "Red Winter Federal Academy", "Shanhaijing": "Shanhaijing Senior Secondary School", "Trinity": "Trinity General School", "Valkyrie": "Valkyrie Police School", "Arius": "Arius Satellite School", "ETC": "Others"}

const skill_ex_upgrade_credits = [80000, 500000, 3000000, 10000000]
const skill_upgrade_credits = [5000, 7500, 60000, 90000, 300000, 450000, 1500000, 2400000, 4000000]

const stat_friendlyname = {
    "maxhp": "Max HP",
    "attack_power": "Attack",
    "defense_power": "Defense",
    "heal_power": "Healing Power",
    "maxhp_percent": "Max HP",
    "attack_power_percent": "Attack",
    "heal_power_percent": "Healing Power",
    "accuracy": "Accuracy",
    "critical": "Critical Chance",
    "critical_damage": "Critical Damage",
    "healing_received": "Healing Received",
    "cc_power_percent": "CC Power",
    "cc_resist_percent": "CC Resistance",
    "critical_resist": "Critical Resistance",
    "critical_damage_resist": "Critical Damage Resistance"
}

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

    document.getElementById("modStudents").addEventListener('shown.bs.modal', function (event) {
        if (window.matchMedia('(min-width: 768px)').matches) {
            $('#ba-student-search-text').focus()
        }
    })

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

    window.setTimeout(function(){$("#loading-cover").fadeOut()},500)

    $('input[type=range]').trigger('oninput')
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
        var groupedResults, searchTerm
        searchTerm = $('#ba-student-search-text').val()
        groupedResults = student_db.students
        groupedResults.sort((a,b) => a.name_en.localeCompare(b.name_en))
    
        $("#ba-student-search-results").empty()
    
        var resultsHTML = `<div class="d-flex flex-row justify-content-center">
        <ul class="ba-student-searchresult-grid align-top">
        `
    
        $.each(groupedResults, function(i, el){
            if (searchTerm == "" || el["name_en"].toLowerCase().includes(searchTerm.toLowerCase()))
            resultsHTML += `
            <li class="ba-student-searchresult-item"><div onclick="loadStudent('${el["name_dev"]}')" class="ba-student-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el["name_en"]}"><img src="images/student/icon/Student_Portrait_${el["name_dev"]}.png"></div></li>
            `
        })
    
        resultsHTML +=
            `
            </ul>
            </div>
            `
        $("#ba-student-search-results").append(resultsHTML)
    } else {
        var groupedResults = {}
        switch (grouping) {
            case "school":
                groupedResults = {"Abydos": [], "Gehenna": [], "Hyakkiyako": [], "Millennium": [], "RedWinter": [], "Shanhaijing": [], "Trinity": [], "Valkyrie": [], "ETC": []}
                $.each(student_db.students, function(i, el){
                    groupedResults[el.school].push(el)
                })
                break
            case "weapon":
                groupedResults = {"SG": [], "SMG": [], "AR": [], "GL": [], "HG": [], "SR": [], "RG": [], "MG": [], "MT": []}
                $.each(student_db.students, function(i, el){
                    groupedResults[el.weapon_type].push(el)
                })
                break
            case "rarity":
                groupedResults = {"_3": [], "_2": [], "_1": []}
                $.each(student_db.students, function(i, el){
                    groupedResults['_'+el.stars.toString()].push(el)
                })
                break
            case "role":
                groupedResults = {"Tank": [], "Attacker": [], "Healer": [], "Support": [], "T.S.": []}
                $.each(student_db.students, function(i, el){
                    groupedResults[el.role].push(el)
                })
                break
            case "class":
                groupedResults = {"Striker": [], "Special": []}
                $.each(student_db.students, function(i, el){
                    groupedResults[el.type].push(el)
                })
                break
            case "attacktype":
                groupedResults = {"Explosive": [], "Piercing": [], "Mystic": []}
                $.each(student_db.students, function(i, el){
                    groupedResults[el.attack_type].push(el)
                })
                break
            case "defensetype":
                groupedResults = {"Light": [], "Heavy": [], "Special": []}
                $.each(student_db.students, function(i, el){
                    groupedResults[el.defense_type].push(el)
                })
                break
            case "excost":
                groupedResults = {"_2": [], "_3": [], "_4": [], "_5": [], "_6": [], "_7": [], "_10": []}
                $.each(student_db.students, function(i, el){
                    groupedResults['_'+el.skill_ex_cost[4]].push(el)
                })
                break
        }

        $("#ba-student-search-results").empty()
    
        var resultsHTML = ''

        $.each(groupedResults, function(key, val){
            
            var groupIcon, groupName, groupIconStyle

            switch (grouping) {
                case "school":
                    groupIcon = `images/schoolicon/School_Icon_${key.toUpperCase()}.png`
                    groupIconStyle= 'height:42px; width: auto; margin-bottom: -2px;'
                    groupName = school_longname[key]
                    break
                case "weapon":
                    groupIcon = `images/weapontype/Weapon_Icon_${key.toUpperCase()}.png`
                    groupIconStyle= 'height:42px; width: auto;'
                    groupName = key
                    break
                case "rarity":
                    groupIcon = `images/ui/Star${key}.png`
                    groupIconStyle= 'height:26px; width: auto; margin-bottom: 2px;'
                    groupName = ""
                    break
                case "role":
                    groupIcon = `images/tactical/Role_${key.replace("T.S.","TacticalSupport")}.png`
                    groupIconStyle= 'height:34px; width: auto;'
                    groupName = key
                    break
                case "class":
                    groupIcon = `images/ui/Class_${key}.png`
                    groupIconStyle= 'height: 18px; width: 80px; margin-bottom: 4px;'
                    groupName = ""
                    break
                case "attacktype":
                    groupIcon = ''
                    groupIconStyle = ''
                    groupName = key
                    break
                case "defensetype":
                    groupIcon = ''
                    groupIconStyle = ''
                    groupName = key
                    break
                case "excost":
                    groupIcon = ''
                    groupIconStyle = ''
                    groupName = key.substr(1)
                    break
            }

            resultsHTML += `
            <div class="d-flex flex-row align-items-center justify-content-center ba-student-search-group ${grouping == "attacktype" || grouping == "defensetype" || grouping == "class" ? 'ba-student-search-group-'+key.toLowerCase() : ''}">
            <img class="d-inline-block align-self-center me-2" src="${groupIcon}" style="${groupIconStyle}">
            <p style="font-size: larger; font-weight: 500; margin-bottom: 0px;">${groupName}</p>
            </div>
            <div class="d-flex flex-row justify-content-center p-2">

            <ul class="ba-student-searchresult-grid align-top">
            `
            groupedResults[key].sort((a,b) => a.name_en.localeCompare(b.name_en))
            $.each(groupedResults[key], function(i2, el2){
                resultsHTML += `
                <li class="ba-student-searchresult-item"><div onclick="loadStudent('${el2["name_dev"]}')" class="ba-student-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${el2["name_en"]}"><img src="images/student/icon/Student_Portrait_${el2["name_dev"]}.png"></div></li>
                `
            })

            resultsHTML +=
            `
            </ul></div></div>
            `
        }) 

        resultsHTML +=
            `
            </div>
            `
        $("#ba-student-search-results").append(resultsHTML)
    }
 
    $(".ba-student-icon").each(function(i,el) {
        $(el).tooltip()
    })
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
        //$('#ba-student-school-img').tooltip('dispose').tooltip({title: school_longname[student.school], placement: 'bottom'})
        $("#ba-student-position").text(student.position.toUpperCase())
        $("#ba-student-attacktype-label").text(student.attack_type)
        $("#ba-student-defensetype-label").text(student.defense_type)

        $("#ba-student-terrain-urban-icon").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.urban_adaption + ".png")
        $("#ba-student-terrain-field-icon").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.field_adaption + ".png")
        $("#ba-student-terrain-indoor-icon").attr("src", "images/tactical/Ingame_Emo_Adaptresult" + student.indoor_adaption + ".png")
        $('#ba-student-terrain-urban').tooltip('dispose').tooltip({title: getAdaptionText('urban', student.urban_adaption), placement: 'top', html: true})
        $('#ba-student-terrain-field').tooltip('dispose').tooltip({title: getAdaptionText('field', student.field_adaption), placement: 'top', html: true})
        $('#ba-student-terrain-indoor').tooltip('dispose').tooltip({title: getAdaptionText('indoor', student.indoor_adaption), placement: 'top', html: true})

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
        $("#ba-skill-ex-name").text(student.skill_ex_name_en != null ? student.skill_ex_name_en : student.skill_ex_name_jp)
        $("#ba-skill-normal-name").text(student.skill_normal_name_en != null ? student.skill_normal_name_en : student.skill_normal_name_jp)
        $("#ba-skill-passive-name").text(student.skill_passive_name_en != null ? student.skill_passive_name_en : student.skill_passive_name_jp)
        $("#ba-skill-sub-name").text(student.skill_sub_name_en != null ? student.skill_sub_name_en : student.skill_sub_name_jp)     

        $('#ba-skill-ex-icon').attr("src", "images/skill/" + student.skill_ex_icon)
        $('#ba-skill-normal-icon').attr("src", "images/skill/" + student.skill_normal_icon)
        $('#ba-skill-passive-icon').attr("src", "images/skill/" + student.skill_passive_icon)
        $('#ba-skill-sub-icon').attr("src", "images/skill/" + student.skill_sub_icon)

        student.skill_ex_cost[0] == student.skill_ex_cost[4] ? $("#ba-skill-ex-cost").removeClass("ba-skill-emphasis") : $("#ba-skill-ex-cost").addClass("ba-skill-emphasis")

        //Weapon
        $("#ba-student-weapon-name").text(student.weapon_name_en)
        $("#ba-weapon-name-jp").text(student.weapon_name_jp)
        $("#ba-student-weapon-img").attr("src", `images/weapon/Weapon_Icon_${student.id}.png`)

        if (student.weapon_skill_passive_description != null) {
            $("#ba-weapon-skill-passive-name").text(student.skill_passive_name_en != null ? student.skill_passive_name_en + '＋' : student.skill_passive_name_jp + '＋')
            $('#ba-weapon-skill-passive-icon').attr("src", "images/skill/" + student.skill_passive_icon)
            recalculateWeaponSkillPreview()
        }

        $('#ba-weapon-bonus-terrain-type').attr("src", `images/tactical/Terrain_${student.weapon_bonus_terrain_type}.png`)
        $('#ba-weapon-bonus-terrain-adaption').attr("src", `images/tactical/Ingame_Emo_Adaptresult${student.weapon_bonus_terrain_adaption}.png`)
        $('#ba-weapon-bonus-terrain-adaption-description').html(`${student.weapon_bonus_terrain_type.charAt(0).toUpperCase()+student.weapon_bonus_terrain_type.substr(1)} terrain affinity ${eval('student.'+student.weapon_bonus_terrain_type+'_adaption')} → <b>${student.weapon_bonus_terrain_adaption}</b><br>(${getAdaptionText(student.weapon_bonus_terrain_type, student.weapon_bonus_terrain_adaption)})`)

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

        if (student.profile_en) {
            $('#ba-student-profile-text').text(student.profile_en)
        } else {
            $('#ba-student-profile-text').text("")
        }     

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
        recalculateEXSkillPreview()
        recalculateBondPreview()

        changeGearLevel(1, document.getElementById('ba-info-gear1-range'))
        changeGearLevel(2, document.getElementById('ba-info-gear2-range'))
        changeGearLevel(3, document.getElementById('ba-info-gear3-range'))
        
        localStorage.setItem("chara", student.name_dev)
        studentSelectorModal.hide()
    }
}

function getAdaptionText(terrain, rank) {
    var text = 'Deals '
    switch (rank) {
        case "D":
            text += `<b>20% less</b> damage in ${terrain} terrain.`
            break
        case "C":
            text += `<b>10% less</b> damage in ${terrain} terrain.<br>Cover is <b>15%</b> more effective.`
            break
        case "B":
            text += `normal damage in ${terrain} terrain.<br>Cover is <b>30%</b> more effective.` 
            break
        case "A":
            text += `<b>10% more</b> damage in ${terrain} terrain.<br>Cover is <b>45%</b> more effective.`
            break
        case "S":
            text += `<b>20% more</b> damage in ${terrain} terrain.<br>Cover is <b>60%</b> more effective.` 
            break
        case "SS":
            text += `<b>30% more</b> damage in ${terrain} terrain.<br>Cover is <b>75%</b> more effective.` 
            break
    }
    return text
}

function getStatName(stat) {
    return stat_friendlyname[stat]
}

function getFormattedStatAmount(val) {
    return Number.isInteger(val) ? val : `${parseFloat((val*100).toFixed(2))}%`
}

function changeGearLevel(slot, el) {
    var geartype = eval('student.gear_'+slot)
    var gearobj = find(student_db.gear, "type", geartype)[0]
    $(`#ba-info-gear${slot}-icon`).attr("src", `images/equipment/Equipment_Icon_${geartype}_Tier${el.value}.png`)
    $(`#ba-info-gear${slot}-icon-label`).text(`T${el.value}`)
    $(`#ba-info-gear${slot}-name`).text(`${gearobj.items[el.value-1].name_en}`)
    var desc = ""
    $(gearobj.items[el.value-1].bonus_stats).each(function(i){
        desc += `${getStatName(gearobj.items[el.value-1].bonus_stats[i])} <b>+${getFormattedStatAmount(gearobj.items[el.value-1].bonus_stats_parameters[i][1])}</b>, `
    })
    $(`#ba-info-gear${slot}-description`).html(desc.substring(0, desc.length-2))
    if ($('#ba-statpreview-includegear').prop('checked')) {
        recalculateStatPreview()
    }    
}

function changeStatPreviewLevel(el) {
    $('#ba-statpreview-level').text("Lv." + el.value)
    recalculateStatPreview()
}

function changeSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-skill-level').text("")
        $('#ba-skill-level-max').show()
    } else {
        $('#ba-skill-level').text("Lv." + el.value)
        $('#ba-skill-level-max').hide()
    }
    recalculateSkillPreview()
}

function changeWeaponSkillPreviewLevel(el) {
    $('#ba-weapon-skill-level').text("Lv." + el.value)
    if (el.value == el.max) {
        $('#ba-weapon-skill-level').text("")
        $('#ba-weapon-skill-level-max').show()
    } else {
        $('#ba-weapon-skill-level').text("Lv." + el.value)
        $('#ba-weapon-skill-level-max').hide()
    }
    recalculateWeaponSkillPreview()
}

function changeEXSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-skill-ex-level').text("")
        $('#ba-skill-ex-level-max').show()
    } else {
        $('#ba-skill-ex-level').text("Lv." + el.value)
        $('#ba-skill-ex-level-max').hide()
    }
    recalculateEXSkillPreview()
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

    var bonus = {
        "maxhp_percent": 1,
        "attack_power_percent": 1,
        "heal_power_percent": 1,
        "maxhp": 0,
        "attack_power": 0,
        "defense_power": 0,
        "heal_power": 0,
        "accuracy": 0,
        "critical": 0,
        "critical_damage": 0,
        "healing_received": 0,
        "cc_power_percent": 1,
        "cc_resist_percent": 1,
        "critical_resist": 0,
        "critical_damage_resist": 0
    }

    var level = $("#ba-statpreview-levelrange").val()
    var levelscale = ((level-1)/99).toFixed(4)

    var maxHP = Math.ceil(Math.round(student.maxhp_1 + (student.maxhp_100-student.maxhp_1) * levelscale) * starscale_hp[stat_preview_stars-1])
    var attack = Math.ceil(Math.round(student.attack_power_1 + (student.attack_power_100-student.attack_power_1) * levelscale) * starscale_attack[stat_preview_stars-1])
    var defense = Math.round(student.defense_power_1 + (student.defense_power_100-student.defense_power_1) * levelscale)
    var healing = Math.ceil(Math.round(student.heal_power_1 + (student.heal_power_100-student.heal_power_1) * levelscale) * starscale_healing[stat_preview_stars-1])

    if ($('#ba-statpreview-includegear').prop('checked')) {
        var gear = []
        var tier = 1

        gear[0] = find(student_db.gear,"type",student.gear_1)[0]
        gear[1] = find(student_db.gear,"type",student.gear_2)[0]
        gear[2] = find(student_db.gear,"type",student.gear_3)[0]

        $.each(gear, function(i, el) {
            tier = $(`#ba-info-gear${i+1}-range`).val()
            for (let j = 0; j < el.items[tier-1].bonus_stats.length; j++) {
                bonus[el.items[tier-1].bonus_stats[j]] += el.items[tier-1].bonus_stats_parameters[j][1]    
            }
        })
    }

    if ($('#ba-statpreview-includebond').prop('checked')) {
        var bondlevel = $("#ba-bond-levelrange").val()
        for (let i = 1; i < Math.min(bondlevel,20); i++) {
            bonus[student.bond_stat[0]] += student.bond_stat_value[i-1][0]
            bonus[student.bond_stat[1]] += student.bond_stat_value[i-1][1]
        }
    }

    if ($('#ba-statpreview-includeweapon').prop('checked')) {
        var weaponlevel = $("#ba-weaponpreview-levelrange").val()
        var weaponlevelscale = ((weaponlevel-1)/99).toFixed(4)
        $.each(student.weapon_bonus_stats, function(i, el) {
            bonus[student.weapon_bonus_stats[i]] += Math.round(student.weapon_bonus_stats_parameters[i][0] + (student.weapon_bonus_stats_parameters[i][1]-student.weapon_bonus_stats_parameters[i][0]) * weaponlevelscale)
        }) 
    }

    $('#ba-student-stat-maxhp').text(Math.round((maxHP+bonus["maxhp"])*bonus["maxhp_percent"]))
    $('#ba-student-stat-attack').text(Math.round((attack+bonus["attack_power"])*bonus["attack_power_percent"]))
    $('#ba-student-stat-defense').text(defense+bonus["defense_power"])
    $('#ba-student-stat-healing').text(Math.round((healing+bonus["heal_power"])*bonus["heal_power_percent"]))

    $('#ba-student-stat-accuracy').text(student.accuracy+bonus["accuracy"])
    $('#ba-student-stat-evasion').text(student.evasion)
    $('#ba-student-stat-crit').text(student.critical+bonus["critical"])
    $('#ba-student-stat-critdmg').text(`${(student.critical_dmg+bonus["critical_damage"])/100}%`)

    $('#ba-student-stat-stability').text(student.stability)
    $('#ba-student-stat-range').text(student.range)
    $('#ba-student-stat-ccpower').text(`${(10000*bonus["cc_power_percent"])/100}%`)
    $('#ba-student-stat-ccresist').text(`${(10000*bonus["cc_resist_percent"])/100}%`)

    $('#ba-student-stat-ammo').text(student.ammo_count + " (" + student.ammo_cost + ")")
    $('#ba-student-stat-costrecovery').text(student.cost_recovery)
}

function recalculateEXSkillPreview() {
    var skillLevelEX = $("#ba-skillpreview-exrange").val()

    $('#ba-skill-ex-description').html(getSkillText(student.skill_ex_description, student.skill_ex_parameters, skillLevelEX))
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip()
    })
    $('#ba-skill-ex-materials').empty()

    if (skillLevelEX >= 2) {
        var html = ''
        $.each(student.skill_ex_upgrade_material[skillLevelEX-2], function(i, el) {
            var item = find(student_db.items,"id",el)[0]
            html += getMaterialIconHTML(item.rarity, item.icon, item.name_en, student.skill_ex_upgrade_amount[skillLevelEX - 2][i])
        })
        html += getMaterialIconHTML('N', 'Currency_Icon_Gold', 'Credits', abbreviateNumber(skill_ex_upgrade_credits[skillLevelEX - 2]))

        $('#ba-skill-ex-materials').html(html)
        $('#ba-skill-ex-materials div').each(function(i,el) {
            $(el).tooltip()
        })
    } else {
        $('#ba-skill-ex-materials').html('<span class="pb-2">No materials required.</span>')
    }
    $('#ba-skill-ex-cost').text(student.skill_ex_cost[skillLevelEX-1])

}


function getMaterialIconHTML(rarity, icon, name, amount) {
    var html
    html = `<div class="me-2" style="position: relative;" data-bs-toggle="tooltip" data-bs-placement="top" title="${name}">
            <img class="ba-material-icon" style="background-image: url('images/ui/Card_Item_Bg_${rarity}.png');"
            src="images/items/${icon}.png"><span class="ba-material-label">&times;${amount}</span></div>
            `
    return html
}

function recalculateSkillPreview() {
    var skillLevel = $("#ba-skillpreview-range").val()

    $('#ba-skill-normal-description').html(getSkillText(student.skill_normal_description, student.skill_normal_parameters, skillLevel))
    $('#ba-skill-passive-description').html(getSkillText(student.skill_passive_description, student.skill_passive_parameters, skillLevel))
    $('#ba-skill-sub-description').html(getSkillText(student.skill_sub_description, student.skill_sub_parameters, skillLevel))

    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip()
    })

    $('#ba-skill-materials').empty()
    if (skillLevel >= 2 && skillLevel < 10) {
        var html = ''
        $.each(student.skill_upgrade_material[skillLevel-2], function(i, el) {
            var item = find(student_db.items,"id",el)[0]
            html += getMaterialIconHTML(item.rarity, item.icon, item.name_en, student.skill_upgrade_amount[skillLevel - 2][i])
        })
        html += getMaterialIconHTML('N', 'Currency_Icon_Gold', 'Credits', abbreviateNumber(skill_upgrade_credits[skillLevel - 2]))

        $('#ba-skill-materials').html(html)
        $('#ba-skill-materials div').each(function(i,el) {
            $(el).tooltip()
        })
    } else if (skillLevel == 10) {
        var html = ''
        var item = find(student_db.items,"id",9999)[0]
        html += getMaterialIconHTML(item.rarity, item.icon, item.name_en, 1)
        html += getMaterialIconHTML('N', 'Currency_Icon_Gold', 'Credits', abbreviateNumber(skill_upgrade_credits[skillLevel - 2]))

        $('#ba-skill-materials').html(html)
        $('#ba-skill-materials div').each(function(i,el) {
            $(el).tooltip()
        })
    } else {
        $('#ba-skill-materials').html('<span class="pb-2">No materials required.</span>')
    }
}

function recalculateWeaponSkillPreview() {
    var skillLevel = $("#ba-weapon-skillpreview-range").val()
    $('#ba-weapon-skill-passive-description').html(getSkillText(student.weapon_skill_passive_description, student.weapon_skill_passive_parameters, skillLevel))
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip()
    })
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

    regex = /[0-9.]+[%s]/g
    result = result.replaceAll(regex, function(match) {return `<strong>${match}</strong>`})

    while (result.includes("<?"+paramCount+">")) {
        result = result.replace("<?"+paramCount+">", "<span class=\"ba-skill-emphasis\">" + params[paramCount-1][level-1] + "</span>")
        paramCount += 1
    }

    regex = /<d:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-debuff" data-bs-toggle="tooltip" data-bs-placement="top" title="${student_db.buffs['Debuff_'+capture].tooltip}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Debuff_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${student_db.buffs['Debuff_'+capture].name}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Debuff_$1.png\">")

    regex = /<b:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-buff" data-bs-toggle="tooltip" data-bs-placement="top" title="${student_db.buffs['Buff_'+capture].tooltip}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Buff_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${student_db.buffs['Buff_'+capture].name}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Buff_$1.png\">")

    regex = /<c:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-cc" data-bs-toggle="tooltip" data-bs-placement="top" title="${student_db.buffs['CC_'+capture].tooltip}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_CC_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${student_db.buffs['CC_'+capture].name}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_CC_$1.png\">")

    regex = /<s:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-special" data-bs-toggle="tooltip" data-bs-placement="top" title="${student_db.buffs['Special_'+capture].tooltip}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Special_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${student_db.buffs['Special_'+capture].name}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Special_$1.png\">")

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

function abbreviateNumber(number) {
    var result = number, th = 0, suffix = ['', 'K', 'M', 'B']
    while (result >= 1000) {
        th++
        result /= 1000
    }
    return result + suffix[th]
}