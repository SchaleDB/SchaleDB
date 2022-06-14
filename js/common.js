$.holdReady(true)

const starscale_hp      = [1, 1.05,  1.12,  1.21,  1.35 ]
const starscale_attack  = [1, 1.1,   1.22,  1.36,  1.53 ]
const starscale_healing = [1, 1.075, 1.175, 1.295, 1.445] 
const raid_level = [17, 25, 35, 50, 70, 80]
const translation_code = {'en': 'En', 'ja': 'Jp'}
const label_smalltext_threshold = {'en':11, 'ja':5}
const label_enemy_smalltext_threshold = {'en':12, 'ja':6}
const label_raid_smalltext_threshold = {'en':20, 'ja':12}
const terrain_dmg_bonus = {D: 0.8, C: 0.9, B: 1, A: 1.1, S: 1.2, SS: 1.3}
const terrain_block_bonus = {D: 0, C: 15, B: 30, A: 45, S: 60, SS: 75}
const skill_ex_upgrade_credits = [80000, 500000, 3000000, 10000000]
const skill_upgrade_credits = [5000, 7500, 60000, 90000, 300000, 450000, 1500000, 2400000, 4000000]
const enemy_rank = {'Champion': 1, 'Elite': 2, 'Minion': 3}
const max_gifts = 35
const module_list = ['home','students','raids','stages','items','craft']
const cache_ver = 5
const striker_bonus_coefficient = {'MaxHP': 0.1, 'AttackPower': 0.1, 'DefensePower': 0.05, 'HealPower': 0.05,}
const gearId = {'Hat': 1000,'Gloves': 2000,'Shoes': 3000,'Bag': 4000,'Badge': 5000,'Hairpin': 6000,'Charm': 7000,'Watch': 8000,'Necklace': 9000,}
const json_list = {
    common: getCacheVerResourceName("./data/common.json"),
    raids: getCacheVerResourceName("./data/raids.json"),
    students: getCacheVerResourceName("./data/students.json"),
    localization: getCacheVerResourceName("./data/localization.json"),
    stages: getCacheVerResourceName("./data/stages.json"),
    enemies: getCacheVerResourceName("./data/enemies.json"),
    items: getCacheVerResourceName("./data/items.json"),
    furniture: getCacheVerResourceName("./data/furniture.json"),
    equipment: getCacheVerResourceName("./data/equipment.json"),
    crafting: getCacheVerResourceName("./data/crafting.json"),
    summons: getCacheVerResourceName("./data/summons.json")
}
const html_list = {
    craft: getCacheVerResourceName("./html/craft.html"),
    home: getCacheVerResourceName("./html/home.html"),
    items: getCacheVerResourceName("./html/items.html"),
    raids: getCacheVerResourceName("./html/raids.html"),
    stages: getCacheVerResourceName("./html/stages.html"),
    students: getCacheVerResourceName("./html/students.html"),
}
const sort_functions = {
    Default: (a,b) => (a.DefaultOrder - b.DefaultOrder)*search_options["sortby_dir"],
    Name: (a,b) => getTranslatedString(a, 'Name').localeCompare(getTranslatedString(b, 'Name'))*search_options["sortby_dir"],
    AttackPower100: (a,b) => (b.AttackPower100 - a.AttackPower100)*search_options["sortby_dir"],
    DefensePower100: (a,b) => (b.DefensePower100 - a.DefensePower100)*search_options["sortby_dir"],
    MaxHP100: (a,b) => (b.MaxHP100 - a.MaxHP100)*search_options["sortby_dir"],
    HealPower100: (a,b) => (b.HealPower100 - a.HealPower100)*search_options["sortby_dir"],
    CriticalPoint: (a,b) => (b.CriticalPoint - a.CriticalPoint)*search_options["sortby_dir"],
    StabilityPoint: (a,b) => (b.StabilityPoint - a.StabilityPoint)*search_options["sortby_dir"],
    Range: (a,b) => (b.Range - a.Range)*search_options["sortby_dir"],
    AccuracyPoint: (a,b) => (b.AccuracyPoint - a.AccuracyPoint)*search_options["sortby_dir"],
    DodgePoint: (a,b) => (b.DodgePoint - a.DodgePoint)*search_options["sortby_dir"]
}

let data = {}, loadedModule, student, studentList, loadedItem, loadedStage, loadedCraftNode, region, regionID, userLang, student_bondalts, darkTheme, highContrast, raid, selectedEnemy = 0
    , studentCompare   
    , searchResultsCount = 0, searchResultsSelection = 0
    , studentSelectorModal, statPreviewModal
    , summonId = 0
    , header
    , raid_difficulty = 0, ta_difficulty = 0
    , stat_preview_stars = 3
    , stat_preview_weapon_stars = 0
    ,statPreviewIncludePassive = false
    ,statPreviewIncludeBond = false
    ,statPreviewIncludeBondAlts = false
    ,statPreviewIncludeEquipment = false
    ,statPreviewSupportStats = false
    ,statPreviewSummonStats = false
    ,compareMode = false
    ,selectCompareMode = false
    , search_options = {
    "groupby": "none",
    "sortby": "Default",
    "sortby_dir": 1,
    "filter": {
        "SquadType": {
            "Main": false,
            "Support": false
        },
        "TacticRole": {
            "Tanker": false,
            "DamageDealer": false,
            "Healer": false,
            "Supporter": false,
            "Vehicle": false,
        },
        "StarGrade": {
            3: false,
            2: false,
            1: false,
        },
        "BulletType": {
            "Explosion": false,
            "Pierce": false,
            "Mystic": false,
        },
        "ArmorType": {
            "LightArmor": false,
            "HeavyArmor": false,
            "Unarmed": false,
        },
        "School": {
            "Abydos": false,
            "Arius": false,
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
        "WeaponType": {
            "SG": false,
            "SMG": false,
            "AR": false,
            "GL": false,
            "HG": false,
            "SR": false,
            "RG": false,
            "MG": false,
            "RL": false,
            "MT": false,
        },
        "Position": {
            "Front": false,
            "Middle": false,
            "Back": false,
        },
        "IsLimited": {
            0: false,
            1: false,
            2: false,
        },
        "StreetBattleAdaptation": {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
        },
        "OutdoorBattleAdaptation": {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
        },
        "IndoorBattleAdaptation": {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
        }
    }
}

/** Classes */

/**
 * Represents a set of character stats
 */
 class CharacterStats {
    
    constructor(character, level, stargrade) {
        this.stats = {}
        let levelscale = ((level-1)/99).toFixed(4)
        let MaxHP = Math.ceil((Math.round((character.MaxHP1 + (character.MaxHP100-character.MaxHP1)*levelscale).toFixed(4))*starscale_hp[stargrade-1]).toFixed(4))
        let AttackPower = Math.ceil((Math.round((character.AttackPower1 + (character.AttackPower100-character.AttackPower1)*levelscale).toFixed(4))*starscale_attack[stargrade-1]).toFixed(4))
        let DefensePower = Math.round((character.DefensePower1 + (character.DefensePower100-character.DefensePower1)*levelscale).toFixed(4))
        let HealPower = Math.ceil((Math.round((character.HealPower1 + (character.HealPower100-character.HealPower1)*levelscale).toFixed(4))*starscale_healing[stargrade-1]).toFixed(4))
        this.stats['MaxHP'] = [MaxHP,0,1]
        this.stats['AttackPower'] = [AttackPower,0,1]
        this.stats['DefensePower'] = [DefensePower,0,1]
        this.stats['HealPower'] = [HealPower,0,1]
        this.stats['AccuracyPoint'] = [character.AccuracyPoint,0,1]
        this.stats['DodgePoint'] = [character.DodgePoint,0,1]
        this.stats['CriticalPoint'] = [character.CriticalPoint,0,1]
        this.stats['CriticalDamageRate'] = [character.CriticalDamageRate,0,1]
        this.stats['CriticalChanceResistPoint'] = [100,0,1]
        this.stats['CriticalDamageResistRate'] = [5000,0,1]
        this.stats['StabilityPoint'] = [character.StabilityPoint,0,1]
        this.stats['AmmoCount'] = [character.AmmoCount,0,1]
        this.stats['AmmoCost'] = [character.AmmoCost,0,1]
        this.stats['Range'] = [character.Range,0,1]
        this.stats['RegenCost'] = [character.RegenCost,0,1]
        this.stats['HealEffectivenessRate'] = [10000,0,1]
        this.stats['OppressionPower'] = [100,0,1]
        this.stats['OppressionResist'] = [100,0,1]
        this.stats['AttackSpeed'] = [10000,0,1]
        this.stats['BlockRate'] = [10000,0,1]
        this.stats['DefensePenetration'] = [10000,0,1]
        this.stats['MoveSpeed'] = [10000,0,1]
    }

    addBuff(stat, amount) {
        let stat_split = stat.split('_')
        if (stat_split.length > 1) {
            if (stat_split[1] == "Base") {
                this.stats[stat_split[0]][1] += amount
            } else if (stat_split[1] == "Coefficient") {
                this.stats[stat_split[0]][2] += amount/10000
            }
        } else {
            this.stats[stat_split[0]][1] += amount
        }
    }

    /**
     * Adds the specified stat from another instance of CharacterStats as a flat buff
     * @param {CharacterStats} chStats the instance of CharacterStats to add from
     * @param {*} stat the name of the stat to add
     * @param {*} coefficient the amount of the stat to add
     */
    addCharacterStatsAsBuff(chStats, stat, coefficient) {
        this.stats[stat][1] += Math.round(chStats.getTotal(stat) * (coefficient/10000))
    }

    /**
     * Calculates the final total of a stat with all flat and percentage buffs
     * @param {string} stat The name of the stat
     * @returns 
     */
    getTotal(stat) {
        return Math.round(((this.stats[stat][0] + this.stats[stat][1]) * this.stats[stat][2]).toFixed(4))
    }

    /**
     * Calculates and returns the final total of a stat as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getTotalString(stat) {
        let total = this.getTotal(stat)
        if (stat.slice(-4) == "Rate") {
            return (total/100).toFixed(0).toLocaleString() + "%"
        } else {
            return total.toLocaleString()
        }
    }

    getStrikerBonus(stat) {
        return Math.floor(((this.stats[stat][0]+this.stats[stat][1])*this.stats[stat][2]).toFixed(4)*striker_bonus_coefficient[stat])
    }

    getStabilityMinDamage() {
        let stability =  this.getTotal('StabilityPoint')
        return parseFloat((((stability / (stability + 997)) + 0.2)*100).toFixed(2)) + "%"
    }

    getDescriptionText(stat) {
        let desc = ""
        desc += "If this character's HP reaches 0, they will be unable to continue fighting.\n\n"
        desc += `Base Value: <b>${this.stats[stat][0].toLocaleString()}</b>`
        if (this.stats[stat][1] > 0) {
            desc += `\nFlat Buffs: <b>+${this.stats[stat][1].toLocaleString()}</b>`
        }
        if (this.stats[stat][2] > 1) {
            desc += `\n% Buffs: <b>+${parseFloat(((this.stats[stat][2]-1)*100).toFixed(2))}%</b>`
        }
        return desc        
    }
}

/** Functions */

loadJSON(json_list, function(result) {
    data = result
    $.holdReady(false)
})

if (localStorage.getItem("theme")) {
    $('body').toggleClass("theme-dark", (localStorage.getItem("theme") == 'dark'))
}

$(document).ready(function() {
    //header = $(".card-header")
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

    data.students.sort(sort_functions.Name)
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

/**
 * Loads the module based on the present query string parameter. If no query string is present then loads the last module the user visited
 */
function loadModuleFromURL() {
    var urlVars = new URL(window.location.href).searchParams
    if (urlVars.get("chara")) {
        loadStudent(urlVars.get("chara"))
    } else if (urlVars.get("charaid")) {
        loadStudentById(urlVars.get("charaid"))
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

/**
 * Loads the last module the user visited, if no page has been visited then loads the home module instead
 */
function loadLastModule() {
    if (localStorage.getItem("module") && module_list.includes(localStorage.getItem("module"))) {
        loadModule(localStorage.getItem("module"))
    } else {
        loadModule('home')
    }
}

/**
 * Loads the specified module with an optional entry to navigate to.
 * @param {string} moduleName The name of the module to load
 * @param {*} entry (Optional) The id of the entry to navigate to
 */
function loadModule(moduleName, entry=null) {
    if (moduleName == 'students') {
        loadedModule = 'students'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-students").addClass('active')
        $("#loaded-module").load(html_list['students'], function() {
            loadRegion(regionID)
            loadLanguage(userLang)
            studentSelectorModal = new bootstrap.Modal(document.getElementById("ba-student-modal-students"), {})
            document.getElementById("ba-student-modal-students").addEventListener('hidden.bs.modal', function (e) {
                selectCompareMode = false
            })
            compareMode = false
            selectCompareMode = false
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (entry != null) {
                loadStudent(entry)
            } else if (urlVars.has("chara")) {
                loadStudent(urlVars.get("chara"))
            } else if (urlVars.has("charaid")) {
                loadStudentById(urlVars.get("charaid"))
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
                searchSetOrder('Default', false, false)
            }
        
            Object.entries(search_options.filter).forEach(i => {
                Object.entries(i[1]).forEach(j => {
                    if (j[1] === true) {
                        $(`#ba-student-search-filter-${i[0].toLowerCase()}-${String(j[0]).toLowerCase()}`).toggleClass("active", true)
                    }
                })
            })
            activeFilters = getNumActiveFilters()
            $('#ba-student-search-filter-amount').text(activeFilters == 0 ? '' : ` (${activeFilters})`)
            $('#ba-student-search-reset').toggle(activeFilters > 0)

            updateStudentList(updateSortMethod = true)
    
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
        
            $('#ba-student, #ba-student-list-btn').show()
            $('#ba-statpreview-status-bond-level').tooltip({title: getBasicTooltip('Toggle Relationship Bonus'), placement: 'top', html: true})
            $('#ba-statpreview-status-equipment').tooltip({title: getBasicTooltip('Toggle Equipment Bonus'), placement: 'top', html: true})
            $('#ba-statpreview-status-bond-alt-level').tooltip({title: getBasicTooltip('Toggle Alt Relationship Bonus'), placement: 'top', html: true})
            $('#ba-statpreview-status-passive-level').tooltip({title: getBasicTooltip('Toggle Enhanced Skill Buff'), placement: 'top', html: true})
            $('#ba-statpreview-status-strikerbonus').tooltip({title: getBasicTooltip('Support Stats'), placement: 'top', html: true})
            $('#ba-statpreview-status-summon').tooltip({title: getBasicTooltip('Vehicle/Summon Stats'), placement: 'top', html: true})
            $('#ba-statpreview-status-compare').tooltip('dispose').tooltip({title: getBasicTooltip('Compare with Student'), placement: 'top', html: true})
            $('#ba-student-search-reset').tooltip({title: getBasicTooltip('Clear All Filters'), placement: 'top', html: true})

            $('.tooltip-button').on('click', e => {
                if (e.originalEvent.pointerType == "touch") {
                    $(e.currentTarget)
                    $(".tooltip").tooltip("hide")
                }
            })

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
        $("#loaded-module").load(html_list['items'], function() {
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
        let bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_Raid.jpg`
        $("#loaded-module").load(html_list['raids'], function() {
            loadLanguage(userLang)
            $(".tooltip").tooltip("hide")
            let urlVars = new URL(window.location.href).searchParams
        
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
            if (regionID == 1) {
                $('#ba-raid-list-tab-timeattack').hide()
                $('#ba-raid-difficulty-5').hide()
            }
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
        })
    } else if (moduleName == 'stages') {
        loadedModule = 'stages'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-stages").addClass('active')
        let bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_Raid.jpg`
        $("#loaded-module").load(html_list['stages'], function() {
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
        $("#loaded-module").load(html_list['craft'], function() {
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
        $("#loaded-module").load(html_list['home'], function() {
            loadLanguage(userLang)
            loadRegion(regionID)

            let changelogHtml = ""
            $.each(data.common.changelog, function(i, el) {
                changelogHtml += `<h5 class="text-emphasis">${el.date}</h5><ul>`
                for (let j = 0; j < el.contents.length; j++) {
                    changelogHtml += `<li>${el.contents[j]}</li>`
                }
                changelogHtml += '</ul>'
            })
            $("#ba-home-modal-changelog-content").html(changelogHtml)
            let gachatext = "Character Banner\n", gachalistHtml = ""
            let currentTime = new Date().getTime()/1000, dateOptions = {month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short"}
            let found = false
            $.each(data.common.regions[regionID].current_gacha, function(i, el){
                if (((currentTime >= el.start && currentTime < el.end) || (currentTime <= el.start)) && !found) {
                    for (let j = 0; j < el.characters.length; j++) {
                        var char = find(data.students, "Id", el.characters[j])[0]
                        gachalistHtml += getStudentListCardHTML(char)
                    }
                    gachatext += new Date(el.start*1000).toLocaleString([], dateOptions)+' - '+new Date(el.end*1000).toLocaleString([], dateOptions)
                    gachatext += `\n${(currentTime >= el.start) ? "Ends" : "Starts"} in <b>${(currentTime >= el.start) ? duration(el.end-currentTime) : duration(el.start-currentTime)}</b>.`
                    found = true
                }
            })
        
            $('#ba-home-gacha-text').html(gachatext)
            $('#ba-home-gacha-list').html(gachalistHtml)

            let raidText = "", raidHtml = ""
            $('#ba-home-raid').hide()
            found = false
            $.each(data.common.regions[regionID].current_raid, function(i, el){
                if (((currentTime >= el.start && currentTime < el.end) || (currentTime <= el.start)) && !found) {
                    if (el.raid >= 1000) {
                        raidText = "Firepower Drill\n"
                        let raid = find(data.raids.TimeAttack, "Id", el.raid)[0]
                        raidHtml += getTimeAttackCardHTML(raid, el.terrain)
                    } else {
                        raidText = "Total Assault\n"
                        let raid = find(data.raids.Raid, "Id", el.raid)[0]
                        raidHtml += getRaidCardHTML(raid, el.terrain)
                    }
                    $('#ba-home-raid').show()
                    raidText += new Date(el.start*1000).toLocaleString([], dateOptions)+' - '+new Date(el.end*1000).toLocaleString([], dateOptions)
                    raidText += `\n${(currentTime >= el.start) ? "Ends" : "Starts"} in <b>${(currentTime >= el.start) ? duration(el.end-currentTime) : duration(el.start-currentTime)}</b>.`
                    found = true
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

            data.students.forEach(el => {
                if (el.IsReleased[regionID] && !el.NameEn.includes("(")) {
                    var nextBirthday = getNextBirthdayDate(el.BirthDay)
                    if (nextBirthday.getTime() < nextWeek.getTime() && nextBirthday.getTime() >= currentDate.getTime())
                    birthdayStudents.push(el)
                }
            })

            if (birthdayStudents.length > 0) {
                birthdayStudents.sort((a,b) => getNextBirthdayDate(a.BirthDay).getTime() - getNextBirthdayDate(b.BirthDay).getTime())
                for (let i = 0; i < birthdayStudents.length; i++) {
                    birthdaysHtml += '<div class="d-flex flex-column mx-1 mb-1">'+getStudentIconSmall(birthdayStudents[i])+'<div class="ba-panel mt-1 mx-1 p-1 text-center">'+getNextBirthdayDate(birthdayStudents[i].BirthDay).toLocaleDateString([], {month: "numeric", day: "numeric"})+'</div></div>'
                }
                $('#ba-home-birthdays-list').html(birthdaysHtml)
            } else {
                $('#ba-home-birthdays').hide()
            }
            
            $('.ba-item-student').tooltip({html: true})

            $('#ba-home-server-info').text(`Current Events (${getTranslatedString(data.common.regions[regionID], 'Name')} Server)`)
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            let url = new URL(window.location.href)
    
            if (url.searchParams.toString() != '') {
                url.searchParams.forEach((v,k) => url.searchParams.delete(k))
                history.pushState(null, '', url)
            }
            document.title = `Schale DB | Home`
            $('#ba-navbar-content').collapse('hide')
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
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

/**
 * Populates the student selection grid
 */
function populateStudentList() {
    let resultsHTML = ''
    data.students.forEach(el => {
        if (el.IsReleased[regionID]) {
            resultsHTML += getStudentListCardHTML(el)
        }
    })
    resultsHTML += `<div id="ba-student-select-noresult" class="p-2" style="font-size: medium;display:none;grid-column: 1/-1;">No results.</div>`
    $("#ba-student-select-grid").html(resultsHTML)
}

/**
 * Applies the selected filters and sort method to the student selection grid
 */
function updateStudentList(updateSortMethod = false) {
    let searchTerm = $('#ba-student-search-text').val()
    let sortfunction = sort_functions[search_options["sortby"]]
    let filterList = []
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

    if (updateSortMethod) {
        studentList.sort(sortfunction)
    }

    let count = 0
    $.each(studentList, function(i, el){
        if (el.IsReleased[regionID]) {
            if (updateSortMethod) {
                $('#ba-student-select-'+el.Id).css("order", i)
                if (search_options["sortby"] == "Default" || search_options["sortby"] == "Name") {
                    $('#ba-student-select-'+el.Id+' .ba-label-text').text(getTranslatedString(el, 'Name')).toggleClass('smalltext', getTranslatedString(el, 'Name').length > label_smalltext_threshold[userLang]).toggleClass('ba-unhover-text', false)
                    $('#ba-student-select-'+el.Id+' .ba-hover-text').hide()
                } else {
                    $('#ba-student-select-'+el.Id+' .ba-label-text').text(el[search_options["sortby"]]).toggleClass('smalltext', false).toggleClass('ba-unhover-text', true)
                    $('#ba-student-select-'+el.Id+' .ba-hover-text').show()
                }
            }
            if (checkFilters(el, filterList, searchTerm)) {
                count++
                $('#ba-student-select-'+el.Id).show()
            } else {
                $('#ba-student-select-'+el.Id).hide()
            }
        }
    })
    $('#ba-student-select-noresult').toggle(count == 0)
}

/**
 * Checks whether a student passes a given list of filters
 * @param {*} student The student object
 * @param {*} filterList List of filters checked
 * @param {*} searchTerm Text search filter
 * @returns 
 */
function checkFilters(student, filterList, searchTerm) {
    if (!student.IsReleased[regionID]) return false
    if (filterList.length == 0) {
    } else {
        for (let i = 0; i < filterList.length; i++) {
            if (!search_options['filter'][filterList[i]][student[filterList[i]]]) return false
        }
    }
    return (searchTerm == "" || getTranslatedString(student, 'Name').toLowerCase().includes(searchTerm.toLowerCase()))
}

function searchOptionSet(option, value, runSearch = true) {
    $(`#ba-student-search-${option} a`).removeClass("active")
    $(`#ba-student-search-${option} button`).removeClass("active")
    $(`#ba-student-search-${option}-${value}`).addClass("active")
    $(`#ba-student-search-sortby-stat`).text(getLocalizedString('ui','stat')+" ")

    if (option == "sortby" && value != "default" && value != "name") {
        $(`#ba-student-search-sortby-stat`).addClass("active")
        $(`#ba-student-search-sortby-stat`).text($(`#ba-student-search-sortby-${value}`).text() + " ")
    }
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
            if (w === true) num += 1
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

    if (!(value in sort_functions)) {
        value = 'Default'
    }

    $(`#ba-student-search-sortby a`).removeClass("active")
    $(`#ba-student-search-sortby button`).removeClass("active")
    $(`#ba-student-search-sortby-${value.toLowerCase()}`).addClass("active")
    $('#ba-student-search-sortby-stat').text(getLocalizedString('ui','stat'))
    $('.sort-direction-label').text("")

    $(`#ba-student-search-sortby-${value.toLowerCase()} > .sort-direction-label`).html((search_options["sortby_dir"] == 1) != (value == "Name" || value == "Default") ? '<i class="fa-solid fa-arrow-down-long ms-2"></i>' : '<i class="fa-solid fa-arrow-up-long ms-2"></i>')

    if (value != "Default" && value != "Name") {
        $('#ba-student-search-sortby-stat').addClass("active")
        $('#ba-student-search-sortby-stat').html($(`#ba-student-search-sortby-${value.toLowerCase()}`).html())
    }

    search_options["sortby"] = value
    localStorage.setItem('chara_sortby', value)
    localStorage.setItem('chara_sortby_dir', search_options["sortby_dir"])
    if (runSearch) {
        updateStudentList(updateSortMethod = true)  
    }
}

function searchSetFilter(prop, value, runSearch = true) {
    search_options["filter"][prop][value] = !search_options["filter"][prop][value]
    $(`#ba-student-search-filter-${prop.toLowerCase()}-${String(value).toLowerCase()}`).toggleClass("active", search_options["filter"][prop][value])
    activeFilters = getNumActiveFilters()
    $('#ba-student-search-filter-amount').text(activeFilters == 0 ? '' : ` (${activeFilters})`)
    $('#ba-student-search-reset').toggle(activeFilters > 0)
    if (runSearch) {
        updateStudentList()
    }
}

function searchResetFilter() {
    $('#ba-student-search-text').val('')
    Object.entries(search_options["filter"]).forEach(prop => {
        Object.entries(prop[1]).forEach (val => {
            search_options["filter"][prop[0]][val[0]] = false
            $(`#ba-student-search-filter-${prop[0].toLowerCase()}-${String(val[0]).toLowerCase()}`).toggleClass("active", false)
        })
    })
    $('#ba-student-search-reset').hide()
    $('#ba-student-search-filter-amount').text('')
    document.getElementById('ba-student-search-reset').blur()
    updateStudentList()
}

function processStudent() {
    $('#ba-student-img').attr('src', `images/student/portrait/Portrait_${student.DevName}.webp`)
    let bgimg = new Image()
    bgimg.onload = function(){
        $("#ba-background").css('background-image', `url('${bgimg.src}')`)
    }
    bgimg.src = `images/background/${student.CollectionBG}.jpg`

    $('#ba-student-name').html(getTranslatedString(student, 'Name').replace(/([(（].+[)）])/,'<small>$1</small>'))
    $("#ba-student-class").text(getLocalizedString('SquadType', student.SquadType)).removeClass("ba-class-main ba-class-support").addClass(`ba-class-${student.SquadType.toLowerCase()}`)
    $("#ba-student-stargrade").html('<i class="fa-solid fa-star"></i>'.repeat(student.StarGrade))
    if (student.IsLimited > 0) {
        $("#ba-student-stargrade").append(`<span class="ms-1">(${getLocalizedString('IsLimited',''+student.IsLimited)})</span>`)
    } 

    statPreviewSummonStats = false
    $('#ba-statpreview-status-summon').toggleClass('deactivated',true)
    $('#ba-statpreview-status-summon').toggle((student.SummonIds.length > 0))

    $("#ba-student-role-label").text(getLocalizedString('TacticRole', student.TacticRole))
    $("#ba-student-role-icon").attr("src", `images/ui/Role_${student.TacticRole}.png`)

    $(".ba-skill, .ba-weapon-skill-plus").removeClass("bg-skill-explosion bg-skill-pierce bg-skill-mystic").addClass(`bg-skill-${student.BulletType.toLowerCase()}`)
    $("#ba-student-attacktype").removeClass("bg-atk-explosion bg-atk-pierce bg-atk-mystic").addClass(`bg-atk-${student.BulletType.toLowerCase()}`)
    $("#ba-student-defensetype").removeClass("bg-def-lightarmor bg-def-heavyarmor bg-def-unarmed").addClass(`bg-def-${student.ArmorType.toLowerCase()}`)
    
    $("#ba-student-school-label").text(student.School)
    $("#ba-student-school-img").attr("src", `images/schoolicon/School_Icon_${student.School.toUpperCase()}_W.png`)
    $("#ba-student-position-label").text(student.Position.toUpperCase())
    $("#ba-student-attacktype-label").text(getLocalizedString('BulletType',student.BulletType))
    $('#ba-student-attacktype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType',student.BulletType)}`, getLocalizedString('ui','attacktype'), null, getTypeText(student.BulletType), 32), placement: 'top',  html: true})
    $("#ba-student-defensetype-label").text(getLocalizedString('ArmorType',student.ArmorType))
    $('#ba-student-defensetype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorType',student.ArmorType)}`, getLocalizedString('ui','defensetype'), null, getTypeText(student.ArmorType), 32), placement: 'top', html: true})

    updateGearIcon()
    
    $("#ba-student-usescover-icon").toggle(student.Cover)

    $("#ba-student-weapontype-label").text(student.WeaponType)
    $(".ba-type-weapon").css("background-image", `url('images/weapon/Weapon_Icon_${student.Id}.png')`)

    //Skills
    student.Skills.forEach(el => {
        $(`#ba-skill-${el.SkillType}-name`).text(getTranslatedString(el, 'Name'))
        $(`#ba-skill-${el.SkillType}-icon`).attr("src", `images/skill/${el.Icon}.png`)
        if (el.SkillType == 'passive') {
            $('#ba-statpreview-passiveskill-icon, #ba-statpreview-status-passive-icon').attr("src", `images/skill/${el.Icon}.png`)
        }
        if (el.SkillType == "ex") {
            $('#ba-statpreview-exskill-icon').attr("src", `images/skill/${el.Icon}.png`)
            $("#ba-skill-ex-cost").removeClass("ba-col-explosion ba-col-pierce ba-col-mystic")
            if (el.Cost[0] != el.Cost[4]) {
                $("#ba-skill-ex-cost").addClass(`ba-col-${student.BulletType.toLowerCase()}`)
            }
        }
    })

    //Skill Materials
    let html
    for (let i = 2; i <= 5; i++) {
        html = ''
        $.each(student.SkillExMaterial[i-2], function(j, el) {
            html += getMaterialIconHTML(el, student.SkillExMaterialAmount[i-2][j])
        })
        html += getMaterialIconHTML(3000001, abbreviateNumber(skill_ex_upgrade_credits[i-2]))

        $('#ba-skill-ex-materials-'+i).html(html)
        $('#ba-skill-ex-materials-'+i+' div').each(function(j,el) {
            $(el).tooltip({html: true})
        })
    }

    for (let i = 2; i <= 9; i++) {
        html = ''
        $.each(student.SkillMaterial[i-2], function(j, el) {
            html += getMaterialIconHTML(el, student.SkillMaterialAmount[i-2][j])
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
    $("#ba-student-weapon-name, #ba-statpreview-weapon-name").text(getTranslatedString(student.Weapon, 'Name'))
    $('#ba-weapon-description').text(getTranslatedString(student.Weapon,'Desc').replace("\n\n", "\n"))
    $("#ba-student-weapon-type").text(student.WeaponType)
    $("#ba-student-weapon-img, #ba-statpreview-weapon-img").attr("src", `images/weapon/Weapon_Icon_${student.Id}.png`)

    $('#ba-weapon-bonus-terrain-type').attr("src", `images/ui/Terrain_${student.Weapon.AdaptationType}.png`)
    let initialTerrainAmount = getLocalizedString('AdaptationAmount', String(student[student.Weapon.AdaptationType+'BattleAdaptation'])) 
    let bonusTerrainAmount = getLocalizedString('AdaptationAmount', String(student[student.Weapon.AdaptationType+'BattleAdaptation'] + student.Weapon.AdaptationValue)) 
    $('#ba-weapon-bonus-terrain-adaption').attr("src", `images/ui/Ingame_Emo_Adaptresult${bonusTerrainAmount}.png`)
    $('#ba-weapon-bonus-terrain-adaption-description').html(`${formatString(getLocalizedString("ui","terrain_adaption"), getLocalizedString('AdaptationType',student.Weapon.AdaptationType))} ${initialTerrainAmount} → <b>${bonusTerrainAmount}</b><br>(${getAdaptationText(student.Weapon.AdaptationType, bonusTerrainAmount)})`)
    $('#ba-weapon-stat-row2').toggle(student.Weapon.HealPower1 > 0)

    //Profile
    if (userLang == 'en') {
        $('#ba-student-fullname').text(getTranslatedString(student,'FamilyName')+' '+getTranslatedString(student,'PersonalName'))
    } else {
        $('#ba-student-fullname').text(getTranslatedString(student,'FamilyName')+getTranslatedString(student,'PersonalName'))
    }
    $('#ba-profile-school-label').text(getLocalizedString('SchoolLong',student.School))
    $('#ba-profile-club-label').text(getLocalizedString('Club',student.Club))
    $('#ba-profile-schoolyear-label').text(getTranslatedString(student,'SchoolYear')).toggle(getTranslatedString(student,'SchoolYear') != "")
    $('#ba-profile-portrait-img').attr("src", `images/student/collection/${student.CollectionTexture}.webp`)
    var profileHtml = ''
    profileHtml += getTranslatedString(student,'ProfileIntroduction')
    if (student.StarGrade == 3) {
        profileHtml += `\n\n<i class="text-bold">"${getTranslatedString(student,'CharacterSSRNew')}"</i>`
    }
    $('#ba-student-profile-text').html(profileHtml)

    if (student.MemoryLobby > 0) {
        $(".ba-student-lobby").show()
        $("#ba-student-lobby-img").attr("src", `images/student/lobby/Lobbyillust_Icon_${student.DevName}_01.png`)
        $("#ba-student-lobby-unlock").text(student.MemoryLobby)
        $(".ba-student-lobby").tooltip('dispose').tooltip({title: getRichTooltip(null, formatString(getLocalizedString('ui', 'memory_lobby_student'), getTranslatedString(student,'Name')), null, null, formatString(getLocalizedString('ui', 'memory_lobby_unlock'), student.MemoryLobby, getTranslatedString(student,'Name'))), placement: 'top', html: true})
    } else {
        $(".ba-student-lobby").hide()
    }
    
    $('#ba-student-profile-age').text(getTranslatedString(student,'CharacterAge'))
    $('#ba-student-profile-birthday').text(getTranslatedString(student,'Birthday'))
    $('#ba-student-profile-hobbies').text(getTranslatedString(student,'Hobby'))
    $('#ba-student-profile-height').text(student.CharHeightMetric)
    $('#ba-student-profile-cv').text(getTranslatedString(student,'CharacterVoice'))
    $('#ba-student-profile-illustrator').text(student.ArtistName)

    let allTags = student.FavorItemTags
    allTags.push(student.FavorItemUniqueTags[0])
    let favItems = getFavouriteItems(allTags)
    let favItemsHtml = ""
    $(favItems[0]).each(function(i,el){
        favItemsHtml += getFavourIconHTML(el, 3)
    })
    $(favItems[1]).each(function(i,el){
        favItemsHtml += getFavourIconHTML(el, 2)
    })
    $('#ba-student-favoured-items').empty().html(favItemsHtml)
    if (favItemsHtml == "") {
        $('#ba-student-favoured-items').empty().html(`<span class="pb-2 text-center">${getLocalizedString('ui','favoritem_none')}</span>`)
    } else {
        $('#ba-student-favoured-items').empty().html(favItemsHtml)
    }

    let favFurnitureHtml = ""
    $(student.FurnitureInteraction).each(function(i,el){
        let item = find(data.furniture, "Id", el)[0]
        if (item.IsReleased[regionID]) {
            favFurnitureHtml += getFurnitureIconHTML(item)
        }
    })

    $('#ba-student-favoured-furniture').empty().html(favFurnitureHtml)
    if (favFurnitureHtml == "") {
        $('#ba-student-favoured-furniture').empty().html(`<span class="pb-2 text-center">${getLocalizedString('ui','furniture_none')}</span>`)
    } else {
        $('#ba-student-favoured-furniture').empty().html(favFurnitureHtml)
    }
    $('.ba-favor-item').tooltip({html: true})

    $('#ba-student-bond-1').text(getStatName(student.FavorStatType[0]))
    $('#ba-student-bond-2').text(getStatName(student.FavorStatType[1]))

    if (student.SquadType == "Main") {
        $('#ba-student-stat-table').removeClass("table-striker-bonus")
        $('#ba-statpreview-status-strikerbonus').hide()
        statPreviewSupportStats = false
    } else {
        $('#ba-statpreview-status-strikerbonus').show()
    }
    $('#ba-statpreview-status-strikerbonus').toggleClass("deactivated", !statPreviewSupportStats)
    
    $('#ba-statpreview-bond-targets').empty().html(getBondTargetsHTML(1, student))
    $('#ba-statpreview-status-bond-icon').attr('src', `images/student/icon/${student.CollectionTexture}.png`)
    student_bondalts = []
    for (let i = 0; i < student.FavorAlts.length; i++) {
        var extraTarget = find(data.students,"Id",student.FavorAlts[i])[0]
        if (extraTarget.IsReleased[regionID]) {
            student_bondalts.push(extraTarget)
            $('#ba-statpreview-status-bond-alt-icon').attr('src', `images/student/icon/${extraTarget.CollectionTexture}.png`)
            $('#ba-statpreview-bond-targets').append(getBondTargetsHTML(1 + student_bondalts.length, extraTarget))
        }
    }
    $('#ba-statpreview-status-bond-alt-level').toggle(student_bondalts.length > 0)
    updateStatPreviewTitle()

    document.title = `Schale DB | ${getTranslatedString(student, 'Name')}`
    $('#ba-navbar-content').collapse('hide')
    window.scrollTo({top: 0, left: 0, behavior: 'instant'})

    changeStatPreviewStars(stat_preview_stars, stat_preview_weapon_stars, false)
    recalculateTerrainAffinity()
    updatePassiveSkillStatPreview()
    updateSummonExSkillStatPreview()
    recalculateWeaponPreview()
    updateWeaponLevelStatPreview($('#ba-statpreview-weapon-range').val())

    recalculateSkillPreview()
    recalculateWeaponSkillPreview()
    recalculateEXSkillPreview()
    recalculateBondPreview()

    changeGearLevel(1, document.getElementById('ba-statpreview-gear1-range'), false)
    changeGearLevel(2, document.getElementById('ba-statpreview-gear2-range'), false)
    changeGearLevel(3, document.getElementById('ba-statpreview-gear3-range'), false)

    for (let i = 1; i <= student_bondalts.length+1; i++) {
        changeStatPreviewBondLevel(i, document.getElementById(`ba-statpreview-bond-${i}-range`), false)
    }
    
    recalculateStatPreview()

    var url = new URL(window.location.href)

    if (url.searchParams.get("chara") !== student.DevName) {
        url.searchParams.forEach((v,k) => url.searchParams.delete(k))
        url.searchParams.set("chara", student.DevName)
        history.pushState(null, '', url)
    }

    localStorage.setItem("chara", student.DevName)
    studentSelectorModal.hide()
}

function loadStudent(studentName) {
    if (loadedModule == 'students') {
        if (selectCompareMode) {
            studentCompare = find(data.students, "DevName", studentName)[0]
            selectCompareMode = false
            compareMode = true
            if (statPreviewSummonStats) {
                statPreviewSummonStats = false
                $('#ba-statpreview-status-summon').toggleClass('deactivated',true)
            }
            recalculateStatPreview()
            studentSelectorModal.hide()
            updateStatPreviewTitle()
        } else {
            student = find(data.students, "DevName", studentName)
            if (student.length == 1) {
                student = student[0]
                if (compareMode) {
                    if (student.Id == studentCompare.Id) {
                        compareMode = false
                    }
                }
                processStudent()
            }
        }

    } else {
        loadModule('students', studentName)
    }
}

function loadStudentById(studentId) {
    if (loadedModule == 'students') {
        student = find(data.students,"Id",studentId)
        console.log(student);

        if (student.length == 1) {
            student = student[0];
            processStudent()
        }
    } else {
        loadModule('students')
    }
}

function toggleStudentSummon() {
    statPreviewSummonStats = !statPreviewSummonStats
    if (statPreviewSupportStats && statPreviewSummonStats) toggleStrikerBonus()
    if (compareMode) {
        compareMode = false
        $('#ba-statpreview-status-compare').toggleClass('deactivated', true)
    }
    recalculateStatPreview()
    $('#ba-statpreview-status-summon').toggleClass('deactivated', (!statPreviewSummonStats))
    updateStatPreviewTitle()
}

function loadItem(id) {
    if (loadedModule == 'items') {
        var mode = '', item
        $(".tooltip").tooltip("hide")
        $('#ba-item-furniture-row').hide()
        if (id >= 2000000) {
            mode = 'equipment'
            item = findOrDefault(data.equipment, "Id", id-2000000, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.Category))
        } else if (id >= 1000000) {
            mode = 'furniture'
            item = findOrDefault(data.furniture, "Id", id-1000000, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.SubCategory))
            $('#ba-item-furniture-row').show()
            $('#ba-item-furniture-set').html(getLocalizedString('furniture_set', String(item.SetGroupId)))
            $('#ba-item-furniture-comfort').html(item.ComfortBonus)
        } else {
            mode = 'items'
            item = findOrDefault(data.items, "Id", id, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.Category))
        } 
        loadedItem = item
        $('#ba-item-name').html(getTranslatedString(item, 'Name'))
        if (mode == 'equipment' && item.Id >= 1000) {
            $('#ba-item-rarity').html(`T${(item.Id%10)+1}`)
        } else {
            $('#ba-item-rarity').html(getRarityStars(item.Rarity))
        }
        
        $('#ba-item-icon').removeClass('ba-item-n ba-item-r ba-item-sr ba-item-ssr').addClass('ba-item-'+item.Rarity.toLowerCase())
        $('#ba-item-icon-img').attr('src', `images/${mode}/${item.Icon}.png`)
        $('#ba-item-description').html(getTranslatedString(item, 'Desc'))
        if (mode == 'equipment' && item.Id >= 1000 && item.Id <= 10000) {
            $('#ba-item-description').append(`\n\n<b>${getLocalizedString('ui', "stat_info")}:</b>\n` + getGearStatsText(item, '\n'))
        }
        if (item.Category.includes("WeaponExpGrowth")) {
            $('#ba-item-description').append(`\n\n<i>${getLocalizedString('WeaponPartExpBonus', item.Category)}</i>`)
        }
        $('#ba-equipment-recipe').empty().hide()
        $('#ba-item-usage').empty().hide()
        $('#ba-item-sources').empty().hide()
        if (item.Category == 'Material' || item.Category == 'CharacterExpGrowth') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-sources').html(getItemDropStages(item.Id))
            $('#ba-item-list-tab-materials').tab('show')
        } else if (item.Category == 'Favor') {
            if (item.Rarity != 'SSR') {
                $('#ba-item-usage').html(getLikedByStudents(item))
                $('.ba-item-student').tooltip({html: true})
            } else {
                $('#ba-item-usage').html("<i>This gift will be treated as a favorite item when given to any student.</i>").show()
            }
            $('#ba-item-list-tab-gifts').tab('show')
        } else if (item.Category == 'SecretStone') {
            $('#ba-item-sources').html(getItemDropStages(item.Id))
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-list-tab-eleph').tab('show')
        } else if (mode == 'equipment') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('#ba-item-sources').html(getItemDropStages(item.Id+2000000))
            $('#ba-equipment-recipe').html(getEquipmentRecipe(item))
            $('#ba-equipment-recipe div').each(function(i,el) {
                $(el).tooltip({html: true})
            })
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-list-tab-equipment').tab('show')
        } else if (item.Category == 'Coin') {
            $('#ba-item-sources').html(getItemDropStages(item.Id))
            $('#ba-item-list-tab-currency').tab('show')
        }
        if (mode == 'furniture') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-list-tab-furniture').tab('show') 
        }
        var url = new URL(window.location.href)
        if (url.searchParams.get("item") != id) {
            url.searchParams.forEach((v,k) => url.searchParams.delete(k))
            url.searchParams.set("item", id)
            history.pushState(null, '', url)
        }

        document.title = `Schale DB | ${getTranslatedString(item, 'Name')}`
        $('#ba-navbar-content').collapse('hide')
        window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        localStorage.setItem("item", id)
    } else {
        loadModule('items', id)
    }
}

function loadCraft(id) {
    if (loadedModule == 'craft') {
        let mode = 'craftnode', craftNode = findOrDefault(data.crafting.Nodes, "Id", id, 1)[0]
        loadedCraftNode = craftNode
        $('#ba-craft-name').html(getTranslatedString(craftNode,'Name'))
        $('#ba-craft-type').html(getLocalizedString("NodeTier", ''+craftNode.Tier))
        $('#ba-craft-rarity').html(getLocalizedString("NodeQuality", ''+craftNode.Quality))
        $('#ba-craft-icon').removeClass('ba-node-quality-1 ba-node-quality-2').addClass('ba-node-quality-'+craftNode.Quality)
        $('#ba-craft-icon-img').attr('src', `images/ui/${craftNode.Icon}.png`)
        $('#ba-craft-description').html(getTranslatedString(craftNode, 'Desc'))
        $('#ba-craft-rewards').empty()
        let rewardsHtml = ''
        $.each(craftNode.Groups, function(i,el){
            let itemGroup = data.crafting.Groups[el.GroupId], maxWeight = 0
            for (let j = 0; j < itemGroup.length; j++) {
                maxWeight += itemGroup[j].Weight
            }
            for (let j = 0; j < itemGroup.length; j++) {
                let itemWeight = ((el.Weight / craftNode.Weight) * (itemGroup[j].Weight / maxWeight)).toFixed(4)
                let itemId = itemGroup[j].ItemId
                if (itemGroup[j].Type == "Furniture") {
                    itemId += 1000000
                } else if (itemGroup[j].Type == "Equipment") {
                    itemId += 2000000
                }
                rewardsHtml += getDropIconHTML(itemId,itemWeight)
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

        document.title = `Schale DB | ${getTranslatedString(craftNode, 'Name')}`
        $('#ba-navbar-content').collapse('hide')
        window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        localStorage.setItem("craftnode", id)
    } else {
        loadModule('craft', id)
    }
}

function loadRaid(raidId) {
    selectedEnemy = 0
    if (loadedModule == 'raids') {
        if (parseInt(raidId) == NaN) {raidId = 1}
        if (regionID == 1 && raidId >= 1000) {raidId = 1}
        if (raidId < 1000) {
            $('#ba-raid-list-tab-raid').tab('show')
            $('#ba-raid-info').show()
            $('#ba-timeattack-info').hide()
            raid = findOrDefault(data.raids.Raid,"Id",raidId,1)[0]
            if (raid.IsReleasedInsane[regionID]) {
                $('#ba-raid-difficulty-5').toggleClass('disabled', false)
            } else {
                $('#ba-raid-difficulty-5').toggleClass('disabled', true)
                if (raid_difficulty == 5)  {
                    raid_difficulty = 0
                }
            }
            $(`#ba-raid-difficulty-${raid_difficulty}`).tab('show')
        
            $('#ba-raid-affiliation').text(raid.Faction)
            $('#ba-raid-name').text(getTranslatedString(raid, 'Name'))      
            $('#ba-raid-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain[0]}.png`)
            if (raid.Terrain.length > 1) {
                $('#ba-raid-terrain-alt-img').attr('src', `images/ui/Terrain_${raid.Terrain[1]}.png`)
                $('#ba-raid-terrain-alt').show()
            } else {
                $('#ba-raid-terrain-alt').hide()
            }
    
            if (!raid.IsReleasedInsane[regionID] && raid_difficulty == 5) {raid_difficulty = 0}
            changeRaidDifficulty(raid_difficulty)
        } else {
            $('#ba-raid-list-tab-timeattack').tab('show')
            $('#ba-raid-info').hide()
            $('#ba-timeattack-info').show()
            raid = findOrDefault(data.raids.TimeAttack,"Id",raidId,1000)[0]
            $(`#ba-timeattack-difficulty-${ta_difficulty}`).tab('show')
            $('#ba-timeattack-name').text(getTranslatedString(raid, 'Name'))
            $('#ba-timeattack-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain}.png`)
            changeTimeAttackDifficulty(ta_difficulty)
        }

        let url = new URL(window.location.href)
        if (url.searchParams.get("raid") != raid.Id) {
            url.searchParams.forEach((v,k) => url.searchParams.delete(k))
            url.searchParams.set("raid", raid.Id)
            history.pushState(null, '', url)
        }
    
        document.title = `Schale DB | ${getTranslatedString(raid, 'Name')}`
        $('#ba-navbar-content').collapse('hide')
        window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        localStorage.setItem("raid", raid.Id)
    } else {
        loadModule('raids', raidId)
    }
}

function changeRaidDifficulty(difficultyId) {
    raid_difficulty = difficultyId
    let skillsHTML = '', tabsHtml = ''
    $('#ba-raid-header').css('background-image', `url('images/raid/Boss_Portrait_${raid.DevName}${raid_difficulty == 5 ? "_Insane" : ""}_Lobby.png')`)
    $('#ba-raid-level').text(`Lv. ${raid_level[raid_difficulty]}`)
    if (selectedEnemy >= raid.EnemyList[raid_difficulty].length) {selectedEnemy = 0}
    raid.EnemyList[raid_difficulty].forEach(function(el,i) {
        let enemy = find(data.enemies,'Id',el)[0]
        tabsHtml += `<button class="nav-link ${i==selectedEnemy ? "active" : ""}" data-bs-toggle="tab" href="#" onclick="changeRaidEnemy(${i})">${getTranslatedString(enemy, 'Name')}</button>`
    })
    $('#ba-raid-enemy-tabs').empty().html(tabsHtml)
    raid.RaidSkill.forEach(function(el, i) {
        if (raid_difficulty < el.MinDifficulty) return
        if (skillsHTML != '') skillsHTML += '<div class="ba-panel-separator"></div>'
        skillsHTML += `<div class="d-flex flex-row align-items-center mt-2"><img class="ba-raid-skill d-inline-block me-3" src="images/raid/skill/${el.Icon}.png"><div class="d-inline-block"><div><h4 class="me-2 d-inline">${getTranslatedString(el, 'Name')}</h4></div><div class="mt-1"><p class="d-inline" style="font-style: italic;">${el.SkillType} Skill</p>${el.ATGCost > 0 ? '<p class="d-inline text-bold"> ・ <i>ATG Cost:</i> '+el.ATGCost+'</p>' : ''}</div></div></div><p class="mt-1 mb-2 p-1">${getSkillText(getTranslatedString(el, 'Desc'), el.Parameters, raid_difficulty+1, 'raid')}</p>`
    })
    $('#ba-raid-skills').empty().html(skillsHTML)
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
    
    changeRaidEnemy(selectedEnemy)
}

function changeTimeAttackDifficulty(difficultyId) {
    ta_difficulty = difficultyId
    let rulesHTML = '', enemyHTML = '';
    $('#ba-timeattack-level').text(`Lv.${raid.EnemyLevel[ta_difficulty]}`)

    let isfirst = true
    raid.EnemyList[ta_difficulty].forEach(function(el, i) {
        let enemy = find(data.enemies, "Id", raid.EnemyList[ta_difficulty][i])[0]
        enemyHTML += getEnemyCardHTML(enemy, raid.EnemyLevel[ta_difficulty], 1, 1)
        if (isfirst) {
            showEnemyInfo(enemy.Id, raid.EnemyLevel[ta_difficulty], 1, 1)
            isfirst = false
        }
    })
    $('#ba-stage-enemies').html(enemyHTML)

    raid.Rules.forEach(function(el, i) {
        if (ta_difficulty < el.MinDifficulty) return
        if (rulesHTML != '') rulesHTML += '<div class="ba-panel-separator"></div>'
        rulesHTML += `<div class="d-flex flex-row align-items-start mt-2"><img class="ba-raid-skill d-inline-block me-3" src="images/timeattack/${el.Icon}.png"><div class="d-inline-block"><div><h4 class="me-2 d-inline">${getTranslatedString(el, 'Name')}</h4><p class="mt-1 mb-2 p-1">${getSkillText(getTranslatedString(el, 'Desc'), [], 0, 'raid')}</p></div></div></div>`
    })
    $('#ba-timeattack-rules').empty().html(rulesHTML)
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function changeRaidEnemy(num) {
    selectedEnemy = num
    let enemy = find(data.enemies,'Id',raid.EnemyList[raid_difficulty][num])[0], grade = 1, level = raid_level[raid_difficulty]
    let levelscale = ((level-1)/99).toFixed(4)
    let maxHP = Math.ceil((Math.round((enemy.MaxHP1 + (enemy.MaxHP100-enemy.MaxHP1) * levelscale).toFixed(4)) * starscale_hp[grade-1]).toFixed(4))
    let attack = Math.ceil((Math.round((enemy.AttackPower1 + (enemy.AttackPower100-enemy.AttackPower1) * levelscale).toFixed(4)) * starscale_attack[grade-1]).toFixed(4))
    let defense = Math.round((enemy.DefensePower1 + (enemy.DefensePower100-enemy.DefensePower1) * levelscale).toFixed(4))
    $('#ba-raid-stat-maxhp').text(maxHP.toLocaleString())
    $('#ba-raid-stat-attack').text(attack.toLocaleString())
    $('#ba-raid-stat-defense').text(defense.toLocaleString())
    $('#ba-raid-stat-dmgresist').text(`${parseFloat(((enemy.DamagedRatio-10000)/100).toFixed(4)).toLocaleString()}%`)
    $('#ba-raid-stat-accuracy').text(enemy.AccuracyPoint.toLocaleString())
    $('#ba-raid-stat-evasion').text(enemy.DodgePoint.toLocaleString())
    $('#ba-raid-stat-crit').text(enemy.CriticalPoint.toLocaleString())
    $('#ba-raid-stat-critdmg').text(`${parseFloat(((enemy.CriticalDamageRate)/100).toFixed(4)).toLocaleString()}%`)
    $('#ba-raid-stat-critresist').text(enemy.CriticalResistPoint.toLocaleString())
    $('#ba-raid-stat-critdmgresist').text(`${parseFloat(((enemy.CriticalDamageResistRate)/100).toFixed(4))}%`)


    let bulletType = (raid_difficulty < 5) ? raid.BulletType : raid.BulletTypeInsane
    $("#ba-raid-attacktype").removeClass("bg-atk-explosion bg-atk-pierce bg-atk-mystic bg-atk-normal").addClass(`bg-atk-${bulletType.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType', bulletType)}`, getLocalizedString('ui','attacktype'), null, getTypeText(bulletType), 32), placement: 'top', html: true})
    $("#ba-raid-attacktype-label").text(getLocalizedString('BulletType',bulletType))

    $("#ba-raid-defensetype").removeClass("bg-def-lightarmor bg-def-heavyarmor bg-def-unarmed").addClass(`bg-def-${enemy.ArmorType.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorType', enemy.ArmorType)} Armor`, getLocalizedString('ui','defensetype'), null, getTypeText(enemy.ArmorType), 32), placement: 'top', html: true})
    $("#ba-raid-defensetype-label").text(getLocalizedString('ArmorType',enemy.ArmorType))
    let enemysize = getEnemySize(enemy)
    $('#ba-raid-enemy-size').text(getLocalizedString('EnemyTags', enemysize)).toggle(enemysize != null)

}

function getEnemySize(enemy) {
    let size = enemy.Tags.filter(x => x.includes("Enemy"))
    return (size.length == 0) ? null : size[0]
}

function loadStage(id) {
    if (loadedModule == 'stages') {
        let mode = ''
        if (id >= 7000000) {
            mode = 'Event'
            stage = findOrDefault(data.stages.Event, "Id", id, 8012301)[0]
            $('#ba-stages-list-tab-events').tab('show')
        } else if (id >= 1000000) {
            mode = 'Campaign'
            stage = findOrDefault(data.stages.Campaign, "Id", id, 1011101)[0]
            $('#ba-stages-list-tab-missions').tab('show')
        } else if (id >= 60000) {
            mode = 'SchoolDungeon'
            stage = findOrDefault(data.stages.SchoolDungeon, "Id", id, 60101)[0]
            $('#ba-stages-list-tab-schooldungeon').tab('show')
        } else if (id >= 31000) {
            mode = 'WeekDungeon'
            stage = findOrDefault(data.stages.WeekDungeon, "Id", id, 31101)[0]
            $('#ba-stages-list-tab-commissions').tab('show')
        } else if (id >= 30000) {
            mode = 'WeekDungeon'
            stage = findOrDefault(data.stages.WeekDungeon, "Id", id, 30101)[0]
            $('#ba-stages-list-tab-bounty').tab('show')
        } else {
            // fallback to default 1-1 Normal
            mode = 'Campaign'
            stage = find(data.stages.Campaign, "Id", 1011101)[0]
            $('#ba-stages-list-tab-missions').tab('show')
        }
        $('#ba-stage-drops-tabs').toggle(mode != 'WeekDungeon')
        if (mode == 'WeekDungeon') $('#ba-stage-drops-default-tab').tab('show')

        loadedStage = stage
        $('#ba-stage-name').html(getStageName(stage, mode))
        $('#ba-stage-title').html(getStageTitle(stage, mode))
        $('#ba-stage-level').text(getLocalizedString('ui','rec_level') + ' Lv.'+ stage.Level)
        $('#ba-stage-terrain-img').attr('src', `images/ui/Terrain_${stage.Terrain}.png`)
        $('#ba-stage-fog').toggle(mode == "Campaign" && stage.Difficulty == 1)

        let url = new URL(window.location.href)
        if (url.searchParams.get("stage") != id) {
            url.searchParams.forEach((v,k) => url.searchParams.delete(k))
            url.searchParams.set("stage", id)
            history.pushState(null, '', url)
        }

        const stageTypes = ["Default","FirstClear","ThreeStar"]
        if (stage.Type == "Blood" && regionID == 1) {
            let html = ''
            $.each(stage.RewardsGlobal["Default"], function(i,el2){
                html += getDropIconHTML(el2[0], el2[1])
            })
            $(`#ba-stage-drops-default`).html(`<div class="d-flex flex-wrap justify-content-center">${html}</div>`)
            $(`#ba-stage-drops-default>div div`).each(function(i,el2) {
                $(el2).tooltip({html: true})
            })
        } else { stageTypes.forEach(el => {
            if (el in stage.Rewards && stage.Rewards[el].length > 0) {
                let html = ''
                $.each(stage.Rewards[el], function(i,el2){
                    html += getDropIconHTML(el2[0], el2[1])
                })
                $(`#ba-stage-drops-${el.toLowerCase()}`).html(`<div class="d-flex flex-wrap justify-content-center">${html}</div>`)
                if (stage.Type == "FindGift") {
                    $(`#ba-stage-drops-${el.toLowerCase()}`).prepend('<i class="d-block mb-2">Each enemy defeated will drop one of the following items</i><div class="d-flex flex-wrap justify-content-center"></div>')
                }
                $(`#ba-stage-drops-${el.toLowerCase()}>div div`).each(function(i,el2) {
                    $(el2).tooltip({html: true})
                })
            } else {
                $(`#ba-stage-drops-${el.toLowerCase()}>div`).html('<span class="pb-2 text-center">No rewards.</span>')
            }

        })}

        let html = ''
        let enemyList = {}
        const enemyRanks = ['Minion','Elite','Champion','Boss']
        stage.Formations.forEach(el => {
            for (let i = 0; i < el.EnemyList.length; i++) {
                let enemy = find(data.enemies, "Id", el.EnemyList[i])[0]
                let rankId = enemyRanks.indexOf(enemy.Rank)
                enemyList[`${4-rankId}_${enemy.Id}_${el.Level[rankId]}_${el.Grade[rankId]}`] = enemy
                //all_enemies[enemy_rank[enemy.Rank]+'_'+enemy.Id+'_'+el['Level'+enemy.Rank]+'_'+el['Grade'+enemy.Rank]] = enemy
            }
        })


        let isfirst = true
        Object.keys(enemyList).sort().forEach(el => {
            e_level = el.split('_')[2]
            e_grade = el.split('_')[3]
            html += getEnemyCardHTML(enemyList[el], e_level, e_grade)
            if (isfirst) {
                showEnemyInfo(enemyList[el].Id, e_level, e_grade)
                isfirst = false
            }
        })
        $('#ba-stage-enemies').html(html)
        
        document.title = `Schale DB | ${$('#ba-stage-title').text()}`
        $('#ba-navbar-content').collapse('hide')
        window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        localStorage.setItem("stage", id)
    } else {
        loadModule('stages', id)
    }
}

function getStageName(stage, type) {
    switch (type) {
        case "Event":
            return `${getLocalizedString('EventName', ''+stage.EventId)}\nQuest ${stage.Stage.toString().padStart(2,'0')}`
        case "Campaign":
            return `${stage.Area}-${stage.Stage} ${stage.Difficulty == 1 ? 'Hard' : 'Normal'}`
        case "WeekDungeon":
        case "SchoolDungeon":
            return `${getLocalizedString('StageType', stage.Type)}`
    }
    console.log(`No name definition for stage type ${type}`)
    return "undefined!!!"
}

function getStageTitle(stage, type) {
    switch (type) {
        case "Event":
        case "Campaign":
            return getTranslatedString(stage, 'Name')
        case "WeekDungeon":
        case "SchoolDungeon":
            return `${formatString(getLocalizedString('StageTitle', stage.Type), String.fromCharCode(64+stage.Stage))}`
    }
    console.log(`No title definition for stage type ${type}`)
    return "undefined!!!"
}

function getEventStage(id) {
    let event_id = id.toString().slice(0,3)
    let event = find(data.stages.events, "Id", event_id)
    if (event.length > 0) {
        let event_stage = find(event[0].Stages, "Id", id)
        if (event_stage.length > 0) return event_stage[0]
    }
    return data.stages.events[0].Stages[0]
}

function loadRegion(regID) {
    regionID = regID
    region = data.common.regions[regionID]
    $("#ba-statpreview-levelrange").attr("max",region.studentlevel_max)
    $("#ba-weaponpreview-levelrange, #ba-statpreview-weapon-range").attr("max",region.weaponlevel_max)
    if (region.weaponlevel_max == 0) {
        $("#ba-student-nav-weapon").hide()
        $("#ba-statpreview-weapon").hide()
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
        //hide filters not relevant to global
        $('#ba-student-search-filter-school-srt').hide()
        $('#ba-student-search-filter-school-arius').hide()
        $('#ba-student-search-filter-weapontype-rl').hide()
    }
}

function getAdaptationText(terrain, rank) {
    return formatString(getLocalizedString('ui','terrain_adaption_details'), terrain_dmg_bonus[rank], getLocalizedString('AdaptationType',terrain).toLowerCase(), terrain_block_bonus[rank])
}

function getStatName(stat) {
    return getLocalizedString('Stat',stat.replace('_Coefficient','').replace('_Base','').replace('100','').replace('1',''))
}

function getFormattedStatAmount(val) {
    return Number.isInteger(val) ? val : `${parseFloat((val*100).toFixed(2))}%`
}

function changeGearLevel(slot, el, recalculate = true) {
    let geartype = student.Equipment[slot-1]
    let tier = parseInt(el.value)
    let equipment = find(data.equipment, "Id", gearId[geartype]+tier-1)[0]

    //var gearobj = find(data.common.gear, "type", geartype)[0]
    $(`#ba-statpreview-gear${slot}-icon`).attr("src", `images/equipment/Equipment_Icon_${geartype}_Tier${tier}.png`)
    $(`#ba-statpreview-gear${slot}-level`).text(`T${tier}`)
    $(`#ba-statpreview-gear${slot}-name`).text(getTranslatedString(equipment, 'Name'))
    $(`#ba-statpreview-gear${slot}-description`).html(getGearStatsText(equipment))
    if (statPreviewIncludeEquipment) {
        if (recalculate) recalculateStatPreview()
        updateGearIcon()
    }
}

function getEquipmentId(type, tier) {
    return find(data.equipment, "Category", type)[tier-1]
}

function getGearStatsText(equipment, delimiter=', ') {
    let text = []
    for (let i = 0; i < equipment.StatType.length; i++) {
        let value = equipment.StatValue[i][1]
        if (equipment.StatType[i].split('_')[1] == "Coefficient") {
            value = parseFloat((value/100).toFixed(2))+'%'
        }
        text.push(`${getStatName(equipment.StatType[i])} +<b>${value}</b>`)
        
    }
    return text.join(delimiter)
}

function toggleStrikerBonus() {
    statPreviewSupportStats = !statPreviewSupportStats
    if (statPreviewSupportStats && statPreviewSummonStats) toggleStudentSummon()
    $('#ba-student-stat-table').toggleClass("table-striker-bonus", statPreviewSupportStats)
    $('#ba-statpreview-status-strikerbonus').toggleClass("deactivated", !statPreviewSupportStats)
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
    $('#ba-weaponpreview-level').text("Lv." + el.value)
    recalculateWeaponPreview()
}

function changeStatPreviewBondLevel(i, el, recalculate = true) {
    $(`#ba-statpreview-bond-${i}-level`).html(`<i class="fa-solid fa-heart"></i> ${el.value}`)
    var bondStats
    if (i == 1) {
        bondStats = Object.entries(getBondStats(student, el.value))
    } else {
        bondStats = Object.entries(getBondStats(student_bondalts[i-2], el.value))
    }
    $(`#ba-statpreview-bond-${i}-description`).html(`${getStatName(bondStats[0][0])} <b>+${getFormattedStatAmount(bondStats[0][1])}</b>, ${getStatName(bondStats[1][0])} <b>+${getFormattedStatAmount(bondStats[1][1])}</b>`)
    if (recalculate) recalculateStatPreview()
}

function changeStatPreviewWeaponLevel(el) {
    updateWeaponLevelStatPreview(el.value)
    recalculateStatPreview()
}

function updateWeaponLevelStatPreview(level) {
    $('#ba-statpreview-weapon-level, #ba-student-weapon-level').html('Lv.' + level)
    let weaponStats = getWeaponStats(student, level)
    let desc = ""
    $(Object.entries(weaponStats)).each(function(i, el){
        if (el[1] > 0) desc += `${getStatName(el[0])} <b>+${getFormattedStatAmount(el[1])}</b>, `
    })
    $('#ba-statpreview-weapon-description').html(desc.substring(0, desc.length-2))
}

function changeStatPreviewPassiveSkillLevel(el) {
    if (el.value == el.max) {
        $('#ba-statpreview-passiveskill-level').html(`<img src="images/ui/ImageFont_Max.png" style="height: 18px;width: auto;margin-top: -2px;">`)
    } else {
        $('#ba-statpreview-passiveskill-level').html("Lv." + el.value)
    }
    updatePassiveSkillStatPreview()
    recalculateStatPreview()
}

function changeStatPreviewSummonExSkillLevel(el) {
    if (el.value == el.max) {
        $('#ba-statpreview-exskill-level').html(`<img src="images/ui/ImageFont_Max.png" style="height: 18px;width: auto;margin-top: -2px;">`)
    } else {
        $('#ba-statpreview-exskill-level').html("Lv." + el.value)
    }
    updateSummonExSkillStatPreview()
    recalculateStatPreview()
}

function getBondTargetsHTML(num, student) {
    return `<div class="mt-2 mb-1 d-flex flex-row align-items-center"><div class="me-3" style="position: relative;"><img class="ba-bond-icon ms-0" src="images/student/icon/${student.CollectionTexture}.png"></div><div class="flex-fill"><h5 class="d-inline">${getTranslatedString(student, 'Name')}</h5><p id="ba-statpreview-bond-${num}-description" class="mb-0" style="font-size: 0.875rem; line-height: 1rem;"></p></div></div><div class="d-flex flex-row align-items-center mb-2"><input id="ba-statpreview-bond-${num}-range" oninput="changeStatPreviewBondLevel(${num}, this)" type="range" class="form-range me-2 flex-fill" value="20" min="1" max="${region.bondlevel_max}"><span id="ba-statpreview-bond-${num}-level" class="ba-slider-label"></span></div>`
}

function changeBondLevel(el) {
    $('#ba-bond-level').html('<i class="fa-solid fa-heart"></i> ' + el.value)
    recalculateBondPreview()
}

function updateGearIcon() {
    let gear, tier, tierText = ""
    for (let i=1; i<=3; i++) {
        tier = statPreviewIncludeEquipment ? $(`#ba-statpreview-gear${i}-range`).val() : 1
        tierText += ((tierText == "") ? "" : " / ") + "T"+$(`#ba-statpreview-gear${i}-range`).val()
        gear = find(data.equipment, "Id", gearId[student.Equipment[i-1]]+(tier-1))[0]
        $("#ba-student-gear-"+i).attr("src", `images/equipment/Equipment_Icon_${gear.Category}_Tier${tier}.png`).tooltip('dispose').tooltip({title: getRichTooltip(`images/equipment/Equipment_Icon_${gear.Category}_Tier${tier}.png`, getTranslatedString(gear, 'Name'), getLocalizedString('ItemCategory', gear.Category), `T${tier}`, getTranslatedString(gear, 'Desc') + `\n\n<b>${getLocalizedString('ui', "stat_info")}:</b>\n` + getGearStatsText(gear, '\n'), 50, 'img-scale-larger'), placement: 'top', html: true}).toggleClass("gear-disabled", !statPreviewIncludeEquipment)
        $("#ba-student-gear-"+i).attr('onclick', `loadItem(${gear.Id+2000000})`)

    }
    //$('#ba-statpreview-status-equipment .statpreview-label').text(tierText)
}

function recalculateTerrainAffinity() {
    let types = ["Street","Outdoor","Indoor"]
    types.forEach( type => {
        let adaptation = getLocalizedString('AdaptationAmount', String(student[`${type}BattleAdaptation`] + ((stat_preview_stars == 5 && stat_preview_weapon_stars >= 3 && student.Weapon.AdaptationType == type) ? student.Weapon.AdaptationValue : 0)))
        $(`#ba-student-terrain-${type.toLowerCase()}-icon`).attr("src", `images/ui/Ingame_Emo_Adaptresult${adaptation}.png`)
        $(`#ba-student-terrain-${type.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(`images/ui/Ingame_Emo_Adaptresult${adaptation}.png`,formatString(getLocalizedString('ui', 'terrain_adaption'), getLocalizedString('AdaptationType', type))+' '+adaptation, null, null, getAdaptationText(type, adaptation), 30), placement: 'top', html: true})

    })
}

function recalculateWeaponPreview() {
    let level = $("#ba-weaponpreview-levelrange").val()
    let weaponStats = getWeaponStats(student, level)
    $(`#ba-weapon-stat-attack-amount`).text('+'+weaponStats.AttackPower)
    $(`#ba-weapon-stat-maxhp-amount`).text('+'+weaponStats.MaxHP)
    $(`#ba-weapon-stat-healing-amount`).text('+'+weaponStats.HealPower)
}

function recalculateStatPreview() {
    const minlevelreq = [0, 15, 35]
    const maxbond = [10, 10, 20, 20, 50]
    let strikerBonus = $('#ba-student-stat-table').hasClass("table-striker-bonus")
    let level = $("#ba-statpreview-levelrange").val()
    let studentStats, summonStats, summon
    if (statPreviewSummonStats) {
        summon = find(data.summons, 'Id', student.SummonIds[0])[0]
        summonStats = new CharacterStats(summon, level, (summon.StarBonus ? stat_preview_stars : 1))
    }
    studentStats = new CharacterStats(student, level, stat_preview_stars)
    if (compareMode) {
        studentCompareStats = new CharacterStats(studentCompare, level, stat_preview_stars)
    }

    //Include Equipment
    if (statPreviewIncludeEquipment) {
        let gear, tier
        for (let i = 0; i < 3; i++) {
            tier = parseInt($(`#ba-statpreview-gear${i+1}-range`).val())
            gear = find(data.equipment, "Id", gearId[student.Equipment[i]]+tier-1)[0]

            //check that equipment slot is unlocked at current level
            if (level >= minlevelreq[i]) {
                for (let j = 0; j < gear.StatType.length; j++) {
                    studentStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    if (statPreviewSummonStats && summon.Id != 99999) {
                        summonStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    }
                }
            }

            if (compareMode) {
                gear = find(data.equipment, "Id", gearId[studentCompare.Equipment[i]]+tier-1)[0]
                //check that equipment slot is unlocked at current level
                if (level >= minlevelreq[i]) {
                    for (let j = 0; j < gear.StatType.length; j++) {
                        studentCompareStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    }
                }
            }
        }
    }

    //Include Relationship
    if (statPreviewIncludeBond) {
        let bondlevel = $(`#ba-statpreview-bond-1-range`).val()
        let bondbonus = getBondStats(student, Math.min(maxbond[stat_preview_stars-1], bondlevel))
        Object.entries(bondbonus).forEach(el => {
            studentStats.addBuff(el[0], el[1])
        })
        if (compareMode) {
            bondbonus = getBondStats(studentCompare, Math.min(maxbond[stat_preview_stars-1], bondlevel))
            Object.entries(bondbonus).forEach(el => {
                studentCompareStats.addBuff(el[0], el[1])
            })
        }
    }

    if (statPreviewIncludeBondAlts) {
        for (let i = 2; i <= student_bondalts.length+1; i++) {
            let bondlevel = $(`#ba-statpreview-bond-${i}-range`).val()
            let bondbonus = getBondStats(student_bondalts[i-2], bondlevel)
            Object.entries(bondbonus).forEach(el => {
                studentStats.addBuff(el[0], el[1])
            })
        }
    }

    //Include Passive Skill
    if (statPreviewIncludePassive && !statPreviewSupportStats) {
        let passiveSkill = find(student.Skills, 'SkillType', ((stat_preview_weapon_stars >= 2) ? 'weapon' : '') + 'passive')[0]
        let passiveBonus = getPassiveSkillBonus(passiveSkill, $('#ba-statpreview-passiveskill-range').val())
        Object.entries(passiveBonus).forEach(el => {
            studentStats.addBuff(el[0], el[1])
        })

        if (compareMode) {
            passiveSkill = find(studentCompare.Skills, 'SkillType', ((stat_preview_weapon_stars >= 2) ? 'weapon' : '') + 'passive')[0]
            passiveBonus = getPassiveSkillBonus(passiveSkill, $('#ba-statpreview-passiveskill-range').val())
            Object.entries(passiveBonus).forEach(el => {
                studentCompareStats.addBuff(el[0], el[1])            
            })
        }
    }

    //Include Ex. Weapon
    if ((stat_preview_stars == 5) && (stat_preview_weapon_stars > 0)) {
        let weaponStats = getWeaponStats(student, $('#ba-statpreview-weapon-range').val())
        Object.entries(weaponStats).forEach(el => {
            studentStats.addBuff(el[0], el[1])
            if (statPreviewSummonStats && summon.Id != 99999) {
                summonStats.addBuff(el[0], el[1])
            }
        })
        if (compareMode) {
            weaponStats = getWeaponStats(studentCompare, $('#ba-statpreview-weapon-range').val())
            Object.entries(weaponStats).forEach(el => {
                studentCompareStats.addBuff(el[0], el[1])
            })
        }
    }

    //add student stat to summon/vehicle
    if (statPreviewSummonStats && !compareMode) {
        let exLevel = $('#ba-statpreview-exskill-range').val()
        summonStats.addCharacterStatsAsBuff(studentStats, student.Skills[0].SummonStat, student.Skills[0].SummonStatCoefficient[exLevel-1])
    }

    if (student.SquadType == "Support") {
        studentStats.stats["AmmoCount"][0] = 0
    }
    if (compareMode && studentCompare.SquadType == "Support") {
        studentCompareStats.stats["AmmoCount"][0] = 0
    }

    const statList = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalDamageRate','StabilityPoint','Range','OppressionPower','OppressionResist','AmmoCount','CriticalChanceResistPoint','CriticalDamageResistRate','HealEffectivenessRate']
    let stats = (statPreviewSummonStats ? summonStats : studentStats)

    statList.forEach((stat, index) => {
        let text
        if ((strikerBonus) && (!statPreviewSummonStats) && (index < 4)) {
            text = '+' + stats.getStrikerBonus(stat).toLocaleString()
        } else {
            if (stat == 'AmmoCount') {
                let ammo = stats.getTotalString('AmmoCount')
                let cost = stats.getTotalString('AmmoCost')
                if (ammo == 0) {
                    text = "N/A"
                } else {
                    text = `${ammo}&nbsp;(${cost})`
                }
            } else {
                text = stats.getTotalString(stat)
            }
        }
        if (compareMode) {
            let diff, amount

            if (strikerBonus) {
                if (studentCompare.SquadType != "Support") {
                    diff = stats.getStrikerBonus(stat)
                } else {
                    diff = stats.getStrikerBonus(stat) - studentCompareStats.getStrikerBonus(stat)
                }
            } else {
                diff = stats.getTotal(stat) - studentCompareStats.getTotal(stat)
            }

            if (stat.slice(-4) == 'Rate') {
                amount = `${parseFloat(Math.abs(diff/100).toFixed(1)).toLocaleString()}%`
            } else {
                amount = `${Math.abs(diff).toLocaleString()}`
            }

            if (diff < 0) {
                text += `<small class="comparison less">&#9660;&nbsp;${amount}</small>`
            } else if (diff > 0) {
                text += `<small class="comparison greater">&#9650;&nbsp;${amount}</small>`
            } else {
                text += `<small class="comparison">&#9654;&nbsp;0</small>`
            }
        }
        $(`#ba-student-stat-${stat} .stat-value`).html(text)
    })

    $('#ba-statpreview-status-bond-level').toggleClass('deactivated', !statPreviewIncludeBond)
    $('#ba-statpreview-status-bond-level .statpreview-label').html(`<i class="fa-solid fa-heart me-1"></i> ${$('#ba-statpreview-bond-1-range').val()}`)
    if (student_bondalts.length > 0) {
        $('#ba-statpreview-status-bond-alt-level').toggleClass('deactivated', !statPreviewIncludeBondAlts)
        $('#ba-statpreview-status-bond-alt-level .statpreview-label').html(`<i class="fa-solid fa-heart me-1"></i> ${$('#ba-statpreview-bond-2-range').val()}`)
    }
    $('#ba-statpreview-status-passive-level').toggleClass('deactivated', !statPreviewIncludePassive)
    $('#ba-statpreview-status-equipment').toggleClass('deactivated', !statPreviewIncludeEquipment)
    $('#ba-statpreview-status-compare').toggleClass('deactivated', !compareMode)
}

function recalculateEXSkillPreview() {
    let skillLevelEX = $("#ba-skillpreview-exrange").val()
    let skillEX = find(student.Skills, 'SkillType', 'ex')[0]
    if (userLang == 'ja' && skillEX.ParametersJp != null) {
        $('#ba-skill-ex-description').html(getSkillText(getTranslatedString(skillEX, 'Desc'), skillEX.ParametersJp, skillLevelEX, student.BulletType))
    } else {
        $('#ba-skill-ex-description').html(getSkillText(getTranslatedString(skillEX, 'Desc'), skillEX.Parameters, skillLevelEX, student.BulletType))
    }
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    $('.ba-skill-ex-materials').hide()
    $('#ba-skill-ex-materials-'+skillLevelEX).show()
    $('#ba-skill-ex-cost').text(skillEX.Cost[skillLevelEX-1])

}

function recalculateSkillPreview() {
    let skillLevel = $("#ba-skillpreview-range").val()
    let skillList = ['normal','passive','sub']
    skillList.forEach(el => {
        let skill = find(student.Skills, 'SkillType', el)[0]
        if (userLang == 'ja' && skill.ParametersJp != null) {
            $(`#ba-skill-${el}-description`).html(getSkillText(getTranslatedString(skill, 'Desc'), skill.ParametersJp, skillLevel, student.BulletType))
        } else {
            $(`#ba-skill-${el}-description`).html(getSkillText(getTranslatedString(skill, 'Desc'), skill.Parameters, skillLevel, student.BulletType))
        }
    })

    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    $('.ba-skill-materials').hide()
    $('#ba-skill-materials-'+skillLevel).show()
}

function getStudentListCardHTML(student) {
    let name = getTranslatedString(student, 'Name')
    let html = `
    <div id="ba-student-select-${student.Id}" class="ba-select-grid-item unselectable">
        <div onclick="loadStudent('${student.DevName}')" class="ba-student-card">
            <div class="ba-student-card-portrait"><img class="ba-student-card-portrait-img" src="images/student/collection/${student.CollectionTexture}.webp"></div>
            <span class="ba-student-card-role bg-${student.SquadType.toLowerCase()}-t"><img src="images/ui/Role_${student.TacticRole}.png" style="width:100%"></span>
            <span class="ba-student-card-atk bg-atk-${student.BulletType.toLowerCase()}-t"><img src="images/ui/Type_Attack_s.png" style="width:100%;"></span>
            <span class="ba-student-card-def bg-def-${student.ArmorType.toLowerCase()}-t"><img src="images/ui/Type_Defense_s.png" style="width:100%;"></span>
            <img class="ba-student-card-star" style="right: 2px; top: 2px;" src="images/ui/Common_Icon_Formation_Star_R${student.StarGrade}.png">
            <div class="d-flex align-items-center ba-student-card-label">
                <span class="ba-label-text px-1 align-middle ${name.length > label_smalltext_threshold[userLang] ? "smalltext" : ""}" style="width: 100%">${name}</span>
                <span class="ba-hover-text px-1 align-middle ${name.length > label_smalltext_threshold[userLang] ? "smalltext" : ""}" style="display: none; width: 100%">${name}</span>
            </div>
        </div>
    </div>`
    //html += `<span class="px-1 align-middle ${label.length > 11 ? "smalltext" : ""}" style="width: 100%">${label.replace(' (','\n(')}</span>`
    return html
}

function getItemCardHTML(item, linkid, icontype) {
    var html = `<div id="ba-item-select-${item.Id}" class="ba-select-grid-item unselectable" title="${getBasicTooltip(getTranslatedString(item, 'Name'))}"><div onclick="loadItem('${linkid}')" class="ba-item-card"><div class="ba-item-card-img"><img class="ba-item-${item.Rarity.toLowerCase()}" loading="lazy" src="images/${icontype}/${item.Icon}.png"></div></div></div>`
    return html
}

function getStageCardHTML(stage, dropChance = 0) {
    let type = ''
    if (stage.Id >= 7000000) {
        type = 'Event'
    } else if (stage.Id >= 1000000) {
        type = 'Campaign'
    } else if (stage.Id >= 60000) {
        type =  'SchoolDungeon'
    } else if (stage.Id >= 30000) {
        type = 'WeekDungeon'
    } else {type = 'Unknown'}
    let name = getStageCardName(stage)
    var html = `<div id="ba-stage-select-${stage.Id}" class="ba-select-grid-item unselectable">
    <div onclick="loadStage('${stage.Id}')" class="ba-stage-card">
    <div class="ba-stage-card-img"><img loading="lazy" src="images/campaign/${getStageIcon(stage, type)}.png"></div>`
    if (dropChance > 0) {
        html += `<span class="ba-stage-card-droprate">${getProbabilityText(dropChance)}</span>`
    }
    html += `<div class="d-flex align-items-center ba-select-grid-card-label">`
    html += `<span class="ba-label-text px-1 align-middle  ${name.length > label_enemy_smalltext_threshold[userLang] ? "smalltext" : "" }"" style="width: 100%">${name}</span>`
    html += `</div></div></div>`
    return html

    function getStageCardName() {
        switch (type) {
            case "Event":
                return `Quest ${stage.Stage.toString().padStart(2,'0')}`
            case "Campaign":
                return `${stage.Area}-${stage.Stage} ${stage.Difficulty == 1 ? 'Hard' : 'Normal'}`
            case "WeekDungeon":
            case "SchoolDungeon":
                return `${formatString(getLocalizedString('StageTitle', stage.Type), String.fromCharCode(64+stage.Stage))}`
        }
    }
}

function getStageIcon(stage, type) {
    switch (type) {
        case "Event":
            return `Campaign_Event_${stage.EventId}_Normal`
        case "Campaign":
            return `Campaign_Image_${stage.Area.toString().padStart(2,'0')}_${stage.Difficulty == 1 ? 'Hard' : 'Normal'}`
        case "WeekDungeon":
            return `WeekDungeon_Image_${stage.Type}`
        case "SchoolDungeon":
            return `SchoolDungeon_Image_${stage.Type}`
    }
}

function getRaidCardHTML(raid, terrain='') {
    let html = `<div id="ba-raid-select-${raid.Id}" class="ba-select-grid-item unselectable"><div onclick="loadRaid(${raid.Id});" class="ba-raid-card"><div class="ba-raid-card-bg-container"><div class="ba-raid-card-bg" style="background-image:url('images/raid/${raid.IconBG}.png');"></div></div><div class="ba-raid-card-img"><img src="images/raid/${raid.Icon}.png"></div><div class="ba-raid-card-def bg-def-${raid.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense.png" style="width:100%;"></div>`
    if (terrain != '') {
        html += `<div class="ba-raid-card-terrain"><img class="invert-light" src="images/ui/Terrain_${terrain}.png"></div>`
    }
    html += `<div class="d-flex align-items-center ba-select-grid-card-label"><span class="ba-label-text px-1 align-middle" style="width: 100%">${getTranslatedString(raid, 'Name')}</span></div></div></div>`
    return html
}

function getTimeAttackCardHTML(raid) {
    let name = getTranslatedString(raid, 'Name')
    let html = `<div id="ba-raid-select-${raid.Id}" class="ba-select-grid-item unselectable"><div onclick="loadRaid(${raid.Id});" class="ba-raid-card"><div class="ba-raid-card-bg-container"><div class="ba-raid-card-bg" style="background-image:url('images/timeattack/${raid.IconBG}.png');"></div></div><div class="ba-ta-card-img"><img src="images/enemy/${raid.Icon}.png"></div><div class="ba-raid-card-def bg-def-${raid.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense.png" style="width:100%;"></div><div class="ba-raid-card-terrain"><img class="invert-light" src="images/ui/Terrain_${raid.Terrain}.png"></div>`
    html += `<div class="d-flex align-items-center ba-select-grid-card-label"><span class="ba-label-text px-1 align-middle ${name.length > label_raid_smalltext_threshold[userLang] ? 'smalltext' : ''}" style="width: 100%">${name}</span></div></div></div>`
    return html
}

function getEnemyCardHTML(enemy, level, grade, scaletype=0) {
    var html = `<div class="ba-icon-enemy unselectable" onclick="showEnemyInfo(${enemy.Id},${level},${grade},${scaletype})"><img src="images/enemy/${enemy.Icon}.png">`
    if (enemy.Rank == 'Elite') html += `<span class="ba-enemy-card-rank"><img src="images/ui/Common_Icon_Enemy_Elite.png" style="width:22px;"></span>`
    else if (enemy.Rank == 'Champion') html += `<span class="ba-enemy-card-rank"><img src="images/ui/Common_Icon_Enemy_Champion.png" style="width:31px;"></span>`
    html += `<span class="ba-enemy-card-lv">Lv.${level}</span><span class="ba-enemy-card-atk bg-atk-${enemy.BulletType.toLowerCase()}"><img src="images/ui/Type_Attack_s.png" style="width:100%;"></span>
    <span class="ba-enemy-card-def bg-def-${enemy.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense_s.png" style="width:100%;"></span><div class="d-flex align-items-center ba-select-grid-card-label"><span class="ba-label-text px-1 align-middle ${getTranslatedString(enemy, 'Name').length > label_enemy_smalltext_threshold[userLang] ? 'smalltext' : ''}" style="width: 100%">${getTranslatedString(enemy, 'Name')}</span></div></div>`
    return html
}

function showEnemyInfo(id, level, grade=1, scaletype=0) {
    let enemy = find(data.enemies, 'Id', id)[0]
    $('#ba-stage-enemy-name').text(getTranslatedString(enemy, 'Name'))
    $('#ba-stage-enemy-img').attr('src', `images/enemy/${enemy.Icon}.png`)
    $('#ba-stage-enemy-rank').text(`Lv.${level} ${getLocalizedString('EnemyRank', enemy.Rank)}`)
    $('#ba-stage-enemy-class').text(getLocalizedString('SquadType', enemy.SquadType)).removeClass("ba-class-main ba-class-support").addClass(`ba-class-${enemy.SquadType.toLowerCase()}`)
    let enemysize = getEnemySize(enemy)
    $('#ba-stage-enemy-size').text(getLocalizedString('EnemyTags', enemysize)).toggle(enemysize != null)
    $("#ba-stage-enemy-attacktype").removeClass("bg-atk-normal bg-atk-explosion bg-atk-pierce bg-atk-mystic").addClass(`bg-atk-${enemy.BulletType.toLowerCase()}`)
    $("#ba-stage-enemy-defensetype").removeClass("bg-def-lightarmor bg-def-heavyarmor bg-def-unarmed").addClass(`bg-def-${enemy.ArmorType.toLowerCase()}`)
    $("#ba-stage-enemy-attacktype-label").text(getLocalizedString('BulletType',enemy.BulletType))
    $('#ba-stage-enemy-attacktype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType',enemy.BulletType)}`, getLocalizedString('ui','attacktype'), null, getTypeText(enemy.BulletType), 32), placement: 'top', html: true})
    $("#ba-stage-enemy-defensetype-label").text(getLocalizedString('ArmorType',enemy.ArmorType))
    $('#ba-stage-enemy-defensetype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorType',enemy.ArmorType)} Armor`, getLocalizedString('ui','defensetype'), null, getTypeText(enemy.ArmorType), 32), placement: 'top', html: true})

    let levelscale
    if (scaletype == 0) {
        levelscale = ((level-1)/99).toFixed(4)
    } else if (scaletype == 1) {
        levelscale = getTimeAttackLevelScale(level)
    }
        

    let MaxHP = Math.ceil((Math.round((enemy.MaxHP1 + (enemy.MaxHP100-enemy.MaxHP1) * levelscale).toFixed(4)) * starscale_hp[grade-1]).toFixed(4))
    let AttackPower = Math.ceil((Math.round((enemy.AttackPower1 + (enemy.AttackPower100-enemy.AttackPower1) * levelscale).toFixed(4)) * starscale_attack[grade-1]).toFixed(4))
    let Defense = Math.round((enemy.DefensePower1 + (enemy.DefensePower100-enemy.DefensePower1) * levelscale).toFixed(4))
    let Healing = Math.ceil((Math.round((enemy.HealPower1 + (enemy.HealPower100-enemy.HealPower1) * levelscale).toFixed(4)) * starscale_healing[grade-1]).toFixed(4))
    
    $('#ba-stage-enemy-stat-maxhp').text(MaxHP.toLocaleString())
    $('#ba-stage-enemy-stat-attack').text(AttackPower.toLocaleString())
    $('#ba-stage-enemy-stat-defense').text(Defense.toLocaleString())
    $('#ba-stage-enemy-stat-healing').text(Healing.toLocaleString())

    $('#ba-stage-enemy-stat-accuracy').text(enemy.AccuracyPoint.toLocaleString())
    $('#ba-stage-enemy-stat-evasion').text(enemy.DodgePoint.toLocaleString())
    $('#ba-stage-enemy-stat-crit').text(enemy.CriticalPoint.toLocaleString())
    $('#ba-stage-enemy-stat-critdmg').text(`${parseFloat(((enemy.CriticalDamageRate)/100).toFixed(4)).toLocaleString()}%`)

    $('#ba-stage-enemy-stat-stability').text(enemy.StabilityPoint.toLocaleString())
    $('#ba-stage-enemy-stat-range').text(enemy.Range.toLocaleString())

    if (enemy.SquadType == "Main") {
        $('#ba-stage-enemy-stat-ammo').text(enemy.AmmoCount + " (" + enemy.AmmoCost + ")")
    } else {
        $('#ba-stage-enemy-stat-ammo').text('N/A')
    }

    $('#ba-stage-enemy-stat-critresist').text(enemy.CriticalResistPoint.toLocaleString())
    $('#ba-stage-enemy-stat-critdmgresist').text(`${parseFloat(((enemy.CriticalDamageResistRate)/100).toFixed(4))}%`)
    $('#ba-stage-enemy-stat-movespeed').text(enemy.MoveSpeed.toLocaleString())

}

function getMaterialIconHTML(id, amount) {
    //rarity, icon, name, amount, type, description=""
    var item
    if (id >= 3000000) {
        item = find(data.common.currency, "Id", id-3000000)[0]
    } else {
        item = find(data.items, "Id", id)[0]
    }
    var html
    html = `<div class="drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${item.Id})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/items/${item.Icon}.png`, getTranslatedString(item, 'Name'), getLocalizedString('ItemCategory', item.Category), getRarityStars(item.Rarity), getTranslatedString(item, 'Desc'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()}" src="images/items/${item.Icon}.png"><span class="ba-material-label" style="cursor:pointer;">&times;${amount}</span></div>`
    return html
}

function getDropIconHTML(id, chance) {
    let item, type, group, haslink
    if (id >= 4000000) {
        groups = find(data.common.GachaGroup, "Id", id-4000000)
        if (groups.length > 0) {
            group = groups[0]
            type = 'GachaGroup'
            iconPath = 'items'
            haslink = false
        } else return ''
    } else if (id >= 3000000) {
        item = find(data.common.currency, "Id", id-3000000)[0]
        type = 'Currency'
        iconPath = 'items'
        haslink = false
    } else if (id >= 2000000) {
        item = find(data.equipment, "Id", id-2000000)[0]
        type = 'Equipment'
        iconPath = 'equipment'
        haslink = true
    } else if (id >= 1000000) {
        item = find(data.furniture, "Id", id-1000000)[0]
        type = 'Furniture'
        iconPath = 'furniture'
        haslink = true
    } else {
        item = find(data.items, "Id", id)[0]
        type = 'Item'
        iconPath = 'items'
        haslink = true
    }
    let rarityText = ''
    if (item) {
        if (type == 'Equipment' && item.Id >= 1000) {
            rarityText = `T${(item.Id%10)+1}`
        } else {
            rarityText = getRarityStars(item.Rarity)
        }
    }

    let html = ''
    if (type == "GachaGroup") {
        //check for single item GachaGroup, just display the item as normal with max qty
        //todo: make this show the full qty range
        let rarity = 'N'
        if (group.ItemList.length == 1) {
            return getDropIconHTML(group.ItemList[0][0], chance < 1 ? chance : group.ItemList[0][3])
        } else {
            // build group icon
            let icon, name, desc
            if (group.Id >= 600000 && group.Id < 700000) {
                name = "Random "
                desc = "Contains one of the following equipment pieces:\n"
                iconPath = 'equipment'
                let gearType = ''
                for (let i = 0; i < group.ItemList.length; i++) {
                    let gear = find(data.equipment, 'Id', group.ItemList[i][0]-2000000)[0]
                    desc += getTranslatedString(gear, 'Name') + "\n"
                    icon = gear.Icon
                    gearType = getLocalizedString('ItemCategory', gear.Category)
                    name += `${(i > 0) ? '/' : ''}T${(gear.Id%10)+1}`
                }
                name += ' '+gearType

            } else if (group.Id >= 10100 && group.Id <= 10103) {
                icon = group.Icon
                name = getTranslatedString(group, 'Name')
                desc = "Contains one of the following artifacts:\n"
                rarity = group.Rarity
                for (let i = 0; i < group.ItemList.length; i++) {
                    let item = find(data.items, 'Id', group.ItemList[i][0])[0]
                    desc += getTranslatedString(item, 'Name') + "\n"
                }
            }
            html = `<div class="drop-shadow" style="position: relative; data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/${iconPath}/${icon}.png`, name, getLocalizedString('ItemCategory','Box'), '', desc, 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${rarity.toLowerCase()}" src="images/${iconPath}/${icon}.png"><span class="ba-material-label">${getProbabilityText(chance)}</span></div>`
        }
    } else {
        html = `<div class="drop-shadow" style="position: relative; ${haslink ? 'cursor:pointer;" onclick="loadItem('+id+')"' : '"'} data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/${iconPath}/${item.Icon}.png`, getTranslatedString(item, 'Name'), getLocalizedString('ItemCategory',item.Category), rarityText, getTranslatedString(item, 'Desc'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()}" src="images/${iconPath}/${item.Icon}.png"><span class="ba-material-label" ${haslink ? 'style="cursor:pointer;"' : ""}>${getProbabilityText(chance)}</span></div>`
    }
    return html
}

/**
 * Formats a string with placeholders {n} using replacements. If n is out of bounds it will be replaced with an empty string
 * @param {string} string
 * @param  {...string} replacements 
 * @returns
 */
function formatString(string, ...replacements) {
    return string.replace(/\{([0-9]+)\}/g, (match, p1) => (p1 < replacements.length) ? replacements[p1] : '')
}

/**
 * Converts a probability to a string representing its percentage chance when < 1.00, or the quantity when >= 1.00
 * @param {*} chance 
 * @returns 
 */
function getProbabilityText(chance) {
    return chance >= 1 ? '&times;'+abbreviateNumber(parseInt(chance).toFixed(0)).toLocaleString(): parseFloat((chance*100).toFixed(2)) + '&#37;'
}

function getStudentIconSmall(student) {
    var html = `<div class="ba-item-student drop-shadow d-inline-block" style="position: relative; cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" onclick="loadStudent('${student.DevName}')" title="${getRichTooltip(`images/student/icon/${student.CollectionTexture}.png`, getTranslatedString(student, 'Name'), getLocalizedString('ui','student'), getRarityStars(student.StarGrade), getTranslatedString(student, 'ProfileIntroduction').split('\n')[0], 50, 'circle')}"><img src="images/student/icon/${student.CollectionTexture}.png"></div>`
    return html
}

function getFavourIconHTML(id, grade) {
    var gift = find(data.items, "Id", 5000+id)[0]
    var html = `<div class="ba-favor-item drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${gift.Id})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/items/${gift.Icon}.png`, getTranslatedString(gift, 'Name'), getLocalizedString('ItemCategory', gift.Category), getRarityStars(gift.Rarity), getTranslatedString(gift, 'Desc'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${gift.Rarity.toLowerCase()}" src="images/items/${gift.Icon}.png"><img class="ba-favor-label" src="images/ui/Cafe_Interaction_Gift_0${grade}.png"></div>`
    return html
}

function getFurnitureIconHTML(item) {
    var html = `<div class="ba-favor-item drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${item.Id+1000000})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/furniture/${item.Icon}.png`, getTranslatedString(item,'Name'), getLocalizedString('ItemCategory', item.Category), getRarityStars(item.Rarity), getTranslatedString(item, 'Desc'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()} mb-2" src="images/furniture/${item.Icon}.png"></div>`
    return html
}

function recalculateWeaponSkillPreview() {
    let skillLevel = $("#ba-weapon-skillpreview-range").val()
    let skill = find(student.Skills, 'SkillType', 'weaponpassive')[0]
    if (userLang == 'ja' && skill.ParametersJp != null) {
        $('#ba-skill-weaponpassive-description').html(getSkillText(getTranslatedString(skill, 'Desc'), skill.ParametersJp, skillLevel, student.BulletType))
    } else {
        $('#ba-skill-weaponpassive-description').html(getSkillText(getTranslatedString(skill, 'Desc'), skill.Parameters, skillLevel, student.BulletType))
    }
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function recalculateBondPreview() {
    var level = $("#ba-bond-levelrange").val()
    var bondbonus = getBondStats(student, level)
    $("#ba-student-bond-1-amount").text('+'+bondbonus[student.FavorStatType[0]])
    $("#ba-student-bond-2-amount").text('+'+bondbonus[student.FavorStatType[1]])    
}

function getBondStats(student, level) {
    var stat1 = 0, stat2 = 0
    for (let i = 1; i < Math.min(level, 50); i++) {
        if (i < 20) {
            stat1 += student.FavorStatValue[Math.floor(i / 5)][0]
            stat2 += student.FavorStatValue[Math.floor(i / 5)][1]
        } else if (i < 50) {
            stat1 += student.FavorStatValue[2 + Math.floor(i / 10)][0]
            stat2 += student.FavorStatValue[2 + Math.floor(i / 10)][1]
        }
    }
    return {[student.FavorStatType[0]]: stat1, [student.FavorStatType[1]]: stat2}
}

function getWeaponStats(student, level) {
    let weaponStats = {"MaxHP": 0, "AttackPower": 0, "HealPower": 0}
    let levelscale = ((level-1)/99)
    if (student.Weapon.StatLevelUpType == 'Standard') levelscale = levelscale.toFixed(4)
    weaponStats["AttackPower"] = Math.round(student.Weapon.AttackPower1 + (student.Weapon.AttackPower100-student.Weapon.AttackPower1) * levelscale)
    weaponStats["MaxHP"] = Math.round(student.Weapon.MaxHP1 + (student.Weapon.MaxHP100-student.Weapon.MaxHP1) * levelscale)
    weaponStats["HealPower"] = Math.round(student.Weapon.HealPower1 + (student.Weapon.HealPower100-student.Weapon.HealPower1) * levelscale)
    return weaponStats
}

function changeStatPreviewStars(stars, weaponstars, recalculate = true) {

    let weaponstars_prev = stat_preview_weapon_stars

    stat_preview_stars = stars
    stat_preview_weapon_stars = weaponstars

    for (let i = 1; i <= 5; i++) {
        $("#ba-statpreview-star-" + i).toggleClass("active", i <= stars)
    }

    for (let i = 1; i <= 3; i++) {
        $("#ba-weaponpreview-star-" + i).toggleClass("active", i <= weaponstars)
    }

    if (weaponstars > 0) {
        let level = 20 + (weaponstars*10)
        $('#ba-statpreview-weapon-range').val(level)
        updateWeaponLevelStatPreview(level)
    }
    $('#ba-student-weapon-level').toggle((stat_preview_weapon_stars > 0))

    if ((weaponstars == 3 && weaponstars_prev < 3) || (weaponstars_prev == 3 && weaponstars < 3)) {
        recalculateTerrainAffinity()
    }

    if ((weaponstars >= 2 && weaponstars_prev < 2) || (weaponstars_prev >= 2 && weaponstars < 2)) {
        updatePassiveSkillStatPreview()
    }

    if (recalculate) recalculateStatPreview()
}

function updatePassiveSkillStatPreview() {
    //update passive skill info in preview
    let passivePlus = (stat_preview_weapon_stars >= 2)
    let passiveSkill = find(student.Skills, 'SkillType', (passivePlus ? 'weapon' : '') + 'passive')[0]
    let passiveBonus = getPassiveSkillBonus(passiveSkill, $('#ba-statpreview-passiveskill-range').val())
    $('#ba-statpreview-passiveskill-name').text(getTranslatedString(passiveSkill, 'Name'))
    let desc = ""
    $(Object.entries(passiveBonus)).each(function(i, el){
        let value = el[1]
        if (el[0].includes('_Coefficient')) value /= 10000
        if (value > 0) desc += `${getStatName(el[0])} <b>+${getFormattedStatAmount(value)}</b>, `
    })
    $('#ba-statpreview-passiveskill-desc').html(desc.substring(0, desc.length-2))
    passivePlus ? $('#ba-statpreview-passiveskill-icon-plus').show() : $('#ba-statpreview-passiveskill-icon-plus').hide()
    $('#ba-statpreview-status-passive-level .statpreview-label').text(`Lv.${$('#ba-statpreview-passiveskill-range').val()}`)
}

function updateSummonExSkillStatPreview() {
    if (student.SummonIds.length > 0) {
        $('#ba-statpreview-summon-level').show()
        //update ex skill info in preview
        let exSkill = find(student.Skills, 'SkillType', 'ex')[0]
        let summon = find(data.summons, "Id", student.SummonIds[0])[0]
        
        let level = $('#ba-statpreview-exskill-range').val()

        $('#ba-statpreview-exskill-name').text(getTranslatedString(exSkill, 'Name'))
        $('#ba-statpreview-exskill-desc').html(formatString(getLocalizedString('ui','summon_ex_bonus'), getTranslatedString(summon, "Name"), getStatName(exSkill.SummonStat), parseFloat((exSkill.SummonStatCoefficient[level-1]/100).toPrecision(3)), getTranslatedString(student, "Name"), getLocalizedString('Stat', exSkill.SummonStat)))
        
        //$('#ba-statpreview-status-passive-level .statpreview-label').text(`Lv.${$('#ba-statpreview-passiveskill-range').val()}`)
    } else {
        $('#ba-statpreview-summon-level').hide()
    }

}

function populateItemList() {
    itemsHtml = {"materials":"", "gifts":"", "eleph":"", "furniture":"", "equipment":"", "currency":""}
    $.each(data.items, function(i,el) {
        if (el.IsReleased[regionID]) {
            let itemHtml = getItemCardHTML(el,el.Id,'items')
            switch (el.Category) {
                case "CharacterExpGrowth":
                case "Material":
                    itemsHtml["materials"] += itemHtml
                    break
                case "Favor":
                    itemsHtml["gifts"] += itemHtml
                    break
                case "SecretStone":
                    itemsHtml["eleph"] += itemHtml
                    break
                case "Coin":
                    itemsHtml["currency"] += itemHtml
                    break
            }
        }
    })
    $.each(data.furniture, function(i,el) {
        if (el.IsReleased[regionID])
        itemsHtml['furniture'] += getItemCardHTML(el,el.Id+1000000,'furniture')
    })
    $.each(data.equipment, function(i,el) {
        if (el.IsReleased[regionID])
        itemsHtml['equipment'] += getItemCardHTML(el,el.Id+2000000,'equipment')
    })
    Object.entries(itemsHtml).forEach(el => $(`#ba-item-list-${el[0]}-grid`).html(el[1]))
    $('.ba-select-grid-item').tooltip({html: true, delay: { show: 200, hide: 0 }, container: $('.tab-content') })
}

function populateCraftList() {
    html = []
    html[0] = ""
    html[1] = ""
    html_h1= `<div id="stages-list-events-grid-header-1" class="w-100 ba-grid-header mb-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',"1")}</h3></div>`
    html_h2 = `<div id="stages-list-events-grid-header-2" class="w-100 ba-grid-header my-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',"2")}</h3></div>`
    data.crafting.Nodes.sort((a,b) => a.Quality - b.Quality)
    data.crafting.Nodes.sort((a,b) => b.Icon.localeCompare(a.Icon))
    $.each(data.crafting.Nodes, function(i,el) {
        if (el.IsReleased[regionID] && el.Weight > 0)
        html[el.Tier-1] += getCraftingCardHTML(el)
    })

    $('#ba-craft-list-nodes-grid').html(html_h1 + html[0] + html_h2 + html[1])
}

function getCraftingCardHTML(node) {
    let html = `<div class="ba-craft-node ba-student-info ba-panel ba-node-quality-${node.Quality}" onclick="loadCraft(${node.Id})"><img class="ba-craft-node-img" src="images/ui/${node.Icon}.png"><span style="margin-left:20px">${getTranslatedString(node, "Name")}</span></div>`
    return html
}

function populateStageList() {
    let html, html2
    html = ''
    $.each(data.stages.Campaign, function(i,el) {
        if (el.Area <= data.common.regions[regionID].campaign_max)
        html += getStageCardHTML(el)
    })
    $('#ba-stages-list-missions-grid').html(html)
    html = ''
    html2 = ''
    let typePrev = ''
    $.each(data.stages.WeekDungeon, function(i,el) {
        if (el.Type != typePrev) {
            let header = `<div id="stages-list-grid-header-${el.Type}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType',''+el.Type)}</h3></div>`
            if (el.Id < 31000) {html += header} else {html2 += header}
        }
        if (el.Id < 31000) {
            if (el.Stage <= data.common.regions[regionID].bounty_max) html += getStageCardHTML(el)
        } else {
            if (el.Stage <= data.common.regions[regionID].commission_max) html2 += getStageCardHTML(el)
        }
        if (el.Area <= data.common.regions[regionID].commission_max)
        html += getStageCardHTML(el)
        typePrev = el.Type
    })
    $('#ba-stages-list-bounty-grid').html(html)
    $('#ba-stages-list-commissions-grid').html(html2)
    html = ''
    $.each(data.stages.SchoolDungeon, function(i,el) {
        if (el.Type != typePrev) {
            html += `<div id="stages-list-grid-header-${el.Type}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType',''+el.Type)}</h3></div>`
        }
        if (el.Stage <= data.common.regions[regionID].schooldungeon_max)
        html += getStageCardHTML(el)
        typePrev = el.Type
    })
    $('#ba-stages-list-schooldungeon-grid').html(html)
    html = ''
    let eventPrev = 0
    $.each(data.stages.Event, function(i,el) {
        if (el.EventId <= data.common.regions[regionID].event_max && !(regionID == 1 && el.EventId == 701)) {
            if (el.EventId != eventPrev) {
                html += `<div id="stages-list-events-grid-header-${el.EventId}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('EventName',''+el.EventId)}</h3></div>`
            }
            html += getStageCardHTML(el)
            eventPrev = el.EventId
        }  
    })
    $('#ba-stages-list-events-grid').html(html)
}

function populateRaidList() {
    var html = ''

    var html
    html = ''
    $.each(data.raids.Raid, function(i,el) {
        if (el.IsReleased[regionID])
        html += getRaidCardHTML(el)
    })
    $('#ba-raid-list-raid-grid').html(html)

    html = ''
    $.each(data.raids.TimeAttack, function(i,el) {
        if (el.IsReleased[regionID])
        html += getTimeAttackCardHTML(el)
    })
    $('#ba-raid-list-timeattack-grid').html(html)

}

function getUsedByStudents(item, mode) {
    let html = '', headerText = 'Used by the following students'
    if (mode == 'equipment') {
        $.each(data.students, function(i,el){
            if (!el.IsReleased[regionID]) return
            if (el.Equipment[0] == item.Category || el.Equipment[1] == item.Category || el.Equipment[2] == item.Category)
            html += getStudentIconSmall(el)
        })
    } else if (mode == 'furniture') {
        headerText = getLocalizedString('ui','furniture_interaction_list')
        $.each(data.students, function(i,el){
            if (!el.IsReleased[regionID])
            return
            let uses = false
            for (let i = 0; i < el.FurnitureInteraction.length; i++) {
                if (item.Id == el.FurnitureInteraction[i]) {
                    uses = true
                }
            }
            if (uses)
            html += getStudentIconSmall(el)
        })
    } else if (mode == 'items') {
        if (item.Category == 'Material') {
            headerText = 'Used to improve the following students\' skills'
            $.each(data.students, function(i,el) {
                if (!el.IsReleased[regionID])
                return
                let uses = false
                for (let i = 0; i < el.SkillExMaterial.length; i++) {
                    for (let j = 0; j < el.SkillExMaterial[i].length; j++) {
                        if (item.Id == el.SkillExMaterial[i][j]) {
                            uses = true
                            break
                        }
                    }
                    if (uses)
                    break
                }
                if (!uses)
                for (let i = 0; i < el.SkillMaterial.length; i++) {
                    for (let j = 0; j < el.SkillMaterial[i].length; j++) {
                        if (item.Id == el.SkillMaterial[i][j]) {
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
        } else if (item.Category == 'SecretStone') {
            headerText = 'Used to rank up the following character'
            let chara = find(data.students, 'Id', item.Id)[0]
            html += getStudentIconSmall(chara)
        }
    }
    if (html != '') {
        $('#ba-item-usage').show()
        return `<div class="mb-2"><i>${headerText}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">` + html + '</div>'
    } else {
        return ''
    }
    
}

function getEquipmentRecipe(item) {
    let html = '', headerText = 'Crafted using the following items'
    if ("Recipe" in item) {
        for (let i = 0; i < item.Recipe.length; i++) {
            html += getDropIconHTML(item.Recipe[i][0]+2000000, item.Recipe[i][1])
        }
        html += getDropIconHTML(3000001, item.RecipeCost)
    }

    if (html != '') {
        $('#ba-equipment-recipe').show()
        return `<div class="mb-2"><i>${headerText}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">` + html + '</div>'
    } else {
        return ''
    }
    
}

function getLikedByStudents(item) {
    var htmlLoves = `<div class="mb-2"><i>Loved by the following students</i></div><div class="d-flex align-items-center justify-content-center flex-wrap mb-2">`
    var htmlLikes = `<div class="mb-2"><i>Liked by the following students</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">`
    $.each(data.students, function(i,el){
        if (!el.IsReleased[regionID])
        return
        let allTags = el.FavorItemTags
        allTags.push(el.FavorItemUniqueTags[0])
        let favItems = getFavouriteItems(allTags)
        let likes = false, loves = false
        for (let i = 0; i < favItems[0].length; i++) {
            if (item.Id-5000 == favItems[0][i]) {
                loves = true
                break
            }
        }
        for (let i = 0; i < favItems[1].length; i++) {
            if (item.Id-5000 == favItems[1][i]) {
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
    let html = '', stages = []
    $.each([data.stages.Campaign, data.stages.SchoolDungeon, data.stages.WeekDungeon], function(i, el1) {
        $.each(el1, function(j, el2){
            if (!stageIsReleased(el2)) return
            let drop = false, dropChance = 0
            if ("Default" in el2.Rewards)
            for (let i = 0; i < el2.Rewards.Default.length; i++) {
                if (itemID == el2.Rewards.Default[i][0]) {
                    drop = true
                    dropChance = el2.Rewards.Default[i][1]
                    break
                }
            }
            if (drop) {
                stages.push({'chance': dropChance, 'stage':el2})
            }
        })
    })
    stages = stages.sort((a,b) => b.chance - a.chance)
    $.each(stages, function(i,el){
        html += '<div class="m-1">' + getStageCardHTML(el.stage, el.chance) + '</div>'
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
    switch (type) {
        case 'Normal':
            return getLocalizedString("ui","attack_type_normal_desc")
        case 'Explosion':
            return formatString(getLocalizedString("ui","attack_type_desc"), `<b class='ba-col-explosion'>${getLocalizedString("ArmorType","LightArmor")}</b>`, `<b class='ba-col-mystic'>${getLocalizedString("ArmorType","Unarmed")}</b>`)
        case 'Pierce':
            return formatString(getLocalizedString("ui","attack_type_desc"), `<b class='ba-col-pierce'>${getLocalizedString("ArmorType","HeavyArmor")}</b>`, `<b class='ba-col-explosion'>${getLocalizedString("ArmorType","LightArmor")}</b>`)
        case 'Mystic':
            return formatString(getLocalizedString("ui","attack_type_desc"), `<b class='ba-col-mystic'>${getLocalizedString("ArmorType","Unarmed")}</b>`, `<b class='ba-col-pierce'>${getLocalizedString("ArmorType","HeavyArmor")}</b>`)
        case 'LightArmor':
            return formatString(getLocalizedString("ui","defense_type_desc"), `<b class='ba-col-explosion'>${getLocalizedString("BulletType","Explosion")}</b>`, `<b class='ba-col-pierce'>${getLocalizedString("BulletType","Pierce")}</b>`)
        case 'HeavyArmor':
            return formatString(getLocalizedString("ui","defense_type_desc"), `<b class='ba-col-pierce'>${getLocalizedString("BulletType","Pierce")}</b>`, `<b class='ba-col-mystic'>${getLocalizedString("BulletType","Mystic")}</b>`)
        case 'Unarmed':
            return formatString(getLocalizedString("ui","defense_type_desc"), `<b class='ba-col-mystic'>${getLocalizedString("BulletType","Mystic")}</b>`, `<b class='ba-col-explosion'>${getLocalizedString("BulletType","Explosion")}</b>`)
    }
    return text
}

function getSkillText(text, params, level, type) {
    
    var result = text
    var paramCount = 1
    var regex

    regex = /[0-9.]+[%s秒]/g
    result = result.replace(regex, function(match) {return `<strong>${match}</strong>`})

    while (result.includes("<?"+paramCount+">")) {
        result = result.replace("<?"+paramCount+">", "<span class=\"ba-col-"+type.toLowerCase()+"\">" + params[paramCount-1][level-1] + "</span>")
        paramCount += 1
    }

    regex = /<d:(\w+)>/g
    result = result.replace(regex, function(match, capture) {return `<span class="ba-skill-debuff" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Debuff_${capture}.png`, data.common.buffs['Debuff_'+capture].tooltip_title, 'Debuff', null, data.common.buffs['Debuff_'+capture].tooltip_body, 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Debuff_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${getTranslatedString(data.common.buffs['Debuff_'+capture], 'Name')}</span>`})

    regex = /<b:(\w+)>/g
    result = result.replace(regex, function(match, capture) {return `<span class="ba-skill-buff" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Buff_${capture}.png`, data.common.buffs['Buff_'+capture].tooltip_title, 'Buff', null, data.common.buffs['Buff_'+capture].tooltip_body, 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Buff_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${getTranslatedString(data.common.buffs['Buff_'+capture], 'Name')}</span>`})

    regex = /<c:(\w+)>/g
    result = result.replace(regex, function(match, capture) {return `<span class="ba-skill-cc" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_CC_${capture}.png`, data.common.buffs['CC_'+capture].tooltip_title, 'CC Effect', null, data.common.buffs['CC_'+capture].tooltip_body, 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_CC_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${getTranslatedString(data.common.buffs['CC_'+capture], 'Name')}</span>`})

    regex = /<s:(\w+)>/g
    result = result.replace(regex, function(match, capture) {return `<span class="ba-skill-special" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Special_${capture}.png`, data.common.buffs['Special_'+capture].tooltip_title, 'Status', null, data.common.buffs['Special_'+capture].tooltip_body, 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Special_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${getTranslatedString(data.common.buffs['Special_'+capture], 'Name')}</span>`})

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
        html += `<div class='ba-tooltip-body'>${body.replace( /\"/g, "&quot;")}</div>`
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
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/student/collection/'+el.CollectionTexture+'.webp', 'type': 'Student', 'rarity': '', 'rarity_text': getRarityStars(el.StarGrade), 'onclick': `loadStudent('${el.DevName}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.raids.Raid, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/raid/'+el.Icon+'.png', 'type': 'Total Assault Boss', 'rarity': '', 'rarity_text': '', 'onclick': `loadRaid(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.items, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/items/'+el.Icon+'.png', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': getRarityStars(el.Rarity), 'onclick': `loadItem(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.furniture, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/furniture/'+el.Icon+'.png', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': getRarityStars(el.Rarity), 'onclick': `loadItem(${el.Id+1000000})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.equipment, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/equipment/'+el.Icon+'.png', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': getRarityStars(el.Rarity), 'onclick': `loadItem(${el.Id+2000000})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.Campaign, function(i,el){
        let stagecode = el.Area+'-'+el.Stage+' '+(el.Difficulty == 1 ? 'Hard' : 'Normal')
        if ((el.Area <= data.common.regions[regionID].campaign_max) && searchContains(searchTerm, stagecode)) {
            results.push({'name': stagecode, 'icon': 'images/campaign/'+getStageIcon(el,'Campaign')+'.png', 'type': 'Stage', 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.WeekDungeon, function(i,el){
        let stagecode = getStageTitle(el, 'WeekDungeon')
        if ((stageIsReleased(el)) && searchContains(searchTerm, stagecode)) {
            results.push({'name': stagecode, 'icon': 'images/campaign/'+getStageIcon(el,'WeekDungeon')+'.png', 'type': 'Stage', 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.SchoolDungeon, function(i,el){
        let stagecode = getStageTitle(el, 'SchoolDungeon')
        if ((stageIsReleased(el)) && searchContains(searchTerm, stagecode)) {
            results.push({'name': stagecode, 'icon': 'images/campaign/'+getStageIcon(el,'SchoolDungeon')+'.png', 'type': 'Stage', 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
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

/**
 * Returns the translated string for the current language from localization.json
 * @param {*} group The localization group
 * @param {*} key The localization value to load
 * @returns 
 */
function getLocalizedString(group, key) {
    if (data.localization.strings.hasOwnProperty(group) && data.localization.strings[group].hasOwnProperty(key)) {
        if (data.localization.strings[group][key].hasOwnProperty(userLang)) {
            return data.localization.strings[group][key][userLang]
        } else {
            console.log(`Localization not defined for "${group}, ${key}" for locale "${userLang}"`)
            return data.localization.strings[group][key]['en']
        }
    } else {
        console.log(`Localization not defined for "${group}, ${key}"`)
        return "undefined!!!"
    }
}

/**
 * Returns the translated string for the current language. If it is null or empty for the current language, returns the first nonempty translation in the order Jp, En
 * @param {*} obj The object containing the translated strings
 * @param {*} key The key excluding the language suffix e.g. 'Name' to get either 'NameEn' or 'NameJp' based on the current language
 * @returns 
 */
function getTranslatedString(obj, key) {
    translateCode = translation_code[userLang]
    if (obj[key+translateCode]) return (obj[key+translateCode])
    else if (obj[key+'Jp']) return (obj[key+'Jp'])
    else if (obj[key+'En']) return (obj[key+'En'])
    else {
        console.log(`No translations defined for "${obj}.${key}"`)
        return ''
    }
}

function getFavouriteItems(tags) {
    let good = [], great = []
    for (let i = 0; i < max_gifts; i++) {
        let commonTags = find(data.items, "Id", 5000+i)[0].Tags.filter(x => tags.includes(x))
        if (commonTags.length == 1) {
            good.push(i)
        } else if (commonTags.length > 1) {
            great.push(i)
        }  
    }
    return [great, good]
}

function getCacheVerResourceName(res) {
    return res + '?v=' + cache_ver
}

function getTimeAttackLevelScale(level) {
    if (level <= 1) {
        return 0
    } else if (level == 2) {
        return 0.0101
    } else if (level <= 24) {
        return 0.0707
    } else if (level == 25) {
        return 0.0808
    } else if (level <= 39) {
        return 0.1919
    } else if (level == 40) {
        return 0.2020
    } else if (level <= 64) {
        return 0.4444
    } else if (level == 65) {
        return 0.4545
    } else if (level <= 77) {
        return 0.7172
    } else if (level == 78) {
        return 0.7273
    } else if (level >= 79) {
        return ((level-1)/99).toFixed(4)
    }
}

/**
 * Returns an object of stat bonuses granted by a student's passive or weaponpassive skill
 * @param {*} skill the object containing skill data 
 * @param {*} skillLevel 
 * @returns 
 */
function getPassiveSkillBonus(skill, level) {
    let bonuses = {}   
    skill.Parameters.forEach((el, i) => {
        if (el[level-1].includes("%")) {
            bonuses[skill.Stat[i] + '_Coefficient'] = Math.round(parseFloat(el[level-1].replace("%",""))*100)
        } else {
            bonuses[skill.Stat[i] + '_Base'] = Math.round(el[level-1])
        }
        
    })
    return bonuses
}

/**
 * Returns true if the stage has been released in the current region
 */
function stageIsReleased(stage) {
    if (stage.Id > 8000000) {
        return (stage.EventId <= data.common.regions[regionID].event_max)
    } else if (stage.Id > 1000000) {
        return (stage.Area <= data.common.regions[regionID].campaign_max)
    } else if (stage.Id > 60000) {
        return (stage.Stage <= data.common.regions[regionID].schooldungeon_max)
    } else if (stage.Id > 31000) {
        return (stage.Stage <= data.common.regions[regionID].commission_max)
    } else if (stage.Id > 30000) {
        return (stage.Stage <= data.common.regions[regionID].bounty_max)
    } else return false
}

function updateStatPreviewTitle() {
    //$('#ba-statpreview-status-title-compare').removeClass('d-none d-md-block')
    if (statPreviewSummonStats) {
        let summon  = find(data.summons, 'Id', student.SummonIds[0])[0]
        $('#ba-statpreview-status-title').text(getTranslatedString(summon, "Name"))
        $('#ba-statpreview-status-title-icon').attr('src', `images/skill/${student.Skills[0].Icon}.png`).addClass(`bg-skill-${student.BulletType.toLowerCase()}`)
    } else {
        $('#ba-statpreview-status-title').html(getTranslatedString(student, "PersonalName"))//.removeClass('d-none d-md-block')
        $('#ba-statpreview-status-title-icon').attr('src', `images/student/icon/${student.CollectionTexture}.png`).removeClass("bg-skill-explosion bg-skill-pierce bg-skill-mystic")
    }
    if (compareMode) {
        $('#ba-statpreview-status-title-compare').html(getTranslatedString(studentCompare, "PersonalName"))
        $('#ba-statpreview-status-title, #ba-statpreview-status-title-compare')//.addClass('d-none d-md-block')
        $('#ba-statpreview-status-title-compare-icon').attr('src', `images/student/icon/${studentCompare.CollectionTexture}.png`).removeClass("bg-skill-explosion bg-skill-pierce bg-skill-mystic")
    }
    $('.statpreview-compare').toggle(compareMode)
    if (compareMode) {
        $('#ba-statpreview-status-compare').tooltip('dispose').tooltip({title: getBasicTooltip('Remove Comparison'), placement: 'top', html: true})
    } else {
        $('#ba-statpreview-status-compare').tooltip('dispose').tooltip({title: getBasicTooltip('Compare with Student'), placement: 'top', html: true})

    }
}

function openStudentComparison() {
    if (compareMode) {
        compareMode = false
        recalculateStatPreview()
        updateStatPreviewTitle()
    } else {
        $(`#ba-student-select-${student.Id}>div`).addClass('disabled')
        selectCompareMode = true
        studentSelectorModal.show()
    }

}