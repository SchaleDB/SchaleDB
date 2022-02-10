$.holdReady(true)

var data = {}
var raid, region, regionID
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

    $('#ba-raid-affiliation').text(raid.affiliation)
    $('#ba-raid-name-en').text(raid.name_en)
    $('#ba-raid-name-jp').text(raid.name_jp)

    $('#ba-raid-header').css('background-image', `url(images/raid/${raid.background_img}.png`)
    $('#ba-raid-header-img').attr('src', `images/raid/${raid.portrait_img}.png`)

    if (raid.attack_type == "Normal") {
        $("#ba-raid-attacktype").removeClass("ba-type-explosive ba-type-mystic ba-type-pierce").addClass("ba-type-normal")
    }

    if (raid.defense_type == "Light") {
        $("#ba-raid-defensetype").removeClass("ba-type-mystic ba-type-pierce").addClass("ba-type-explosive")
    } else if (raid.defense_type == "Heavy") {
        $("#ba-raid-defensetype").removeClass("ba-type-mystic ba-type-explosive").addClass("ba-type-pierce")
    } else if (raid.defense_type == "Special") {
        $("#ba-raid-defensetype").removeClass("ba-type-pierce ba-type-explosive").addClass("ba-type-mystic")
    }

    $("#ba-raid-attacktype-label").text(raid.attack_type)
    $('#ba-raid-attacktype').tooltip('dispose').tooltip({title: getTypeText(raid.attack_type), placement: 'top', html: true})
    $("#ba-raid-defensetype-label").text(raid.defense_type)
    $('#ba-raid-defensetype').tooltip('dispose').tooltip({title: getTypeText(raid.defense_type), placement: 'top', html: true})

    var skillsHTML = ''
    raid.skills.forEach(function(el, i) {
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
        <p class="mt-1 mb-2 p-1">${getSkillText(el.description_en, el.parameters, 4)}</p>
        `
        if (i != raid.skills.length-1) {
            skillsHTML += '<div style="border-top: lightgrey 1px solid; min-width: 100%"></div>'
        }
    })
    $('#ba-raid-skills').empty().html(skillsHTML)
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip()
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

function populateRaidList(order) {
    var html = ''

    data.raids.forEach(function(el) {
        if (el.released[regionID]) {
            html += `<div class="ba-raid-list-entry my-2 text-shadow" style="background-image: url('images/raid/${el.background_img}.png')" onclick="loadRaid('${el.name_dev}')"><img class="ba-raid-portrait" src="images/raid/${el.portrait_img}.png"><span style="color:#fff;font-size:26px;font-weight:bold;position:absolute;left:10px;top:3px;">${el.name_en}</span></div>`
        }
    })

    $("#ba-raid-list").html(html)
}