$.holdReady(true)

var data = {}
var raid, region, regionID, userLang
var difficulty = 0
const json_list = {
    students: "./data/students.json",
    common: "./data/common.json",
    localization: "./data/localization.json"
}

loadJSON(json_list, function(result) {
    data = result
    $.holdReady(false)
})

if (localStorage.getItem("theme")) {
    $('body').toggleClass("theme-dark", (localStorage.getItem("theme") == 'dark'))
}

$(document).ready(function() {
  
    var urlVars = new URL(window.location.href).searchParams

    if (localStorage.getItem("region")) {
        loadRegion(localStorage.getItem("region"))
    } else {
        loadRegion(0)
    }

    if (localStorage.getItem("theme")) {
        darkTheme = localStorage.getItem("theme")    
    } else {
        darkTheme = 'auto'
    }

    if (localStorage.getItem("language")) {
        userLang = localStorage.getItem("language")
    } else {
        if (window.navigator.language == 'ja') {
            userLang = 'ja'
        } else {
            userLang = 'en'
        }  
    }

    toggleDarkTheme(darkTheme)
    $('body').toggleClass("reduced-motion", false)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (darkTheme == 'auto') {
            $('body').toggleClass("theme-dark", event.matches)
            document.querySelector('meta[name="theme-color"]').setAttribute('content', $('body').hasClass('theme-dark') ? '#212529' : '#dee2e6')
        }
    })

    $("#ba-navbar-placeholder").load('nav.html', function() {

        loadLanguage(userLang)
        $("#ba-navbar-link-items").addClass('active')
        $(`#ba-navbar-regionselector-${regionID}`).addClass("active")
        $(`#ba-navbar-languageselector-${userLang}`).addClass("active")
        $(`#ba-navbar-themeswitcher-${darkTheme}`).addClass("active")
        $('#ba-navbar-contrast-toggle').prop('checked', highContrast)
    })

    $(window).on('popstate', function() {
        var urlVars = new URL(window.location.href).searchParams
        loadItem(urlVars.get("item"))
    })

    if (urlVars.has("item")) {
        loadItem(urlVars.get("item"))
    } else if (localStorage.getItem("item")) {
        loadItem(localStorage.getItem("item"))
    } else {
        loadItem("")
    }

    populateItemList()

    window.setTimeout(function(){$("#loading-cover").fadeOut()},50)

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
    // if (!raid.released[regionID]) {
    //     localStorage.setItem("raid", "Binah")
    //     location.href = "raids.html?raid=Binah"
    // } else {
    //     location.reload()
    // }
}

function loadRegion(regID) {
    regionID = regID
    region = data.common.regions[regionID]
}

function loadStudent(name) {
    window.location.href = `students.html?chara=${name}`
}

function loadItem(id) {
    var mode = '', item
    if (id >= 100000) {
        mode = 'furniture'
        item = find(data.common.furniture, "id", id-100000)[0]
    } else {
        mode = 'items'
        item = find(data.common.items, "id", id)[0]
    } 

    $('#ba-item-name').html(item[`name_${userLang}`])
    $('#ba-item-type').html(mode == 'items' ? item[`type`] : item[`type`] + ' ' + item[`category`])
    $('#ba-item-rarity').html(getRarityTier(item.rarity))
    $('#ba-item-icon').removeClass('ba-item-n ba-item-r ba-item-sr ba-item-ssr').addClass('ba-item-'+item.rarity.toLowerCase())
    $('#ba-item-icon-img').attr('src', `images/${mode}/${item.icon}.png`)
    $('#ba-item-description').html(item[`description_${userLang}`])
    $('#ba-item-usage').empty()
    if (item.type == 'Artifact' || item.type == 'Skill Blu&#8209;ray' || item.type == 'Skill Book') {
        $('#ba-item-usage').html(getUsedByStudents(item))
        $('.ba-item-student').tooltip({html: true})
    }
    if (mode == 'furniture') $('#ba-item-usage').html(`<i>Comfort: ${item.comfort}</i>`)  

    var url = new URL(window.location.href)

    if (!url.searchParams.get("item")) {
        url.searchParams.set("item", id)
        history.replaceState(null, '', url)  
    } else if (url.searchParams.get("item") != id) {
        url.searchParams.set("item", id)
        history.pushState(null, '', url)
    }
    
}

function populateItemList() {
    html = ''
    $.each(data.common.items, function(i,el) {
        if (el.released[regionID])
        html += getItemIconHTML(el)
    })
    $.each(data.common.furniture, function(i,el) {
        html += getFurnitureItemIconHTML(el)
    })
    $('#ba-item-list').html(html)
}

function getItemIconHTML(item) {
    var html
    html = `<div class="drop-shadow d-inline-block"><div class="ba-item m-2" style="position: relative; cursor:pointer;" data-bs-toggle="tooltip" data-bs-placement="top" onclick="loadItem(${item.id})"><img class="ba-item-${item.rarity.toLowerCase()}" src="images/items/${item.icon}.png"></div></div>`
    return html
}

function getFurnitureItemIconHTML(item) {
    var html
    html = `<div class="drop-shadow d-inline-block"><div class="ba-item m-2" style="position: relative; cursor:pointer;" data-bs-toggle="tooltip" data-bs-placement="top" onclick="loadItem(${item.id+100000})"><img class="ba-item-${item.rarity.toLowerCase()}" src="images/furniture/${item.icon}.png"></div></div>`
    return html
}

function getUsedByStudents(item) {
    var html = '<div class="mb-2"><i>Used by the following students:</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">'
    $.each(data.students, function(i,el){
        if (!el.released[regionID])
        return
        let uses = false
        for (let i = 0; i < el.skill_ex_upgrade_material.length; i++) {
            for (let j = 0; j < el.skill_ex_upgrade_material[i].length; j++) {
                if (item.id == el.skill_ex_upgrade_material[i][j]) {
                    uses = true
                    break
                }
            }
            if (uses)
            break
        }
        if (!uses)
        for (let i = 0; i < el.skill_upgrade_material.length; i++) {
            for (let j = 0; j < el.skill_upgrade_material[i].length; j++) {
                if (item.id == el.skill_upgrade_material[i][j]) {
                    uses = true
                    break
                }
            }
            if (uses)
            break
        }
        if (uses)
        html += `<div class="ba-item ba-item-student drop-shadow d-inline-block" style="position: relative; cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" onclick="loadStudent('${el['name_dev']}')" title="${getRichTooltip(`images/student/collection/Student_Portrait_${el['name_dev']}_Collection.png`, el[`name_${userLang}`], 'Character', getRarityStars(el.stars), el[`profile_${userLang}`] ? el[`profile_${userLang}`].split('\n')[0] : el['profile_ja'].split('\n')[0], 50, 'circle')}"><img class="ba-item-icon m-0 mx-1" src="images/student/collection/Student_Portrait_${el['name_dev']}_Collection.png"></div>
        `
    })
    html += "</div>"
    return html
}