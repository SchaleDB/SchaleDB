$.holdReady(true)

var data = {}
var raid, region, regionID
var difficulty = 0
const json_list = {
    common: "./data/common.json",
    raids: "./data/raids.json"
}

loadJSON(json_list, function(result) {
    data = result
    $.holdReady(false)
})

$(document).ready(function() {
  
    var urlVars = new URL(window.location.href).searchParams

    if (localStorage.getItem("region")) {
        loadRegion(localStorage.getItem("region"))
    } else {
        loadRegion(0)
    }

    $("#ba-navbar-placeholder").load('nav.html', function() {
        $("#ba-navbar-link-raids").addClass('active')
        $(`#ba-navbar-regionselector-${regionID}`).addClass("active")
        $("#ba-navbar-regionselector-label").text(region.name)
    })

    $(window).on('popstate', function() {
        var urlVars = new URL(window.location.href).searchParams
        loadRaid(urlVars.get("raid"))
    })

    if (urlVars.has("raid")) {
        loadRaid(urlVars.get("raid"))
    } else if (localStorage.getItem("raid")) {
        loadRaid(localStorage.getItem("raid"))
    } else {
        loadRaid("Binah")
    }

    populateRaidList("none")

    window.setTimeout(function(){$("#loading-cover").fadeOut()},500)

    $('input[type=range]').trigger('oninput')

    var header = $('#ba-raid-header')
    window.addEventListener('scroll', _.throttle(function () {
        if (((header.offset().top - $(this).scrollTop()) <= 56) != header.hasClass("stuck"))
        header.toggleClass("stuck", (header.offset().top - $(this).scrollTop()) <= 56);
    }, 100));

})

function changeRegion(regID) {
    regionID = regID
    localStorage.setItem("region", regionID)
    if (!raid.released[regionID]) {
        localStorage.setItem("raid", "Binah")
        location.href = "raids.html?raid=Binah"
    } else {
        location.reload()
    }
}

function loadRegion(regID) {
    regionID = regID
    region = data.common.regions[regionID]
}

function loadRaid(raidName) {

    raid = find(data.raids,"name_dev",raidName)[0]

    if (raid.released_insane[regionID]) {
        $('#ba-raid-difficulty-5').toggleClass('disabled', false)
    } else {
        $('#ba-raid-difficulty-5').toggleClass('disabled', true)
        if (difficulty == 5)  {
            difficulty = 0
            $('#ba-raid-difficulty-5').toggleClass('active', false)
            $('#ba-raid-difficulty-0').toggleClass('active', true)
        }
    }

    $('#ba-raid-affiliation').text(raid.affiliation)
    $('#ba-raid-name-en').text(raid.name_en)
    $('#ba-raid-name-jp').text(raid.name_jp)

    $('#ba-raid-header').css('background-image', `url(images/raid/Boss_Portrait_${raid.name_dev}_LobbyBG.png`)
    $('#ba-raid-header-img').attr('src', `images/raid/Boss_Portrait_${raid.name_dev}${difficulty == 5 ? "_Insane" : ""}_Lobby.png`)

    if (difficulty == 5) {
        if (raid.attack_type_insane == "Normal") {
            $("#ba-raid-attacktype").removeClass("ba-type-explosive ba-type-mystic ba-type-pierce").addClass("ba-type-normal")
        } else if (raid.attack_type_insane == "Explosive") {
            $("#ba-raid-attacktype").removeClass("ba-type-mystic ba-type-pierce ba-type-normal").addClass("ba-type-explosive")
        } else if (raid.attack_type_insane == "Piercing") {
            $("#ba-raid-attacktype").removeClass("ba-type-mystic ba-type-explosive ba-type-normal").addClass("ba-type-pierce")
        } else if (raid.attack_type_insane == "Mystic") {
            $("#ba-raid-attacktype").removeClass("ba-type-pierce ba-type-explosive ba-type-normal").addClass("ba-type-mystic")
        }
        $("#ba-raid-attacktype-label").text(raid.attack_type_insane)
        $('#ba-raid-attacktype').tooltip('dispose').tooltip({title: getRichTooltip("images/tactical/StrategyObjectBuff_Attack.png", `${raid.attack_type_insane}`, 'Attack Type', getTypeText(raid.attack_type_insane)), placement: 'top', html: true})
    
    } else {
        $("#ba-raid-attacktype").removeClass("ba-type-explosive ba-type-mystic ba-type-pierce").addClass("ba-type-normal")
        $("#ba-raid-attacktype-label").text(raid.attack_type)
        $('#ba-raid-attacktype').tooltip('dispose').tooltip({title: getRichTooltip("images/tactical/StrategyObjectBuff_Attack.png", `${raid.attack_type}`, 'Attack Type', getTypeText(raid.attack_type)), placement: 'top', html: true})    
    }


    if (raid.defense_type == "Light") {
        $("#ba-raid-defensetype").removeClass("ba-type-mystic ba-type-pierce").addClass("ba-type-explosive")
    } else if (raid.defense_type == "Heavy") {
        $("#ba-raid-defensetype").removeClass("ba-type-mystic ba-type-explosive").addClass("ba-type-pierce")
    } else if (raid.defense_type == "Special") {
        $("#ba-raid-defensetype").removeClass("ba-type-pierce ba-type-explosive").addClass("ba-type-mystic")
    }
    var statsHtml = ''
    var tabsHtml = ''
    raid.enemies.forEach(function(el,i) {
        tabsHtml += `<button class="nav-link ${i==0 ? "active" : ""}" data-bs-toggle="tab" href="#ba-raid-enemy-${i}">${el.name_en}</button>`
        statsHtml += `
        <div id="ba-raid-enemy-${i}" class="tab-pane fade ${i==0 ? "show active" : ""}">
        ${el.name_en}
        <table class="table ba-stats mb-4">
            <tbody>
                <tr>
                    <td width="30%">Level</td>
                    <td width="20%">${el.stats["level"][difficulty]}</td>
                    <td width="30%">HP</td>
                    <td width="20%">${el.stats["maxhp"][difficulty]}</td>
                </tr>
                <tr>
                    <td width="30%">Attack</td>
                    <td width="20%">${el.stats["attack_power"][difficulty]}</td>
                    <td width="30%">Defense</td>
                    <td width="20%">${el.stats["defense_power"][difficulty]}</td>
                </tr>
                <tr>
                    <td width="30%">Critical Resist</td>
                    <td width="20%">${el.stats["crit_res"][difficulty]}</td>
                    <td width="30%">Critical Dmg. Res.</td>
                    <td width="20%">${el.stats["crit_dmg_res"][difficulty]}</td>
                </tr>
                <tr>
                    <td width="30%">Stagger</td>
                    <td width="70%" colspan="3">${el.stats["stagger"][difficulty]}</td>
                </tr>
            </tbody>
        </table></div>`
    })

    $('#ba-raid-enemy-tabs').empty().html(tabsHtml)
    $('#ba-raid-enemy-stats').empty().html(statsHtml)


    $("#ba-raid-defensetype-label").text(raid.defense_type)
    $('#ba-raid-defensetype').tooltip('dispose').tooltip({title: getRichTooltip("images/tactical/StrategyObjectBuff_Defense.png", `${raid.defense_type}`, 'Defense Type', getTypeText(raid.defense_type)), placement: 'top', html: true})

    var skillsHTML = ''
    var skillList = (difficulty == 5) ? raid.skills_insane : raid.skills
    skillList.forEach(function(el, i) {
        skillsHTML += `
        <div class="d-flex flex-row align-items-center mt-2">
            <img class="ba-skill d-inline-block me-3" src="images/raid/skill/${el.icon}.png">
            <div class="d-inline-block">
                <div>
                    <h4 class="me-2 d-inline">${el.name_en}</h4>
                </div>
                <div class="mt-1">
                    <p class="d-inline" style="font-style: italic;">${el.type} Skill</p>
                </div>
            </div>
        </div>
        <p class="mt-1 mb-2 p-1">${getSkillText(el.description_en, el.parameters, difficulty+1)}</p>
        `
        if (i != skillList.length-1) {
            skillsHTML += '<div style="border-top: lightgrey 1px solid; min-width: 100%"></div>'
        }
    })
    $('#ba-raid-skills').empty().html(skillsHTML)
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    var url = new URL(window.location.href)

    if (url.searchParams.get("raid") !== raid.name_dev) {
        url.searchParams.set("raid", raid.name_dev)
        history.pushState(null, '', url)
    }

    document.title = `Schale DB | ${raid.name_en}`

    localStorage.setItem("raid", raid.name_dev)
    //studentSelectorModal.hide()

}

function changeRaidDifficulty(difficultyId) {
    difficulty = difficultyId
    loadRaid(raid.name_dev)
}

function populateRaidList(order) {
    var html = ''

    data.raids.forEach(function(el) {
        if (el.released[regionID]) {
            html += `<div class="ba-raid-list-entry my-2 text-shadow" style="background-image: url('images/raid/${el.background_img}.png')" onclick="loadRaid('${el.name_dev}')"><img class="ba-raid-portrait" src="images/raid/${el.portrait_img}.png"><span style="color:#fff;font-size:26px;font-weight:bold;position:absolute;left:10px;top:3px;">${el.name_en}</span></div>`
        }
    })

    $("#ba-raid-list").html(html)
}