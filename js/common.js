$.holdReady(true)

const starscale_hp      = [1, 1.05,  1.12,  1.21,  1.35 ]
const starscale_attack  = [1, 1.1,   1.22,  1.36,  1.53 ]
const starscale_healing = [1, 1.075, 1.175, 1.295, 1.445]
const terrain_adaption = ["D","C","B","A","S","SS"]
const raid_level = [17, 25, 35, 50, 70, 80]
const label_smalltext_threshold = {'en':11, 'ja':5}
const label_enemy_smalltext_threshold = {'en':12, 'ja':6}
const terrain_dmg_bonus = {D: 0.8, C: 0.9, B: 1, A: 1.1, S: 1.2, SS: 1.3}
const terrain_block_bonus = {D: 0, C: 15, B: 30, A: 45, S: 60, SS: 75}
const skill_ex_upgrade_credits = [80000, 500000, 3000000, 10000000]
const skill_upgrade_credits = [5000, 7500, 60000, 90000, 300000, 450000, 1500000, 2400000, 4000000]
const event_area = {1: 'Quest', 2: 'Invasion'}
const enemy_rank = {'Champion': 1, 'Elite': 2, 'Minion': 3}
const max_gifts = 35
const module_list = ['home','students','raids','stages','items','craft']

const stat_friendlyname = {
    "maxhp": "Max HP",
    "attack_power": "Attack",
    "defense_power": "Defense",
    "heal_power": "Healing",
    "maxhp_percent": "Max HP",
    "attack_power_percent": "Attack",
    "heal_power_percent": "Healing",
    "accuracy": "Accuracy",
    "critical": "Critical Rate",
    "critical_damage": "Critical Damage",
    "healing_received": "Recovery Rate",
    "cc_power_percent": "CC Power",
    "cc_resist_percent": "CC Resistance",
    "critical_resist": "Critical Res.",
    "critical_damage_resist": "Critical Dmg. Res."
}

var data = {}
const json_list = {
    common: "./data/common.json",
    raids: "./data/raids.json",
    students: "./data/students.json",
    localization: "./data/localization.json",
    stages: "./data/stages.json",
    enemies: "./data/enemies.json",
    items: "./data/items.json",
    furniture: "./data/furniture.json",
    formations: "./data/formations.json",
    crafting: "./data/crafting.json",
    tss_vehicles: "./data/tss_vehicles.json"
}

var loadedModule, student, studentList, loadedItem, loadedStage, loadedCraftNode, region, regionID, userLang, student_bondalts, darkTheme, highContrast, raid, selectedEnemy
var searchResultsCount = 0, searchResultsSelection = 0
var studentSelectorModal, statPreviewModal, showVehicleStats = false
var header
var raid_difficulty = 0
var stat_preview_stars = 3
var stat_preview_weapon_stars = 1

var search_options = {
    "groupby": "none",
    "sortby": "default",
    "sortby_dir": 1,
    "filter": {
        "type": {
            "Striker": false,
            "Special": false
        },
        "role": {
            "Tank": false,
            "Attacker": false,
            "Healer": false,
            "Support": false,
            "TacticalSupport": false,
        },
        "stars": {
            3: false,
            2: false,
            1: false,
        },
        "attack_type": {
            "Explosive": false,
            "Piercing": false,
            "Mystic": false,
        },
        "defense_type": {
            "Light": false,
            "Heavy": false,
            "Special": false,
        },
        "school": {
            "Abydos": false,
            "Gehenna": false,
            "Hyakkiyako": false,
            "Millennium": false,
            "RedWinter": false,
            "Shanhaijing": false,
            "Trinity": false,
            "Valkyrie": false,
            "SRT": false,
            "Others": false,
        },
        "weapon_type": {
            "SG": false,
            "SMG": false,
            "AR": false,
            "GL": false,
            "HG": false,
            "SR": false,
            "RG": false,
            "MG": false,
            "MT": false,
        },
        "is_limited": {
            0: false,
            1: false,
            2: false,
        },
    }
}

loadJSON(json_list, function(result) {
    data = result
    $.holdReady(false)
})

if (localStorage.getItem("theme")) {
    $('body').toggleClass("theme-dark", (localStorage.getItem("theme") == 'dark'))
}

$(document).ready(function() {
    studentSelectorModal = new bootstrap.Modal(document.getElementById("modStudents"), {})
    statPreviewModal = new bootstrap.Modal(document.getElementById("modStatPreviewSettings"), {})
    header = $(".card-header")
  
    if (localStorage.getItem("region")) {
        loadRegion(localStorage.getItem("region"))
    } else {
        loadRegion(0)
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
    data.students.sort((a,b) => a["name_"+userLang].localeCompare(b["name_"+userLang]))
    studentList = data.students.map(x => x)
    if (localStorage.getItem("theme")) {
        darkTheme = localStorage.getItem("theme")    
    } else {
        darkTheme = 'auto'
    }
    toggleDarkTheme(darkTheme)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (darkTheme == 'auto') {
            $('body').toggleClass("theme-dark", event.matches)
            document.querySelector('meta[name="theme-color"]').setAttribute('content', $('body').hasClass('theme-dark') ? '#212529' : '#dee2e6')
        }
    })

    $('body').toggleClass("reduced-motion", false)
    if (localStorage.getItem("high_contrast")) {
        highContrast = (localStorage.getItem("high_contrast") == "true")
    } else {
        highContrast = (!CSS.supports('backdrop-filter', 'blur(1px)')) || window.matchMedia('(prefers-contrast: more)').matches 
    }
    $('body').toggleClass("high-contrast", highContrast)
    
    $(`#ba-navbar-regionselector-${regionID}`).addClass("active")
    $(`#ba-navbar-languageselector-${userLang}`).addClass("active")
    $(`#ba-navbar-themeswitcher-${darkTheme}`).addClass("active")
    $('#ba-navbar-contrast-toggle').prop('checked', highContrast)

    $(window).on('popstate', loadModuleFromURL)
    loadModuleFromURL()
})

function loadModuleFromURL() {
    var urlVars = new URL(window.location.href).searchParams
    if (urlVars.get("chara")) {
        loadStudent(urlVars.get("chara"))
    } else if (urlVars.get("item")) {
        loadItem(urlVars.get("item"))
    } else if (urlVars.get("raid")) {
        loadRaid(urlVars.get("raid"))
    } else if (urlVars.get("stage")) {
        loadStage(urlVars.get("stage"))
    } else if (urlVars.get("craftnode")) {
        loadCraft(urlVars.get("craftnode"))
    } else {
        loadLastModule()
    }
}

function loadLastModule() {
    if (localStorage.getItem("module") && module_list.includes(localStorage.getItem("module"))) {
        loadModule(localStorage.getItem("module"))
    } else {
        loadModule('home')
    }
}

function loadModule(moduleName, entry=null) {
    if (moduleName == 'students') {
        loadedModule = 'students'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-students").addClass('active')
        $("#loaded-module").load('students.html', function() {
            loadRegion(regionID)
            loadLanguage(userLang)
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (entry != null) {
                loadStudent(entry)
            } else if (urlVars.has("chara")) {
                loadStudent(urlVars.get("chara"))
            } else if (localStorage.getItem("chara")) {
                loadStudent(localStorage.getItem("chara"))
            } else {
                loadStudent("Aru")
            }
        
            populateStudentList()
        
            if (localStorage.getItem("chara_groupby")) {
                searchOptionSet('groupby', localStorage.getItem("chara_groupby"), false)
            } else {
                searchOptionSet('groupby', 'none', false)
            }
        
            if (localStorage.getItem("chara_sortby_dir")) {
                search_options["sortby_dir"] = parseInt(localStorage.getItem("chara_sortby_dir"))
            }

            if (localStorage.getItem("chara_sortby")) {
                searchSetOrder(localStorage.getItem("chara_sortby"), false, false)
            } else {
                searchSetOrder('default', false, false)
            }
        
            updateStudentList()
        
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
        
            $('input[type=range]').trigger('oninput')
        
            $('#ba-student, #ba-student-list-btn').show()
        })
    } else if (moduleName == 'items') {
        loadedModule = 'items'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-items").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_CraftChamber_Night.jpg`
        $("#loaded-module").load('items.html', function() {
            loadLanguage(userLang)
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (entry != null) {
                loadItem(entry)
            } else if (urlVars.has("item")) {
                loadItem(urlVars.get("item"))
            } else if (localStorage.getItem("item")) {
                loadItem(localStorage.getItem("item"))
            } else {
                loadItem(1)
            }
            populateItemList()
            $('.ba-item-list').addClass('fade')
            $('.ba-item-list.active').addClass('show')
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            $('#ba-item-list-container, #ba-item-details-container').show()
        })
    } else if (moduleName == 'raids') {
        loadedModule = 'raids'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-raids").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_Raid.jpg`
        $("#loaded-module").load('raids.html', function() {
            loadLanguage(userLang)
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (entry != null) {
                loadRaid(entry)
            } else if (urlVars.has("raid")) {
                loadRaid(urlVars.get("raid"))
            } else if (localStorage.getItem("raid")) {
                loadRaid(localStorage.getItem("raid"))
            } else {
                loadRaid("Binah")
            }
            populateRaidList()
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
        })
    } else if (moduleName == 'stages') {
        loadedModule = 'stages'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-stages").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_Raid.jpg`
        $("#loaded-module").load('stages.html', function() {
            loadLanguage(userLang)
            if (region.weaponlevel_max == 0) {
                $('#ba-stages-list-tab-schooldungeon').hide()
            }
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (entry != null) {
                loadStage(entry)
            } else if (urlVars.has("stage")) {
                loadStage(urlVars.get("stage"))
            } else if (localStorage.getItem("stage")) {
                loadStage(localStorage.getItem("stage"))
            } else {
                loadStage(1011101)
            }
            populateStageList()
            $('.ba-item-list').addClass('fade')
            $('.ba-item-list.active').addClass('show')
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
        })
    } else if (moduleName == 'craft') {
        loadedModule = 'craft'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-craft").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_CraftChamber_Night.jpg`
        $("#loaded-module").load('craft.html', function() {
            loadLanguage(userLang)
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (entry != null) {
                loadCraft(entry)
            } else if (urlVars.has("craftnode")) {
                loadCraft(urlVars.get("craftnode"))
            } else if (localStorage.getItem("craftnode")) {
                loadCraft(localStorage.getItem("craftnode"))
            } else {
                loadCraft(1)
            }
            populateCraftList()
            $('.ba-craft-list').addClass('fade')
            $('.ba-craft-list.active').addClass('show')
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            $('#ba-craft-list-container, #ba-craft-details-container').show()
        })
    } else {
        loadedModule = 'home'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-home").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_View_Kivotos.jpg`
        $("#loaded-module").load('home.html', function() {
            loadLanguage(userLang)
            loadRegion(regionID)
            var gachatext = "Character Banner\n", gachalistHtml = ""
            var currentTime = new Date().getTime()/1000, dateOptions = {month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short"}
            $.each(data.common.regions[regionID].current_gacha, function(i, el){
                if (currentTime >= el.start && currentTime < el.end) {
                    for (let j = 0; j < el.characters.length; j++) {
                        var char = find(data.students, "id", el.characters[j])[0]
                        gachalistHtml += getStudentListCardHTML(char)
                    }
                    gachatext += new Date(el.start*1000).toLocaleString([], dateOptions)+' - '+new Date(el.end*1000).toLocaleString([], dateOptions)
                    gachatext += `<br>Ends in <b>${duration(el.end-currentTime)}</b>.`
                }
            })
        
            $('#ba-home-gacha-text').html(gachatext)
            $('#ba-home-gacha-list').html(gachalistHtml)

            var raidText = "Total Assault\n", raidHtml = ""
            $('#ba-home-raid').hide()
            $.each(data.common.regions[regionID].current_raid, function(i, el){
                if (currentTime >= el.start && currentTime < el.end) {
                    $('#ba-home-raid').show()
                    var raid = find(data.raids, "id", el.raid)[0]
                    raidHtml += getRaidCardHTML(raid, el.terrain)
                    raidText += new Date(el.start*1000).toLocaleString([], dateOptions)+' - '+new Date(el.end*1000).toLocaleString([], dateOptions)
                    raidText += `<br>Ends in <b>${duration(el.end-currentTime)}</b>.`
                }
            })

            $('#ba-home-raid-text').html(raidText)
            $('#ba-home-raid-list').html(raidHtml)

            //birthdays
            var birthdaysHtml = ''
            var currentDate = new Date()
            currentDate.setHours(0, 0, 0, 0)
            var nextWeek = new Date()
            nextWeek.setHours(0, 0, 0, 0)
            nextWeek.setDate(currentDate.getDate()+7)
            birthdayStudents = []
            $.each(data.students, function(i, el){
                if (el["released"][regionID]) {
                    var nextBirthday = getNextBirthdayDate(el.birthday)
                    if (nextBirthday.getTime() < nextWeek.getTime() && nextBirthday.getTime() >= currentDate.getTime())
                    birthdayStudents.push(el)
                }
            })
            if (birthdayStudents.length > 0) {
                birthdayStudents.sort((a,b) => getNextBirthdayDate(a.birthday).getTime() - getNextBirthdayDate(b.birthday).getTime())
                for (let i = 0; i < birthdayStudents.length; i++) {
                    birthdaysHtml += '<div class="d-flex flex-column mx-1">'+getStudentIconSmall(birthdayStudents[i])+'<div class="ba-panel mt-1 mx-1 p-1 text-center">'+getNextBirthdayDate(birthdayStudents[i].birthday).toLocaleDateString([], {month: "numeric", day: "numeric"})+'</div></div>'
                }
                $('#ba-home-birthdays-list').html(birthdaysHtml)
            } else {
                $('#ba-home-birthdays').hide()
            }
            
            $('.ba-item-student').tooltip({html: true})
            //

            $('#ba-home-server-info').text(`Current Events (${getLocalStringIfAvailable(data.common.regions[regionID], 'name')} Server)`)
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            var url = new URL(window.location.href)
    
            if (url.searchParams.toString() != '') {
                url.searchParams.forEach((v,k) => url.searchParams.delete(k))
                history.pushState(null, '', url)
            }
            document.title = `Schale DB | Home`
            $('#ba-navbar-content').collapse('hide')
        })
    }
    localStorage.setItem("module", loadedModule)
}

function getNextBirthdayDate(birthday) {
    var todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)
    var birthdayDate = new Date()
    birthdayDate.setHours(0, 0, 0, 0)
    birthdayDate.setMonth(parseInt(birthday.split('/')[0])-1,parseInt(birthday.split('/')[1]))
    birthdayDate.setFullYear(birthdayDate.getMonth() < todayDate.getMonth() ? todayDate.getFullYear()+1 : todayDate.getFullYear())
    return birthdayDate
}

function duration(seconds) {
    let totalSeconds = seconds
    let days = Math.floor(totalSeconds/86400)
    totalSeconds -= days*86400
    let hours = Math.floor(totalSeconds/3600)
    totalSeconds -= hours*3600
    let minutes = Math.floor(totalSeconds/60)
    return `${days} days, ${hours} hours and ${minutes} minutes`
}

function hookTooltips() {
    //hook bs tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    })
}

function populateStudentList() {

    var resultsHTML = ''

    $.each(data.students, function(i, el){
        if (el["released"][regionID])
        resultsHTML += getStudentListCardHTML(el)
    })

    // resultsHTML += `<div id="ba-student-select-header1" class="ba-student-group-header p-2" style="font-size: medium;grid-column: 1/-1;order: 0;"><h2>Abydos</h2></div>`
    resultsHTML += `<div id="ba-student-select-noresult" class="p-2" style="font-size: medium;display:none;grid-column: 1/-1;">No results.</div>`
    $("#ba-student-select-grid").html(resultsHTML)
    
}

function updateStudentList() {
    var grouping = search_options["groupby"]
    var dir = search_options["sortby_dir"]
    var searchTerm = $('#ba-student-search-text').val()
    var sortfunction

    switch (search_options["sortby"]) {
        case "default":
            sortfunction = ((a,b) => (a.default_order - b.default_order)*dir)
            break
        case "name":
            sortfunction = ((a,b) => a["name_"+userLang].localeCompare(b["name_"+userLang])*dir)
            break
        case "attack":
            sortfunction = ((a,b) => (b.attack_power_100 - a.attack_power_100)*dir)
            break
        case "defense":
            sortfunction = ((a,b) => (b.defense_power_100 - a.defense_power_100)*dir)
            break
        case "maxhp":
            sortfunction = ((a,b) => (b.maxhp_100 - a.maxhp_100)*dir)
            break
        case "healing":
            sortfunction = ((a,b) => (b.heal_power_100 - a.heal_power_100)*dir)
            break
        case "crit":
            sortfunction = ((a,b) => (b.critical - a.critical)*dir)
            break
        case "stability":
            sortfunction = ((a,b) => (b.stability - a.stability)*dir)
            break
        case "range":
            sortfunction = ((a,b) => (b.range - a.range)*dir)
            break
        case "accuracy":
            sortfunction = ((a,b) => (b.accuracy - a.accuracy)*dir)
            break
        case "evasion":
            sortfunction = ((a,b) => (b.evasion - a.evasion)*dir)
            break
    }

    var filterList = []
    $.each(search_options["filter"], function(i, el) {
        var allfalse = true, alltrue = true
        $.each(el, function(i2, el2) {
            allfalse = (allfalse && !el2)
            alltrue = alltrue && el2
        })
        if (!(allfalse || alltrue)) {
            filterList.push(i)
        }
    })

    studentList.sort(sortfunction)
    var count = 0

    $.each(studentList, function(i, el){
        if (el["released"][regionID]) {
            if (checkFilters(el, filterList, searchTerm)) {
                count++
                $('#ba-student-select-'+el['id']).show().css("order", count)
                switch (search_options["sortby"]) {
                    case "default": case "name":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el["name_"+userLang]).toggleClass('smalltext', el["name_"+userLang].length > label_smalltext_threshold[userLang]).toggleClass('ba-unhover-text', false)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').hide()
                        break
                    case "maxhp":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.maxhp_100).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break 
                    case "attack":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.attack_power_100).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break
                    case "defense":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.defense_power_100).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break 
                    case "healing":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.heal_power_100).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break 
                    case "accuracy":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.accuracy).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break 
                    case "evasion":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.evasion).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break
                    case "crit":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.critical).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break 
                    case "stability":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.stability).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break
                    case "range":
                        $('#ba-student-select-'+el['id']+' .ba-label-text').text(el.range).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                        $('#ba-student-select-'+el['id']+' .ba-hover-text').show()
                        break 
                }

            } else {
                $('#ba-student-select-'+el['id']).hide()
            }
        }
    })

    if (count == 0) {
        $('#ba-student-select-noresult').show()
    } else {
        $('#ba-student-select-noresult').hide()
    }
}

function checkFilters(student, filterList, searchTerm) {
    if (!student["released"][regionID]) return false
    if (filterList.length == 0) {
    } else {
        for (let i = 0; i < filterList.length; i++) {
            if (!search_options['filter'][filterList[i]][student[filterList[i]]]) return false
        }
    }
    return (searchTerm == "" || student[`name_${userLang}`].toLowerCase().includes(searchTerm.toLowerCase()))
}

function searchOptionSet(option, value, runSearch = true) {
    $(`#ba-student-search-${option} a`).removeClass("active")
    $(`#ba-student-search-${option} button`).removeClass("active")
    $(`#ba-student-search-${option}-${value}`).addClass("active")
    $(`#ba-student-search-sortby-stat`).text(getLocalizedString('ui','student_search_filter_stat')+" ")

    if (option == "sortby" && value != "default" && value != "name") {
        $(`#ba-student-search-sortby-stat`).addClass("active")
        $(`#ba-student-search-sortby-stat`).text($(`#ba-student-search-sortby-${value}`).text() + " ")
    }

    // $(`#ba-student-search-${option}-label`).text($(`#ba-student-search-${option}-${value}`).text())
    search_options[option] = value
    localStorage.setItem(`chara_${option}`, value)
    if (runSearch) {
        updateStudentList()  
    }
}

function getNumActiveFilters() {
    let num = 0
    $.each(search_options.filter, function(i, v) {
        $.each(v, function(j, w) {
            if (w == true) num += 1
        })
    })
    return num
}

function searchSetOrder(value, runSearch = true, swapDir = true) {

    if (swapDir) {
        if (value == search_options["sortby"]) {
            search_options["sortby_dir"] = -search_options["sortby_dir"]
        } else {
            search_options["sortby_dir"] = 1
        }
    }

    $(`#ba-student-search-sortby a`).removeClass("active")
    $(`#ba-student-search-sortby button`).removeClass("active")
    $(`#ba-student-search-sortby-${value}`).addClass("active")
    $('#ba-student-search-sortby-stat').text(getLocalizedString('ui','student_search_filter_stat'))
    $('.sort-direction-label').text("")

    $(`#ba-student-search-sortby-${value} > .sort-direction-label`).html((search_options["sortby_dir"] == 1) != (value == "name" || value == "default") ? '<i class="fa-solid fa-arrow-down-long ms-2"></i>' : '<i class="fa-solid fa-arrow-up-long ms-2"></i>')

    if (value != "default" && value != "name") {
        $('#ba-student-search-sortby-stat').addClass("active")
        $('#ba-student-search-sortby-stat').html($(`#ba-student-search-sortby-${value}`).html())
    }

    search_options["sortby"] = value
    localStorage.setItem('chara_sortby', value)
    localStorage.setItem('chara_sortby_dir', search_options["sortby_dir"])
    if (runSearch) {
        updateStudentList()  
    }
}

function searchSetFilter(prop, value, runSearch = true) {
    search_options["filter"][prop][value] = !search_options["filter"][prop][value]
    $(`#ba-student-search-filter-${prop}-${String(value).toLowerCase()}`).toggleClass("active", search_options["filter"][prop][value])
    activeFilters = getNumActiveFilters()
    $('#ba-student-search-filter-amount').text(activeFilters == 0 ? '' : ` (${activeFilters})`)
    if (runSearch) {
        updateStudentList()  
    }

}

function loadStudent(studentName) {
    if (loadedModule == 'students') {
        student = find(data.students,"name_dev",studentName)

        if (student.length == 1) {
            //console.log(student[0])
            student = student[0]
    
            var charimg = new Image()
            charimg.onload = function() {
                $('#ba-student-img').css('background-image', `url('${charimg.src}')`)
                $('#ba-student-img-sm').css('background-image', `url('${charimg.src}')`)
            }
            charimg.src = `images/student/portrait/Portrait_${student.name_dev}.webp`         
            var bgimg = new Image()
            bgimg.onload = function(){
                $("#ba-background").css('background-image', `url('${bgimg.src}')`)
            }
            bgimg.src = `images/background/${student.background_img}.jpg`
    
            $('#ba-student-name').html(student[`name_${userLang}`].replace('(', '<small>(').replace(')', ')</small>'))
            $("#ba-student-class").text(student.type).removeClass("bg-striker bg-special").addClass(`bg-${student.type.toLowerCase()}`)
            $("#ba-student-stars").html('<i class="fa-solid fa-star"></i>'.repeat(student.stars))
    
            $("#ba-student-limited").removeClass("ba-type-limited ba-type-event")
            switch (student.is_limited) {
                case 0:
                    $("#ba-student-limited").html('<i class="fa-solid fa-star"></i>'.repeat(student.stars))
                    break;
                case 1:
                    $("#ba-student-limited").html('<i class="fa-solid fa-star"></i>'.repeat(student.stars) + ` (${getLocalizedString('rarity','limited')})`)
                    break;
                case 2:
                    $("#ba-student-limited").html('<i class="fa-solid fa-star"></i>'.repeat(student.stars) + ` (${getLocalizedString('rarity','event')})`)
                    break;
            }
            
            showVehicleStats = false
            if (student.tss_id > 0) {
                let vehicle = find(data.tss_vehicles, 'id', student.tss_id)[0]
                $('#ba-student-vehicle-0').addClass('active').text(student['name_'+userLang])
                $('#ba-student-vehicle-1').removeClass('active').text(vehicle['name_'+userLang])
                $('#ba-student-vehicle').show()
            } else {
                $('#ba-student-vehicle').hide()
            }

            $("#ba-student-role-label").text(getLocalizedString('role',student.role.toLowerCase()))
            $("#ba-student-role-icon").attr("src", `images/ui/Role_${student.role}.png`)
    
            $(".ba-skill, .ba-weapon-skill-plus").removeClass("bg-skill-explosive bg-skill-piercing bg-skill-mystic").addClass(`bg-skill-${student.attack_type.toLowerCase()}`)
            $("#ba-student-attacktype").removeClass("bg-atk-explosive bg-atk-piercing bg-atk-mystic").addClass(`bg-atk-${student.attack_type.toLowerCase()}`)
            $("#ba-student-defensetype").removeClass("bg-def-light bg-def-heavy bg-def-special").addClass(`bg-def-${student.defense_type.toLowerCase()}`)
            
            $("#ba-student-school-label").text(student.school)
            $("#ba-student-school-img").attr("src", "images/schoolicon/School_Icon_" + student.school.toUpperCase().replace(" ","") + "_W.png")
            $("#ba-student-position").text(student.position.toUpperCase())
            $("#ba-student-attacktype-label").text(getLocalizedString('attack_type',student.attack_type.toLowerCase()))
            $('#ba-student-attacktype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${student.attack_type}`, 'Attack Type', null, getTypeText(student.attack_type), 32), placement: 'top', html: true})
            $("#ba-student-defensetype-label").text(getLocalizedString('defense_type',student.defense_type.toLowerCase()))
            $('#ba-student-defensetype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${student.defense_type} Armor`, 'Defense Type', null, getTypeText(student.defense_type), 32), placement: 'top', html: true})
    
            updateGearIcon()
            recalculateTerrainAffinity()
    
            if (student.uses_cover) {
                $("#ba-student-usescover-icon").show()
            } else {
                $("#ba-student-usescover-icon").hide()
            }
    
            $("#ba-student-weapontype-label").text(student.weapon_type)
            $(".ba-type-weapon").css("background-image", "url('images/weapontype/Weapon_Icon_" + student.weapon_type_img + ".png')")
    
            //Skills
            $("#ba-skill-ex-name").text(student[`skill_ex_name_${userLang}`] ? student[`skill_ex_name_${userLang}`] : student.skill_ex_name_ja)
            $("#ba-skill-normal-name").text(student[`skill_normal_name_${userLang}`] ? student[`skill_normal_name_${userLang}`] : student.skill_normal_name_ja)
            $("#ba-skill-passive-name").text(student[`skill_passive_name_${userLang}`] ? student[`skill_passive_name_${userLang}`] : student.skill_passive_name_ja)
            $("#ba-skill-sub-name").text(student[`skill_sub_name_${userLang}`] ? student[`skill_sub_name_${userLang}`] : student.skill_sub_name_ja)     
    
            $('#ba-skill-ex-icon').attr("src", "images/skill/" + student.skill_ex_icon+'.png')
            $('#ba-skill-normal-icon').attr("src", "images/skill/" + student.skill_normal_icon+'.png')
            $('#ba-skill-passive-icon').attr("src", "images/skill/" + student.skill_passive_icon+'.png')
            $('#ba-skill-sub-icon').attr("src", "images/skill/" + student.skill_sub_icon+'.png')
    
            student.skill_ex_cost[0] == student.skill_ex_cost[4] ? $("#ba-skill-ex-cost").removeClass("ba-col-explosive ba-col-piercing ba-col-mystic") : $("#ba-skill-ex-cost").removeClass("ba-col-explosive ba-col-piercing ba-col-mystic").addClass(`ba-col-${student.attack_type.toLowerCase()}`)
    
    
            //Skill materials
            var html
            for (let i = 2; i <= 5; i++) {
                html = ''
                $.each(student.skill_ex_upgrade_material[i-2], function(j, el) {
                    html += getMaterialIconHTML(el, student.skill_ex_upgrade_amount[i-2][j])
                })
                html += getMaterialIconHTML(3000001, abbreviateNumber(skill_ex_upgrade_credits[i-2]))
        
                $('#ba-skill-ex-materials-'+i).html(html)
                $('#ba-skill-ex-materials-'+i+' div').each(function(j,el) {
                    $(el).tooltip({html: true})
                })
            }
    
            for (let i = 2; i <= 9; i++) {
                html = ''
                $.each(student.skill_upgrade_material[i-2], function(j, el) {
                    html += getMaterialIconHTML(el, student.skill_upgrade_amount[i-2][j])
                })
                html += getMaterialIconHTML(3000001, abbreviateNumber(skill_upgrade_credits[i-2]))
        
                $('#ba-skill-materials-'+i).html(html)
                $('#ba-skill-materials-'+i+' div').each(function(j,el) {
                    $(el).tooltip({html: true})
                })
            }
    
            html = ''
            html += getMaterialIconHTML(9999, 1)
            html += getMaterialIconHTML(3000001, abbreviateNumber(skill_upgrade_credits[8]))
    
            $('#ba-skill-materials-10').html(html)
            $('#ba-skill-materials-10 div').each(function(i,el) {
                $(el).tooltip({html: true})
            })
    
            //Weapon
            $("#ba-student-weapon-name").text(student[`weapon_name_${userLang}`] ? student[`weapon_name_${userLang}`]: student.weapon_name_ja)
            $("#ba-student-weapon-type").text(student.weapon_type)
            $("#ba-student-weapon-img").attr("src", `images/weapon/Weapon_Icon_${student.id}.png`)
    
            if (student[`weapon_skill_passive_description_${userLang}`] != null) {
                $("#ba-weapon-skill-passive-name").text(student[`skill_passive_name_${userLang}`] ? student[`skill_passive_name_${userLang}`] + getLocalizedString('ui',"skill_plus") : student.skill_passive_name_ja + '＋')
                $('#ba-weapon-skill-passive-icon').attr("src", "images/skill/" + student.skill_passive_icon+'.png')
                recalculateWeaponSkillPreview()
            }
    
            $('#ba-weapon-bonus-terrain-type').attr("src", `images/ui/Terrain_${student.weapon_bonus_terrain}.png`)
            $('#ba-weapon-bonus-terrain-adaption').attr("src", `images/ui/Ingame_Emo_Adaptresult${terrain_adaption[student[student.weapon_bonus_terrain+'_adaption']+student.weapon_bonus_terrain_amount]}.png`)
            $('#ba-weapon-bonus-terrain-adaption-description').html(`${student.weapon_bonus_terrain.charAt(0).toUpperCase()+student.weapon_bonus_terrain.substr(1)} Combat Power ${terrain_adaption[student[student.weapon_bonus_terrain+'_adaption']]} → <b>${terrain_adaption[student[student.weapon_bonus_terrain+'_adaption']+student.weapon_bonus_terrain_amount]}</b><br>(${getAdaptionText(student.weapon_bonus_terrain, terrain_adaption[student[student.weapon_bonus_terrain+'_adaption']+student.weapon_bonus_terrain_amount])})`)
    
            var url = new URL(window.location.href)
    
            if (url.searchParams.get("chara") !== student.name_dev) {
                url.searchParams.forEach((v,k) => url.searchParams.delete(k))
                url.searchParams.set("chara", student.name_dev)
                history.pushState(null, '', url)
            }
            
            // $.each(student.weapon_bonus_stats, function(i, el) {
            //     $(`#ba-weapon-stat-${i+1}`).text(getStatName(student.weapon_bonus_stats[i]))
            //     $(`#ba-weapon-stat-${i+1}-amount`).text(student.weapon_bonus_stats_parameters[i][0])
            // }) 
    
            if (student.weapon_heal_power_100 > 0) {
                $('#ba-weapon-stat-row2').show()
            } else {
                $('#ba-weapon-stat-row2').hide()
            }
    
            $('#ba-weapon-description').text(getLocalStringIfAvailable(student,'weapon_description').replace("\n\n", "\n"))
    
            //Profile
            if (userLang == 'en') {
                $('#ba-student-fullname').text(getLocalStringIfAvailable(student,'given_name')+' '+getLocalStringIfAvailable(student,'family_name'))
            } else {
                $('#ba-student-fullname').text(getLocalStringIfAvailable(student,'family_name')+getLocalStringIfAvailable(student,'given_name'))
            }
            // $("#ba-profile-school-img").attr("src", "images/schoolicon/School_Icon_" + student.school.toUpperCase().replace(" ","") + ".png")
            // $("#ba-profile-school-img-w").attr("src", "images/schoolicon/School_Icon_" + student.school.toUpperCase().replace(" ","") + "_W.png")
            $('#ba-profile-school-label').text(getLocalizedString('school_long',student.school.toLowerCase()))
            $('#ba-profile-club-label').text(getLocalizedString('club',student.club))
            student[`year_${userLang}`] == "" ? $('#ba-profile-schoolyear-label').hide() : $('#ba-profile-schoolyear-label').show()
            $('#ba-profile-schoolyear-label').text(student[`year_${userLang}`])
            $('#ba-profile-portrait-img').attr("src", `images/student/collection/${student.portrait_img}.webp`)
            var profileHtml = ''
            profileHtml += student[`profile_${userLang}`] ? student[`profile_${userLang}`] : student['profile_ja']
            if (student.stars == 3) {
                if (student[`gacha_quote_${userLang}`]) profileHtml += `\n\n<i class="text-bold">"${student[`gacha_quote_${userLang}`]}"</i>`
                else profileHtml += `\n\n<i class="text-bold">"${student['gacha_quote_ja']}"</i>`
            }
            $('#ba-student-profile-text').html(profileHtml)
    
            if (student.recollection_lobby) {
                $(".ba-student-lobby").show()
                $("#ba-student-lobby-img").attr("src", `images/student/lobby/Lobbyillust_Icon_${student.name_dev}_01.png`)
                $("#ba-student-lobby-unlock").text(student.recollection_lobby)
                $(".ba-student-lobby").tooltip('dispose').tooltip({title: getRichTooltip(null, `${student['name_'+userLang]}'s Recollection Lobby`, null, null, `Unlocks after reaching relationship rank ${student.recollection_lobby} with ${student['name_'+userLang]}.`), placement: 'top', html: true})
            } else {
                $(".ba-student-lobby").hide()
            }
            
            $('#ba-student-profile-age').text(getLocalStringIfAvailable(student,'age'))
            $('#ba-student-profile-birthday').text(getLocalStringIfAvailable(student,'birthday'))
            $('#ba-student-profile-hobbies').text(getLocalStringIfAvailable(student,'hobbies'))
            $('#ba-student-profile-height').text(student.height_metric)
            $('#ba-student-profile-cv').text(getLocalStringIfAvailable(student,'cv'))
            $('#ba-student-profile-illustrator').text(student.illustrator)
    
            let allTags = student.favoured_item_tags
            allTags.push(student.favoured_item_unique[0])
            let favItems = getFavouriteItems(allTags)
            var favItemsHtml = ""
            $(favItems[0]).each(function(i,el){
                favItemsHtml += getFavourIconHTML(el, 3)
            })
            $(favItems[1]).each(function(i,el){
                favItemsHtml += getFavourIconHTML(el, 2)
            })
            $('#ba-student-favoured-items').empty().html(favItemsHtml)
            if (favItemsHtml == "") {
                $('#ba-student-favoured-items').empty().html('<span class="pb-2 text-center">This student does not have any favourite gifts.</span>')
            } else {
                $('#ba-student-favoured-items').empty().html(favItemsHtml)
            }
    
            var favFurnitureHtml = ""
            $(student.favoured_furniture).each(function(i,el){
                var item = find(data.furniture, "id", el)[0]
                if (item.released[regionID]) {
                    favFurnitureHtml += getFurnitureIconHTML(item)
                }
            })
    
            $('#ba-student-favoured-furniture').empty().html(favFurnitureHtml)
            if (favFurnitureHtml == "") {
                $('#ba-student-favoured-furniture').empty().html('<span class="pb-2 text-center">This student does not interact with any café furniture.</span>')
            } else {
                $('#ba-student-favoured-furniture').empty().html(favFurnitureHtml)
            }
            $('.ba-favor-item').tooltip({html: true})
    
            $('#ba-student-bond-1').text(getStatName(student.bond_stat[0]))
            $('#ba-student-bond-2').text(getStatName(student.bond_stat[1]))
    
            if (student.type == "Striker") {
                $('#ba-student-stat-table').removeClass("table-striker-bonus")
                $('#ba-statpreview-strikerbonus').removeClass('active').hide()
            } else {
                $('#ba-statpreview-strikerbonus').show()
            }
            
            $('#ba-statpreview-bond-targets').empty().html(getBondTargetsHTML(1, student))
            student_bondalts = []
            for (let i = 0; i < student.bond_extratarget.length; i++) {
                var extraTarget = find(data.students,"id",student.bond_extratarget[i])[0]
                if (extraTarget.released[regionID]) {
                    student_bondalts.push(extraTarget)
                    $('#ba-statpreview-bond-targets').append(getBondTargetsHTML(1 + student_bondalts.length, extraTarget))
                }
            }
    
            document.title = `Schale DB | ${getLocalStringIfAvailable(student,'name')}`
            $('#ba-navbar-content').collapse('hide')
    
            changeStatPreviewStars(student.stars)
            recalculateWeaponPreview()
            recalculateStatPreview()
            recalculateSkillPreview()
            recalculateEXSkillPreview()
            recalculateBondPreview()
    
            changeGearLevel(1, document.getElementById('ba-statpreview-gear1-range'))
            changeGearLevel(2, document.getElementById('ba-statpreview-gear2-range'))
            changeGearLevel(3, document.getElementById('ba-statpreview-gear3-range'))
    
            for (let i = 1; i <= student_bondalts.length+1; i++) {
                changeStatPreviewBondLevel(i, document.getElementById(`ba-statpreview-bond-${i}-range`))
            }
            //changeStatPreviewWeaponLevel(document.getElementById(`ba-statpreview-weapon-range`))
            
            localStorage.setItem("chara", student.name_dev)
            studentSelectorModal.hide()
        }
    } else {
        loadModule('students', studentName)
    }
    
}

function changeStudentVehicle(vehicleID) {
    $('#ba-student-vehicle-'+vehicleID).tab('show')
    if (vehicleID == 0) {
        showVehicleStats = false
        $('#ba-statpreview-strikerbonus').removeClass('disabled')
        recalculateStatPreview()
    } else if (vehicleID == 1) {
        showVehicleStats = true
        $('#ba-statpreview-strikerbonus').addClass('disabled').removeClass('active')
        $('#ba-student-stat-table').removeClass("table-striker-bonus")
        recalculateStatPreview()
    }
}

function loadItem(id) {
    if (loadedModule == 'items') {
        var mode = '', item
        $('#ba-item-furniture-row').hide()
        if (id >= 2000000) {
            mode = 'equipment'
            item = findOrDefault(data.common.equipment, "id", id-2000000, 1)[0]
            $('#ba-item-type').html(item[`type`])
        } else if (id >= 1000000) {
            mode = 'furniture'
            item = findOrDefault(data.furniture, "id", id-1000000, 1)[0]
            $('#ba-item-type').html(getLocalizedString('item_type', item[`category`]))
            $('#ba-item-furniture-row').show()
            $('#ba-item-furniture-set').html(getLocalizedString('furniture_set',''+item.set))
            $('#ba-item-furniture-comfort').html('+'+item.comfort)
        } else {
            mode = 'items'
            item = findOrDefault(data.items, "id", id, 1)[0]
            $('#ba-item-type').html(getLocalizedString('item_type', item[`type`]))
        } 
        loadedItem = item
        $('#ba-item-name').html(getLocalStringIfAvailable(item,'name'))
        if (mode == 'equipment' && item.id >= 1000) {
            $('#ba-item-rarity').html(`T${(id%10)+1}`)
        } else {
            $('#ba-item-rarity').html(getRarityStars(item.rarity))
        }
        
        $('#ba-item-icon').removeClass('ba-item-n ba-item-r ba-item-sr ba-item-ssr').addClass('ba-item-'+item.rarity.toLowerCase())
        $('#ba-item-icon-img').attr('src', `images/${mode}/${item.icon}.png`)
        $('#ba-item-description').html(getLocalStringIfAvailable(item,'desc'))
        $('#ba-item-usage').empty().hide()
        $('#ba-item-sources').empty().hide()
        if (item.type == 'Material') {
            $('#ba-item-usage').html(getUsedByStudents(item))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-sources').html(getItemDropStages(item.id))
            $('#ba-item-list-tab-materials').tab('show')
        } else if (item.type == 'Favor') {
            if (item.rarity != 'SSR') {
                $('#ba-item-usage').html(getLikedByStudents(item))
                $('.ba-item-student').tooltip({html: true})
            } else {
                $('#ba-item-usage').html("<i>This gift will be treated as a favorite item when given to any student.</i>").show()
            }
            $('#ba-item-list-tab-gifts').tab('show')
        } else if (item.type == 'SecretStone') {
            $('#ba-item-sources').html(getItemDropStages(item.id))
            $('#ba-item-usage').html(getUsedByStudents(item))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-list-tab-eleph').tab('show')
        } else if (item.type == 'Equipment') {
            $('#ba-item-usage').html(getUsedByStudents(item))
            $('#ba-item-sources').html(getItemDropStages(item.id+2000000))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-list-tab-equipment').tab('show')
        } else if (item.type == 'Coin') {
            $('#ba-item-list-tab-currency').tab('show')
        }
        if (mode == 'furniture') {
            $('#ba-item-usage').html(getUsedByStudents(item))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-list-tab-furniture').tab('show') 
        }
        var url = new URL(window.location.href)
        if (url.searchParams.get("item") != id) {
            url.searchParams.forEach((v,k) => url.searchParams.delete(k))
            url.searchParams.set("item", id)
            history.pushState(null, '', url)
        }

        document.title = `Schale DB | ${getLocalStringIfAvailable(item,'name')}`
        $('#ba-navbar-content').collapse('hide')
        localStorage.setItem("item", id)
    } else {
        loadModule('items', id)
    }
}

function loadCraft(id) {
    if (loadedModule == 'craft') {
        var mode = 'craftnode', craftNode = findOrDefault(data.crafting.nodes, "id", id, 1)[0]
        loadedCraftNode = craftNode
        $('#ba-craft-name').html(getLocalStringIfAvailable(craftNode,'name'))
        $('#ba-craft-type').html(getLocalizedString("node_tier", craftNode.tier.toString()))
        $('#ba-craft-rarity').html(getLocalizedString("node_grade", craftNode.grade.toString()))
        $('#ba-craft-icon').removeClass('ba-node-grade-1 ba-node-grade-2').addClass('ba-node-grade-'+craftNode.grade.toString())
        $('#ba-craft-icon-img').attr('src', `images/ui/${craftNode.icon}.png`)
        $('#ba-craft-description').html(getLocalStringIfAvailable(craftNode,'desc'))
        $('#ba-craft-rewards').empty()
        let rewardsHtml = ''
        $.each(craftNode.rewards, function(i,el){
            let item_group = data.crafting.groups[el.group_id]
            maxChance = 0
            for (let j = 0; j < item_group.length; j++) {
                maxChance += item_group[j].chance
            }
            for (let j = 0; j < item_group.length; j++) {
                let itemProb = ((el.chance / craftNode.chance) * (item_group[j].chance / maxChance)).toFixed(4)
                let itemId = item_group[j].item_id
                if (item_group[j].type == "Furniture") {
                    itemId += 1000000
                } else if (item_group[j].type == "Equipment") {
                    itemId += 2000000
                }
                rewardsHtml += getDropIconHTML(itemId,itemProb)
            }
        })
        $('#ba-craft-rewards').html(rewardsHtml)
        $('#ba-craft-rewards div').each(function(i,el) {
            $(el).tooltip({html: true})
        })
        var url = new URL(window.location.href)
        if (url.searchParams.get("craftnode") != id) {
            url.searchParams.forEach((v,k) => url.searchParams.delete(k))
            url.searchParams.set("craftnode", id)
            history.pushState(null, '', url)
        }

        document.title = `Schale DB | ${getLocalStringIfAvailable(craftNode,'name')}`
        $('#ba-navbar-content').collapse('hide')
        localStorage.setItem("craftnode", id)
    } else {
        loadModule('craft', id)
    }
}

function loadRaid(raidName) {
    if (loadedModule == 'raids') {
        raid = findOrDefault(data.raids,"name_dev",raidName,'Binah')[0]
        selectedEnemy = 0
        if (raid.released_insane[regionID]) {
            $('#ba-raid-difficulty-5').toggleClass('disabled', false)
        } else {
            $('#ba-raid-difficulty-5').toggleClass('disabled', true)
            if (raid_difficulty == 5)  {
                raid_difficulty = 0
                $('#ba-raid-difficulty-5').toggleClass('active', false)
                $('#ba-raid-difficulty-0').toggleClass('active', true)
            }
        }
    
        $('#ba-raid-affiliation').text(raid.affiliation)
        $('#ba-raid-name').text(raid['name_'+userLang])
    
        $('#ba-raid-header').css('background-image', `url('images/raid/Boss_Portrait_${raid.name_dev}${raid_difficulty == 5 ? "_Insane" : ""}_Lobby.png')`)
        //$('#ba-raid-header-img').attr('src', `images/raid/Boss_Portrait_${raid.name_dev}${difficulty == 5 ? "_Insane" : ""}_Lobby.png`)
    
        $('#ba-raid-terrain-img').attr('src', `images/ui/Terrain_${raid.terrains[0]}.png`)
        if (raid.terrains.length > 1) {
            $('#ba-raid-terrain-alt-img').attr('src', `images/ui/Terrain_${raid.terrains[1]}.png`).show()
        } else {
            $('#ba-raid-terrain-alt-img').hide()
        }

        var statsHtml = ''
        var tabsHtml = ''
        raid.enemies[raid_difficulty].forEach(function(el,i) {
            let enemy = find(data.enemies,'id',el)[0]
            tabsHtml += `<button class="nav-link ${i==0 ? "active" : ""}" data-bs-toggle="tab" href="#" onclick="changeRaidEnemy(${i})">${enemy['name_'+userLang]}</button>`
        })
        changeRaidEnemy(0)
        $('#ba-raid-enemy-tabs').empty().html(tabsHtml)
    
        var skillsHTML = ''
        raid.skills.forEach(function(el, i) {
            if (raid_difficulty < el.min_difficulty) return
            if (skillsHTML != '') skillsHTML += '<div class="ba-panel-separator"></div>'
            skillsHTML += `
            <div class="d-flex flex-row align-items-center mt-2">
                <img class="ba-raid-skill d-inline-block me-3" src="images/raid/skill/${el.icon}.png">
                <div class="d-inline-block">
                    <div>
                        <h4 class="me-2 d-inline">${el.name_en}</h4>
                    </div>
                    <div class="mt-1">
                        <p class="d-inline" style="font-style: italic;">${el.type} Skill</p>
                    </div>
                </div>
            </div>
            <p class="mt-1 mb-2 p-1">${getSkillText(el.description_en, el.parameters, raid_difficulty+1, 'raid')}</p>
            `
        })
        $('#ba-raid-skills').empty().html(skillsHTML)
        $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
            $(el).tooltip({html: true})
        })
    
        var url = new URL(window.location.href)
    
        if (url.searchParams.get("raid") !== raid.name_dev) {
            url.searchParams.forEach((v,k) => url.searchParams.delete(k))
            url.searchParams.set("raid", raid.name_dev)
            history.pushState(null, '', url)
        }
    
        document.title = `Schale DB | ${getLocalStringIfAvailable(raid,'name')}`
        $('#ba-navbar-content').collapse('hide')
        localStorage.setItem("raid", raid.name_dev)
    } else {
        loadModule('raids', raidName)
    }
}

function changeRaidDifficulty(difficultyId) {
    raid_difficulty = difficultyId
    loadRaid(raid.name_dev)
}

function changeRaidEnemy(num) {
    let enemy = find(data.enemies,'id',raid.enemies[raid_difficulty][num])[0], grade = 1, level = raid_level[raid_difficulty]
    let levelscale = ((level-1)/99).toFixed(4)

    let maxHP = Math.ceil((Math.round((enemy.maxhp_1 + (enemy.maxhp_100-enemy.maxhp_1) * levelscale).toFixed(4)) * starscale_hp[grade-1]).toFixed(4))
    let attack = Math.ceil((Math.round((enemy.attack_power_1 + (enemy.attack_power_100-enemy.attack_power_1) * levelscale).toFixed(4)) * starscale_attack[grade-1]).toFixed(4))
    let defense = Math.round((enemy.defense_power_1 + (enemy.defense_power_100-enemy.defense_power_1) * levelscale).toFixed(4))
    let healing = Math.ceil((Math.round((enemy.heal_power_1 + (enemy.heal_power_100-enemy.heal_power_1) * levelscale).toFixed(4)) * starscale_healing[grade-1]).toFixed(4))   
    $('#ba-raid-stat-maxhp').text(maxHP.toLocaleString())
    $('#ba-raid-stat-attack').text(attack.toLocaleString())
    $('#ba-raid-stat-defense').text(defense.toLocaleString())
    //$('#ba-raid-stat-healing').text(healing.toLocaleString())
    $('#ba-raid-stat-dmgresist').text(`${parseFloat(((enemy.dmg_resist-10000)/100).toFixed(4)).toLocaleString()}%`)
    $('#ba-raid-stat-accuracy').text(enemy.accuracy.toLocaleString())
    $('#ba-raid-stat-evasion').text(enemy.evasion.toLocaleString())
    $('#ba-raid-stat-crit').text(enemy.critical.toLocaleString())
    $('#ba-raid-stat-critdmg').text(`${parseFloat(((enemy.critical_dmg)/100).toFixed(4)).toLocaleString()}%`)
    //$('#ba-raid-stat-stability').text(enemy.stability.toLocaleString())
    //$('#ba-raid-stat-range').text(enemy.range.toLocaleString())
    $('#ba-raid-stat-critresist').text(enemy.critical_res.toLocaleString())
    $('#ba-raid-stat-critdmgresist').text(`${parseFloat(((enemy.critical_dmg_res)/100).toFixed(4))}%`)
    //$('#ba-raid-stat-movespeed').text(enemy.move_speed.toLocaleString())

    $("#ba-raid-attacktype").removeClass("bg-atk-explosive bg-atk-piercing bg-atk-mystic bg-atk-normal").addClass(`bg-atk-${enemy.attack_type.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(null, `${enemy.attack_type}`, 'Attack Type', null, getTypeText(enemy.attack_type), 32), placement: 'top', html: true})
    $("#ba-raid-attacktype-label").text(getLocalizedString('attack_type',enemy.attack_type.toLowerCase()))

    $("#ba-raid-defensetype").removeClass("bg-def-light bg-def-heavy bg-def-special").addClass(`bg-def-${enemy.defense_type.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(null, `${enemy.defense_type} Armor`, 'Defense Type', null, getTypeText(enemy.defense_type), 32), placement: 'top', html: true})
    $("#ba-raid-defensetype-label").text(getLocalizedString('defense_type',enemy.defense_type.toLowerCase()))
}

function loadStage(id) {
    if (loadedModule == 'stages') {
        var mode = '', item
        if (id >= 7000000) {
            mode = 'events'
            stage = getEventStage(id)
            $('#ba-stage-name').html(getLocalizedString('event_name',id.toString().slice(0,3)) + '<br>'+event_area[stage.area]+' '+stage.stage.toString().padStart(2,'0'))
            $('#ba-stages-list-tab-events').tab('show')
        } else if (id >= 1000000) {
            mode = 'missions'
            stage = findOrDefault(data.stages.missions, "id", id, 1011101)[0]
            $('#ba-stage-name').html(stage.area+'-'+stage.stage+ (stage.difficulty == 1 ? ' Hard' : ' Normal'))
            $('#ba-stages-list-tab-missions').tab('show')
        } else if (id >= 60000) {
            mode = 'schooldungeon'
            stage = findOrDefault(data.stages.schooldungeon, "id", id, 60101)[0]
            $('#ba-stage-name').html(getLocalizedString('mission_type',mode))
            $('#ba-stages-list-tab-schooldungeon').tab('show')
        } else if (id >= 31000) {
            mode = 'commissions'
            stage = findOrDefault(data.stages.commissions, "id", id, 32101)[0]
            $('#ba-stage-name').html(getLocalizedString('mission_type',mode))
            $('#ba-stages-list-tab-commissions').tab('show')
        } else if (id >= 30000) {
            mode = 'bounty'
            stage = findOrDefault(data.stages.bounty, "id", id, 30101)[0]
            $('#ba-stage-name').html(getLocalizedString('mission_type',mode))
            $('#ba-stages-list-tab-bounty').tab('show')
        } else {
            mode = 'missions'
            stage = find(data.stages.missions, "id", 1011101)[0]
            $('#ba-stage-name').html(stage.area+'-'+stage.stage+ (stage.difficulty == 1 ? ' Hard' : ' Normal'))
            $('#ba-stages-list-tab-missions').tab('show')
        }
        loadedStage = stage
        $('#ba-stage-title').html(getLocalStringIfAvailable(stage,'name'))
        $('#ba-stage-level').text('Lv. '+ stage.level)
        $('#ba-stage-terrain-img').attr('src', `images/ui/Terrain_${stage.terrain}.png`)
        stage.difficulty == 1 ? $('#ba-stage-fog').show() : $('#ba-stage-fog').hide()
        var url = new URL(window.location.href)
        if (url.searchParams.get("stage") != id) {
            url.searchParams.forEach((v,k) => url.searchParams.delete(k))
            url.searchParams.set("stage", id)
            history.pushState(null, '', url)
        }
        var html = ''
        $.each(stage.rewards, function(i,el){
            html += getDropIconHTML(el[0], el[1])
        })
        $.each(stage.drops, function(i,el){
            html += getDropIconHTML(el[0], el[1])
        })
        $('#ba-stage-drops').html(html)
        $('#ba-stage-drops div').each(function(i,el) {
            $(el).tooltip({html: true})
        })
        html = ''
        let all_enemies = {}
        $.each(data.formations[stage.id], function(i,el){
            for (let i = 0; i < el.enemies.length; i++) {
                let enemy = find(data.enemies, "id", el.enemies[i])[0]
                all_enemies[enemy_rank[enemy.rank]+'_'+enemy.id+'_'+el['level_'+enemy.rank.toLowerCase()]+'_'+el['grade_'+enemy.rank.toLowerCase()]] = enemy
            }
        })
        let isfirst = true
        Object.keys(all_enemies).sort().forEach(function(el, i) {
            e_level = el.split('_')[2]
            e_grade = el.split('_')[3]
            html += getEnemyCardHTML(all_enemies[el], e_level, e_grade)
            if (isfirst) {
                showEnemyInfo(all_enemies[el].id, e_level, e_grade)
                isfirst = false
            }
        })
        $('#ba-stage-enemies').html(html)
        
        document.title = `Schale DB | ${getLocalStringIfAvailable(stage,'name')}`
        $('#ba-navbar-content').collapse('hide')
        localStorage.setItem("stage", id)
    } else {
        loadModule('stages', id)
    }
}

function getEventStage(id) {
    let event_id = id.toString().slice(0,3)
    let event = find(data.stages.events, "id", event_id)
    if (event.length > 0) {
        let event_stage = find(event[0].stages, "id", id)
        if (event_stage.length > 0) return event_stage[0]
    }
    return data.stages.events[0].stages[0]
}

function loadRegion(regID) {
    regionID = regID
    region = data.common.regions[regionID]
    $("#ba-statpreview-levelrange").attr("max",region.studentlevel_max)
    $("#ba-weaponpreview-levelrange").attr("max",region.weaponlevel_max)
    if (region.weaponlevel_max == 0) {
        $("#ba-student-nav-weapon").hide()
        $("#ba-weaponpreview-star-1").hide()
        $("#ba-weaponpreview-star-2").hide()
        $("#ba-weaponpreview-star-3").hide()
        stat_preview_weapon_stars = 0
    }
    $("#ba-bond-levelrange").attr("max",region.bondlevel_max)
    $("#ba-statpreview-gear1-range").attr("max",region.gear1_max)
    $("#ba-statpreview-gear2-range").attr("max",region.gear2_max)
    $("#ba-statpreview-gear3-range").attr("max",region.gear3_max)

    if (regionID == 1) {
        $('#ba-student-search-filter-school-srt').hide()
        $('#ba-student-search-filter-school-others').hide()
    }
}

function getAdaptionText(terrain, rank) {
    return `Deals <b>${terrain_dmg_bonus[rank]}&times;</b> damage in <b>${terrain}</b> terrain.\nBlock rate when taking cover <b>+${terrain_block_bonus[rank]}%</b>.\nChance to ignore block when attacking <b>+${terrain_block_bonus[rank]}%</b>.`
}

function getStatName(stat) {
    return getLocalizedString('stat',stat.replace('_percent',''))
}

function getFormattedStatAmount(val) {
    return Number.isInteger(val) ? val : `${parseFloat((val*100).toFixed(2))}%`
}

function changeGearLevel(slot, el) {
    var geartype = student.gear[slot-1]
    var gearobj = find(data.common.gear, "type", geartype)[0]
    $(`#ba-statpreview-gear${slot}-icon`).attr("src", `images/equipment/Equipment_Icon_${geartype}_Tier${el.value}.png`)
    $(`#ba-statpreview-gear${slot}-level`).text(`T${el.value}`)
    $(`#ba-statpreview-gear${slot}-name`).text(`${gearobj.items[el.value-1][`name_${userLang}`]}`)
    var desc = ""
    $(gearobj.items[el.value-1].bonus_stats).each(function(i){
        desc += `${getStatName(gearobj.items[el.value-1].bonus_stats[i])} <b>+${getFormattedStatAmount(gearobj.items[el.value-1].bonus_stats_parameters[i][1])}</b>, `
    })
    $(`#ba-statpreview-gear${slot}-description`).html(desc.substring(0, desc.length-2))
    if ($('#ba-statpreview-includegear').hasClass('active')) {
        recalculateStatPreview()
        updateGearIcon()
    }
}

function getGearStatsText(item) {
    var text = "\n\n<b>Bonus Stats:</b>\n"
    $(item.bonus_stats).each(function(i){
        text += `${getStatName(item.bonus_stats[i])} +${getFormattedStatAmount(item.bonus_stats_parameters[i][1])}\n`
    })
    return text
}

function toggleStrikerBonus(el) {
    $('#ba-student-stat-table').toggleClass("table-striker-bonus", $(el).hasClass('active'))
    recalculateStatPreview()
}

function changeStatPreviewLevel(el) {
    $('#ba-statpreview-level').text("Lv." + el.value)
    recalculateStatPreview()
}

function changeSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-skill-level').html(`<img src="images/ui/ImageFont_Max.png" style="height: 18px;width: auto;margin-top: -2px;">`)
    } else {
        $('#ba-skill-level').html("Lv." + el.value)
    }
    recalculateSkillPreview()
}

function changeWeaponSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-weapon-skill-level').html(`<img src="images/ui/ImageFont_Max.png" style="height: 18px;width: auto;margin-top: -2px;">`)
    } else {
        $('#ba-weapon-skill-level').html("Lv." + el.value)
    }
    recalculateWeaponSkillPreview()
}

function changeEXSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-skill-ex-level').html(`<img src="images/ui/ImageFont_Max.png" style="height: 18px;width: auto;margin-top: -2px;">`)
    } else {
        $('#ba-skill-ex-level').html("Lv." + el.value)
    }
    recalculateEXSkillPreview()
}

function changeWeaponPreviewLevel(el) {
    var imgHTML = '<img src="images/ui/Common_Icon_Formation_Star_2.png" style="height: 16px;width: auto;margin-top: -3px;"></img>'
    $('#ba-weaponpreview-level').text("Lv." + el.value)
    // if (el.value <= 30) {
    //     $('#ba-weaponpreview-level').append(imgHTML.repeat(1))
    // } else if (el.value <= 40) {
    //     $('#ba-weaponpreview-level').append(imgHTML.repeat(2))
    // } else if (el.value <= 50) {
    //     $('#ba-weaponpreview-level').append(imgHTML.repeat(3))
    // }
    recalculateWeaponPreview()
}

function changeStatPreviewBondLevel(i, el) {
    $(`#ba-statpreview-bond-${i}-level`).html('<i class="fa-solid fa-heart"></i> ' + el.value)
    var bondStats
    if (i == 1) {
        bondStats = Object.entries(getBondStats(student, el.value))
    } else {
        bondStats = Object.entries(getBondStats(student_bondalts[i-2], el.value))
    }
    $(`#ba-statpreview-bond-${i}-description`).html(`${getStatName(bondStats[0][0])} <b>+${getFormattedStatAmount(bondStats[0][1])}</b>, ${getStatName(bondStats[1][0])} <b>+${getFormattedStatAmount(bondStats[1][1])}</b>`)
    if ($('#ba-statpreview-includebond').hasClass('active')) {
        recalculateStatPreview()
    }
}

function getBondTargetsHTML(num, student) {
    return `<div class="mt-2 mb-1 d-flex flex-row align-items-center">
        <div class="me-2" style="position: relative;">
            <img class="ba-bond-icon ms-0" src="images/student/icon/${student.portrait_img}.png">
        </div>
        <div class="flex-fill">
            <h5 class="d-inline">${student['name_'+userLang]}</h5>
            <p id="ba-statpreview-bond-${num}-description" class="mb-0" style="font-size: 0.875rem; line-height: 1rem;"></p>
        </div>
    </div>
    <div class="d-flex flex-row align-items-center mb-2">
        <input id="ba-statpreview-bond-${num}-range" oninput="changeStatPreviewBondLevel(${num}, this)" type="range" class="form-range me-2 flex-fill" value="${num == 1 ? 20 : 1}" min="1" max="${region.bondlevel_max}">
        <span id="ba-statpreview-bond-${num}-level" class="ba-slider-label"></span>
    </div>`
}

function changeBondLevel(el) {
    $('#ba-bond-level').html('<i class="fa-solid fa-heart"></i> ' + el.value)
    recalculateBondPreview()
}

function updateGearIcon() {
    var gear, tier, includeGear
    includeGear = $('#ba-statpreview-includegear').hasClass('active')
    for (let i=1; i<=3; i++) {
        tier = includeGear ? $(`#ba-statpreview-gear${i}-range`).val() : 1
        gear = find(data.common.gear, "type", student.gear[i-1])[0]
        $("#ba-student-gear-"+i).attr("src", `images/equipment/Equipment_Icon_${gear.type}_Tier${tier}.png`).tooltip('dispose').tooltip({title: getRichTooltip(`images/equipment/Equipment_Icon_${gear.type}_Tier${tier}.png`, gear.items[tier-1][`name_${userLang}`], gear[`name_${userLang}`], `T${tier}`, gear.items[tier-1][`desc_${userLang}`] + getGearStatsText(gear.items[tier-1]), 50, 'img-scale-larger'), placement: 'top', html: true}).toggleClass("gear-disabled", !includeGear)
    }
}

function recalculateTerrainAffinity() {
    
    var adaption = {}
    adaption["urban"] = student.urban_adaption
    adaption["outdoor"] = student.outdoor_adaption
    adaption["indoor"] = student.indoor_adaption

    if (stat_preview_stars == 5 && stat_preview_weapon_stars >= 3) {
        adaption[student.weapon_bonus_terrain] += student.weapon_bonus_terrain_amount
    }

    $("#ba-student-terrain-urban-icon").attr("src", "images/ui/Ingame_Emo_Adaptresult" + terrain_adaption[adaption["urban"]] + ".png")
    $("#ba-student-terrain-outdoor-icon").attr("src", "images/ui/Ingame_Emo_Adaptresult" + terrain_adaption[adaption["outdoor"]] + ".png")
    $("#ba-student-terrain-indoor-icon").attr("src", "images/ui/Ingame_Emo_Adaptresult" + terrain_adaption[adaption["indoor"]] + ".png")
    $('#ba-student-terrain-urban').tooltip('dispose').tooltip({title: getRichTooltip("images/ui/Ingame_Emo_Adaptresult" + terrain_adaption[adaption["urban"]] + ".png", 'Combat Power ' + terrain_adaption[adaption["urban"]], null, null, getAdaptionText('urban', terrain_adaption[adaption["urban"]]), 30), placement: 'top', html: true})
    $('#ba-student-terrain-outdoor').tooltip('dispose').tooltip({title: getRichTooltip("images/ui/Ingame_Emo_Adaptresult" + terrain_adaption[adaption["outdoor"]] + ".png", 'Combat Power ' + terrain_adaption[adaption["outdoor"]], null, null, getAdaptionText('outdoor', terrain_adaption[adaption["outdoor"]]), 30), placement: 'top', html: true})
    $('#ba-student-terrain-indoor').tooltip('dispose').tooltip({title: getRichTooltip("images/ui/Ingame_Emo_Adaptresult" + terrain_adaption[adaption["indoor"]] + ".png", 'Combat Power ' + terrain_adaption[adaption["indoor"]], null, null, getAdaptionText('indoor', terrain_adaption[adaption["indoor"]]), 30), placement: 'top', html: true})
}

function recalculateWeaponPreview() {
    var level = $("#ba-weaponpreview-levelrange").val()
    var levelscale = ((level-1)/99).toFixed(4)
    $(`#ba-weapon-stat-attack-amount`).text('+'+Math.round(student.weapon_attack_power_1 + (student.weapon_attack_power_100-student.weapon_attack_power_1) * levelscale))
    $(`#ba-weapon-stat-maxhp-amount`).text('+'+Math.round(student.weapon_maxhp_1 + (student.weapon_maxhp_100-student.weapon_maxhp_1) * levelscale))
    $(`#ba-weapon-stat-healing-amount`).text('+'+Math.round(student.weapon_heal_power_1 + (student.weapon_heal_power_100-student.weapon_heal_power_1) * levelscale))
}

function recalculateStatPreview() {

    var minlevelreq = [0, 15, 35]
    var maxbond = [10, 10, 20, 20, 50]
    var strikerBonus = $('#ba-student-stat-table').hasClass("table-striker-bonus")

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
    var maxHP,attack,defense,healing,accuracy,evasion,crit,crit_dmg,stability,range,ammo_cost,ammo_count
    if (showVehicleStats) {
        let vehicle = find(data.tss_vehicles, 'id', student.tss_id)[0]
        maxHP = Math.ceil((Math.round((vehicle.maxhp_1 + (vehicle.maxhp_100-vehicle.maxhp_1) * levelscale).toFixed(4)) * starscale_hp[stat_preview_stars-1]).toFixed(4))
        attack = Math.ceil((Math.round((vehicle.attack_power_1 + (vehicle.attack_power_100-vehicle.attack_power_1) * levelscale).toFixed(4)) * starscale_attack[stat_preview_stars-1]).toFixed(4))
        defense = Math.round((vehicle.defense_power_1 + (vehicle.defense_power_100-vehicle.defense_power_1) * levelscale).toFixed(4))
        healing = Math.ceil((Math.round((vehicle.heal_power_1 + (vehicle.heal_power_100-vehicle.heal_power_1) * levelscale).toFixed(4)) * starscale_healing[stat_preview_stars-1]).toFixed(4))
        accuracy = vehicle.accuracy
        evasion = vehicle.evasion
        stability = vehicle.stability
        range = vehicle.range
        critical = vehicle.critical
        critical_dmg = vehicle.critical_dmg
        ammo_count = vehicle.ammo_count
        ammo_cost = vehicle.ammo_cost
    } else {
        maxHP = Math.ceil((Math.round((student.maxhp_1 + (student.maxhp_100-student.maxhp_1) * levelscale).toFixed(4)) * starscale_hp[stat_preview_stars-1]).toFixed(4))
        attack = Math.ceil((Math.round((student.attack_power_1 + (student.attack_power_100-student.attack_power_1) * levelscale).toFixed(4)) * starscale_attack[stat_preview_stars-1]).toFixed(4))
        defense = Math.round((student.defense_power_1 + (student.defense_power_100-student.defense_power_1) * levelscale).toFixed(4))
        healing = Math.ceil((Math.round((student.heal_power_1 + (student.heal_power_100-student.heal_power_1) * levelscale).toFixed(4)) * starscale_healing[stat_preview_stars-1]).toFixed(4))
        accuracy = student.accuracy
        evasion = student.evasion
        stability = student.stability
        range = student.range
        critical = student.critical
        critical_dmg = student.critical_dmg
        ammo_count = student.ammo_count
        ammo_cost = student.ammo_cost
    }



    if ($('#ba-statpreview-includegear').hasClass('active')) {
        var gear = []
        var tier = 1

        gear[0] = find(data.common.gear,"type",student.gear[0])[0]
        gear[1] = find(data.common.gear,"type",student.gear[1])[0]
        gear[2] = find(data.common.gear,"type",student.gear[2])[0]

        $.each(gear, function(i, el) {
            tier = $(`#ba-statpreview-gear${i+1}-range`).val()
            if (level >= minlevelreq[i]) {
                for (let j = 0; j < el.items[tier-1].bonus_stats.length; j++) {
                    bonus[el.items[tier-1].bonus_stats[j]] += el.items[tier-1].bonus_stats_parameters[j][1]    
                }
            }
        })
    }

    if ($('#ba-statpreview-includebond').hasClass('active')) {
        for (let i = 1; i <= student_bondalts.length+1; i++) {
            var bondlevel = $(`#ba-statpreview-bond-${i}-range`).val()
            var bondbonus = getBondStats(i == 1 ? student : student_bondalts[i-2], i == 1 ? Math.min(maxbond[stat_preview_stars-1], bondlevel) : bondlevel)
            $.each(bondbonus, function(j, el) {bonus[j] += el})
        }
    }

    if ((stat_preview_stars == 5) && (stat_preview_weapon_stars > 0)) {
        var weaponlevel = (stat_preview_weapon_stars*10) + 20
        var weaponlevelscale = ((weaponlevel-1)/99).toFixed(4)
        bonus["attack_power"] += Math.round((student.weapon_attack_power_1 + (student.weapon_attack_power_100-student.weapon_attack_power_1) * weaponlevelscale).toFixed(4))
        bonus["maxhp"] += Math.round((student.weapon_maxhp_1 + (student.weapon_maxhp_100-student.weapon_maxhp_1) * weaponlevelscale).toFixed(4))
        bonus["heal_power"] += Math.round((student.weapon_heal_power_1 + (student.weapon_heal_power_100-student.weapon_heal_power_1) * weaponlevelscale).toFixed(4))

        $.each(student.weapon_bonus_stats, function(i, el) {
            bonus[student.weapon_bonus_stats[i]] += Math.round((student.weapon_bonus_stats_parameters[i][0] + (student.weapon_bonus_stats_parameters[i][1]-student.weapon_bonus_stats_parameters[i][0]) * weaponlevelscale).toFixed(4))
        }) 
    }
    
    

    if (!strikerBonus || showVehicleStats) {
        $('#ba-student-stat-maxhp').text(Math.round(((maxHP+bonus["maxhp"])*bonus["maxhp_percent"]).toFixed(4)).toLocaleString())
        $('#ba-student-stat-attack').text(Math.round(((attack+bonus["attack_power"])*bonus["attack_power_percent"]).toFixed(4)).toLocaleString())
        $('#ba-student-stat-defense').text((defense+bonus["defense_power"]).toLocaleString())
        $('#ba-student-stat-healing').text(Math.round(((healing+bonus["heal_power"])*bonus["heal_power_percent"]).toFixed(4)).toLocaleString())
    } else {
        $('#ba-student-stat-maxhp').text('+'+Math.floor(((maxHP+bonus["maxhp"])*bonus["maxhp_percent"]).toFixed(4)*0.1).toLocaleString())
        $('#ba-student-stat-attack').text('+'+Math.floor(((attack+bonus["attack_power"])*bonus["attack_power_percent"]).toFixed(4)*0.1).toLocaleString())
        $('#ba-student-stat-defense').text('+'+Math.floor((defense+bonus["defense_power"])*0.05).toLocaleString())
        $('#ba-student-stat-healing').text('+'+Math.floor(((healing+bonus["heal_power"])*bonus["heal_power_percent"]).toFixed(4)*0.05).toLocaleString())
    }

    $('#ba-student-stat-accuracy').text((accuracy+bonus["accuracy"]).toLocaleString())
    $('#ba-student-stat-evasion').text(evasion.toLocaleString())
    var totalcrit = critical+bonus["critical"]-100
    $('#ba-student-stat-crit').text((critical+bonus["critical"]).toLocaleString())//.tooltip('dispose').tooltip({title: `<b>${parseFloat(((totalcrit/(totalcrit+650))*100).toFixed(2))}%</b> critical chance against a target with 100 crit resistance.`, placement: 'top', html: true})
    $('#ba-student-stat-critdmg').text(`${parseFloat(((critical_dmg+bonus["critical_damage"])/100).toFixed(4)).toLocaleString()}%`)

    $('#ba-student-stat-stability').text(stability.toLocaleString()).tooltip('dispose')//.tooltip({title: getRichTooltip(null, 'Damage Variance', null, `<b>${parseFloat((((student.stability/(student.stability+997))+0.2)*100).toFixed(2))}%</b> ~ 100%`), placement: 'top', html: true})
    $('#ba-student-stat-range').text(range.toLocaleString())
    $('#ba-student-stat-ccpower').text(`${Math.round(((100*bonus["cc_power_percent"])).toFixed(4)).toLocaleString()}`)
    $('#ba-student-stat-ccresist').text(`${Math.round(((100*bonus["cc_resist_percent"])).toFixed(4)).toLocaleString()}`)

    if (student.type == "Striker" || showVehicleStats) {
        $('#ba-student-stat-ammo').text(ammo_count + " (" + ammo_cost + ")")
    } else {
        $('#ba-student-stat-ammo').text('N/A')
    }
    
    //$('#ba-student-stat-costrecovery').text(student.cost_recovery)
    $('#ba-student-stat-critresist').text(100+bonus["critical_resist"])
    $('#ba-student-stat-critdmgresist').text(`${parseFloat(((5000+bonus["critical_damage_resist"])/100).toFixed(4))}%`)
    $('#ba-student-stat-recoveryrate').text(`${parseFloat(((10000+bonus["healing_received"])/100).toFixed(4))}%`)
}

function recalculateEXSkillPreview() {
    var skillLevelEX = $("#ba-skillpreview-exrange").val()

    $('#ba-skill-ex-description').html(getSkillText(student[`skill_ex_description_${userLang}`] ? student[`skill_ex_description_${userLang}`] : student[`skill_ex_description_en`], student[`skill_ex_parameters_${userLang}`] ? student[`skill_ex_parameters_${userLang}`] : student['skill_ex_parameters'], skillLevelEX, student.attack_type))
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    $('.ba-skill-ex-materials').hide()
    $('#ba-skill-ex-materials-'+skillLevelEX).show()
    $('#ba-skill-ex-cost').text(student.skill_ex_cost[skillLevelEX-1])

}

function recalculateSkillPreview() {
    var skillLevel = $("#ba-skillpreview-range").val()

    $('#ba-skill-normal-description').html(getSkillText(student[`skill_normal_description_${userLang}`] ? student[`skill_normal_description_${userLang}`] : student[`skill_normal_description_en`], student.skill_normal_parameters, skillLevel, student.attack_type))
    $('#ba-skill-passive-description').html(getSkillText(student[`skill_passive_description_${userLang}`] ? student[`skill_passive_description_${userLang}`] : student[`skill_passive_description_en`], student.skill_passive_parameters, skillLevel, student.attack_type))
    $('#ba-skill-sub-description').html(getSkillText(student[`skill_sub_description_${userLang}`] ? student[`skill_sub_description_${userLang}`] : student[`skill_sub_description_en`], student.skill_sub_parameters, skillLevel, student.attack_type))
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    $('.ba-skill-materials').hide()
    $('#ba-skill-materials-'+skillLevel).show()
}

function getStudentListCardHTML(student) {
    var html = `
    <div id="ba-student-select-${student["id"]}" class="ba-select-grid-item unselectable">
        <div onclick="loadStudent('${student["name_dev"]}')" class="ba-student-card">
            <div class="ba-student-card-portrait"><img class="ba-student-card-portrait-img" src="images/student/collection/${student.portrait_img}.webp"></div>
            <span class="ba-student-card-role bg-${student["type"].toLowerCase()}-t"><img src="images/ui/Role_${student["role"]}.png" style="width:100%"></span>
            <span class="ba-student-card-atk bg-atk-${student["attack_type"].toLowerCase()}-t"><img src="images/ui/Type_Attack_s.png" style="width:100%;"></span>
            <span class="ba-student-card-def bg-def-${student["defense_type"].toLowerCase()}-t"><img src="images/ui/Type_Defense_s.png" style="width:100%;"></span>
            <img class="ba-student-card-star" style="right: 2px; top: 2px;" src="images/ui/Common_Icon_Formation_Star_R${student["stars"]}.png">
            <div class="d-flex align-items-center ba-student-card-label">
                <span class="ba-label-text px-1 align-middle ${student['name_'+userLang].length > label_smalltext_threshold[userLang] ? "smalltext" : ""}" style="width: 100%">${student['name_'+userLang]}</span>
                <span class="ba-hover-text px-1 align-middle ${student['name_'+userLang].length > label_smalltext_threshold[userLang] ? "smalltext" : ""}" style="display: none; width: 100%">${student['name_'+userLang]}</span>
            </div>
        </div>
    </div>`
    //html += `<span class="px-1 align-middle ${label.length > 11 ? "smalltext" : ""}" style="width: 100%">${label.replace(' (','\n(')}</span>`
    return html
}

function getItemCardHTML(item, linkid, icontype) {

    var html = `<div id="ba-item-select-${item["id"]}" class="ba-select-grid-item unselectable" title="${getBasicTooltip(getLocalStringIfAvailable(item,'name'))}">
    <div onclick="loadItem('${linkid}')" class="ba-item-card">
    <div class="ba-item-card-img"><img class="ba-item-${item.rarity.toLowerCase()}" loading="lazy" src="images/${icontype}/${item["icon"]}.png"></div></div></div>`
    return html
}

function getStageCardHTML(stage) {
    var html = `<div id="ba-stage-select-${stage["id"]}" class="ba-select-grid-item unselectable">
    <div onclick="loadStage('${stage["id"]}')" class="ba-stage-card">
    <div class="ba-stage-card-img"><img loading="lazy" src="images/campaign/${stage["icon"]}.png"></div>
    <div class="d-flex align-items-center ba-select-grid-card-label">`
    if (stage.id >= 7000000) {
        html += `<span class="ba-label-text px-1 align-middle" style="width: 100%">${event_area[stage.area] + ' ' + stage.stage.toString().padStart(2,'0')}</span>`
    } else if (stage.id < 1000000) {
        html += `<span class="ba-label-text px-1 align-middle ${stage['name_'+userLang].length > label_enemy_smalltext_threshold[userLang] ? "smalltext" : "" }" style="width: 100%">${stage['name_'+userLang]}</span>`
    } else {
        html += `<span class="ba-label-text px-1 align-middle" style="width: 100%">${stage.area+'-'+stage.stage+ (stage.difficulty == 1 ? ' Hard' : ' Normal')}</span>`
    }
    html += `</div></div></div>`
    return html
}

function getRaidCardHTML(raid, terrain='') {
    var html = `<div id="ba-raid-select-${raid["id"]}" class="ba-select-grid-item unselectable">
    <div onclick="loadRaid('${raid["name_dev"]}')" class="ba-raid-card">
    <div class="ba-raid-card-bg-container"><div class="ba-raid-card-bg" style="background-image:url('images/raid/${raid['background_img']}.png');"></div></div>
    <div class="ba-raid-card-img"><img src="images/raid/${raid["portrait_img"]}.png"></div>
    <div class="d-flex align-items-center ba-select-grid-card-label"><span class="ba-label-text px-1 align-middle" style="width: 100%">${raid['name_'+userLang] + ((terrain != '') ? ' ('+terrain+')' : '')}</span></div></div></div>`
    return html
}

function getEnemyCardHTML(enemy, level, grade) {
    var html = `<div class="ba-icon-enemy unselectable" onclick="showEnemyInfo(${enemy.id},${level},${grade})"><img src="images/enemy/${enemy.icon}.png">`
    if (enemy.rank == 'Elite') html += `<span class="ba-enemy-card-rank"><img src="images/ui/Common_Icon_Enemy_Elite.png" style="width:22px;"></span>`
    else if (enemy.rank == 'Champion') html += `<span class="ba-enemy-card-rank"><img src="images/ui/Common_Icon_Enemy_Champion.png" style="width:31px;"></span>`
    html += `<span class="ba-enemy-card-lv">Lv.${level}</span><span class="ba-enemy-card-atk bg-atk-${enemy["attack_type"].toLowerCase()}"><img src="images/ui/Type_Attack_s.png" style="width:100%;"></span>
    <span class="ba-enemy-card-def bg-def-${enemy["defense_type"].toLowerCase()}"><img src="images/ui/Type_Defense_s.png" style="width:100%;"></span><div class="d-flex align-items-center ba-select-grid-card-label"><span class="ba-label-text px-1 align-middle ${enemy['name_'+userLang].length > label_enemy_smalltext_threshold[userLang] ? 'smalltext' : ''}" style="width: 100%">${enemy['name_'+userLang]}</span></div></div>`
    return html
}

function showEnemyInfo(id, level, grade=1) {
    var enemy = find(data.enemies, 'id', id)[0]
    $('#ba-stage-enemy-name').text(enemy['name_'+userLang])
    $('#ba-stage-enemy-img').attr('src', `images/enemy/${enemy.icon}.png`)
    $('#ba-stage-enemy-rank').text('Lv.'+level + ' ' + getLocalizedString('enemy_rank', enemy.rank.toLowerCase()))
    $('#ba-stage-enemy-class').text(enemy.type).removeClass("bg-striker bg-special").addClass(`bg-${enemy.type.toLowerCase()}`)

    $("#ba-stage-enemy-attacktype").removeClass("bg-atk-normal bg-atk-explosive bg-atk-piercing bg-atk-mystic").addClass(`bg-atk-${enemy.attack_type.toLowerCase()}`)
    $("#ba-stage-enemy-defensetype").removeClass("bg-def-light bg-def-heavy bg-def-special").addClass(`bg-def-${enemy.defense_type.toLowerCase()}`)
    
    $("#ba-stage-enemy-attacktype-label").text(getLocalizedString('attack_type',enemy.attack_type.toLowerCase()))
    $('#ba-stage-enemy-attacktype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${enemy.attack_type}`, 'Attack Type', null, getTypeText(enemy.attack_type), 32), placement: 'top', html: true})
    $("#ba-stage-enemy-defensetype-label").text(getLocalizedString('defense_type',enemy.defense_type.toLowerCase()))
    $('#ba-stage-enemy-defensetype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${enemy.defense_type} Armor`, 'Defense Type', null, getTypeText(enemy.defense_type), 32), placement: 'top', html: true})

    var levelscale = ((level-1)/99).toFixed(4)

    // var maxHP = Math.round((enemy.maxhp_1 + (enemy.maxhp_100-enemy.maxhp_1) * levelscale).toFixed(4))
    // var attack = Math.round((enemy.attack_power_1 + (enemy.attack_power_100-enemy.attack_power_1) * levelscale).toFixed(4))
    // var defense = Math.round((enemy.defense_power_1 + (enemy.defense_power_100-enemy.defense_power_1) * levelscale).toFixed(4))
    // var healing = Math.round((enemy.heal_power_1 + (enemy.heal_power_100-enemy.heal_power_1) * levelscale).toFixed(4))

    var maxHP = Math.ceil((Math.round((enemy.maxhp_1 + (enemy.maxhp_100-enemy.maxhp_1) * levelscale).toFixed(4)) * starscale_hp[grade-1]).toFixed(4))
    var attack = Math.ceil((Math.round((enemy.attack_power_1 + (enemy.attack_power_100-enemy.attack_power_1) * levelscale).toFixed(4)) * starscale_attack[grade-1]).toFixed(4))
    var defense = Math.round((enemy.defense_power_1 + (enemy.defense_power_100-enemy.defense_power_1) * levelscale).toFixed(4))
    var healing = Math.ceil((Math.round((enemy.heal_power_1 + (enemy.heal_power_100-enemy.heal_power_1) * levelscale).toFixed(4)) * starscale_healing[grade-1]).toFixed(4))

    
    $('#ba-stage-enemy-stat-maxhp').text(maxHP.toLocaleString())
    $('#ba-stage-enemy-stat-attack').text(attack.toLocaleString())
    $('#ba-stage-enemy-stat-defense').text(defense.toLocaleString())
    $('#ba-stage-enemy-stat-healing').text(healing.toLocaleString())


    $('#ba-stage-enemy-stat-accuracy').text(enemy.accuracy.toLocaleString())
    $('#ba-stage-enemy-stat-evasion').text(enemy.evasion.toLocaleString())
    $('#ba-stage-enemy-stat-crit').text(enemy.critical.toLocaleString())
    $('#ba-stage-enemy-stat-critdmg').text(`${parseFloat(((enemy.critical_dmg)/100).toFixed(4)).toLocaleString()}%`)

    $('#ba-stage-enemy-stat-stability').text(enemy.stability.toLocaleString())
    $('#ba-stage-enemy-stat-range').text(enemy.range.toLocaleString())

    if (enemy.type == "Striker") {
        $('#ba-stage-enemy-stat-ammo').text(enemy.ammo_count + " (" + enemy.ammo_cost + ")")
    } else {
        $('#ba-stage-enemy-stat-ammo').text('N/A')
    }

    $('#ba-stage-enemy-stat-critresist').text(enemy.critical_res.toLocaleString())
    $('#ba-stage-enemy-stat-critdmgresist').text(`${parseFloat(((enemy.critical_dmg_res)/100).toFixed(4))}%`)
    $('#ba-stage-enemy-stat-movespeed').text(enemy.move_speed.toLocaleString())

}

function getMaterialIconHTML(id, amount) {
    //rarity, icon, name, amount, type, description=""
    var item
    if (id >= 3000000) {
        item = find(data.common.currency, "id", id-3000000)[0]
    } else {
        item = find(data.items, "id", id)[0]
    }
    var html
    html = `<div class="drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${item.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/items/${item.icon}.png`, item[`name_${userLang}`], item.type, getRarityStars(item.rarity), item[`desc_${userLang}`], 50, 'img-scale-larger')}">
            <img class="ba-item-icon ba-item-${item.rarity.toLowerCase()}" src="images/items/${item.icon}.png"><span class="ba-material-label" style="cursor:pointer;">&times;${amount}</span></div>
            `
    return html
}

function getDropIconHTML(id, chance) {
    //rarity, icon, name, amount, type, description=""
    var item, type, haslink
    if (id >= 3000000) {
        item = find(data.common.currency, "id", id-3000000)[0]
        type = 'items'
        haslink = true
    } else if (id >= 2000000) {
        item = find(data.common.equipment, "id", id-2000000)[0]
        type = 'equipment'
        haslink = true
    } else if (id >= 1000000) {
        item = find(data.furniture, "id", id-1000000)[0]
        type = 'furniture'
        haslink = true
    } else if (id >= 30000 && id < 80000) {
        item = find(data.common.item_box, "id", id)[0]
        type = 'items'
        haslink = false
    } else {
        item = find(data.items, "id", id)[0]
        type = 'items'
        haslink = true
    }
    let rarityText = ''
    if (type == 'equipment' && item.id >= 1000) {
        rarityText = `T${(item.id%10)+1}`
    } else {
        rarityText = getRarityStars(item.rarity)
    }
    var html
    html = `<div class="drop-shadow" style="position: relative; ${haslink ? 'cursor:pointer;" onclick="loadItem('+id+')"' : '"'} data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/${type}/${item.icon}.png`, getLocalStringIfAvailable(item,'name'), getLocalizedString('item_type',item.type), rarityText, getLocalStringIfAvailable(item,'desc'), 50, 'img-scale-larger')}">
            <img class="ba-item-icon ba-item-${item.rarity.toLowerCase()}" src="images/${type}/${item.icon}.png"><span class="ba-material-label" ${haslink ? 'style="cursor:pointer;"' : ""}>${chance >= 1 ? '&times;'+abbreviateNumber(parseInt(chance).toFixed(0)).toLocaleString(): parseFloat((chance*100).toFixed(2)) + '&#37;'}</span></div>
            `
    return html
}

function getStudentIconSmall(student) {
    var html = `<div class="ba-item-student drop-shadow d-inline-block" style="position: relative; cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" onclick="loadStudent('${student['name_dev']}')" title="${getRichTooltip(`images/student/icon/${student.portrait_img}.png`, student[`name_${userLang}`], 'Character', getRarityStars(student.stars), student[`profile_${userLang}`] ? student[`profile_${userLang}`].split('\n')[0] : student['profile_ja'].split('\n')[0], 50, 'circle')}"><img src="images/student/icon/${student.portrait_img}.png"></div>`
    return html
}

function getFavourIconHTML(id, grade) {
    var gift = find(data.items, "id", 5000+id)[0]
    var html = `<div class="ba-favor-item drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${gift.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/items/${gift.icon}.png`, gift[`name_${userLang}`], getLocalizedString('item_type',gift.type), getRarityStars(gift.rarity), gift[`desc_${userLang}`], 50, 'img-scale-larger')}">
            <img class="ba-item-icon ba-item-${gift.rarity.toLowerCase()}" src="images/items/${gift.icon}.png">
            <img class="ba-favor-label" src="images/ui/Cafe_Interaction_Gift_0${grade}.png"></div>
            `
    return html
}

function getFurnitureIconHTML(item) {
    var html = `<div class="ba-favor-item drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${item.id+1000000})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/furniture/${item.icon}.png`, getLocalStringIfAvailable(item,'name'), getLocalizedString('item_type',item.type), getRarityStars(item.rarity), getLocalStringIfAvailable(item, 'desc'), 50, 'img-scale-larger')}">
    <img class="ba-item-icon ba-item-${item.rarity.toLowerCase()} mb-2" src="images/furniture/${item.icon}.png"></div>
    `
    return html
}

function recalculateWeaponSkillPreview() {
    var skillLevel = $("#ba-weapon-skillpreview-range").val()
    $('#ba-weapon-skill-passive-description').html(getSkillText(student[`weapon_skill_passive_description_${userLang}`] ? student[`weapon_skill_passive_description_${userLang}`] : student[`weapon_skill_passive_description_en`], student.weapon_skill_passive_parameters, skillLevel, student.attack_type))
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function recalculateBondPreview() {
    var level = $("#ba-bond-levelrange").val()
    var bondbonus = getBondStats(student, level)
    $("#ba-student-bond-1-amount").text('+'+bondbonus[student.bond_stat[0]])
    $("#ba-student-bond-2-amount").text('+'+bondbonus[student.bond_stat[1]])    
}

function getBondStats(student, level) {
    var stat1 = 0, stat2 = 0
    for (let i = 1; i < Math.min(level, 50); i++) {
        if (i < 20) {
            stat1 += student.bond_stat_value[Math.floor(i / 5)][0]
            stat2 += student.bond_stat_value[Math.floor(i / 5)][1]
        } else if (i < 50) {
            stat1 += student.bond_stat_value[2 + Math.floor(i / 10)][0]
            stat2 += student.bond_stat_value[2 + Math.floor(i / 10)][1]
        }
    }
    return {[student.bond_stat[0]]: stat1, [student.bond_stat[1]]: stat2}
}

function changeStatPreviewStars(stars, weaponstars) {
    stat_preview_stars = stars
    stat_preview_weapon_stars = weaponstars

    for (let i = 1; i <= 5; i++) {
        //i <= stars ? $("#ba-statpreview-star-" + i).attr("src", "images/ui/Common_Icon_Formation_Star.png") : $("#ba-statpreview-star-" + i).attr("src", "images/ui/Common_Icon_Formation_Star_Disable.png")
        $("#ba-statpreview-star-" + i).toggleClass("active", i <= stars)
    }

    for (let i = 1; i <= 3; i++) {
        //i <= weaponstars ? $("#ba-weaponpreview-star-" + i).attr("src", "images/ui/Common_Icon_Formation_Star_2.png") : $("#ba-weaponpreview-star-" + i).attr("src", "images/ui/Common_Icon_Formation_Star_Disable.png")
        $("#ba-weaponpreview-star-" + i).toggleClass("active", i <= weaponstars)
    }

    recalculateStatPreview()
    recalculateTerrainAffinity()
}


function populateItemList() {
    html = {"Material":"", "Favor":"", "SecretStone":"", "Furniture":"", "Equipment":"", "Coin":""}
    $.each(data.items, function(i,el) {
        if (el.released[regionID])
        html[el.type] += getItemCardHTML(el,el.id,'items')
    })
    $.each(data.furniture, function(i,el) {
        if (el.released[regionID])
        html['Furniture'] += getItemCardHTML(el,el.id+1000000,'furniture')
    })
    $.each(data.common.equipment, function(i,el) {
        if (el.released[regionID])
        html['Equipment'] += getItemCardHTML(el,el.id+2000000,'equipment')
    })
    $('#ba-item-list-materials-grid').html(html['Material'])
    $('#ba-item-list-gifts-grid').html(html['Favor'])
    $('#ba-item-list-eleph-grid').html(html['SecretStone'])
    $('#ba-item-list-currency-grid').html(html['Coin'])
    $('#ba-item-list-furniture-grid').html(html['Furniture'])
    $('#ba-item-list-equipment-grid').html(html['Equipment'])
    $('.ba-select-grid-item').tooltip({html: true, delay: { show: 200, hide: 0 }})
}

function populateCraftList() {
    html = []
    html[0] = ""
    html[1] = ""
    html_h1= `<div id="stages-list-events-grid-header-1" class="w-100 ba-grid-header mb-2 p-2"><h3 class="mb-0">${getLocalizedString('node_tier',"1")}</h3></div>`
    html_h2 = `<div id="stages-list-events-grid-header-2" class="w-100 ba-grid-header my-2 p-2"><h3 class="mb-0">${getLocalizedString('node_tier',"2")}</h3></div>`
    data.crafting.nodes.sort((a,b) => a.grade - b.grade)
    data.crafting.nodes.sort((a,b) => b.icon.localeCompare(a.icon))
    $.each(data.crafting.nodes, function(i,el) {
        if (el.released[regionID] && el.chance > 0)
        html[el.tier-1] += getCraftingCardHTML(el)
    })

    $('#ba-craft-list-nodes-grid').html(html_h1 + html[0] + html_h2 + html[1])
}

function getCraftingCardHTML(node) {
    let html = `<div class="ba-craft-node ba-student-info ba-panel ba-node-grade-${node.grade}" onclick="loadCraft(${node.id})"><img class="ba-craft-node-img" src="images/ui/${node.icon}.png"><span style="margin-left:20px">${getLocalStringIfAvailable(node, "name")}</span></div>`
    return html
}

function populateStageList() {
    var html
    html = ''
    $.each(data.stages.missions, function(i,el) {
        if (el.released[regionID])
        html += getStageCardHTML(el)
    })
    $('#ba-stages-list-missions-grid').html(html)
    html = ''
    $.each(data.stages.bounty, function(i,el) {
        if (el.released[regionID])
        html += getStageCardHTML(el)
    })
    $('#ba-stages-list-bounty-grid').html(html)
    html = ''
    $.each(data.stages.commissions, function(i,el) {
        if (el.released[regionID])
        html += getStageCardHTML(el)
    })
    $('#ba-stages-list-commissions-grid').html(html)
    html = ''
    $.each(data.stages.schooldungeon, function(i,el) {
        if (el.released[regionID])
        html += getStageCardHTML(el)
    })
    $('#ba-stages-list-schooldungeon-grid').html(html)
    html = ''
    $.each(data.stages.events, function(i,el) {
        if (el.released[regionID]) {
            html += `<div id="stages-list-events-grid-header-${el.id}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('event_name',String(el.id))}</h3></div>`
            for (let j = 0; j < el.stages.length; j++) {
                html += getStageCardHTML(el.stages[j])
            }
        }
    })
    $('#ba-stages-list-events-grid').html(html)
}

function populateRaidList() {
    var html = ''

    var html
    html = ''
    $.each(data.raids, function(i,el) {
        if (el.released[regionID])
        html += getRaidCardHTML(el)
    })
    $('#ba-raid-list-raid-grid').html(html)

    // data.raids.forEach(function(el) {
    //     if (el.released[regionID]) {
    //         html += `<div class="ba-raid-list-entry my-2 text-shadow" style="background-image: url('images/raid/${el.background_img}.png')" onclick="loadRaid('${el.name_dev}')"><img class="ba-raid-portrait" src="images/raid/${el.portrait_img}.png"><span style="color:#fff;font-size:26px;font-weight:bold;position:absolute;left:10px;top:3px;">${el.name_en}</span></div>`
    //     }
    // })

    // $("#ba-raid-list").html(html)
}

function getUsedByStudents(item) {
    var html = '', headerText = 'Used by the following characters'
    if (item.type == 'Equipment') {
        headerText = 'Used by the following characters'
        let equiptype = item.icon.split('_')[2]
        $.each(data.students, function(i,el){
            if (!el.released[regionID]) return
            if (el.gear[0] == equiptype || el.gear[1] == equiptype || el.gear[2] == equiptype)
            html += getStudentIconSmall(el)
        })
    } else if (item.type == 'Furnitures' || item.type == 'Decorations') {
        headerText = 'The following characters interact with this furniture'
        $.each(data.students, function(i,el){
            if (!el.released[regionID])
            return
            let uses = false
            for (let i = 0; i < el.favoured_furniture.length; i++) {
                if (item.id == el.favoured_furniture[i]) {
                    uses = true
                }
            }
            if (uses)
            html += getStudentIconSmall(el)
        })
    } else if (item.type == 'Material') {
        headerText = 'Used to improve the following characters\' skills'
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
            html += getStudentIconSmall(el)
        })
    } else if (item.type == 'SecretStone') {
        headerText = 'Used to rank up the following character'
        let chara = find(data.students, 'id', item.id)[0]
        html += getStudentIconSmall(chara)
    }
    if (html != '') {
        $('#ba-item-usage').show()
        return `<div class="mb-2"><i>${headerText}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">` + html + '</div>'
    } else {
        return ''
    }
    
}

function getLikedByStudents(item) {
    var htmlLoves = `<div class="mb-2"><i>Loved by the following characters</i></div><div class="d-flex align-items-center justify-content-center flex-wrap mb-2">`
    var htmlLikes = `<div class="mb-2"><i>Liked by the following characters</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">`
    $.each(data.students, function(i,el){
        if (!el.released[regionID])
        return
        let allTags = el.favoured_item_tags
        allTags.push(el.favoured_item_unique[0])
        let favItems = getFavouriteItems(allTags)
        let likes = false, loves = false
        for (let i = 0; i < favItems[0].length; i++) {
            if (item.id-5000 == favItems[0][i]) {
                loves = true
                break
            }
        }
        for (let i = 0; i < favItems[1].length; i++) {
            if (item.id-5000 == favItems[1][i]) {
                likes = true
                break
            }
        }
        
        let html = getStudentIconSmall(el)
        if (likes) htmlLikes += html
        if (loves) htmlLoves += html
    })
    htmlLikes += "</div>"
    htmlLoves += "</div>"
    $('#ba-item-usage').show()
    return htmlLoves + htmlLikes
}

function getItemDropStages(itemID) {
    let html = ''
    $.each(data.stages.missions, function(i,el){
        if (!el.released[regionID])
        return
        let drop = false
        for (let i = 0; i < el.drops.length; i++) {
            if (itemID == el.drops[i][0]) {
                drop = true
                break
            }
        }
        if (drop)
        html += '<div class="m-1">' + getStageCardHTML(el) + '</div>'
    })
    $.each(data.stages.schooldungeon, function(i,el){
        if (!el.released[regionID])
        return
        let drop = false
        for (let i = 0; i < el.rewards.length; i++) {
            if (itemID == el.rewards[i][0]) {
                drop = true
                break
            }
        }
        for (let i = 0; i < el.drops.length; i++) {
            if (itemID == el.drops[i][0]) {
                drop = true
                break
            }
        }
        if (drop)
        html += '<div class="m-1">' + getStageCardHTML(el) + '</div>'
    })
    if (html != '') {
        $('#ba-item-sources').show()
        return '<div class="mb-2"><i>Obtained from the following missions</i></div><div class="d-flex justify-content-center flex-wrap">' + html + '</div>'
    } else {
        return ''
    }
}

function loadJSON(list, success) {
    results = {}

    var loadPromise = Object.entries(list).map(function(el){
        return $.getJSON(el[1], function(result) {
            results[el[0]] = result
        })
    })

    Promise.all(loadPromise).then(function() {
        success(results)
    })
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

function findOrDefault(obj, key, value, default_value) {
    var result = []
    var default_result = []

    $.each(obj, function(i, el) {
        if (el[key] == value) {
            result.push(el)
        }

        if (el[key] == default_value) {
            default_result.push(el)
        }
    })

    if (result.length == 0) {
        return default_result
    } else {
        return result
    }
}

function getTypeText(type) {
    var text = ''
    switch (type) {
        case 'Normal':
            text += "Deals <b>1&times;</b> damage to <b class='ba-col-explosive'>Light</b>, <b class='ba-col-piercing'>Heavy</b> and <b class='ba-col-mystic'>Special</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class='ba-col-siege'>Structures</b>."
            break
        case 'Explosive':
            text += "Deals <b>2&times;</b> damage to <b class='ba-col-explosive'>Light</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class='ba-col-mystic'>Special</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class='ba-col-siege'>Structures</b>."
            break
        case 'Piercing':
            text += "Deals <b>2&times;</b> damage to <b class='ba-col-piercing'>Heavy</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class='ba-col-explosive'>Light</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class='ba-col-siege'>Structures</b>."
            break
        case 'Mystic':
            text += "Deals <b>2&times;</b> damage to <b class='ba-col-mystic'>Special</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class='ba-col-piercing'>Heavy</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class='ba-col-siege'>Structures</b>."
            break
        case 'Light':
            text += "Receives <b>2&times;</b> damage from <b class='ba-col-explosive'>Explosive</b> attacks.<br>Receives <b>0.5&times;</b> damage from <b class='ba-col-piercing'>Piercing</b> attacks."
            break
        case 'Heavy':
            text += "Receives <b>2&times;</b> damage from <b class='ba-col-piercing'>Piercing</b> attacks.<br>Receives <b>0.5&times;</b> damage from <b class='ba-col-mystic'>Mystic</b> attacks."
            break
        case 'Special':
            text += "Receives <b>2&times;</b> damage from <b class='ba-col-mystic'>Mystic</b> attacks.<br>Receives <b>0.5&times;</b> damage from <b class='ba-col-explosive'>Explosive</b> attacks."
            break
    }
    return text
}

function getSkillText(text, params, level, type) {
    
    var result = text
    var paramCount = 1
    var regex

    regex = /[0-9.]+[%s秒]/g
    result = result.replaceAll(regex, function(match) {return `<strong>${match}</strong>`})

    while (result.includes("<?"+paramCount+">")) {
        result = result.replace("<?"+paramCount+">", "<span class=\"ba-col-"+type.toLowerCase()+"\">" + params[paramCount-1][level-1] + "</span>")
        paramCount += 1
    }

    regex = /<d:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-debuff" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Debuff_${capture}.png`, data.common.buffs['Debuff_'+capture].tooltip_title, 'Debuff', null, data.common.buffs['Debuff_'+capture].tooltip_body, 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Debuff_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${data.common.buffs['Debuff_'+capture][`name_${userLang}`]}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Debuff_$1.png\">")

    regex = /<b:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-buff" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Buff_${capture}.png`, data.common.buffs['Buff_'+capture].tooltip_title, 'Buff', null, data.common.buffs['Buff_'+capture].tooltip_body, 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Buff_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${data.common.buffs['Buff_'+capture][`name_${userLang}`]}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Buff_$1.png\">")

    regex = /<c:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-cc" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_CC_${capture}.png`, data.common.buffs['CC_'+capture].tooltip_title, 'CC Effect', null, data.common.buffs['CC_'+capture].tooltip_body, 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_CC_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${data.common.buffs['CC_'+capture][`name_${userLang}`]}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_CC_$1.png\">")

    regex = /<s:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-special" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Special_${capture}.png`, data.common.buffs['Special_'+capture].tooltip_title, 'Status', null, data.common.buffs['Special_'+capture].tooltip_body, 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Special_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${data.common.buffs['Special_'+capture][`name_${userLang}`]}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Special_$1.png\">")

    return result
}

function getRichTooltip(icon, title, subtitle, rarity, body, imgsize = 50, imgclass = '') {
    var html =  `<span class='ba-tooltip'>`

    html += `<div class='ba-tooltip-header'>`
    if (icon != null) {
        html += `<div class='ba-tooltip-img'><img class='${imgclass}' src='${icon}' width='${imgsize}' height='${imgsize}'></div>`
    }
    html += `<div class='flex-fill d-flex flex-column'><div class='flex-fill d-flex flex-column justify-content-center'><div class='ba-tooltip-title'>${title.replace('-','&#8209;')}</div></div>`
    if (subtitle != null || rarity != null) {
        html += `<div class='d-flex align-items-center mt-auto'>`
        html += subtitle != null ? `<span class='ba-tooltip-subtitle flex-fill'>${subtitle}</span>` : ''
        html += rarity != null ? `<span class='ba-tooltip-rarity text-bold'>${rarity}</span>` : ''
        html += '</div>'
    }

    html += '</div></div>'
    
    if (body != null && body != "") {
        html += `<div class='ba-tooltip-body'>${body.replaceAll("\"", "&quot;")}</div>`
    }
    html += '</span>'
    return html
}

function getBasicTooltip(title) {
    var html =  `<span class='ba-tooltip'>`
    html += `<div class='ba-tooltip-header m-0'>`
    html += `<div class='d-flex justify-content-center w-100'><div class='ba-tooltip-title text-center fs-6'>${title}</div></div>`
    html += '</div>'
    html += '</span>'
    return html
}

function abbreviateNumber(number) {
    var result = number, th = 0, suffix = ['', 'K', 'M', 'B']
    while (result >= 1000) {
        th++
        result /= 1000
    }
    return result + suffix[th]
}

function toggleDarkTheme(theme) {
    // var darkTheme = $('#ba-navbar-themeswitcher').prop('checked')
    darkTheme = theme
    $(`#ba-navbar-themeswitcher button`).removeClass("active")
    $(`#ba-navbar-themeswitcher-${theme}`).addClass("active")
    localStorage.setItem("theme", theme)
    if (theme == 'auto') {
        $('body').toggleClass("theme-dark", window.matchMedia('(prefers-color-scheme: dark)').matches)
    } else {
        $('body').toggleClass("theme-dark", (theme == 'dark'))
    }
    document.querySelector('meta[name="theme-color"]').setAttribute('content', $('body').hasClass('theme-dark') ? '#212529' : '#dee2e6')
}

function toggleHighContrast() {
    var highContrast = $('#ba-navbar-contrast-toggle').prop('checked')
    localStorage.setItem("high_contrast", highContrast)
    $('body').toggleClass("high-contrast", highContrast)
}

function changeRegion(regID) {
    regionID = regID
    localStorage.setItem("region", regionID)
    location.reload()
}

function changeLanguage(lang) {
    userLang = lang
    localStorage.setItem("language", lang)
    // loadLanguage(lang)
    // loadStudent(student["name_dev"])
    // $("[id^=ba-navbar-languageselector-]").removeClass("active")
    // $(`#ba-navbar-languageselector-${userLang}`).addClass("active")
    location.reload()
}

function loadLanguage(lang) {
    $('*[data-localize-id]').each(function (i,el) {
        let key = $(el).data('localize-id').split(',')[0], value = $(el).data('localize-id').split(',')[1]
        $(el).html(getLocalizedString(key,value))
    })

    $('#ba-student-search-text').attr("placeholder", getLocalizedString('ui','student_search_textbox_placeholder'))
}

function getRarityStars(rarity) {
    switch (rarity) {
        case 'N': case 'R': case 1:
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(1)
        case 'SR': case 2:
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(2)
        case 'SSR': case 3:
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(3)
    }
}

function getRarityTier(rarity) {
    switch (rarity) {
        case 'N':
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(1)
        case 'R':
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(2)
        case 'SR':
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(3)
        case 'SSR':
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(4)
    }
}

function searchContains(substring, string) {
    if (userLang == 'ja') {
        if (string.includes(substring))
        return true
    } else {
        let a = string.toLowerCase().replace(/[^a-z0-9\- ]/g,''), b = substring.toLowerCase().replace(/[^a-z0-9\- ]/g,'')
        //whole match
        if (a.startsWith(b))
        return true
        //individual word match
        while (a.includes(' ')) {
            a = a.substring(a.indexOf(' ')+1)
            if (a.startsWith(b))
            return true
        }
    }

    return false
}

function allSearch() {
    let searchTerm = $('#ba-navbar-search').val().toLowerCase()
    if (searchTerm == "") {
        $('#navbar-search-results').html('').hide()
        $('#ba-navbar-search').removeClass('has-text results-open')
        $('#navbar-search-clear').hide()
        searchResultsCount = 0
        searchResultsSelection = 0
        return true
    }
    $('#navbar-search-clear').show()
    $('#ba-navbar-search').addClass('has-text')
    $('#navbar-search-results').html('').show()
    let results = [], maxResults = 6

    $.each(data.students, function(i,el){
        if (el['released'][regionID] && searchContains(searchTerm, el['name_'+userLang])) {
            results.push({'name': el['name_'+userLang], 'icon': 'images/student/collection/'+el.portrait_img+'.webp', 'type': 'Character', 'rarity': '', 'rarity_text': getRarityStars(el['stars']), 'onclick': `loadStudent('${el['name_dev']}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.raids, function(i,el){
        if (el['released'][regionID] && searchContains(searchTerm, el['name_'+userLang])) {
            results.push({'name': el['name_'+userLang], 'icon': 'images/raid/'+el.portrait_img+'.png', 'type': 'Total Assault Boss', 'rarity': '', 'rarity_text': '', 'onclick': `loadRaid('${el['name_dev']}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.items, function(i,el){
        if (el['released'][regionID] && searchContains(searchTerm, el['name_'+userLang])) {
            results.push({'name': el['name_'+userLang], 'icon': 'images/items/'+el['icon']+'.png', 'type': getLocalizedString('item_type', el.type), 'rarity': el['rarity'], 'rarity_text': getRarityStars(el['rarity']), 'onclick': `loadItem(${el['id']})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.furniture, function(i,el){
        if (searchContains(searchTerm, el['name_'+userLang])) {
            results.push({'name': el['name_'+userLang], 'icon': 'images/furniture/'+el['icon']+'.png', 'type': getLocalizedString('item_type', el.type), 'rarity': el['rarity'], 'rarity_text': getRarityStars(el['rarity']), 'onclick': `loadItem(${el['id']+1000000})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.common.equipment, function(i,el){
        if (searchContains(searchTerm, el['name_'+userLang])) {
            results.push({'name': el['name_'+userLang], 'icon': 'images/equipment/'+el['icon']+'.png', 'type': getLocalizedString('item_type', el.type), 'rarity': el['rarity'], 'rarity_text': getRarityStars(el['rarity']), 'onclick': `loadItem(${el['id']+2000000})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.missions, function(i,el){
        let stagecode = el['area']+'-'+el['stage']+' '+(el['difficulty'] == 1 ? 'Hard' : 'Normal')
        if (el['released'][regionID] && searchContains(searchTerm,stagecode)) {
            results.push({'name': stagecode, 'icon': 'images/campaign/'+el.icon+'.png', 'type': 'Mission', 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length > 0) {
        var html = ''
        for (let i = 0; i < results.length; i++) {
            html += `<div id="ba-search-result-item-${i+1}" class="ba-search-result-item" onclick="${results[i].onclick}; $('#navbar-search-clear').trigger('onclick');">
            <div class='ba-search-img'><img src='${results[i].icon}' class='ba-item-${results[i].rarity.toLowerCase()}' width=50 height=50></div>
            <div class='flex-fill d-flex flex-column'><div class='flex-fill d-flex flex-column justify-content-end'><div class='ba-search-name'>${results[i].name}</div></div>
            <div class='d-flex align-items-center mt-auto'>
            <span class='ba-search-subtitle flex-fill'>${results[i].type}</span>
            <span class='ba-search-rarity'>${results[i].rarity_text}</span></div></div></div>`
        }
        $('#navbar-search-results').html(html)
        $('#ba-navbar-search').addClass('results-open')
        searchResultsCount = results.length
        searchResultsSelection = 0
    } else {
        $('#navbar-search-results').hide()
        $('#ba-navbar-search').removeClass('results-open')
        searchResultsCount = 0
        searchResultsSelection = 0
    }
}

function searchNavigate(ev) {
    if (ev.keyCode == 13) {
        ev.preventDefault()
        if (ev.type == "keyup")
        $('#ba-search-result-item-'+searchResultsSelection).trigger("onclick")
    } if (ev.keyCode == 40) {
        ev.preventDefault()
        if (ev.type == "keydown" && searchResultsSelection < searchResultsCount) {
            searchResultsSelection++
            $('.ba-search-result-item').removeClass("selected")
            $('#ba-search-result-item-'+searchResultsSelection).addClass("selected")
        }
    } else if (ev.keyCode == 38) {
        ev.preventDefault()
        if (ev.type == "keydown" && searchResultsSelection > 1)  {
            searchResultsSelection--
            $('.ba-search-result-item').removeClass("selected")
            $('#ba-search-result-item-'+searchResultsSelection).addClass("selected")
        }
        
    } 
}

function clearSearchBar(el) {
    let searchbar = $('#'+el.dataset.target)
    searchbar.val('').blur().trigger('oninput')
    $(el).hide()
}

function getLocalizedString(key,value) {
    if (data.localization.strings.hasOwnProperty(key) && data.localization.strings[key].hasOwnProperty(value)) {
        if (data.localization.strings[key][value].hasOwnProperty(userLang)) {
            return data.localization.strings[key][value][userLang]
        } else {
            console.log(`Localization not defined for "${key}, ${value}" for locale "${userLang}"`)
            return data.localization.strings[key][value]['en']
        }
    } else {
        console.log(`Localization not defined for "${key}, ${value}"`)
        return "undefined!!!"
    }
}

function getLocalStringIfAvailable(obj, key) {
    if (obj[key+'_'+userLang]) return (obj[key+'_'+userLang])
    else if (obj[key+'_ja']) return (obj[key+'_ja'])
    else if (obj[key+'_en']) return (obj[key+'_en'])
    else return ''
}

function getFavouriteItems(tags) {
    let good = [], great = []
    for (let i = 0; i < max_gifts; i++) {
        let commonTags = find(data.items, "id", 5000+i)[0].tags.filter(val => tags.includes(val))
        if (commonTags.length == 1) {
            good.push(i)
        } else if (commonTags.length > 1) {
            great.push(i)
        }  
    }
    return [great, good]
}