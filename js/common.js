const raid_level = [17, 25, 35, 50, 70, 80, 90]
const maxbond = [10, 10, 20, 20, 50]
const gear_minlevelreq = [0, 15, 35]
const raid_reward_coin = [[40,0],[60,0],[80,0],[100,10],[120,20],[140,40],[160,60]]
const languages = ['En', 'Jp', 'Kr', 'Tw', 'Cn', 'Zh', 'Th']
const label_smalltext_threshold = {'En':8, 'Jp':5, 'Kr':5, 'Tw':5, 'Cn': 5, 'Zh': 5, 'Th': 11, 'Vi': 11}
const label_craft_smalltext_threshold = {'En':7, 'Jp':4, 'Kr':4, 'Tw':4, 'Cn': 4, 'Zh': 4, 'Th': 8, 'Vi': 8}
const label_enemy_smalltext_threshold = {'En':10, 'Jp':6, 'Kr':6, 'Tw':6, 'Cn':6, 'Zh':6, 'Th': 12, 'Vi': 12}
const label_raid_smalltext_threshold = {'En':16, 'Jp':10, 'Kr':11, 'Tw':10, 'Cn':10, 'Zh':10, 'Th': 20, 'Vi': 20}
const adaptationAmount = {0: "D", 1: "C", 2: "B", 3: "A", 4: "S", 5: "SS"}
const terrain_dmg_bonus = {D: 0.8, C: 0.9, B: 1, A: 1.1, S: 1.2, SS: 1.3}
const terrain_block_bonus = {D: 0, C: 15, B: 30, A: 45, S: 60, SS: 75}
const skill_ex_upgrade_credits = [80000, 500000, 3000000, 10000000]
const skill_upgrade_credits = [5000, 7500, 60000, 90000, 300000, 450000, 1500000, 2400000, 4000000]
const gear_upgrade_credits = [500000]
const enemy_rank = {'Champion': 1, 'Elite': 2, 'Minion': 3}
const max_gifts = 35
const max_gifts_ssr = 13
const conquest_events = [815, 822, 10815]
const module_list = ['home','students','raids','stages','items','craft']
const strikerBonusBase = {'MaxHP': 0.1, 'AttackPower': 0.1, 'DefensePower': 0.05, 'HealPower': 0.05,}
const strikerBonusExtended = {'MaxHP': 0.05, 'AttackPower': 0.05, 'DefensePower': 0.05, 'HealPower': 0.05,}
const tsaBonusCoefficient = {'MaxHP': 0.35, 'AttackPower': 0.2, 'DefensePower': 0.5, 'HealPower': 0.1,}
const gearId = {'Hat': 1000,'Gloves': 2000,'Shoes': 3000,'Bag': 4000,'Badge': 5000,'Hairpin': 6000,'Charm': 7000,'Watch': 8000,'Necklace': 9000,}
const timeAttackBG = {"Shooting": "TimeAttack_SlotBG_02", "Defense": "TimeAttack_SlotBG_01", "Destruction": "TimeAttack_SlotBG_03", "Escort": "TimeAttack_SlotBG_03"}
const searchDelay = 100
const searchMaxResults = 40
const altSprite = [10017, 10033, 10041, 10042, 10043, 10048, 20009, 20014, 10062, 10071, 10072, 26010]
const raidDifficultyName = ["Normal", "Hard", "VeryHard", "HardCore", "Extreme", "Insane", "Torment"]
const buffIconKeys = {"AttackPower": "ATK","DefensePower": "DEF","CriticalPoint": "CriticalChance","CriticalDamageRate": "CriticalDamage","CriticalDamageResistRate": "CriticalDamageRateResist","DodgePoint": "Dodge","HealEffectivenessRate": "HealEffectiveness","AccuracyPoint": "HIT","MaxHP": "MAXHP","DefensePenetration": "Penetration","StabilityPoint": "Stability","StabilityRate": "Stability","RegenCost": "CostRegen"}
const studentStatList = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range','OppressionPower','OppressionResist','HealEffectivenessRate','RegenCost','DefensePenetration','AmmoCount']
const studentStatListFull = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range','OppressionPower','OppressionResist','HealEffectivenessRate','RegenCost','AttackSpeed','BlockRate','DefensePenetration', 'AmmoCount']
const enemyStatList = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range','DefensePenetration','DamagedRatio','OppressionPower','OppressionResist']
const raidEnemyStatList = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range','DefensePenetration','DamagedRatio','GroggyGauge','GroggyTime']
const enemyCalculationStatList = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range','OppressionPower','OppressionResist','DefensePenetration','DamagedRatio']

const staticAssetURL = "https://static.schale.gg"

let userLang
let regionID

if (localStorage.getItem("language") && languages.includes(localStorage.getItem("language")))  {
    userLang = localStorage.getItem("language")
} else {
    let browserLang = window.navigator.language
    // guess user's language from their browser language
    switch (browserLang.split('-')[0]) {
        case 'ja':
            userLang = 'Jp'
            break;
        case 'ko':
            userLang = 'Kr'
            break;
        case 'th':
            userLang = 'Th'
            break;
        case 'zh':
            if (browserLang.toLowerCase().startsWith('zh-cn')) {
                userLang = 'Cn'
            } else {
                userLang = 'Tw'
            }
            break;
        default:
            userLang = 'En'
            break;
    }
}

if (localStorage.getItem("region")) {
    regionID = parseInt(localStorage.getItem("region"))
} else {
    regionID = 0
}

let data = {}

let json_list = {
    config: getCacheVerResourceName("./data/config.min.json"),
    groups: getCacheVerResourceName("./data/groups.min.json")
}

let json_lang_list = getLanguageJSONList(userLang.toLowerCase())
function getLanguageJSONList(lang) {
    return {
        localization: getCacheVerResourceName(`./data/${lang}/localization.min.json`),
        students: getCacheVerResourceName(`./data/${lang}/students.min.json`),
        enemies: getCacheVerResourceName(`./data/${lang}/enemies.min.json`),
        items: getCacheVerResourceName(`./data/${lang}/items.min.json`),
        furniture: getCacheVerResourceName(`./data/${lang}/furniture.min.json`),
        equipment: getCacheVerResourceName(`./data/${lang}/equipment.min.json`),
        currency: getCacheVerResourceName(`./data/${lang}/currency.min.json`),
        summons: getCacheVerResourceName(`./data/${lang}/summons.min.json`),
        raids: getCacheVerResourceName(`./data/${lang}/raids.min.json`),
        stages: getCacheVerResourceName(`./data/${lang}/stages.min.json`)
    }
}

let json_server_list = getServerJSONList(regionID)
function getServerJSONList(region) {
    let regionName
    switch (region) {
        case 0: regionName = "jp"
            break
        case 1: regionName = "global"
            break
        case 2: regionName = "cn"
            break
    }
    return {
        crafting: getCacheVerResourceName(`./data/crafting_${regionName}.min.json`)
    }
}

const html_list = {
    craft: getCacheVerResourceName("./html/craft.html"),
    home: getCacheVerResourceName("./html/home.html"),
    items: getCacheVerResourceName("./html/items.html"),
    raids: getCacheVerResourceName("./html/raids.html"),
    stages: getCacheVerResourceName("./html/stages.html"),
    students: getCacheVerResourceName("./html/students.html")
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
    DodgePoint: (a,b) => (b.DodgePoint - a.DodgePoint)*search_options["sortby_dir"],
    NormalHits: (a,b) => (getSkillHits(find(b.Skills, "SkillType", "autoattack")[0]) - getSkillHits(find(a.Skills, "SkillType", "autoattack")[0]))*search_options["sortby_dir"],
    EXCost: (a,b) => (find(b.Skills, "SkillType", "ex")[0].Cost[4] - find(a.Skills, "SkillType", "ex")[0].Cost[4])*search_options["sortby_dir"],
    EXHits: (a,b) => (getSkillHits(find(b.Skills, "SkillType", "ex")[0]) - getSkillHits(find(a.Skills, "SkillType", "ex")[0]))*search_options["sortby_dir"],
    PublicHits: (a,b) => (
        getSkillHits(find(b.Skills, "SkillType", "Released" in b.Gear && b.Gear.Released[regionID] ? "gearnormal" : "normal")[0]) - getSkillHits(find(a.Skills, "SkillType", "Released" in a.Gear && a.Gear.Released[regionID] ? "gearnormal" : "normal")[0])
        )*search_options["sortby_dir"],
    StreetBattleAdaptation: (a,b) => (
        (b.StreetBattleAdaptation + (b.Weapon.AdaptationType === "Street" ? b.Weapon.AdaptationValue - 0.1 : 0)) - (a.StreetBattleAdaptation + (a.Weapon.AdaptationType === "Street" ? a.Weapon.AdaptationValue - 0.1: 0))
        )*search_options["sortby_dir"],
    OutdoorBattleAdaptation: (a,b) => (
        (b.OutdoorBattleAdaptation + (b.Weapon.AdaptationType === "Outdoor" ? b.Weapon.AdaptationValue - 0.1 : 0)) - (a.OutdoorBattleAdaptation + (a.Weapon.AdaptationType === "Outdoor" ? a.Weapon.AdaptationValue - 0.1 : 0))
        )*search_options["sortby_dir"],
    IndoorBattleAdaptation: (a,b) => (
        (b.IndoorBattleAdaptation + (b.Weapon.AdaptationType === "Indoor" ? b.Weapon.AdaptationValue - 0.1 : 0)) - (a.IndoorBattleAdaptation + (a.Weapon.AdaptationType === "Indoor" ? a.Weapon.AdaptationValue - 0.1 : 0))
        )*search_options["sortby_dir"],
    CharacterVoice: (a,b) => getTranslatedString(a, 'CharacterVoice').localeCompare(getTranslatedString(b, 'CharacterVoice'))*search_options["sortby_dir"],
    BirthDay: (a,b) => (convertToDate(a.BirthDay) - convertToDate(b.BirthDay))*search_options["sortby_dir"],
    CharacterAge: (a,b) => (MathHelper.extractNumber(b.CharacterAge) - MathHelper.extractNumber(a.CharacterAge))*search_options["sortby_dir"],
    CharHeightMetric: (a,b) => (MathHelper.extractNumber(b.CharHeightMetric) - MathHelper.extractNumber(a.CharHeightMetric))*search_options["sortby_dir"],
    Illustrator: (a,b) => getTranslatedString(a, 'Illustrator').localeCompare(getTranslatedString(b, 'Illustrator'))*search_options["sortby_dir"],
    Designer: (a,b) => getTranslatedString(a, 'Designer').localeCompare(getTranslatedString(b, 'Designer'))*search_options["sortby_dir"],
    Club: (a,b) => getLocalizedString('Club', a.Club).localeCompare(getLocalizedString('Club', b.Club))*search_options["sortby_dir"],
    School: (a,b) => getLocalizedString('School', a.School).localeCompare(getLocalizedString('School', b.School))*search_options["sortby_dir"],
    MemoryLobby: (a,b) => (b.MemoryLobby[regionID] - a.MemoryLobby[regionID])*search_options["sortby_dir"],
    MemoryLobbyBGM: (a,b) => getTranslatedString(a, 'MemoryLobbyBGM').localeCompare(getTranslatedString(b, 'MemoryLobbyBGM'))*search_options["sortby_dir"],
    CollectionStars: (a,b) => ((b.Id in studentCollection ? studentCollection[b.Id].s + studentCollection[b.Id].ws : 0) - (a.Id in studentCollection ? studentCollection[a.Id].s + studentCollection[a.Id].ws : 0))*search_options["sortby_dir"],
    CollectionLevel: (a,b) => ((b.Id in studentCollection ? studentCollection[b.Id].l : 0) - (a.Id in studentCollection ? studentCollection[a.Id].l : 0))*search_options["sortby_dir"],
    CollectionBond: (a,b) => ((b.Id in studentCollection ? studentCollection[b.Id].b : 0) - (a.Id in studentCollection ? studentCollection[a.Id].b : 0))*search_options["sortby_dir"]
}

const itemSortFunctions = {
    Default: (a,b) => (a.Id - b.Id)*itemSearchOptions["sortby_dir"],
    Name: (a,b) => getTranslatedString(a, 'Name').localeCompare(getTranslatedString(b, 'Name'))*itemSearchOptions["sortby_dir"],
}

let loadedModule

let student
let studentList
let studentStatsList = null
let sortByCollectionStats = false
let studentCompare 

let statPreviewStarGrade
let statPreviewWeaponGrade
let statPreviewLevel
let statPreviewWeaponLevel
let statPreviewEquipment
let statPreviewGearLevel
let statPreviewBondLevel = []
let statPreviewPotentialLevel = {}
let statPreviewPassiveLevel
let statPreviewExLevel
let statPreviewIncludePassive
let statPreviewIncludeBond = []
let statPreviewIncludeEquipment
let statPreviewIncludeBuffs
let statPreviewIncludePotential

let statPreviewViewSupportStats = false
let statPreviewSelectedChar = 0
let statPreviewTerrain = 'Street'
let statPreviewEnemyList = []
let statPreviewSelectedEnemyId = 7000001
let statPreviewSelectedEnemyLevel = 1
let statPreviewSelectedEnemyGrade = 1
let statPreviewSelectedEnemyRaid = 0
let statPreviewSelectedEnemyRaidDifficulty = 0
let statPreviewSelectedEnemyRaidFloor = 0
let statPreviewSelectedEnemyLevelFixed = false
let statPreviewSelectedEnemyArmorType = null
let statPreviewEnemyBookmarks = []
let skillPreviewExSkillLevel = 1
let skillPreviewOtherSkillLevel = 1
let skillPreviewShowSummonSkills = {}
let skillInfoCollection = []
let raidSkillInfoCollection = []
let studentCollection = {}
let lockedAttributes = false

// Shared Timeouts
let collectionUpdateTimeout
let toastMessageTimeout
let searchDelayTimeout
let eventRefreshInterval
let recalculationLimitTimeout

let compareMode = false
let selectCompareMode = false
let showAltSprite = false
let showStudentListInfo = false
let showSkillUpgrades = false

let loadedRaid
let loadedItem
let loadedItemType
let loadedStage
let loadedStageVersion
let showEventCurrencyBonus = 1
let loadedConquest
let loadedCraftNode
let loadedCraftId = 0

let itemList
let furnitureList
let equipmentList

let loadedStageList = null
let loadedItemList = null

let loadObserver

let region
let student_bondalts
let darkTheme
let pixelMode
let highContrast
let raid
let selectedEnemy = 0
let raid_difficulty = 0
let ta_difficulty = 0
let multiFloorRaidFloor = 0
let gridItemDisplayStyle = 'detailed'
let showNodeProbability = false
let voiceClipVolume = 0.7
// searchbar properties
let searchResultsCount = 0
let searchResultsSelection = 0

//bs modal references
let studentSelectorModal
let statPreviewModal
let stageMapModal

let scrolling = false
let scrollPosition = {top: 0, left: 0, x: 0, y: 0}

//Todo: save this in a localStorage object so it is remembered across visits
let search_options = {
    "groupby": "none",
    "sortby": "Default",
    "sortby_dir": 1,
    "filter": {
        "SquadType": {
            "Main": false,
            "Support": false
        },
        "Collection": {
            "Owned": false,
            "NotOwned": false,
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
            "Sonic": false
        },
        "ArmorType": {
            "LightArmor": false,
            "HeavyArmor": false,
            "Unarmed": false,
            "ElasticArmor": false
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
            "FT": false
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
            5: false
        },
        "OutdoorBattleAdaptation": {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        },
        "IndoorBattleAdaptation": {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        },
        "Gear1": {
            "Hat": false,
            "Gloves": false,
            "Shoes": false
        },
        "Gear2": {
            "Bag": false,
            "Badge": false,
            "Hairpin": false
        },
        "Gear3": {
            "Charm": false,
            "Necklace": false,
            "Watch": false
        },
        "BondGear": false,
        "Cover":  {
            "Uses": false,
            "DoesntUse": false,
        },
        "HasCC": false,
        "HasDebuff": false,
        "TerrainUpgrades": false
    },
    "filterSelect": {
        "PassiveBuff": [],
        "WeaponPassiveBuff": [],
        "SubBuff": [],
        "UsesArtifact": []
    }
}

let passiveStatList = []
let subStatList = []
let weaponPassiveStatList = []
let studentBuffStatFilters = []
let enemyBuffStatFilters = []

let itemSearchOptions = {
    "sortby": "Default",
    "sortby_dir": 1,
    "filter": {
        "ItemCategory": {
            "Material": false,
            "Coin": false,
            "Favor": false,
            "SecretStone": false,
            "Consumable": false,
            "Collectible": false,
        },
        "FurnitureSubCategory": {
            "Wallpaper": false,
            "Floor": false,
            "Background": false,
            "Table": false,
            "Chair": false,
            "Closet": false,
            "FloorDecoration": false,
            "WallDecoration": false,
            "Prop": false,
            "HomeAppliance": false,
            "Bed": false,
            "FurnitureEtc": false,
        },
        "EquipmentCategory": {
            "Exp": false,
            "WeaponExpGrowth": false,
            "Hat": false,
            "Gloves": false,
            "Shoes": false,
            "Bag": false,
            "Badge": false,
            "Hairpin": false,
            "Charm": false,
            "Necklace": false,
            "Watch": false,
        },
        "Rarity": {
            "N": false,
            "R": false,
            "SR": false,
            "SSR": false,
        },
        "FurnitureSet": {
            "0": false,
            "100": false,
            "101": false,
            "102": false,
            "103": false,
            "104": false,
            "105": false,
            "106": false,
            "107": false,
            "108": false,
            "109": false,
            "110": false,
            "111": false
        },
        "EquipmentTier": {
            "1": false,
            "2": false,
            "3": false,
            "4": false,
            "5": false,
            "6": false,
            "7": false,
        },
        "FurnitureInteraction": false,
        "Craftable": false,
        "StageDrop": false,
        "Shop": false,
        "ShowImmediateUse": false,
        "ShowExpired": false,
    }
}

/** Extensions */
Array.prototype.sum = function() {
    return this.reduce((pv, cv) => pv + cv, 0)
}

String.prototype.escapeHtml = function() {
    return document.createElement('div').appendChild(document.createTextNode(this)).parentNode.innerHTML
}

/** Classes */

/**
 * Represents a set of character stats
 */
 class CharacterStats {
    
    constructor(character, level, stargrade, transcendence=[], statGrowthType='Standard') {
        this.stats = {}

        function getRawStat(stat) {
            if (character[`Stat${region.Name}`] && character[`Stat${region.Name}`][stat] !== undefined) {
                return character[`Stat${region.Name}`][stat]
            } else if (character[stat] !== undefined) {
                return character[stat]
            } else {
                //return default value
                switch (stat) {
                    case 'CriticalResistPoint': return 100
                    case 'CriticalDamageResistRate': return 5000
                    case 'StabilityRate': return 2000
                    case 'DamageRatio': return 10000
                    case 'DamagedRatio': return 10000
                    case 'OppressionPower': return 100
                    case 'OppressionResist': return 100
                    case 'MoveSpeed': return 200
                    case 'StreetBattleAdaptation': return 2
                    case 'OutdoorBattleAdaptation': return 2
                    case 'IndoorBattleAdaptation': return 2
                    default: return 0
                }
            }
        }

        if (transcendence.length == 0) {
            transcendence = [[0, 1000, 1200, 1400, 1700], [0, 500, 700, 900, 1400], [0, 750, 1000, 1200, 1500]]
        }

        let transcendenceAttack = 1
        let transcendenceHP = 1
        let transcendenceHeal = 1

        for (let i = 0; i < stargrade; i++) {
            transcendenceAttack += transcendence[0][i] / 10000
            transcendenceHP += transcendence[1][i] / 10000
            transcendenceHeal += transcendence[2][i] / 10000
        }

        let MaxHP = CharacterStats.interpolateStat(getRawStat('MaxHP1'), getRawStat('MaxHP100'), level, transcendenceHP, statGrowthType)
        let AttackPower = CharacterStats.interpolateStat(getRawStat('AttackPower1'), getRawStat('AttackPower100'), level, transcendenceAttack, statGrowthType)
        let DefensePower = CharacterStats.interpolateStat(getRawStat('DefensePower1'), getRawStat('DefensePower100'), level, 1, statGrowthType)
        let HealPower = CharacterStats.interpolateStat(getRawStat('HealPower1'), getRawStat('HealPower100'), level, transcendenceHeal, statGrowthType) 

        let DefensePenetration = 0
        if (getRawStat('DefensePenetration100') !== undefined) {
            DefensePenetration = CharacterStats.interpolateStat(getRawStat('DefensePenetration1'), getRawStat('DefensePenetration100'), level, 1, statGrowthType)
        }

        this.level = level
        this.terrain = {
            Street: getRawStat('StreetBattleAdaptation'),
            Outdoor: getRawStat('OutdoorBattleAdaptation'),
            Indoor: getRawStat('IndoorBattleAdaptation')
        }

        this.activeBuffs = {}
        this.bulletType = character.BulletType
        this.armorType = character.ArmorType
        this.equipment = character.Equipment ? character.Equipment : []

        this.stats['MaxHP'] = [MaxHP,0,1,0]
        this.stats['AttackPower'] = [AttackPower,0,1,0]
        this.stats['DefensePower'] = [DefensePower,0,1,0]
        this.stats['HealPower'] = [HealPower,0,1,0]
        this.stats['AccuracyPoint'] = [getRawStat('AccuracyPoint'),0,1,0]
        this.stats['DodgePoint'] = [getRawStat('DodgePoint'),0,1,0]
        this.stats['CriticalPoint'] = [getRawStat('CriticalPoint'),0,1,0]
        this.stats['CriticalDamageRate'] = [getRawStat('CriticalDamageRate'),0,1,0]
        this.stats['CriticalChanceResistPoint'] = [getRawStat('CriticalResistPoint'),0,1,0]
        this.stats['CriticalDamageResistRate'] = [getRawStat('CriticalDamageResistRate'),0,1,0]
        this.stats['StabilityPoint'] = [getRawStat('StabilityPoint'),0,1,0]
        this.stats['StabilityRate'] = [getRawStat('StabilityRate'), 0,1,0]
        this.stats['AmmoCount'] = [getRawStat('AmmoCount'),0,1,0]
        this.stats['AmmoCost'] = [getRawStat('AmmoCost'),0,1,0]
        this.stats['Range'] = [getRawStat('Range'),0,1,0]
        this.stats['RegenCost'] = [getRawStat('RegenCost'),0,1,0]
        this.stats['DamageRatio'] = [getRawStat('DamageRatio'),0,1,0]
        this.stats['DamagedRatio'] = [getRawStat('DamagedRatio'),0,1,0]
        this.stats['HealEffectivenessRate'] = [10000,0,1,0]
        this.stats['OppressionPower'] = [getRawStat('OppressionPower'),0,1,0]
        this.stats['OppressionResist'] = [getRawStat('OppressionResist'),0,1,0]
        this.stats['AttackSpeed'] = [10000,0,1,0]
        this.stats['BlockRate'] = [0,0,1,0]
        this.stats['DefensePenetration'] = [DefensePenetration,0,1,0]
        this.stats['MoveSpeed'] = [getRawStat('MoveSpeed'),0,1,0]
        this.stats['EnhanceExplosionRate'] = [10000,0,1,0]
        this.stats['EnhancePierceRate'] = [10000,0,1,0]
        this.stats['EnhanceMysticRate'] = [10000,0,1,0]
        this.stats['EnhanceSonicRate'] = [10000,0,1,0]
        this.stats['ExtendBuffDuration'] = [10000,0,1,0]
        this.stats['ExtendDebuffDuration'] = [10000,0,1,0]
        this.stats['ExtendCCDuration'] = [10000,0,1,0]
    }

    addBuff(stat, amount, separatedFlat = false) {
        let stat_split = stat.split('_')
        if (stat_split.length > 1) {
            if (stat_split[1] == "Base") {

                if (separatedFlat) {
                    this.stats[stat_split[0]][3] += amount
                } else {
                    this.stats[stat_split[0]][1] += amount
                }
                
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
        let applyBuffCap = true
        let allowNegative = false

        if (stat == "DamagedRatio") {
            applyBuffCap = false
            allowNegative = true
        }

        const statBase = this.stats[stat][0]
        const flatBonus = this.stats[stat][1]
        const coefficientBonus =  applyBuffCap ? Math.max(this.stats[stat][2], 0.2) : this.stats[stat][2]
        const nonMultiFlatBonus = this.stats[stat][3]

        const statTotal = Math.round(((statBase + flatBonus) * coefficientBonus).toFixed(4)) + nonMultiFlatBonus

        return allowNegative ? statTotal : Math.max(statTotal, 0)
    }

    /**
     * Calculates and returns the final total of a stat as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getTotalString(stat, formatStatCap = false) {
        let total = this.getTotal(stat)
        let result = ''
        if (stat == 'DamagedRatio') {
            result = ((total-10000)/100).toFixed(0).toLocaleString() + "%"
        } else if (CharacterStats.isRateStat(stat)) {
            result = (total/100).toFixed(0).toLocaleString() + "%"
        } else {
            result = total.toLocaleString()
        }
        if (stat != "DamagedRatio" && formatStatCap && this.stats[stat][2] <= 0.2) result = `<span class="stat-cap">${result}</span>`
        return result
    }

    /**
     * Returns the base stat as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getBaseString(stat) {
        let total = this.stats[stat][0]
        if (stat == 'DamagedRatio') {
            return Math.floor((total-10000)/100).toLocaleString() + "%"
        } else if (CharacterStats.isRateStat(stat)) {
            return (total/100).toFixed(0).toLocaleString() + "%"
        } else {
            return total.toLocaleString()
        }
    }

    setBase(stat, value) {
        this.stats[stat][0] = value
    }

    /**
     * Returns the flat buff as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getFlatString(stat) {
        const total = this.stats[stat][1] + this.stats[stat][3]
        const sign = total >= 0 ? '+' : ''
        return sign + total.toLocaleString()
    }

    /**
     * Returns the coefficient percent buff as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getCoefficientString(stat) {
        let val = (Math.max(this.stats[stat][2], 0.2) - 1) * 100
        const sign = (val >= 0) ? '+' : ''
        //hide decimal when > 100%
        val = (Math.abs(val) < 100) ? val.toFixed(1) : val.toFixed(0)
        return sign + parseFloat(val).toLocaleString() + "%"
    }

    getStrikerBonus(stat, unitSize = 2) {
        if (unitSize > 2) {
            return Math.floor(this.getTotal(stat)*strikerBonusExtended[stat])
        } else {
            return Math.floor(this.getTotal(stat)*strikerBonusBase[stat])
        }
        
    }

    getTSABonus(stat) {
        return Math.floor(this.getTotal(stat)*tsaBonusCoefficient[stat])
    }

    getStabilityMinDamageMod() {
        let stability =  this.getTotal('StabilityPoint')
        return MathHelper.clamp((stability / (stability + 1000)) + (this.getTotal('StabilityRate') / 10000), 0, 1)
    }

    getStabilityMinDamage() {
        return MathHelper.toFixedFloat(this.getStabilityMinDamageMod()*100, 2) + "%"
    }

    getDefenseDamageReductionMod(penetrationBase = 0, penetrationRate = 10000) {
        let defense =  Math.max((this.getTotal('DefensePower') - penetrationBase) * (penetrationRate / 10000), 0)
        return (10000000 / (defense * 6000 + 10000000))
    }

    getDefenseDamageReduction() {
        return parseFloat(((1 - this.getDefenseDamageReductionMod())*100).toFixed(2)) + "%"
    }

    getCriticalRate(critRes) {
        const crit = this.getTotal('CriticalPoint')
        return MathHelper.clamp(1 - (4000000 / (Math.max(crit - critRes, 0) * 6000 + 4000000)), 0, 1)
    }

    getCriticalHitChanceString(critRes) {
        return `${MathHelper.toFixedFloat(this.getCriticalRate(critRes)*100, 2)}%`
    }

    getHitChance(evade) {
        const hit = this.getTotal('AccuracyPoint')
        return MathHelper.clamp(2000 / (Math.max(evade - hit, 0) * 3 + 2000), 0, 1)
    }

    getHitChanceString(evade) {
        const hit = this.getTotal('AccuracyPoint')
        return `${MathHelper.toFixedFloat(this.getHitChance(evade)*100, 2)}%`
    }

    addActiveBuffIcon(stat, value, stacks = 1) {
        if (value == 0) return
        stat = stat.replace('_Coefficient','').replace('_Base','')
        let buffIconKey
        if (stat.startsWith('Special_')) {
            buffIconKey = stat
        } else {
            buffIconKey = `${(value > 0) ? 'Buff' : 'Debuff'}_${(stat in buffIconKeys) ? buffIconKeys[stat] : stat}`
        }
        if (buffIconKey in this.activeBuffs) {
            this.activeBuffs[buffIconKey] += stacks
        } else {
            this.activeBuffs[buffIconKey] = stacks
        }
    }

    renderActiveBuffs(container, max) {
        let buffIcons = '', buffCount = 0, buffExtraCount = 0
        for (const buffIcon in this.activeBuffs) {
            let stackCount = this.activeBuffs[buffIcon]
            if (buffIcon.includes("Special_DebuffCount")) {
                stackCount = 1
            }
            buffCount++
            if (buffCount <= max) {
                buffIcons += `<div class="active-buff"><img src="images/buff/${buffIcon}.webp" width="22" height="26" class="">${stackCount > 1 ? `<span class="stack-count">${stackCount}</span>` : ''}</div>`
            } else {
                buffExtraCount++
            }
        }
        if (buffExtraCount) buffIcons += `<div class="px-1"><b>+${buffExtraCount}</b></div>`
        $(container).toggle(buffCount > 0).html(buffIcons)
    }

    static isRateStat(stat) {
        return stat.slice(-4) == "Rate" || stat.startsWith("AttackSpeed") || stat.startsWith("DamagedRatio")
    }

    static getTimeAttackLevelScale(level) {
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

    static interpolateStat(stat1, stat100, level, transcendence=1, statGrowthType='Standard') {
        let levelScale
        switch (statGrowthType) {
            case 'TimeAttack':
                levelScale = CharacterStats.getTimeAttackLevelScale(level)
                break
            case 'LateBloom':
            case 'Premature':
                levelScale = (level-1)/99
                break
            case 'Standard':
            default:
                levelScale = ((level-1)/99).toFixed(4)
                break
        }
        return Math.ceil((Math.round((stat1+(stat100-stat1)*levelScale).toFixed(4))*transcendence).toFixed(4))
    }

    static getPotentialStatAmount(character, stat, level, potentialLevel) {
        return Math.round(CharacterStats.interpolateStat(character[`${stat}1`], character[`${stat}100`], level) * (potentialLevel * 0.002))
    }

    /**
     * Calculates the maximum damage dealt to a target by this character
     * @param {CharacterStats} target 
     */
    calculateDamage(target, damageRate, sourceStat, terrain, isCrit, ignoreDef = 10000) {
        const totalAttack = this.getTotal(sourceStat)
        const damageRatio = this.getTotal('DamageRatio') / 10000
        const damagedRatio = (20000 - target.getTotal('DamagedRatio')) / 10000
        const levelMod = Math.max(Math.min(1 - (target.level - this.level) * 0.02, 1), 0.4)
        const defMod = target.getDefenseDamageReductionMod(this.getTotal('DefensePenetration'), ignoreDef)
        const terrainMod = 0.8 + this.terrain[terrain] * 0.1
        const effectiveMod = this.getEffectiveMod(target.armorType)
        const critMod = (this.getTotal('CriticalDamageRate') - target.getTotal('CriticalDamageResistRate')) / 10000
        return totalAttack * terrainMod * effectiveMod * (damageRate/10000) * defMod * damageRatio * damagedRatio * levelMod * (1 + (isCrit * (critMod - 1)))
    }

    calculateAccumulateDamageLimit(target, damageRate, sourceStat, terrain) {
        const totalAttack = this.getTotal(sourceStat)
        const levelMod = Math.max(Math.min(1 - (target.level - this.level) * 0.02, 1), 0.4)
        const terrainMod = 0.8 + this.terrain[terrain] * 0.1
        const effectiveMod = this.getEffectiveMod(target.armorType)
        return totalAttack * terrainMod * effectiveMod * (damageRate/10000) * levelMod
    }

    /**
     * Returns a string representing the minimum to maximum damage based on stability
     * @param {CharacterStats} target 
     */
    calculateDamageRange(target, damageRate, sourceStat, terrain, isCrit) {
        const maxDmg = this.calculateDamage(target, damageRate, sourceStat, terrain, isCrit)
        const minDmg = maxDmg * this.getStabilityMinDamageMod()
        return `${parseInt(minDmg).toLocaleString()} ~ ${parseInt(maxDmg).toLocaleString()}`
    }

    /**
     * Calculates the expected damage dealt by an attack
     * @param {*} target 
     * @param {*} damageRate 
     * @param {*} terrain 
     */
    calculateExpectedDamage(target, damageRate, sourceStat, terrain) {
        const critChance = this.getCriticalRate(target.getTotal("CriticalChanceResistPoint"))
        const critBonusMod = ((this.getTotal('CriticalDamageRate') - target.getTotal('CriticalDamageResistRate')) / 10000) - 1
        const baseDmgMax = this.calculateDamage(target, damageRate, sourceStat, terrain, 0)
        const critBonusDmgMax = baseDmgMax * critBonusMod
        const expDmgMax = baseDmgMax + (critBonusDmgMax * critChance)
        const expDmgMin = expDmgMax * this.getStabilityMinDamageMod()
        return parseInt((expDmgMin + expDmgMax) / 2).toLocaleString()
    }

    /**
     * Calculates the maximum damage dealt to a target by this character
     * @param {CharacterStats} target 
     */
    calculateHealing(healRate, recoveryRate = 10000) {
        const totalHeal = this.getTotal('HealPower')
        return parseInt(totalHeal * healRate * (recoveryRate/10000))
    }

    getEffectiveMod(armorType) {
        let effMod = data.config.TypeEffectiveness[this.bulletType][armorType]
        if (armorType == "Structure") return 1
        switch (this.bulletType) {
            case 'Explosion':
                if (armorType == 'LightArmor') {
                    effMod += (this.getTotal('EnhanceExplosionRate') - 10000)
                }
                break
            case 'Pierce':
                if (armorType == 'HeavyArmor') {
                    effMod += (this.getTotal('EnhancePierceRate') - 10000)
                }
                break
            case 'Mystic':
                if (armorType == 'Unarmed') {
                    effMod += (this.getTotal('EnhanceMysticRate') - 10000)
                }
                break
            case 'Sonic':
                if (armorType == 'ElasticArmor') {
                    effMod += (this.getTotal('EnhanceSonicRate') - 10000)
                }
                break
        }
        return effMod / 10000
    }

    addEquipmentBonuses(type, tier) {
        const equipment = find(data.equipment, "Id", gearId[type] + tier-1)[0]
        equipment.StatType.forEach((stat, index) => {
            this.addBuff(stat, equipment.StatValue[index][1])
        })
    }

    addGearBonuses(gear) {
        for (let i = 0; i < gear.StatType.length; i++) {
            this.addBuff(gear.StatType[i], gear.StatValue[i][1])
        }
    }

    addWeaponBonuses(weapon, level) {
        let levelscale = ((level-1)/99)
        if (weapon.StatLevelUpType == 'Standard') levelscale = levelscale.toFixed(4)
        this.addBuff("AttackPower_Base", Math.round(weapon.AttackPower1 + (weapon.AttackPower100-weapon.AttackPower1) * levelscale))
        this.addBuff("MaxHP_Base", Math.round(weapon.MaxHP1 + (weapon.MaxHP100-weapon.MaxHP1) * levelscale))
        this.addBuff("HealPower_Base", Math.round(weapon.HealPower1 + (weapon.HealPower100-weapon.HealPower1) * levelscale))
    }

}

let statPreviewCharacterStats = CharacterStats
let statPreviewSelectedEnemyStats = CharacterStats

class MathHelper {

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max)
    }

    static toFixedFloat(value, maxPrecision) {
        return parseFloat((value).toFixed(maxPrecision))
    }

    static extractNumber(string) {
        let result = parseInt(string.replace(/[^0-9]/g))
        return isNaN(result) ? 0 : result
    }

    static formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60)
        return `${minutes}:${`${seconds % 60}`.padStart(2, '0')}`
    }
}

class Buffs {

    buffs = []

    addBuff(buff) {
        this.buffs.push(buff)
    }

    removeBuff(index) {
        this.buffs.splice(index, 1)
    }

    static statValueToString(stat, val) {
        if (stat.endsWith('_Coefficient')) {
            return `${parseFloat((val/100).toFixed(1))}%`
        } else {
            return val.toLocaleString()
        }
    }
}

class ExternalBuffs extends Buffs {

    elements = {
        controls: null,
        searchBox: null,
        searchButton: null,
        autoAddButton: null,
        searchResults: null,
    }
    searchBoxTimeout = null
    searchResultsSelection = 0
    searchResultsCount = 0
    filterFunc
    recalculationFunc
    effectTypeFilter
    effectStatFilter = 'all'

    /**
     * 
     * @param {*} elements 
     * @param {function} filterFunc
     * @param {function} recalculationFunc
     * @param {*} effectTypeFilter
     */
    constructor(elements, filterFunc, recalculationFunc, effectTypeFilter) {
        super()
        this.elements = elements
        this.effectTypeFilter = effectTypeFilter

        this.filterFunc = filterFunc
        this.recalculationFunc = recalculationFunc

        //Bind control update events
        $(this.elements.controls).on('input', 'input[type="range"]', (e) => {this.updateBuffLevel(e.currentTarget.dataset.index, e.currentTarget.value)})
        $(this.elements.controls).on('click', '.stack-toggle', (e) => {this.updateStackCount(e.currentTarget.dataset.index)})
        $(this.elements.controls).on('click', 'button.buff-remove', (e) => {this.removeBuff(e.currentTarget.dataset.index)})

        this.searchResultPopper = new ResultsPopper($(this.elements.searchBox).parent()[0], this.elements.searchResults)

        $(this.elements.searchResults).find('.search-list-results').on('click', 'div[data-student-id]', (e) => {
            const student = find(data.students, "Id", e.currentTarget.dataset["studentId"])[0]
            const skill = find(student.Skills, "SkillType", e.currentTarget.dataset["skillType"])[0]
            this.addBuff(student.Id, skill)
            $(e.currentTarget).toggleClass('disabled', true)
            this.searchResultPopper.hide()
            $(this.elements.searchBox).val('')
        })

        $(this.elements.searchResults).find('.search-list-results').on('click', 'div[data-raid-id]', (e) => {
            const raid = find(data.raids.Raid, "Id", e.currentTarget.dataset["raidId"])[0]
            const skill = find(raid.RaidSkill, "Id", e.currentTarget.dataset["skillId"])[0]
            this.addBuffRaid(raid.Id, skill)
            $(e.currentTarget).toggleClass('disabled', true)
            this.searchResultPopper.hide()
            $(this.elements.searchBox).val('')
        })

        $(this.elements.searchButton).on('click', (e) => {
            if ($(this.elements.searchResults).is(':visible')) {
                this.searchResultPopper.hide()
            } else {
                if (this.searchBoxTimeout) {
                    clearTimeout(this.searchBoxTimeout)
                }
                this.searchResultPopper.show()
                this.searchBuffs()
            }

        })

        $(this.elements.autoAddButton).on('click', (e) => {
            if ($(this.elements.searchResults).is(':visible')) {
                this.searchResultPopper.hide()
            }
            const currentStudentId = student.Id
            //automatically add all own buffs as well as the set supports' skills if student is a striker
            let studentsToAdd = [currentStudentId]
            
            if (student.SquadType == "Main") {
                statPreviewSupportStats.supportStudents.forEach(s => {
                    studentsToAdd.push(s.student.Id)
                })
            }

            studentsToAdd.forEach(studentId => {
                const student = find(data.students, "Id", studentId)[0]
                student.Skills.forEach(skill => {
                    if (!skill.SkillType.endsWith('passive') && !skill.SkillType.endsWith('autoattack') && 'Effects' in skill && this.filterFunc(student.Id, skill)) {
                        let available = true

                        //buff already added
                        find(this.buffs, "StudentId", student.Id).forEach((buff) => {
                            if (buff.Skill.SkillType == skill.SkillType) available = false
                        })

                        if (student.Gear.Released != undefined && student.Gear.Released[regionID]) {
                            if (student.Id == currentStudentId && skill.SkillType == 'gearnormal' && statPreviewGearLevel < 2) available = false
                            if (student.Id == currentStudentId && skill.SkillType == 'normal' && statPreviewGearLevel >= 2) available = false
                        } else {
                            if (skill.SkillType == 'gearnormal') available = false
                        }

                        if (available) this.addBuff(student.Id, skill)                           
                    }
                })
            })
            data.raids.Raid.forEach(raid => {
                if (raid.IsReleased[regionID]) {
                    raid.RaidSkill.filter(s => s.Effects !== undefined).forEach(skill => {
                        if (skill.MinDifficulty > raid.MaxDifficulty[regionID]) return
                        if (!this.filterFunc(0, skill)) return
                        let available = true

                        //buff already added
                        find(this.buffs, "StudentId", `raid${raid.Id}`).forEach((buff) => {
                            if (buff.Skill.Id == skill.Id) available = false
                        })
                        if (!available) return

                        let shouldAdd = false
                        skill.Effects.forEach(effect => {
                            if (effect.Type == 'BuffTarget' && effect.RestrictTo !== undefined && effect.RestrictTo.includes(statPreviewSelectedEnemyId)) {
                                shouldAdd = true
                            }
                        })
                        if (shouldAdd) this.addBuffRaid(raid.Id, skill)                   
                    })
                }
            })
        })

        $(this.elements.searchBox).on('input', (e) => {

            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            this.searchBoxTimeout = setTimeout(() => {
                if (e.currentTarget.value != "") {
                    this.searchResultPopper.show()
                    this.searchBuffs()
                } else {
                    this.searchResultPopper.hide()
                }
            }, searchDelay)
        }).on('blur', (e) => {
            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            if (e.currentTarget.value == "") this.searchResultPopper.hide()
        }).on('keyup keydown', (e) => {
            switch (e.code) {
                case 'Enter':
                    e.preventDefault()
                    if ($(this.elements.searchResults).is(':visible') && e.type == "keyup") {
                        if (this.searchResultsSelection == 0 && this.searchResultsCount > 0) {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="1"]`).trigger("click")
                        } else {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`).trigger("click")
                        }
                    }
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection < this.searchResultsCount) {
                        this.searchResultsSelection++
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection > 1)  {
                        this.searchResultsSelection--
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'Escape':
                    e.preventDefault()
                    $(this.elements.searchBox).val('').trigger('blur')
                    break
            }
        })

        //bind filter
        $(this.elements.searchResults).find('.search-list-filter').on('click', 'a[data-filter-select-value]', (e) => {
            const el = $(e.currentTarget)
            this.effectStatFilter = el.data('filter-select-value')
            $(this.elements.searchResults).find('a[data-filter-select-value]').removeClass('active')
            el.addClass('active')
            $(this.elements.searchResults).find('.search-list-filter-active').text(el.text())
            this.searchBuffs()
        })
        $(this.elements.searchResults).find('.search-list-filter-active').text(translateUI('filter_all'))
    }

    addBuff(studentId, skill) {
        const maxLevel = skill.SkillType == 'ex' ? 5 : 10
        let maxStacks = 1

        skill.Effects.filter(e => this.effectTypeFilter.includes(e.Type)).forEach(effect => {
            maxStacks = Math.max(maxStacks, effect.StackSame !== undefined ? effect.StackSame : effect.Value.length)
        })

        super.addBuff({"StudentId": studentId, "Skill": skill, "MaxLevel": maxLevel, "Level": maxLevel, "Stacks": 1, "MaxStacks": maxStacks})
        this.renderControls()
        this.recalculationFunc()
    }

    static getEffectValue(buff, effect) {
        let value
        if ('StackSame' in effect) {
            value = effect.Value[0][buff.Level-1] * buff.Stacks
        } else {
            value = effect.Value[Math.min(buff.Stacks-1, effect.Value.length-1)][buff.Level-1]
        }
        return value
    }

    addBuffRaid(raidId, skill) {
        const maxLevel = 1
        let maxStacks = 1

        skill.Effects.filter(e => this.effectTypeFilter.includes(e.Type)).forEach(effect => {
            maxStacks = Math.max(maxStacks, effect.StackSame !== undefined ? effect.StackSame : effect.Value.length)
        })

        super.addBuff({"StudentId": `raid${raidId}`, "RaidId": raidId, "Skill": skill, "MaxLevel": maxLevel, "Level": maxLevel, "Stacks": 1, "MaxStacks": maxStacks})
        this.renderControls()
        this.recalculationFunc()
    }

    removeBuff(index, rerender = true) {
        super.removeBuff(index)
        if (rerender) {
            this.renderControls()
            this.recalculationFunc()
        } 
    }

    changeStudent(studentId) {
        //removes invalid buffs
        for (let i = 0; i < this.buffs.length; i++) {
            const buff = this.buffs[i]
            if (!this.filterFunc(buff.StudentId, buff.Skill)) {
                this.removeBuff(i--, false)
            }
        }
        this.renderControls()
        $(this.elements.searchBox).val('').trigger('blur')
    }

    toggleUpgrades(useUpgrades) {
        //switch between normal and normal+
        if (student.Gear.Released != undefined && student.Gear.Released[regionID]) {
            for (let i = 0; i < this.buffs.length; i++) {
                const buff = this.buffs[i]
                if (buff.StudentId == student.Id && buff.Skill.SkillType.endsWith("normal")) {
                    const skillType = useUpgrades ? "gearnormal" : "normal"
                    const skillToReplace = student.Skills.find(s => s.SkillType == skillType)
                    buff.Skill = skillToReplace
                }
            }
            this.renderControls()
        }
    }

    updateBuffLevel(index, level) {
        const buff = this.buffs[index]
        buff.Level = level
        $(this.elements.controls).find(`div[data-index='${index}'] .ba-slider-label.skill-level`).html(level == buff.MaxLevel ? '<img src="images/ui/ImageFont_Max.png">' : `Lv.${level}`)
        $(this.elements.controls).find(`div[data-index='${index}'] .buff-description`).html(this.getBuffAmountText(buff))
        this.recalculationFunc()
    }

    updateStackCount(index) {
        const buff = this.buffs[index]
        if (++buff.Stacks > buff.MaxStacks) {
            buff.Stacks = 1
        } 
        
        $(this.elements.controls).find(`div[data-index='${index}'] .ba-slider-label.stack-toggle .label`).html(this.getBuffStackLabel(buff))
        $(this.elements.controls).find(`div[data-index='${index}'] .buff-description`).html(this.getBuffAmountText(buff))
        this.recalculationFunc()
    }

    getBuffStackLabel(buff) {
        if (buff.Skill.EffectStackLabel) {
            let imageHtml = ''
            let labelText = ''

            if (buff.Skill.EffectStackLabel.Label !== undefined) {
                labelText = buff.Skill.EffectStackLabel.Label[Math.min(buff.Skill.EffectStackLabel.Label.length-1, buff.Stacks-1)]
            }

            if (buff.Skill.EffectStackLabel.Icon !== undefined) {
                const imgPath = buff.Skill.EffectStackLabel.Icon[Math.min(buff.Skill.EffectStackLabel.Icon.length-1, buff.Stacks-1)]
                imageHtml = `<img class="stack-icon ${imgPath.startsWith('skill') ? "invert-light" : ""}" src="images/${imgPath}">`
            }

            if (labelText != '') {
                labelText = `<span class="label ${imageHtml == '' ? '' : 'ps-1'}">${labelText}</span>`
            }

            return imageHtml + labelText
        } else {
            return `&times;${buff.Stacks}`
        }
    }

    renderControls() {
        let html = ''
        this.buffs.forEach((buff, i) => {
            if (buff.RaidId) {
                const raid = find(data.raids.Raid, "Id", buff.RaidId)[0]
                let iconPath, iconClass
                if (buff.Skill.Icon.startsWith('COMMON_')) {
                    iconPath = `images/skill/${buff.Skill.Icon}.webp`
                    iconClass = `skill-icon bg-atk-${raid.BulletType.toLowerCase()}`
                } else {
                    iconPath = `images/raid/skill/${buff.Skill.Icon}.png`
                    iconClass = 'raid-skill-icon'
                } 
                html += `<div data-index="${i}" class="ba-panel p-2"><div class="mb-1 d-flex flex-row align-items-center gap-2"><div class="transferable-skill-icon align-self-start"><img class="student-icon" src="images/raid/icon/Icon_${buff.Skill.MinDifficulty >= 5 ? raid.PathName + "_Insane" : raid.PathName}.png"><img class="${iconClass}" src="${iconPath}"></div><div class="flex-fill"><h5>${getTranslatedString(buff.Skill, 'Name')} <small>(${translateUI(`student_skill_${buff.Skill.SkillType.toLowerCase()}`)})</small></h5><p class="mb-0 buff-description" style="font-size: 0.875rem; line-height: 1rem;">${this.getBuffAmountText(buff)}</p></div><button class="btn btn-sm btn-dark stat-panel-btn-sm buff-remove no-wrap align-self-start" type="button" data-index="${i}"><i class="fa-solid fa-xmark"></i></button></div><div class="d-flex flex-row align-items-center gap-2">${buff.MaxStacks > 1 ? `<span class="ba-slider-label stack-toggle" data-index="${i}"><span class="label">${this.getBuffStackLabel(buff)}</span></span>` : ''}</div></div>`
            } else {
                const student = find(data.students, "Id", buff.StudentId)[0]
                html += `<div data-index="${i}" class="ba-panel p-2"><div class="mb-1 d-flex flex-row align-items-center gap-2"><div class="transferable-skill-icon align-self-start"><img class="student-icon" src="images/student/icon/${student.Id}.webp"><img class="skill-icon bg-atk-${student.BulletType.toLowerCase()}" src="images/skill/${buff.Skill.Icon}.webp"></div><div class="flex-fill"><h5>${getTranslatedString(buff.Skill, 'Name')} <small>(${translateUI(`student_skill_${buff.Skill.SkillType}`)})</small></h5><p class="mb-0 buff-description" style="font-size: 0.875rem; line-height: 1rem;">${this.getBuffAmountText(buff)}</p></div><button class="btn btn-sm btn-dark stat-panel-btn-sm buff-remove no-wrap align-self-start" type="button" data-index="${i}"><i class="fa-solid fa-xmark"></i></button></div><div class="d-flex flex-row align-items-center gap-2">${buff.MaxStacks > 1 ? `<span class="ba-slider-label stack-toggle" data-index="${i}"><img class="stack-icon invert-light" src="images/skill/${buff.Skill.Icon}.webp"><span class="label">&times;${buff.Stacks}</span></span>` : ''}<input type="range" data-index="${i}" class="form-range flex-fill" value="${buff.Level}" min="1" max="${buff.MaxLevel}"><span class="ba-slider-label skill-level">${buff.Level == buff.MaxLevel ? '<img src="images/ui/ImageFont_Max.png">' : `Lv.${buff.Level}`}</span></div></div>`
            }

        })
        $('#ba-statpreview-status-buffs').toggleClass('disabled', this.buffs.length == 0)
        $('#ba-statpreview-status-buffs-count').text(`(${this.buffs.length})`)
        $(this.elements.controls).html(html)
    }

    searchBuffs() {
        let html = "", listTop = "", resultCount = 0
        const currentStudentId = student.Id
        const searchTerm = this.elements.searchBox.value.toLowerCase()
        data.students.forEach(student => {
            if (student.IsReleased[regionID]) {
                student.Skills.forEach(skill => {
                    if (!skill.SkillType.endsWith('passive') && !skill.SkillType.endsWith('autoattack') && 'Effects' in skill) {
                        if (searchContains(searchTerm, getTranslatedString(student, "Name")) || searchContains(searchTerm, getTranslatedString(skill, "Name"))) {
                            
                            let available = this.filterFunc(student.Id, skill)

                            //exclude already added buffs
                            find(this.buffs, "StudentId", student.Id).forEach((buff) => {
                                if (buff.Skill.SkillType == skill.SkillType) available = false
                            })
                            if (student.Gear.Released != undefined && student.Gear.Released[regionID]) {
                                if (student.Id == currentStudentId && skill.SkillType == 'gearnormal' && statPreviewGearLevel < 2) available = false
                                if (student.Id == currentStudentId && skill.SkillType == 'normal' && statPreviewGearLevel >= 2) available = false
                            } else {
                                if (skill.SkillType == 'gearnormal') available = false
                            }
                            if (this.effectStatFilter != 'all' && skill.Effects.findIndex(e => this.effectTypeFilter.includes(e.Type) && e.Stat.startsWith(this.effectStatFilter)) == -1) available = false
                            
                            if (available) {
    
                                let desc = ""
                                const maxLevel = skill.SkillType == "ex" ? 4 : 9
    
                                skill.Effects.filter(e => this.effectTypeFilter.includes(e.Type)).forEach(effect => {
                                    if (desc != "") {
                                        desc += ", "
                                    }
                                    desc += `${getStatName(effect.Stat)} <b>${effect.Value[0][0] < 0 ? '' : '+'}${ExternalBuffs.statValueToString(effect.Stat, effect.Value[0][0])}`
                                    let maxValue
                                    if ('StackSame' in effect) {
                                        maxValue = effect.Value[0][maxLevel] * effect.StackSame
                                    } else {
                                        maxValue = effect.Value[effect.Value.length-1][maxLevel]
                                    }
                                    if (effect.Value[0][0] != maxValue) {
                                        desc += `~${ExternalBuffs.statValueToString(effect.Stat, maxValue)}`
                                    }
                                    desc += '</b>'
                                })
                                let listItemHtml = ExternalBuffs.getSearchResultListItemHtml(student, skill, desc, ++resultCount)
                                if (student.Id == currentStudentId) listTop += listItemHtml
                                else html += listItemHtml
                            }
                        }
                    }
                })
            }
        })
        data.raids.Raid.forEach(raid => {
            if (raid.IsReleased[regionID]) {
                raid.RaidSkill.filter(skill => !skill.SkillType.endsWith('autoattack')).forEach(skill => {
                    if (skill.MinDifficulty > raid.MaxDifficulty[regionID]) return
                    if (skill.Effects !== undefined && (searchContains(searchTerm, getTranslatedString(raid, "Name")) || searchContains(searchTerm, getTranslatedString(skill, "Name")))) {
                        let available = this.filterFunc(student.Id, skill)
                        let boostResult = false

                        //exclude already added buffs
                        find(this.buffs, "StudentId", `raid${raid.Id}`).forEach((buff) => {
                            if (buff.Skill.Id == skill.Id) available = false
                        })
                        if (this.effectStatFilter != 'all' && skill.Effects.findIndex(e => this.effectTypeFilter.includes(e.Type) && e.Stat.startsWith(this.effectStatFilter)) == -1) available = false

                        //check that raid debuff has an effect that can be applied to the current enemy
                        if (available) {
                            let hasAvailableEffect = false
                            skill.Effects.filter(e => this.effectTypeFilter.includes(e.Type)).forEach(effect => {
                                if (effect.Type == 'BuffTarget') {
                                    if (effect.RestrictTo !== undefined && effect.RestrictTo.includes(statPreviewSelectedEnemyId)) {
                                        hasAvailableEffect = true
                                        boostResult = true
                                    }
                                } else {
                                    hasAvailableEffect = true
                                }
                            })
                            available = hasAvailableEffect                            
                        }


                        if (available) {
    
                            let desc = ""
                            const maxLevel = 0

                            skill.Effects.filter(e => this.effectTypeFilter.includes(e.Type)).forEach(effect => {

                                if (desc != "") {
                                    desc += ", "
                                }
                                desc += `${getStatName(effect.Stat)} <b>${effect.Value[0][0] < 0 ? '' : '+'}${ExternalBuffs.statValueToString(effect.Stat, effect.Value[0][0])}`
                                let maxValue
                                if ('StackSame' in effect) {
                                    maxValue = effect.Value[0][maxLevel] * effect.StackSame
                                } else {
                                    maxValue = effect.Value[effect.Value.length-1][maxLevel]
                                }
                                if (effect.Value[0][0] != maxValue) {
                                    desc += `~${ExternalBuffs.statValueToString(effect.Stat, maxValue)}`
                                }
                                desc += '</b>'
                                
                            })
                            let listItemHtml = ExternalBuffs.getSearchResultListItemHtmlRaid(raid, skill, desc, ++resultCount)

                            if (boostResult) listTop += listItemHtml
                            else html += listItemHtml
                        }

                    }
                })
            }
        })

        this.searchResultsSelection = 0
        this.searchResultsCount = resultCount
        if (html == "" && listTop == "") {
            html += `<div class="text-center p-2">${translateUI('no_results')}</div>`
        }
        $(this.elements.searchResults).find('.search-list-results').html(listTop + html)
    }

    toggleDisabled(disabled) {
        $(this.elements.searchBox).add(this.elements.searchButton).add(this.elements.autoAddButton).attr('disabled', disabled)
        $(this.elements.controls).toggleClass('disabled', disabled)
    }

    getBuffAmountText(buff) {
        let text = ''
        buff.Skill.Effects.filter(e => this.effectTypeFilter.includes(e.Type)).forEach((effect, i) => {
            if (effect.Type.startsWith('Buff')) {
                if (text != "") {
                    text += ", "
                }
                let value
                if ('StackSame' in effect) {
                    value = effect.Value[0][buff.Level-1] * buff.Stacks
                } else {
                    value = effect.Value[Math.min(buff.Stacks-1, effect.Value.length-1)][buff.Level-1]
                }
                text += `<span data-effect='${i}'>${getStatName(effect.Stat)} <b>${value < 0 ? '' : '+'}${ExternalBuffs.statValueToString(effect.Stat, value)}</b></span>`    
            }

        })
        return text
    }

    static getSearchResultListItemHtml(student, skill, desc, index) {
        return `<div class="search-list-item" data-index="${index}" data-student-id="${student.Id}" data-skill-type="${skill.SkillType}"><div class="transferable-skill-icon me-2"><img class="student-icon" src="images/student/icon/${student.Id}.webp"><img class="skill-icon bg-atk-${student.BulletType.toLowerCase()}" src="images/skill/${skill.Icon}.webp"></div><div class="search-list-item-detail"><span class="skill-name">${getTranslatedString(skill, "Name")} <small>(${translateUI(`student_skill_${skill.SkillType}`)})</small></span><span class="skill-details">${desc}</span></div></div>`
    }

    static getSearchResultListItemHtmlRaid(raid, skill, desc, index) {
        let iconPath, iconClass
        if (skill.Icon.startsWith('COMMON_')) {
            iconPath = `images/skill/${skill.Icon}.webp`
            iconClass = `skill-icon bg-atk-${raid.BulletType.toLowerCase()}`
        } else {
            iconPath = `images/raid/skill/${skill.Icon}.png`
            iconClass = 'raid-skill-icon'
        } 
        return `<div class="search-list-item" data-index="${index}" data-raid-id="${raid.Id}" data-skill-id="${skill.Id}"><div class="transferable-skill-icon me-2"><img class="student-icon" src="images/raid/icon/Icon_${raid.PathName}${skill.MinDifficulty >= 5 ? "_Insane" : ""}.png"><img class="${iconClass}" src="${iconPath}"></div><div class="search-list-item-detail"><span class="skill-name">${getTranslatedString(skill, "Name")} <small>(${translateUI(`student_skill_${skill.SkillType.toLowerCase()}`)})</small></span><span class="skill-details">${desc}</span></div></div>`
    }

    static checkRestrictions(object, effect, overrides = {}) {
        let compatible = true
        if ("Restrictions" in effect) {
            effect.Restrictions.forEach(({Property, Operand, Value}) => {

                let objProp = object[Property]

                if (Property in overrides) {
                    objProp = overrides[Property]
                }

                switch (Operand) {
                    case 'Equal':
                        compatible = (compatible && objProp == Value)
                        break
                    case 'NotEqual':
                        compatible = (compatible && objProp != Value)
                        break
                    case 'Contains':
                        compatible = (compatible && objProp.some(i => i == Value))
                        break
                } 
            })
        }
        return compatible
    }

}

let statPreviewExternalBuffs = ExternalBuffs
let statPreviewEnemyBuffs = ExternalBuffs

class CustomBuffs extends Buffs {
    container
    elements = {
        controls: null,
        inputForm: null,
    }
    isCoefficient = false
    statList

    constructor(container, statList, recalculationFunc) {
        super()
        this.container = container
        this.statList = statList
        this.recalculationFunc = recalculationFunc
        $(this.container).find('button.add-base').on('click', (e) => {this.addBuff(false)})
        $(this.container).find('button.add-coefficient').on('click', (e) => {this.addBuff(true)})
        $(this.container).on('click', 'button.buff-remove', (e) => {this.removeBuff(e.currentTarget.dataset.index)})       
        this.renderForm()
    }

    renderForm() {
        let html
        this.statList.forEach(stat => {
            html += `<option value="${stat}">${getLocalizedString('Stat', stat)}</option>`
        })
        $(this.container).find('.stat-select').html(html)
    }

    renderControls() {
        let html = ''
        this.buffs.forEach((buff, i) => {
            html += `<div data-index="${i}" class="ba-panel p-2">
            <div class="d-flex flex-row align-items-center gap-2">
                <div class="flex-fill">
                    ${(buff.Name != '') ? `<h5 class="px-1">${buff.Name}</h5>` : ''}
                    <div class="d-flex">
                        <span class="stat-icon"><img class="invert-light" src="images/staticon/Stat_${buff.Stat.split('_')[0]}.png"></span>
                        <p class="mb-0">${getStatName(buff.Stat)} <b>${(buff.Amount >= 0 ? '+' : '')}${Buffs.statValueToString(buff.Stat, buff.Amount)}</b></p>
                    </div>
                </div>
                <button class="btn btn-sm btn-dark buff-remove stat-panel-btn-sm no-wrap align-self-start" type="button" data-index="${i}">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>`
        })
        $(this.container).find('.controls').html(html)


    }

    addBuff(asCoefficient) {
        const stat = $(this.container).find('.stat-select').val()
        const amount = $(this.container).find('.amount-input').val()
        const name = $(this.container).find('.name-input').val()
        if (isNaN(parseInt(amount))) {
            toastMessage(`<i class="fa-solid fa-circle-xmark me-2"></i>${translateUI('toast_amount_invalid')}`, 2500, 'failure')
            return
        }
        if (asCoefficient) {
            super.addBuff({"Name": name, "Stat": stat + '_Coefficient', "Amount": parseInt(amount * 100)})
        } else {
            super.addBuff({"Name": name, "Stat": stat + '_Base', "Amount": parseInt(amount)})
        }
        this.renderControls()
        this.recalculationFunc()
    }

    removeBuff(index) {
        super.removeBuff(index)
        this.renderControls()
        this.recalculationFunc()
    }
}

let statPreviewCustomBuffs = CustomBuffs
let statPreviewEnemyCustomBuffs = CustomBuffs

class ResultsPopper {
    popperInstance = null 
    reference = null
    popup = null

    constructor(reference, popup) {
        //Bind search result popup
        this.reference = reference
        this.popup = popup
        this.popperInstance = Popper.createPopper(reference, popup, {
            placement: 'bottom-start',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8]
                    }
                },
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['bottom-start', 'top-start'],
                    }
                },
                {
                    name: 'preventOverflow',
                    options: {
                        boundary: $('ba-info-statpreview-panel .panel-sliders')[0],
                    }
                },
                {
                    name: 'updateWidth',
                    enabled: true,
                    phase: 'main',
                    fn: ({state}) => {
                        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
                    },
                }
            ]
        })
        this.hide()
    }

    show() {
        $(this.popup).show()
        this.popperInstance.setOptions((options) => ({...options, modifiers: [...options.modifiers.filter(o => o.name != 'eventListeners'), {name: 'eventListeners', enabled: true}]}))
    }

    hide() {
        $(this.popup).hide()
        this.popperInstance.setOptions((options) => ({...options, modifiers: [...options.modifiers.filter(o => o.name != 'eventListeners'), {name: 'eventListeners', enabled: false}]}))
    }
}

class SupportStats {

    elements = {
        controls: null,
        searchBox: null,
        searchButton: null,
        searchResults: null,
    }
    supportStudents = []

    searchBoxTimeout = null
    searchResultsSelection = 0
    searchResultsCount = 0

    constructor(elements) {
        //populate the list
        this.elements = elements
        this.searchResultPopper = new ResultsPopper($(this.elements.searchBox).parent()[0], this.elements.searchResults)
        
        $(this.elements.searchResults).find('.search-list > div').on('click', 'div[data-student-id]', (e) => {
            this.addSupportStudent(e.currentTarget.dataset["studentId"])
            this.searchResultPopper.hide()
            $(this.elements.searchBox).val('')
        })

        $(this.elements.searchButton).on('click', (e) => {
            if ($(this.elements.searchResults).is(':visible')) {
                this.searchResultPopper.hide()
            } else {
                if (this.searchBoxTimeout) {
                    clearTimeout(this.searchBoxTimeout)
                }
                this.searchResultPopper.show()
                this.searchStudents()
            }
        })

        $(this.elements.searchBox).on('input', (e) => {
            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            this.searchBoxTimeout = setTimeout(() => {
                if (e.currentTarget.value != "") {
                    this.searchResultPopper.show()
                    this.searchStudents()
                } else {
                    this.searchResultPopper.hide()
                }
            }, searchDelay)
        }).on('blur', (e) => {
            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            if (e.currentTarget.value == "") this.searchResultPopper.hide()
        }).on('keyup keydown', (e) => {
            switch (e.code) {
                case 'Enter':
                    e.preventDefault()
                    if ($(this.elements.searchResults).is(':visible') && e.type == "keyup") {
                        if (this.searchResultsSelection == 0 && this.searchResultsCount > 0) {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="1"]`).trigger("click")
                        } else {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`).trigger("click")
                        }
                    }
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection < this.searchResultsCount) {
                        this.searchResultsSelection++
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection > 1)  {
                        this.searchResultsSelection--
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'Escape':
                    e.preventDefault()
                    $(this.elements.searchBox).val('').trigger('blur')
                    break
            }
        })

        //Bind controls
        $(this.elements.controls).on('input', '.support-level input', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            this.supportStudents[index].level = e.currentTarget.value
            const panel = $(`#supportstats-controls-${index}`)
            const support = this.supportStudents[index]
            $(`#supportstats-controls-${index} .support-level .ba-slider-label`).text(`Lv.${support.level}`)
            recalculateStatsWithDelay()
        })
        $(this.elements.controls).on('click', '.ba-statpreview-star', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const stars = parseInt(e.currentTarget.dataset.val)
            this.supportStudents[index].starGrade = stars
            this.supportStudents[index].weaponStarGrade = 0
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('click', '.ba-weaponpreview-star', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const weaponStars = parseInt(e.currentTarget.dataset.val)
            this.supportStudents[index].starGrade = 5
            this.supportStudents[index].weaponStarGrade = weaponStars
            this.supportStudents[index].weaponLevel = 20 + (weaponStars*10)
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('change', '.support-bond', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const bondNum = e.currentTarget.dataset.bond
            const level = Math.min(Math.max(parseInt(e.currentTarget.value), 1), parseInt(e.currentTarget.max))
            this.supportStudents[index].bond[bondNum] = level
            this.updateControlValues(index)
        }).on('click', '.support-bond', (e) => {e.currentTarget.select()})

        $(this.elements.controls).on('change', '.support-potential', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const stat = e.currentTarget.dataset.stat
            const level = Math.min(Math.max(parseInt(e.currentTarget.value), 1), parseInt(e.currentTarget.max))
            this.supportStudents[index].potential[stat] = level
            this.updateControlValues(index)
        }).on('click', '.support-potential', (e) => {e.currentTarget.select()})

        $(this.elements.controls).on('change', '.support-stat-weapon-level', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const weaponLevel = Math.min(Math.max(parseInt(e.currentTarget.value), 1), parseInt(e.currentTarget.max))
            this.supportStudents[index].weaponLevel = weaponLevel
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('click', '.support-gear .dropdown-item', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const slot = $(e.currentTarget).closest('[data-slot]').data('slot')
            this.supportStudents[index].equipment[slot-1] = parseInt(e.currentTarget.dataset.tier)
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('click', '.support-ex-gear', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            this.supportStudents[index].gear = !this.supportStudents[index].gear
            $(e.currentTarget).toggleClass('deactivated', !this.supportStudents[index].gear)
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('click', '.student-remove', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            this.removeSupportStudent(index)
        })

        $(this.elements.controls).on('click', 'button.panel-collapse', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            if ($(`#supportstats-controls-${index}`).hasClass('collapsing')) return
            this.supportStudents[index].panelOpen = !this.supportStudents[index].panelOpen
            $(e.currentTarget).toggleClass('active', this.supportStudents[index].panelOpen)
            $(`#supportstats-controls-${index}`).collapse(this.supportStudents[index].panelOpen ? 'show' : 'hide')
        })

    }

    addSupportStudent(studentId) {

        const student = find(data.students, 'Id', studentId)[0]
        //initialise using the saved stats
        const supportStudent = {"student": student}

        if (studentId in studentCollection) {
            const savedStudent = studentCollection[studentId]
            supportStudent.level = Math.min(parseInt(savedStudent.l), region.StudentMaxLevel)
            supportStudent.starGrade = parseInt(savedStudent.s)
            supportStudent.weaponStarGrade = region.WeaponMaxLevel > 0 ? parseInt(savedStudent.ws) : 0 
            supportStudent.weaponLevel = Math.min(parseInt(savedStudent.wl), region.WeaponMaxLevel)
            supportStudent.equipment = [Math.min(parseInt(savedStudent.e1), region.EquipmentMaxLevel[0]), Math.min(parseInt(savedStudent.e2), region.EquipmentMaxLevel[1]), Math.min(parseInt(savedStudent.e3), region.EquipmentMaxLevel[2])]
            supportStudent.gear = false
            supportStudent.bond = [Math.min(parseInt(savedStudent.b), region.BondMaxLevel)]
        } else {
            supportStudent.level = region.StudentMaxLevel
            supportStudent.starGrade = 5
            supportStudent.weaponStarGrade = region.WeaponMaxLevel > 0 ? 3 : 0
            supportStudent.weaponLevel = region.WeaponMaxLevel
            supportStudent.equipment = region.EquipmentMaxLevel
            supportStudent.gear = false
            supportStudent.bond = [20]
        }

        supportStudent.potential = {
            'MaxHP': 0,
            'AttackPower': 0,
            'HealPower': 0
        }

        student.FavorAlts.forEach(altId => {
            supportStudent.bond.push(altId in studentCollection ? studentCollection[altId].b : 1)
        })
        supportStudent.panelOpen = false
        this.supportStudents.push(supportStudent)

        this.renderControls()
    }

    removeSupportStudent(index) {
        this.supportStudents.splice(index, 1)
        this.renderControls()
    }

    searchStudents() {
        let html = "", resultCount = 0
        const searchTerm = this.elements.searchBox.value.toLowerCase()
        data.students.forEach(student => {
            if (student.SquadType == 'Support' && student.IsReleased[regionID]) {
                if (!this.supportStudents.find(s => s.student.Id == student.Id) && searchContains(searchTerm, getTranslatedString(student, "Name"))) {
                    html += SupportStats.getSearchResultListItemHtml(student, ++resultCount)
                }
            }
        })
        this.searchResultsSelection = 0
        this.searchResultsCount = resultCount
        if (html != "") {
            this.searchResultPopper.show()
        } else {
            this.searchResultPopper.hide()
        }
        $(this.elements.searchResults).find('.search-list > div').html(html)
    }

    static getSearchResultListItemHtml(student, index) {
        return `<div class="search-list-item" data-index="${index}" data-student-id="${student.Id}"><div class="search-list-item-icon"><img class="student-icon" src="images/student/icon/${student.Id}.webp"></div><div class="search-list-item-detail"><span>${getTranslatedString(student, "Name")}</span>${student.Id in studentCollection ? `<span class="text-small"><i class="me-1 fa-solid fa-circle-check"></i><span>${translateUI("collection_owned")}</span></span>` : `<span class="text-small text-muted"><i class="me-1 fa-solid fa-circle-xmark"></i><span>${translateUI("collection_notowned")}</span></span>`}</div></div>`
    }

    renderControls() {
        let html = ''
        this.supportStudents.forEach((support, index) => {
            html += `
            <div data-index="${index}" class="ba-panel p-2">
                <div class="d-flex flex-row align-items-center gap-2">
                    <div class="support-stats">
                        <img src="images/student/icon/${support.student.Id}.webp">
                    </div>
                    <div class="flex-fill">
                        <h5 class="support-stats-name">${support.student.Name}</h5>
                        <p class="support-stats-desc mb-0" style="font-size: 0.875rem; line-height: 1rem;"></p>
                    </div>
                    <div class="d-flex flex-column justify-content-between align-self-stretch">
                        <button class="btn btn-sm btn-dark stat-panel-btn-sm no-wrap student-remove" type="button"><i class="fa-solid fa-xmark"></i></button>
                        <button class="btn btn-sm btn-dark stat-panel-btn-sm no-wrap panel-collapse ${support.panelOpen ? ' active' : ''}"><i class="fa-solid fa-gear"></i></button>
                    </div>
                </div>
                <div class="collapse${support.panelOpen ? ' show' : ''}" id="supportstats-controls-${index}">
                    <div class="d-flex flex-column gap-2 pt-3">
                        <div class="d-flex flex-row align-items-center gap-2 support-level">
                            <input type="range" class="form-range flex-fill" value="${support.level}" min="1" max="${region.StudentMaxLevel}">
                            <span class="ba-slider-label">Lv.${support.level}</span>
                        </div>  
                        <div class="d-flex flex-row flex-wrap align-items-center justify-content-center gap-2">
                            <div class="d-inline-block ba-panel statpreview-stars px-2 d-flex align-items-center">
                                <span class="ba-statpreview-star" data-val="1"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-statpreview-star" data-val="2"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-statpreview-star" data-val="3"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-statpreview-star" data-val="4"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-statpreview-star" data-val="5"><i class="fa-solid fa-star"></i></span>
                                ${ region.WeaponMaxLevel > 0 ?
                                `<span class="ba-weaponpreview-star ms-2" data-val="1"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-weaponpreview-star" data-val="2"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-weaponpreview-star" data-val="3"><i class="fa-solid fa-star"></i></span>` : ''
                                }
                            </div>
                            ${SupportStats.renderBondControls(support.student)}
                            <input style="display:none;" type="number" class="support-stat-weapon-level form-control" value="${support.weaponLevel}" min="1" step="1" max="50"></span>
                            

                            
                        </div>
                        <div class="d-flex flex-row flex-wrap align-items-center justify-content-center gap-2 text-bold">
                            ${SupportStats.renderGearDropdown(1, support.student.Equipment[0])}
                            ${SupportStats.renderGearDropdown(2, support.student.Equipment[1])}
                            ${SupportStats.renderGearDropdown(3, support.student.Equipment[2])}`

            if ("Released" in support.student.Gear && support.student.Gear.Released[regionID]) {
                html += `
                <button class="btn-pill support-ex-gear ${ support.gear ? '' : 'deactivated'}">
                    <div class="icon"><img class="ba-item-n" src="images/gear/icon/${support.student.Id}.webp" width="28" height="28"></div>
                    <i class="fa-regular fa-square off mx-2"></i>
                    <i class="fa-solid fa-square-check on mx-2"></i>
                </button>
                `
            }
            if (region.PotentialMax > 0) {
                html += `<div class="d-flex align-items-center justify-content-center gap-2">`
                for (const stat of ['MaxHP', 'AttackPower', 'HealPower']) {
                    html += `<div class="input-small"><div class="icon icon-potential"><img src="images/staticon/Stat_${stat}.png"></div><input data-stat="${stat}" class="form-control support-potential" type="number" value="0" min="0" max="${region.PotentialMax}"></div>`
                }
                html += `</div>`
            }
            html += `  </div>
                    </div>
                </div>
            </div>
            `
        })
        $(this.elements.controls).html(html)
        this.supportStudents.forEach((s, index) => this.updateControlValues(index, false))
        $(this.elements.searchBox).add(this.elements.searchButton).attr('disabled', this.supportStudents.length >= 4)
        recalculateStats()
    }

    updateControlValues(index, recalculate = true) {
        //const panel = $(this.elements.controls).find(`> div[data-index="${index}"]`)
        const panel = $(`#supportstats-controls-${index}`)
        const support = this.supportStudents[index]
        panel.find('.support-level .ba-slider-label').text(`Lv.${support.level}`)
        for (let i = 1; i <= 5; i++) {
            panel.find(`.ba-statpreview-star[data-val="${i}"]`).toggleClass('active', i <= support.starGrade)
        }
        for (let i = 1; i <= 3; i++) {
            panel.find(`.ba-weaponpreview-star[data-val="${i}"]`).toggleClass('active', i <= support.weaponStarGrade)
        }
        for (let i = 0; i < support.bond.length; i++) {
            panel.find(`.support-bond[data-bond="${i}"]`).val(support.bond[i])
        }
        for (const stat of ['MaxHP', 'AttackPower', 'HealPower']) {
            panel.find(`.support-potential[data-stat="${stat}"]`).val(support.potential[stat])
        }
        panel.find('.support-stat-weapon-level').attr('max', 20 + (support.weaponStarGrade*10)).val(support.weaponLevel).attr('disabled', support.weaponStarGrade == 0)
        panel.find('.support-gear .dropdown-item.active').removeClass('active')
        for (let i = 1; i <= 3; i++) {
            panel.find(`.support-gear[data-slot="${i}"] .dropdown-item[data-tier="${support.equipment[i-1]}"]`).addClass('active')
            panel.find(`.support-gear[data-slot="${i}"] .support-gear-icon`).attr('src', `images/equipment/icon/equipment_icon_${support.student.Equipment[i-1].toLowerCase()}_tier${support.equipment[i-1]}.webp`)
            panel.find(`.support-gear[data-slot="${i}"] .support-gear-label`).text(`T${support.equipment[i-1]}`)
        }
        if (recalculate) recalculateStats()
    }

    static renderGearDropdown(slot, gear) {
        let html = `<div class="support-gear" data-slot="${slot}">
        <button class="btn-pill" data-bs-toggle="dropdown">
            <div class="icon"><img class="support-gear-icon ba-item-n" src="" width="28" height="28"></div>
            <span class="support-gear-label label"></span>
            <i class="caret fa-solid fa-caret-down me-2"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-start">`
        for (let i = 1; i <= region.EquipmentMaxLevel[slot - 1]; i++) {
            html += `<li><a class="dropdown-item dropdown-item-icon" data-tier="${i}" href="javascript:;"><div class="icon"><img class="ba-item-n" src="images/equipment/icon/equipment_icon_${gear.toLowerCase()}_tier${i}.webp"></div><span>T${i}</span></a></li>`
        }
        html += `</ul></div>`
        return html
    }

    static renderBondControls(student) {
        let html = `<div class="d-flex align-items-center justify-content-center gap-2"><div class="input-small"><div class="icon bond-small"><img src="images/student/icon/${student.Id}.webp"></div><input data-bond="0" class="form-control support-bond" type="number" value="1" min="1" max="${region.BondMaxLevel}"></div>`
        student.FavorAlts.forEach((id, i) => {
            const alt = find(data.students, 'Id', id)[0]
            if (alt.IsReleased[regionID]) {
                html += `<div class="input-small"><div class="icon bond-small"><img src="images/student/icon/${alt.Id}.webp"></div><input data-bond="${i+1}" class="form-control support-bond" type="number" value="1" min="1" max="${region.BondMaxLevel}"></div>`
            }
        })
        html += '</div>'
        return html
    }
}

let statPreviewSupportStats = SupportStats

class TSAStats {

    elements = {
        controls: null,
    }
    tsaStudent = null
    enabled = false

    constructor(elements) {
        //populate the list
        this.elements = elements

        //Bind controls
        $(this.elements.controls).on('input', '.support-level input', (e) => {
            this.tsaStudent.level = e.currentTarget.value
            $(`#tsastats-controls .support-level .ba-slider-label`).text(`Lv.${this.tsaStudent.level}`)
            recalculateStatsWithDelay()
        })
        $(this.elements.controls).on('click', '.ba-statpreview-star', (e) => {
            const stars = parseInt(e.currentTarget.dataset.val)
            this.tsaStudent.starGrade = stars
            this.tsaStudent.weaponStarGrade = 0
            this.updateControlValues()
        })

        $(this.elements.controls).on('click', '.ba-weaponpreview-star', (e) => {
            const weaponStars = parseInt(e.currentTarget.dataset.val)
            this.tsaStudent.starGrade = 5
            this.tsaStudent.weaponStarGrade = weaponStars
            this.tsaStudent.weaponLevel = 20 + (weaponStars*10)
            this.updateControlValues()
        })

        $(this.elements.controls).on('change', '.support-bond', (e) => {
            const bondNum = e.currentTarget.dataset.bond
            const level = Math.min(Math.max(parseInt(e.currentTarget.value), 1), parseInt(e.currentTarget.max))
            this.tsaStudent.bond[bondNum] = level
            this.updateControlValues()
        }).on('click', '.support-bond', (e) => {e.currentTarget.select()})

        $(this.elements.controls).on('change', '.support-stat-weapon-level', (e) => {
            const weaponLevel = Math.min(Math.max(parseInt(e.currentTarget.value), 1), parseInt(e.currentTarget.max))
            this.tsaStudent.weaponLevel = weaponLevel
            this.updateControlValues()
        })

        $(this.elements.controls).on('click', '.support-gear .dropdown-item', (e) => {
            const slot = $(e.currentTarget).closest('[data-slot]').data('slot')
            this.tsaStudent.equipment[slot-1] = parseInt(e.currentTarget.dataset.tier)
            this.updateControlValues()
        })

        $(this.elements.controls).on('click', '.support-ex-gear', (e) => {
            this.tsaStudent.gear = !this.tsaStudent.gear
            $(e.currentTarget).toggleClass('deactivated', !this.tsaStudent.gear)
            this.updateControlValues()
        })

        $(this.elements.controls).on('click', 'button.panel-collapse', (e) => {
            if ($(`#tsastats-controls`).hasClass('collapsing')) return
            this.tsaStudent.panelOpen = !this.tsaStudent.panelOpen
            $(e.currentTarget).toggleClass('active', this.tsaStudent.panelOpen)
            $(`#tsastats-controls`).collapse(this.tsaStudent.panelOpen ? 'show' : 'hide')
        })

    }

    setStudent(studentId) {

        const student = find(data.students, 'Id', studentId)[0]
        //initialise using the saved stats
        const tsaStudent = {"student": student}

        if (studentId in studentCollection) {
            const savedStudent = studentCollection[studentId]
            tsaStudent.level = Math.min(parseInt(savedStudent.l), region.StudentMaxLevel)
            tsaStudent.starGrade = parseInt(savedStudent.s)
            tsaStudent.weaponStarGrade = region.WeaponMaxLevel > 0 ? parseInt(savedStudent.ws) : 0 
            tsaStudent.weaponLevel = Math.min(parseInt(savedStudent.wl), region.WeaponMaxLevel)
            tsaStudent.equipment = [Math.min(parseInt(savedStudent.e1), region.EquipmentMaxLevel[0]), Math.min(parseInt(savedStudent.e2), region.EquipmentMaxLevel[1]), Math.min(parseInt(savedStudent.e3), region.EquipmentMaxLevel[2])]
            tsaStudent.gear = false
            tsaStudent.bond = [Math.min(parseInt(savedStudent.b), region.BondMaxLevel)]
        } else {
            tsaStudent.level = region.StudentMaxLevel
            tsaStudent.starGrade = 5
            tsaStudent.weaponStarGrade = region.WeaponMaxLevel > 0 ? 3 : 0
            tsaStudent.weaponLevel = region.WeaponMaxLevel
            tsaStudent.equipment = region.EquipmentMaxLevel
            tsaStudent.gear = false
            tsaStudent.bond = [20]

        }
        student.FavorAlts.forEach(altId => {
            tsaStudent.bond.push(altId in studentCollection ? studentCollection[altId].b : 1)
        })
        tsaStudent.panelOpen = false
        this.tsaStudent = tsaStudent

        this.renderControls()
    }

    renderControls() {
        let html = `
        <div class="ba-panel p-2${this.enabled ? '' : ' disabled'}">
            <div class="d-flex flex-row align-items-center gap-2">
                <div class="tsa-stats">
                    <img src="images/student/icon/${this.tsaStudent.student.Id}.webp">
                </div>
                <div class="flex-fill">
                    <h5 class="support-stats-name">${this.tsaStudent.student.Name}</h5>
                    <p class="support-stats-desc mb-0" style="font-size: 0.875rem; line-height: 1rem;"></p>
                </div>
                <div class="d-flex flex-column justify-content-between align-self-stretch">
                    <button class="btn btn-sm btn-dark stat-panel-btn-sm no-wrap panel-collapse ${this.tsaStudent.panelOpen ? ' active' : ''}"><i class="fa-solid fa-gear"></i></button>
                </div>
            </div>
            <div class="collapse${this.tsaStudent.panelOpen ? ' show' : ''}" id="tsastats-controls">
                <div class="d-flex flex-column gap-2 pt-3">
                    <div class="d-flex flex-row align-items-center gap-2 support-level">
                        <input type="range" class="form-range flex-fill" value="${this.tsaStudent.level}" min="1" max="${region.StudentMaxLevel}">
                        <span class="ba-slider-label">Lv.${this.tsaStudent.level}</span>
                    </div>  
                    <div class="d-flex flex-row flex-wrap align-items-center justify-content-center gap-2">
                        <div class="d-inline-block ba-panel statpreview-stars px-2 d-flex align-items-center">
                            <span class="ba-statpreview-star" data-val="1"><i class="fa-solid fa-star"></i></span>
                            <span class="ba-statpreview-star" data-val="2"><i class="fa-solid fa-star"></i></span>
                            <span class="ba-statpreview-star" data-val="3"><i class="fa-solid fa-star"></i></span>
                            <span class="ba-statpreview-star" data-val="4"><i class="fa-solid fa-star"></i></span>
                            <span class="ba-statpreview-star" data-val="5"><i class="fa-solid fa-star"></i></span>
                            ${ region.WeaponMaxLevel > 0 ?
                            `<span class="ba-weaponpreview-star ms-2" data-val="1"><i class="fa-solid fa-star"></i></span>
                            <span class="ba-weaponpreview-star" data-val="2"><i class="fa-solid fa-star"></i></span>
                            <span class="ba-weaponpreview-star" data-val="3"><i class="fa-solid fa-star"></i></span>` : ''
                            }
                        </div>
                        ${SupportStats.renderBondControls(this.tsaStudent.student)}
                        <input style="display:none;" type="number" class="support-stat-weapon-level form-control" value="${this.tsaStudent.weaponLevel}" min="1" step="1" max="50"></span>
                        

                        
                    </div>
                    <div class="d-flex flex-row flex-wrap align-items-center justify-content-center gap-2 text-bold">
                        ${SupportStats.renderGearDropdown(1, this.tsaStudent.student.Equipment[0])}
                        ${SupportStats.renderGearDropdown(2, this.tsaStudent.student.Equipment[1])}
                        ${SupportStats.renderGearDropdown(3, this.tsaStudent.student.Equipment[2])}`

        if ("Released" in this.tsaStudent.student.Gear && this.tsaStudent.student.Gear.Released[regionID]) {
            html += `
            <button class="btn-pill support-ex-gear ${ this.tsaStudent.gear ? '' : 'deactivated'}">
                <div class="icon"><img class="ba-item-n" src="images/gear/icon/${this.tsaStudent.student.Id}.webp" width="28" height="28"></div>
                <i class="fa-regular fa-square off mx-2"></i>
                <i class="fa-solid fa-square-check on mx-2"></i>
            </button>
            `
        }
        html += `  </div>
                </div>
            </div>
        </div>
        `
        $(this.elements.controls).html(html)
        this.updateControlValues(false)
        //recalculateStats()
    }

    updateControlValues(recalculate = true) {
        //const panel = $(this.elements.controls).find(`> div[data-index="${index}"]`)
        const panel = $(`#tsastats-controls`)
        const support = this.tsaStudent
        panel.find('.support-level .ba-slider-label').text(`Lv.${support.level}`)
        for (let i = 1; i <= 5; i++) {
            panel.find(`.ba-statpreview-star[data-val="${i}"]`).toggleClass('active', i <= support.starGrade)
        }
        for (let i = 1; i <= 3; i++) {
            panel.find(`.ba-weaponpreview-star[data-val="${i}"]`).toggleClass('active', i <= support.weaponStarGrade)
        }
        for (let i = 0; i < support.bond.length; i++) {
            panel.find(`.support-bond[data-bond="${i}"]`).val(support.bond[i])
        }
        panel.find('.support-stat-weapon-level').attr('max', 20 + (support.weaponStarGrade*10)).val(support.weaponLevel).attr('disabled', support.weaponStarGrade == 0)
        panel.find('.support-gear .dropdown-item.active').removeClass('active')
        for (let i = 1; i <= 3; i++) {
            panel.find(`.support-gear[data-slot="${i}"] .dropdown-item[data-tier="${support.equipment[i-1]}"]`).addClass('active')
            panel.find(`.support-gear[data-slot="${i}"] .support-gear-icon`).attr('src', `images/equipment/icon/equipment_icon_${support.student.Equipment[i-1].toLowerCase()}_tier${support.equipment[i-1]}.webp`)
            panel.find(`.support-gear[data-slot="${i}"] .support-gear-label`).text(`T${support.equipment[i-1]}`)
        }
        if (recalculate) recalculateStats()
    }
}

let statPreviewTSAStats = TSAStats

class EnemyFinder {

    armorTypes = ['Normal', 'LightArmor', 'HeavyArmor', 'Unarmed', 'ElasticArmor']
    enemyList = []

    elements = {
        controls: null,
        searchBox: null,
        searchButton: null,
        searchResults: null,
    }

    searchBoxTimeout = null
    searchTypeFilter = 'all'
    searchBookmarksFilter = false
    searchResultsSelection = 0
    searchResultsCount = 0

    constructor(elements) {
        //populate the list
        this.elements = elements
        this.searchResultPopper = new ResultsPopper($(this.elements.searchBox).parent()[0], this.elements.searchResults)

        $(this.elements.searchResults).find('.search-list-results').on('click', 'div[data-enemy-list-index]', (e) => {
            const el = $(e.currentTarget)
            this.setEnemyByIndex(el.data('enemy-list-index'))
            this.searchResultPopper.hide()
            $(this.elements.searchBox).val('')
        })

        //bind filter
        $(this.elements.searchResults).find('.search-list-filter').on('click', 'a[data-filter-key]', (e) => {
            const el = $(e.currentTarget)
            this.searchTypeFilter = el.data('filter-key')
            $(this.elements.searchResults).find('a[data-filter-key]').removeClass('active')
            el.addClass('active')
            $(this.elements.searchResults).find('.search-list-filter-active').text(el.text())
            this.search()
        })
        $(this.elements.searchResults).find('.search-list-filter-active').text(translateUI('filter_all'))

        $(this.elements.searchResults).find('.search-list-bookmark').on('click', (e) => {
            const el = $(e.currentTarget)
            this.searchBookmarksFilter = !this.searchBookmarksFilter
            el.toggleClass('active', this.searchBookmarksFilter)
            this.search()
        })

        //bind bookmark button
        $('#statpreview-enemy-bookmark').on('click', (e) => {
            const button = $(e.currentTarget)

            let key 
            if (statPreviewSelectedEnemyLevelFixed) {
                key = `${statPreviewSelectedEnemyId}_${statPreviewSelectedEnemyLevel}_${statPreviewSelectedEnemyGrade}`
            } else {
                key = `${statPreviewSelectedEnemyId}_-1_${statPreviewSelectedEnemyGrade}`
            }

            if (statPreviewEnemyBookmarks.indexOf(key) == -1) {
                statPreviewEnemyBookmarks.push(key)
                button.toggleClass('active', true)
            } else {
                statPreviewEnemyBookmarks.splice(statPreviewEnemyBookmarks.indexOf(key), 1)
                button.toggleClass('active', false)
            }

            localStorage.setItem('enemy_bookmarks', JSON.stringify(statPreviewEnemyBookmarks))
            
        })

        if (localStorage.getItem('selected_enemy')) {
            this.setEnemyByUniqueKey(localStorage.getItem('selected_enemy'))
        } else {
            this.setEnemyByIndex(0)
        }

        $(this.elements.searchButton).on('click', (e) => {
            if ($(this.elements.searchResults).is(':visible')) {
                this.searchResultPopper.hide()
            } else {
                if (this.searchBoxTimeout) {
                    clearTimeout(this.searchBoxTimeout)
                }
                this.searchResultPopper.show()
                this.search()
            }
        })

        $(this.elements.searchBox).on('input', (e) => {
            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            this.searchBoxTimeout = setTimeout(() => {
                if (e.currentTarget.value != "") {
                    this.searchResultPopper.show()
                    this.search()
                } else {
                    this.searchResultPopper.hide()
                }
            }, searchDelay)
        }).on('blur', (e) => {
            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            if (e.currentTarget.value == "") this.searchResultPopper.hide()
        }).on('keyup keydown', (e) => {
            switch (e.code) {
                case 'Enter':
                    e.preventDefault()
                    if ($(this.elements.searchResults).is(':visible') && e.type == "keyup") {
                        if (this.searchResultsSelection == 0 && this.searchResultsCount > 0) {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="1"]`).trigger("click")
                        } else {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`).trigger("click")
                        }
                    }
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection < this.searchResultsCount) {
                        this.searchResultsSelection++
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection > 1)  {
                        this.searchResultsSelection--
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'Escape':
                    e.preventDefault()
                    $(this.elements.searchBox).val('').trigger('blur')
                    break
            }
        })

        $('#statpreview-enemy-defensetype-list').on('click', '.dropdown-item', (ev) => {this.toggleEnemyArmorType(ev.currentTarget.dataset.value)})
    }

    static generateEnemyList() {
        statPreviewEnemyList = []
        data.raids.Raid.forEach(raid => {
            raid.EnemyList.forEach((difficulty, difficultyId) => {
                if (!raid.IsReleased[regionID] || (difficultyId > raid.MaxDifficulty[regionID])) return
                difficulty.forEach(enemyId => {
                    const enemy = find(data.enemies, 'Id', enemyId)[0]
                    if (enemy.SquadType == 'Main' && !enemy.DevName.includes('Resort_') && !enemy.DevName.includes('AAGun_') && !enemy.DevName.includes('_HolyRelic_') && !enemy.DevName.includes('_HolyRelic02_')) {
                        const raidIcon = (enemy.Icon !== undefined && enemy.Icon != "") ? `images/enemy/${enemy.Icon}.webp` : `images/raid/icon/Icon_${raid.PathName}${difficultyId > 4 ? "_Insane" : ""}.png`
                        statPreviewEnemyList.push({
                            id: enemy.Id,
                            name: `${enemy.Name}`,
                            searchTerms: [getTranslatedString(raid, 'Name') + ' ' + getLocalizedString("RaidDifficulty", raidDifficultyName[difficultyId])],
                            source: 'raid',
                            sourceName: `${getLocalizedString("StageType", "Raid")} / ${getLocalizedString("RaidDifficulty", raidDifficultyName[difficultyId])}`,
                            rank: enemy.Rank,
                            icon: raidIcon,
                            level: raid_level[difficultyId],
                            grade: 1,
                            raidId: raid.Id,
                            raidDifficulty: difficultyId
                        })
                        
                    }
                })
            })
        })

        data.raids.TimeAttack.forEach(stage => {
            if (!stage.IsReleased[regionID]) return
            const formations = getServerProperty(stage, 'Formations')
            formations.forEach((formation, formationId) => {
                formation.EnemyList.forEach(enemyId => {
                    const enemy = find(data.enemies, 'Id', enemyId)[0]
                    if (enemy.SquadType == 'Main' && enemy.Rank != "Summoned" && statPreviewEnemyList.findIndex((e) => e.id == enemy.Id) == -1) {
                        statPreviewEnemyList.push({
                            id: enemy.Id,
                            name: `${enemy.Name}`,
                            searchTerms: [getLocalizedString("StageType", "TimeAttack")],
                            source: 'timeattack',
                            sourceName: `${getLocalizedString("StageType", "TimeAttack")} / ${translateUI('ta_phase') + (formationId + 1)}`,
                            rank: enemy.Rank,
                            icon: `images/enemy/${enemy.Icon}.webp`,
                            level: formation.Level[enemy_rank[enemy.Rank]],
                            grade: formation.Grade[enemy_rank[enemy.Rank]]
                        })
                    }
                })
            })
        })

        data.raids.WorldRaid.forEach(raid => {
            raid.EnemyList.forEach((difficulty, difficultyId) => {
                if (!raid.IsReleased[regionID] || difficultyId > raid.MaxDifficulty[regionID]) return
                difficulty.forEach(enemyId => {
                    const enemy = find(data.enemies, 'Id', enemyId)[0]
                    if (enemy.SquadType == 'Main' && !enemy.DevName.includes('_Resort_') && !enemy.DevName.includes('_HolyRelic_') && !enemy.DevName.includes('_HolyRelic02_')) {
                        const raidIcon = (enemy.Icon !== undefined && enemy.Icon != "") ? `images/enemy/${enemy.Icon}.webp` : `images/raid/icon/Icon_${raid.PathName}.png`
                        statPreviewEnemyList.push({
                            id: enemy.Id,
                            name: enemy.Name,
                            searchTerms: [getTranslatedString(raid, 'Name') + ' ' + getLocalizedString("RaidDifficulty", raid.DifficultyName[difficultyId])],
                            source: 'worldraid',
                            sourceName: `${getLocalizedString("StageType", "WorldRaid")} / ${getLocalizedString("RaidDifficulty", raid.DifficultyName[difficultyId])}`,
                            rank: enemy.Rank,
                            icon: raidIcon,
                            level: raid.Level[difficultyId],
                            grade: 1,
                            raidId: raid.Id,
                            raidDifficulty: difficultyId
                        })
                    }
                })
            })
        })


        data.raids.MultiFloorRaid.forEach(raid => {
            raid.EnemyList.forEach((difficulty, difficultyId) => {
                if (!raid.IsReleased[regionID] || difficultyId > raid.MaxDifficulty[regionID]) return
                difficulty.forEach(enemyId => {
                    const enemy = find(data.enemies, 'Id', enemyId)[0]
                    if (enemy.SquadType == 'Main' && !enemy.IsNPC) {
                        const raidIcon = (enemy.Icon !== undefined && enemy.Icon != "") ? `images/enemy/${enemy.Icon}.webp` : `images/raid/icon/Icon_${raid.PathName}.png`
                        statPreviewEnemyList.push({
                            id: enemy.Id,
                            name: enemy.Name,
                            searchTerms: [getTranslatedString(raid, 'Name')],
                            source: 'multifloorraid',
                            sourceName: `${getLocalizedString("StageType", "MultiFloorRaid")} (${getLocalizedString('ArmorType', raid.ArmorType)}) / ${raid.DifficultyStartFloor[difficultyId]} ~ ${raid.DifficultyStartFloor[difficultyId+1] - 1}`,
                            rank: enemy.Rank,
                            icon: raidIcon,
                            level: -1,
                            grade: 1,
                            raidId: raid.Id,
                            raidDifficulty: difficultyId
                        })
                    }
                })
            })
        })

        data.stages.Event.forEach(stage => {
            if (stage.Difficulty != 2 || !region.Events.includes(stage.EventId)) return
            let stageType = stage.Field ? 'Field' : 'Event'
            const formations = getServerProperty(stage, 'Formations')
            formations.forEach((formation) => {
                formation.EnemyList.forEach(enemyId => {
                    const enemy = find(data.enemies, 'Id', enemyId)[0]
                    if (enemy.Id >= 8010000 && enemy.SquadType == 'Main') {
                        if (enemy.SquadType == 'Main' && enemy.Rank != "Summoned") {
                            statPreviewEnemyList.push({
                                id: enemy.Id,
                                name: `${enemy.Name}`,
                                searchTerms: [getStageName(stage, stageType), enemy.Name + ' challenge'],
                                source: 'event',
                                sourceName: getStageName(stage, stageType),
                                rank: enemy.Rank,
                                icon: `images/enemy/${enemy.Icon}.webp`,
                                level: formation.Level[enemy_rank[enemy.Rank]],
                                grade: formation.Grade[enemy_rank[enemy.Rank]]
                            })
                        }
                    }
                })
            })
        })

        data.stages.ConquestMap.forEach(conquestMap => {
            if (!region.Events.includes(conquestMap.EventId)) return
            const mapName = getLocalizedString('ConquestMap', ''+conquestMap.EventId % 10000)
            conquestMap.Maps.filter(m => m.Difficulty == "VeryHard").forEach(challengeMap => {
                challengeMap.Tiles.filter(t => t.Type == "Battle").forEach(tile => {
                    const stage = find(data.stages.Conquest, "Id", tile.StageId)[0]
                    const formations = getServerProperty(stage, 'Formations')
                    formations.forEach((formation) => {
                        formation.EnemyList.forEach(enemyId => {
                            const enemy = find(data.enemies, 'Id', enemyId)[0]
                            if (enemy.Id >= 8010000 && enemy.SquadType == 'Main') {
                                if (enemy.SquadType == 'Main' && enemy.Rank != "Summoned") {
                                    statPreviewEnemyList.push({
                                        id: enemy.Id,
                                        name: enemy.Name,
                                        searchTerms: [mapName, enemy.Name + ' ' + getLocalizedString("StageType", "Conquest")],
                                        source: 'event',
                                        sourceName: mapName,
                                        rank: enemy.Rank,
                                        icon: `images/enemy/${enemy.Icon}.webp`,
                                        level: formation.Level[enemy_rank[enemy.Rank]],
                                        grade: formation.Grade[enemy_rank[enemy.Rank]]
                                    })
                                }
                            }
                        })
                    })
                })
            })
        })

        data.stages.SchoolDungeon.forEach(stage => {
            if (stage.Stage > region.SchoolDungeonMax) return
            const formation = getServerProperty(stage, 'Formations')[0]
            formation.EnemyList.forEach(enemyId => {
                const enemy = find(data.enemies, 'Id', enemyId)[0]
                if (enemy.SquadType == 'Main') {
                    statPreviewEnemyList.push({
                        id: enemy.Id,
                        name: enemy.Name,
                        searchTerms: [getStageTitle(stage, "SchoolDungeon"), getLocalizedString("StageType", "SchoolDungeon"), enemy.Name + ' ' + getStageTitle(stage, "SchoolDungeon")],
                        source: 'schooldungeon',
                        sourceName: `${getLocalizedString("StageType", "SchoolDungeon")} / ${getStageTitle(stage, "SchoolDungeon")}`,
                        rank: enemy.Rank,
                        icon: `images/enemy/${enemy.Icon}.webp`,
                        level: formation.Level[enemy_rank[enemy.Rank]],
                        grade: formation.Grade[enemy_rank[enemy.Rank]]
                    })
                }
            })
        })

        data.enemies.forEach(enemy => {
            if (enemy.SquadType == 'Main' && enemy.Rank != "Summoned" && enemy.Id >= 7000000 && enemy.Id < 7200000) {
                if (enemy.Id <= 7199999) {
                    statPreviewEnemyList.push({
                        id: enemy.Id,
                        name: enemy.Name,
                        searchTerms: [],
                        source: 'campaign',
                        sourceName: getLocalizedString("StageType", EnemyFinder.getModeFromEnemyId(enemy.Id)),
                        rank: enemy.Rank,
                        icon: `images/enemy/${enemy.Icon}.webp`,
                        level: -1,
                        grade: 1
                    })
                }
            }
        })
    }

    setEnemyByIndex(index) {

        const enemyListItem = statPreviewEnemyList[index]
        const enemy = find(data.enemies, 'Id', enemyListItem.id)[0]

        statPreviewSelectedEnemyId = enemyListItem.id
        statPreviewSelectedEnemyGrade = enemyListItem.grade
        statPreviewSelectedEnemyRaid = enemyListItem.raidId === undefined ? 0 : enemyListItem.raidId
        statPreviewSelectedEnemyRaidDifficulty = enemyListItem.raidDifficulty
        const uniqueKey = `${enemyListItem.id}_${enemyListItem.level}_${enemyListItem.grade}`
        localStorage.setItem('selected_enemy', uniqueKey)
        
        let iconClass = 'icon-enemy'
        if (enemyListItem.icon.startsWith('images/raid/icon')) {
            iconClass += '-raid'
        }

        $('#statpreview-enemy-name').html(enemyListItem.name)
        $('#statpreview-enemy-desc').html(enemyListItem.sourceName)
        $('#statpreview-enemy-icon').html(`<div class="${iconClass}"><img src="${enemyListItem.icon}"></div>`)

        $('#statpreview-enemy-icon').removeClass('elite champion boss').addClass(enemyListItem.rank.toLowerCase())

        $('#statpreview-enemy-size').toggle(enemy.Size != null)
        $('#statpreview-enemy-size .label').text(enemy.Size != null ? getLocalizedString('CharacterSize', enemy.Size) : '')

        setAttackTypeClass($("#statpreview-enemy-attacktype .icon-type"), enemy.BulletType)
        setDefenseTypeClass($("#statpreview-enemy-defensetype .icon-type"), enemy.ArmorType)
        $("#statpreview-enemy-attacktype .label").text(getLocalizedString('BulletType',enemy.BulletType))
        $("#statpreview-enemy-defensetype .label").text(getLocalizedString('ArmorType',enemy.ArmorType))
        
        let armorTypeListHtml = ''
        for (let armorType of this.armorTypes) {
            armorTypeListHtml += `<li><a class="dropdown-item dropdown-item-icon${enemy.ArmorType == armorType ? ' active' : ''}" href="javascript:;" data-value="${armorType}" class="btn btn-dark"><span>${getLocalizedString('ArmorType',armorType)}</span></a></li>`
        }
        $('#statpreview-enemy-defensetype-list').html(armorTypeListHtml)

        statPreviewSelectedEnemyArmorType = enemy.ArmorType

        if (enemyListItem.level != -1) {
            $('#calculation-enemy-level').toggleClass('disabled', true)
            $('#calculation-enemy-level input').val(enemyListItem.level)
            statPreviewSelectedEnemyLevel = enemyListItem.level
            statPreviewSelectedEnemyLevelFixed = true
        } else {
            $('#calculation-enemy-level').toggleClass('disabled', false)
            statPreviewSelectedEnemyLevelFixed = false
        }

        if (enemyListItem.source == 'multifloorraid') {
            const raid = find(data.raids.MultiFloorRaid, 'Id', enemyListItem.raidId)[0]
            $('#calculation-enemy-floor').show()
            $('#calculation-enemy-floor input').val(0).attr('max', raid.DifficultyStartFloor[enemyListItem.raidDifficulty + 1] - raid.DifficultyStartFloor[enemyListItem.raidDifficulty] - 1).off('input').on('input', function (e) {
                statPreviewSelectedEnemyRaidFloor = raid.DifficultyStartFloor[enemyListItem.raidDifficulty] - 1 + parseInt(this.value)
                $('#calculation-enemy-floor .ba-slider-label').text(`${statPreviewSelectedEnemyRaidFloor + 1}`)
                calculateEnemyStats()
            })

            statPreviewSelectedEnemyRaidFloor = raid.DifficultyStartFloor[enemyListItem.raidDifficulty] - 1
            $('#calculation-enemy-floor .ba-slider-label').text(`${statPreviewSelectedEnemyRaidFloor + 1}`)

            $('#calculation-enemy-level').toggleClass('disabled', true)
        } else {
            $('#calculation-enemy-floor').hide()
        }

        //set bookmark button
        $('#statpreview-enemy-bookmark').toggleClass('active', statPreviewEnemyBookmarks.indexOf(uniqueKey) != -1)

        initRaidSkillInfo(enemyListItem.raidId, enemyListItem.id, enemyListItem.raidDifficulty)
        calculateEnemyStats()
    }

    toggleEnemyArmorType(armorType) {
        statPreviewSelectedEnemyArmorType = armorType

        $('#statpreview-enemy-defensetype-list .dropdown-item').removeClass('active')
        $(`#statpreview-enemy-defensetype-list .dropdown-item[data-value="${armorType}"]`).addClass('active')
        setDefenseTypeClass($("#statpreview-enemy-defensetype .icon-type"), statPreviewSelectedEnemyArmorType)
        $("#statpreview-enemy-defensetype .label").text(getLocalizedString('ArmorType',statPreviewSelectedEnemyArmorType))

        calculateEnemyStats()
    }

    setEnemyByUniqueKey(key) {
        let id, level, grade
        [id, level, grade] = key.split('_')

        const index = statPreviewEnemyList.findIndex(item => item.id == id && item.level == level && item.grade == grade)
        if (index != -1) {
            this.setEnemyByIndex(index)
        } else {
            this.setEnemyByIndex(0)
        }
    }

    search() {
        let html = "", resultCount = 0
        const searchTerm = this.elements.searchBox.value.toLowerCase()

        for (let i = 0; i < statPreviewEnemyList.length; i++) {
            if (resultCount >= 50) break
            const item = statPreviewEnemyList[i]

            if (this.searchTypeFilter != 'all' && this.searchTypeFilter != item.source) continue
            if (this.searchBookmarksFilter && !statPreviewEnemyBookmarks.includes(`${item.id}_${item.level}_${item.grade}`)) continue

            if (searchContains(searchTerm, item.name) || searchContains(searchTerm, item.id.toString()) || item.searchTerms.some(t => searchContains(searchTerm, t))) {
                let iconClass = 'icon-enemy'
                if (item.icon.startsWith('images/raid/icon')) {
                    iconClass += '-raid'
                }
                html += `<div class="search-list-item" data-index="${++resultCount}" data-enemy-list-index="${i}"><div class="search-list-item-icon enemy-select-icon small me-3 ${item.rank.toLowerCase()}"><div class="${iconClass}"><img src="${item.icon}" loading="lazy"></div></div><div class="search-list-item-detail"><span class="enemy-name">${item.name}</span><span class="enemy-details"><i>${item.sourceName}</i>${item.level != -1 ? `<b>Lv.${item.level}</b>` : ''}</span></div></div>`
            }
            
        }

        this.searchResultsSelection = 0
        this.searchResultsCount = resultCount
        if (html == "") {
            html += `<div class="text-center p-2">${translateUI('no_results')}</div>`
        }
        $(this.elements.searchResults).find('.search-list-results').html(html)
    }

    static getModeFromEnemyId(id) {
        if (id < 7100000) {
            return 'Campaign'
        } else if (id < 7110753) {
            return 'Bounty'
        } else if (id < 7200000) {
            return 'WeekDungeon'
        } else if (id < 7310000) {
            return 'Raid'
        } else if (id < 7320000) {
            return 'WorldRaid'
        } else if (id < 7640000) {
            return 'SchoolDungeon'
        } else if (id < 7720000) {
            return 'Event701'
        } else if (id < 7900000) {
            return 'TimeAttack'
        } else if (id > 600000000) {
            return 'Raid'
        } else {
            return 'Event'
        }
    }
}

class SkillDamageInfo {

    rows
    element
    character
    tsa

    constructor(skill, container, character, tsa = null) {
        this.skill = skill
        this.container = container
        this.character = character
        this.tsa = tsa

        if (skill.IsRaidSkill) {
            this.maxLevel = 1
        } else if (skill.IsSummonSkill) {
            this.maxLevel = 5
            switch (skill.SkillType) {
                case 'autoattack':
                    this.maxLevel = 1
                    break
                default:
                    this.maxLevel = 5
            }
        } else {
            switch (skill.SkillType) {
                case 'ex':
                    this.maxLevel = 5
                    break
                case 'autoattack':
                    this.maxLevel = 1
                    break
                default:
                    this.maxLevel = 10
            }
        }

        this.skillLevel = this.maxLevel
        this.stackCount = 1
        if (skill.EffectCombine !== undefined) {
            this.stackTypes = skill.EffectCombine            
            this.stackMax = 0
            this.stackEffectIndex = {}

            //map the effect index to each stack
            skill.Effects.forEach((effect, index) => {
                if (this.stackTypes.includes(effect.Type) && (!skill.IsRaidSkill || effect.RestrictTo.includes(character.Id))) {
                    let indexKey = effect.Type + (effect.CombineGroup !== undefined ? `_${effect.CombineGroup}` : '')
                    
                    if (this.stackEffectIndex[indexKey] == undefined) {
                        this.stackEffectIndex[indexKey] = []
                    }
                    this.stackEffectIndex[indexKey].push(index)
                    this.stackMax = Math.max(this.stackMax, this.stackEffectIndex[indexKey].length)
                }
            })
            
        } else {
            this.stackMax = 1
            this.stackTypes = []
            this.stackEffectIndex = {}
        }
        this.render()

    }

    /**
     * 
     * @param {CharacterStats} studentStats 
     * @param {CharacterStats} enemyStats 
     */
    update(studentStats, enemyStats, terrain) {
        //update all dynamic rows
        this.rows.forEach((row) => {
            this.element.find(`.row-value[data-key="${row.effectId}-${row.key}"]`).text(row.valueFunc(this.skill.Effects[row.effectId]))
        })

        //calculate final exp. dmg/healing
        this.skill.Effects.forEach((effect, index) => {

            if (this.stackTypes.includes(effect.Type)) {
                let indexKey = effect.Type + (effect.CombineGroup !== undefined ? `_${effect.CombineGroup}` : '')
                if (this.stackEffectIndex[indexKey][this.stackCount-1] != index) {
                    this.element.find(`div[data-effect-index="${index}"]`).hide()
                } else {
                    this.element.find(`div[data-effect-index="${index}"]`).show()
                }
            }

            if (effect.Type.startsWith('DMG') || effect.Type == "FormChange") {
                let scaleTotal
                let hitTotal // this is the total number of hits
                let hitFullDamage = false // hits are full (10000) damage hits
                let scaleToUse = effect.Scale

                if (effect.SubstituteCondition !== undefined) {
                    if (this.checkSubstitutionCondition(effect.SubstituteCondition, studentStats, enemyStats)) {
                        scaleToUse = effect.SubstituteScale
                    }
                }

                switch (effect.Type) {
                    case "FormChange":
                        if (scaleToUse === undefined) {
                            scaleTotal = effect.Hits.reduce((sum, d) => sum + d, 0)
                        } else {
                            scaleTotal = scaleToUse[this.skillLevel-1]
                        }
                        hitTotal = effect.Hits.length
                        break
                    
                    case "DMGMulti":
                        scaleTotal = scaleToUse[this.skillLevel-1]
                        hitTotal = effect.Hits.length
                        if (effect.Hits.find(d => d == 10000) !== undefined) hitFullDamage = true
                        break
                         
                    case "DMGZone":
                        scaleTotal = scaleToUse[this.skillLevel-1]
                        hitFullDamage = true
                        if (effect.ZoneDuration) {
                            hitTotal = Math.ceil(effect.ZoneDuration / effect.ZoneHitInterval)
                            if (effect.Hits) hitTotal *= effect.Hits.length
                        } else {
                            hitTotal = effect.HitFrames.length
                        }
                        break

                    default:
                        scaleTotal = scaleToUse[this.skillLevel-1]
                        hitTotal = 1
                        break
                }

                const hitsSub = hitFullDamage ? 1 : hitTotal
                const hitsFull = hitFullDamage ? hitTotal : 1

                const sourceStat = effect.SourceStat !== undefined ? effect.SourceStat : 'AttackPower'
                const critChance = effect.CriticalCheck == 'Never' ? 0 : studentStats.getCriticalRate(enemyStats.getTotal("CriticalChanceResistPoint"))
                const critBonusMod = ((studentStats.getTotal('CriticalDamageRate') - enemyStats.getTotal('CriticalDamageResistRate')) / 10000) - 1
                const stabMod = (effect.ApplyStability === false) ? 1 : studentStats.getStabilityMinDamageMod()

                let baseDmgMax, critBonusDmgMax, hitRate, suffix, expDmgMax, expDmgMin, avgDmg

                hitRate = (this.skill.IsRaidSkill && effect.CanEvade === false) ? 1 : studentStats.getHitChance(enemyStats.getTotal("DodgePoint"))
                suffix = (effect.Type == 'DMGDot' ? ' / ' + translateUI('time_seconds', [effect.Period / 1000]) : "")

                if (effect.ExtraDamageSource) {
                    
                    let srcStats, sourceMaxValue
                    switch (effect.ExtraDamageSource.Side) {
                        case "Self": 
                            srcStats = studentStats
                            break;
                        case "Target":
                            srcStats = enemyStats
                            break;
                        default:
                            throw new Error("Unrecognised damage source target side")
                    }

                    switch (effect.ExtraDamageSource.Stat) {
                        case "CurrentHP": 
                            sourceMaxValue = srcStats.getTotal('MaxHP')
                            break;
                        default:
                            throw new Error("Unrecognised damage source stat")
                    }

                    if (effect.ExtraDamageSource.SimulatePerHit) {

                        let sourceInitialValue = sourceMaxValue * (this.optionValue)

                        baseDmgMax = 0
                        critBonusDmgMax = 0
                        avgDmg = 0

                        for (let pass = 0; pass < effect.Hits.length; pass++) {

                            let sourceCurrentValue = Math.max(sourceInitialValue - avgDmg, 0)
    
                            let multiplier = (effect.ExtraDamageSource.Multiplier[0] + (effect.ExtraDamageSource.Multiplier[1] - effect.ExtraDamageSource.Multiplier[0]) * (sourceCurrentValue / sourceMaxValue))
    
                            let hitDmgMax = studentStats.calculateDamage(enemyStats, scaleTotal * (effect.Hits[pass] / 10000) * multiplier, sourceStat, terrain, 0, ("IgnoreDef" in effect ? effect.IgnoreDef[this.skillLevel-1] : 10000))
                            let hitCritBonusDmg = hitDmgMax * critBonusMod

                            critBonusDmgMax += hitCritBonusDmg
                            baseDmgMax += hitDmgMax

                            if (effect.CriticalCheck == 'Always') {
                                hitDmgMax = (hitDmgMax + hitCritBonusDmg)
                            } else {
                                hitDmgMax = (hitDmgMax + (hitCritBonusDmg * critChance))
                            }

                            let hitDmgMin = hitDmgMax * stabMod
    
                            
                            avgDmg += (hitDmgMin + hitDmgMax) * hitRate / 2
                        }

                        baseDmgMax = baseDmgMax / effect.Hits.length
                        critBonusDmgMax = critBonusDmgMax / effect.Hits.length
                    }
                    
                } else {
                    baseDmgMax = studentStats.calculateDamage(enemyStats, (scaleTotal / hitsSub), sourceStat, terrain, 0, ("IgnoreDef" in effect ? effect.IgnoreDef[this.skillLevel-1] : 10000))
                    critBonusDmgMax = baseDmgMax * critBonusMod

                    if (effect.CriticalCheck == 'Always') {
                        expDmgMax = (baseDmgMax + critBonusDmgMax) * hitsSub * hitsFull
                    } else {
                        expDmgMax = (baseDmgMax + (critBonusDmgMax * critChance)) * hitsSub * hitsFull
                    }
                    expDmgMin = expDmgMax * stabMod
                    avgDmg = (expDmgMin + expDmgMax) * hitRate / 2
                }

                let scalingText = `${parseFloat((scaleTotal/100).toFixed(2)).toLocaleString()}%`
                if (hitsFull > 1) scalingText += ` &times; ${hitsFull}`
                if (hitsSub > 1) scalingText += ` / ${translateUI('dmginfo_numhits', [hitsSub])}`
                this.element.find(`.row-value[data-key="${index}-scaling"]`).html(scalingText)
                if (effect.CriticalCheck != 'Always') {
                    this.element.find(`.row-value[data-key="${index}-dmg-range"]`).text(`${parseInt(baseDmgMax*stabMod).toLocaleString()} ~ ${parseInt(baseDmgMax).toLocaleString()}${suffix}`)
                }
                this.element.find(`.row-value[data-key="${index}-dmg-range-crit"]`).text(`${parseInt((baseDmgMax+critBonusDmgMax)*stabMod).toLocaleString()} ~ ${parseInt(baseDmgMax+critBonusDmgMax).toLocaleString()}`)

                if (this.skill.IsRaidSkill) {
                    let rateText = (effect.CanEvade === false) ? translateUI("hit_chance_certain") : studentStats.getHitChanceString(enemyStats.getTotal("DodgePoint"))
                    this.element.find(`.row-value[data-key="${index}-hitrate"]`).html(rateText)
                    rateText += ` / <span class="text-crit">${effect.CriticalCheck != 'Always' ? studentStats.getCriticalHitChanceString(enemyStats.getTotal("CriticalChanceResistPoint")) : "100%"}</span>`
                    this.element.find(`.row-value[data-key="${index}-hitcritrate"]`).html(rateText)

                    const studentHP = enemyStats.getTotal('MaxHP')
                    this.element.find(`.row-value[data-key="${index}-dmg-final-avg"]`).html(((baseDmgMax * hitsSub * hitsFull) >= studentHP ? '<i class="me-2 fa-solid fa-skull"></i>' : '') + parseInt(avgDmg).toLocaleString())  
                } else {
                    this.element.find(`.row-value[data-key="${index}-dmg-final-avg"]`).text(parseInt(avgDmg).toLocaleString())
                }
                
                if (this.skill.SkillType == 'autoattack' || effect.Type == "FormChange") {
                    const speedMod = 10000 / studentStats.getTotal('AttackSpeed')

                    const attackFrames = Math.ceil(effect.Frames.AttackIngDuration * speedMod)
                    const attackDelayFrames = Math.ceil(effect.Frames.AttackBurstRoundOverDelay * speedMod)
                    const reloadFrames = Math.ceil(effect.Frames.AttackReloadDuration * speedMod)
                    const startDelay = Math.ceil(effect.Frames.AttackStartDuration * speedMod)
                    const endDelay = Math.ceil(effect.Frames.AttackEndDuration * speedMod)

                    const attackCount = studentStats.getTotal('AmmoCount') / this.character.AmmoCost

                    const attackFramesString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(attackFrames / 30, 2), attackFrames])}</b>`
                    const attackDelayFramesString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(attackDelayFrames / 30, 2), attackDelayFrames])}</b>`
                    const startDelayString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(startDelay / 30, 2), startDelay])}</b>`
                    const reloadFramesString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(reloadFrames / 30, 2), reloadFrames])}</b>`
                    const endDelayString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(endDelay / 30, 2), endDelay])}</b>`
                    const ignoreDelayMod = effect.IgnoreDelay !== undefined ? effect.IgnoreDelay[this.skillLevel-1] + 1 : 1

                    this.element.find(`.row-value[data-key="${index}-auto-duration"]`).text(`${translateUI('time_seconds', [MathHelper.toFixedFloat((attackFrames + attackDelayFrames) / 30, 2)])} / ${translateUI('normalattack_burst')}`).tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('dmginfo_rate_of_fire_tooltip', [attackFramesString, attackDelayFramesString])), placement: 'top', html: true})
                    
                    let totalCycleFrames
                    if (this.character.Id == 10004) {
                        //Hina reload skill
                        const skillFrames = 85
                        totalCycleFrames = ignoreDelayMod * (skillFrames + (attackFrames * attackCount)) + (attackDelayFrames * Math.ceil(attackCount-1)) 
                        this.element.find(`.row-value[data-key="${index}-auto-reload"]`).text(translateUI('time_seconds', [MathHelper.toFixedFloat(skillFrames / 30, 2)])).tooltip('dispose').tooltip({title: getBasicTooltip(`<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(skillFrames / 30, 2), skillFrames])}</b>`), placement: 'top', html: true})
                    } else {
                        totalCycleFrames = ignoreDelayMod * (startDelay + reloadFrames + endDelay + (attackFrames * attackCount)) + (attackDelayFrames * Math.ceil(attackCount-1)) 
                        this.element.find(`.row-value[data-key="${index}-auto-reload"]`).text(translateUI('time_seconds', [MathHelper.toFixedFloat((startDelay + reloadFrames + endDelay) / 30, 2)])).tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('dmginfo_reload_time_tooltip', [reloadFramesString, startDelayString, endDelayString])), placement: 'top', html: true})
                    }

                    this.element.find(`.row-value[data-key="${index}-auto-dps"]`).text(parseFloat((((expDmgMin + expDmgMax) / 2) * attackCount * ignoreDelayMod / (totalCycleFrames / 30)).toFixed(2)).toLocaleString())

                }
                
            } else if (effect.Type.startsWith('Heal')) {
                const healTotal = studentStats.calculateHealing(effect.Scale[this.skillLevel-1] / 10000)
                const healEffectiveTotal = studentStats.calculateHealing(effect.Scale[this.skillLevel-1] / 10000, studentStats.getTotal('HealEffectivenessRate'))
                const suffix = (effect.Type == 'HealDot' ? ' / ' + translateUI('time_seconds', [effect.Period / 1000]) : "")

                let scalingText = `${parseFloat((effect.Scale[this.skillLevel-1]/100).toFixed(2)).toLocaleString()}%`
                if (effect.Type == "HealZone") scalingText += ` &times; ${effect.HitFrames.length}`

                this.element.find(`.row-value[data-key="${index}-scaling"]`).html(scalingText)
                this.element.find(`.row-value[data-key="${index}-heal-total"]`).html(`<span class="text-heal">${healTotal.toLocaleString() + (healEffectiveTotal > healTotal ? ` (<img src="images/buff/Buff_HealEffectiveness.webp" style="height: 22px;">${healEffectiveTotal.toLocaleString()})` : '')}</span>` + suffix)
            } else if (effect.Type == 'Shield') {
                const shieldTotal = studentStats.calculateHealing(effect.Scale[this.skillLevel-1] / 10000)
                this.element.find(`.row-value[data-key="${index}-scaling"]`).text(`${parseFloat((effect.Scale[this.skillLevel-1]/100).toFixed(2)).toLocaleString()}%`)
                this.element.find(`.row-value[data-key="${index}-heal-total"]`).text(shieldTotal.toLocaleString())

            } else if (effect.Type.startsWith('CrowdControl')) {
                const ccDuration = parseFloat((effect.Scale[this.skillLevel-1] / 1000).toFixed(2))
                const ccGaugeFill = parseFloat((effect.Scale[this.skillLevel-1] * ((100 + studentStats.getTotal("OppressionPower") - enemyStats.getTotal("OppressionResist")) / 100)  / 1000).toFixed(2))
                const modifiedChance = Math.min(Math.max(parseFloat((effect.Chance * (1 + studentStats.getTotal("OppressionPower")/100 - enemyStats.getTotal("OppressionResist")/100) / 100).toFixed(2)), 0), 100)
                this.element.find(`.row-value[data-key="${index}-cc-chance"]`).text(`${modifiedChance}%`)

                let ccDurationText = translateUI('time_seconds', [ccDuration])
                if (!this.skill.IsRaidSkill) ccDurationText += ` (${translateUI('time_seconds', [ccGaugeFill])})`
                this.element.find(`.row-value[data-key="${index}-cc-duration"]`).text(ccDurationText)
            } else if (effect.Type.startsWith('Accumulation')) {
                const accumulateDMGLimit = studentStats.calculateAccumulateDamageLimit(enemyStats, effect.Scale[this.skillLevel-1], 'AttackPower', terrain)
                this.element.find(`.row-value[data-key="${index}-accumulation-scaling"]`).text(`${MathHelper.toFixedFloat(effect.Scale[this.skillLevel-1]/100, 2).toLocaleString()}%`)
                this.element.find(`.row-value[data-key="${index}-accumulation-limit"]`).text(`${parseInt(accumulateDMGLimit).toLocaleString()}`)
            }
        })
    }

    changeSkillLevel(level) {
        this.skillLevel = parseInt(level)
        if (this.skill.SkillType == 'ex') {
            this.element.find(`.skill-cost`).text(this.skill.Cost[this.skillLevel-1])
        }
        this.element.find(`.ba-slider-label.skill-level`).html(this.skillLevel == this.maxLevel ? '<img src="images/ui/ImageFont_Max.png">' : `Lv.${this.skillLevel}`)
        this.element.find(`.skill-description`).html(getSkillText(this.skill, this.skillLevel, {renderBuffs: false, renderSkillHits: false, bulletType: this.character.BulletType}))
        //calculateSkills()
        this.update(statPreviewCharacterStats, statPreviewSelectedEnemyStats, statPreviewTerrain)
    }

    changeOptionValue(value, effectId) {
        const src = this.skill.Effects[effectId].ExtraDamageSource
        this.optionValue = value
        const labelValue = MathHelper.toFixedFloat(src.SliderLabel[0] + (src.SliderLabel[1] - src.SliderLabel[0]) * value, 2)
        this.element.find(`.skill-option-label`).text(labelValue + src.SliderLabelSuffix)
        this.update(statPreviewCharacterStats, statPreviewSelectedEnemyStats, statPreviewTerrain)
    }

    toggleStackCount(count) {
        if (count !== undefined) {
            this.stackCount = count
        } else if (++this.stackCount > this.stackMax) {
            this.stackCount = 1
        }

        if (this.skill.EffectCombineLabel !== undefined) {
            let imageHtml = ''
            let labelText = `&times;${this.stackCount}`

            if (this.skill.EffectCombineLabel.Icon !== undefined) {
                const imgPath = this.skill.EffectCombineLabel.Icon[Math.min(this.skill.EffectCombineLabel.Icon.length-1, this.stackCount-1)]
                imageHtml = `<img class="stack-icon ${imgPath.startsWith('skill') ? "invert-light" : ""}" src="images/${imgPath}">`
            }

            if (this.skill.EffectCombineLabel.StackLabelTranslated !== undefined) {
                labelText = translateUI(this.skill.EffectCombineLabel.StackLabelTranslated[this.stackCount-1])
            } else if (this.skill.EffectCombineLabel.StackLabel !== undefined) {
                labelText = this.skill.EffectCombineLabel.StackLabel[this.stackCount-1]
            } else if (this.skill.EffectCombineLabel.StackStartAt !== undefined) {
                labelText = `&times;${this.skill.EffectCombineLabel.StackStartAt + this.stackCount - 1}`
            }

            if (this.skill.EffectCombineLabel.DisableFirst) {
                this.element.find(`.ba-slider-label.stack-toggle`).toggleClass('deactivated', this.stackCount == 1)
            }
            
            this.element.find(`.ba-slider-label.stack-toggle`).html(imageHtml + `<span class="label ${imageHtml == '' ? '' : 'ps-1'}">${labelText}</span>`)
        } else {
            this.element.find(`.ba-slider-label.stack-toggle .label`).html(`&times;${this.stackCount}`)
        }

        this.skill.Effects.forEach((effect, index) => {
            if (this.stackTypes.includes(effect.Type)) {
                let indexKey = effect.Type + (effect.CombineGroup !== undefined ? `_${effect.CombineGroup}` : '')
                if (this.stackEffectIndex[indexKey][this.stackCount-1] != index) {
                    this.element.find(`div[data-effect-index="${index}"]`).hide()
                    return
                } else {
                    this.element.find(`div[data-effect-index="${index}"]`).show()
                }
            }
        })
    }

    render() {
        this.rows = []
        let html = '', controlsHtml = ''
        let skillUniqueKey = this.skill.Id ? this.skill.Id : `${this.character.DevName}${this.skill.SkillType}`

        let iconPath, iconClass
        if (!this.skill.IsRaidSkill || this.skill.Icon.startsWith('COMMON_')) {
            iconPath = `images/skill/${this.skill.Icon}.webp`
            iconClass = `bg-atk-${this.character.BulletType.toLowerCase()}`
        } else {
            iconPath = `images/raid/skill/${this.skill.Icon}.png`
            iconClass = ''
        } 
        
        html += `
        <div class="p-2 ba-panel mb-2 skill-info-${this.skill.SkillType}${this.tsa ? ' skill-info-tsa' : ''}" data-skill-key="${skillUniqueKey}">
        <div class="d-flex flex-column">
            <div class="d-flex flex-row align-items-start mb-1 gap-3">
                <div class="skill-icon ${iconClass} small ${this.skill.SkillType == 'gearnormal' ? 'plus' : ''}">
                    <img src="${iconPath}">
                </div>
                <div class="flex-fill">
                    <h5 class="mb-0 me-2">${this.skill.Name}</h5>`
        if (this.skill.SkillType == 'ex') {
            html += `<small class="text-italic">${translateUI(`student_skill_ex`)}・ COST: <span class="skill-cost text-bold">${this.skill.Cost[this.skillLevel-1]}</span></small>`
        } else if (this.skill.SkillType != 'autoattack' && !this.skill.IsRaidSkill) {
            html += `<small class="text-italic">${translateUI(`student_skill_${this.skill.SkillType.toLowerCase()}`)}</small>`
        }

        if (!this.skill.IsRaidSkill) {
            html += `<p class="mb-0 mt-1 skill-description" style="font-size: 0.875rem; line-height: 1rem;">${getSkillText(this.skill, this.skillLevel, {renderBuffs: false, renderSkillHits: false, bulletType: this.character.BulletType})}</p>`
        } else {
            html += `<p class="mb-0 mt-1 skill-description" style="font-size: 0.875rem; line-height: 1rem;">${getSkillText(this.skill, this.skill.RaidDifficulty + 1, {renderBuffs: false, renderSkillHits: false, bulletType: null})}</p>`
        }
        html += `
                </div>
            </div>
            <div class="skill-calculation mb-2">`

        this.skill.Effects.forEach((effect, index) => {

            if (effect.RestrictTo !== undefined && !effect.RestrictTo.includes(this.character.Id)) return

            html += `<div data-effect-index="${index}">`
            if (effect.Type.startsWith('DMG') || effect.Type == "FormChange") {
                html += this.addSeparator()
                const formChangeIcon = effect.Type == "FormChange" && !effect.HideFormChangeIcon ? getBuffTag('Special', 'FormChange', {tooltip: false, overrideName: getLocalizedString("BuffNameLong", "Special_FormChange")}) + ' ' : ''

                if (effect.Type != 'DMGDot' && effect.Type != 'DMGByHit') {

                    const sourceStat = effect.SourceStat !== undefined ? effect.SourceStat : 'AttackPower'
                    html += this.addStaticRow(index, `${formChangeIcon} ${getLocalizedString("Stat", sourceStat)} %`, '', 'scaling') 

                    if ("IgnoreDef" in effect) {
                        html += this.addDynamicRow(index, translateUI('dmginfo_ignore_def'), (ef) => {return `${(10000 - ef.IgnoreDef[this.skillLevel-1])/100}%`}, 'ignore-def') 
                    }

                    if (effect.Type == 'DMGMulti' || effect.Type == 'DMGZone' || (effect.Type == "FormChange" && effect.Hits.length > 0)) {

                        if (effect.CriticalCheck != 'Always') {
                            html += this.addStaticRow(index, translateUI('dmginfo_hit_avg'), '', 'dmg-range')
                        }

                        if (effect.CriticalCheck != 'Never') {
                            html += this.addStaticRow(index, translateUI('dmginfo_hit_avg') + translateUI('dmginfo_crit'), '', 'dmg-range-crit', 'text-crit')
                        }

                        html += this.addSeparator()
                        if (this.skill.IsRaidSkill) {
                            if (effect.CriticalCheck == 'Never') {
                                html += this.addStaticRow(index, translateUI('hit_chance'), '', 'hitrate') 
                            } else {
                                html += this.addStaticRow(index, translateUI('hit_crit_chance'), '', 'hitcritrate') 
                            }
                        }
                        html += this.addStaticRow(index, translateUI('dmginfo_total_avg'), '', 'dmg-final-avg')
                    } else {

                        if (effect.CriticalCheck != 'Always') {
                            html += this.addStaticRow(index, translateUI('dmginfo_dmg'), '', 'dmg-range')
                        }

                        if (effect.CriticalCheck != 'Never') {
                            html += this.addStaticRow(index, translateUI('dmginfo_dmg') + translateUI('dmginfo_crit'), '', 'dmg-range-crit', 'text-crit')
                        }
                        
                        html += this.addSeparator()
                        if (this.skill.IsRaidSkill) {
                            if (effect.CriticalCheck == 'Never') {
                                html += this.addStaticRow(index, translateUI('hit_chance'), '', 'hitrate') 
                            } else {
                                html += this.addStaticRow(index, translateUI('hit_crit_chance'), '', 'hitcritrate') 
                            }
                        }
                        html += this.addStaticRow(index, translateUI('dmginfo_dmg_avg'), '', 'dmg-final-avg')
                    }
                } else {
                    const dotEffectIcon = getBuffTag('Debuff', effect.Icon, {tooltip: false})
                    html += this.addStaticRow(index, `${dotEffectIcon} ${getLocalizedString("Stat", "AttackPower")} %`, '', 'scaling') 
                    html += this.addStaticRow(index, `${dotEffectIcon} ${translateUI('dmginfo_dmg')}`, '', 'dmg-range')
                }

                if ((this.skill.SkillType == 'autoattack' && this.skill.Effects[0].Frames.AttackIngDuration != 0) || effect.Type == "FormChange") {
                    html += this.addSeparator()

                    html += this.addStaticRow(index, formChangeIcon + translateUI('dmginfo_rate_of_fire'), '', 'auto-duration', 'has-tooltip')
                    html += this.addStaticRow(index, formChangeIcon + translateUI('dmginfo_reload_time'), '', 'auto-reload', 'has-tooltip')
                    html += this.addStaticRow(index, formChangeIcon + translateUI('dmginfo_avg_dps'), '', 'auto-dps')
                }

                if (effect.ExtraDamageSource) {
                    const src = effect.ExtraDamageSource

                    controlsHtml += `<div class="d-flex flex-row align-items-center mt-2 gap-2">`
                    controlsHtml += `<span class="skill-option-name">${getLocalizedString(src.SliderTranslation.split(',')[0], src.SliderTranslation.split(',')[1])}</span>`
                    controlsHtml += `<input type="range" class="skill-option-range form-range flex-fill" value="1" min="0" max="1" step="${src.SliderStep}" data-effect-id="${index}"><span class="ba-slider-label skill-option-label">${src.SliderLabel[1] + src.SliderLabelSuffix}</span>`
                    controlsHtml += `</div>`
                    this.optionValue = 1
                }

            } else if (effect.Type.startsWith('Heal')) {
                html += this.addSeparator()

                if (effect.Type == 'HealDot') {
                    const regenEffectIcon = getBuffTag('Buff', "DotHeal", {tooltip: false})
                    html += this.addStaticRow(index, `${regenEffectIcon} ${getLocalizedString("Stat", "HealPower")} %`, '', 'scaling') 
                    html += this.addStaticRow(index, `${regenEffectIcon} ${translateUI('dmginfo_heal')}`, '', 'heal-total')
                } else {
                    html += this.addStaticRow(index, `${getLocalizedString("Stat", "HealPower")} %`, '', 'scaling') 
                    // if (effect.Type == 'HealZone') {
                    //     html += this.addStaticRow(index, translateUI('dmginfo_heal_count'), effect.HitFrames.length, 'hit-count')
                    // }
    
                    html += this.addStaticRow(index, translateUI('dmginfo_heal_amount'), '', 'heal-total', '') 
                }
            } else if (effect.Type.startsWith('Shield')) {
                const shieldEffectIcon = getBuffTag('Buff', "Shield", {tooltip: false})
                html += this.addSeparator()

                html += this.addStaticRow(index, `${shieldEffectIcon} ${getLocalizedString("Stat", "HealPower")} %`, '', 'scaling') 
                html += this.addStaticRow(index, translateUI('dmginfo_shield_amount', [shieldEffectIcon]), '', 'heal-total', 'text-shield')
            } else if (effect.Type.startsWith('CrowdControl')) {
                const ccEffectIcon = getBuffTag('CC', effect.Icon, {tooltip: false})
                html += this.addSeparator()
                
                html += this.addStaticRow(index, translateUI('dmginfo_cc_effect_chance', [ccEffectIcon]), '', 'cc-chance')

                let durationLabel = translateUI('dmginfo_cc_effect_duration', [ccEffectIcon])
                if (!this.skill.IsRaidSkill) durationLabel += translateUI('dmginfo_cc_effect_gaugefill')

                html += this.addStaticRow(index, durationLabel, '', 'cc-duration')
            } else if (effect.Type.startsWith('Accumulation')) {
                const accumulationEffectIcon = getBuffTag('Special', "Accumulation", {tooltip: false})

                html += this.addSeparator()

                html += this.addStaticRow(index, accumulationEffectIcon + ` ${getLocalizedString("Stat", "AttackPower")} %`, '', 'accumulation-scaling')
                html += this.addStaticRow(index, translateUI('dmginfo_accumulation_limit', [accumulationEffectIcon]), '', 'accumulation-limit')
            }
            html += `</div>`
        })

        html += '</div>'

        if (this.maxLevel > 1 || this.stackMax > 1) {
            html += `<div class="d-flex flex-row align-items-center gap-2">`
            if (this.stackMax > 1) {
                html += `<span class="ba-slider-label stack-toggle ${this.skill.EffectCombineLabel && this.skill.EffectCombineLabel.Icon ? 'wide' : ''}"><span class="label">&times;${this.stackCount}</span></span>`
            }
            if (this.maxLevel > 1) {
                html += `<input type="range" class="skill-level-range form-range flex-fill" value="${this.skillLevel}" min="1" max="${this.maxLevel}"><span class="ba-slider-label skill-level"><img src="images/ui/ImageFont_Max.png"></span>`
            }
            html += `</div>`
        }

        
        $(this.container).append(html + controlsHtml)

        this.element = $(this.container).find(`[data-skill-key="${skillUniqueKey}"]`)
        this.element.find(`.skill-level-range`).on('input', (ev) => {this.changeSkillLevel(ev.currentTarget.value)})
        this.element.find(`.stack-toggle`).on('click', (ev) => {this.toggleStackCount()})

        if (controlsHtml != '') {
            this.element.find(`.skill-option-range`).on('input', (ev) => {this.changeOptionValue(ev.currentTarget.value, ev.currentTarget.dataset["effectId"])})
        }
        
        if (this.stackMax > 1) this.toggleStackCount(1)
    }

    /**
     * 
     * @param {text} html 
     * @param {text} name 
     * @param {function(effect)} valueFunc 
     * @param {text} key 
     */
    addDynamicRow(effectId, name, valueFunc, key, cssClass="") {
        this.rows.push({
            effectId: effectId,
            key: key,
            valueFunc: valueFunc
        })
        return `<div class="d-flex"><span class="row-name">${name}</span><span class="flex-fill"></span><span class="row-value ${cssClass}" data-key="${effectId + '-' + key}"></span></div>`
    }

    addStaticRow(effectId, name, value, key, cssClass="") {
        return `<div class="d-flex"><span class="row-name">${name}</span><span class="flex-fill"></span><span class="row-value ${cssClass}" data-key="${effectId + '-' + key}">${value}</span></div>`
    }

    addSeparator() {
        return `<div class="ba-panel-separator my-2"></div>`
    }

    checkSubstitutionCondition(condition, studentStats, enemyStats) {
        switch (condition) {
            //GearPublic skill is unlocked
            case "GearPublic":
                return (statPreviewGearLevel >= 2 && this.character.Gear.Released !== undefined && this.character.Gear.Released[regionID])
            case "TargetIsStructure":
                return (enemyStats.armorType == "Structure")
            default:
                console.log(`Unknown substitution condition ${effect.SubstituteCondition}`)
                return false
        }
    }
}

/** Functions */

let loadPromise = loadJSON(Object.assign(json_list, json_lang_list, json_server_list), result => {
    data = result
})

if (localStorage.getItem("theme")) {
    applyThemeToBody(localStorage.getItem("theme"))
}

//$("#ba-navbar-logo").load("./images/logo_schalegg.svg")
$("#ba-navbar-logo").html("<img src='./images/logo_pixel.png'>")

$.when($.ready, loadPromise).then(function() {

    //service worker
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
    }

    //gtag settings
    gtag('config', 'G-XQEWDXR13H', {
        'custom_map': {
            'dimension1': 'user_language' 
        },
    })

    //load student settings
    statPreviewSettingsLoad()

    //load saved student collection
    if (localStorage.getItem("student_collection")) {
        studentCollection = JSON.parse(localStorage.getItem("student_collection"))
    }

    //load enemy bookmarks
    if (localStorage.getItem("enemy_bookmarks")) {
        statPreviewEnemyBookmarks = JSON.parse(localStorage.getItem("enemy_bookmarks"))
    }

    //load saved skill level range
    if (localStorage.getItem("student_skill_ex_level")) {
        skillPreviewExSkillLevel = JSON.parse(localStorage.getItem("student_skill_ex_level"))
    }

    if (localStorage.getItem("student_skill_other_level")) {
        skillPreviewOtherSkillLevel = JSON.parse(localStorage.getItem("student_skill_other_level"))
    }

    if (localStorage.getItem("student_skill_show_summons")) {
        skillPreviewShowSummonSkills = JSON.parse(localStorage.getItem("student_skill_show_summons"))
    }

    //Bootstrap sanitiser config
    let bsAllowList = bootstrap.Tooltip.Default.allowList
    bsAllowList.ruby = []
    bsAllowList.rt = []
    bsAllowList.rp = []

    loadRegion(regionID)

    setSortedDataLists()
    EnemyFinder.generateEnemyList()
    populateStudentSkillFilters()

    if (localStorage.getItem("theme")) {
        darkTheme = localStorage.getItem("theme")
    } else {
        darkTheme = 'auto'
    }

    if (localStorage.getItem("cheat_code")) {
        pixelMode = (localStorage.getItem("cheat_code") == "true")
    } else {
        pixelMode = false
    }
    
    if (pixelMode) {
        setPixelTheme()
    } else {
        toggleDarkTheme(darkTheme)
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (darkTheme == 'auto' && !pixelMode) {
            applyThemeToBody('auto')
        }
    })

    if (localStorage.getItem("high_contrast")) {
        highContrast = (localStorage.getItem("high_contrast") == "true")
    } else {
        highContrast = (!CSS.supports('backdrop-filter', 'blur(1px)')) || window.matchMedia('(prefers-contrast: more)').matches 
    }

    $('body').toggleClass("high-contrast", highContrast)

    //prevent tooltips from sticking on buttons 
    $('body').on('click', '.tooltip-button', e => {
        if (e.originalEvent.pointerType == "touch") {
            $(".tooltip").tooltip("hide")
        }
    }).on('mouseleave', '.tooltip-button', (e) => {
        $(".tooltip").tooltip("hide")
    })
    
    $(`#ba-navbar-regionselector span`).text(getLocalizedString("ServerName", ''+regionID))
    $(`#ba-navbar-regionselector-${regionID}`).addClass("active")
    $(`#ba-navbar-languageselector span`).text($(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).text())
    $(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).addClass("active")
    $(`#ba-navbar-contrast-toggle-${highContrast}`).addClass("active")

    $('#ba-navbar-search').on('input', function() {
        if (searchDelayTimeout) {
            clearTimeout(searchDelayTimeout)
        }
        searchDelayTimeout = setTimeout(allSearch, searchDelay)
    }).on('keydown', searchNavigate).on('keyup', searchNavigate)

    $('#navbar-search-clear').on('click', function() {
        $('#'+this.dataset.target).val('').trigger('blur')
        allSearch()
        $(this).hide()
    })

    const urlVars = new URL(window.location.href).searchParams
    const showLinks = urlVars.has("links")

    //populate Changelog
    let changelogHtml = ""
    $.each(data.config.Changelog, function(i, el) {
        changelogHtml += `<h5 class="text-emphasis px-2">${el.date}</h5>`
        changelogHtml += '<div class="p-2 mb-3">'
        for (let j = 0; j < el.contents.length; j++) {
            changelogHtml += `<div>${el.contents[j]}</div>`
        }
        changelogHtml += '</div>'
    })
    $("#modal-changelog-content").html(changelogHtml)
    

    $('#modal-links').on('show.bs.modal', function (e) {
        let html = ''
        data.config.links.forEach(section => {
            html += `<h4>${section.section}</h4>`
            section.content.forEach(content => {
                html += `<p><a href="${content.url}">${content.title} <i class="fa-solid fa-external-link"></i></a> <small class="ms-1">by ${content.author}</small><br/>${content.description}</p>`
            })
        })
        $('#modal-links-content').html(html)
    })

    if (showLinks) {
        $("#modal-links").modal('show')
    } else {
        const currentChangelog = parseInt(data.config.Changelog[0].date.replace(/\//g,''))

        if (localStorage.getItem("changelog_seen")) {
            if (currentChangelog > parseInt(localStorage.getItem("changelog_seen"))) {
                $("#modal-changelog").modal('show')
                localStorage.setItem("changelog_seen", currentChangelog)
            } 
        } else {
            $("#modal-changelog").modal('show')
            localStorage.setItem("changelog_seen", currentChangelog)
        }
    }

    //Keyboard Shortcut for search
    $(document).on('keydown', function(e) {

        // Esc: Defocus current input field
        if (e.code === 'Escape') {
            $('input:focus').trigger('blur')
            $('#ba-navbar-content').collapse('hide')
        }

        // Combination keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {

            // Ctrl + K: Search
            if (e.code === 'KeyK') {
                focusSearch()
                e.preventDefault()
            }

        }

        // Ignore single key shortcuts if an input is focused
        if ($('input:focus').length) return

        switch (e.code) {
            case 'Slash':
                focusSearch()
                e.preventDefault()
                break
            case 'KeyL':
                if (loadedModule === 'students' && !$('#ba-student-modal-students').hasClass('show')) {
                    $('#ba-student-modal-students').modal('show', 'shortcut')
                }
                e.preventDefault()
                break
        }

        function focusSearch() {
            if ($('#ba-student-modal-students').hasClass('show')) {
                $('#ba-student-search-text').trigger('focus')
            } else {
                $('#ba-navbar-content').collapse('show')
                $('#ba-navbar-search').trigger('focus')
            }
        }

        
    })

    //Import/Export controls
    $('#collection-import-string').on('input', function(e) {
        if ($('#collection-import-string').val() != "") {
            const newCollection = parseImport($('#collection-import-string').val())
            if (newCollection == null) {
                $('#collection-import-status').html(`<i class="fa-solid fa-circle-xmark me-2 text-negative"></i>${translateUI('collection_import_status_invalid')}`)
                $('#collection-data-import-btn').attr('disabled', true)
            } else {
                console.log(newCollection)
                $('#collection-import-status').html(`<i class="fa-solid fa-circle-check me-2 text-positive"></i>${translateUI('collection_import_status_valid', [Object.keys(newCollection).length])}`)
                $('#collection-data-import-btn').attr('disabled', false)
            }
        } else {
            $('#collection-import-status').empty()
            $('#collection-data-import-btn').attr('disabled', true)
        }
    })
    $('#collection-data-import-btn').on('click', function(e) {importCollection(parseImport($('#collection-import-string').val()))})
    $('#collection-data-export-btn').on('click', function(e) {exportDataString('#collection-export-string')})

    if (urlVars.get("importcollection")) {
        try {
            let collectionNew = {}
            const importCharacters = urlVars.get("importcollection").split('__')
            importCharacters.forEach(charDataString => {
                if (charDataString != '') {
                    const charData = charDataString.split('_')
                    collectionNew[charData[0]] = {
                        s: parseInt(charData[1]),
                        l: parseInt(charData[2]),
                        e1: parseInt(charData[3]),
                        e2: parseInt(charData[4]),
                        e3: parseInt(charData[5]),
                        ws: parseInt(charData[6]),
                        wl: parseInt(charData[7]),
                        b: parseInt(charData[8]),
                        s3: parseInt(charData[9]),
                        lock: false
                    }
                }
            })
            importCollection(collectionNew)
        } catch (err) {
            console.log(err)
            toastMessage(`<i class="fa-solid fa-circle-xmark me-2"></i>${translateUI('toast_import_failure')}`, 2500, 'failure')
        }
        
    }

    $(window).on('popstate', () => loadModuleFromURL(false))
    loadModuleFromURL(true)
    
})

/**
 * Loads the module based on the present query string parameter. If no query string is present then loads the last module the user visited
 */
function loadModuleFromURL(loadlast) {
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
        if (loadlast) loadLastModule()
        else loadModule('home')
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
    if (loadObserver) loadObserver.disconnect()
    $('.modal').not('#modal-changelog').modal('hide')
    clearInterval(eventRefreshInterval)
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

            generateStatTable('#ba-student-stat-table', studentStatList, 6)
            generateStatTable('#ba-student-stat-modal-table', studentStatListFull, 12, 1)
            generateStatTable('#ba-weapon-stat-table', ['AttackPower', 'MaxHP', 'HealPower'], 6)

            generateStatTable('#calculation-enemy-stat-table', enemyCalculationStatList, 6)

            statPreviewViewSupportStats = false
            compareMode = false
            updateCompareModeControl()
            selectCompareMode = false

            $('#ba-statpreview-levelrange').val(statPreviewLevel)
            changeStatPreviewLevel(document.getElementById('ba-statpreview-levelrange'), false)
            $('#ba-statpreview-weapon-range').val(statPreviewWeaponLevel)
            $('#ba-statpreview-gear1-range').val(statPreviewEquipment[0])
            $('#ba-statpreview-gear2-range').val(statPreviewEquipment[1])
            $('#ba-statpreview-gear3-range').val(statPreviewEquipment[2])
            $('#ba-statpreview-gear4-range').val(statPreviewGearLevel)

            for (const stat in statPreviewPotentialLevel) {
                $(`#ba-statpreview-potential-${stat.toLowerCase()}-range`).val(statPreviewPotentialLevel[stat])
            }

            $('#ba-statpreview-passiveskill-range').val(statPreviewPassiveLevel)
            $('#ba-statpreview-summon-range').val(statPreviewExLevel)
            $('#calculation-enemy-level input').val(statPreviewSelectedEnemyLevel)
            $('#calculation-enemy-level input').on('change', function(e) {
                const level = parseInt(this.value)
                if (!isNaN(level)) {
                    statPreviewSelectedEnemyLevel = MathHelper.clamp(level, parseInt(this.min), parseInt(this.max))
                } else {
                    statPreviewSelectedEnemyLevel = 1
                }
                this.value = statPreviewSelectedEnemyLevel
                calculateEnemyStats()
            }).on('click', (e) => {e.currentTarget.select()})
            $('#calculation-enemy-level').toggleClass('disabled', statPreviewSelectedEnemyLevelFixed)

            $('#calculation-enemy-floor input').on('change', function(e) {

            })

            $('#skill-calculation-tab-student').on('click', calculateSkills)
            $('#skill-calculation-tab-enemy').on('click', calculateRaidSkills)

            $("#ba-skillpreview-exrange").val(skillPreviewExSkillLevel)
            $("#ba-skillpreview-range").val(skillPreviewOtherSkillLevel)

            $('#skills-show-upgrades').toggleClass('deactivated', !showSkillUpgrades).on('click', function (e) {
                showSkillUpgrades = !showSkillUpgrades
                $(this).toggleClass('deactivated', !showSkillUpgrades)
                recalculateSkillPreview()
            })

            $('.extra-skills.collapse').on('show.bs.collapse', function() {
                $(`[data-bs-target="#${this.id}"] .fa-angle-down`).toggleClass('fa-rotate-180', true)
                skillPreviewShowSummonSkills[this.dataset.type] = true
                localStorage.setItem("student_skill_show_summons", JSON.stringify(skillPreviewShowSummonSkills))
            }).on('hide.bs.collapse', function() {
                $(`[data-bs-target="#${this.id}"] .fa-angle-down`).toggleClass('fa-rotate-180', false)
                skillPreviewShowSummonSkills[this.dataset.type] = false
                localStorage.setItem("student_skill_show_summons", JSON.stringify(skillPreviewShowSummonSkills))
            })

            for (const skillType in skillPreviewShowSummonSkills) {
                $(`#skill-${skillType}-extra-skills`).toggleClass('show', skillPreviewShowSummonSkills[skillType])
            }

            $('#skill-show-details').on('click', function(e) {
                $('#student-stat-modal-skill-calc-toggle').toggleClass('deactivated', false)
                $('#ba-student-stat-modal-table').hide()
                $('#student-stat-modal-skill-calculations').show()
                $('#statpreview-tab-calculations').tab('show')
                $('#ba-student-modal-statpreview').modal('show')
            })

            $('#ba-statpreview-status-options').on('click', function(e) {
                $('#student-stat-modal-skill-calc-toggle').toggleClass('deactivated', true)
                $('#ba-student-stat-modal-table').show()
                $('#student-stat-modal-skill-calculations').hide()
                $('#statpreview-tab-attributes').tab('show')
                $('#ba-student-modal-statpreview').modal('show')
            })

            $('.btn-max-attributes').on('click', maxStudentAttributes)
            $('.btn-lock-attributes').on('click', function (ev) {
                if (student.Id in studentCollection) {
                    lockedAttributes = !lockedAttributes
                    $('.btn-lock-attributes').toggleClass('deactivated', !lockedAttributes)
                    $('.btn-lock-attributes i').toggleClass('fa-lock', lockedAttributes).toggleClass('fa-lock-open', !lockedAttributes)

                    studentCollectionSave()
                }
                
            })

            $('#ba-student-search-filter-collection').toggle(Object.keys(studentCollection).length > 0)
            $(".tooltip").tooltip("hide")

            $('#student-voice-btn').on('click', function(ev) {
                if (!data.voice) {
                    loadJSON({voice: getCacheVerResourceName(`./data/${userLang.toLowerCase()}/voice.min.json`)}, result => {
                        data = Object.assign(data, result)
                    }).then(function(val){
                        $('#student-modal-voice').modal('show')
                    }, function(reason) {
                        console.error(reason)
                    })
                } else {
                    $('#student-modal-voice').modal('show')
                }
            })

            $('#student-modal-voice').on('show.bs.modal', function (e) {

                $('#student-voicegallery-tab-normal').tab('show')
                for (group in data.voice[student.Id]) {
                    let html = ''
                    data.voice[student.Id][group].forEach(vc => {
                        if (vc.EventId && !region.Events.includes(vc.EventId)) return
                        if (vc.Group == "WeaponGetIdle1" && region.WeaponMaxLevel == 0) return
                        const matches = vc.Group.match(/([0-9])$/)
                        const order = matches && matches.length ? matches[1] : 1
                        const group = vc.Group.replace(/[0-9]$/, "")
                        html += `<div class="d-flex flex-row align-items-center gap-2"><h6 class="m-0">${getLocalizedString("VoiceClip", group, [order])}</h6><div class="flex-fill"></div><audio preload="none" controls><source src="${staticAssetURL}/voice/${vc.AudioClip}" type="audio/mpeg"></audio></div>`
                        if (vc.Transcription) {
                            html += `<div class="ba-panel p-2"><p class="m-0">${vc.Transcription}</p></div>`
                        }
                    })
                    $(`#student-voicegallery-list-${group.toLowerCase()}`).html(html)
                    $(`#student-voicegallery-tab-${group.toLowerCase()}`).toggleClass("disabled", html == "")
                    $(`#student-voicegallery-list-${group.toLowerCase()} audio`).prop('volume', voiceClipVolume)

                    $('#student-voice-icon img').attr('src', `images/student/icon/${student.Id}.webp`)
                    $('#student-voice-name').text(getTranslatedString(student, 'Name'))
                    $('#student-voice-cv').text(getTranslatedString(student, 'CharacterVoice'))
                }
                
            })

            $('#btn-midokuni-link').on('click', () => {
                window.open(`https://hina.loves.midokuni.com/StudentInsights/${student.Id}`, '_blank')
                $("#btn-midokuni-link").blur()
            })

            statPreviewExternalBuffs = new ExternalBuffs({
                controls: $('#statpreview-buff-transferable-controls')[0],
                searchBox: $('#statpreview-buff-transferable-search-text')[0],
                searchButton: $('#statpreview-buff-transferable-search-btn')[0],
                autoAddButton: $('#statpreview-buff-transferable-autoadd-btn')[0],
                searchResults: $('#statpreview-buff-transferable-search .search-list-container')[0],
            }, (studentId, skill) => ((student.Id == studentId && skill.Effects.some(e => e.Type == 'BuffSelf')) || skill.Effects.some(e => e.Type == 'BuffAlly')),
            recalculateStats, ['BuffSelf', 'BuffAlly'])

            statPreviewCustomBuffs = new CustomBuffs($('#statpreview-buff-custom')[0], studentStatListFull, recalculateStats)

            statPreviewEnemyBuffs = new ExternalBuffs({
                controls: $('#statpreview-enemy-buff-transferable-controls')[0],
                searchBox: $('#statpreview-enemy-buff-transferable-search-text')[0],
                searchButton: $('#statpreview-enemy-buff-transferable-search-btn')[0],
                autoAddButton: $('#statpreview-enemy-buff-transferable-autoadd-btn')[0],
                searchResults: $('#statpreview-enemy-buff-transferable-search .search-list-container')[0],
            }, (studentId, skill) => (skill.Effects.some(e => e.Type == 'BuffTarget')),
            calculateEnemyStats, ['BuffTarget'])

            statPreviewEnemyCustomBuffs = new CustomBuffs($('#statpreview-enemy-buff-custom')[0], enemyCalculationStatList, calculateEnemyStats)

            statPreviewSupportStats = new SupportStats({
                controls: $('#statpreview-supportstats-controls')[0],
                searchBox: $('#statpreview-supportstats-search-text')[0],
                searchButton: $('#statpreview-supportstats-search-btn')[0],
                searchResults: $('#statpreview-supportstats-search-list')[0],
            })

            statPreviewTSAStats = new TSAStats({
                controls: $('#statpreview-tsastats-controls')[0]
            })

            statPreviewEnemyFinder = new EnemyFinder({
                controls: $('#statpreview-enemysearch-controls')[0],
                searchBox: $('#statpreview-enemysearch-search-text')[0],
                searchButton: $('#statpreview-enemysearch-search-btn')[0],
                searchResults: $('#statpreview-enemysearch-search-list')[0],
            })

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

            if (localStorage.getItem("chara_sortby_collectionstats")) {
                sortByCollectionStats = (localStorage.getItem("chara_sortby_collectionstats") == 'true')
            }
            $('#ba-student-search-sortby-usecollectionstats .item-toggle-icon').html(`<i class="fa-solid fa-toggle-${sortByCollectionStats ? 'on' : 'off'}"></i>`)
        
            if (localStorage.getItem("show_student_list_info")) {
                showStudentListInfo = (localStorage.getItem("show_student_list_info") == 'true')
            }

            Object.entries(search_options.filter).forEach(i => {
                if (typeof i[1] === 'boolean') {
                    $(`#ba-student-search-filter-${i[0].toLowerCase()}`).toggleClass("active", i[1])
                } else {
                    Object.entries(i[1]).forEach(j => {
                        $(`#ba-student-search-filter-${i[0].toLowerCase()}-${String(j[0]).toLowerCase()}`).toggleClass("active", j[1])
                    })
                }
            })
            activeFilters = getNumActiveFilters()

            passiveStatList.forEach((stat) => {
                const buffName = `Buff_${(stat in buffIconKeys) ? buffIconKeys[stat] : stat}`
                const listItem = `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-filter-select-prop="PassiveBuff" data-filter-select-value="${stat}" class="btn btn-dark"><div class="icon"><img src="images/buff/${buffName}.webp"></div><span>${getLocalizedString('BuffName',buffName)}</span></a></li>`
                $('#ba-student-search-select-passivebuff-list').append(listItem)
            })

            weaponPassiveStatList.forEach((stat) => {
                const buffName = `Buff_${(stat in buffIconKeys) ? buffIconKeys[stat] : stat}`
                const listItem = `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-filter-select-prop="WeaponPassiveBuff" data-filter-select-value="${stat}" class="btn btn-dark"><div class="icon"><img src="images/buff/${buffName}.webp"></div><span>${getLocalizedString('BuffName',buffName)}</span></a></li>`
                $('#ba-student-search-select-weaponpassivebuff-list').append(listItem)
            })

            subStatList.forEach((stat) => {
                const buffName = `Buff_${(stat in buffIconKeys) ? buffIconKeys[stat] : stat}`
                const listItem = `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-filter-select-prop="SubBuff" data-filter-select-value="${stat}" class="btn btn-dark"><div class="icon"><img src="images/buff/${buffName}.webp"></div><span>${getLocalizedString('BuffName',buffName)}</span></a></li>`
                $('#ba-student-search-select-subbuff-list').append(listItem)
            })

            studentBuffStatFilters.forEach((stat) => {
                const listItem = `<li><a class="dropdown-item" href="javascript:;" data-filter-select-value="${stat}">${getLocalizedString('Stat',stat)}</a></li>`
                $('#statpreview-buff-transferable-search ul.dropdown-menu').append(listItem)
            })

            enemyBuffStatFilters.forEach((stat) => {
                const listItem = `<li><a class="dropdown-item" href="javascript:;" data-filter-select-value="${stat}">${getLocalizedString('Stat',stat)}</a></li>`
                $('#statpreview-enemy-buff-transferable-search ul.dropdown-menu').append(listItem)
            })

            data.items.filter(i => i.Id >= 100 && i.Id < 1000 && i.Rarity == 'SSR' && i.IsReleased[regionID]).forEach(item => {
                const classId = Math.floor(item.Id/10)
                const listItem = `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-filter-select-prop="UsesArtifact" data-filter-select-value="${classId}" class="btn btn-dark"><div class="icon"><img src="images/item/icon/${item.Icon}.webp"></div><span>${getLocalizedString('ArtifactClass', classId)}</span></a></li>`
                $('#ba-student-search-select-usesartifact-list').append(listItem)
            })

            $('a[data-filter-select-prop]').on('click', function(e) {
                const prop = $(this).data('filter-select-prop')
                const value = $(this).data('filter-select-value')
                searchSetFilterSelect(prop, value)
            })

            $('#ba-student-search-filter-amount').text(activeFilters == 0 ? '' : ` (${activeFilters})`)
            $('#ba-student-search-reset').toggle(activeFilters > 0 || $('#ba-student-search-text').val() != "")
            $('#ba-student-search-filters-panel').on('show.bs.collapse', function() {
                $('#student-search-filters-btn').toggleClass('active', true)
            }).on('hide.bs.collapse', function() {
                $('#student-search-filters-btn').toggleClass('active', false)
            })

            $('.summon-list').on('click', '.dropdown-item', function() {
                changeStudentSummon($(this).data('summon-id'))
            })

            $('.terrain-list').on('click', '.dropdown-item', function() {
                changeSkillPreviewTerrain($(this).data('terrain'))
            })

            updateStudentList(updateSortMethod = true)
    
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
        
            $('#ba-student, #ba-student-list-btn').show()
            $('#ba-student-list-btn').on('click', function() {
                if (search_options["sortby"].startsWith("Collection") || isAttributeSort(search_options["sortby"])) {
                    studentStatsList = null
                    updateStudentList(updateSortMethod = true)
                }
                $('.card-student.disabled').removeClass('disabled')
                $('#ba-student-modal-students').modal('show')
            })

            $('#ba-statpreview-status-equipment').tooltip({title: getBasicTooltip(translateUI('tooltip_equipment_bonus')), placement: 'top', html: true})
            $('#ba-statpreview-status-buffs').tooltip({title: getBasicTooltip(translateUI('tooltip_buffs_bonus')), placement: 'top', html: true})
            $('#ba-statpreview-status-passive-level').tooltip({title: getBasicTooltip(translateUI('tooltip_passiveskill_bonus')), placement: 'top', html: true})
            $('#ba-statpreview-status-strikerbonus').tooltip({title: getBasicTooltip(translateUI('tooltip_supportstats')), placement: 'top', html: true})

            $('#ba-student-modal-students').on('shown.bs.modal', function (ev) {
                if (ev.relatedTarget === 'shortcut') {
                    $('#ba-student-search-text').trigger('focus')
                }
            })

            $('#ba-student-search-text').on('input', function() {
                if (searchDelayTimeout) {
                    clearTimeout(searchDelayTimeout)
                }
                searchDelayTimeout = setTimeout(updateStudentList, searchDelay)
            })

            $('#ba-student-toggle-sprite-btn').on('click', e => {
                showAltSprite = !showAltSprite
                $('#ba-student-img').attr('src', `images/student/portrait/${student.Id}${showAltSprite ? '_2' : ''}.webp`)
            })

            $('#ba-student-search-showinfo').tooltip({title: getBasicTooltip(translateUI('student_search_info')), html: true, placement: 'top'})
            $('#ba-student-search-showinfo').toggleClass('active', showStudentListInfo)
            $('#ba-student-search-showinfo').on('click', function() {
                showStudentListInfo = !showStudentListInfo
                localStorage.setItem('show_student_list_info', showStudentListInfo)
                $(this).toggleClass('active', showStudentListInfo).tooltip('hide')
                $('#student-select-grid').toggleClass('show-info', showStudentListInfo)
            })
            $('#student-select-grid').toggleClass('show-info', showStudentListInfo)
            $('#student-stat-modal-skill-calc-toggle').on('click', function() {
                const state = $(this).hasClass('deactivated')
                $(this).toggleClass('deactivated', !state)
                $('#ba-student-stat-modal-table').toggle(!state)
                $('#student-stat-modal-skill-calculations').toggle(state)
                if (state) {
                    calculateSkills()
                    calculateRaidSkills()
                } else {
                    recalculateStats()
                }
                
            })
            
            $('#ba-student-modal-statpreview').on('shown.bs.modal hidden.bs.modal', recalculateStats)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})

        })
    } else if (moduleName == 'items') {
        loadedModule = 'items'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-items").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/${pixelMode ? 'pixel/BG_GameDevRoom.png' : 'BG_MainOffice_Night.jpg'}`
        $("#loaded-module").load(html_list['items'], function() {

            equipmentFilters = $('#item-search-filter-equipmenttier .search-filter-group')
            for (let i = 1; i <= region.EquipmentMaxLevel[0]; i++) {
                equipmentFilters.append(`<button id="item-search-filter-equipmenttier-${i}" class="btn-pill" onclick="searchSetFilterItems('EquipmentTier','${i}')"><span class="label">T${i}</span></button>`)
            }

            loadRegion(regionID)
            loadLanguage(userLang)
            loadedItemList = null
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (localStorage.getItem("item_sortby_dir")) {
                itemSearchOptions["sortby_dir"] = parseInt(localStorage.getItem("item_sortby_dir"))
            }

            if (localStorage.getItem("item_sortby")) {
                searchSetOrderItems(localStorage.getItem("item_sortby"), false, false)
            } else {
                searchSetOrderItems('Default', false, false)
            }

            if (localStorage.getItem("grid_item_display_style")) {
                gridItemDisplayStyle = localStorage.getItem("grid_item_display_style")
            }

            $('#item-search-displaytype-'+gridItemDisplayStyle).addClass('active')
            switch (gridItemDisplayStyle) {
                case 'detailed':
                    $('#item-select-grid').addClass('items')
                    break;
            
                case 'compact':
                    $('#item-select-grid').addClass('items-compact')
                    break;
            }

            $('#item-select-grid').on('click', 'div[data-itemid]', function(e){loadItem($(this).data('itemid'))})
            $('#ba-item-craftnodes').on('click', 'div[data-itemid]', function(e){loadCraft($(this).data('itemid'))})
        
            Object.entries(itemSearchOptions.filter).forEach(i => {
                if (typeof i[1] === 'boolean') {
                    $(`#item-search-filter-${i[0].toLowerCase()}`).toggleClass("active", i[1])
                } else {
                    Object.entries(i[1]).forEach(j => {
                        $(`#item-search-filter-${i[0].toLowerCase()}-${String(j[0]).toLowerCase()}`).toggleClass("active", j[1])
                    })
                }
            })

            if (entry != null) {
                loadItem(entry)
            } else if (urlVars.has("item")) {
                loadItem(urlVars.get("item"))
            } else if (localStorage.getItem("item")) {
                loadItem(localStorage.getItem("item"))
            } else {
                loadItem(1)
            }

            $('#item-search-text').on('input', function() {
                if (searchDelayTimeout) {
                    clearTimeout(searchDelayTimeout)
                }
                searchDelayTimeout = setTimeout(updateItemList, searchDelay)
            })

            $('#item-search-filters-panel').on('show.bs.collapse', function() {
                $('#item-search-filters-btn').toggleClass('active', true)
            }).on('hide.bs.collapse', function() {
                $('#item-search-filters-btn').toggleClass('active', false)
            })
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    } else if (moduleName == 'raids') {
        loadedModule = 'raids'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-raids").addClass('active')
        let bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/${pixelMode ? 'pixel/' + 'BG_Raid.png' : 'BG_Raid.jpg'}`
        $("#loaded-module").load(html_list['raids'], function() {
            loadLanguage(userLang)

            if (regionID == 2) {
                $('#ba-raid-list-tab-worldraid').hide()
            }

            $(".tooltip").tooltip("hide")
            let urlVars = new URL(window.location.href).searchParams

            generateStatTable('#ba-raid-enemy-stats', raidEnemyStatList, 6)
            generateStatTable('#ba-stage-enemy-stat-table', enemyStatList, 6)

            $('#raid-enemy-list').on('click', '.dropdown-item', function() {
                changeRaidEnemy($(this).data('enemy-index'))
            })

            $('#ba-raid-season-list').on('click', '.dropdown-item', function() {
                loadRaidSeasonRewards($(this).data('season'))
            })

            populateRaidList()

            if (entry != null) {
                loadRaid(entry)
            } else if (urlVars.has("raid")) {
                loadRaid(urlVars.get("raid"))
            } else if (localStorage.getItem("raid")) {
                loadRaid(localStorage.getItem("raid"))
            } else {
                loadRaid(1)
            }
            
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    } else if (moduleName == 'stages') {
        loadedModule = 'stages'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-stages").addClass('active')
        let bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/${pixelMode ? 'pixel/' + 'BG_HQ.png' : 'BG_HQ.jpg'}`
        $("#loaded-module").load(html_list['stages'], function() {
            loadLanguage(userLang)
            loadedStageList = null
            stageMapModal = new bootstrap.Modal(document.getElementById("ba-stage-modal-map"), {})
            if (region.WeaponMaxLevel == 0) {
                $('#ba-stages-list-tab-schooldungeon').hide()
            }
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (localStorage.getItem("show_event_currency_bonus")) {
                showEventCurrencyBonus = parseInt(localStorage.getItem("show_event_currency_bonus"))
            }

            generateStatTable('#ba-stage-enemy-stat-table', enemyStatList, 6)

            $('#stage-version-list').on('click', '.dropdown-item', function(e) {
                changeStageVersion($(this).data('version'))
            })

            $('#stage-include-bonus-list').on('click', '.dropdown-item', function(e) {
                showEventCurrencyBonus = parseInt($(this).data('option'))
                localStorage.setItem("show_event_currency_bonus", showEventCurrencyBonus)
                loadStage(loadedStage.Id)
            })

            if (entry != null) {
                loadStage(entry)
            } else if (urlVars.has("stage")) {
                loadStage(urlVars.get("stage"))
            } else if (localStorage.getItem("stage")) {
                loadStage(localStorage.getItem("stage"))
            } else {
                loadStage(1011101)
            }
            
            makeDraggable($('#ba-stage-map'))
            makeDraggable($('#ba-conquest-map'))
            makeDraggable($('#ba-stage-modal-map-container'))
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    } else if (moduleName == 'craft') {
        loadedModule = 'craft'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-craft").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/${pixelMode ? 'pixel/' + 'BG_CraftChamber_Night.png' : 'BG_CraftChamber_Night.jpg'}`
        $("#loaded-module").load(html_list['craft'], function() {
            loadLanguage(userLang)
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams

            if (localStorage.getItem("show_node_probability")) {
                showNodeProbability = (localStorage.getItem("show_node_probability") == 'true')
            }

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

            if (loadedCraftId >= 100000) {
                $('#ba-item-list-tab-fusion').tab('show')
            } else {
                $('#ba-item-list-tab-synthesis').tab('show')
            }

            $('#fusion-select-grid').on('click', 'div[data-itemid]', function(e){loadCraft($(this).data('itemid'))})

            $('#craft-toggle-chance').toggleClass('active', showNodeProbability)
            $('#craft-toggle-chance').on('click', function() {
                showNodeProbability = !showNodeProbability
                localStorage.setItem('show_node_probability', showNodeProbability)
                $(this).toggleClass('active', showNodeProbability)
                $('#craft-select-grid .stage-droprate').toggleClass('hidden', !showNodeProbability)
            })
            $('#craft-select-grid .stage-droprate').toggleClass('hidden', !showNodeProbability)

            $('#craft-search-text').on('input', function() {
                if (searchDelayTimeout) {
                    clearTimeout(searchDelayTimeout)
                }
                searchDelayTimeout = setTimeout(populateCraftList, searchDelay)
            })
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    } else {
        loadedModule = 'home'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-home").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/${pixelMode ? 'pixel/BG_GameDevRoom.png' : 'BG_ReceptionRoom.jpg'}`
        $("#loaded-module").load(html_list['home'], function() {
            loadLanguage(userLang)
            loadRegion(regionID)

            populateEvents()

            if (pixelMode) {
                switch (Math.floor(Math.random() * 3)) {
                    case 0:
                        $('#home-character-img').attr('src', 'images/ui/aris_pixel.png')
                        break
                    case 1:
                        $('#home-character-img').attr('src', 'images/ui/momoi_pixel.png')
                        break
                    case 2:
                        $('#home-character-img').attr('src', 'images/ui/midori_pixel.png')
                        break
                }
                
            }

            eventRefreshInterval = window.setInterval(updateEventTimers, 60000)

            $('#ba-home-server-info').text(translateUI('current_events', [getLocalizedString('ServerName', regionID)]))
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            let url = new URL(window.location.href)
    
            if (url.searchParams.toString() != '') {
                url.searchParams.forEach((v,k) => url.searchParams.delete(k))
                history.pushState(null, '', url)
            }
            $('title').html(`${translateUI('navbar_home')} | Schale DB`)
            $('#ba-navbar-content').collapse('hide')
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})

        })
    }
    localStorage.setItem("module", loadedModule)
}

function populateEvents() {
    let gachatext = translateUI('gacha_pickup') + "\n", gachalistHtml = ""
    let currentTime = new Date().getTime() / 1000, dateOptions = { month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short" }
    let found = false
    $('#events-row-1').hide()
    $.each(region.CurrentGacha, function (i, el) {
        if (((currentTime >= el.start && currentTime < el.end) || (currentTime <= el.start)) && !found) {
            for (let j = 0; j < el.characters.length; j++) {
                var char = find(data.students, "Id", el.characters[j])[0]
                gachalistHtml += getStudentListCardHTML(char)
            }
            $('#events-row-1').show()
            gachatext += new Date(el.start * 1000).toLocaleString([], dateOptions) + ' - ' + new Date(el.end * 1000).toLocaleString([], dateOptions)
            gachatext += `\n<span id="ba-home-gacha-timer" class="home-timer" data-start="${el.start}" data-end="${el.end}"></span>`
            // gachatext += '\n' + (currentTime >= el.start ? translateUI('event_ends', duration(el.end - currentTime)) : translateUI('event_starts', duration(el.start - currentTime)))
            found = true
        }
    })

    $('#ba-home-gacha-text').html(gachatext)
    $('#ba-home-gacha-list').html(gachalistHtml)

    let raidText = "", raidHtml = ""
    $('#events-row-2').hide()
    $('#ba-home-raid').hide()
    found = false
    let raidsVisible = false
    $.each(region.CurrentRaid, function (i, el) {
        if (((currentTime >= el.start && currentTime < el.end) || (currentTime <= el.start)) && !found) {
            if (el.raid >= 1000) {
                raidText = getLocalizedString("StageType", "TimeAttack") + "\n"
                let raid = find(data.raids.TimeAttack, "Id", el.raid)[0]
                raidHtml += getTimeAttackCardHTML(raid, raid.Terrain)
            } else {
                raidText = getLocalizedString("StageType", el.type) + "\n"
                let raid = find(data.raids.Raid, "Id", el.raid)[0]
                const season = find(data.raids.RaidSeasons[regionID][`${el.type == 'EliminateRaid' ? 'Eliminate' : ''}Seasons`], 'SeasonId', el.season)[0]
                raidHtml += getRaidCardHTML(raid, season)
                
            }
            $('#events-row-2').show()
            $('#ba-home-raid').show()
            raidText += new Date(el.start * 1000).toLocaleString([], dateOptions) + ' - ' + new Date(el.end * 1000).toLocaleString([], dateOptions)
            raidText += `\n<span id="ba-home-raid-timer" class="home-timer" data-start="${el.start}" data-end="${el.end}"></span>`
            found = true
            raidsVisible = true
        }
    })
    $('#ba-home-raid-text').html(raidText)
    $('#ba-home-raid-list').html(raidHtml)

    let eventText = "", eventHtml = ""
    $('#ba-home-event').hide()
    found = false
    $.each(region.CurrentEvents, function (i, el) {
        if (((currentTime >= el.start && currentTime < el.end) || (currentTime <= el.start)) && !found) {
            eventText = getLocalizedString("StageType", "Event") + "\n"
            eventHtml += getEventCardHTML(el.event)

            $('#events-row-2').show()
            $('#ba-home-event').show()
            eventText += new Date(el.start * 1000).toLocaleString([], dateOptions) + ' - ' + new Date(el.end * 1000).toLocaleString([], dateOptions)
            eventText += `\n<span id="ba-home-event-timer" class="home-timer" data-start="${el.start}" data-end="${el.end}"></span>`
            found = true

            $('#ba-home-event').toggleClass('col-md-12', !raidsVisible)
        }
    })
    $('#ba-home-event-text').html(eventText)
    $('#ba-home-event-list').html(eventHtml)

    //birthdays
    var birthdaysHtml = ''
    var currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    var nextWeek = new Date()
    nextWeek.setHours(0, 0, 0, 0)
    nextWeek.setDate(currentDate.getDate() + 7)
    birthdayStudents = []

    data.students.forEach(el => {
        if (el.IsReleased[regionID] && (!el.Name.includes('（') && !el.Name.includes('('))) {
            var nextBirthday = getNextBirthdayDate(el.BirthDay)
            if (nextBirthday.getTime() < nextWeek.getTime() && nextBirthday.getTime() >= currentDate.getTime())
                birthdayStudents.push(el)
        }
    })

    if (birthdayStudents.length > 0) {
        birthdayStudents.sort((a, b) => getNextBirthdayDate(a.BirthDay).getTime() - getNextBirthdayDate(b.BirthDay).getTime())
        for (let i = 0; i < birthdayStudents.length; i++) {
            birthdaysHtml += '<div class="d-flex flex-column mx-1 mb-1">' + getStudentIconSmall(birthdayStudents[i]) + '<div class="ba-panel mt-1 mx-1 p-1 text-center">' + getNextBirthdayDate(birthdayStudents[i].BirthDay).toLocaleDateString([], { month: "numeric", day: "numeric" }) + '</div></div>'
        }
        $('#ba-home-birthdays-list').html(birthdaysHtml)
    } else {
        $('#ba-home-birthdays').hide()
    }

    $('.ba-item-student').tooltip({ html: true })
    updateEventTimers()
}

function updateEventTimers() {
    const currentTime = new Date().getTime() / 1000
    $('.home-timer').each(function(i) {
        const start = $(this).data('start')
        const end = $(this).data('end')
        $(this).html(currentTime >= start ? translateUI('event_ends', duration(end - currentTime)) : translateUI('event_starts', duration(start - currentTime)))
    })
}

function finalizeLoad(pageTitle, searchParamKey, searchParamValue, gtagEvent = null, gtagEventLabel = null) {
    
    var url = new URL(window.location.href)

    if (url.searchParams.get(searchParamKey) != searchParamValue) {
        url.searchParams.forEach((v,k) => url.searchParams.delete(k))
        url.searchParams.set(searchParamKey, searchParamValue)
        history.pushState(null, '', url)
    }

    $('title').html(`${pageTitle} | Schale DB`)
    $('#ba-navbar-content').collapse('hide')
    localStorage.setItem(searchParamKey, searchParamValue)

    if (gtagEvent) {
        // Add a 0.5s delay before sending hit - possibly fix incorrect page title being sent to GA by some users(?)
        window.setTimeout(function() {
            gtag('event', gtagEvent, {
                'event_label': gtagEventLabel,
                'user_language': userLang
            })
        }, 500)
    }
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

function convertToDate(dateString) {
    const [month, day] = dateString.split('/')

    if (isNaN(month) || isNaN(day)) {
        return null
    }

    return new Date(0, month-1, day)
}

function duration(seconds) {
    if (seconds < 0) {
        return [0, 0, 0]
    }
    let totalSeconds = seconds
    let days = Math.floor(totalSeconds/86400)
    totalSeconds -= days*86400
    let hours = Math.floor(totalSeconds/3600)
    totalSeconds -= hours*3600
    let minutes = Math.floor(totalSeconds/60)
    return [days, hours, minutes]
}

function durationStringShort(seconds) {
    if (seconds < 0) {
        return ""
    }
    let totalSeconds = seconds

    let days = Math.floor(totalSeconds/86400)
    if (days > 0) return translateUI('duration_days', [days])
    totalSeconds -= days*86400

    let hours = Math.floor(totalSeconds/3600)
    if (hours > 0) return translateUI('duration_hours', [hours])
    totalSeconds -= hours*3600

    let minutes = Math.floor(totalSeconds/60)
    return translateUI('duration_minutes', [minutes])
}

function setSortedDataLists() {
    // Make a copy of the data objects for sorting/filtering so we retain the original order in the loaded data
    data.students.sort((a,b) => getTranslatedString(a, 'Name').localeCompare(getTranslatedString(b, 'Name')))
    studentList = data.students.map(x => x)

    itemList = data.items.map(x => x)
    furnitureList = data.furniture.map(x => x)
    equipmentList = data.equipment.map(x => x)
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
    resultsHTML += `<div id="student-select-noresult" class="p-2 grid-text">${translateUI('no_results')}</div>`
    $("#student-select-grid").html(resultsHTML)
}

/**
 * Applies the selected filters and sort method to the student selection grid
 */
function updateStudentList(updateSortMethod = false) {
    let searchTerm = $('#ba-student-search-text').val()
    let sortfunction = sort_functions[search_options["sortby"]]
    const filterList = buildFilterList(search_options["filter"])
    const selectFilterList = []
    for (prop in search_options["filterSelect"]) {
        if (search_options["filterSelect"][prop].length > 0)
            selectFilterList.push(prop)
    }

    if (updateSortMethod) {
        studentList.sort(sort_functions.Default)
        if (sort_functions[search_options["sortby"]] != "Default") {

            if (isAttributeSort(search_options["sortby"])) {

                if (studentStatsList == null) {
                    studentStatsList = {}
                    studentList.forEach((student) => {
                        
                        if (sortByCollectionStats && !(student.Id in studentCollection)) {
                            studentStatsList[student.Id] = null
                            return
                        }
    
                        const level = sortByCollectionStats ? studentCollection[student.Id].l : region.StudentMaxLevel
                        const starGrade = sortByCollectionStats ? studentCollection[student.Id].s : 5
                        const equipLevel = sortByCollectionStats ? [studentCollection[student.Id].e1, studentCollection[student.Id].e2, studentCollection[student.Id].e3] : region.EquipmentMaxLevel
                        const weaponLevel = sortByCollectionStats ? studentCollection[student.Id].wl : region.WeaponMaxLevel
                        const bondLevel = sortByCollectionStats ? studentCollection[student.Id].b : region.BondMaxLevel
                        const gearLevel = 1

                        const charStats = new CharacterStats(student, level, starGrade)

                        const bondStats = getBondStats(student, bondLevel)
                        for (let stat in bondStats) {
                            charStats.addBuff(stat, bondStats[stat])
                        }

                        for (let favorAlt of student.FavorAlts) {
                            if (sortByCollectionStats && !(favorAlt in studentCollection)) continue

                            const altStudent = find(data.students, "Id", favorAlt)[0]
                            if (!altStudent.IsReleased[regionID]) continue

                            const altBondLevel = sortByCollectionStats ? studentCollection[favorAlt].b : region.BondMaxLevel

                            const altBondStats = getBondStats(altStudent, altBondLevel)
                            for (let stat in altBondStats) {
                                charStats.addBuff(stat, altBondStats[stat])
                            }
                        }
    
                        charStats.addEquipmentBonuses(student.Equipment[0], equipLevel[0])
                        charStats.addEquipmentBonuses(student.Equipment[1], equipLevel[1])
                        charStats.addEquipmentBonuses(student.Equipment[2], equipLevel[2])
    
                        if ("Released" in student.Gear && student.Gear.Released[regionID]) {
                            charStats.addGearBonuses(student.Gear, gearLevel)
                        }

                        if (weaponLevel > 0) {
                            charStats.addWeaponBonuses(student.Weapon, weaponLevel)
                        }
    
                        studentStatsList[student.Id] = charStats
                    })
                }

                studentList.sort(function(a,b) {
                    const attributeName = search_options["sortby"].replace("100", "")
                    const aTotal = studentStatsList[a.Id] != null ? studentStatsList[a.Id].getTotal(attributeName) : 0
                    const bTotal = studentStatsList[b.Id] != null ? studentStatsList[b.Id].getTotal(attributeName) : 0
                    return (bTotal - aTotal)*search_options["sortby_dir"]
                })
            } else {
                studentList.sort(sortfunction)
            }
            
        }
    }

    let count = 0
    $.each(studentList, function(i, el){
        if (el.IsReleased[regionID]) {
            if (updateSortMethod) {
                $('#student-select-'+el.Id).css("order", i)
                if (search_options["sortby"] == "Default" || search_options["sortby"] == "Name") {
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(getTranslatedString(el, 'Name')).toggleClass('smalltext', getTranslatedString(el, 'Name').length > label_smalltext_threshold[userLang]).toggleClass('unhover', false)
                    $('#student-select-'+el.Id+' .label-text.hover').hide()
                } else if (search_options["sortby"] == "EXCost") {
                    const cost = find(el.Skills, "SkillType", "ex")[0].Cost
                    if (cost[0] == cost[4]) {
                        $('#student-select-'+el.Id+' .label-text:not(.hover)').text(cost[0]).toggleClass('smalltext', false).toggleClass('unhover', true)
                    } else {
                        $('#student-select-'+el.Id+' .label-text:not(.hover)').text(`${cost[0]} → ${cost[4]}`).toggleClass('smalltext', false).toggleClass('unhover', true)
                    }
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "EXHits") {
                    const hits = getSkillHits(find(el.Skills, "SkillType", "ex")[0])
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(hits).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "NormalHits") {
                    const hits = getSkillHits(find(el.Skills, "SkillType", "autoattack")[0])
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(hits).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "PublicHits") {
                    let hits = getSkillHits(find(el.Skills, "SkillType", "normal")[0])
                    if ("Released" in el.Gear && el.Gear.Released[regionID]) {
                        const gearPublicHits = getSkillHits(find(el.Skills, "SkillType", "gearnormal")[0]) 
                        if (gearPublicHits > hits) hits += ' → ' + gearPublicHits
                    }

                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(hits).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"].endsWith("BattleAdaptation")) {
                    const terrain = search_options["sortby"].replace("BattleAdaptation", "")
                    let label, baseValue = el[search_options["sortby"]]
                    if (el.Weapon.AdaptationType === terrain) {
                        label = `${adaptationAmount[baseValue]} → ${adaptationAmount[baseValue + el.Weapon.AdaptationValue]}`
                    } else {
                        label = adaptationAmount[baseValue]
                    }
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').html(label).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "CharacterAge") {
                    const age = MathHelper.extractNumber(el[search_options["sortby"]])
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(age == 0 ? "??" : age).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "BirthDay") {
                    const birthDate = convertToDate(el.BirthDay)
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(birthDate ? birthDate.toLocaleDateString([], { month: "numeric", day: "numeric"}) : '-').toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "CollectionStars") {
                    const stars = el.Id in studentCollection ? studentCollection[el.Id].s : 0
                    const weapon = el.Id in studentCollection ? studentCollection[el.Id].ws : 0

                    let label
                    if (stars > 0) {
                        label = `<i class="fa fa-star col-star"></i> ${stars}`
                        if (weapon > 0) label += ` <i class="fa fa-star col-weaponstar"></i> ${weapon}`
                    } else {
                        label = translateUI('collection_notowned')
                    }

                    $('#student-select-'+el.Id+' .label-text:not(.hover)').html(label).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "CollectionLevel") {
                    const level = el.Id in studentCollection ? studentCollection[el.Id].l : 0
                    let label
                    if (level > 0) {
                        label = `Lv. ${level}`
                    } else {
                        label = translateUI('collection_notowned')
                    }

                    $('#student-select-'+el.Id+' .label-text:not(.hover)').html(label).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "CollectionBond") {
                    const level = el.Id in studentCollection ? studentCollection[el.Id].b : 0
                    let label
                    if (level > 0) {
                        label = `<i class="fa fa-heart"></i> ${level}`
                    } else {
                        label = translateUI('collection_notowned')
                    }
                    
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').html(label).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "Club" || search_options["sortby"] == "School") {
                    const label = getLocalizedString(search_options["sortby"], el[search_options["sortby"]])
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(label).toggleClass('smalltext', label.length > label_smalltext_threshold[userLang]).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "MemoryLobby") {
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').html(`<i class="fa fa-heart"></i> ${el.MemoryLobby[regionID]}`).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "MemoryLobbyBGM" || search_options["sortby"] == "Illustrator" || search_options["sortby"] == "Designer" || search_options["sortby"] == "CharacterVoice") {
                    const label = el[search_options["sortby"]]
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(label).toggleClass('smalltext', label.length > label_smalltext_threshold["Jp"]).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (isAttributeSort(search_options["sortby"])) {
                    let label
                    if (studentStatsList[el.Id] != null) {
                        label = studentStatsList[el.Id].getTotalString(search_options["sortby"].replace("100", ""))
                    } else {
                        label = translateUI('collection_notowned')
                    }

                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(label).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else {
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(el[search_options["sortby"]].toLocaleString()).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                }
            }
            if (checkFilters(el, filterList, selectFilterList, searchTerm)) {
                count++
                $('#student-select-'+el.Id).show()
            } else {
                $('#student-select-'+el.Id).hide()
            }
        }
    })
    $('#student-select-noresult').toggle(count == 0)
    const activeFilters = getNumActiveFilters()
    $('#ba-student-search-filter-amount').text(activeFilters == 0 ? '' : ` (${activeFilters})`)
    $('#ba-student-search-reset').toggle(activeFilters > 0 || $('#ba-student-search-text').val() != "")
}

function isAttributeSort(sortby) {
    switch (sortby) {
        case "AttackPower100":
        case "DefensePower100":
        case "MaxHP100":
        case "HealPower100":
        case "CriticalPoint":
        case "StabilityPoint":
        case "Range":
        case "AccuracyPoint":
        case "DodgePoint":
            return true
        default:
            return false
    }
}

function buildFilterList(options) {
    let filterList = []
    $.each(options, function(i, el) {
        if (typeof el === 'boolean') {
            if (el) filterList.push(i)
        } else {
            let allfalse = true, alltrue = true
            $.each(el, function(i2, el2) {
                allfalse = (allfalse && !el2)
                alltrue = alltrue && el2
            })
            if (!(allfalse || alltrue)) {
                filterList.push(i)
            }
        }
    })
    return filterList
}

/**
 * Applies the selected filters and sort method to the student selection grid
 */
 function updateItemList(updateSortMethod = false) {
    let searchTerm = $('#item-search-text').val()
    let sortfunction = itemSortFunctions[itemSearchOptions["sortby"]]
    const filterList = buildFilterList(itemSearchOptions["filter"])

    let list, offset
    
    switch (loadedItemList) {
        case 'items':
            list = itemList
            offset = 0
            break;
        case 'furniture':
            list = furnitureList
            offset = 1000000
            break;
        case 'equipment':
            list = equipmentList
            offset = 2000000
            break;
    }
    
    if (updateSortMethod) list.sort(sortfunction)

    let count = 0
    $.each(list, function(i, el){
        if (el.IsReleased[regionID]) {
            if (updateSortMethod) {
                $(`#item-select-${el.Id+offset}`).css("order", i)                
            }
            if (itemCheckFilters(el, filterList, searchTerm)) {
                count++
                $(`#item-select-${el.Id+offset}`).show()
            } else {
                $(`#item-select-${el.Id+offset}`).hide()
            }
        }
    })
    $('#item-select-noresult').toggle(count == 0)
}

/**
 * Checks whether a student passes a given list of filters
 * @param {*} student The student object
 * @param {*} filterList List of filters checked
 * @param {*} selectFilterList List of dropdown filters to check
 * @param {*} searchTerm Text search filter
 * @returns 
 */
function checkFilters(student, filterList, selectFilterList, searchTerm) {
    if (!student.IsReleased[regionID]) return false

    for (let i = 0; i < filterList.length; i++) {
        if (filterList[i] == 'TerrainUpgrades')
            continue

        if (filterList[i] == 'Collection') {
            if (!search_options.filter.Collection[student.Id in studentCollection ? 'Owned': 'NotOwned']) return false
        } else if (filterList[i].startsWith('Gear')) {
            const slot = parseInt(filterList[i].replace('Gear',''))
            if (!search_options['filter'][filterList[i]][student.Equipment[slot-1]]) return false
        } else if (filterList[i] == 'BondGear') {
            if (search_options['filter'][filterList[i]] && !("Released" in student.Gear && student.Gear.Released[regionID])) return false
        } else if (filterList[i] == 'Cover') {
            if (!search_options.filter.Cover[student.Cover ? 'Uses': 'DoesntUse']) return false
        } else if (filterList[i] == 'HasCC') {
            if (search_options['filter'][filterList[i]] && getStudentAndSummonSkills(student).find(s => s.Effects !== undefined && s.Effects.find(e => e.Type == "CrowdControl")) === undefined) return false
        } else if (filterList[i] == 'HasDebuff') {
            if (search_options['filter'][filterList[i]] && getStudentAndSummonSkills(student).find(s => s.Effects !== undefined && s.Effects.find(e => e.Type == "BuffTarget" || e.Type == "DMGDot")) === undefined) return false
        } else if (filterList[i].endsWith('Adaptation') && search_options['filter']['TerrainUpgrades'] && filterList[i].startsWith(student.Weapon.AdaptationType)) {
            if (!search_options['filter'][filterList[i]][student[filterList[i]]] && !search_options['filter'][filterList[i]][student[filterList[i]] + student.Weapon.AdaptationValue]) return false
        } else {
            if (!search_options['filter'][filterList[i]][student[filterList[i]]]) return false
        }
        
    }

    for (let i = 0; i < selectFilterList.length; i++) {
        const filterValues = search_options['filterSelect'][selectFilterList[i]]
        switch (selectFilterList[i]) {
            case "PassiveBuff":
                if (student.Skills.find(s => s.SkillType == 'passive' && s.Effects.find(e => filterValues.includes(e.Stat.split('_')[0])) !== undefined) === undefined) return false
                break;
            case "WeaponPassiveBuff":
                if (student.Skills.find(s => s.SkillType == 'weaponpassive' && s.Effects.find(e => filterValues.includes(e.Stat.split('_')[0])) !== undefined) === undefined) return false
                break;
            case "SubBuff":
                if (student.SquadType == 'Main' || student.Skills.find(s => s.SkillType == 'sub' && s.Effects.find(e => filterValues.includes(e.Stat.split('_')[0])) !== undefined) === undefined) return false
                break;
            case "UsesArtifact":
                if (student.SkillExMaterial.find(lv => lv.find(m => m < 1000 && filterValues.includes(Math.floor(m/10))) !== undefined) === undefined) return false
                break;
            default:
                break;
        }
    }
    
    return (searchTerm == "" || getTranslatedString(student, 'Name').toLowerCase().includes(searchTerm.toLowerCase()))
}

function getStudentAndSummonSkills(student) {
    const allSkills = [...student.Skills]
    student.Summons.forEach(s => {
        const summon = find(data.summons, 'Id', s.Id)[0]
        if (summon.Skills) {
            allSkills.push(...summon.Skills)
        }
    })
    return allSkills
}

/**
 * Checks whether an item passes a given list of filters
 * @param {*} item The student object
 * @param {*} filterList List of filters checked
 * @param {*} searchTerm Text search filter
 * @returns 
 */
 function itemCheckFilters(item, filterList, searchTerm) {
    const currentTime = new Date().getTime() / 1000
    if (!item.IsReleased[regionID]) return false
    if (item.ImmediateUse && !itemSearchOptions['filter']['ShowImmediateUse']) return false
    if (item.ExpiryTime && item.ExpiryTime[regionID] && item.ExpiryTime[regionID] <= currentTime && !itemSearchOptions['filter']['ShowExpired']) return false
    if (filterList.length == 0) {
    } else {
        for (let i = 0; i < filterList.length; i++) {
            switch (filterList[i]) {
                case 'ItemCategory':
                    if (loadedItemList == 'items' && !itemSearchOptions['filter'][filterList[i]][item['Category']]) return false
                    break
                case 'EquipmentCategory':
                    if (loadedItemList == 'equipment') {
                        if (item['Category'].startsWith('WeaponExpGrowth')) {
                            // Combine all weapon part types to same filter
                            if (!itemSearchOptions['filter'][filterList[i]]['WeaponExpGrowth']) return false     
                        } else {
                            if (!itemSearchOptions['filter'][filterList[i]][item['Category']]) return false     
                        }
                    }
                    break
                case 'FurnitureSubCategory':
                    if (loadedItemList == 'furniture' && !itemSearchOptions['filter'][filterList[i]][item['SubCategory']]) return false
                    break
                case 'FurnitureSet':
                    if (loadedItemList == 'furniture' && !itemSearchOptions['filter'][filterList[i]][String(item['SetGroupId'])]) return false
                    break
                case 'Rarity':
                    if (loadedItemList != 'equipment' && !itemSearchOptions['filter'][filterList[i]][item[filterList[i]]]) return false
                    break
                case 'FurnitureInteraction':
                    if (loadedItemList == 'furniture' && !item['Interaction'][regionID]) return false
                    break
                case 'EquipmentTier':
                    if (loadedItemList == 'equipment' && !itemSearchOptions['filter'][filterList[i]][item['Tier']]) return false
                    break
                case 'Craftable':
                    if ((loadedItemList == 'items' || loadedItemList == 'furniture') && !item[filterList[i]][regionID]) return false
                    break
                case 'StageDrop':
                    if (loadedItemList == 'items' && !item[filterList[i]][regionID]) return false
                    break
                case 'Shop':
                    if (loadedItemList == 'items' && !item['Shops'].some(s => s.Released[regionID])) return false
                    break
                case 'ShowImmediateUse':
                case 'ShowExpired':
                    break
                default:
                    if (!itemSearchOptions['filter'][filterList[i]][item[filterList[i]]]) return false
                    break
            }           
        }
    }
    return (searchTerm == "" || getTranslatedString(item, 'Name').toLowerCase().includes(searchTerm.toLowerCase()))
}

function searchOptionSet(option, value, runSearch = true) {
    $(`#ba-student-search-${option} a`).removeClass("active")
    $(`#ba-student-search-${option} button`).removeClass("active")
    $(`#ba-student-search-${option}-${value}`).addClass("active")
    $(`#ba-student-search-sortby-stat .label`).text(translateUI('stat')+" ")

    if (option == "sortby" && value != "default" && value != "name") {
        $(`#ba-student-search-sortby-stat`).addClass("active")
        $(`#ba-student-search-sortby-stat .label`).text($(`#ba-student-search-sortby-${value}`).text() + " ")
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
        if (typeof v === 'boolean') {
            if (v) num += 1
        } else {
            $.each(v, function(j, w) {
                if (w === true) num += 1
            })
        }
    })
    for (filter in search_options["filterSelect"]) {
        if (search_options["filterSelect"][filter].length > 0) num += 1
    }
    return num
}

function searchToggleUseCollectionStats() {
    sortByCollectionStats = !sortByCollectionStats
    $('#ba-student-search-sortby-usecollectionstats .item-toggle-icon').html(`<i class="fa-solid fa-toggle-${sortByCollectionStats ? 'on' : 'off'}"></i>`)

    studentStatsList = null
    localStorage.setItem('chara_sortby_collectionstats', sortByCollectionStats)
    updateStudentList(true)
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
    $(`#ba-student-search-sortby .btn-pill`).removeClass("active")
    $(`#ba-student-search-sortby-${value.toLowerCase()}`).addClass("active")
    $('#ba-student-search-sortby-stat .label').text(translateUI('others'))
    $('.sort-direction-label').text("")

    $(`#ba-student-search-sortby-${value.toLowerCase()} .sort-direction-label`).html((search_options["sortby_dir"] == 1) != (value == "Name" || value == "Default" || value == "BirthDay" || value == "Illustrator" || value == "Designer" || value == "MemoryLobbyBGM") ? '<i class="fa-solid fa-arrow-down-long ms-2"></i>' : '<i class="fa-solid fa-arrow-up-long ms-2"></i>')

    if (value != "Default" && value != "Name") {
        $('#ba-student-search-sortby-stat').addClass("active")
        $('#ba-student-search-sortby-stat .label').html($(`#ba-student-search-sortby-${value.toLowerCase()}`).html())
    }

    search_options["sortby"] = value
    localStorage.setItem('chara_sortby', value)
    localStorage.setItem('chara_sortby_dir', search_options["sortby_dir"])
    if (runSearch) {
        updateStudentList(updateSortMethod = true)
    }
    $('#ba-student-search-sortby-stat').dropdown('hide')
}

function searchSetOrderItems(value, runSearch = true, swapDir = true) {

    if (swapDir) {
        if (value == itemSearchOptions["sortby"]) {
            itemSearchOptions["sortby_dir"] = -itemSearchOptions["sortby_dir"]
        } else {
            itemSearchOptions["sortby_dir"] = 1
        }
    }

    $(`#item-search-sortby a`).removeClass("active")
    $(`#item-search-sortby button`).removeClass("active")
    $(`#item-search-sortby-${value.toLowerCase()}`).addClass("active")
    $('.sort-direction-label').text("")

    $(`#item-search-sortby-${value.toLowerCase()} .sort-direction-label`).html((itemSearchOptions["sortby_dir"] == 1) ? '<i class="fa-solid fa-arrow-up-long ms-2"></i>' : '<i class="fa-solid fa-arrow-down-long ms-2"></i>')

    itemSearchOptions["sortby"] = value
    localStorage.setItem('item_sortby', value)
    localStorage.setItem('item_sortby_dir', itemSearchOptions["sortby_dir"])
    if (runSearch) {
        updateItemList(updateSortMethod = true)  
    }
}

function searchSetFilter(prop, value, runSearch = true) {
    if (value != null) {
        search_options["filter"][prop][value] = !search_options["filter"][prop][value]
        if ($(`#ba-student-search-filter-${prop.toLowerCase()}-${String(value).toLowerCase()}`).hasClass('mutually-exclusive')) {
            //deactivate all other options
            $(`[id^="ba-student-search-filter-${prop.toLowerCase()}"].btn-pill`).toggleClass("active", false)
            for (option in search_options["filter"][prop]) {
                if (option != value) search_options["filter"][prop][option] = false
            }
        }
        $(`#ba-student-search-filter-${prop.toLowerCase()}-${String(value).toLowerCase()}`).toggleClass("active", search_options["filter"][prop][value])
    } else {
        search_options["filter"][prop] = !search_options["filter"][prop]
        $(`#ba-student-search-filter-${prop.toLowerCase()}`).toggleClass("active", search_options["filter"][prop])
    }

    if (runSearch) {
        updateStudentList()
    }
}

function searchSetFilterSelect(prop, value, runSearch = true) {

    const index = search_options["filterSelect"][prop].indexOf(value)

    if (index == -1) {
        search_options["filterSelect"][prop].push(value)
        $(`a[data-filter-select-prop="${prop}"][data-filter-select-value="${value}"]`).toggleClass("active", true)
    } else {
        search_options["filterSelect"][prop].splice(index, 1)
        $(`a[data-filter-select-prop="${prop}"][data-filter-select-value="${value}"]`).toggleClass("active", false)
    }

    $(`#ba-student-search-select-${prop.toLowerCase()}`).toggleClass("active", search_options["filterSelect"][prop].length > 0)

    if (runSearch) {
        updateStudentList()
    }
}

function searchSetFilterItems(prop, value, runSearch = true) {
    if (value != null) {
        itemSearchOptions["filter"][prop][value] = !itemSearchOptions["filter"][prop][value]
        $(`#item-search-filter-${prop.toLowerCase()}-${String(value).toLowerCase()}`).toggleClass("active", itemSearchOptions["filter"][prop][value])    
    } else {
        itemSearchOptions["filter"][prop] = !itemSearchOptions["filter"][prop]
        $(`#item-search-filter-${prop.toLowerCase()}`).toggleClass("active", itemSearchOptions["filter"][prop])
    }
    if (runSearch) {
        updateItemList()
    }
}

function searchResetFilter() {
    $('#ba-student-search-text').val('')
    Object.entries(search_options["filter"]).forEach(prop => {
        if (typeof prop[1] === 'boolean') {
            search_options["filter"][prop[0]] = false
            $(`#ba-student-search-filter-${prop[0].toLowerCase()}`).toggleClass("active", false)
        } else {
            Object.entries(prop[1]).forEach (val => {
                search_options["filter"][prop[0]][val[0]] = false
                $(`#ba-student-search-filter-${prop[0].toLowerCase()}-${String(val[0]).toLowerCase()}`).toggleClass("active", false)
            })
        }
    })

    for (prop in search_options["filterSelect"]) {
        search_options["filterSelect"][prop] = []
        $(`#ba-student-search-select-${prop.toLowerCase()}`).toggleClass("active", false)
        $(`a[data-filter-select-prop="${prop}"][data-filter-select-value]`).toggleClass("active", false)
    }

    $('#ba-student-search-reset').hide()
    $('#ba-student-search-filter-amount').text('')
    document.getElementById('ba-student-search-reset').blur()
    updateStudentList()
}

function setGridItemDisplayStyle(style) {
    if (gridItemDisplayStyle != style) {
        gridItemDisplayStyle = style
        localStorage.setItem("grid_item_display_style", gridItemDisplayStyle)

        $('#item-search-displaytype button').removeClass('active')
        $('#item-search-displaytype-'+style).addClass('active')

        switch (style) {
            case 'detailed':
                $('#item-select-grid').removeClass('items-compact').addClass('items')
                break;
        
            case 'compact':
                $('#item-select-grid').removeClass('items').addClass('items-compact')
                break;
        }

        populateItemList(loadedItemList)
    }
}

function renderStudent() {

    showAltSprite = false
    $('#ba-student-img').attr('src', `images/student/portrait/${student.Id}.webp`)
    let bgimg = new Image()
    bgimg.onload = function(){
        $("#ba-background").css('background-image', `url('${bgimg.src}')`)
    }
    bgimg.src = `images/background/${pixelMode ? 'pixel/' + student.CollectionBG + '.png' : student.CollectionBG + '.jpg'}`

    $('#ba-student-name').html(getTranslatedString(student, 'Name').replace(/([(（].+[)）])/,'<small>$1</small>'))
    $("#ba-student-class").removeClass("ba-class-main ba-class-support").addClass(`ba-class-${student.SquadType.toLowerCase()}`).find('.label').text(getLocalizedString('SquadType', student.SquadType))
    $("#ba-student-stargrade .label").html('<i class="fa-solid fa-star"></i>'.repeat(student.StarGrade))
    if (student.IsLimited > 0) {
        $("#ba-student-stargrade .label").append(`<span class="ms-1">(${getLocalizedString('IsLimited',''+student.IsLimited)})</span>`)
    } 

    $('.summon-list').toggleClass('disabled', student.Summons.length == 0)
    let summonList = ''
    summonList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-summon-id="0" class="btn btn-dark"><div class="icon"><img src="images/student/icon/${student.Id}.webp"></div><span>${getTranslatedString(student, "Name")}</span></a></li>`
    student.Summons.forEach((summon, index) => {
        const summonInfo = find(data.summons, 'Id', summon.Id)[0]
        const sourceSkill = find(student.Skills, 'SkillType', summon.SourceSkill)[0]
        summonList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-summon-id="${index+1}" class="btn btn-dark"><div class="icon"><img class="bg-atk-${student.BulletType.toLowerCase()}" src="images/skill/${sourceSkill.Icon}.webp"></div><span>${getTranslatedString(summonInfo, "Name")}</span></a></li>`
    })
    $('.summon-list .dropdown-menu').html(summonList)


    skillInfoCollection = []

    changeStudentSummon(0, false)

    $("#ba-student-role-label").text(getLocalizedString('TacticRole', student.TacticRole))
    $("#ba-student-role-icon").attr("src", `images/ui/Role_${student.TacticRole}.png`)
    
    setAttackTypeClass($("#ba-student-attacktype"), student.BulletType)
    setDefenseTypeClass($("#ba-student-defensetype"), student.ArmorType)

    $("#ba-student-academy-label").text(`${getLocalizedString('School',student.School)} / ${getLocalizedString('Club',student.Club)}`)
    $("#ba-student-school-img, #ba-student-academy-icon").attr("src", `images/schoolicon/School_Icon_${student.School.replace('Sakugawa', 'Etc').toUpperCase()}_W.png`)
    $("#ba-student-position-label").text(student.Position.toUpperCase())
    $("#ba-student-attacktype-label").text(getLocalizedString('BulletType',student.BulletType))
    $('#ba-student-attacktype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType',student.BulletType)}`, translateUI('attacktype'), null, getAttackTypeText(student.BulletType), 32), placement: 'top',  html: true})
    $("#ba-student-defensetype-label").text(getLocalizedString('ArmorType',student.ArmorType))
    $('#ba-student-defensetype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorTypeLong',student.ArmorType)}`, translateUI('defensetype'), null, getDefenseTypeText(student.ArmorType), 32), placement: 'top', html: true})
    
    $("#ba-student-usescover-icon").toggle(student.Cover)

    $("#ba-student-weapontype-label").text(student.WeaponType)
    $(".ba-type-weapon").css("background-image", `url('images/weapon/${student.WeaponImg}.webp')`)

    //Skills
    student.Skills.filter(skill => skill.SkillType != 'autoattack').forEach((skill) => {
        $(`#ba-skill-${skill.SkillType}-name`).html(getTranslatedString(skill, 'Name'))
        $(`#ba-skill-${skill.SkillType}-icon img`).attr("src", `images/skill/${skill.Icon}.webp`)
        if (skill.SkillType == 'passive') {
            $('#ba-statpreview-passiveskill-icon img, #ba-statpreview-status-passive-icon').attr("src", `images/skill/${skill.Icon}.webp`)
        }
        if (skill.SkillType == "ex") {
            $("#ba-skill-ex-cost").removeClass("ba-col-explosion ba-col-pierce ba-col-mystic ba-col-sonic")
            if (skill.Cost[0] != skill.Cost[4]) {
                $("#ba-skill-ex-cost").addClass(`ba-col-${student.BulletType.toLowerCase()}`)
            }
        }
    })

    initCharacterSkillInfo()

    $(".bg-skill").removeClass("explosion pierce mystic sonic").addClass(`${student.BulletType.toLowerCase()}`)

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
    $("#ba-student-weapon-img, #ba-statpreview-weapon-img").attr("src", `images/weapon/${student.WeaponImg}.webp`)

    $('#ba-weapon-bonus-terrain-type').attr("src", `images/ui/Terrain_${student.Weapon.AdaptationType}.png`)
    let initialTerrainAmount = adaptationAmount[student[student.Weapon.AdaptationType+'BattleAdaptation']]
    let bonusTerrainAmount = adaptationAmount[student[student.Weapon.AdaptationType+'BattleAdaptation'] + student.Weapon.AdaptationValue]
    $('#ba-weapon-bonus-terrain-adaption').attr("src", `images/ui/Ingame_Emo_Adaptresult${bonusTerrainAmount}.png`)
    $('#ba-weapon-bonus-terrain-adaption-description').html(`${translateUI("terrain_adaption", [getLocalizedString('AdaptationType',student.Weapon.AdaptationType)])} ${initialTerrainAmount} → <b>${bonusTerrainAmount}</b><br>(${getAdaptationText(student.Weapon.AdaptationType, bonusTerrainAmount)})`)
    $('#ba-weapon-stat-table .stat-HealPower').parent().toggle(student.Weapon.HealPower1 > 0)

    //Gear
    if ("Released" in student.Gear && student.Gear.Released[regionID]) {
        $('#ba-student-tab-gear, #ba-statpreview-ex-gear-container').show()
        $("#ba-student-gear-name, #ba-statpreview-gear4-name").html(student.Gear.Name)
        $("#ba-student-gear-description").html(`${student.Gear.Desc}\n\n<i>${translateUI('bond_req_equip',[region.GearBondReq[0], student.Name])}`)
        $("#ba-student-gear-icon").attr("src", `images/gear/full/${student.Id}.webp`)
        $("#ba-statpreview-gear4-icon, #ba-student-gear-4-icon").attr("src", `images/gear/icon/${student.Id}.webp`)
        $("#ba-student-gear-4-icon").tooltip('dispose').tooltip({title: getRichTooltip(`images/gear/icon/${student.Id}.webp`, getTranslatedString(student.Gear, 'Name').escapeHtml(), translateUI('student_ex_gear'), null, getTranslatedString(student.Gear, 'Desc').escapeHtml() + `\n\n<b>${translateUI("stat_info")}:</b>\n` + getGearStatsText(student.Gear, '\n'), 50, 'img-scale-larger'), placement: 'top', html: true}).toggleClass("gear-disabled", statPreviewGearLevel == 0)
        let gearMaterialsHtml = ""
        for (let i = 0; i < student.Gear.TierUpMaterial[0].length; i++) {
            gearMaterialsHtml += getMaterialIconHTML(student.Gear.TierUpMaterial[0][i], student.Gear.TierUpMaterialAmount[0][i])
        }
        
        let gearStats = student.Gear.StatType.map((x) => x.split('_')[0])
        generateStatTable('#ba-gear-stat-table', gearStats, 6)
        for (let i = 0; i < student.Gear.StatValue.length; i++) {
            let value = student.Gear.StatValue[i][1]
            if (student.Gear.StatType[i].split('_')[1] == "Coefficient") {
                value = parseFloat((value/100).toFixed(2))+'%'
            }
            $(`#ba-gear-stat-table .stat-${gearStats[i]} .stat-value`).text('+'+value)
        }

        gearMaterialsHtml += getMaterialIconHTML(3000001, abbreviateNumber(gear_upgrade_credits[0]))
        $("#ba-statpreview-gear4-description").html(getGearStatsText(student.Gear, ", "))
        $("#ba-student-gear-materials-t2").html(gearMaterialsHtml)
        $("#ba-student-gear-materials-t2>div").tooltip({html: true})
        $("#ba-student-bondreq-t2").html(translateUI('bond_req_upgrade',[region.GearBondReq[1], student.Name]))
    } else {
        $('#ba-student-tab-gear, #ba-statpreview-ex-gear-container').hide()
        if ($('#ba-student-tab-gear').hasClass('active')) {
            $('#ba-student-tab-stats').tab('show')
        }

        $('#ba-student-gear-4-icon').attr('src', 'images/gear/empty.png').tooltip('dispose').toggleClass("gear-disabled", true)
    }

    //Profile
    if (userLang != 'Jp') {
        $('#ba-student-fullname').text(getTranslatedString(student,'FamilyName')+' '+getTranslatedString(student,'PersonalName'))
    } else {
        $('#ba-student-fullname').html(
            `<ruby>${getTranslatedString(student,'FamilyName')}<rp>(</rp><rt>${getTranslatedString(student,'FamilyNameRuby')}</rt><rp>)</rp></ruby> `
            + (getTranslatedString(student,'PersonalNameRuby') == "" ? getTranslatedString(student,'PersonalName') : `<ruby>${getTranslatedString(student,'PersonalName')}<rp>(</rp><rt>${getTranslatedString(student,'PersonalNameRuby')}</rt><rp>)</rp></ruby> `))
    }
    $('#ba-profile-school-label').text(getLocalizedString('SchoolLong',student.School))
    $('#ba-profile-club-label').text(getLocalizedString('Club',student.Club))
    $('#ba-profile-schoolyear-label').text(getTranslatedString(student,'SchoolYear')).toggle(getTranslatedString(student,'SchoolYear') != "")
    $('#ba-profile-portrait-img').attr("src", `images/student/collection/${student.Id}.webp`)
    var profileHtml = ''
    profileHtml += student.ProfileIntroduction.escapeHtml()
    if (student.StarGrade == 3) {
        profileHtml += `\n\n<i class="text-bold">"${getTranslatedString(student,'CharacterSSRNew')}"</i>`
    }
    $('#ba-student-profile-text').html(profileHtml)

    if (student.MemoryLobby[regionID] > 0) {
        $(".ba-student-lobby").show()
        $("#ba-student-lobby-img").attr("src", `images/student/lobby/${student.Id}.webp`)
        $("#ba-student-lobby-unlock").text(student.MemoryLobby[regionID])
        $(".ba-student-lobby").tooltip('dispose').tooltip({title: getRichTooltip(null, translateUI('memory_lobby_student', [getTranslatedString(student,'Name')]), null, null, `${translateUI('memory_lobby_unlock', [student.MemoryLobby[regionID], getTranslatedString(student,'Name')])}\n${translateUI('memory_lobby_bgm', [student.MemoryLobbyBGM])}`), placement: 'top', html: true})
    } else {
        $(".ba-student-lobby").hide()
    }
    
    $('#ba-student-profile-age').html(getTranslatedString(student,'CharacterAge'))
    $('#ba-student-profile-birthday').html(getTranslatedString(student,'Birthday'))
    $('#ba-student-profile-hobbies').html(getTranslatedString(student,'Hobby'))
    $('#ba-student-profile-height').html(student.CharHeightMetric)
    $('#ba-student-profile-cv').html(getTranslatedString(student,'CharacterVoice'))
    $('#ba-student-profile-designer').html(student.Designer)
    $('#ba-student-profile-illustrator').html(student.Illustrator)

    $('#ba-student-toggle-sprite-btn').toggle(altSprite.includes(student.Id))

    let allTags = student.FavorItemTags
    allTags.push(student.FavorItemUniqueTags[0])
    allTags.push(student.FavorItemUniqueTags[0] + "2")

    const genericTags = data.config.CommonFavorItemTags
    const allGifts = data.items.filter(x => x.Category == "Favor" && x.IsReleased[regionID]).sort((a,b) => b.ExpValue - a.ExpValue)
    let favoriteGifts = ["", "", ""]

    for (const gift of allGifts) {
        const allTags = [...student.FavorItemTags, ...student.FavorItemUniqueTags, ...genericTags]
        const genericTagCount = gift.Tags.filter(x => genericTags.includes(x)).length
        const commonTags = gift.Tags.filter(x => allTags.includes(x))
        const favorGrade = Math.min(commonTags.length, 3)
        if (favorGrade - genericTagCount > 0) {
            favoriteGifts[favorGrade-1] += getFavourIconHTML(gift, favorGrade)
        }
    }

    if (favoriteGifts.join("") == "") {
        $('#ba-student-favoured-items').empty().html(`<span class="text-center">${translateUI('favoritem_none')}</span>`)
    } else {
        $('#ba-student-favoured-items').empty().html(favoriteGifts.reverse().join(""))
    }

    let favFurnitureHtml = ""
    $(student.FurnitureInteraction[regionID]).each(function(i,el){
        let item = find(data.furniture, "Id", el[0])[0]
        if (item.IsReleased[regionID]) {
            favFurnitureHtml += getFurnitureIconHTML(item)
        }
    })

    $('#ba-student-favoured-furniture').empty().html(favFurnitureHtml)
    if (favFurnitureHtml == "") {
        $('#ba-student-favoured-furniture').empty().html(`<span class="pb-2 text-center">${translateUI('furniture_none')}</span>`)
    } else {
        $('#ba-student-favoured-furniture').empty().html(favFurnitureHtml)
    }
    $('.ba-favor-item').tooltip({html: true})

    generateStatTable('#ba-bond-stat-table', student.FavorStatType, 6)

    if (student.SquadType == "Main") {
        $('#ba-student-stat-table').removeClass("striker-bonus")
        $('#ba-statpreview-status-strikerbonus').hide()
        $('#statpreview-supportstats').show()
        statPreviewViewSupportStats = false
    } else {
        $('#ba-statpreview-status-strikerbonus').show()
        $('#statpreview-supportstats').hide()
    }
    $('#ba-statpreview-status-strikerbonus').toggleClass("deactivated", !statPreviewViewSupportStats)
    
    if (student.TSAId && find(data.students, 'Id', student.TSAId)[0].IsReleased[regionID]) {
        statPreviewTSAStats.setStudent(student.TSAId)
        $('#statpreview-tsastats').toggle(statPreviewSelectedChar > 0)
    }
    $('#statpreview-tsastats').hide()

    $('#ba-statpreview-bond-targets').empty().html(getBondTargetsHTML(0, student))
    $('#statpreview-status-bond').empty().html(getBondToggleHTML(0, student))

    student_bondalts = []

    $('#ba-statpreview-status-bond-0-toggle').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_relationship_bonus', [student.Name])), placement: 'top', html: true})

    for (let i = 0; i < student.FavorAlts.length; i++) {
        var extraTarget = find(data.students,"Id",student.FavorAlts[i])[0]
        if (extraTarget.IsReleased[regionID]) {
            student_bondalts.push(extraTarget)
            $('#ba-statpreview-bond-targets').append(getBondTargetsHTML(student_bondalts.length, extraTarget))
            $('#statpreview-status-bond').append(getBondToggleHTML(student_bondalts.length, extraTarget))
            $(`#ba-statpreview-status-bond-${student_bondalts.length}-toggle`).tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_relationship_bonus', [extraTarget.Name])), placement: 'top', html: true})
        }
    }

    if (student.Id in studentCollection) {
        statPreviewStarGrade = studentCollection[student.Id].s

        statPreviewLevel = Math.min(studentCollection[student.Id].l, region.StudentMaxLevel)
        $('#ba-statpreview-levelrange').val(statPreviewLevel)
        changeStatPreviewLevel(document.getElementById('ba-statpreview-levelrange'), false)

        statPreviewEquipment = [Math.min(studentCollection[student.Id].e1, region.EquipmentMaxLevel[0]), Math.min(studentCollection[student.Id].e2, region.EquipmentMaxLevel[1]), Math.min(studentCollection[student.Id].e3, region.EquipmentMaxLevel[2])]
        $('#ba-statpreview-gear1-range').val(statPreviewEquipment[0])
        $('#ba-statpreview-gear2-range').val(statPreviewEquipment[1])
        $('#ba-statpreview-gear3-range').val(statPreviewEquipment[2])

        statPreviewPotentialLevel = {
            'MaxHP': studentCollection[student.Id].pm ? studentCollection[student.Id].pm : 0,
            'AttackPower': studentCollection[student.Id].pa ? studentCollection[student.Id].pa : 0,
            'HealPower': studentCollection[student.Id].ph ? studentCollection[student.Id].ph : 0,
        }

        for (const stat in statPreviewPotentialLevel) {
            $(`#ba-statpreview-potential-${stat.toLowerCase()}-range`).val(statPreviewPotentialLevel[stat])
        }

        statPreviewWeaponGrade = region.WeaponMaxLevel > 0 ? studentCollection[student.Id].ws : 0
        statPreviewWeaponLevel = Math.min(studentCollection[student.Id].wl, region.WeaponMaxLevel)
        $('#ba-statpreview-weapon-range').attr("max",region.WeaponMaxLevel).val(statPreviewWeaponLevel)

        statPreviewBondLevel[0] = Math.min(studentCollection[student.Id].b, region.BondMaxLevel)
        $('#ba-statpreview-bond-0-range').val(statPreviewBondLevel[0])
        $('#ba-statpreview-passiveskill-range').val(studentCollection[student.Id].s3)
        changeStatPreviewPassiveSkillLevel(document.getElementById('ba-statpreview-passiveskill-range'), false)
        statPreviewIncludeBond[0] = true
        statPreviewIncludeEquipment = true
        lockedAttributes = studentCollection[student.Id].lock !== undefined ? studentCollection[student.Id].lock : false

        $('#ba-student-collection-btn').toggleClass('active', true).html('<i class="fa-solid fa-circle-check"></i>')
        $('#ba-student-collection-btn').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_collection_remove')), placement: 'top', html: true})
        $('.btn-lock-attributes').show()
    } else {
        $('#ba-student-collection-btn').toggleClass('active', false).html('<i class="fa-solid fa-circle-plus"></i>')
        $('#ba-student-collection-btn').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_collection_add')), placement: 'top', html: true})
        lockedAttributes = false
        $('.btn-lock-attributes').hide()
    }
    $('.btn-lock-attributes').toggleClass('deactivated', !lockedAttributes)
    $('.btn-lock-attributes i').toggleClass('fa-lock', lockedAttributes).toggleClass('fa-lock-open', !lockedAttributes)

    statPreviewExternalBuffs.changeStudent(student.Id)

    updateGearIcon()

    changeStatPreviewStars(statPreviewStarGrade, statPreviewWeaponGrade, false)
    recalculateTerrainAffinity()
    changeSkillPreviewTerrain(statPreviewTerrain, false)
    changeStatPreviewPassiveSkillLevel(document.getElementById('ba-statpreview-passiveskill-range'), false)
    recalculateWeaponPreview()
    updateWeaponLevelStatPreview($('#ba-statpreview-weapon-range').val())

    recalculateSkillPreview()
    recalculateWeaponSkillPreview()
    recalculateGearSkillPreview()
    recalculateEXSkillPreview()
    if (student.Skills.some(s => s.SkillType == 'autoattack')) {
        $('#ba-skill-autoattack').show()
        recalculateNormalAttackPreview()
    } else {
        $('#ba-skill-autoattack').hide()
    }
    recalculateBondPreview()

    changeGearLevel(1, document.getElementById('ba-statpreview-gear1-range'), false)
    changeGearLevel(2, document.getElementById('ba-statpreview-gear2-range'), false)
    changeGearLevel(3, document.getElementById('ba-statpreview-gear3-range'), false)

    changePotentialLevel('MaxHP', document.getElementById('ba-statpreview-potential-maxhp-range'), false)
    changePotentialLevel('AttackPower', document.getElementById('ba-statpreview-potential-attackpower-range'), false)
    changePotentialLevel('HealPower', document.getElementById('ba-statpreview-potential-healpower-range'), false)

    if ("Released" in student.Gear && student.Gear.Released[regionID]) {
        changeExGearLevel(document.getElementById('ba-statpreview-gear4-range'), false)
    }
    for (let i = 0; i <= student_bondalts.length; i++) {
        if (i > 0 && student_bondalts[i-1].Id in studentCollection) {
            statPreviewBondLevel[i] = studentCollection[student_bondalts[i-1].Id].b
            $(`#ba-statpreview-bond-${i}-range`).val(studentCollection[student_bondalts[i-1].Id].b)
            statPreviewIncludeBond[i] = true
        }
        changeStatPreviewBondLevel(i, false)
    }
    
    refreshStatTableControls()
    recalculateStats()

    finalizeLoad(getTranslatedString(student, 'Name'), "chara", student.PathName, 'View Student', student.Id)

    if (!student.IsReleased[regionID]) {
        showReleaseWarning()
    }

    studentSelectorModal.hide()
}

function initCharacterSkillInfo() {
    const skillInfoContainer = $('#calculation-student-skills').empty()
    skillInfoCollection = []

    if (statPreviewSelectedChar == 0) {

        student.Skills.forEach((skill) => {
            if (skill.SkillType == "gearnormal" && !student.Gear.Released[regionID]) return
            if (skill.HideCalculation) return
            if ('Effects' in skill) {
                let show = false
                skill.Effects.forEach(eff => {
                    if (eff.Type.startsWith('DMG') || eff.Type.startsWith("Heal") || eff.Type == "Shield" || eff.Type == "FormChange" || eff.Type == "CrowdControl") show = true
                })
                if (show) {
                    if (skill.SkillType == "autoattack") addNormalAttackSkillText(skill)
                    skillInfoCollection.push(new SkillDamageInfo(skill, skillInfoContainer, student))
                }
            }

            if (skill.ExtraSkills) {
                for (const extraSkill of skill.ExtraSkills.filter(s => s.Effects && !s.TSAId)) {
                    if (extraSkill.Effects.find(eff => eff.Type.startsWith('DMG') || eff.Type.startsWith("Heal") || eff.Type == "Shield" || eff.Type == "FormChange" || eff.Type == "CrowdControl")) {
                        skillInfoCollection.push(new SkillDamageInfo(extraSkill, skillInfoContainer, student))
                    }
                }
            }
        })

        if (student.Gear.Released != undefined && student.Gear.Released[regionID]) {
            skillInfoContainer.find('.skill-info-gearnormal').toggle(statPreviewGearLevel >= 2)
            skillInfoContainer.find('.skill-info-normal').toggle(statPreviewGearLevel < 2)
        }

    } else {
        const summon = find(data.summons, 'Id', student.Summons[0].Id)[0]
    
        summon.Skills.filter(s => s.Effects).forEach((skill) => {
            if (skill.Effects.find(eff => eff.Type.startsWith('DMG') || eff.Type.startsWith("Heal") || eff.Type == "Shield" || eff.Type == "FormChange" || eff.Type == "CrowdControl")) {
                if (skill.HideCalculation) return
                if (skill.SkillType == "autoattack") addNormalAttackSkillText(skill)
                skillInfoCollection.push(new SkillDamageInfo(skill, skillInfoContainer, student))
            }
        })

        if (student.TSAId) {
            const tsaStudent = find(data.students, 'Id', student.TSAId)[0]

            if (tsaStudent.IsReleased[regionID]) {
                for (const extraSkill of tsaStudent.Skills.filter(s => s.ExtraSkills)) {
                    for (const tsaSkill of extraSkill.ExtraSkills.filter(s => s.TSAId == student.Id)) {
                        skillInfoCollection.push(new SkillDamageInfo(tsaSkill, skillInfoContainer, student, tsaStudent))
                    }
                }
            }

            skillInfoContainer.find('.skill-info-tsa').toggle(statPreviewTSAStats.enabled)
            
        }
    
    }

    if (skillInfoCollection.length == 0) {
        skillInfoContainer.html(`<div class="d-flex px-2 my-2 justify-content-center text-center">${translateUI("skillinfo_empty")}</div>`)
    }
}

function initRaidSkillInfo(raidId, enemyId, raidDifficulty) {
    const skillInfoContainer = $('#calculation-enemy-skills').empty()
    raidSkillInfoCollection = []

    if (raidId < 1000000) {

        const raid = find(raidId < 800000 ? data.raids.Raid : data.raids.WorldRaid, "Id", raidId)[0]
        const enemy = find(data.enemies, "Id", enemyId)[0]
        
        if (raid.HasNormalAttack.includes(enemyId)) {
            const autoAttackSkill = {
                SkillType: "raidautoattack",
                IsRaidSkill: true,
                RaidDifficulty: 0,
                Effects: [
                    {
                        Type: "DMGSingle",
                        Hits: [
                            10000
                        ],
                        Scale: [
                            10000
                        ],
                        CriticalCheck: "Check"
                    }
                ]
            }
        
            addNormalAttackSkillText(autoAttackSkill)
        
            raidSkillInfoCollection.push(new SkillDamageInfo(autoAttackSkill, skillInfoContainer, enemy))
        }
    
        for (const raidSkill of raid.RaidSkill) {
            if ('Effects' in raidSkill) {
                let show = false
                raidSkill.Effects.forEach(eff => {
                    if ((eff.Type.startsWith('DMG') || eff.Type == "CrowdControl") && eff.RestrictTo.includes(enemyId)) show = true
                })
                if (show) {
                    raidSkill.IsRaidSkill = true
                    raidSkill.RaidDifficulty = raidDifficulty

                    if (raidSkill.SkillType == "raidautoattack") {
                        raidSkill.RaidDifficulty = 0
                        raidSkill.Name = translateUI('skill_normalattack')
                        raidSkill.Desc = translateUI('skill_normalattack_target')
                        raidSkill.Parameters = [[`${parseInt(raidSkill.Effects[0].Scale[0][0] / 100)}%`]]
                    }

                    if (!raidSkill.Name) {
                        raidSkill.Name = translateUI(`student_skill_${raidSkill.SkillType.toLowerCase()}`)
                    }

                    raidSkillInfoCollection.push(new SkillDamageInfo(raidSkill, skillInfoContainer, enemy))
                }
            }
        }
    }

    $('#skill-calculation-tabs').toggle(raidSkillInfoCollection.length > 0)
    if (raidSkillInfoCollection.length == 0) $('#skill-calculation-tab-student').tab('show')
}

function addNormalAttackSkillText(skill) {
    skill["Name"] = translateUI('skill_normalattack')
    skill["Parameters"] = [["100%"]]

    if (skill.Radius && skill.Radius.length) {
        switch (skill.Radius[0].Type) {
            case "Circle":
                skill["Desc"] = translateUI('skill_normalattack_circle')
                skill["Icon"] = "COMMON_SKILLICON_CIRCLE"
                break
            case "Obb":
                skill["Desc"] = translateUI('skill_normalattack_line')
                skill["Icon"] = "COMMON_SKILLICON_LINE"
                break
            case "Fan":
                skill["Desc"] = translateUI('skill_normalattack_fan')
                skill["Icon"] = "COMMON_SKILLICON_FAN"
                break
        }
    } else {
        skill["Desc"] = translateUI('skill_normalattack_target')
        skill["Icon"] = "COMMON_SKILLICON_TARGET"
    }
}

function loadStudent(studentName) {
    if (loadedModule == 'students') {
        if (selectCompareMode) {
            studentCompare = find(data.students, "PathName", studentName)
            if (studentCompare.length == 0) {
                // Legacy support for when DevName was used in the url
                studentCompare = findOrDefault(data.students, "DevName", studentName, "Aru")
            }
            studentCompare = studentCompare[0]
            selectCompareMode = false
            changeStudentSummon(0, false)
            compareMode = true
            updateCompareModeControl()
            recalculateStats()
            studentSelectorModal.hide()
        } else {
            student = find(data.students, "PathName", studentName)
            if (student.length == 0) {
                // Legacy support for when DevName was used in the url
                student = findOrDefault(data.students, "DevName", studentName, "Aru")
            }
            student = student[0]

            // Clear the comparison view if we select the student we are comparing against
            if (compareMode) {
                if (student.Id == studentCompare.Id) {
                    compareMode = false
                    updateCompareModeControl()
                }
            }

            renderStudent()
            
        }

    } else {
        loadModule('students', studentName)
    }
}

function loadStudentById(studentId) {
    if (loadedModule == 'students') {
        student = findOrDefault(data.students, "Id", studentId, 10000)[0]
        renderStudent()
    } else {
        loadModule('students')
    }
}

function loadItem(id) {
    if (loadedModule == 'items') {
        var mode = '', item, iconPath
        $(".tooltip").tooltip("hide")
        $('#item-select-grid .card-items.selected').removeClass('selected')
        $('#ba-furniture-details').hide()

        if (id >= 2000000 && id < 3000000) {
            mode = 'equipment'
            iconPath = 'equipment'
            item = findOrDefault(data.equipment, "Id", id-2000000, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.Category))
        } else if (id >= 1000000 && id < 2000000) {
            mode = 'furniture'
            iconPath = 'furniture'
            item = findOrDefault(data.furniture, "Id", id-1000000, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.SubCategory))

            $('#ba-furniture-details').show()
            $('#furniture-set').html(getLocalizedString('FurnitureSet', ''+item.SetGroupId))
            $('#furniture-comfort').html(`<img class="inline-img" src="images/ui/Cafe_Icon_Comfort.png"> ${item.ComfortBonus}`)
            $('#furniture-size').html(item.Category == 'Interiors' ? '-' : `${item.Size[0]} &times; ${item.Size[1]}`)
            
        } else {
            mode = 'items'
            iconPath = 'item'
            item = findOrDefault(data.items, "Id", id, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.Category))
        }

        loadedItem = item
        loadedItemType = mode

        $('#ba-item-name').html(getTranslatedString(item, 'Name'))
        if (mode == 'equipment' && item.Id >= 1000) {
            $('#ba-item-rarity .label').html(`T${item.Tier}`)
        } else {
            $('#ba-item-rarity .label').html(getRarityTier(item.Rarity))
        }
        
        $('#ba-item-icon').removeClass('ba-item-n ba-item-r ba-item-sr ba-item-ssr').addClass('ba-item-'+item.Rarity.toLowerCase())
        $('#ba-item-icon-img, #item-icon-full').attr('src', `images/${iconPath}/icon/${item.Icon}.webp`)
        $('#item-icon-full').attr('src', `images/${iconPath}/full/${item.Icon}.webp`)

        let description = getTranslatedString(item, 'Desc').escapeHtml()
        if (item.ImmediateUse) {
            description += `\n\n<i><i class="fa-solid fa-box-open me-1"></i>${translateUI('item_is_immediateuse')}</i>`
        }
        
        if (item.ExpiryTime && item.ExpiryTime[regionID]) {
            const currentTime = new Date().getTime() / 1000
            const expiryTimeString = new Date(item.ExpiryTime[regionID] * 1000).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
            if (item.ExpiryTime[regionID] <= currentTime) {
                description += `\n\n<i><i class="fa-solid fa-clock me-1"></i>${translateUI('item_is_expired', [expiryTimeString])}</i>`
            } else {
                description += `\n\n<i><i class="fa-solid fa-clock me-1"></i>${translateUI('item_is_expiring', [expiryTimeString])}</i>`
            }
        }

        $('#ba-item-description').html(description)

        if (mode == 'equipment' && item.Id >= 1000 && item.Id <= 10000) {
            //$('#ba-item-description').append(`\n\n<b>${translateUI("stat_info")}:</b>\n` + getGearStatsText(item, '\n'))
            $('#ba-equipment-details').show()
            generateStatTable('#ba-equipment-details', item.StatType, 6)

            item.StatType.forEach((statKey, index) =>  {
                let maxValue = item.StatValue[index][1]
                if (statKey.split('_')[1] == "Coefficient") {
                    maxValue = parseFloat((maxValue/100).toFixed(2))+'%'
                }
                $(`#ba-equipment-details .stat-${statKey} .stat-value`).text('+'+maxValue)
            })

        } else {
            $('#ba-equipment-details').hide()
        }

        if (item.Category.includes("WeaponExpGrowth")) {
            $('#ba-item-description').append(`\n\n<i>${getLocalizedString('WeaponPartExpBonus', item.Category)}</i>`)
        }
        $('#ba-equipment-recipe').empty().hide()
        $('#ba-item-usage').empty().hide()
        $('#ba-item-sources').empty().hide()
        $('#ba-item-shops').empty().hide()
        $('#ba-item-craftnodes').empty().hide()
        $('#ba-item-consumables').empty().hide()
        if (item.Category == 'Material' || item.Category == 'CharacterExpGrowth') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-sources').html(getItemDropStages(item.Id))
        } else if (item.Category == 'Consumable') {
            $('#ba-item-sources').html(getItemDropStages(item.Id))
            if (item.ConsumeType !== undefined) {
                $('#ba-item-usage').html(getConsumableRewards(item))
                $('#ba-item-usage .item-drop').tooltip({html: true})
            }
        } else if (item.Category == 'Favor') {
            $('#ba-item-usage').html(getLikedByStudents(item))
            $('.ba-item-student').tooltip({html: true})
        } else if (item.Category == 'SecretStone') {
            $('#ba-item-sources').html(getItemDropStages(item.Id))
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
        } else if (mode == 'equipment') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('#ba-item-sources').html(getItemDropStages(item.Id+2000000))
            $('#ba-equipment-recipe').html(getEquipmentRecipe(item))
            $('#ba-equipment-recipe div').each(function(i,el) {
                $(el).tooltip({html: true})
            })
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-craftnodes').html(getItemCraftNodes(item.Id, 'Equipment'))
        } else if (item.Category == 'Coin') {
            $('#ba-item-sources').html(getItemDropStages(item.Id, true))
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
        }

        if (mode == 'furniture') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-craftnodes').html(getItemCraftNodes(item.Id, 'Furniture'))
        } else if (mode == 'items') {
            $('#ba-item-craftnodes').html(getItemCraftNodes(item.Id, 'Item'))
        }

        $('#ba-item-consumables').html(getItemConsumables(id))
        $('#ba-item-consumables .item-icon-list div').tooltip({html: true})

        if (item.Shops) {
            let html = ''
            item.Shops.forEach((shop) => {
                if (shop.Released[regionID]) html += getShopCardHTML(shop)
            })
            if (html != '') {
                $('#ba-item-shops').html(`<div class="mb-2"><i>${translateUI('item_purchasedfrom')}</i></div><div class="selection-grid stage selection-grid-flex">${html}</div>`).show()
                $('#ba-item-shops .shop-cost').tooltip({html: true, placement: 'top'})
            }
        }

        if (region.FurnitureTemplateMax > 0 && item.Templates) {
            let html = ''
            item.Templates.forEach((template) => {
                if (template[0] > region.FurnitureTemplateMax) return
                html += `<div class="selection-grid-card card-shop">
                <div class="card-img"><img loading="lazy" src="images/furniture/template/${template[0]}.webp"></div>`
                let templateName = getLocalizedString("FurnitureTemplate", template[0])
                html += `<span class="card-badge stage-droprate">&times;${template[1]}</span>`
                html += `<div class="card-label">`
                html += `<span class="label-text ${templateName.length > label_enemy_smalltext_threshold[userLang] ? "smalltext" : "" }">${templateName}</span>`
                html += `</div></div>`
            })
            if (html != '') {
                $('#ba-item-shops').html(`<div class="mb-2"><i>${translateUI('furniture_templates')}</i></div><div class="selection-grid stage selection-grid-flex">${html}</div>`).show()
            }
        }

        $(`#ba-item-list-tab-${mode}`).tab('show')
        $('#item-select-'+id).addClass('selected')
        if (loadedItemList != mode) populateItemList(mode)

        finalizeLoad(getTranslatedString(item, 'Name'), "item", id, 'View Item', id)

        if (!item.IsReleased[regionID]) {
            showReleaseWarning()
        }

    } else {
        loadModule('items', id)
    }
}

function loadCraft(id) {
    if (loadedModule == 'craft') {

        if (loadedCraftId > 0) $('#craft-select-'+loadedCraftId).removeClass('selected')

        if (id < 100000) {
            const craftNode = findOrDefault(data.crafting.Nodes, "Id", id, 1)[0]
            loadedCraftNode = craftNode
            loadedCraftId = craftNode.Id

            $('#ba-craft-name').html(getTranslatedString(craftNode,'Name'))
            $('#ba-craft-type').html(getLocalizedString("NodeTier", ''+craftNode.Tier))
            $('#ba-craft-rarity .label').html(getLocalizedString("NodeQuality", ''+craftNode.Quality))
            $('#ba-craft-icon').removeClass('ba-node-quality-1 ba-node-quality-2').addClass('ba-node-quality-'+craftNode.Quality)
            $('#ba-craft-icon-img').attr('src', `images/ui/${craftNode.Icon}.png`)
            $('#ba-craft-description').text(getTranslatedString(craftNode, 'Desc'))
            $('#ba-craft-rewards-title').text(translateUI('craft_rewards'))
            $('#ba-craft-rewards').empty()
            let rewardsHtml = ''
            let nodeWeightTotal = 0
            craftNode.Groups.forEach(grp => {nodeWeightTotal += grp.Weight})
            $.each(craftNode.Groups, function(i,el){
                let itemGroup = data.crafting.Groups[el.GroupId], maxWeight = 0
                for (let j = 0; j < itemGroup.length; j++) {
                    maxWeight += itemGroup[j].Weight
                }
                for (let j = 0; j < itemGroup.length; j++) {
                    let itemWeight = ((el.Weight / nodeWeightTotal) * (itemGroup[j].Weight / maxWeight)).toFixed(4)
                    let itemId = itemGroup[j].ItemId
                    if (itemGroup[j].Type == "Furniture") {
                        itemId += 1000000
                    } else if (itemGroup[j].Type == "Equipment") {
                        itemId += 2000000
                    }  else if (itemGroup[j].Type == "Currency") {
                        itemId += 3000000
                    }
                    rewardsHtml += getDropIconHTML(itemId,itemWeight,itemGroup[j].AmountMin,itemGroup[j].AmountMax,true)
                }
            })
            $('#ba-craft-rewards').html(rewardsHtml)
            $('#ba-craft-rewards div').each(function(i,el) {
                $(el).tooltip({html: true})
            })
    
            $('#craft-select-'+loadedCraftNode.Id).addClass('selected')
            finalizeLoad(getTranslatedString(craftNode, 'Name'), "craftnode", craftNode.Id, 'View Crafting', craftNode.Id)
        } else {
            const recipe = findOrDefault(data.crafting.Fusion, "Id", id % 100000, 1)[0]
            const itemList = recipe.ResultId >= 1000000 ? 'furniture' : 'items'
            const iconPath = itemList == 'items' ? 'item' : itemList
            const item = find(data[itemList], 'Id', recipe.ResultId % 1000000)[0]
            loadedCraftNode = recipe
            loadedCraftId = recipe.Id + 100000

            $('#ba-craft-name').html(getTranslatedString(item,'Name'))
            $('#ba-craft-type').html(translateUI('craft_fusion'))
            $('#ba-craft-rarity .label').html(getRarityTier(item.Rarity))
            $('#ba-craft-icon').removeClass('ba-node-quality-1 ba-node-quality-2 ba-item-n ba-item-r ba-item-sr ba-item-ssr').addClass('ba-item-'+item.Rarity.toLowerCase())
            $('#ba-craft-icon-img').attr('src', `images/${iconPath}/icon/${item.Icon}.webp`)
            $('#ba-craft-description').text(getTranslatedString(item, 'Desc'))
            $('#ba-craft-rewards-title').text(translateUI('craft_recipe_items'))
            $('#ba-craft-rewards').empty()

            let html = ''
            html += getMaterialIconHTML(recipe.RequireItem[0], recipe.RequireItem[1])
            html += getMaterialIconHTML(3000001, recipe.RequireGold)
            html += '<div class="ba-panel-separator"></div>'

            data.items.forEach(item => {
                if (item.IsReleased[regionID] && item.Tags.filter(tag => recipe.IngredientTag.includes(tag)).length > 0) {
                    html += getDropIconHTML(item.Id, getServerProperty(item, 'ShiftingCraftQuality') / recipe.IngredientExp, 1, 1, true)
                }
            })

            data.furniture.forEach(item => {
                if (item.IsReleased[regionID] && item.Tags.filter(tag => recipe.IngredientTag.includes(tag)).length > 0) {
                    html += getDropIconHTML(item.Id+1000000, getServerProperty(item, 'ShiftingCraftQuality') / recipe.IngredientExp, 1, 1, true)
                }
            })

            $('#ba-craft-rewards').html(html)
            $('#ba-craft-rewards div').each(function(i,el) {
                $(el).tooltip({html: true})
            })

            $('#craft-select-'+loadedCraftId).addClass('selected')
            finalizeLoad(getTranslatedString(item, 'Name'), "craftnode", loadedCraftId, 'View Crafting', loadedCraftId)

            if (!item.IsReleased[regionID]) {
                showReleaseWarning()
            }
        }

    } else {
        loadModule('craft', id)
    }
}

function loadRaid(raidId) {
    selectedEnemy = 0
    if (loadedModule == 'raids') {
        if (isNaN(parseInt(raidId))) {raidId = 1}
        if (loadedRaid) $('#raid-select-'+loadedRaid.Id).removeClass('selected')
        let raidName

        $('#ba-raid-entrycost-container').toggle(raidId < 1000000)
        $('#multifloor-raid-floor').toggle(raidId >= 1000000)
        $('#ba-raid-info-tabs').toggle(raidId < 1000000)

        if (raidId < 1000) {
            $('#ba-raid-list-tab-raid').tab('show')
            $('#ba-raid-info').show()
            $('#ba-timeattack-info').hide()
            $('#ba-worldraid-difficulty').hide()
            $('#ba-raid-difficulty').show()
            $('#ba-raid-info-tab-profile').show()
            raid = findOrDefault(data.raids.Raid,"Id",raidId,1)[0]

            if (raid_difficulty > raid.MaxDifficulty[regionID]) {
                raid_difficulty = raid.MaxDifficulty[regionID]
            }

            for (let i = 0; i <= 6; i++) {
                $(`#ba-raid-difficulty-${i}`).toggle(i <= raid.MaxDifficulty[regionID])
            }

            $(`#ba-raid-difficulty-${raid_difficulty}`).tab('show')
        
            $('#ba-raid-affiliation').text(getLocalizedString('StageType', 'Raid'))
            raidName = getTranslatedString(raid, 'Name')
            $('#ba-raid-name').text(raidName)       
            $('#ba-raid-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain[0]}.png`)
            if (raid.Terrain.length > 1) {
                $('#ba-raid-terrain-alt-img').attr('src', `images/ui/Terrain_${raid.Terrain[1]}.png`)
                $('#ba-raid-terrain-alt').show()
            } else {
                $('#ba-raid-terrain-alt').hide()
            }
            $('#ba-raid-profile-page').show()
            $('#ba-raid-profile-name').text(getTranslatedString(raid, "Name"))
            $('#ba-raid-profile-affiliation').text(getLocalizedString("BossFaction", raid.Faction))
            $('#ba-raid-profile').html(getTranslatedString(raid, "Profile"))
    
            changeRaidDifficulty(raid_difficulty)
            //populate raid seasons
            const raidSeasons = find(data.raids["RaidSeasons"][regionID]["Seasons"], "RaidId", raid.Id)
            let optionsHtml = ''
            const dateOptions = {year: "2-digit", month: "numeric", day: "numeric"}

            //optionsHtml += `<option value="0" disabled>---${getLocalizedString('StageType', 'Raid')}---</option>`
            optionsHtml += `<li><h6 class="dropdown-header">${getLocalizedString('StageType', 'Raid')}</h6></li>`

            const rewardMaxDifficulty = {36: 'HC', 40: 'EXT', 44: 'INS', 48: 'TOR', 54: 'TOR', 56: 'TOR'}

            raidSeasons.forEach((season) => {
                const start = new Date(season.Start*1000).toLocaleString([], dateOptions)
                const end = new Date(season.End*1000).toLocaleString([], dateOptions)

                const difficulty = rewardMaxDifficulty[season.RewardSetMax]

                optionsHtml += `<li><a class="dropdown-item" href="javascript:;" class="btn btn-dark" data-season="${season.SeasonId}"><div class="d-flex gap-1 align-items-end"><span class="label p-0">${translateUI('raid_season',[season.SeasonDisplay])}</span><img class="inline-img invert-light" src="images/ui/Terrain_${season.Terrain}.png"><small class="text-bold">${difficulty}</small><small class="ms-1">${start} - ${end}</small></div></a></li>`
            })

            if (data.raids["RaidSeasons"][regionID]["EliminateSeasons"].length) {
                const eliminateRaidSeasons = find(data.raids["RaidSeasons"][regionID]["EliminateSeasons"], "RaidId", raid.Id)

                if (eliminateRaidSeasons.length) {
                    optionsHtml += `<li><h6 class="dropdown-header">${getLocalizedString('StageType', 'EliminateRaid')}</h6></li>`
                }

                eliminateRaidSeasons.forEach((season) => {
                    const start = new Date(season.Start*1000).toLocaleString([], dateOptions)
                    const end = new Date(season.End*1000).toLocaleString([], dateOptions)

                    optionsHtml += `<li><a class="dropdown-item" href="javascript:;" class="btn btn-dark" data-season="${10000 + season.SeasonId}"><div class="d-flex gap-1 align-items-end"><span class="label p-0">${translateUI('raid_season',[season.SeasonDisplay])}</span><img class=" inline-img invert-light" src="images/ui/Terrain_${season.Terrain}.png"><small class="text-bold ba-col-${season.TormentArmorType.toLowerCase()}">TOR</small><small>${start} - ${end}</small></div></a></li>`
                })
            }
            $('#ba-raid-season').show()
            $('#ba-raid-season-list .btn-pill .label').html(translateUI('raid_season_select'))
            $('#ba-raid-season-list .dropdown-menu').html(optionsHtml)
            $('#ba-raid-season-rewards').html("")
        } else if (raidId < 800000) {
            //Time Attack
            $('#ba-raid-list-tab-timeattack').tab('show')
            $('#ba-raid-info').hide()
            $('#ba-timeattack-info').show()
            raid = findOrDefault(data.raids.TimeAttack,"Id",raidId,1000)[0]
            $(`#ba-timeattack-difficulty-${ta_difficulty}`).tab('show')
            raidName = `${raid.Id / 1000}: ${getLocalizedString("TimeAttackStage", raid.DungeonType)}`
            $('#ba-timeattack-name').text(raidName)
            $('#ba-timeattack-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain}.png`)
            changeTimeAttackDifficulty(ta_difficulty)
        } else if (raidId < 1000000) {
            //World Raid
            $('#ba-raid-list-tab-worldraid').tab('show')
            $('#ba-raid-info').show()
            $('#ba-timeattack-info').hide()
            $('#ba-worldraid-difficulty').show()
            $('#ba-raid-difficulty').hide()
            $('#ba-raid-season').hide()
            if ($('#ba-raid-info-tab-profile').hasClass('active')) {
                $('#ba-raid-info-tab-skills').tab('show')
            }
            if ($('#ba-raid-info-tab-rewards').hasClass('active')) {
                $('#ba-raid-info-tab-skills').tab('show')
            }
            $('#ba-raid-info-tab-profile').hide()
            raid = findOrDefault(data.raids.WorldRaid,"Id",raidId,814000)[0]
            const maxDifficulty = raid.MaxDifficulty[regionID]
            if (raid_difficulty > maxDifficulty)  {
                raid_difficulty = 0
            }
            
            //generate difficulty tabs
            let difficultyHtml = ''
            for (let i = 0; i <= maxDifficulty; i++) {
                difficultyHtml += `<a id="ba-worldraid-difficulty-${i}" class="nav-link" data-bs-toggle="tab" href="#" onclick="changeWorldRaidDifficulty(${i})">${raid.DifficultyName[i]}</a>`
            }

            $('#ba-worldraid-difficulty').html(difficultyHtml)
            $(`#ba-worldraid-difficulty-${raid_difficulty}`).tab('show')
        
            $('#ba-raid-affiliation').text(getLocalizedString('StageType', 'WorldRaid'))
            raidName = getTranslatedString(raid, 'Name')
            $('#ba-raid-name').text(raidName)      
            $('#ba-raid-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain[0]}.png`)
            if (raid.Terrain.length > 1) {
                $('#ba-raid-terrain-alt-img').attr('src', `images/ui/Terrain_${raid.Terrain[1]}.png`)
                $('#ba-raid-terrain-alt').show()
            } else {
                $('#ba-raid-terrain-alt').hide()
            }

            changeWorldRaidDifficulty(raid_difficulty)
        } else {
            //Multifloor raid
            $('#ba-raid-list-tab-worldraid').tab('show')
            $('#ba-raid-info').show()
            $('#ba-timeattack-info').hide()
            $('#ba-worldraid-difficulty').show()
            $('#ba-raid-difficulty').hide()
            $('#ba-raid-season').hide()
            $('#ba-raid-entrycost').hide()
            if ($('#ba-raid-info-tab-profile').hasClass('active')) {
                $('#ba-raid-info-tab-skills').tab('show')
            }
            if ($('#ba-raid-info-tab-rewards').hasClass('active')) {
                $('#ba-raid-info-tab-skills').tab('show')
            }
            $('#ba-raid-info-tab-profile').hide()
            $('#ba-raid-info-tabs').hide()
            raid = findOrDefault(data.raids.MultiFloorRaid, "Id", raidId, 1000000)[0]
            const maxDifficulty = raid.MaxDifficulty[regionID]
            if (raid_difficulty > maxDifficulty)  {
                raid_difficulty = 0
            }
            
            //generate difficulty tabs
            let difficultyHtml = ''
            for (let i = 0; i <= maxDifficulty; i++) {
                difficultyHtml += `<a id="ba-worldraid-difficulty-${i}" class="nav-link" data-bs-toggle="tab" href="#" onclick="changeMultiFloorRaidDifficulty(${i})">${raid.DifficultyStartFloor[i]} ~ ${raid.DifficultyStartFloor[i+1] - 1}</a>`
            }

            $('#ba-worldraid-difficulty').html(difficultyHtml)
            $(`#ba-worldraid-difficulty-${raid_difficulty}`).tab('show')
        
            $('#ba-raid-affiliation').text(getLocalizedString('StageType', 'MultiFloorRaid'))
            raidName = getTranslatedString(raid, 'Name')
            $('#ba-raid-name').html(raidName + ` <small>(${getLocalizedString('ArmorTypeLong', raid.ArmorType)})</small>`)      
            $('#ba-raid-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain[0]}.png`)
            if (raid.Terrain.length > 1) {
                $('#ba-raid-terrain-alt-img').attr('src', `images/ui/Terrain_${raid.Terrain[1]}.png`)
                $('#ba-raid-terrain-alt').show()
            } else {
                $('#ba-raid-terrain-alt').hide()
            }

            $('#ba-raid-duration').text(MathHelper.formatDuration(raid.BattleDuration))

            changeMultiFloorRaidDifficulty(raid_difficulty)
        }


        $('#ba-raid-season-rewards').hide()
        loadedRaid = raid
        $('#raid-select-'+raid.Id).addClass('selected')

        finalizeLoad(raidName+ ` (${getLocalizedString('ArmorTypeLong', raid.ArmorType)})`, "raid", raid.Id, 'View Raid', raid.Id)

        if (!raid.IsReleased[regionID]) {
            showReleaseWarning()
        }

    } else {
        loadModule('raids', raidId)
    }
}

function loadRaidSeasonRewards(seasonId) {
    let season
    if (seasonId > 10000) {
        season = find(data.raids["RaidSeasons"][regionID]["EliminateSeasons"], "SeasonId", seasonId - 10000)[0]
    } else {
        season = find(data.raids["RaidSeasons"][regionID]["Seasons"], "SeasonId", seasonId)[0] 
    }

    if (season) {
        let html = ""
        const rewardSet = data.raids["RaidSeasons"][regionID][seasonId > 10000 ? "EliminateRewardSets": "RewardSets"][`${season.RewardSet}`]
        rewardSet.forEach(([points, rewards], rewardIndex) => {
            if (rewardIndex > season.RewardSetMax) return
            if (html != "") html += '<div class="ba-panel-separator"></div>'
            html += `<div class="d-flex"><span class="reward-point">${abbreviateNumber(points) + " Pt"}</span><div class="season-rewards">`
            rewards.forEach(([itemId, amount]) => {
                html += getDropIconHTML(itemId, amount)
            })
            html += `</div></div>`
        })
        $('#ba-raid-season-rewards').html(html)
        $('#ba-raid-season-rewards .season-rewards>div').tooltip({html: true})
        $('#ba-raid-season-rewards').show()

        $('#ba-raid-season-list .btn-pill .label').html($(`#ba-raid-season-list a.dropdown-item[data-season="${seasonId}"]`).html())
        $(`#ba-raid-season-list a.dropdown-item`).toggleClass('active', false)
        $(`#ba-raid-season-list a.dropdown-item[data-season="${seasonId}"]`).toggleClass('active', true)
    }
}

function changeRaidDifficulty(difficultyId) {
    raid_difficulty = difficultyId
    let tabsHtml = ''
    $('#ba-raid-header').css('background-image', `url('images/raid/Boss_Portrait_${raid.PathName}${raid_difficulty >= 5 ? "_Insane" : ""}_Lobby.png')`)
    $('#ba-raid-level').text(`Lv. ${raid_level[raid_difficulty]}`)
    $('#ba-raid-entrycost').html(getStageEntryCurrency(8, 1))
    $('#ba-raid-entrycost > span').tooltip({html: true})
    $('#ba-raid-duration').text(MathHelper.formatDuration(raid.BattleDuration[raid_difficulty]))

    if (selectedEnemy >= raid.EnemyList[raid_difficulty].length) {selectedEnemy = 0}

    let raidEnemyList = ''

    raid.EnemyList[raid_difficulty].forEach(function(el,i) {
        const enemy = find(data.enemies,'Id',el)[0]
        if (enemy.Icon != undefined) {
            raidEnemyList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-enemy-index="${i}" class="btn btn-dark"><div class="icon enemy-chibi"><img src="images/enemy/${enemy.Icon}.webp"></div><span>${getTranslatedString(enemy, "Name")}</span></a></li>`
        } else {
            raidEnemyList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-enemy-index="${i}" class="btn btn-dark"><div class="icon"><img src="images/raid/icon/Icon_${raid.PathName}${raid_difficulty >= 5 ? '_Insane' : ''}.png"></div><span>${getTranslatedString(enemy, "Name")}</span></a></li>`
        }
    })

    $('#raid-enemy-list .dropdown-menu').html(raidEnemyList)
    $('#raid-enemy-list').toggleClass('disabled', raid.EnemyList[raid_difficulty].length <= 1)

    populateRaidSkills('#ba-raid-skills', raid.RaidSkill, raid_difficulty)

    let html = ''

    if (find(data.items, "Id", 70)[0].IsReleased[regionID]) {

        html += `<table class="w-100"><thead class="text-center"><tr><th>${getLocalizedString('StageType','Raid')}</th><th>${getLocalizedString('StageType','EliminateRaid')}</th></tr></thead><tbody><tr><td><div class="item-icon-list">`

        html += getDropIconHTML(7, raid_reward_coin[raid_difficulty][0])
        if (raid_reward_coin[raid_difficulty][1] != 0 && find(data.items, "Id", 9)[0].IsReleased[regionID]) {
            html += getDropIconHTML(9, raid_reward_coin[raid_difficulty][1])
        }

        html += '</div></td><td><div class="item-icon-list">'
    
        if (find(data.items, "Id", 70)[0].IsReleased[regionID]) {
            html += getDropIconHTML(70, raid_reward_coin[raid_difficulty][0])
    
            if (raid_reward_coin[raid_difficulty][1] != 0) {
                html += getDropIconHTML(71, raid_reward_coin[raid_difficulty][1])
            }
        }

        html += `</div></td></tr></tbody>`

    } else {
        html += '<div class="item-icon-list">'
        html += getDropIconHTML(7, raid_reward_coin[raid_difficulty][0])
        if (raid_reward_coin[raid_difficulty][1] != 0 && find(data.items, "Id", 9)[0].IsReleased[regionID]) {
            html += getDropIconHTML(9, raid_reward_coin[raid_difficulty][1])
        }
        html += '</div>'
    }
    
    $(`#ba-raid-rewards`).html(html)
    $(`#ba-raid-rewards .item-drop`).each((i, el) => {
        $(el).tooltip({html: true})
    })
    
    changeRaidEnemy(selectedEnemy)
}

function changeTimeAttackDifficulty(difficultyId) {
    ta_difficulty = difficultyId
    let rulesHTML = '', enemyHTML = '';
    $('#ba-timeattack-level').text(`Lv.${raid.EnemyLevel[ta_difficulty]}`)
    $('#ba-timeattack-entrycost').html(getStageEntryCurrency(17, 1))
    $('#ba-timeattack-entrycost > span').tooltip({html: true})
    $('#ba-timeattack-duration').text(MathHelper.formatDuration(raid.BattleDuration[ta_difficulty]))

    const enemyRanks = ['Minion','Elite','Champion','Boss']
    raid.Formations[ta_difficulty].EnemyList.forEach(function(el, i) {
        let enemy = find(data.enemies, "Id", raid.Formations[ta_difficulty].EnemyList[i])[0]
        let rankId = enemy.Rank == 'Summoned' ? 0 : enemyRanks.indexOf(enemy.Rank)
        enemyHTML += getEnemyCardHTML(enemy, raid.Formations[ta_difficulty].Level[rankId], raid.Terrain, raid.Formations[ta_difficulty].Grade[rankId], 1)
    })
    
    $('#ba-stage-enemies').html(enemyHTML)
    $('#ba-stage-enemies > :first').trigger("click")

    raid.Rules[difficultyId].forEach((rule) => {
        const taRule = find(data.raids.TimeAttackRules, 'Id', rule.Id)[0]
        if (rulesHTML != '') rulesHTML += '<div class="ba-panel-separator"></div>'
        rulesHTML += `<div class="d-flex flex-row align-items-start mt-2"><img class="ba-raid-skill d-inline-block me-3" src="images/timeattack/${taRule.Icon}.webp"><div class="d-inline-block"><div><h4 class="me-2 d-inline">${getTranslatedString(taRule, 'Name')}</h4><p class="mt-1 mb-2 p-1">${getSkillText({Desc: getTranslatedString(taRule, 'Desc'), Parameters: rule.Parameters ? rule.Parameters : []}, 1, {})}</p></div></div></div>`
    })
    $('#ba-timeattack-rules').empty().html(rulesHTML)
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function changeWorldRaidDifficulty(difficultyId) {
    raid_difficulty = difficultyId
    let skillsHTML = ''
    $('#ba-raid-header').css('background-image', `url('images/raid/Boss_Portrait_${raid.PathName}_Lobby.png')`)
    $('#ba-raid-level').text(`Lv. ${raid.Level[raid_difficulty]}`)
    $('#ba-raid-entrycost').html(getStageEntryCurrency(raid.EntryCost[raid_difficulty][0], raid.EntryCost[raid_difficulty][1]))
    $('#ba-raid-entrycost > span').tooltip({html: true})
    $('#ba-raid-duration').text(MathHelper.formatDuration(raid.BattleDuration[raid_difficulty]))

    if (selectedEnemy >= raid.EnemyList[raid_difficulty].length) {selectedEnemy = 0}

    let raidEnemyList = ''

    raid.EnemyList[raid_difficulty].forEach(function(el,i) {
        const enemy = find(data.enemies,'Id',el)[0]
        if (enemy.Icon != undefined) {
            raidEnemyList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-enemy-index="${i}" class="btn btn-dark"><div class="icon enemy-chibi"><img src="images/enemy/${enemy.Icon}.webp"></div><span>${getTranslatedString(enemy, "Name")}</span></a></li>`
        } else {
            raidEnemyList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-enemy-index="${i}" class="btn btn-dark"><div class="icon"><img src="images/raid/icon/Icon_${raid.PathName}.png"></div><span>${getTranslatedString(enemy, "Name")}</span></a></li>`
        }
    })

    $('#raid-enemy-list .dropdown-menu').html(raidEnemyList)
    $('#raid-enemy-list').toggleClass('disabled', raid.EnemyList[raid_difficulty].length <= 1)

    const raidSkillList = (raid.UseRaidSkillList !== undefined ? find(data.raids.Raid,'Id',raid.UseRaidSkillList)[0].RaidSkill : raid.RaidSkill) 
    populateRaidSkills('#ba-raid-skills', raidSkillList, raid_difficulty)

    let html = ''
    const rewardsArray = getServerProperty(raid, 'Rewards')
    html += `<h5 class="p-2">${translateUI('stage_original')}</h5><div class="item-icon-list">`
    rewardsArray[raid_difficulty].Items.forEach(val => {
        html += getDropIconHTML(val[0], val[1], val[2], val[2], true)
    })
    html += `</div>`

    if (raid.RewardsRerun) {
        const rewardsArray = getServerProperty(raid, 'RewardsRerun')
        html += `<h5 class="p-2">${translateUI('stage_rerun')}</h5><div class="item-icon-list">`
        rewardsArray[raid_difficulty].Items.forEach(val => {
            html += getDropIconHTML(val[0], val[1], val[2], val[2], true)
        })
        html += `</div>`
    }

    if (rewardsArray[raid_difficulty].Groups.length > 0) {
        html += `<div class="item-icon-list mt-2">`
        rewardsArray[raid_difficulty].Groups.forEach(group => {
            itemsHtml = ''
            group[0].forEach(item => {
                itemsHtml += getDropIconHTML(item[0], item[1], item[2], item[2], true)
            })
            const certain = Math.floor(group[1])
            const chance = group[1] % 1

            let chanceStrings = []
            if (certain > 0) chanceStrings.push(`100&#37; (&times;${certain})`)
            if (chance > 0) chanceStrings.push(`${getProbabilityText(chance)} (&times;1)`)

            html += `<div class="item-group">${itemsHtml}<span class="label-chance">${chanceStrings.join(', ')}</span></div>`
        })
        html += `</div>`
    }
        
    $(`#ba-raid-rewards`).html(html)
    $(`#ba-raid-rewards .item-drop`).tooltip({html: true})
    
    changeRaidEnemy(selectedEnemy)
}

function changeRaidFloor(el) {

    multiFloorRaidFloor = raid.DifficultyStartFloor[raid_difficulty] - 1 + parseInt(el.value)

    $('#ba-raid-level').text(`Lv. ${raid.RaidFloors[multiFloorRaidFloor].Level}`)
    $('#multifloor-raid-floor-label').text(`${multiFloorRaidFloor + 1}`)

    changeRaidEnemy(selectedEnemy)
}

function changeMultiFloorRaidDifficulty(difficulty, floor) {
    raid_difficulty = difficulty
    multiFloorRaidFloor = raid.DifficultyStartFloor[raid_difficulty] - 1

    $('#multifloor-raid-floor-range').val(0).attr('max', raid.DifficultyStartFloor[raid_difficulty + 1] - raid.DifficultyStartFloor[raid_difficulty] - 1)
    $('#multifloor-raid-floor-label').text(`${multiFloorRaidFloor + 1}`)

    $('#ba-raid-header').css('background-image', `url('images/raid/Boss_Portrait_${raid.PathName}_Lobby.png')`)
    const enemyLevel = raid.RaidFloors[multiFloorRaidFloor].Level

    $('#ba-raid-level').text(`Lv. ${enemyLevel}`)

    if (selectedEnemy >= raid.EnemyList[raid_difficulty].length) {selectedEnemy = 0}

    let raidEnemyList = ''

    raid.EnemyList[raid_difficulty].forEach(function(el,i) {
        const enemy = find(data.enemies,'Id',el)[0]
        if (enemy.Icon != undefined) {
            raidEnemyList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-enemy-index="${i}" class="btn btn-dark"><div class="icon enemy-chibi"><img src="images/enemy/${enemy.Icon}.webp"></div><span>${getTranslatedString(enemy, "Name")}</span></a></li>`
        } else {
            raidEnemyList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-enemy-index="${i}" class="btn btn-dark"><div class="icon"><img src="images/raid/icon/Icon_${raid.PathName}.png"></div><span>${getTranslatedString(enemy, "Name")}</span></a></li>`
        }
    })

    $('#raid-enemy-list .dropdown-menu').html(raidEnemyList)
    $('#raid-enemy-list').toggleClass('disabled', raid.EnemyList[raid_difficulty].length <= 1)

    const raidSkillList = (raid.UseRaidSkillList !== undefined ? find(data.raids.Raid,'Id',raid.UseRaidSkillList)[0].RaidSkill : raid.RaidSkill) 
    populateRaidSkills('#ba-raid-skills', raidSkillList, raid_difficulty, true)
    
    changeRaidEnemy(selectedEnemy)
}

function getStageEntryCurrency(currencyId, amount) {
    const currency = find(data.currency, 'Id', currencyId)[0]
    return `<span class="ba-info-pill bg-theme my-0 me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/item/icon/${currency.Icon}.webp`, getTranslatedString(currency, 'Name').escapeHtml(), getLocalizedString('ItemCategory', 'Currency'), '', getTranslatedString(currency, 'Desc').escapeHtml().replace('&','&amp;'), 50, 'img-scale-larger')}"><img src="images/item/icon/${currency.Icon}.webp" style="height:26px;width:auto;"><span class="label ps-0 text-bold">&times;${amount}</span></span>`
}

function populateRaidSkills(container, skills, difficulty, isMultiFloor = false) {
    let skillsHTML = ''
    skills.forEach(raidSkill => {
        if (difficulty < raidSkill.MinDifficulty || (raidSkill.MaxDifficulty !== undefined && difficulty > raidSkill.MaxDifficulty)) return
        if (raidSkill.ShowInfo === false) return
        
        let skillType
        switch (raidSkill.SkillType) {
            case 'EX':
                skillType = translateUI('student_skill_ex')
                break;
            case 'Passive':
                skillType = translateUI('student_skill_passive')
                break;
            case 'Public':
                skillType = translateUI('student_skill_normal')
                break;
            default:
                skillType = 'unknown'
                break;
        }

        if (skillsHTML != '') skillsHTML += '<div class="ba-panel-separator"></div>'
        skillsHTML += `<div class="d-flex flex-row align-items-center mt-2"><img class="ba-raid-skill ${isMultiFloor ? 'multifloor-skill' : ''} d-inline-block me-3" src="images/raid/skill/${raidSkill.Icon}.png"><div class="d-inline-block"><div><h4 class="me-2 d-inline">${getTranslatedString(raidSkill, 'Name')}</h4></div><div class="mt-1"><p class="d-inline" style="font-style: italic;">${skillType}</p>${raidSkill.ATGCost > 0 ? '<p class="d-inline text-bold"> ・ <i>ATG:</i> '+raidSkill.ATGCost+'</p>' : ''}</div></div></div><p class="mt-1 mb-2 p-1">${getSkillText(raidSkill, difficulty+1, {emphasiseChange: true})}</p>`
    })
    $(container).empty().html(skillsHTML).find('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').tooltip({html: true})
}

function changeRaidEnemy(num) {
    selectedEnemy = num
    let enemy = find(data.enemies, 'Id', raid.EnemyList[raid_difficulty][num])[0], grade = 1
    let level
    let bulletType, armorType
    if (raid.Id < 1000) {
        level = raid_level[raid_difficulty]
        bulletType = (raid_difficulty < 5) ? raid.BulletType : raid.BulletTypeInsane
        armorType = enemy.ArmorType
    } else if (raid.Id < 1000000) {
        level = raid.Level[raid_difficulty]
        bulletType = (raid_difficulty < 5) ? raid.BulletType : raid.BulletTypeInsane
        armorType = enemy.ArmorType
    } else {
        level = raid.RaidFloors[multiFloorRaidFloor].Level
        bulletType = raid.BulletType[raid_difficulty]
        armorType = raid.ArmorType
    }

    let enemyStats = new CharacterStats(enemy, level, 1, (enemy.Transcendence ? enemy.Transcendence : []))

    if (raid.Id >= 1000000) {
        if (enemy.Id in raid.RaidFloors[multiFloorRaidFloor].StatChange) {
            const statChange = raid.RaidFloors[multiFloorRaidFloor].StatChange[enemy.Id]
            for (const stat in statChange) {
                enemyStats.addBuff(stat, statChange[stat])
            }
        }
    }

    raidEnemyStatList.forEach((statName) => {
        if (statName == 'AmmoCount') {
            $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).text(enemy.SquadType == 'Main' ? enemyStats.getBaseString('AmmoCount') + ' (' + enemyStats.getBaseString('AmmoCost') + ')' : '-')
        } else if (statName == 'DefensePower' || statName == 'StabilityPoint') {
            $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).html(`<span class="has-tooltip">${enemyStats.getBaseString(statName)}</span>`)
        } else if (statName == 'GroggyGauge') {
            if (enemy.GroggyGauge) {
                let groggyTooltip = ''
                let weakTo = ''
                switch (enemy.ArmorType) {
                    case 'LightArmor':
                        weakTo = 'Explosion'
                        break
                    case 'HeavyArmor':
                        weakTo = 'Pierce'
                        break
                    case 'Unarmed':
                        weakTo = 'Mystic'
                        break
                    case 'ElasticArmor':
                        weakTo = 'Sonic'
                        break
                }

                if (weakTo != '') {
                    groggyTooltip += getLocalizedString('GroggyCondition', 'TypeDamage', [`<b class="ba-col-${weakTo.toLowerCase()}">${getLocalizedString('BulletType', weakTo)}</b>`])
                }

                const raidName = raid.PathName.split('_')[0]
                if (raidName in data.localization.GroggyCondition) {
                    groggyTooltip += (groggyTooltip != '' ? '\n' : '') + getLocalizedString('GroggyCondition', raidName)
                }
                
                if (groggyTooltip != '') {
                    $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).html(`<span class="has-tooltip">${enemy.GroggyGauge.toLocaleString()}</span>`)
                    $('.stat-GroggyGauge .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(groggyTooltip), html: true, placement: 'top'})
                } else {
                    $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).text(enemy.GroggyGauge.toLocaleString())
                }
            } else {
                $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).text('-')
            }
        } else if (statName == 'GroggyTime') {
            if (enemy.GroggyTime) {
                $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).text(translateUI('time_seconds', [enemy.GroggyTime/1000]))
            } else {
                $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).text('-')
            }            
        } else {
            $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).text(enemyStats.getTotalString(statName))
        }
    })

    addRaidEnemyBonusStats(enemy.Id, enemyStats, raid_difficulty, '#ba-raid-enemy-stats')

    let defText = translateUI('stat_defense_tooltip', [`<b>${enemyStats.getDefenseDamageReduction()}</b>`])
    $('#ba-raid-enemy-stats .stat-DefensePower .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(defText), html: true, placement: 'top'})

    let stabilityText = translateUI('stat_stability_tooltip', [`<b>${enemyStats.getStabilityMinDamage()}</b>`])
    $('#ba-raid-enemy-stats .stat-StabilityPoint .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(stabilityText), html: true, placement: 'top'})

    $('#raid-enemy-list .dropdown-item').removeClass('active')
    $(`#raid-enemy-list .dropdown-item[data-enemy-index="${num}"]`).addClass('active')

    $('#raid-enemy-list .active-name').html(getTranslatedString(enemy, "Name"))
    if (enemy.Icon != undefined) {
        $('#ba-raid-enemy-icon div').toggleClass('icon-enemy', true).toggleClass('icon-enemy-raid', false)
        $('#ba-raid-enemy-icon img').attr('src', `images/enemy/${enemy.Icon}.webp`)
    } else {
        $('#ba-raid-enemy-icon div').toggleClass('icon-enemy', false).toggleClass('icon-enemy-raid', true)
        $('#ba-raid-enemy-icon img').attr('src', `images/raid/icon/Icon_${raid.PathName}${raid.Id < 1000 && raid_difficulty >= 5 ? '_Insane' : ''}.png`)
    }

    $("#ba-raid-enemy-attacktype").tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType', bulletType)}`, translateUI('attacktype'), null, getAttackTypeText(bulletType), 32), placement: 'top', html: true})
    setAttackTypeClass($("#ba-raid-enemy-attacktype .icon-type"), bulletType)
    $("#ba-raid-enemy-attacktype .label").text(getLocalizedString('BulletType',bulletType))

    $("#ba-raid-enemy-defensetype").tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorType', armorType)}`, translateUI('defensetype'), null, getDefenseTypeText(armorType), 32), placement: 'top', html: true})
    setDefenseTypeClass($("#ba-raid-enemy-defensetype .icon-type"), armorType)
    $("#ba-raid-enemy-defensetype .label").text(getLocalizedString('ArmorType',armorType))

    $('#ba-raid-enemy-size').toggle(enemy.Size != null).find('.label').text(enemy.Size != null ? getLocalizedString('CharacterSize', enemy.Size) : '')
    $('#ba-raid-enemy-name').html(getTranslatedString(enemy, 'Name'))
    // $('#ba-raid-enemy-class').removeClass("ba-class-main ba-class-support").addClass(`ba-class-${enemy.SquadType.toLowerCase()}`)
    // $('#ba-raid-enemy-class .label').text(getLocalizedString('SquadType', enemy.SquadType))
    $('#ba-raid-enemy-icon').removeClass('elite champion boss').addClass(enemy.Rank.toLowerCase())
    $('#ba-raid-enemy-level .label').text(`Lv.${level}`)

    const adaptationValue = enemyStats.terrain[raid.Terrain[0]]
    const adaptation = adaptationAmount[adaptationValue]
    $('#ba-raid-enemy-terrain .label').text(adaptation)
    $(`#ba-raid-enemy-terrain .icon-terrain-strength img`).attr("src", `images/ui/Ingame_Emo_Adaptresult${adaptation}.png`)
    $(`#ba-raid-enemy-terrain`).show().tooltip('dispose').tooltip({title: getRichTooltip(`images/ui/Ingame_Emo_Adaptresult${adaptation}.png`,translateUI('terrain_adaption', [getLocalizedString('AdaptationType', raid.Terrain[0])])+' '+adaptation, null, null, getAdaptationText(raid.Terrain[0], adaptation), 30), placement: 'top', html: true})

    renderEnemySkills(enemy, $('#ba-raid-enemy-skills'))

}

function addRaidEnemyBonusStats(id, enemyStats, raidDifficulty, statsTableElement) {

    let tooltipText = ""
    let maxHPDisplay = ""

    const hoverCraftMissileHPMod = [0, 1000, 2500, 5000, 10000, 25000, 35000]

    switch (id) {
        
        case 7305701:
            enemyStats.addBuff('MaxHP_Base', 100000)
        case 7305601:
        case 7965031:
            maxHPDisplay = enemyStats.getTotalString('MaxHP')

            tooltipText += `<div class="active-buff me-2"><img src="images/buff/Buff_MAXHP.webp" width="22" height="26" class=""></div><b>${enemyStats.getTotalString('MaxHP')}</b>`

            enemyStats.addBuff('MaxHP_Coefficient', 10000)
            tooltipText += `\n<div class="active-buff me-2"><img src="images/buff/Buff_MAXHP.webp" width="22" height="26" class=""><span class="stack-count">2</span></div><b>${enemyStats.getTotalString('MaxHP')}</b>`

            enemyStats.addBuff('MaxHP_Coefficient', 10000)
            tooltipText += `\n<div class="active-buff me-2"><img src="images/buff/Buff_MAXHP.webp" width="22" height="26" class=""><span class="stack-count">3</span></div><b>${enemyStats.getTotalString('MaxHP')}</b>`

            break
        case 7305101:
        case 7965002:
            if (raidDifficulty == 4) {
                enemyStats.addBuff('MaxHP_Coefficient', 11000)                
            }
            maxHPDisplay = enemyStats.getTotalString('MaxHP')
            break

        case 610220107:
            enemyStats.addBuff('MaxHP_Coefficient', 20000)
        case 610220106:
        case 610220108:
            enemyStats.addBuff('MaxHP_Base', hoverCraftMissileHPMod[raidDifficulty])
            maxHPDisplay = enemyStats.getTotalString('MaxHP')
            break

        default:
            maxHPDisplay = enemyStats.getTotalString('MaxHP')
            break
    }

    if (tooltipText != '') {
        $(`${statsTableElement} .stat-MaxHP .stat-value`).html(`<span class="has-tooltip">${maxHPDisplay}</span>`)
        $(`${statsTableElement} .stat-MaxHP .has-tooltip`).tooltip('dispose').tooltip({title: getBasicTooltip(tooltipText), html: true, placement: 'top'})
    } else {
        $(`${statsTableElement} .stat-MaxHP .stat-value`).text(maxHPDisplay)
    }

}

function loadStage(id) {
    if (loadedModule == 'stages') {
        let mode = ''
        if (loadedStage) $('#stage-select-'+loadedStage.Id).removeClass('selected')
        if (id >= 7000000) {
            const eventId = parseInt(String(id).slice(0,3))
            if (conquest_events.includes(eventId)) {
                mode = 'Conquest'

                //try stageId first
                stages = find(data.stages.Conquest, "Id", id)

                if (stages.length == 0) {
                    //try tileid
                    tiles = []
                    data.stages.ConquestMap.forEach(conquestMap => {
                        conquestMap.Maps.forEach(map => {
                            tiles.push(...find(map.Tiles, "Id", id))
                        })
                    })

                    stages = find(data.stages.Conquest, "Id", tiles.length > 0 ? tiles[0].StageId : 81511211)
                    
                }
                
                stage = stages[0]

                loadedStage = stage
                if (loadedStageList != '' + stage.EventId % 10000) populateEventStageList(stage.EventId)
                const tab = `#ba-conquest-step-${stage.Difficulty == "VeryHard" ? "c" : "n"}${stage.Step}`
                if (!$(tab).hasClass("active")) {
                    $(tab).tab('show').trigger('click')
                }
                $('.ba-stage-map-tile').removeClass('selected')
                $(`.ba-stage-map-tile[data-stage-id="${stage.Id}"]`).addClass('selected')

            } else {
                mode = 'Event'
                stage = findOrDefault(data.stages.Event, "Id", id, 8012301)[0]
                if (stage.Field) mode = 'Field'
                loadedStage = stage
                if (loadedStageList != '' + stage.EventId % 10000) populateEventStageList(stage.EventId)
            }
        } else if (id >= 1000000) {
            mode = 'Campaign'
            stage = findOrDefault(data.stages.Campaign, "Id", id, 1011101)[0]
            loadedStage = stage
            if (loadedStageList != 'missions') populateStageList('missions')
        } else if (id >= 60000) {
            mode = 'SchoolDungeon'
            stage = findOrDefault(data.stages.SchoolDungeon, "Id", id, 60101)[0]
            loadedStage = stage
            if (loadedStageList != 'schooldungeon') populateStageList('schooldungeon')
        } else if (id >= 31000) {
            mode = 'WeekDungeon'
            stage = findOrDefault(data.stages.WeekDungeon, "Id", id, 31101)[0]
            loadedStage = stage
            if (loadedStageList != 'commissions') populateStageList('commissions')
        } else if (id >= 30000) {
            mode = 'WeekDungeon'
            stage = findOrDefault(data.stages.WeekDungeon, "Id", id, 30101)[0]
            loadedStage = stage
            if (loadedStageList != 'bounty') populateStageList('bounty')
        } else {
            // fallback to default 1-1 Normal
            mode = 'Campaign'
            stage = find(data.stages.Campaign, "Id", 1011101)[0]
            loadedStage = stage
            if (loadedStageList != 'missions') populateStageList('missions')
        }
        $('#ba-stage-drops-tabs').toggle(mode != 'WeekDungeon')
        if (mode == 'WeekDungeon') $('#ba-stage-drops-default-tab').tab('show')

        $('#ba-stage-tab-conquest').toggle(mode == 'Conquest')
        $('#ba-stage-tab-map').toggle(mode != 'Conquest')

        if ((mode == "Event" || mode == "Field") && stage.EventId != 701) {
            let dropdownHtml = ''
            let versionsAvailable = []
            stage.Versions.forEach(version => {
                let checkEventId
                switch (version) {
                    case "Rerun":
                        checkEventId = 10000 + stage.EventId
                        break
                    case "Permanent":
                        checkEventId = 50000 + stage.EventId
                        break
                    default:
                        checkEventId = stage.EventId
                        break;
                }
                if (region.Events.includes(checkEventId)) {
                    versionsAvailable.push(version)
                    dropdownHtml += `<li><a class="dropdown-item" href="javascript:;" class="btn btn-dark" data-version="${version}"><span>${translateUI('stage_' + version.toLowerCase())}</span></a></li>`
                }
            })

            if (!versionsAvailable.includes(loadedStageVersion)) {
                if (versionsAvailable.length > 0) {
                    loadedStageVersion = versionsAvailable[0]
                } else {
                    // use first version available if no versions are released
                    const version = stage.Versions[0]
                    loadedStageVersion = version
                    dropdownHtml += `<li><a class="dropdown-item" href="javascript:;" class="btn btn-dark" data-version="${version}"><span>${translateUI('stage_' + version.toLowerCase())}</span></a></li>`
                    showReleaseWarning()
                }
                
            }

            $('#stage-version-list .dropdown-menu').html(dropdownHtml)
            $('#stage-version-list').show()

            $(`#stage-version-list .dropdown-item[data-version="${loadedStageVersion}"`).toggleClass('active', true)
            $(`#stage-version-list button .label`).text(translateUI('stage_' + loadedStageVersion.toLowerCase()))

        } else {
            $('#stage-version-list').hide()
        }

        if (mode != "Conquest" && $('#ba-stage-tab-conquest').hasClass('active')) {
            $('#ba-stage-tab-enemies').tab('show')
        }

        $('#ba-stage-name').html(getStageName(stage, mode))
        $('#ba-stage-title').html(getStageTitle(stage, mode))
        $('#ba-stage-level').text(translateUI('rec_level') + ' Lv.'+ getServerProperty(stage, 'Level'))
        $('#ba-stage-terrain-img').attr('src', `images/ui/Terrain_${stage.Terrain}.png`)
        $('#ba-stage-fog').toggle(mode == "Campaign" && stage.Difficulty == 1)

        const rewardTypes = ["Default","FirstClear","ThreeStar"]
        let dropsHtml = ''

        let stageRewards = getVersionProperty(stage, 'Rewards', loadedStageVersion)
        let rewardsArray = (region.Name in stageRewards) ? stageRewards[region.Name] : stageRewards.Jp

        const eventCurrencies = []

        rewardTypes.forEach(el => {
            if (el in rewardsArray && rewardsArray[el].length > 0) {
                let labelText = null

                if (mode == "Conquest") {
                    if (el == "Default" && !stage.SubStage) {
                        labelText = getConquestManageString(stage.EventId)
                    } else if (el == "FirstClear" || stage.SubStage) {
                        labelText = translateUI('conquest_occupy')
                    }
                } else {
                    if (el == "FirstClear") {
                        labelText = translateUI("stage_reward_firstclear")
                    }
                }

                if (el == "ThreeStar") {
                    labelText = '<i class="fa-solid fa-star"></i>'.repeat(3)
                }
                
                rewardsArray[el].forEach(reward => {
                    const amount = stage.Type == "FindGift" ? reward[2] : 1
                    dropsHtml += getDropIconHTML(reward[0], reward[1], amount, amount, false, labelText)

                    if (el == "Default" && (mode == "Event" || mode == "Conquest") && stage.EventId != 811 && reward[1] >= 1 && reward[0] >= 80000 && reward[0] < 90000) {
                        eventCurrencies.push(reward)
                    }
                })
            }
        })

        const hexaMap = getVersionProperty(stage, "HexaMap", loadedStageVersion)
        const starCondition = getVersionProperty(stage, "StarCondition", loadedStageVersion)
        const challengeCondition = getVersionProperty(stage, "ChallengeCondition", loadedStageVersion)

        if (eventCurrencies.length) {

            if (showEventCurrencyBonus) {

                const teams = hexaMap ? hexaMap.filter(tile => tile.Entity <= 101105).length : 1

                for (reward of eventCurrencies) {
    
                    const item = find(data.items, 'Id', reward[0])[0]
                    let maxBonus = 0
                    let useStudents = ''
                    let serverBonus = getServerProperty(item, 'EventBonus')

                    if (mode == "Event") {

                        const studentBonus = {"Main": Array(teams*4).fill(0), "Support": Array(teams*2).fill(0)}
                        const chosenStudent = {"Main": Array(teams*4).fill(null), "Support": Array(teams*2).fill(null)}
    
                        for (bonus of serverBonus) {
        
                            if (showEventCurrencyBonus == 1 || bonus[0] in studentCollection) {
        
                                const student = find(data.students, 'Id', bonus[0])[0]
        
                                for (let slot = 0; slot < studentBonus[student.SquadType].length; slot++) {
                                    if (bonus[1] > studentBonus[student.SquadType][slot]) {
                                        studentBonus[student.SquadType][slot] = bonus[1]
                                        chosenStudent[student.SquadType][slot] = student.Id
                                        break
                                    }
                                }
        
                            }
        
                        }

                        maxBonus = studentBonus["Main"].concat(studentBonus["Support"]).sum()

                        for (type in chosenStudent) {
                            for (let slot = 0; slot < chosenStudent[type].length; slot++) {
                                if (chosenStudent[type][slot] != null) {
                                    useStudents += `<img class="inline-student-img" src="images/student/icon/${chosenStudent[type][slot]}.webp">`
                                }
                            }
                        }
                        

                    } else if (mode == "Conquest") {

                        if (showEventCurrencyBonus == 1) {
                            maxBonus = 12000
                        } else {
                            const ownStudents = {"Main": 0, "Support": 0}

                            for (studentId in studentCollection) {
                                const student = find(data.students, 'Id', studentId)[0]

                                if (stage.SchoolBuff[0].includes(student.School)) {
                                    ownStudents[student.SquadType] += 1
                                }

                            }

                            maxBonus = Math.min(Math.floor((ownStudents["Main"] + ownStudents["Support"]) / 2) * 4000, 12000)
                        }
                        
                    }

                    const amount = Math.ceil(reward[1] * (maxBonus / 10000))
    
                    if (amount > 0) {
                        dropsHtml += getDropIconHTML(reward[0], amount, 1, 1, false, translateUI("stage_reward_bonus"), useStudents != '' ? `\n\n<i>${translateUI('max_bonus_amount', ['+' + (maxBonus / 100) + '%'])}</i>\n${useStudents}` : '')
                    }

                    
    
                }

            }

            $(`#stage-include-bonus`).show()
            $(`#stage-include-bonus-list .dropdown-item`).toggleClass('active', false)
            const $activeItem = $(`#stage-include-bonus-list .dropdown-item[data-option="${showEventCurrencyBonus}"`)
            $activeItem.toggleClass('active', true)
            $(`#stage-include-bonus-list button .label`).text($activeItem.text())

        } else {
            $(`#stage-include-bonus`).hide()
        }

        if (mode == 'Conquest') {

            const tileMaxLevel = 1 + stage.UpgradeCost.length
            let tileInfoTable = ''

            let tileType = "Base"
            if (stage.SubStage || stage.EnemyType == "Challenge") tileType = "Battle"
            if (stage.EnemyType == "Boss") tileType = "Boss"

            tileInfoTable += `<table class="w-100"><thead class="text-center"><tr><th></th><th>${translateUI('base_upgrade_cost')}</th><th>${translateUI('rewards')}</th><th>${translateUI('base_settlement')}</th></tr></thead><tbody>`

            for (let i = 0; i < tileMaxLevel; i++) {
                tileInfoTable += '<tr>'
                tileInfoTable += `<td><img src="images/conquest/Conquest_${stage.EventId}_Img_Tile_${tileType}_${i+1}${stage.EnemyType == "Challenge" ? "_Challenge" : ""}.png" style="height:80px;"><b class="p-2">Lv. ${i+1}</b></td>`

                tileInfoTable += '<td><div class="item-icon-list">'
                if (i > 0 && i-1 < stage.UpgradeCost.length) {
                    tileInfoTable += getDropIconHTML(stage.UpgradeCost[i-1][0], stage.UpgradeCost[i-1][1], 1, 1)
                }
                tileInfoTable += '</div></td>'

                tileInfoTable += '<td><div class="item-icon-list">'
                if (rewardsArray[`Upgrade${i+1}`]) {
                    rewardsArray[`Upgrade${i+1}`].forEach(reward => {
                        tileInfoTable += getDropIconHTML(reward[0], reward[1], 1, 1)
                    })
                }
                tileInfoTable += '</div></td>'

                tileInfoTable += '<td><div class="item-icon-list">'
                rewardsArray.Calculate[i].forEach(reward => {
                    tileInfoTable += getDropIconHTML(reward[0], reward[1], 1, 1)
                })
                tileInfoTable += '</div></td>'
                tileInfoTable += '</tr>'
            }
            tileInfoTable += '</tbody></table>'

            $('#conquest-tile-info').html(tileInfoTable).find('.item-drop').tooltip({html: true})
            
            if ("SchoolBuff" in stage) {
                let schoolHtml = ""
                let html = ""
                stage.SchoolBuff[0].forEach(school => {
                    html += `<span class="school-bonus-icon"><img class="invert-light" src="images/schoolicon/School_Icon_${school.toUpperCase()}_W.png"></span>`
                })
                if (html != "") schoolHtml += `<div class="p-2"><p class="mb-2 text-center">${getConquestManageString(stage.EventId)}</p><div class="school-bonus-list">${html}</div></div>`
                html = ""
                stage.SchoolBuff[1].forEach(school => {
                    html += `<span class="school-bonus-icon"><img class="invert-light" src="images/schoolicon/School_Icon_${school.toUpperCase()}_W.png"></span>`
                })
                if (html != "") schoolHtml += `<div class="p-2"><p class="mb-2 text-center">${translateUI('conquest_occupy')}</p><div class="school-bonus-list">${html}</div></div>`
                $(`#conquest-school-bonus-list`).html(`<div class="d-flex justify-content-center gap-2">${schoolHtml}</div>`)
                if (schoolHtml != "") {
                    let bonusText = ""
                    bonusText += `<div class="ba-panel-separator my-2"></div>`

                    for (let i = 1; i <= 3; i++) {
                        bonusText += `<p class="mb-0"><b>${translateUI("school_bonus_num_students", [2*i])}</b>${translateUI("school_bonus_conquest", [40*i, 50*i, getConquestManageString(stage.EventId)])}</p>`
                    }

                    $(`#conquest-school-bonus-list`).append(bonusText)
                }
                $('#conquest-school-bonus').toggle(schoolHtml != "")
            } else {
                $('#conquest-school-bonus').hide()
            }
            
        }

        if (dropsHtml != "") {
            $(`#ba-stage-drops`).html(`<div class="item-icon-list">${dropsHtml}</div>`)

            if (stage.Type == "FindGift") {
                $(`#ba-stage-drops`).prepend(`<i class="d-block mb-2">${translateUI('rewards_findgift_msg')}</i><div class="d-flex flex-wrap justify-content-center"></div>`)
            }
    
            $(`#ba-stage-drops .item-drop`).each(function(i,el2) {
                $(el2).tooltip({html: true})
            })
        } else {
            $(`#ba-stage-drops`).html(`<div class="d-flex flex-wrap justify-content-center"><span class="pb-0 text-center">${translateUI('rewards_none')}</span></div>`)
        }

        let html = ''
        let enemyList = {}
        const enemyRanks = ['Minion','Elite','Champion','Boss']
        const stageFormations = getVersionServerProperty(stage, "Formations", loadedStageVersion)
        if (stageFormations.length) {
            $('#ba-stage-enemy-list, #ba-stage-enemy-info').show()

            stageFormations.forEach(el => {
                for (let i = 0; i < el.EnemyList.length; i++) {
                    let enemy = find(data.enemies, "Id", el.EnemyList[i])[0]
                    let rankId = enemyRanks.indexOf(enemy.Rank)
                    enemyList[`${4-rankId}_${enemy.Id}_${el.Level[rankId]}_${el.Grade[rankId]}`] = enemy
                }
            })

            Object.keys(enemyList).sort().forEach(el => {
                e_level = el.split('_')[2]
                e_grade = el.split('_')[3]
                html += getEnemyCardHTML(enemyList[el], e_level, stage.Terrain, e_grade)
            })
            $('#ba-stage-enemies').html(html)
            $('#ba-stage-enemies > :first').trigger("click")
        } else {
            $('#ba-stage-enemy-list, #ba-stage-enemy-info').hide()
        }

        conditionsHtml = ""
        const starIcon = `<i class="fa-solid fa-star me-2 stage-star"></i>`
        const challengeIcon = `<i class="fa-solid fa-clipboard-list me-2 stage-challenge"></i>`

        if (hexaMap) {
            $('#ba-stage-tab-map').toggleClass('disabled', false)
            drawHexamap(stage, '#ba-stage-map-canvas')
            conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_complete')}</span></div>`
            conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_sranks', [starCondition[0]])}</span></div>`
            conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_clearturns', [starCondition[1]])}</span></div>`
        } else {
            if ($('#ba-stage-tab-map').hasClass('active')) {
                $('#ba-stage-tab-enemies').tab('show')
            }
            $('#ba-stage-tab-map').toggleClass('disabled', true)
            if (mode == "Campaign" || mode == "Event") {
                conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_defeatall')}</span></div>`
                conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_defeatalltime', [starCondition[0]])}</span></div>`
                conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_allsurvive')}</span></div>`
            } else if (mode == "Conquest") {
                if (!stage.SubStage) {
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_defeatall')}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_defeatalltime', [starCondition[1]])}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_allsurvive')}</span></div>`
                }
            } else if (stage.Type) {
                if (stage.Type.slice(0,6) == "Chaser") {
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_clear')}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_allsurvive')}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_cleartime', ['150'])}</span></div>`
                } else if (stage.Type == "Blood") {
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_clear')}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_allsurvive')}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_cleartime', ['120'])}</span></div>`
                } else if (stage.Type == "FindGift") {
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_earnrewards', ['1'])}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_earnrewards', ['4'])}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_earnrewards', ['5'])}</span></div>`
                } else if (stage.Type.slice(0,6) == "School"){
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_clear')}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_allsurvive')}</span></div>`
                    conditionsHtml += `<div>${starIcon}<span>${translateUI('starcondition_cleartime', ['120'])}</span></div>`
                }
            } 
        }

        if (challengeCondition !== undefined && challengeCondition.length > 0) {

            conditionsHtml += `<div class="ba-panel-separator my-2"></div>`
            challengeCondition.forEach(condition => {
                switch (condition[0]) {
                    case "Turns":
                        conditionsHtml += `<div>${challengeIcon}<span>${translateUI('starcondition_clearturns', [condition[1]])}</span></div>`
                        break
                    case "Time":
                        conditionsHtml += `<div>${challengeIcon}<span>${translateUI('starcondition_cleartime', [condition[1]])}</span></div>`
                        break
                }
            })
        }

        $('#ba-stage-conditions').toggle(conditionsHtml != "").html(`<div class="d-flex flex-column">${conditionsHtml}</div>`)

        html = ''
        let entryCost = getVersionProperty(stage, "EntryCost", loadedStageVersion)
        if (entryCost && entryCost.length > 0) {
            entryCost.forEach((ec, i) => {
                let currency
                if (ec[0] < 100) {
                    currency = find(data.currency, 'Id', ec[0])[0]
                } else {
                    currency = find(data.items, 'Id', ec[0])[0]
                }

                let currencyType = ''
                if (mode == "Conquest") {
                    if (i == 0) {
                        currencyType = ` (${translateUI('conquest_occupy')})`
                    } else {
                        currencyType = ` (${getConquestManageString(stage.EventId)})`
                    }
                }

                html += `<span class="ba-info-pill bg-theme my-0" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/item/icon/${currency.Icon}.webp`, getTranslatedString(currency, 'Name').escapeHtml(), getLocalizedString('ItemCategory', 'Currency'), '', getTranslatedString(currency, 'Desc').escapeHtml().replace('&','&amp;'), 50, 'img-scale-larger')}"><img src="images/item/icon/${currency.Icon}.webp" style="height:26px;width:auto;"><span class="label ps-0 text-bold">&times;${ec[1]}${currencyType}</span></span>`
            })
            
        }
        $('#ba-stage-entrycost').html(html)
        $('#ba-stage-entrycost >span').tooltip({html: true})
        $('#ba-stage-map-enemies').html(`<p class="grid-text">${translateUI('maptile_enemy_default_msg')}</p>`)
        $('#stage-select-'+stage.Id).addClass('selected')

        finalizeLoad($('#ba-stage-title').text(), 'stage', stage.Id, 'View Stage', id)

    } else {
        loadModule('stages', id)
    }
}

function changeStageVersion(version) {
    loadedStageVersion = version
    loadStage(loadedStage.Id)
}

function getVersionProperty(obj, prop, version) {
    if (obj.VersionData && version in obj.VersionData && prop in obj.VersionData[version]) {
        return obj.VersionData[version][prop]
    } else {
        return obj[prop]
    }
}

function getVersionServerProperty(obj, prop, version) {
    const serverSuffix = region.Name
    if (obj.VersionData && version in obj.VersionData && prop in obj.VersionData[version]) {
        return getSuffixedProperty(obj.VersionData[version], prop, serverSuffix)
    } else {
        return getSuffixedProperty(obj, prop, serverSuffix)
    }
}

function getServerProperty(obj, prop) {
    const serverSuffix = region.Name
    return getSuffixedProperty(obj, prop, serverSuffix)
}

function getSuffixedProperty(obj, prop, suffix) {
    if (suffix) {
        if (prop + suffix in obj) return obj[prop + suffix]
    }
    return obj[prop]
}

function populateEnemyList(containerId, formations) {
    let html = ''
    let enemyList = {}
    const enemyRanks = ['Minion','Elite','Champion','Boss']
    formations.forEach(el => {
        for (let i = 0; i < el.EnemyList.length; i++) {
            let enemy = find(data.enemies, "Id", el.EnemyList[i])[0]
            let rankId = enemyRanks.indexOf(enemy.Rank)
            enemyList[`${4-rankId}_${enemy.Id}_${el.Level[rankId]}_${el.Grade[rankId]}`] = enemy
        }
    })

    Object.keys(enemyList).sort().forEach(el => {
        e_level = el.split('_')[2]
        e_grade = el.split('_')[3]
        html += getEnemyCardHTML(enemyList[el], e_level, loadedStage.Terrain, e_grade)
    })
    $(containerId).html(html)
    $(containerId).children().first().trigger("click")
}

function getStageName(stage, type, excludeEventName = false) {
    switch (type) {
        case "Event":
            return `${excludeEventName ? '' : getLocalizedString('EventName', ''+stage.EventId % 10000) + ' '}${stage.Difficulty == 0 ? getLocalizedString('StageType', 'Story') : (stage.Difficulty == 1 ? getLocalizedString('StageType', 'Quest') : getLocalizedString('StageType', 'Challenge'))} ${stage.Stage.toString().padStart(2,'0')}`
        case "Field":
            return `${excludeEventName ? '' : getLocalizedString('EventName', ''+stage.EventId % 10000) + ' '}${getLocalizedString("StageType", 'Field', [stage.Area])}`
        case "Campaign":
            return `${stage.Area}-${stage.Stage} ${stage.Difficulty == 1 ? getLocalizedString('StageType', 'Hard') : getLocalizedString('StageType', 'Normal')}`
        case "WeekDungeon":
        case "SchoolDungeon":
            return `${getLocalizedString('StageType', stage.Type)}`
        case "Conquest":
            return `${getLocalizedString('ConquestMap', stage.EventId)}`
    }
    console.log(`No name definition for stage type ${type}`)
    return "undefined!!!"
}

function getStageTitle(stage, type) {
    switch (type) {
        case "Event":
        case "Campaign":
        case "Conquest":
        case "Field":
            return getTranslatedString(stage, 'Name')
        case "WeekDungeon":
        case "SchoolDungeon":
            return `${getLocalizedString('StageTitle', stage.Type, String.fromCharCode(64+stage.Stage))}`
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
    region = data.config.Regions[regionID]


    if (loadedModule == 'students') {

        $(".statpreview-level").attr("max",region.StudentMaxLevel)
        $('#ba-statpreview-level-modal').text(`Lv.1 / ${region.StudentMaxLevel}`)
        $("#ba-weaponpreview-levelrange, #ba-statpreview-weapon-range").attr("max",region.WeaponMaxLevel)
        if (region.WeaponMaxLevel == 0) {
            $("#ba-student-nav-weapon").hide()
            $("#ba-statpreview-weapon-container").hide()
            $(".weaponpreview-star-1").hide()
            $(".weaponpreview-star-2").hide()
            $(".weaponpreview-star-3").hide()
            statPreviewWeaponGrade = 0
    
            $('#ba-student-search-filter-streetbattleadaptation-5').hide()
            $('#ba-student-search-filter-outdoorbattleadaptation-5').hide()
            $('#ba-student-search-filter-indoorbattleadaptation-5').hide()
            $('#ba-student-search-filter-terrainupgrades').hide()
            $('#ba-student-search-select-weaponpassivebuff').hide()
            $('#ba-student-tab-weapon').hide()
            $('#item-search-filter-equipmentcategory-weaponexpgrowth').hide()
        }
        $("#ba-bond-levelrange").attr("max",region.BondMaxLevel)
        $("#ba-statpreview-gear1-range").attr("max",region.EquipmentMaxLevel[0])
        $("#ba-statpreview-gear2-range").attr("max",region.EquipmentMaxLevel[1])
        $("#ba-statpreview-gear3-range").attr("max",region.EquipmentMaxLevel[2])

        $("#ba-statpreview-potential-container").toggle(region.PotentialMax > 0)
        $("#ba-statpreview-potential input").attr("max", region.PotentialMax)

        $('#ba-student-search-filter-bullettype-sonic').toggle(studentList.some((s) => s.IsReleased[regionID] && s.BulletType == 'Sonic'))
        $('#ba-student-search-filter-armortype-elasticarmor').toggle(studentList.some((s) => s.IsReleased[regionID] && s.ArmorType == 'ElasticArmor'))
    
        $('#ba-student-search-filter-tacticrole-vehicle').toggle(studentList.some((s) => s.IsReleased[regionID] && s.TacticRole == 'Vehicle'))

        $('#ba-student-search-filter-school-valkyrie').toggle(studentList.some((s) => s.IsReleased[regionID] && s.School == 'Valkyrie'))
        $('#ba-student-search-filter-school-etc').toggle(studentList.some((s) => s.IsReleased[regionID] && s.School == 'ETC'))
        $('#ba-student-search-filter-school-srt').toggle(studentList.some((s) => s.IsReleased[regionID] && s.School == 'SRT'))
        $('#ba-student-search-filter-school-arius').toggle(studentList.some((s) => s.IsReleased[regionID] && s.School == 'Arius'))
        $('#ba-student-search-filter-school-tokiwadai').toggle(studentList.some((s) => s.IsReleased[regionID] && s.School == 'Tokiwadai'))
        $('#ba-student-search-filter-school-sakugawa').toggle(studentList.some((s) => s.IsReleased[regionID] && s.School == 'Sakugawa'))

        $('#ba-student-search-filter-weapontype-rl').toggle(studentList.some((s) => s.IsReleased[regionID] && s.WeaponType == 'RL'))
        $('#ba-student-search-filter-weapontype-ft').toggle(studentList.some((s) => s.IsReleased[regionID] && s.WeaponType == 'FT'))

        const bondGearUnlocked = studentList.some((s) => s.IsReleased[regionID] && s.Gear.Released !== undefined && s.Gear.Released[regionID])
        $('#ba-student-search-filter-bondgear').toggle(bondGearUnlocked)
        $('#ba-student-gear-separator').toggle(bondGearUnlocked)
        $('#ba-student-gear-4').toggle(bondGearUnlocked)

    }

    if (loadedModule == 'items') {
        for (let i = 101; i <= data.config.Regions[0].FurnitureSetMax; i++) {
            $(`#item-search-filter-furnitureset-${i}`).toggle(i <= region.FurnitureSetMax)
        }

    }
}

function getAdaptationText(terrain, rank) {
    return translateUI('terrain_adaption_details', [terrain_dmg_bonus[rank], getLocalizedString('AdaptationType',terrain).toLowerCase(), terrain_block_bonus[rank]])
}

function getStatName(stat) {
    return getLocalizedString('Stat',stat.replace('_Coefficient','').replace('_Base','').replace('100','').replace('1',''))
}

function getFormattedStatAmount(val) {
    return Number.isInteger(val) ? val : `${parseFloat((val*100).toFixed(2))}%`
}

function changeGearLevel(slot, el, recalculate = true) {
    const geartype = student.Equipment[slot-1]
    const tier = parseInt(el.value)
    const equipment = find(data.equipment, "Id", gearId[geartype]+tier-1)[0]
    statPreviewEquipment[slot-1] = tier
    
    $(`#ba-statpreview-gear${slot}-icon`).attr("src", `images/equipment/icon/${equipment.Icon}.webp`)
    $(`#ba-statpreview-gear${slot}-level`).text(`T${tier}`)
    $(`#ba-statpreview-gear${slot}-name`).text(getTranslatedString(equipment, 'Name'))
    $(`#ba-statpreview-gear${slot}-description`).html(getGearStatsText(equipment))
    if (statPreviewIncludeEquipment) {
        if (recalculate) recalculateStatsWithDelay()
        updateGearIcon()
    }
}

function changePotentialLevel(stat, el, recalculate = true) {
    const potentialLevel = parseInt(el.value)
    statPreviewPotentialLevel[stat] = potentialLevel
    
    // $(`#ba-statpreview-potential-${stat.toLowerCase()}-icon`).attr("src", `images/equipment/icon/${equipment.Icon}.webp`)
    $(`#ba-statpreview-potential-${stat.toLowerCase()}-level`).text(`Lv.${potentialLevel}`)
    $(`#ba-statpreview-potential-${stat.toLowerCase()}-description`).html(`${getStatName(stat)} +<b>${CharacterStats.getPotentialStatAmount(student, stat, statPreviewLevel, potentialLevel)}</b>`)

    if (recalculate && statPreviewIncludePotential) {
        recalculateStatsWithDelay()
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
    statPreviewViewSupportStats = !statPreviewViewSupportStats
    if (statPreviewViewSupportStats && statPreviewSelectedChar > 0) changeStudentSummon(0, false)
    $('#ba-student-stat-table').toggleClass("striker-bonus", statPreviewViewSupportStats)
    $('#ba-statpreview-status-strikerbonus').toggleClass("deactivated", !statPreviewViewSupportStats)
    recalculateStats()
}

function toggleGear() {
    statPreviewIncludeEquipment = !statPreviewIncludeEquipment
    $('#ba-statpreview-status-equipment').toggleClass('deactivated', !statPreviewIncludeEquipment)
    $('#ba-statpreview-gear').toggleClass("disabled", !statPreviewIncludeEquipment)
    $('#ba-statpreview-gear-toggle').toggleClass("checked", statPreviewIncludeEquipment)
    $('#ba-statpreview-gear input').prop("disabled", !statPreviewIncludeEquipment)
    updateGearIcon()
    recalculateStats()
}

function togglePotential() {
    statPreviewIncludePotential = !statPreviewIncludePotential
    $('#ba-statpreview-potential').toggleClass("disabled", !statPreviewIncludePotential)
    $('#ba-statpreview-potential-toggle').toggleClass("checked", statPreviewIncludePotential)
    $('#ba-statpreview-potential input').prop("disabled", !statPreviewIncludePotential)
    recalculateStats()
}

function toggleBuffs() {
    statPreviewIncludeBuffs = !statPreviewIncludeBuffs
    $('#ba-statpreview-status-buffs').toggleClass('deactivated', !statPreviewIncludeBuffs)
    $('#ba-statpreview-buff-toggle').toggleClass("checked", statPreviewIncludeBuffs)
    statPreviewExternalBuffs.toggleDisabled(!statPreviewIncludeBuffs)
    recalculateStats()
}

function toggleBond(num) {

    statPreviewIncludeBond[num] = !statPreviewIncludeBond[num]
    $(`#ba-statpreview-status-bond-${num}-toggle`).toggleClass('deactivated', !statPreviewIncludeBond[num])
    $(`#ba-statpreview-bond-${num}-toggle`).toggleClass("checked", statPreviewIncludeBond[num])
    $(`#ba-statpreview-bond-${num}`).toggleClass("disabled", !statPreviewIncludeBond[num])
    $(`#ba-statpreview-bond-${num} input`).prop("disabled", !statPreviewIncludeBond[num])

    recalculateStats()
}

function togglePassiveSkill() {
    statPreviewIncludePassive = !statPreviewIncludePassive
    $('#ba-statpreview-status-passive-level').toggleClass('deactivated', !statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill-toggle').toggleClass("checked", statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill').toggleClass("disabled", !statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill input').prop("disabled", !statPreviewIncludePassive)
    recalculateStats()
}

function toggleTSAStats() {
    statPreviewTSAStats.enabled = !statPreviewTSAStats.enabled
    $('#ba-statpreview-tsastats-toggle').toggleClass("checked", statPreviewTSAStats.enabled)
    $('#statpreview-tsastats-controls .ba-panel').toggleClass("disabled", !statPreviewTSAStats.enabled)

    if (statPreviewSelectedChar > 0) {
        $('#calculation-student-skills .skill-info-tsa').toggle(statPreviewTSAStats.enabled)
    }

    recalculateStats()
}

function changeExGearLevel(el, recalculate = true) {
    const tier = parseInt(el.value)
    statPreviewGearLevel = tier

    $('#ba-statpreview-gear4-detail').toggleClass("disabled", statPreviewGearLevel == 0)
    $('#ba-statpreview-gear4-level').text(statPreviewGearLevel > 0 ? `T${tier}` : translateUI('setting_off'))

    if (statPreviewSelectedChar == 0) {
        $('#calculation-student-skills .skill-info-gearnormal').toggle(statPreviewGearLevel >= 2)
        $('#calculation-student-skills .skill-info-normal').toggle(statPreviewGearLevel < 2)
    }

    updateGearIcon()
    statPreviewExternalBuffs.toggleUpgrades(statPreviewGearLevel >= 2)
    if (recalculate) recalculateStatsWithDelay()
}

function changeStatPreviewLevel(el, recalculate = true) {
    const level = parseInt(el.value)
    $('.statpreview-level').val(level)
    $('#ba-statpreview-level').text("Lv." + level)
    $('#ba-statpreview-level-modal').text(`Lv.${level} / ${el.max}`)
    //enable or disable equipment controls
    if (statPreviewIncludeEquipment) {
        for (let i = 0; i < 3; i++) {
            $(`#ba-statpreview-gear${i+1}`).toggleClass('disabled', (level < gear_minlevelreq[i]))
            $(`#ba-statpreview-gear${i+1}-range`).prop('disabled', (level < gear_minlevelreq[i]))
        }
    }

    if (statPreviewIncludePotential) {
        for (const stat in statPreviewPotentialLevel) {
            $(`#ba-statpreview-potential-${stat.toLowerCase()}`).toggleClass('disabled', (level < 90))
            $(`#ba-statpreview-potential-${stat.toLowerCase()}-range`).prop('disabled', (level < 90))
        }
    }

    statPreviewLevel = level
    if (recalculate) recalculateStatsWithDelay()
}

function changeGearSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-gear-skill-level').html(`<img src="images/ui/ImageFont_Max.png">`)
    } else {
        $('#ba-gear-skill-level').html("Lv." + el.value)
    }
    recalculateGearSkillPreview()
}

function changeWeaponSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-weapon-skill-level').html(`<img src="images/ui/ImageFont_Max.png">`)
    } else {
        $('#ba-weapon-skill-level').html("Lv." + el.value)
    }
    recalculateWeaponSkillPreview()
}

function changeWeaponPreviewLevel(el) {
    $('#ba-weaponpreview-level').text("Lv." + el.value)
    recalculateWeaponPreview()
}

function changeStatPreviewBondLevel(i, recalculate = true) {
    const level = parseInt($(`#ba-statpreview-bond-${i}-range`).val())

    $(`#ba-statpreview-bond-${i}-level`).html(`<i class="fa-solid fa-heart me-1"></i> ${level}`)
    $(`#ba-statpreview-status-bond-${i}-toggle .label`).html(level)

    const bondStats = Object.entries(getBondStats(i == 0 ? student : student_bondalts[i-1], level))
    statPreviewBondLevel[i] = level

    $(`#ba-statpreview-bond-${i}-description`).html(`${getStatName(bondStats[0][0])} <b>+${getFormattedStatAmount(bondStats[0][1])}</b>, ${getStatName(bondStats[1][0])} <b>+${getFormattedStatAmount(bondStats[1][1])}</b>`)
    if (recalculate) recalculateStatsWithDelay()
}

function changeStatPreviewWeaponLevel(el) {
    updateWeaponLevelStatPreview(el.value)
    recalculateStatsWithDelay()
}

function updateWeaponLevelStatPreview(level) {
    $('#ba-statpreview-weapon-level, #ba-student-weapon-level').html('Lv.' + level)
    let weaponStats = getWeaponStats(student, level)
    let desc = ""
    $(Object.entries(weaponStats)).each(function(i, el){
        if (el[1] > 0) desc += `${getStatName(el[0])} <b>+${getFormattedStatAmount(el[1])}</b>, `
    })
    statPreviewWeaponLevel = parseInt(level)
    $('#ba-statpreview-weapon-description').html(desc.substring(0, desc.length-2))
}

function changeStatPreviewPassiveSkillLevel(el, recalculate = true) {
    if (el.value == el.max) {
        $('#ba-statpreview-passiveskill-level').html(`<img src="images/ui/ImageFont_Max.png">`)
    } else {
        $('#ba-statpreview-passiveskill-level').html("Lv." + el.value)
    }
    statPreviewPassiveLevel = parseInt(el.value)
    updatePassiveSkillStatPreview()
    if (recalculate) recalculateStatsWithDelay()
}

function changeStatPreviewSummonSourceSkillLevel(el, recalculate = true) {

    statPreviewExLevel = parseInt(el.value)
    updateSummonSourceSkill()
    if (recalculate) recalculateStatsWithDelay()
}

function getBondTargetsHTML(num, student) {
    return `<div><div id="ba-statpreview-bond-${num}-toggle" class="d-flex header-toggle" onclick="toggleBond(${num})">
    <h5 class="flex-fill">${translateUI('student_bond')}</h5>
    <i class="fa-regular fa-square off"></i>
    <i class="fa-solid fa-square-check on"></i></div>
    <div id="ba-statpreview-bond-${num}" class="p-2 mb-2 ba-panel"><div class="mb-1 d-flex flex-row align-items-center"><div class="ba-bond-icon me-2" style="position: relative;"><img src="images/student/icon/${student.Id}.webp"></div><div class="flex-fill"><h5>${getTranslatedString(student, 'Name')}</h5><p id="ba-statpreview-bond-${num}-description" class="mb-0" style="font-size: 0.875rem; line-height: 1rem;"></p></div></div><div class="d-flex flex-row align-items-center"><input id="ba-statpreview-bond-${num}-range" oninput="changeStatPreviewBondLevel(${num})" type="range" class="form-range statpreview-bond me-2 flex-fill" value="${statPreviewBondLevel[num]}" min="1" max="${region.BondMaxLevel}"><span id="ba-statpreview-bond-${num}-level" class="ba-slider-label"></span></div></div></div>`
}

function getBondToggleHTML(num, student) {
    return `<button id="ba-statpreview-status-bond-${num}-toggle" onclick="toggleBond(${num})" class="btn-pill tooltip-button">
    <div class="icon bond-small"><img src="images/student/icon/${student.Id}.webp" width="28" height="28"></div>
    <span class="label ps-2"></span>
    </button>`
}

function changeBondLevel(el) {
    $('#ba-bond-level').html(el.value)
    recalculateBondPreview()
}

function updateGearIcon() {
    let gear, tier, tierText = ""
    for (let i=1; i<=3; i++) {
        tier = statPreviewIncludeEquipment ? $(`#ba-statpreview-gear${i}-range`).val() : 1
        tierText += ((tierText == "") ? "" : " / ") + "T"+$(`#ba-statpreview-gear${i}-range`).val()
        gear = find(data.equipment, "Id", gearId[student.Equipment[i-1]]+(tier-1))[0]
        $(`#ba-student-gear-${i}-icon`).attr("src", `images/equipment/icon/${gear.Icon}.webp`).tooltip('dispose').tooltip({title: getRichTooltip(`images/equipment/icon/${gear.Icon}.webp`, getTranslatedString(gear, 'Name').escapeHtml(), getLocalizedString('ItemCategory', gear.Category), `T${tier}`, getTranslatedString(gear, 'Desc').escapeHtml() + `\n\n<b>${translateUI("stat_info")}:</b>\n` + getGearStatsText(gear, '\n'), 50, 'img-scale-larger'), placement: 'top', html: true}).toggleClass("gear-disabled", !statPreviewIncludeEquipment)
        $(`#ba-student-gear-${i}-icon`).attr('onclick', `loadItem(${gear.Id+2000000})`)
    }

    if ("Released" in student.Gear && student.Gear.Released[regionID]) {
        $("#ba-student-gear-4-icon").toggleClass("gear-disabled", statPreviewGearLevel == 0 || !statPreviewIncludeEquipment)
    }
}

function recalculateTerrainAffinity() {
    let types = ["Street","Outdoor","Indoor"]
    let terrainDropdown = ''
    types.forEach(type => {
        const adaptationValue = student[`${type}BattleAdaptation`] + ((statPreviewStarGrade == 5 && statPreviewWeaponGrade >= 3 && student.Weapon.AdaptationType == type) ? student.Weapon.AdaptationValue : 0)
        const adaptation = adaptationAmount[adaptationValue]
        $(`#ba-student-terrain-${type.toLowerCase()}-icon`).attr("src", `images/ui/Ingame_Emo_Adaptresult${adaptation}.png`)
        $(`#ba-student-terrain-${type.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(`images/ui/Ingame_Emo_Adaptresult${adaptation}.png`,translateUI('terrain_adaption', [getLocalizedString('AdaptationType', type)])+' '+adaptation, null, null, getAdaptationText(type, adaptation), 30), placement: 'top', html: true})
        
        terrainDropdown += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-terrain="${type}" class="btn btn-dark"><div class="icon"><img class="invert-light" src="images/ui/Terrain_${type}.png"></div><span class="me-4">${getLocalizedString("AdaptationType", type)}</span><div class="icon ms-auto me-0"><img style="padding:2px;border-radius:0!important;" src="images/ui/Ingame_Emo_Adaptresult${adaptation}.png"></div></a></li>`
    })
    $('.terrain-list .dropdown-menu').html(terrainDropdown)
}

function recalculateWeaponPreview() {
    let level = $("#ba-weaponpreview-levelrange").val()
    let weaponStats = getWeaponStats(student, level)
    $(`#ba-weapon-stat-table .stat-AttackPower .stat-value`).text('+'+weaponStats.AttackPower.toLocaleString())
    $(`#ba-weapon-stat-table .stat-MaxHP .stat-value`).text('+'+weaponStats.MaxHP.toLocaleString())
    $(`#ba-weapon-stat-table .stat-HealPower .stat-value`).text('+'+weaponStats.HealPower.toLocaleString())
}

function generateStatTable(container, statList, columnWidth, detailedView = 0) {
    let innerHtml = ''
    statList.forEach(function(statKey){
        statName = statKey.replace('_Coefficient','').replace('_Base','')
        innerHtml += `
            <div class="col-${columnWidth}"><div class="stat-${statKey} d-flex align-items-center"><span class="stat-icon"><img class="invert-light" src="images/staticon/Stat_${statName}.png"></span><span class="stat-name">${getLocalizedString('Stat', statName)}</span><span class="flex-fill"></span><span class="stat-value">`
        if (detailedView) {
            innerHtml += `<span class="stat-base"></span><span class="stat-flat"></span><span class="stat-coefficient"></span><span class="stat-final"></span>`
        }
        innerHtml += `</span></div></div>`
    })
    innerHtml = `<div class="row g-0">${innerHtml}</div>`
    $(container).html(innerHtml)
}

function recalculateStatsWithDelay() {
    if (recalculationLimitTimeout) clearTimeout(recalculationLimitTimeout)
    setTimeout(recalculateStats, 50)
}

function recalculateStats() {
    let strikerBonus = $('#ba-student-stat-table').hasClass("striker-bonus")
    let level = $("#ba-statpreview-levelrange").val()
    let studentStats, summonStats, summon
    if (statPreviewSelectedChar > 0) {
        const studentSummon = student.Summons[statPreviewSelectedChar-1]
        summon = find(data.summons, 'Id', studentSummon.Id)[0]
        summonStats = new CharacterStats(summon, level, 1)

        if (studentSummon.Id == 99999) {
            summonStats.setBase('MaxHP', CharacterStats.interpolateStat(studentSummon.ObstacleMaxHP1, studentSummon.ObstacleMaxHP100, level))
        }
    }
    studentStats = new CharacterStats(student, level, statPreviewStarGrade)
    if (compareMode) {
        studentCompareStats = new CharacterStats(studentCompare, level, statPreviewStarGrade)
    }

    //Include Equipment
    if (statPreviewIncludeEquipment) {
        let gear, tier
        for (let i = 0; i < 3; i++) {
            tier = parseInt($(`#ba-statpreview-gear${i+1}-range`).val())
            gear = find(data.equipment, "Id", gearId[student.Equipment[i]]+tier-1)[0]

            //check that equipment slot is unlocked at current level
            if (level >= gear_minlevelreq[i]) {
                for (let j = 0; j < gear.StatType.length; j++) {
                    studentStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                        summonStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    }
                }
            }

            if (compareMode) {
                gear = find(data.equipment, "Id", gearId[studentCompare.Equipment[i]]+tier-1)[0]
                //check that equipment slot is unlocked at current level
                if (level >= gear_minlevelreq[i]) {
                    for (let j = 0; j < gear.StatType.length; j++) {
                        studentCompareStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    }
                }
            }
        }

        //Include Unique Item
        if ("Released" in student.Gear && student.Gear.Released[regionID] && statPreviewGearLevel >= 1) {
            studentStats.addGearBonuses(student.Gear)

            if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                summonStats.addGearBonuses(student.Gear)
            }

            if (compareMode && "Released" in studentCompare.Gear && studentCompare.Gear.Released[regionID]) {
                studentCompareStats.addGearBonuses(studentCompare.Gear)
            }
        }
    }

    //Stat Limit Breaks
    if (statPreviewIncludePotential) {
        for (const stat in statPreviewPotentialLevel) {
            const potentialLevel = statPreviewPotentialLevel[stat]
            
            if (level >= 90) {

                const value = CharacterStats.getPotentialStatAmount(student, stat, level, potentialLevel)
                studentStats.addBuff(stat + '_Base', value)
                
                if (compareMode) {
                    const value = CharacterStats.getPotentialStatAmount(studentCompare, stat, level, potentialLevel)
                    studentCompareStats.addBuff(stat + '_Base', value)
                }

            }
        }
    }

    //Include Relationship
    if (statPreviewIncludeBond[0]) {
        let bondlevel = $(`#ba-statpreview-bond-0-range`).val()
        let bondbonus = getBondStats(student, Math.min(maxbond[statPreviewStarGrade-1], bondlevel))

        Object.entries(bondbonus).forEach(el => {
            studentStats.addBuff(el[0], el[1])
        })

        if (compareMode) {
            bondbonus = getBondStats(studentCompare, Math.min(maxbond[statPreviewStarGrade-1], bondlevel))
            Object.entries(bondbonus).forEach(el => {
                studentCompareStats.addBuff(el[0], el[1])
            })
        }
    }

    for (let i = 1; i <= student_bondalts.length; i++) {
        if (statPreviewIncludeBond[i]) {
            let bondlevel = $(`#ba-statpreview-bond-${i}-range`).val()
            let bondbonus = getBondStats(student_bondalts[i-1], bondlevel)
    
            Object.entries(bondbonus).forEach(el => {
                studentStats.addBuff(el[0], el[1])
            })
        }
    }

    $('#statpreview-buff-transferable-conflict').hide()
    $('#statpreview-buff-transferable-incompatible').hide()
    $(`#statpreview-buff-transferable-controls .buff-description span`).toggleClass('invalid', false)
    //Include External Skill Buffs
    if (statPreviewIncludeBuffs && statPreviewExternalBuffs !== undefined && !statPreviewViewSupportStats && !compareMode) {
        let uniqueChannels = []
        statPreviewExternalBuffs.buffs.forEach((buff, index) => {
            buff.Skill.Effects.filter(e => statPreviewExternalBuffs.effectTypeFilter.includes(e.Type)).forEach((effect, effectIndex) => {
                
                //check conditions
                const skillSlot = effect.OverrideSlot ? effect.OverrideSlot : buff.Skill.SkillType

                let compatibleWithStudent = ExternalBuffs.checkRestrictions(student, effect)
                if (student.SquadType == 'Support' && buff.Skill.SkillType != 'sub' && !buff.RaidId) {
                    compatibleWithStudent = false
                }

                let compatibleWithSummon = (statPreviewSelectedChar > 0) ? ExternalBuffs.checkRestrictions(summon, effect) : false
                
                if (effect.Type == "BuffSelf" && buff.StudentId != student.Id) {
                    compatibleWithStudent = false
                    compatibleWithSummon = false
                }

                if (!(compatibleWithStudent || compatibleWithSummon)) {
                    //exclude other character's Ex/Basic skills on Special characters
                    $(`#statpreview-buff-transferable-controls div[data-index='${index}'] .buff-description span[data-effect='${effectIndex}']`).toggleClass('incompatible', true)
                } else {
                    if (uniqueChannels.find(e => e.slot == skillSlot && e.channel == effect.Channel)) {
                        //discount the buff if there is a channel conflict
                        $('#statpreview-buff-transferable-conflict').toggle(statPreviewIncludeBuffs)
                        $(`#statpreview-buff-transferable-controls div[data-index='${index}'] .buff-description span[data-effect='${effectIndex}']`).toggleClass('conflict', true)
                    } else {
                        const value = ExternalBuffs.getEffectValue(buff, effect)

                        if (compatibleWithStudent) {
                            studentStats.addBuff(effect.Stat, value)
                            if ('Icon' in effect) {
                                studentStats.addActiveBuffIcon(effect.Icon, 1, 'StackSame' in effect ? buff.Stacks : 1)
                            } else {
                                studentStats.addActiveBuffIcon(effect.Stat, value, 'StackSame' in effect ? buff.Stacks : 1)
                            }
                        }
    
                        if (statPreviewSelectedChar > 0 && buff.Skill.SkillType == 'sub') {
                            //for summoned entities, only apply the buff to the character and not the summon
                        } else {

                            if (statPreviewSelectedChar > 0 && compatibleWithSummon && summon.Id != 99999) {
                                summonStats.addBuff(effect.Stat, value)
                                if ('Icon' in effect) {
                                    summonStats.addActiveBuffIcon(effect.Icon, 1, 'StackSame' in effect ? buff.Stacks : 1)
                                } else {
                                    summonStats.addActiveBuffIcon(effect.Stat, value, 'StackSame' in effect ? buff.Stacks : 1)
                                }
                            }
                        }
                        uniqueChannels.push({slot: skillSlot, channel: effect.Channel})
                    }
                }
            })
        })
    }

    //Include Passive Skill
    if (statPreviewIncludePassive && !statPreviewViewSupportStats) {
        const skillLevel = parseInt($('#ba-statpreview-passiveskill-range').val())
        const passiveSkill = find(student.Skills, 'SkillType', 'passive')[0]
        passiveSkill.Effects.forEach(eff => {
            studentStats.addBuff(eff.Stat, eff.Scale[skillLevel-1])
            studentStats.addActiveBuffIcon(eff.Stat, eff.Scale[skillLevel-1])
        })

        if (statPreviewWeaponGrade >= 2) {
            const weaponPassiveSkill = find(student.Skills, 'SkillType', 'weaponpassive')[0]
            weaponPassiveSkill.Effects.forEach(eff => {
                studentStats.addBuff(eff.Stat, eff.Scale[skillLevel-1], eff.Stat === "CriticalPoint_Base")
                studentStats.addActiveBuffIcon(eff.Stat, eff.Scale[skillLevel-1])
            })
        }

        if (compareMode) {
            const passiveSkill = find(studentCompare.Skills, 'SkillType', 'passive')[0]
            passiveSkill.Effects.forEach(eff => {
                studentCompareStats.addBuff(eff.Stat, eff.Scale[skillLevel-1])
            })
    
            if (statPreviewWeaponGrade >= 2) {
                const weaponPassiveSkill = find(studentCompare.Skills, 'SkillType', 'weaponpassive')[0]
                weaponPassiveSkill.Effects.forEach(eff => {
                    studentCompareStats.addBuff(eff.Stat, eff.Scale[skillLevel-1])
                })
            }
        }
    }

    //Include Custom Buffs
    if (statPreviewCustomBuffs !== undefined && !statPreviewViewSupportStats && !compareMode) {
        statPreviewCustomBuffs.buffs.forEach((buff, index) => {

            studentStats.addBuff(buff.Stat, buff.Amount)
            studentStats.addActiveBuffIcon(buff.Stat, buff.Amount)
            if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                summonStats.addBuff(buff.Stat, buff.Amount)
            }
        })
    }

    //Include Ex. Weapon
    if ((statPreviewStarGrade == 5) && (statPreviewWeaponGrade > 0)) {
        let weaponStats = getWeaponStats(student, $('#ba-statpreview-weapon-range').val())
        Object.entries(weaponStats).forEach(el => {
            studentStats.addBuff(el[0], el[1])
            if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                summonStats.addBuff(el[0], el[1])
            }
        })
        if (statPreviewWeaponGrade >= 3) {
            studentStats.terrain[student.Weapon.AdaptationType] += student.Weapon.AdaptationValue
            if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                summonStats.terrain[student.Weapon.AdaptationType] += student.Weapon.AdaptationValue
            }
        }
        if (compareMode) {
            weaponStats = getWeaponStats(studentCompare, $('#ba-statpreview-weapon-range').val())
            Object.entries(weaponStats).forEach(el => {
                studentCompareStats.addBuff(el[0], el[1])
            })
        }
    }

    //Support Stats
    if (student.SquadType == 'Main' && statPreviewSupportStats !== undefined && !statPreviewViewSupportStats && !compareMode) {
        statPreviewSupportStats.supportStudents.forEach((support, index) => {

            const supportStats = getSupportStats(support)

            const bonusMaxHP = supportStats.getStrikerBonus('MaxHP', statPreviewSupportStats.supportStudents.length)
            const bonusAttackPower = supportStats.getStrikerBonus('AttackPower', statPreviewSupportStats.supportStudents.length)
            const bonusDefensePower = supportStats.getStrikerBonus('DefensePower', statPreviewSupportStats.supportStudents.length)
            const bonusHealPower = supportStats.getStrikerBonus('HealPower', statPreviewSupportStats.supportStudents.length)

            let desc = ''
            desc += getStatName('MaxHP') + ` +<b>${bonusMaxHP}</b>, `
            desc += getStatName('AttackPower') + ` +<b>${bonusAttackPower}</b>, `
            desc += getStatName('DefensePower') + ` +<b>${bonusDefensePower}</b>, `
            desc += getStatName('HealPower') + ` +<b>${bonusHealPower}</b>`

            $(statPreviewSupportStats.elements.controls).find(`div[data-index="${index}"] .support-stats-desc`).html(desc)

            studentStats.addBuff('MaxHP_Base', bonusMaxHP)
            studentStats.addBuff('AttackPower_Base', bonusAttackPower)
            studentStats.addBuff('DefensePower_Base', bonusDefensePower)
            studentStats.addBuff('HealPower_Base', bonusHealPower)

        })
    }

    //TSA Stats
    if (student.TSAId && statPreviewTSAStats !== undefined && !statPreviewViewSupportStats && !compareMode && find(data.students, 'Id', student.TSAId)[0].IsReleased[regionID]) {

        const supportStats = getSupportStats(statPreviewTSAStats.tsaStudent)

        const bonusMaxHP = supportStats.getTSABonus('MaxHP')
        const bonusAttackPower = supportStats.getTSABonus('AttackPower')
        const bonusDefensePower = supportStats.getTSABonus('DefensePower')
        const bonusHealPower = supportStats.getTSABonus('HealPower')

        let desc = ''
        desc += getStatName('MaxHP') + ` +<b>${bonusMaxHP}</b>, `
        desc += getStatName('AttackPower') + ` +<b>${bonusAttackPower}</b>, `
        desc += getStatName('DefensePower') + ` +<b>${bonusDefensePower}</b>, `
        desc += getStatName('HealPower') + ` +<b>${bonusHealPower}</b>`

        $(statPreviewTSAStats.elements.controls).find(`.support-stats-desc`).html(desc)

        if (statPreviewSelectedChar > 0 && statPreviewTSAStats.enabled) {
            summonStats.addBuff('MaxHP_Base', bonusMaxHP)
            summonStats.addBuff('AttackPower_Base', bonusAttackPower)
            summonStats.addBuff('DefensePower_Base', bonusDefensePower)
            summonStats.addBuff('HealPower_Base', bonusHealPower)
        }
        
    }

    //Summon Inheritance
    if (statPreviewSelectedChar > 0 && !compareMode) {
        const summonLevel = $('#ba-statpreview-summon-range').val()
        const summon = student.Summons[statPreviewSelectedChar-1]
        for (let i = 0; i < summon.InheritCasterStat.length; i++) {
            summonStats.addCharacterStatsAsBuff(studentStats, summon.InheritCasterStat[i], summon.InheritCasterAmount[i][summonLevel-1])
            summonStats.addActiveBuffIcon(summon.InheritCasterStat[i], 1)
        }
        
    }

    if (statPreviewSelectedChar == 0 && !student.Skills.find(s => s.SkillType == 'autoattack')) {
        studentStats.stats["AmmoCount"][0] = 0
    }

    if (statPreviewSelectedChar > 0 && !summon.Skills.find(s => s.SkillType == 'autoattack')) {
        summonStats.stats["AmmoCount"][0] = 0
    }

    if (compareMode && studentCompare.SquadType == "Support") {
        studentCompareStats.stats["AmmoCount"][0] = 0
    }

    let stats = (statPreviewSelectedChar > 0 ? summonStats : studentStats)
    const helpStats = ['DefensePower', 'CriticalPoint', 'StabilityPoint']

    statPreviewCharacterStats = stats
    if ($('#student-stat-modal-skill-calc-toggle').hasClass('deactivated') || !$('#ba-student-modal-statpreview').hasClass('show')) {

        studentStatListFull.forEach((stat, index) => {
            let text, modText, compareText = ""
            if ((strikerBonus) && (statPreviewSelectedChar == 0) && (index < 4)) {
                text = '+' + stats.getStrikerBonus(stat).toLocaleString()
            } else {
                if (stat == 'AmmoCount') {
                    let ammo = stats.getTotalString('AmmoCount')
                    let cost = stats.getTotalString('AmmoCost')
                    if (ammo == 0) {
                        text = "-"
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
                    compareText = `<small class="comparison less"><i class="fa-solid fa-circle-chevron-down"></i>&nbsp;${amount}</small>`
                } else if (diff > 0) {
                    compareText = `<small class="comparison greater"><i class="fa-solid fa-circle-chevron-up"></i>&nbsp;${amount}</small>`
                } else {
                    compareText = `<small class="comparison"><i class="fa-solid fa-circle-dot"></i>&nbsp;0</small>`
                }
            }
            if (helpStats.includes(stat) && (!strikerBonus || index > 4)) {
                text = '<span class="has-tooltip">' + text + '</span>'
            }
            //Modal
            if ($('#ba-student-modal-statpreview').hasClass('show')) {
                //modText = `<span class="stat-base">${stats.getBaseString(stat)}</span>`
                $(`#ba-student-stat-modal-table .stat-${stat} .stat-value .stat-base`).text(stats.getBaseString(stat))
                const flatBonus = stats.getFlatString(stat)
                $(`#ba-student-stat-modal-table .stat-${stat} .stat-value .stat-flat`).text(flatBonus).toggleClass('zero', flatBonus == "+0").toggleClass('negative', flatBonus.startsWith('-'))
                //modText += `<span class="stat-flat${(flatBonus == "+0") ? " zero" : (flatBonus.startsWith('-') ? " negative" : "")}">${flatBonus}</span>`
    
                const coefBonus = stats.getCoefficientString(stat)
                $(`#ba-student-stat-modal-table .stat-${stat} .stat-value .stat-coefficient`).text(coefBonus).toggleClass('zero', coefBonus == "+0%").toggleClass('negative', coefBonus.startsWith('-'))
                //modText += `<span class="stat-coefficient${(coefBonus == "+0%") ? " zero" : (coefBonus.startsWith('-') ? " negative" : "")}">${coefBonus}</span>`
    
                //modText += `<span class="stat-final">${text}</span>`
                $(`#ba-student-stat-modal-table .stat-${stat} .stat-value .stat-final`).html(text)
                //$(`#ba-student-stat-modal-table .stat-${stat} .stat-value`).html(modText)
            } else {
                $(`#ba-student-stat-table .stat-${stat} .stat-value`).html(text + compareText)
            }
        })
    
        //Derived stat tooltips
        let defText = translateUI('stat_defense_tooltip', [`<b>${stats.getDefenseDamageReduction()}</b>`])
        let critChanceText = translateUI('stat_crit_tooltip')
        const critResValues = [20, 100, 500]
        critResValues.forEach((critRes) => {
            critChanceText += '\n' + translateUI('stat_crit_amount_tooltip', [`<b>${stats.getCriticalHitChanceString(critRes)}</b>`, critRes])
        })
        let stabilityText = translateUI('stat_stability_tooltip', [`<b>${stats.getStabilityMinDamage()}</b>`])
    
        $('.student-stat-table .stat-DefensePower .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(defText), html: true, placement: 'top'})
        $('.student-stat-table .stat-CriticalPoint .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(critChanceText), html: true, placement: 'top'})
        $('.student-stat-table .stat-StabilityPoint .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(stabilityText), html: true, placement: 'top'})
    
        // if (stats.getTotalString('AmmoCount') != 0) {
        //     const autoAttackSkill = (statPreviewSelectedChar > 0 ? summon : student).Skills.find(s => s.SkillType == "autoattack")
        //     if (autoAttackSkill) {
        //         $('.stat-AmmoCount .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(getNormalAttackHitsText(autoAttackSkill.Effects[0].Hits, stats.getTotalString('AmmoCost'), (statPreviewSelectedChar > 0 ? summon.WeaponType : student.WeaponType), student.BulletType.toLowerCase())), html: true, placement: 'top'})
        //     }
        // }

    }

    stats.renderActiveBuffs('.active-buffs', 7)

    calculateSkills()
    calculateRaidSkills()

    //save settings
    if (student.Id in studentCollection) {
        if (!lockedAttributes) {
            if (collectionUpdateTimeout) clearTimeout(collectionUpdateTimeout)
            collectionUpdateTimeout = window.setTimeout(() => {
                studentCollectionSave()
                statPreviewSettingsSave()
            }, 50)
        }
    } else {
        if (collectionUpdateTimeout) clearTimeout(collectionUpdateTimeout)
        collectionUpdateTimeout = window.setTimeout(() => {
            statPreviewSettingsSave()
        }, 50)
    }
}

function getSupportStats(support) {
    const supportStats = new CharacterStats(support.student, support.level, support.starGrade)

    //equipment
    for (let i = 0; i < 3; i++) {
        const tier = support.equipment[i]
        const gear = find(data.equipment, "Id", gearId[support.student.Equipment[i]]+tier-1)[0]

        if (support.level >= gear_minlevelreq[i]) {
            for (let j = 0; j < gear.StatType.length; j++) {
                supportStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
            }
        }
    }

    //bond gear
    if (support.gear && "Released" in support.student.Gear && support.student.Gear.Released[regionID]) {
        supportStats.addGearBonuses(support.student.Gear)
    }

    //weapon
    if ((support.starGrade == 5) && (support.weaponStarGrade > 0)) {
        const weaponStats = getWeaponStats(support.student, support.weaponLevel)
        Object.entries(weaponStats).forEach(el => {
            supportStats.addBuff(el[0], el[1])
        })
    }

    //bond level
    const bondBonus = getBondStats(support.student, Math.min(maxbond[support.starGrade-1], support.bond[0]))
    Object.entries(bondBonus).forEach(el => {
        supportStats.addBuff(el[0], el[1])
    })

    for (let i = 1; i < support.bond.length; i++) {
        const bondAlt = find(data.students, 'Id', support.student.FavorAlts[i-1])[0]
        if (bondAlt.IsReleased[regionID]) {
            const bondBonus = getBondStats(bondAlt, support.bond[i])
            Object.entries(bondBonus).forEach(el => {
                supportStats.addBuff(el[0], el[1])
            })
        }
    }

    //potential
    for (const stat in support.potential) {
        const potentialLevel = support.potential[stat]
        
        if (support.level >= 90) {

            const value = CharacterStats.getPotentialStatAmount(support.student, stat, support.level, potentialLevel)
            supportStats.addBuff(stat + '_Base', value)
            
        }
    }

    return supportStats
}

function calculateEnemyStats() {

    const enemy = find(data.enemies, "Id", statPreviewSelectedEnemyId)[0]
    let enemyLevel, enemyStats

    if (statPreviewSelectedEnemyRaid >= 1000000) {
        const raid = find(data.raids.MultiFloorRaid, 'Id', statPreviewSelectedEnemyRaid)[0]
        enemyLevel = raid.RaidFloors[statPreviewSelectedEnemyRaidFloor].Level
        enemyStats = new CharacterStats(enemy, enemyLevel, statPreviewSelectedEnemyGrade, (enemy.Transcendence ? enemy.Transcendence : []))
        $('#calculation-enemy-level input').val(enemyLevel)

        if (enemy.Id in raid.RaidFloors[statPreviewSelectedEnemyRaidFloor].StatChange) {
            const statChange = raid.RaidFloors[statPreviewSelectedEnemyRaidFloor].StatChange[enemy.Id]
            for (const stat in statChange) {
                enemyStats.addBuff(stat, statChange[stat])
            }
        }

    } else {
        enemyLevel = statPreviewSelectedEnemyLevel
        enemyStats = new CharacterStats(enemy, enemyLevel, statPreviewSelectedEnemyGrade, (enemy.Transcendence ? enemy.Transcendence : []))
    }

    //include Enemy Debuffs
    $('#statpreview-enemy-buff-transferable-conflict').hide()
    $('#statpreview-enemy-buff-transferable-incompatible').hide()
    $(`#statpreview-enemy-buff-transferable-controls .buff-description span`).toggleClass('invalid', false)
    let uniqueChannels = []
    statPreviewEnemyBuffs.buffs.forEach((buff, index) => {
        let buffIncompatible = true
        buff.Skill.Effects.filter(e => statPreviewEnemyBuffs.effectTypeFilter.includes(e.Type)).forEach((effect, effectIndex) => {
            const skillSlot = effect.OverrideSlot ? effect.OverrideSlot : buff.Skill.SkillType

            if ((effect.RestrictTo && !effect.RestrictTo.includes(statPreviewSelectedEnemyId)) || effect.Type != "BuffTarget" || !ExternalBuffs.checkRestrictions(enemy, effect, {"ArmorType": statPreviewSelectedEnemyArmorType})) {
                $(`#statpreview-enemy-buff-transferable-controls div[data-index='${index}'] .buff-description span[data-effect='${effectIndex}']`).toggleClass('incompatible', true)
            } else {

                buffIncompatible = false

                if (uniqueChannels.find(e => e.slot == skillSlot && e.channel == effect.Channel)) {
                    //discount the buff if there is a channel conflict
                    $('#statpreview-enemy-buff-transferable-conflict').show()
                    $(`#statpreview-enemy-buff-transferable-controls div[data-index='${index}'] .buff-description span[data-effect='${effectIndex}']`).toggleClass('conflict', true)
                } else {
                    const value = ExternalBuffs.getEffectValue(buff, effect) // ('StackSame' in effect ? effect.Value[0][buff.Level-1] * buff.Stacks : effect.Value[buff.Stacks-1][buff.Level-1])
                    enemyStats.addBuff(effect.Stat, value)
                    if ('Icon' in effect) {
                        enemyStats.addActiveBuffIcon(effect.Icon, 1, 'StackSame' in effect ? buff.Stacks : 1)
                    } else if ('StackingIcon' in effect) {
                        enemyStats.addActiveBuffIcon(effect.StackingIcon[buff.Stacks-1], value, 'StackSame' in effect ? buff.Stacks : 1)
                    } else {
                        enemyStats.addActiveBuffIcon(effect.Stat, value, 'StackSame' in effect ? buff.Stacks : 1)
                    }
                    uniqueChannels.push({slot: skillSlot, channel: effect.Channel})
                }
            }
        })
        if (buffIncompatible) $('#statpreview-enemy-buff-transferable-incompatible').show()
    })

    //Include Custom Buffs
    if (statPreviewEnemyCustomBuffs !== undefined) {
        statPreviewEnemyCustomBuffs.buffs.forEach((buff, index) => {

            enemyStats.addBuff(buff.Stat, buff.Amount)
            enemyStats.addActiveBuffIcon(buff.Stat, buff.Amount)
        })
    }

    enemyStats.renderActiveBuffs('.enemy-active-buffs', 8)

    enemyCalculationStatList.forEach(statName => {
        let valueHtml = enemyStats.getTotalString(statName, true)
        if (statName == 'DefensePower') {
            valueHtml = `<span class="has-tooltip">${valueHtml}</span>`
        }
        $(`#calculation-enemy-stat-table .stat-${statName} .stat-value`).html(valueHtml)
    })

    addRaidEnemyBonusStats(enemy.Id, enemyStats, statPreviewSelectedEnemyRaidDifficulty, '#calculation-enemy-stat-table')

    let defText = translateUI('stat_defense_tooltip', [`<b>${enemyStats.getDefenseDamageReduction()}</b>`])
    $('#calculation-enemy-stat-table .stat-DefensePower .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(defText), html: true, placement: 'top'})

    enemyStats.armorType = statPreviewSelectedEnemyArmorType

    statPreviewSelectedEnemyStats = enemyStats

    calculateSkills()
    calculateRaidSkills()
}

function calculateSkills() {
    if ($('#ba-student-modal-statpreview').hasClass('show')) {
        const levelPenalty = 0 - Math.max(Math.min((statPreviewSelectedEnemyStats.level - statPreviewCharacterStats.level) * 0.02, 0.6), 0)
        const effectiveness = statPreviewCharacterStats.getEffectiveMod(statPreviewSelectedEnemyStats.armorType)
        $(`#calculation-intermediate-terrain`).html(`<img width="24" height="24" src="images/ui/Ingame_Emo_Adaptresult${adaptationAmount[statPreviewCharacterStats.terrain[statPreviewTerrain]]}.png"><span>(${(80 + statPreviewCharacterStats.terrain[statPreviewTerrain] * 10)}%)</span>`)
        $(`#calculation-intermediate-effectiveness`).text(`${parseFloat((effectiveness*100).toFixed(2))}%`).toggleClass('text-weak', effectiveness > 1).toggleClass('text-resist', effectiveness < 1)
        $(`#calculation-intermediate-leveldiff`).text(`${parseFloat((levelPenalty*100).toFixed(2))}%`).toggleClass('text-negative', levelPenalty < 0)
        $(`#calculation-intermediate-hitchance`).text(statPreviewCharacterStats.getHitChanceString(statPreviewSelectedEnemyStats.getTotal('DodgePoint')))
        $(`#calculation-intermediate-critchance`).text(`${statPreviewCharacterStats.getCriticalHitChanceString(statPreviewSelectedEnemyStats.getTotal('CriticalChanceResistPoint'))}`)
        $(`#calculation-intermediate-variance`).text(`${statPreviewCharacterStats.getStabilityMinDamage()} ~ 100%`)

        if (!$('#student-stat-modal-skill-calc-toggle').hasClass('deactivated') && $('#calculation-student-skills').hasClass('active')) {
            skillInfoCollection.forEach((di) => {
                di.update(statPreviewCharacterStats, statPreviewSelectedEnemyStats, statPreviewTerrain)
            })
        }
    }
}

function calculateRaidSkills() {
    if ($('#ba-student-modal-statpreview').hasClass('show')) {
        if (!$('#student-stat-modal-skill-calc-toggle').hasClass('deactivated') && $('#calculation-enemy-skills').hasClass('active')) {
            raidSkillInfoCollection.forEach((di) => {
                di.update(statPreviewSelectedEnemyStats, statPreviewCharacterStats, statPreviewTerrain)
            })
        }
    }
}

function refreshStatTableControls() {
    for (let i = 0; i <= student_bondalts.length; i++) {
        $(`#ba-statpreview-status-bond-${i}-toggle`).toggleClass('deactivated', !statPreviewIncludeBond[i])
        $(`#ba-statpreview-status-bond-${i}-toggle .label`).html(statPreviewBondLevel[i])
        $(`#ba-statpreview-bond-${i}-toggle`).toggleClass("checked", statPreviewIncludeBond[i])
        $(`#ba-statpreview-bond-${i}`).toggleClass("disabled", !statPreviewIncludeBond[i])
        $(`#ba-statpreview-bond-${i} input`).prop("disabled", !statPreviewIncludeBond[i])
    }

    $('#ba-statpreview-status-passive-level').toggleClass('deactivated', !statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill-toggle').toggleClass("checked", statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill').toggleClass("disabled", !statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill input').prop("disabled", !statPreviewIncludePassive)

    $('#ba-statpreview-status-buffs').toggleClass('deactivated', !statPreviewIncludeBuffs)
    statPreviewExternalBuffs.toggleDisabled(!statPreviewIncludeBuffs)
    $('#ba-statpreview-buff-toggle').toggleClass("checked", statPreviewIncludeBuffs)
    // $('#ba-statpreview-buffs').toggleClass("disabled", !statPreviewIncludeBuffs)

    $('#ba-statpreview-status-equipment').toggleClass('deactivated', !statPreviewIncludeEquipment)
    $('#ba-statpreview-gear').toggleClass("disabled", !statPreviewIncludeEquipment)
    $('#ba-statpreview-gear-toggle').toggleClass("checked", statPreviewIncludeEquipment)
    $('#ba-statpreview-gear input').prop("disabled", !statPreviewIncludeEquipment)

    if (statPreviewIncludeEquipment) {
        for (let i = 0; i < 3; i++) {
            $(`#ba-statpreview-gear${i+1}`).toggleClass('disabled', (statPreviewLevel < gear_minlevelreq[i]))
            $(`#ba-statpreview-gear${i+1}-range`).prop('disabled', (statPreviewLevel < gear_minlevelreq[i]))
        }
    }

    $('#ba-statpreview-potential').toggleClass("disabled", !statPreviewIncludePotential)
    $('#ba-statpreview-potential-toggle').toggleClass("checked", statPreviewIncludePotential)
    $('#ba-statpreview-potential input').prop("disabled", !statPreviewIncludePotential)

    if (statPreviewIncludePotential) {
        for (const stat in statPreviewPotentialLevel) {
            $(`#ba-statpreview-potential-${stat.toLowerCase()}`).toggleClass('disabled', (statPreviewLevel < 90))
            $(`#ba-statpreview-potential-${stat.toLowerCase()}-range`).prop('disabled', (statPreviewLevel < 90))
        }
    }
}

function recalculateEXSkillPreview() {
    $('.tooltip').tooltip('hide')
    skillPreviewExSkillLevel = $("#ba-skillpreview-exrange").val()
    const skillEX = find(student.Skills, 'SkillType', 'ex')[0]

    $('#ba-skill-ex-level').html(skillPreviewExSkillLevel == 5 ? `<img src="images/ui/ImageFont_Max.png">` : "Lv." + skillPreviewExSkillLevel)
    $('#ba-skill-ex-description').html(getSkillText(skillEX, skillPreviewExSkillLevel, {bulletType: student.BulletType}))
    $(`#ba-skill-ex-description .skill-hitinfo`).tooltip({html: true})

    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    $('#ba-skill-ex-materials-page .item-icon-list').hide()
    $('#ba-skill-ex-materials-'+skillPreviewExSkillLevel).show()
    $('#ba-skill-ex-cost').text(skillEX.Cost[skillPreviewExSkillLevel-1])
    let extraInfo = getSkillExtraInfo(skillEX, student)

    if (renderExtraSkills('ex', skillPreviewExSkillLevel)) {
        //extraInfo = `<button class="ba-info-pill-s btn btn-dark" data-bs-toggle="collapse" data-bs-target="#skill-ex-extra-skills"><span class="label">${translateUI('summon')}<i class="fa-solid fa-angle-down ${$('#skill-ex-extra-skills').hasClass('show') ? 'fa-rotate-180' : ''} ms-2"></i></span></button>` + extraInfo
    }

    $(`#ba-skill-ex-extrainfo`).html(extraInfo).toggle(extraInfo != '')
    $(`#ba-skill-ex-extrainfo .ba-info-pill-s`).tooltip({html: true})

    if (student.Skills.some(s => s.SkillType == 'autoattack') && student.Skills.find(s => s.SkillType == 'autoattack').InheritScale) {
        recalculateNormalAttackPreview()
    }

    localStorage.setItem("student_skill_ex_level", skillPreviewExSkillLevel)
}

function recalculateSkillPreview() {
    $('.tooltip').tooltip('hide')
    skillPreviewOtherSkillLevel = $("#ba-skillpreview-range").val()
    const skillList = ['normal','passive','sub']

    $('#ba-skill-level').html(skillPreviewOtherSkillLevel == 10 ? `<img src="images/ui/ImageFont_Max.png">` : "Lv." + skillPreviewOtherSkillLevel)

    skillList.forEach(skillType => {

        let skill

        if (skillType == 'normal' && showSkillUpgrades && "Released" in student.Gear && student.Gear.Released[regionID]) {
            skill = find(student.Skills, 'SkillType', 'gearnormal')[0]
            $(`#ba-skill-normal-icon`).toggleClass('plus', true).find('img').attr("src", `images/skill/${skill.Icon}.webp`)
            $(`#ba-skill-normal-plus`).toggle(true)
        } else if (skillType == 'passive' && showSkillUpgrades && region.WeaponMaxLevel > 0) {
            skill = find(student.Skills, 'SkillType', 'weaponpassive')[0]
            $(`#ba-skill-passive-icon`).toggleClass('plus', true).find('img').attr("src", `images/skill/${skill.Icon}.webp`)
            $(`#ba-skill-passive-plus`).toggle(true)
        } else {
            skill = find(student.Skills, 'SkillType', skillType)[0]
            $(`#ba-skill-${skillType}-icon`).toggleClass('plus', false).find('img').attr("src", `images/skill/${skill.Icon}.webp`)
            $(`#ba-skill-${skillType}-plus`).toggle(false)
        }

        $(`#ba-skill-${skillType}-name`).html(skill.Name)
        $(`#ba-skill-${skillType}-description`).html(getSkillText(skill, skillPreviewOtherSkillLevel, {bulletType: student.BulletType}))
        $(`#ba-skill-${skillType}-description .skill-hitinfo`).tooltip({html: true})
        let extraInfo = getSkillExtraInfo(skill, student)
    
        if (renderExtraSkills(skillType, skillPreviewOtherSkillLevel)) {
            //extraInfo = `<button class="ba-info-pill-s btn btn-dark" data-bs-toggle="collapse" data-bs-target="#skill-${skillType}-extra-skills"><span class="label">${translateUI('summon')}<i class="fa-solid fa-angle-down ${$(`#skill-${skillType}-extra-skills`).hasClass('show') ? 'fa-rotate-180' : ''} ms-2"></i></span></button>` + extraInfo
        }

        $(`#ba-skill-${skillType}-extrainfo`).html(extraInfo).toggle(extraInfo != '')
        $(`#ba-skill-${skillType}-extrainfo .ba-info-pill-s`).tooltip({html: true})
    })

    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    $('#ba-skill-materials-page .item-icon-list').hide()
    $('#ba-skill-materials-'+skillPreviewOtherSkillLevel).show()

    if (student.Skills.some(s => s.SkillType == 'autoattack') && student.Skills.find(s => s.SkillType == 'autoattack').InheritScale) {
        recalculateNormalAttackPreview()
    }

    localStorage.setItem("student_skill_other_level", skillPreviewOtherSkillLevel)
}

function renderExtraSkills(sourceskill, level) {
    let extraSkillsHtml = ''
    student.Summons.filter(s => s.SourceSkill == sourceskill && s.Id != 99999).forEach((summon) => {

        const summonInfo = find(data.summons, 'Id', summon.Id)[0]

        summonInfo.Skills.forEach((summonSkill) => {

            if (summonSkill.ShowInfo === false) {
                return
            }

            if (summonSkill.SkillType == 'autoattack') {
                addNormalAttackSkillText(summonSkill)
                summonSkill.Range = summonInfo.Range
                if (summonSkill.Effects[0].Type == "DMGMulti") {
                    summonSkill.Effects[0].HitsParameter = 1
                }
            }
            const skillExtraInfo = getSkillExtraInfo(summonSkill, summonInfo)

            extraSkillsHtml += `<div class="ba-panel-separator"></div>
            <div class="ps-4">
                <div class="my-2 d-flex flex-row align-items-start gap-3 w-100">
                    <div class="skill-icon small bg-skill ${student.BulletType.toLowerCase()}"><img src="images/skill/${summonSkill.Icon}.webp"></div>
                    <div class="d-inline-block flex-fill">
                        <div>
                            <h5 class="me-2 d-inline">${summonSkill.Name} <small>(${summonInfo.Name})</small></h5>
                        </div>
                        ${summonSkill.SkillType != 'autoattack' ? `<div class="d-flex mt-1"><span class="text-italic">${translateUI(`student_skill_${summonSkill.SkillType}`)}</span></div>` : ''}
                        <div class="pt-1 d-flex gap-3 align-items-center flex-wrap justify-content-between">
                            <div class="position-relative">
                                <p class="mb-1">${getSkillText(summonSkill, summonSkill.SkillType == 'autoattack' ? 1 : level, {bulletType: student.BulletType})}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ${skillExtraInfo ? `<div class="skill-extrainfo">${skillExtraInfo}</div>` : '' }
            </div>`
        })
    })

    studentExtraSkills = student.Skills.find(s => s.SkillType == sourceskill).ExtraSkills || []

    for (const extraSkill of studentExtraSkills) {

        const skillExtraInfo = getSkillExtraInfo(extraSkill, student)

        extraSkillsHtml += `<div class="ba-panel-separator"></div>
        <div class="ps-4">
            <div class="my-2 d-flex flex-row align-items-start gap-3 w-100">
                <div class="skill-icon small bg-skill ${student.BulletType.toLowerCase()}"><img src="images/skill/${extraSkill.Icon}.webp"></div>
                <div class="d-inline-block flex-fill">
                    <div>
                        <h5 class="me-2 d-inline">${extraSkill.Name}</h5>
                    </div>
                    <div class="d-flex mt-1">
                        <span class="text-italic">${translateUI(`student_skill_${extraSkill.SkillType}`)}</span>
                        ${extraSkill.SkillType == 'ex' ? `<span class="text-bold">&nbsp;・&nbsp;<i>COST:</i> ${extraSkill.Cost[level - 1]}</span>` : ''}`

        if (extraSkill.TSAId) {
            const tsaStudent = find(data.students, "Id", extraSkill.TSAId)[0]
            extraSkillsHtml += `<span class="ms-auto" onclick="loadStudent('${tsaStudent.PathName}')" style="cursor:pointer;"><i class="fa-solid fa-link me-1"></i><img class="inline-img circle me-1" src="images/student/icon/${extraSkill.TSAId}.webp">${tsaStudent.Name}</span>`
        }

        extraSkillsHtml += `</div>
                    <div class="pt-1 d-flex gap-3 align-items-center flex-wrap justify-content-between">
                        <div class="position-relative">
                            <p class="mb-1">${getSkillText(extraSkill, level, {bulletType: student.BulletType})}</p>
                        </div>
                    </div>
                </div>
            </div>
            ${skillExtraInfo ? `<div class="skill-extrainfo">${skillExtraInfo}</div>` : '' }
        </div>`
    }

    if (student.TSAId && sourceskill == 'ex') {

        const tsaStudent = find(data.students, "Id", student.TSAId)[0]

        if (tsaStudent.IsReleased[regionID]) {
            studentTSASkills = []
            tsaStudent.Skills.forEach((skill) => {
                if (skill.ExtraSkills) {
                    studentTSASkills.push(skill.ExtraSkills.filter(s => s.TSAId == student.Id))
                }
                
            })

            for (const extraSkill of tsaStudent.Skills.filter(s => s.ExtraSkills)) {

                for (const tsaSkill of extraSkill.ExtraSkills.filter(s => s.TSAId == student.Id)) {
                    const skillExtraInfo = getSkillExtraInfo(tsaSkill, student)
            
                    extraSkillsHtml += `<div class="ba-panel-separator"></div>
                    <div class="ps-4">
                        <div class="my-2 d-flex flex-row align-items-start gap-3 w-100">
                            <div class="skill-icon small bg-skill ${student.BulletType.toLowerCase()}"><img src="images/skill/${tsaSkill.Icon}.webp"></div>
                            <div class="d-inline-block flex-fill">
                                <div>
                                    <h5 class="me-2 d-inline">${tsaSkill.Name}</h5>
                                </div>
                                <div class="d-flex mt-1">
                                    <span class="text-italic">${translateUI(`student_skill_${tsaSkill.SkillType}`)}</span>
                                    ${tsaSkill.SkillType == 'ex' ? `<span class="text-bold">&nbsp;・&nbsp;<i>COST:</i> ${tsaSkill.Cost[level - 1]}</span>` : ''}`
                    extraSkillsHtml += `<span class="ms-auto" onclick="loadStudent('${tsaStudent.PathName}')" style="cursor:pointer;"><i class="fa-solid fa-link me-1"></i><img class="inline-img circle me-1" src="images/student/icon/${tsaStudent.Id}.webp">${tsaStudent.Name}</span>`
                    extraSkillsHtml += `</div>
                                <div class="pt-1 d-flex gap-3 align-items-center flex-wrap justify-content-between">
                                    <div class="position-relative">
                                        <p class="mb-1">${getSkillText(tsaSkill, level, {bulletType: student.BulletType})}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ${skillExtraInfo ? `<div class="skill-extrainfo">${skillExtraInfo}</div>` : '' }
                    </div>`                    
                }


            }
        }

    }

    



    $(`#skill-${sourceskill}-extra-skills`).html(extraSkillsHtml)
    $(`#skill-${sourceskill}-extra-skills`).find('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    if (extraSkillsHtml != '') {
        $(`#skill-${sourceskill}-extra-skills`).find('.ba-info-pill-s, .skill-hitinfo').tooltip({html: true})
    }

    return extraSkillsHtml !== ''
}

function getSkillExtraInfo(skill, character) {
    let extraInfo = ''
    let showRange = true

    if (skill.Radius) {

        skill.Radius.forEach((radius) => {
            let label = ''
            let tooltip = ''
            let icon = ''
            switch (radius.Type) {
                case 'Circle':
                    label = `${radius.Radius}`
                    tooltip = `${translateUI('radius')}: <b>${radius.Radius / 100}m (${radius.Radius})</b>`
                    icon = 'COMMON_SKILLICON_CIRCLE'
                    if (radius.Radius == skill.Range) showRange = false
                    break
                case 'Donut':
                    label = `${radius.ExcludeRadius} - ${radius.Radius} / ${radius.Degree}&deg;`
                    tooltip = `${translateUI('radius')}: <b>${radius.ExcludeRadius / 100}m - ${radius.Radius / 100}m (${radius.ExcludeRadius} - ${radius.Radius})</b>\n${translateUI('angle')}: <b>${radius.Degree}&deg;</b>`
                    icon = 'COMMON_SKILLICON_DONUT'
                    if (radius.Radius >= skill.Range) showRange = false
                    break
                case 'Fan':
                    label = `${radius.Radius} / ${radius.Degree}&deg;`
                    tooltip = `${translateUI('radius')}: <b>${radius.Radius / 100}m (${radius.Radius})</b>\n${translateUI('angle')}: <b>${radius.Degree}&deg;</b>`
                    icon = 'COMMON_SKILLICON_FAN'
                    showRange = false
                    break
                case 'Obb':
                    label = radius.Height > radius.Width ? `${radius.Height}` : `${radius.Width} &times; ${radius.Height}`
                    tooltip = `${translateUI('length')}: <b>${radius.Height / 100}m (${radius.Height})</b>\n${translateUI('width')}: <b>${radius.Width / 100}m (${radius.Width})</b>`
                    icon = radius.Height > radius.Width ? 'COMMON_SKILLICON_LINE' : 'COMMON_SKILLICON_RECZONE'
                    if (radius.Height >= skill.Range) showRange = false
                    break
                case 'Bounce':
                    label = `${radius.Radius}`
                    tooltip = `${translateUI('bounce')}: <b>${radius.Radius / 100}m (${radius.Radius})</b>`
                    icon = 'COMMON_SKILLICON_BOUNCEPROJECTILE'
                    break
                default:
                    break;
            }
            
            extraInfo += `<div class="ba-info-pill-s bg-theme" title="${getBasicTooltip(tooltip)}"><img class="icon invert-light" src="images/skill/${icon}.webp"><span class="label">${label}</span></div>`
        })
        
    }

    if ((showRange || skill.SkillType == 'autoattack') && skill.Range) {
        extraInfo += `<div class="ba-info-pill-s bg-theme" title="${getBasicTooltip(translateUI('range') + `: <b>${skill.Range / 100}m (${skill.Range})</b>`)}"><img class="icon invert-light" src="images/staticon/Stat_Range.png"><span class="label">${skill.Range}</span></div>`
    }

    if (skill.SkillType == 'autoattack') {
        const effect = skill.Effects[0]
        const attackFrames = Math.ceil(effect.Frames.AttackIngDuration)
        const attackDelayFrames = Math.ceil(effect.Frames.AttackBurstRoundOverDelay)
        const reloadFrames = Math.ceil(effect.Frames.AttackReloadDuration)
        const startDelay = Math.ceil(effect.Frames.AttackStartDuration)
        const endDelay = Math.ceil(effect.Frames.AttackEndDuration)

        const attackFramesString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(attackFrames / 30, 2), attackFrames])}</b>`
        const attackDelayFramesString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(attackDelayFrames / 30, 2), attackDelayFrames])}</b>`
        const startDelayString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(startDelay / 30, 2), startDelay])}</b>`
        const reloadFramesString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(reloadFrames / 30, 2), reloadFrames])}</b>`
        const endDelayString = `<b>${translateUI('time_seconds_frames', [MathHelper.toFixedFloat(endDelay / 30, 2), endDelay])}</b>`

        const fireRate = MathHelper.toFixedFloat((attackFrames + attackDelayFrames) / 30, 2)
        const reload = MathHelper.toFixedFloat((startDelay + reloadFrames + endDelay) / 30, 2)

        if (fireRate != 0) {
            extraInfo += `<div class="ba-info-pill-s bg-theme" title="${getBasicTooltip(translateUI('dmginfo_rate_of_fire_tooltip', [attackFramesString, attackDelayFramesString]))}"><i class="fa-solid fa-circle-play ms-2" style="font-size: 14px;"></i><span class="label">${translateUI('time_seconds', [fireRate])}</span></div>`
        }

        if (reload != 0) {
            extraInfo += `<div class="ba-info-pill-s bg-theme" title="${getBasicTooltip(translateUI('dmginfo_reload_time_tooltip', [reloadFramesString, startDelayString, endDelayString]))}"><img class="icon invert-light" src="images/skill/COMMON_SKILLICON_RELOAD.webp"><span class="label">${translateUI('time_seconds', [reload])}</span></div>`
        }
        
        extraInfo += `<div class="ba-info-pill-s bg-theme"><img class="icon invert-light" src="images/staticon/Stat_AmmoCount.png"><span class="label">${character.AmmoCount} (${character.AmmoCost})</span></div>`

    } else if (skill.Duration) {
        extraInfo += `<div class="ba-info-pill-s bg-theme" title="${getBasicTooltip(translateUI('skill_duration') + ':\n<b>' + translateUI('time_seconds_frames', [MathHelper.toFixedFloat(skill.Duration / 30, 2), skill.Duration]) + '</b>')}"><i class="fa-solid fa-circle-play ms-2" style="font-size: 14px;"></i><span class="label">${translateUI('time_seconds', [MathHelper.toFixedFloat(skill.Duration / 30, 2)])}</span></div>`
    }

    return extraInfo
}

function recalculateNormalAttackPreview() {

    const skill = find(student.Skills, 'SkillType', 'autoattack')[0]
    addNormalAttackSkillText(skill)

    if (skill.InheritScale) {
        const fromSkill = find(student.Skills, 'SkillType', skill.InheritScale.Skill)[0]
        const level = skill.InheritScale.Skill == 'ex' ? skillPreviewExSkillLevel : skillPreviewOtherSkillLevel
        skill.Parameters = [[fromSkill.Parameters[skill.InheritScale.Parameter - 1][level - 1]]]
    }

    skill.Range = student.Range

    if (skill.Effects[0].Type == "DMGMulti") {
        skill.Effects[0].HitsParameter = 1
    }

    $(`#ba-skill-autoattack-icon`).find('img').attr("src", `images/skill/${skill.Icon}.webp`)
    $(`#ba-skill-autoattack-name`).html(skill.Name)
    $(`#ba-skill-autoattack-description`).html(getSkillText(skill, 1, {bulletType: student.BulletType}))
    $(`#ba-skill-autoattack-description .skill-hitinfo`).tooltip({html: true})
    
    const extraInfo = getSkillExtraInfo(skill, student)
    $(`#ba-skill-autoattack-extrainfo`).html(extraInfo)
    $(`#ba-skill-autoattack-extrainfo .ba-info-pill-s`).tooltip({html: true})
    
}

function getStudentListCardHTML(student) {
    let name = getTranslatedString(student, 'Name')
    let html = `
    <div id="student-select-${student.Id}" class="selection-grid-card card-student" onclick="loadStudent('${student.PathName}')">
        <div class="card-img">
            <img src="images/student/collection/${student.Id}.webp">
        </div>
        <span class="card-badge student-role top-left bg-${student.SquadType.toLowerCase()}"><img src="images/ui/Role_${student.TacticRole}.png"></span>
        <span class="card-badge student-type atk bg-atk-${student.BulletType.toLowerCase()}"><img src="images/ui/Type_Attack_s.png"></span>
        <span class="card-badge student-type def bg-def-${student.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense_s.png"></span>
        <span class="card-badge student-rarity">${'<i class="fa-solid fa-star"></i>'.repeat(student.StarGrade)}</span>
        <div class="card-label">
            <span class="label-text ${name.length > label_smalltext_threshold[userLang] ? "smalltext" : ""}">${name}</span>
            <span class="label-text hover ${name.length > label_smalltext_threshold[userLang] ? "smalltext" : ""}" style="display: none;">${name}</span>
        </div>
    </div>`
    return html
}

function getStageCardHTML(stage, dropChance = 0, includeEventName = false) {
    let type = ''
    let smallTextThreshold = label_enemy_smalltext_threshold["En"]
    if (stage.Id >= 7000000) {
        type = stage.Field ? 'Field' : 'Event'
    } else if (stage.Id >= 1000000) {
        type = 'Campaign'
    } else if (stage.Id >= 60000) {
        type =  'SchoolDungeon'
        smallTextThreshold = label_enemy_smalltext_threshold[userLang]
    } else if (stage.Id >= 30000) {
        type = 'WeekDungeon'
        smallTextThreshold = label_enemy_smalltext_threshold[userLang]
    } else {type = 'Unknown'}
    let name = getStageCardName()
    let html = `<div id="stage-select-${stage.Id}" class="selection-grid-card card-stage" onclick="loadStage('${stage.Id}')">
    <div class="card-img"><img loading="lazy" src="images/campaign/${getStageIcon(stage, type)}.png"></div>`
    if (dropChance > 0) {
        html += `<span class="card-badge stage-droprate">${getProbabilityText(dropChance)}</span>`
    }
    html += `<div class="card-label">`
    html += `<span class="label-text ${type == 'Field' || name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span>`
    html += `</div></div>`
    return html

    function getStageCardName() {
        switch (type) {
            case "Event":
            case "Campaign":
                return getStageName(stage, type, true)
            case "Field":
                return getStageTitle(stage, type)
            case "WeekDungeon":
            case "SchoolDungeon":
                return `${getLocalizedString('StageTitle', stage.Type, [String.fromCharCode(64+stage.Stage)])}`
        }
    }
}

function getShopCardHTML(shop) {
    let smallTextThreshold = label_enemy_smalltext_threshold[userLang]
    let name = getLocalizedString('ShopCategory', shop.ShopCategory)
    let costItem
    let costType
    switch (shop.CostType) {
        case 'Item':
            costItem = find(data.items, 'Id', shop.CostId)[0]
            costType = costItem.Category
            break
        case 'Currency':
            costItem = find(data.currency, 'Id', shop.CostId)[0]
            costType = 'Currency'
            break
    }

    let html = `<div class="selection-grid-card card-shop">
    <div class="card-img"><img loading="lazy" src="images/ui/BG_Shop.png"></div>`

    html += `<span class="card-badge shop-cost" title="${getRichTooltip(`images/item/icon/${costItem.Icon}.webp`, getTranslatedString(costItem, 'Name').escapeHtml(), getLocalizedString('ItemCategory', costType), getRarityTier(costItem.Rarity), getTranslatedString(costItem, 'Desc').escapeHtml().replace('&','&amp;'), 50, 'img-scale-larger')}"><img src="images/item/icon/${costItem.Icon}.webp"><span>&times;${abbreviateNumber(shop.CostAmount)}${shop.Amount > 1 ? ` (${shop.Amount})` : ''}</span></span>`
    html += `<div class="card-label">`
    html += `<span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span>`
    html += `</div></div>`
    return html
}

function getEventCardHTML(eventId) {
    let eventIdImg = eventId % 10000
    let name = getLocalizedString("EventName", eventIdImg) + (eventId > 10000 ? translateUI('event_rerun') : '')

    const logoLang = getEventlogoLang(eventIdImg)

    let onClick
    switch (eventId) {
        case 821:
            onClick = `loadRaid(821001);`
            break;
        case 823:
            onClick = `loadRaid(823000);`
            break;
        default:
            onClick = `populateEventStageList(${eventId});`
            break;
    }

    let html = `
    <div id="event-select-${eventId}" class="selection-grid-card card-event" onclick="${onClick}">
        <div class="card-bg"><div style="background-image:url('images/campaign/Campaign_Event_${eventIdImg}_Normal.png');"></div>
        </div>
        ${eventId > 10000 ? '<img class="event-revival" src="images/ui/Event_Revival.png">' : ''}
        <div class="card-img"><img src="images/eventlogo/${eventIdImg}_${logoLang}.webp"></div>`
    html += `<div class="card-label"><span class="label-text ${name.length > label_raid_smalltext_threshold[userLang] ? 'smalltext' : ''}">${name}</span></div></div>`
    return html
}

function getEventlogoLang(eventId) {
    if (regionID == 0 || !region.Events.includes(eventId)) {
        //always use JP logo for Japan server
        return 'Jp'
    } else {
        if (userLang == 'Cn') {
            return 'Tw'
        } else if (userLang == 'Vi' || userLang == 'Zh') {
            return 'Jp'
        } else {
            return userLang
        }
    }
}

function getStageIcon(stage, type) {
    switch (type) {
        case "Event":
        case "Field":
            return `Campaign_Event_${stage.EventId > 10000 ? stage.EventId - 10000 : stage.EventId}_${stage.Difficulty == 2 ? 'Hard' : 'Normal'}`
        case "Campaign":
            return `Campaign_Image_${stage.Area.toString().padStart(2,'0')}_${stage.Difficulty == 1 ? 'Hard' : 'Normal'}`
        case "WeekDungeon":
            return `WeekDungeon_Image_${stage.Type}`
        case "SchoolDungeon":
            return `SchoolDungeon_Image_${stage.Type}`
    }
}

function getRaidCardHTML(raid, season=null, backgroundPath=null) {
    let name = getTranslatedString(raid, 'Name')
    const terrain = season ? season.Terrain : ''

    if (raid.Id >= 1000000) {
        name += ` (${getLocalizedString('ArmorTypeLong', raid.ArmorType)})`
    }

    if (!backgroundPath) {

        if (raid.Id >= 1000000) {
            backgroundPath = `MultiFloorRaid_Floor_BG`
        } else {
            // Check if it's the alternative terrain background
            if (raid.Terrain.length > 1 && terrain == raid.Terrain[1]) {
                backgroundPath = `Boss_Portrait_${raid.PathName}_LobbyBG_${terrain}`
            } else {
                backgroundPath = `Boss_Portrait_${raid.PathName}_LobbyBG`
            }            
        }

    }

    let html = `<div id="raid-select-${raid.Id}" class="selection-grid-card card-raid" onclick="loadRaid(${raid.Id});"><div class="card-bg"><div style="background-image:url('images/raid/${backgroundPath}.png');"></div></div><div class="card-img ${raid.Id > 100000 ? "worldraid" : ""}"><img src="images/raid/Boss_Portrait_${raid.PathName}_Lobby.png"></div>`

    if (season && season.TormentArmorType) {
        html += `<div class="card-badge raid-def bg-def-${season.TormentArmorType.toLowerCase()}"><img src="images/ui/Type_Defense.png"><span class="label">TOR</span></div>`
    } else {
        html += `<div class="card-badge raid-def bg-def-${raid.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense.png"></div>`
    }
    
    if (terrain != '') {
        html += `<div class="card-badge raid-terrain"><img class="invert-light" src="images/ui/Terrain_${terrain}.png"></div>`
    }

    html += `<div class="card-label"><span class="label-text ${name.length > label_raid_smalltext_threshold[userLang] ? 'smalltext' : ''}">${name}</span></div></div>`
    return html
}

function getTimeAttackCardHTML(raid) {
    let name = `${raid.Id / 1000}: ${getLocalizedString("TimeAttackStage", raid.DungeonType)}`
    let html = `<div id="raid-select-${raid.Id}" class="selection-grid-card card-raid" onclick="loadRaid(${raid.Id});"><div class="card-bg"><div style="background-image:url('images/timeattack/${timeAttackBG[raid.DungeonType]}.png');"></div></div><div class="card-img ta-img"><img src="images/enemy/${raid.Icon}.webp"></div><div class="card-badge ta-rules">`
    // <div class="card-badge raid-def bg-def-${raid.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense.png"></div>
    // <div class="card-badge raid-terrain"><img class="invert-light" src="images/ui/Terrain_${raid.Terrain}.png"></div>`
    raid.Rules[raid.Rules.length-1].forEach((rule) => {
        const taRule = find(data.raids.TimeAttackRules, 'Id', rule.Id)[0]
        html += `<img src="images/timeattack/${taRule.Icon}.webp">`
    })
    html += `</div><div class="card-label"><span class="label-text ${name.length > label_raid_smalltext_threshold[userLang] ? 'smalltext' : ''}">${name}</span></div></div>`
    return html
}

function getEnemyCardHTML(enemy, level, terrain, grade, scaletype=0, data=true) {
    let name = getTranslatedString(enemy, 'Name')
    let smallTextThreshold = getSmallTextThreshold(name, label_enemy_smalltext_threshold)
    let html = `<div class="selection-grid-card card-enemy" ${data ? `data-enemy='${enemy.Id}_${level}_${grade}_${scaletype}'` : ''} onclick='showEnemyInfo(${enemy.Id},${level},"${terrain}",${grade},${scaletype},${!data})'><div class="card-img"><img src="images/enemy/${enemy.Icon}.webp"></div>`

    if (enemy.IsNPC) {
        html += `<span class="card-badge enemy-npc">NPC</span>`
    } else {
        if (enemy.Rank == 'Elite') html += `<div class="card-badge enemy-rank"><img src="images/ui/Common_Icon_Enemy_Elite.png" style="width:22px;"></div>`
        else if (enemy.Rank == 'Champion') html += `<div class="card-badge enemy-rank"><img src="images/ui/Common_Icon_Enemy_Champion.png" style="width:31px;"></div>`    
    }

    html += `<div class="card-badge enemy-level">Lv.${level}</div><div class="card-badge enemy-atk bg-atk-${enemy.BulletType.toLowerCase()}"><img src="images/ui/Type_Attack_s.png" style="width:100%;"></div>
    <div class="card-badge enemy-def bg-def-${enemy.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense_s.png" style="width:100%;"></div><div class="card-label"><span class="label-text ${name.length > smallTextThreshold ? 'smalltext' : ''}">${name}</span></div></div>`
    return html
}

function showEnemyInfo(id, level, terrain, grade=1, scaletype=0, switchTab=false) {
    $(".card-enemy").removeClass("selected")
    if (loadedModule == 'stages' && switchTab) $('#ba-stage-tab-enemies').tab('show')
    $(`.card-enemy[data-enemy='${id}_${level}_${grade}_${scaletype}']`).addClass("selected")
    //if (selector != null) $(selector).addClass("selected")

    let enemy = find(data.enemies, 'Id', id)[0]
    $('#ba-stage-enemy-name').html(getTranslatedString(enemy, 'Name'))
    $('#ba-stage-enemy-icon img').attr('src', `images/enemy/${enemy.Icon}.webp`)
    $('#ba-stage-enemy-icon').removeClass('elite champion boss').addClass(enemy.Rank.toLowerCase())
    $('#ba-stage-enemy-level .label').text(`Lv.${level}`)
    $('#ba-stage-enemy-class').removeClass("ba-class-main ba-class-support").addClass(`ba-class-${enemy.SquadType.toLowerCase()}`)
    $('#ba-stage-enemy-class .label').text(getLocalizedString('SquadType', enemy.SquadType))

    $('#ba-stage-enemy-size .label').text(enemy.Size != null ? getLocalizedString('CharacterSize', enemy.Size) : '')
    $('#ba-stage-enemy-size').toggle(enemy.Size != null)
    setAttackTypeClass($("#ba-stage-enemy-attacktype .icon-type"), enemy.BulletType)
    setDefenseTypeClass($("#ba-stage-enemy-defensetype .icon-type"), enemy.ArmorType)
    $("#ba-stage-enemy-attacktype .label").text(getLocalizedString('BulletType',enemy.BulletType))
    $("#ba-stage-enemy-defensetype .label").text(getLocalizedString('ArmorType',enemy.ArmorType))
    $('#ba-stage-enemy-attacktype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType',enemy.BulletType)}`, translateUI('attacktype'), null, getAttackTypeText(enemy.BulletType), 32), placement: 'top', html: true})
    $('#ba-stage-enemy-defensetype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorType',enemy.ArmorType)}`, translateUI('defensetype'), null, getDefenseTypeText(enemy.ArmorType), 32), placement: 'top', html: true})        

    let enemyStats = new CharacterStats(enemy, level, grade, (enemy.Transcendence ? enemy.Transcendence : []), scaletype == 1 ? 'TimeAttack' : 'Standard')

    //override joint exercise HP values
    if (loadedModule == 'raids') {

        if (raid.Id == 8000) {
            switch (id) {
                case 7801003: case 7801103:
                    enemyStats.setBase('MaxHP', 10)
                    break
                case 7801004: case 7801104: case 7801203:
                    enemyStats.setBase('MaxHP', 15)
                    break
                case 7801204:
                    enemyStats.setBase('MaxHP', 23)
                    break
            }
        }

        if (raid.Id == 19000) {
            switch (id) {
                case 7810003:
                case 7810004:
                    enemyStats.setBase('MaxHP', 250)
                    break
            }
        }

        if (raid.Id == 21000) {
            switch (id) {
                case 7832101:
                case 7832102:
                case 7832103:
                case 7832104:
                    enemyStats.setBase('DefensePower', 2000)
                    enemyStats.setBase('DodgePoint', 1500)
                    break
                case 7832201:
                case 7832202:
                case 7832203:
                case 7832204:
                    enemyStats.setBase('DefensePower', 2000)
                    enemyStats.setBase('DodgePoint', 1000)
                    break
                case 7832301:
                case 7832302:
                case 7832303:
                case 7832304:
                    enemyStats.setBase('DefensePower', 2000)
                    enemyStats.setBase('DodgePoint', 500)
                    break
            }
        }

    }

    enemyStatList.forEach((statName) => {
        if (statName == 'AmmoCount') {
            $(`#ba-stage-enemy-stat-table .stat-${statName} .stat-value`).text(enemy.SquadType == 'Main' ? enemyStats.getBaseString('AmmoCount') + ' (' + enemyStats.getBaseString('AmmoCost') + ')' : '-')
        } else if (statName == 'DefensePower' || statName == 'StabilityPoint') {
            $(`#ba-stage-enemy-stat-table .stat-${statName} .stat-value`).html(`<span class="has-tooltip">${enemyStats.getBaseString(statName)}</span>`)
        } else {
            $(`#ba-stage-enemy-stat-table .stat-${statName} .stat-value`).text(enemyStats.getBaseString(statName))
        }
    })

    const adaptationValue = enemyStats.terrain[terrain]
    const adaptation = adaptationAmount[adaptationValue]
    $('#ba-stage-enemy-terrain .label').text(adaptation)
    $(`#ba-stage-enemy-terrain .icon-terrain-strength img`).attr("src", `images/ui/Ingame_Emo_Adaptresult${adaptation}.png`)
    $(`#ba-stage-enemy-terrain`).tooltip('dispose').tooltip({title: getRichTooltip(`images/ui/Ingame_Emo_Adaptresult${adaptation}.png`,translateUI('terrain_adaption', [getLocalizedString('AdaptationType', terrain)])+' '+adaptation, null, null, getAdaptationText(terrain, adaptation), 30), placement: 'top', html: true})


    let defText = translateUI('stat_defense_tooltip', [`<b>${enemyStats.getDefenseDamageReduction()}</b>`])
    $('.stat-DefensePower .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(defText), html: true, placement: 'top'})

    let stabilityText = translateUI('stat_stability_tooltip', [`<b>${enemyStats.getStabilityMinDamage()}</b>`])
    $('.stat-StabilityPoint .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(stabilityText), html: true, placement: 'top'})

    renderEnemySkills(enemy, $('#ba-stage-enemy-skills'))
}

function renderEnemySkills(enemy, container) {
    const emphasisRegex = /[0-9.]+(?:%|s|秒|초| วินาที)/g
 
    let html = ''
    if (enemy.Skills !== undefined) {
        if (html == '') html = '<div class="ba-panel-separator mb-2"></div><ul>'
        
        for (const skill of enemy.Skills) {
            html += `<li>${replaceBuffPlaceholders(skill.replace(emphasisRegex, function(match) {return `<strong>${match}</strong>`}))}</li>`
        }
    }

    if (enemy.PhaseChange !== undefined) {
        if (html == '') html = '<div class="ba-panel-separator mb-2"></div><ul>'

        for (const phase of enemy.PhaseChange) {
            switch (phase.Trigger) {
                case 'HPUnder':
                    html += `<li>${getLocalizedString('RaidChangePhase', 'HPUnder', [`<b>${phase.Phase + 1}</b>`, `<b class="text-emphasis">${phase.Argument.toLocaleString()}</b>`])}</li>`
                    break;
            }
            
        }
    }
    
    if (html == '') {
        container.empty().hide()
    } else {
        html += '</ul>'
        container.html(html)
        container.show()
        container.find('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
            $(el).tooltip({html: true})
        })
    }
}

function populateMapEnemyList(formationId) {
    stageMapModal.hide()
    let enemyList = {}
    const enemyRanks = ['Minion','Elite','Champion','Boss']
    let formation = find(loadedStage.Formations, 'Id', formationId)[0]
    let html = ''
    for (let i = 0; i < formation.EnemyList.length; i++) {
        let enemy = find(data.enemies, "Id", formation.EnemyList[i])[0]
        let rankId = enemyRanks.indexOf(enemy.Rank)
        enemyList[`${4-rankId}_${enemy.Id}_${formation.Level[rankId]}_${formation.Grade[rankId]}`] = enemy
    }

    Object.keys(enemyList).sort().forEach(el => {
        e_level = el.split('_')[2]
        e_grade = el.split('_')[3]
        html += getEnemyCardHTML(enemyList[el], e_level, loadedStage.Terrain ,e_grade, 0, false)
    })
    $('#ba-stage-map-enemies').html(html)
    window.scrollTo({top: $(`#ba-stage-map-enemies`).prop('offsetTop'), left: 0})
}

function getMaterialIconHTML(id, amount) {
    //rarity, icon, name, amount, type, description=""
    let item, itemType, html
    if (id >= 3000000) {
        item = find(data.currency, "Id", id-3000000)[0]
        itemType = 'Currency'
    } else {
        item = find(data.items, "Id", id)[0]
        itemType = item.Category
    }
    html = `<div class="drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${item.Id})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/item/icon/${item.Icon}.webp`, getTranslatedString(item, 'Name').escapeHtml(), getLocalizedString('ItemCategory', itemType), getRarityTier(item.Rarity), getTranslatedString(item, 'Desc').escapeHtml().replace('&','&amp;'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()}" src="images/item/icon/${item.Icon}.webp" alt="${item.Name}">${amount != 0 ? `<span class="ba-material-label" style="cursor:pointer;">&times;${amount}</span>` : ''}</div>`
    return html
}

function getDropIconHTML(id, chance, qtyMin=1, qtyMax=1, forcePercent=false, dropType=null, appendDescription=null) {
    let item, type, group, haslink, itemType
    if (id >= 4000000 && id < 5000000) {
        const groups = find(data.groups, "Id", id-4000000)
        if (groups.length > 0) {
            group = groups[0]
            type = 'GachaGroup'
            itemType = 'Box'
            iconPath = 'item'
            haslink = false
        } else return ''
    } else if (id >= 3000000 && id < 4000000) {
        item = find(data.currency, "Id", id-3000000)[0]
        type = 'Currency'
        itemType = 'Currency'
        iconPath = 'item'
        haslink = false
    } else if (id >= 2000000 && id < 3000000) {
        item = find(data.equipment, "Id", id-2000000)[0]
        type = 'Equipment'
        itemType = item.Category
        iconPath = 'equipment'
        haslink = true
    } else if (id >= 1000000 && id < 2000000) {
        item = find(data.furniture, "Id", id-1000000)[0]
        type = 'Furniture'
        itemType = item.Category
        iconPath = 'furniture'
        haslink = true
    } else {
        item = find(data.items, "Id", id)[0]
        type = 'Item'
        itemType = item.Category
        iconPath = 'item'
        haslink = true
    }
    let rarityText = ''
    if (item) {
        if (type == 'Equipment' && item.Id >= 1000) {
            rarityText = `T${(item.Id%10)+1}`
        } else {
            rarityText = getRarityTier(item.Rarity)
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
                // Equipment boxes that contain lower tier variants of the same equipment piece
                desc = translateUI('item_equipment_box') + "\n"
                iconPath = 'equipment'
                let tier = '', gearType = ''

                // Count the total probability
                const totalProb = group.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)

                for (let i = 0; i < group.ItemList.length; i++) {
                    let gear = find(data.equipment, 'Id', group.ItemList[i][0]-2000000)[0]
                    
                    desc += `${getTranslatedString(gear, 'Name')} (${getProbabilityText(group.ItemList[i][1]/totalProb)})\n`
                    icon = gear.Icon
                    gearType = getLocalizedString('ItemCategory', gear.Category)

                    // Add Tiers String
                    if (tier != '') tier += '/'
                    tier += `T${(gear.Id%10)+1}`
                }
                name = translateUI('item_randombox_tier', [tier, gearType])
            } else if (group.Id >= 400000 && group.Id < 410000) {
                // Random Tiered Equipment Boxes
                
                desc = translateUI('item_equipment_box') + '\n'
                iconPath = 'item'
                icon = 'item_icon_equipment_random'
                rarity = 'N'

                const tier = (group.Id % 10) + 1

                name = translateUI('item_randombox_tier', ['T' + tier, getLocalizedString('ItemCategory', 'Equipment')])

                // Count the total probability
                const totalProb = group.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)

                for (let i = 0; i < group.ItemList.length; i++) {

                    let gear = find(data.equipment, 'Id', group.ItemList[i][0]-2000000)[0]
                    desc += `${getTranslatedString(gear, 'Name')} (${getProbabilityText(group.ItemList[i][1]/totalProb)})\n`

                    // maxTier = Math.max(item.Id % 10, maxTier)
                    // itemType = Math.floor(item.Id / 1000)             
                }

            } else if (group.Id >= 300000 && group.Id <= 300075) {
                // Equipment boxes that contain a random piece for an equipment slot (same tier)
                desc = translateUI('item_equipment_box') + "\n"
                iconPath = 'equipment'
                let tier = '', gearType = ''

                // Count the total probability
                const totalProb = group.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)

                for (let i = 0; i < group.ItemList.length; i++) {

                    let gear = find(data.equipment, 'Id', group.ItemList[i][0]-2000000)[0]
                    desc += `${getTranslatedString(gear, 'Name')} (${getProbabilityText(group.ItemList[i][1]/totalProb)})\n`
                    if (i == 0) {
                        tier = `T${(gear.Id%10)+1} `
                        icon = gear.Icon
                    }

                    // Add Gear Type String
                    if (gearType != '') gearType += '/'
                    gearType += getLocalizedString('ItemCategory', gear.Category)                
                }
                name = translateUI('item_randombox_tier', [tier, gearType])
            } else if (group.Id >= 300660 && group.Id < 370000) {
                // Random Tech Notes/BD
                desc = translateUI('item_contains_random') + "\n" + translateUI('item_is_immediateuse') + "\n"
                iconPath = 'item'
                let maxTier = 0, itemType = 0

                // Count the total probability
                const totalProb = group.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)

                for (let i = 0; i < group.ItemList.length; i++) {

                    let item = find(data.items, 'Id', group.ItemList[i][0])[0]
                    desc += `${getTranslatedString(item, 'Name')} (${getProbabilityText(group.ItemList[i][1]/totalProb)})\n`

                    maxTier = Math.max(item.Id % 10, maxTier)
                    itemType = Math.floor(item.Id / 1000)             
                }

                //get the chest items
                const boxItem = find(data.items, 'Id', itemType*10000 + maxTier)[0]
                name = boxItem.Name
                icon = boxItem.Icon
                rarity = boxItem.Rarity
                
            } else if (group.Id >= 10100 && group.Id <= 10200) {
                // Artifact Box
                const item = find(data.items, 'Id', group.ItemList[0][0])[0]
                rarity = item.Rarity
                icon = `item_icon_material_random_${item.Id.toString().slice(-1)}`
                name = translateUI('item_randombox_tier', [rarity, getLocalizedString('ItemCategory', 'Artifact')])
                desc = translateUI('item_artifact_box') + "\n"
                

                // Count the total probability
                const totalProb = group.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)

                for (let i = 0; i < group.ItemList.length; i++) {
                    let item = find(data.items, 'Id', group.ItemList[i][0])[0]
                    desc += `${getTranslatedString(item, 'Name')} (${getProbabilityText(group.ItemList[i][1]/totalProb)})\n`
                }
            }
            if (itemType == 'Box' || item.ImmediateUse) {
                desc += `<i><i class="fa-solid fa-box-open" style="font-size: 12px;"></i> ${translateUI('item_is_immediateuse')}</i>`
            }
            html = `<div class="item-drop drop-shadow" style="position: relative; data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/${iconPath}/icon/${icon}.webp`, name, getLocalizedString('ItemCategory','Box'), '', desc, 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${rarity.toLowerCase()}" src="images/${iconPath}/icon/${icon}.webp" alt="${name}"><span class="ba-material-label">${itemType == 'Box' || item.ImmediateUse ? '<i class="fa-solid fa-box-open" style="font-size: 12px;"></i> ' : ''}${getProbabilityText(chance)}</span>${dropType != null ?  `<span class="label-droptype">${dropType}</span>` : ''}</div>`
        }
    } else {
        let description = getTranslatedString(item, 'Desc').escapeHtml().replace('&','&amp;')
        if (item.ImmediateUse) {
            description += `\n<i><i class="fa-solid fa-box-open" style="font-size: 12px;"></i> ${translateUI('item_is_immediateuse')}</i>`
        }
        if (item.Id > 91000000 && item.ConsumeType == "Random") {
            const containsArray = getServerProperty(item, 'Contains')
            containsArray.forEach(containedItem => {
                const item = find(data.items, 'Id', containedItem[0])[0]
                description += `\n${getTranslatedString(item, 'Name')} (${getProbabilityText(containedItem[1])})`
            })
        }
        if (appendDescription) description += appendDescription
        html = `<div class="item-drop drop-shadow" style="position: relative; ${haslink ? 'cursor:pointer;" onclick="loadItem('+id+')"' : '"'} title="${getRichTooltip(`images/${iconPath}/icon/${item.Icon}.webp`, getTranslatedString(item, 'Name').escapeHtml(), getLocalizedString('ItemCategory',itemType), rarityText, description, 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()}" src="images/${iconPath}/icon/${item.Icon}.webp" alt="${item.Name}"><span class="ba-material-label" ${haslink ? 'style="cursor:pointer;"' : ""}>${itemType == 'Box' || item.ImmediateUse ? '<i class="fa-solid fa-box-open" style="font-size: 12px;"></i> ' : ''}${qtyMax > 1 || forcePercent ? parseFloat((chance*100).toFixed(2)) + '&#37;' : getProbabilityText(chance)}</span>${qtyMax > 1 ? `<span class="label-qty">&times;${qtyMin != qtyMax ? abbreviateNumber(qtyMin) + '~' + abbreviateNumber(qtyMax) : abbreviateNumber(qtyMax)}</span>` : ''}${dropType != null ?  `<span class="label-droptype">${dropType}</span>` : ''}</div>`
    }
    return html
}

/**
 * Formats a string with placeholders {n} using replacements. If n is out of bounds it will be replaced with an empty string
 * @param {string} string
 * @param  {string[]} replacements 
 * @returns
 */
function formatString(string, replacements=[]) {
    return string.replace(/\{([0-9]+)\}/g, (match, p1) => (p1 < replacements.length) ? replacements[p1] : '')
}

/**
 * Converts a probability to a string representing its percentage chance when < 1.00, or the quantity when >= 1.00
 * @param {*} chance 
 * @returns 
 */
function getProbabilityText(chance) {
    return chance >= 1 ? '&times;'+abbreviateNumber(parseInt(chance).toFixed(0)).toLocaleString(): parseFloat((chance*100).toFixed(1)) + '&#37;'
}

function getStudentIconSmall(student, label=null, description=null) {
    var html = `<div class="ba-item-student drop-shadow d-inline-block" style="position: relative; cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" onclick="loadStudent('${student.PathName}')" title="${getRichTooltip(`images/student/icon/${student.Id}.webp`, getTranslatedString(student, 'Name'), translateUI('student'), getRarityStars(student.StarGrade), description == null ? getTranslatedString(student, 'ProfileIntroduction').split('\n')[0].escapeHtml().replace('&','&amp;') : description, 50, 'circle')}"><img src="images/student/icon/${student.Id}.webp" alt="${student.Name}">${label != null ? `<span class="bonus-label" style="cursor:pointer;">${label}</span>` : ''}</div>`
    return html
}

function getFavourIconHTML(gift, grade) {
    return `<div class="ba-favor-item drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${gift.Id})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/item/icon/${gift.Icon}.webp`, getTranslatedString(gift, 'Name').escapeHtml(), getLocalizedString('ItemCategory', gift.Category), getRarityTier(gift.Rarity), getTranslatedString(gift, 'Desc').escapeHtml().replace('&','&amp;'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${gift.Rarity.toLowerCase()}" src="images/item/icon/${gift.Icon}.webp" alt="${gift.Name}"><img class="ba-favor-label" src="images/ui/Cafe_Interaction_Gift_0${grade+1}.png"></div>`
}

function getFurnitureIconHTML(item) {
    var html = `<div class="ba-favor-item drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${item.Id+1000000})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/furniture/icon/${item.Icon}.webp`, getTranslatedString(item,'Name').escapeHtml(), getLocalizedString('ItemCategory', item.Category), getRarityStars(item.Rarity), getTranslatedString(item, 'Desc').escapeHtml().replace('&','&amp;'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()} mb-2" src="images/furniture/icon/${item.Icon}.webp" alt="${item.Name}"></div>`
    return html
}

function recalculateWeaponSkillPreview() {
    let skillLevel = $("#ba-weapon-skillpreview-range").val()
    let skill = find(student.Skills, 'SkillType', 'weaponpassive')[0]

    $('#ba-skill-weaponpassive-description').html(getSkillText(skill, skillLevel, {bulletType: student.BulletType}))
    $(`#ba-skill-weaponpassive-description .skill-hitinfo`).tooltip({html: true})
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function recalculateGearSkillPreview() {
    if (!("Released" in student.Gear)) return
    let skillLevel = $("#ba-gear-skillpreview-range").val()
    let skill = find(student.Skills, 'SkillType', 'gearnormal')[0]

    $('#ba-skill-gearnormal-description').html(getSkillText(skill, skillLevel, {bulletType: student.BulletType}))
    $(`#ba-skill-gearnormal-description .skill-hitinfo`).tooltip({html: true})
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function recalculateBondPreview() {
    var level = $("#ba-bond-levelrange").val()
    var bondbonus = getBondStats(student, level)
    $(`#ba-bond-stat-table .stat-${student.FavorStatType[0]} .stat-value`).text('+'+bondbonus[student.FavorStatType[0]].toLocaleString())
    $(`#ba-bond-stat-table .stat-${student.FavorStatType[1]} .stat-value`).text('+'+bondbonus[student.FavorStatType[1]].toLocaleString())    
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

    let weaponstars_prev = statPreviewWeaponGrade

    statPreviewStarGrade = stars
    statPreviewWeaponGrade = weaponstars

    for (let i = 1; i <= 5; i++) {
        $(`.statpreview-star-${i}`).toggleClass("active", i <= stars)
    }

    for (let i = 1; i <= 3; i++) {
        $(`.weaponpreview-star-${i}`).toggleClass("active", i <= weaponstars)
    }

    const bondLevel = parseInt($('#ba-statpreview-bond-0-range').val())
    if (bondLevel > maxbond[stars-1]) {
        $('#ba-statpreview-bond-0-range').val(maxbond[stars-1])
        changeStatPreviewBondLevel(0, false)
    }
    $('#ba-statpreview-bond-0-range').attr("max", Math.min(maxbond[stars-1], region.BondMaxLevel))

    if (weaponstars > 0) {
        $('#ba-statpreview-weapon').toggleClass('disabled', false)
        $('.statpreview-weapon-range').prop('disabled', false)
        let level = 20 + (weaponstars*10)
        $('.statpreview-weapon-range').attr("max", level)
        if (recalculate) $('.statpreview-weapon-range').val(level)
        updateWeaponLevelStatPreview(level)
    } else {
        $('#ba-statpreview-weapon').toggleClass('disabled', true)
        $('.statpreview-weapon-range').prop('disabled', true)
    }
    $('#ba-student-weapon-level').toggle((statPreviewWeaponGrade > 0))

    if ((weaponstars == 3 && weaponstars_prev < 3) || (weaponstars_prev == 3 && weaponstars < 3)) {
        recalculateTerrainAffinity()
    }

    if ((weaponstars >= 2 && weaponstars_prev < 2) || (weaponstars_prev >= 2 && weaponstars < 2)) {
        updatePassiveSkillStatPreview()
    }

    if (recalculate) recalculateStats()
}

function updatePassiveSkillStatPreview() {
    //update passive skill info in preview
    const skillLevel = $('#ba-statpreview-passiveskill-range').val()
    const passivePlus = (statPreviewWeaponGrade >= 2)

    let desc = ""

    const passiveSkill = find(student.Skills, 'SkillType', 'passive')[0]
    passiveSkill.Effects.forEach(eff => {
        const value = eff.Stat.includes('_Coefficient') ? eff.Scale[skillLevel-1] / 10000 : eff.Scale[skillLevel-1]
        if (value > 0) desc += `${getStatName(eff.Stat)} <b>+${getFormattedStatAmount(value)}</b>, `
        if (value < 0) desc += `${getStatName(eff.Stat)} <b>${getFormattedStatAmount(value)}</b>, `
    })

    if (passivePlus) {
        const weaponPassiveSkill = find(student.Skills, 'SkillType', 'weaponpassive')[0]
        weaponPassiveSkill.Effects.forEach(eff => {
            const value = eff.Stat.includes('_Coefficient') ? eff.Scale[skillLevel-1] / 10000 : eff.Scale[skillLevel-1]
            if (value > 0) desc += `${getStatName(eff.Stat)} <b>+${getFormattedStatAmount(value)}</b>, `
            if (value < 0) desc += `${getStatName(eff.Stat)} <b>${getFormattedStatAmount(value)}</b>, `
        })
        $('#ba-statpreview-passiveskill-name').html(getTranslatedString(weaponPassiveSkill, 'Name'))  
        $('#ba-statpreview-passiveskill-icon img, #ba-statpreview-status-passive-icon').attr("src", `images/skill/${weaponPassiveSkill.Icon}.webp`)
    } else {
        $('#ba-statpreview-passiveskill-name').html(getTranslatedString(passiveSkill, 'Name'))
        $('#ba-statpreview-passiveskill-icon img, #ba-statpreview-status-passive-icon').attr("src", `images/skill/${passiveSkill.Icon}.webp`)
    }

    $('#ba-statpreview-passiveskill-desc').html(desc.substring(0, desc.length-2))
    $('.statpreview-passive').toggleClass('plus', passivePlus)
    
    $('#ba-statpreview-status-passive-level .label').html(skillLevel < 10 ? `Lv.${skillLevel}` : `<img src="images/ui/ImageFont_Max.png" style="height:16px;">`)
}

function updateSummonSourceSkill() {
    if (statPreviewSelectedChar > 0) {
        $('#ba-statpreview-summon').show()
        //update ex skill info in preview
        const summon = student.Summons[statPreviewSelectedChar-1]
        const sourceSkill = find(student.Skills, 'SkillType', summon.SourceSkill)[0]
        const levelMax = summon.SourceSkill == 'ex' ? 5 : 10
        $('#ba-statpreview-summon-range').attr('max', levelMax)
        const level = $('#ba-statpreview-summon-range').val()

        if (level == levelMax) {
            $('#ba-statpreview-summon-level').html(`<img src="images/ui/ImageFont_Max.png">`)
        } else {
            $('#ba-statpreview-summon-level').html("Lv." + level)
        }
       
        $('#ba-statpreview-summon-name').html(getTranslatedString(sourceSkill, 'Name'))
        $('#ba-statpreview-summon-desc').empty()
        $('#ba-statpreview-summon-icon img').attr("src", `images/skill/${sourceSkill.Icon}.webp`)

        for (let i = 0; i < summon.InheritCasterStat.length; i++) {
            $('#ba-statpreview-summon-desc').append((i == 0 ? "": "\n") + translateUI('summon_inheritance',[`<b>${parseFloat((summon.InheritCasterAmount[i][level-1]/100).toPrecision(3))}%</b>`, getTranslatedString(student, "Name"), getStatName(summon.InheritCasterStat[i])]))
        }
        
    } else {
        $('#ba-statpreview-summon').hide()
    }

}

function populateItemList(tab) {
    let itemsHtml = ""
    let itemCardGenerator
    let placeholderGenerator = function(id) {
        return `<div id="item-select-${id}" data-itemid="${id}" class="selection-grid-card ${gridItemDisplayStyle == 'compact' ? 'compact' : ''} card-items" style="display:none;"></div>`
    }
    switch (gridItemDisplayStyle) {
        case 'detailed':
            itemCardGenerator = getItemGridCardDetailedInnerHTML
            break;
        case 'compact':
            itemCardGenerator = getItemGridCardCompactInnerHTML
            break;
    }

    const itemOffset = getItemIdOffset(tab)
    data[tab].forEach((item) => {
        if (item.IsReleased[regionID]) {
            itemsHtml += placeholderGenerator(item.Id+itemOffset)
        }
    })

    const currentTime = new Date().getTime() / 1000

    itemsHtml += `<div id="item-select-noresult" class="p-2 grid-text">${translateUI('no_results')}</div>`
    $('#item-search-filters-panel .item-filter-group').hide()
    $(`#item-search-filters-panel .item-filter-group.show-${tab}`).show()

    $('#item-search-filters-panel [class*="only-"]').hide()
    $(`#item-search-filters-panel .only-${tab}`).show()

    loadedItemList = tab

    $(`#item-select-grid`).html(itemsHtml)

    updateItemList(true)

    // Scroll the selected item into view automatically
    if (loadedItemType == tab) {
        $(`#item-select-${loadedItem.Id+getItemIdOffset(tab)}`).addClass('selected')
        let offset = $(`#item-select-${loadedItem.Id+getItemIdOffset(tab)}`).prop('offsetTop') - 100
        $('#ba-item-list-container .card-body').scrollTop((offset === undefined) ? 0 : offset)
    }

    // Lazy load the content of each grid item for performance
    if (loadObserver) loadObserver.disconnect()
    loadObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.innerHTML = itemCardGenerator(parseInt(entry.target.id.replace('item-select-','')))
                if (gridItemDisplayStyle == 'compact') {
                    $(entry.target).children('.card-compact').tooltip({html: true, placement: 'top', delay: { show: 200, hide: 0 }, container: $('.card-body')})
                }
                loadObserver.unobserve(entry.target)
            }
        })
    }, {
        root: $('#ba-item-list-container .card-body')[0]
    })
    $('#item-select-grid div[data-itemid]').each(function(i,el){
        loadObserver.observe(el)
    })

    function getItemGridCardDetailedInnerHTML(linkid) {
        const item = find(data[loadedItemList], 'Id', linkid >= 20000000 ? linkid : linkid % 1000000)[0]
        const iconPath = loadedItemList == 'items' ? 'item' : loadedItemList
        const name = getTranslatedString(item, "Name")
        const smallTextThreshold = getSmallTextThreshold(name, label_craft_smalltext_threshold)
        
        let html = `<div class="card-img ba-item-${item.Rarity.toLowerCase()}"><img loading="lazy" src="images/${iconPath}/icon/${item.Icon}.webp"></div>`
        if (loadedItemList == 'furniture' && item.Interaction[regionID]) {
            html += '<div class="card-badge furniture-interaction"><img src="images/ui/Cafe_Icon_Interaction.png"></div>'
        }
        if (loadedItemList == 'equipment' && item.Id >= 1000) {
            html += `<div class="card-badge equipment-tier">T${item.Tier}</div>`
        }
        if (loadedItemList == 'items') {
            if (item.ExpiryTime && item.ExpiryTime[regionID]) {
                html += `<div class="card-badge equipment-tier"><i class="fa-solid fa-clock me-1"></i>${item.ExpiryTime[regionID] > currentTime ? durationStringShort(item.ExpiryTime[regionID] - currentTime) : '<i class="fa-solid fa-xmark"></i>'}</div>`
            }

            if (item.ImmediateUse) {
                html += `<div class="card-badge equipment-tier"><i class="fa-solid fa-box-open"></i></div>`
            }
        }
        html += `<div class="card-label"><span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span></div>`
        return html
    }
    
    function getItemGridCardCompactInnerHTML(linkid) {
        const item = find(data[loadedItemList], 'Id', linkid >= 20000000 ? linkid : linkid % 1000000)[0]
        const iconPath = loadedItemList == 'items' ? 'item' : loadedItemList
        const name = getTranslatedString(item, "Name").escapeHtml().replace(/"/g, '&quot;')
        return `<div class="card-compact ba-item-${item.Rarity.toLowerCase()}" title="${getBasicTooltip(name)}"><img loading="lazy" src="images/${iconPath}/icon/${item.Icon}.webp"></div>`
    }
}

function getItemIdOffset(type) {
    switch (type.toLowerCase()) {
        case 'furniture':
            return 1000000
        case 'equipment':
            return 2000000
        case 'currency':
            return 3000000
        default:
            return 0
    }
}

function populateCraftList() {
    html = ["", "", ""]
    html[0] = ""
    html[1] = ""
    html[2] = ""
    html_h1= `<div id="craft-list-grid-header-1" class="w-100 ba-grid-header mb-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',"1")}</h3></div>`
    html_h2 = `<div id="craft-list-grid-header-2" class="w-100 ba-grid-header my-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',"2")}</h3></div>`
    html_h3 = `<div id="craft-list-grid-header-3" class="w-100 ba-grid-header my-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',"3")}</h3></div>`
    data.crafting.Nodes.sort((a,b) => a.Quality - b.Quality)
    data.crafting.Nodes.sort((a,b) => b.Icon.localeCompare(a.Icon))

    const searchTerm = $('#craft-search-text').val()

    $.each(data.crafting.Nodes, function(i,el) {
        if (el.Weight > 0 && (searchTerm == '' || getTranslatedString(el, "Name").toLowerCase().includes(searchTerm.toLowerCase())))
        html[el.Tier-1] += getCraftingCardHTML(el, el.Weight / data.crafting.TotalWeight[el.Tier-1], showNodeProbability)
    })

    $('#craft-select-grid').empty()
    for (let i = 0; i < 3; i++) {
        if (html[i] != "") {
            $('#craft-select-grid').append(`<div id="craft-list-grid-header-${i+1}" class="w-100 ba-grid-header mb-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',i+1)}</h3></div>${html[i]}`)
        }
    }
    if ($('#craft-select-grid').children().length == 0) {
        $('#craft-select-grid').append(`<div id="craft-select-noresult" class="p-2 grid-text">${translateUI('no_results')}</div>`)
    }


    html = ''
    data.crafting.Fusion.forEach(recipe => {
        const itemList = recipe.ResultId >= 1000000 ? 'furniture' : 'items'
        const item = find(data[itemList], 'Id', recipe.ResultId % 1000000)[0]

        if (item.IsReleased[regionID]) {
            html += getFusionRecipeCardHTML(recipe)
        }
    })
    if (html != "") {
        $('#fusion-select-grid').html(html)
    } else {
        $('#fusion-select-grid').html(`<div id="fusion-select-noresult" class="p-2 grid-text">${translateUI('no_results')}</div>`)
    }
    

    $('#craft-select-'+loadedCraftId).addClass('selected')
    let offset = $(`#craft-select-${loadedCraftId}`).prop('offsetTop') - 100
    $('#ba-craft-list-container .card-body').scrollTop((offset === undefined) ? 0 : offset)
}

function getCraftingCardHTML(node, chance = -1, chanceVisible = false, qtyMin = 0, qtyMax = 0) {
    let name = getTranslatedString(node, "Name")
    let smallTextThreshold = label_craft_smalltext_threshold[userLang]
    let html = `<div id="craft-select-${node.Id}" class="selection-grid-card card-craft" onclick="loadCraft(${node.Id})"><div class="card-img ba-node-quality-${node.Quality}"><img loading="lazy" src="images/ui/${node.Icon}.png"></div>`
    if (chance >= 0) {
        html += `<span class="card-badge stage-droprate ${chanceVisible ? "" : "hidden"}">${getProbabilityText(chance) + (qtyMax > 1 ? ` (${qtyMin}${qtyMax > qtyMin ? `~${qtyMax}`:""})` : "")}</span>`
    }
    html += `<div class="card-label">`
    html += `<span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span>`
    html += `</div></div>`
    return html
}

function getFusionRecipeCardHTML(recipe) {
    const itemList = recipe.ResultId >= 1000000 ? 'furniture' : 'items'
    const item = find(data[itemList], 'Id', recipe.ResultId % 1000000)[0]
    const iconPath = itemList == 'items' ? 'item' : itemList
    const name = getTranslatedString(item, "Name")
    const smallTextThreshold = getSmallTextThreshold(name, label_craft_smalltext_threshold)

    return `<div id="craft-select-${recipe.Id+100000}" data-itemid="${recipe.Id+100000}" class="selection-grid-card card-items"><div class="card-img ba-item-${item.Rarity.toLowerCase()}"><img loading="lazy" src="images/${iconPath}/icon/${item.Icon}.webp"></div><div class="card-label"><span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span></div></div>`

}

function getSmallTextThreshold(text, thresholdArray) {
    // Check if the name is untranslated and we need to use the full-width threshold
    if ((userLang == 'En' || userLang == 'Th') && (text.codePointAt(0) >= 0x3000 && text.codePointAt(0) <= 0x9FFF)) {
        return thresholdArray['Jp']
    } else {
        return thresholdArray[userLang]
    }
}

function populateStageList(mode) {
    
    let html = '', typePrev = ''
    switch (mode) {
        case 'missions':
            $.each(data.stages.Campaign, function(i,el) {
                if (el.Area > region.CampaignMax) return
                if (!region.CampaignExtra && el.Stage == "A") return
                html += getStageCardHTML(el)
            })
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#ba-stages-list-tab-missions').tab('show')
            $('#stage-select-grid').html(html)
            break
        case 'bounty':
            $.each(data.stages.WeekDungeon, function(i,el) {
                if (el.Id < 31000) {
                    if (el.Type != typePrev) {
                        let header = `<div id="stages-list-grid-header-${el.Type}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType',''+el.Type)}</h3></div>`
                        html += header
                    }
                    if (el.Stage <= region.ChaserMax) html += getStageCardHTML(el)
                    typePrev = el.Type
                }
            })
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#ba-stages-list-tab-bounty').tab('show')
            $('#stage-select-grid').html(html)
            break
        case 'commissions':
            typePrev = ''
            $.each(data.stages.WeekDungeon, function(i,el) {
                if (el.Id >= 31000) {
                    if (el.Type != typePrev) {
                        let header = `<div id="stages-list-grid-header-${el.Type}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType',''+el.Type)}</h3></div>`
                        html += header
                    }
                    if (el.Stage <= (el.Id >= 32000 ? region.BloodMax : region.FindGiftMax)) html += getStageCardHTML(el)
                    typePrev = el.Type
                }
            })
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#ba-stages-list-tab-commissions').tab('show')
            $('#stage-select-grid').html(html)
            break
        case 'schooldungeon':
            typePrev = ''
            $.each(data.stages.SchoolDungeon, function(i,el) {
                if (el.Type != typePrev) {
                    html += `<div id="stages-list-grid-header-${el.Type}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType',''+el.Type)}</h3></div>`
                }
                if (el.Stage <= region.SchoolDungeonMax) html += getStageCardHTML(el)
                typePrev = el.Type
            })
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#ba-stages-list-tab-schooldungeon').tab('show')
            $('#stage-select-grid').html(html)
            break
        case 'events':
            region.Events.forEach(val => {
                if (val < 10000) html += getEventCardHTML(val)
            })
            $('.stage-list').hide()
            $('#event-list').show()
            $('#ba-stages-list-tab-events').tab('show')
            $('#event-select-grid').html(html)
    }
    loadedStageList = mode
    $('#stage-select-'+loadedStage.Id).addClass('selected')
    //scroll the loaded stage into view in the stage list (excl. events)
    if (loadedStage.Id < 7000000) {
        let offset = $(`#stage-select-${loadedStage.Id}`).prop('offsetTop') - 100
        $('#ba-stages-list-container .card-body').scrollTop((offset === undefined) ? 0 : offset)
    }
}

function populateEventStageList(eventId) {

    if (loadedModule == 'stages') {
        eventId = eventId % 10000
        let diffPrev = 0
        let areaPrev = 0
        let eventPrev = 0

        const logoLang = getEventlogoLang(eventId)

        let html = `<div class="ba-grid-header ba-panel p-2 eventlist-header" style="grid-column: 1/-1;order: 0;"><button id="stages-eventlist-back" type="button" class="btn btn-dark me-2" style="min-width:fit-content;" onclick="populateStageList('events')"><i class="fa-solid fa-chevron-left"></i><span class="d-inline ms-2">${getLocalizedString('StageType', 'Event')}</span></button><img class="mx-auto mx-lg-1" src="images/eventlogo/${eventId}_${logoLang}.webp"><h4 class="flex-fill text-center px-1 mb-0">${getLocalizedString('EventName',''+eventId)}</h4></div></div>`
    
        if (conquest_events.includes(eventId)) {
            $('.stage-list').hide()
            $('#conquest-list').show()
    
            let conquestMap = find(data.stages.ConquestMap, "EventId", eventId)[0]
            loadedConquest = conquestMap
            $('#ba-conquest-header').html(html)
            $('#ba-conquest-step-n0').tab('show')
            for (let i = 0; i < 4; i++) {
                $(`#ba-conquest-step-n${i}`).text(translateUI('conquest_area',[i+1]))
            }
            changeConquestMap(0, 0)
            
        } else {

            let eventStages = find(data.stages.Event, 'EventId', eventId)
            eventStages.forEach(stage => {
                if (!stage.Versions.includes("Original") && !region.Events.includes(eventId + 10000)) return
                if (!(eventId == 701 && (stage.Stage > region.Event701Max[stage.Difficulty]))) {

                    if (stage.Field) {
                        if (stage.Area != areaPrev) {
                            html += `<div class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType', 'Field', [stage.Area])}</h3></div>`
                        }
                        html += getStageCardHTML(stage)
                        areaPrev = stage.Area  
                    } else {
                        if (stage.Difficulty != diffPrev || stage.EventId != eventPrev) {
                            let name

                            switch (stage.Difficulty) {
                                case 0:
                                    name = getLocalizedString('StageType', 'Story')
                                    break;
                                case 1:
                                    name = getLocalizedString('StageType', 'Quest')
                                    break;
                                case 2:
                                    name = getLocalizedString('StageType', 'Challenge')
                                    break;
                            }
                            let header = `<div class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${name}</h3></div>`
                            html += header
                        }
                        html += getStageCardHTML(stage)
                        diffPrev = stage.Difficulty
                        eventPrev = stage.EventId                        
                    }


                }
            })

            $('.stage-list').hide()
            $('#stage-list').show()
            $('#stage-select-grid').html(html)
            $('#stage-select-'+loadedStage.Id).addClass('selected')
        }

        loadedStageList = '' + eventId
        $('#ba-stages-list-tab-events').tab('show')
        $('#ba-stages-list-container .card-body').scrollTop(0)
    } else {
        if (conquest_events.includes(eventId)) {
            //need a better way of defining a default here for conquest tiles
            loadModule('stages', find(data.stages.Conquest, 'EventId', eventId % 10000)[0].Id)
        } else {
            if (eventId > 10000) loadedStageVersion = "Rerun"
            loadModule('stages', find(data.stages.Event, 'EventId', eventId % 10000)[0].Id)
        }
    }
}

function populateRaidList() {
    var html = ''

    var html
    html = ''
    $.each(data.raids.Raid, function(i,el) {
        if (el.IsReleased[regionID])
        html += getRaidCardHTML(el)
    })
    $('#raid-select-grid').html(html)

    html = ''
    $.each(data.raids.TimeAttack, function(i,el) {
        if (el.IsReleased[regionID])
        html += getTimeAttackCardHTML(el)
    })
    $('#timeattack-select-grid').html(html)

    $('#worldraid-select-grid').empty()

    html = ''
    $.each(data.raids.WorldRaid, function(i,el) {
        if (el.IsReleased[regionID])
        html += getRaidCardHTML(el, null, el.IconBG)
    })
    if (html != '') html = `<div class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType', 'WorldRaid')}</h3></div>` + html
    $('#worldraid-select-grid').append(html)

    html = ''
    $.each(data.raids.MultiFloorRaid, function(i,el) {
        if (el.IsReleased[regionID])
        html += getRaidCardHTML(el, null, el.IconBG)
    })
    if (html != '') html = `<div class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType', 'MultiFloorRaid')}</h3></div>` + html
    $('#worldraid-select-grid').append(html)

}

function getUsedByStudents(item, mode) {
    let html = '', headerText = translateUI('item_usedby'), bondGearStudentsHtml = ''
    if (mode == 'equipment') {
        $.each(data.students, function(i,el){
            if (!el.IsReleased[regionID]) return
            if (el.Equipment[0] == item.Category || el.Equipment[1] == item.Category || el.Equipment[2] == item.Category)
            html += getStudentIconSmall(el)
        })
    } else if (mode == 'furniture') {
        
        headerText = `<img class="inline-img" src="images/ui/Cafe_Icon_Interaction.png"> ${translateUI('furniture_interaction_list')}`
        interactiveStudents = []
        $.each(data.students, function(i,el){
            if (!el.IsReleased[regionID])
            return

            for (let i = 0; i < el.FurnitureInteraction[regionID].length; i++) {
                if (item.Id == el.FurnitureInteraction[regionID][i][0]) {
                    interactiveStudents.push([el, el.FurnitureInteraction[regionID][i][1]])
                    return
                }
            }
        })

        interactiveStudents.forEach(interaction => {
            if (interactiveStudents.length == 1) {
                html += getStudentIconSmall(interaction[0])
            } else {
                if (interaction[1] == 1 || (interaction[1] == 0 && interactiveStudents.some(i => i[1] == 2))) {
                    html += getStudentIconSmall(interaction[0], '<i class="fa-solid fa-user"></i><span class="mx-1">/</span><i class="fa-solid fa-users"></i>')
                } else if (interaction[1] == 0) {
                    html += getStudentIconSmall(interaction[0], '<i class="fa-solid fa-users"></i>')
                } else if (interaction[1] == 2) {
                    html += getStudentIconSmall(interaction[0], '<i class="fa-solid fa-users"></i>')
                } else if (interaction[1] == 3) {
                    html += getStudentIconSmall(interaction[0], '<i class="fa-solid fa-user"></i>')
                }

            }
        })

    } else if (mode == 'items') {
        if (item.Category == 'Material') {
            headerText = translateUI('item_usedby_skill')
            $.each(data.students, function(i,el) {
                if (!el.IsReleased[regionID])
                return
                let amount = [0, 0]
                for (let i = 0; i < el.SkillExMaterial.length; i++) {
                    for (let j = 0; j < el.SkillExMaterial[i].length; j++) {
                        if (item.Id == el.SkillExMaterial[i][j]) {
                            amount[0] += el.SkillExMaterialAmount[i][j]
                        }
                    }
                }
                for (let i = 0; i < el.SkillMaterial.length; i++) {
                    for (let j = 0; j < el.SkillMaterial[i].length; j++) {
                        if (item.Id == el.SkillMaterial[i][j]) {
                            amount[1] += el.SkillMaterialAmount[i][j]
                        }
                    }
                }
                if (amount[0] > 0 || amount[1] > 0) {
                    const totalUsed = amount[0] + amount[1]*3
                    html += getStudentIconSmall(el, `&times;${totalUsed}`,`${translateUI('item_usedby_exskill_amount', [amount[0]])}\n${translateUI('item_usedby_skill_amount', [amount[1]])}`)
                }

                if ("Released" in el.Gear && el.Gear.Released[regionID]) {
                    for (let i = 0; i < el.Gear.TierUpMaterial.length; i++) {
                        for (let j = 0; j < el.Gear.TierUpMaterial[i].length; j++) {
                            if (item.Id == el.Gear.TierUpMaterial[i][j]) {
                                bondGearStudentsHtml += getStudentIconSmall(el, `&times;${el.Gear.TierUpMaterialAmount[i][j]}`)
                            }
                        }
                    }
                }
            })
        } else if (item.Category == 'SecretStone') {
            headerText = translateUI('item_usedby_eleph')
            let chara = find(data.students, 'Id', item.Id)[0]
            html += getStudentIconSmall(chara)
        } else if (item.Category == 'Coin' && item.EventBonus !== undefined) {
            headerText = translateUI('item_eventbonus')
            getServerProperty(item, 'EventBonus').forEach(bonus => {
                const bonusStudents = find(data.students, 'Id', bonus[0])
                if (bonusStudents.length) {
                    html += getStudentIconSmall(bonusStudents[0], `+${bonus[1]/100}%`)
                }
            })
        }
    }
    if (html != '') {
        $('#ba-item-usage').show()
        html = `<div class="mb-2"><i>${headerText}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">` + html + '</div>'
        if (bondGearStudentsHtml != "") {
            html += `<div class="my-2"><i>${translateUI('item_usedby_gear')}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap mb-2">${bondGearStudentsHtml}</div>`
        }
        return html
    } else {
        return ''
    }
    
}

function getConsumableRewards(item) {
    let html = '', headerText = ''
    const containsArray = getServerProperty(item, 'Contains')

    switch (item.ConsumeType) {
        case "Random":
            headerText = translateUI('item_contains_random')
            containsArray.forEach(containedItem => {html += getDropIconHTML(containedItem[0], containedItem[1], containedItem[2], containedItem[3])})
            break;
        case "Choice":
            headerText = translateUI('item_contains_choice')
            containsArray.forEach(containedItem => {html += getDropIconHTML(containedItem[0], containedItem[1], containedItem[2], containedItem[3])})
            break;
        case "All":
            headerText = translateUI('item_contains')
            containsArray.forEach(containedItem => {html += getDropIconHTML(containedItem[0], containedItem[2])})
            break;
    }

    if (html != '') {
        $('#ba-item-usage').show()
        html = `<div class="mb-2"><i>${headerText}</i></div><div class="item-icon-list">` + html + '</div>'
        return html
    } else {
        return ''
    }
}

function getEquipmentRecipe(item) {
    let html = '', headerText = translateUI('craft_using')
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
    let favorStudents = ["", "", ""]
    let bondGearStudentsHtml = ""
    const genericTags = data.config.CommonFavorItemTags
    const genericTagCount = item.Tags.filter(x => genericTags.includes(x)).length
    
    data.students.forEach((student) => {

        if (!student.IsReleased[regionID])
        return

        const allTags = [...student.FavorItemTags, ...student.FavorItemUniqueTags, ...genericTags]

        const commonTags = item.Tags.filter(x => allTags.includes(x))
        const favorGrade = Math.min(commonTags.length, 3)
        
        if (favorGrade > 0) {
            favorStudents[favorGrade-1] += getStudentIconSmall(student)
        }

        if ("Released" in student.Gear && student.Gear.Released[regionID]) {
            student.Gear.TierUpMaterial.forEach(x => {
                if (x.includes(item.Id)) {
                    bondGearStudentsHtml += getStudentIconSmall(student)
                }
            })
        }
        
    })

    let likedStudentsHtml =  ""
    for (let matchingTags = favorStudents.length; matchingTags > 0; matchingTags--) {
        if (matchingTags - genericTagCount == 0)
            continue
        if (favorStudents[matchingTags-1] != "") {
            likedStudentsHtml += `<div class="mb-2"><i>${translateUI('item_student_favor', [item.ExpValue*(matchingTags + 1), `<img class="inline-img" src="images/ui/Cafe_Interaction_Gift_0${1 + matchingTags}.png">`])}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap mb-2">${favorStudents[matchingTags-1]}</div>`
        }
    }
    
    likedStudentsHtml += `<div class="mb-2"><i>${translateUI(likedStudentsHtml ==  "" ? 'item_student_favor_all' : 'item_student_favor_default', [item.ExpValue*(genericTagCount + 1), `<img class="inline-img" src="images/ui/Cafe_Interaction_Gift_0${1 + genericTagCount}.png">`])}</i></div>`

    if (bondGearStudentsHtml != "") {
        likedStudentsHtml += `<div class="mb-2"><i>${translateUI('item_usedby_gear')}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap mb-2">${bondGearStudentsHtml}</div>`
    }

    $('#ba-item-usage').show()
    return likedStudentsHtml
}

function getItemDropStages(itemID, includeEvents = false) {
    let html = '', stages = []
    let stageList = [data.stages.Campaign, data.stages.SchoolDungeon, data.stages.WeekDungeon]
    if (includeEvents) stageList.push(data.stages.Event)
    $.each(stageList, function(i, stageType) {
        stageType.forEach(dropStage => {
            if (!stageIsReleased(dropStage)) return
            let drop = false, dropChance = 0, isItemBox = false, dropCertainCount = 0, rewardList = []

            if (dropStage.Versions) {
                for (const version of dropStage.Versions) {
                    let stageRewards = getVersionProperty(dropStage, 'Rewards', version)
                    rewardList.push(...((region.Name in stageRewards) ? stageRewards[region.Name] : stageRewards.Jp).Default)
                }
            } else {
                rewardList.push(...((region.Name in dropStage.Rewards) ? dropStage.Rewards[region.Name] : dropStage.Rewards.Jp).Default)
            }


            for (let i = 0; i < rewardList.length; i++) {

                if (rewardList[i][0] >= 4000000 && rewardList[i][0] < 5000000) {
                    // Reward is an Item Box
                    const box = find(data.groups, "Id", rewardList[i][0] - 4000000)[0]

                    // Count the total probability
                    const totalProb = box.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)
                    box.ItemList.forEach(boxItem => {
                        if (itemID == boxItem[0]) {
                            drop = true
                            isItemBox = true
                            if (rewardList[i][1] >= 1) {
                                dropCertainCount = rewardList[i][1]
                                dropCertainChance = (boxItem[1]/totalProb)
                            } else {
                                dropChance = rewardList[i][1] * (boxItem[1]/totalProb)
                            }
                        }
                    })

                } else if (itemID == rewardList[i][0]) {
                    drop = true
                    dropChance = rewardList[i][1]
                    break
                }
            }

            if (drop) {
                // Calculate the probability of receiving at least one drop
                if (isItemBox && dropCertainCount > 0) {
                    // Chance of drop from certain boxes
                    let dropChanceA = 1-Math.pow(1-dropCertainChance, dropCertainCount)
                    // Chance of drop from uncertain box
                    let dropChanceB = dropChance
                    // Chance to get at least one drop
                    dropChance = (dropChanceA + dropChanceB - (dropChanceA*dropChanceB))
                }
                stages.push({'chance': dropChance, 'stage': dropStage, 'box': isItemBox})
            }
        })
    })
    stages = stages.sort((a,b) => b.chance - a.chance)
    $.each(stages, function(i,el){
        html += getStageCardHTML(el.stage, el.chance, false)
    })
    if (html != '') {
        $('#ba-item-sources').show()
        return `<div class="mb-2"><i>${translateUI('item_obtainedfrom_stage')}</i></div><div class="selection-grid stage selection-grid-flex">` + html + '</div>'
    } else {
        return ''
    }
}

function getItemCraftNodes(itemId, itemType) {
    let html = ["", "", ""]
    let nodesHtml = ""

    data.crafting.Nodes.forEach((craftNode) => {
        if (craftNode.Weight > 0) {

            let groupWeightTotal = craftNode.Groups.reduce((sum, g) => sum + g.Weight, 0)

            for (group of craftNode.Groups) {

                const craftGroup = data.crafting.Groups[group.GroupId]

                let itemWeightTotal = craftGroup.reduce((sum, g) => sum + g.Weight, 0)
            
                for (groupItem of craftGroup) {

                    if (groupItem.Type == itemType && groupItem.ItemId == itemId) {

                        let probability = (group.Weight / groupWeightTotal) * (groupItem.Weight / itemWeightTotal)

                        html[craftNode.Tier-1] += getCraftingCardHTML(craftNode, probability, true/*, groupItem.AmountMin, groupItem.AmountMax*/)
                    }

                }
            }
        }
    })

    if (html[0] != "" || html[1] != "" || html[2] != "") {
        nodesHtml += `<div class="mb-2"><i>${translateUI('item_obtainedfrom_synthesis')}</i></div>`
        nodesHtml += `<table class="w-100 text-center"><tbody>`
    
        for (let i = 0; i < html.length; i++) {
            if (html[i] != "") {
                nodesHtml += `<tr><td><p class="p-2 m-0">${getLocalizedString('NodeTier', ''+(i+1))}</p></td><td><div class="selection-grid craft selection-grid-flex my-2">${html[i]}</div></td></tr>`
                $('#ba-item-craftnodes').show()
            }
        }
        nodesHtml += `</tbody></table>`
    }

    fusionRecipe = find(data.crafting.Fusion, 'ResultId', itemId + getItemIdOffset(itemType))
    if (fusionRecipe.length > 0) {
        nodesHtml += `<div class="mb-2"><i>${translateUI('item_obtainedfrom_fusion')}</i></div>`
        nodesHtml += `<div class="selection-grid craft selection-grid-flex my-2">${getFusionRecipeCardHTML(fusionRecipe[0])}</div>`
        $('#ba-item-craftnodes').show()

    }

    
    return nodesHtml
}

function getItemConsumables(itemId) {
    let itemHtml = ["", ""]
    let returnHtml = ""
    data.items.filter(i => "ConsumeType" in i && i.IsReleased[regionID] && !i.ImmediateUse).forEach((consumableItem) => {
        const containsList = getServerProperty(consumableItem, 'Contains')
        containsList.forEach(containItem => {

            if (containItem[0] == itemId) {

                if (consumableItem.ConsumeType == 'Random') {
                    itemHtml[1] += getDropIconHTML(consumableItem.Id, containItem[1], containItem[2], containItem[3])
                } else {
                    itemHtml[0] += getMaterialIconHTML(consumableItem.Id, 0)
                }
            }

        })
    })

    if (itemHtml[0] != "" || itemHtml[1] != "") {
        returnHtml += `<div class="mb-2"><i>${translateUI('item_obtainedfrom_consumable')}</i></div>`
        returnHtml += `<div class="item-icon-list">`
    
        for (let i = 0; i < itemHtml.length; i++) {
            if (itemHtml[i] != "") {
                returnHtml += itemHtml[i]
                $('#ba-item-consumables').show()
            }
        }
        returnHtml += `</div>`
    }
    
    return returnHtml
}

function loadJSON(list, success) {
    let results = {}

    let loadPromise = Object.entries(list).map(function(el){
        return $.getJSON(el[1], function(result) {
            results[el[0]] = result
        })
    })

    return Promise.all(loadPromise).then(function() {
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

function getAttackTypeText(bulletType) {
    let text = ''
    if (bulletType == "Mixed") {
        text = translateUI("attack_type_mixed_desc")
    } else if (bulletType == "Normal") {
        text = translateUI("attack_type_normal_desc")
    } else for (armorType in data.config.TypeEffectiveness[bulletType]) {
        if (armorType == "Structure") continue
        if (armorType == "ElasticArmor" && regionID == 2) continue
        const factor = data.config.TypeEffectiveness[bulletType][armorType] / 10000
        if (factor != 1) {
            text += text == '' ? '' : '\n'
            text += translateUI("attack_type_desc", [factor, `<b class='ba-col-${armorType.toLowerCase()}'>${getLocalizedString("ArmorTypeLong", armorType)}</b>`])
        }
    }
    return text
}
function getDefenseTypeText(armorType) {

    let text = ''
    if (armorType == "Mixed") {
        text = translateUI("defense_type_mixed_desc")
    } else if (armorType == "Normal") {
        text = translateUI("defense_type_normal_desc")
    } else for (bulletType in data.config.TypeEffectiveness) {
        if (bulletType == "Sonic" && regionID == 2) continue
        const factor = data.config.TypeEffectiveness[bulletType][armorType] / 10000
        if (factor != 1) {
            text += text == '' ? '' : '\n'
            text += translateUI("defense_type_desc", [factor, `<b class='ba-col-${bulletType.toLowerCase()}'>${getLocalizedString("BulletType", bulletType)}</b>`])
        }
    }
    return text
}

function setAttackTypeClass($el, type) {
    $el.removeClass("bg-atk-normal bg-atk-explosion bg-atk-pierce bg-atk-mystic bg-atk-sonic bg-atk-mixed").addClass(`bg-atk-${type.toLowerCase()}`)
}

function setDefenseTypeClass($el, type) {
    $el.removeClass("bg-def-lightarmor bg-def-heavyarmor bg-def-unarmed bg-def-normal bg-def-elasticarmor bg-def-mixed").addClass(`bg-def-${type.toLowerCase()}`)
}

function getSkillText(skill, level, {renderBuffs = true, bulletType = null, emphasiseChange = false, renderSkillHits = true}) {
    
    let result = skill.Desc
    const emphasisRegex = /[0-9.]+(?:%|s|秒|초| วินาที)/g
    const knockbackRegex = /<kb:(\d+)>/g
 
    result = result.replace(emphasisRegex, function(match) {return `<strong>${match}</strong>`})
    result = result.replace(knockbackRegex, function(match, p1) {
        const knockbackEffect = skill.Effects.filter(e => e.Type == 'Knockback')[p1 - 1]
        return `<strong>${knockbackEffect.Scale[level - 1] * 2}</strong>`
    })

    const parameterClass = bulletType == null ? 'ba-col-emphasis' : `ba-col-${bulletType.toLowerCase()}`

    let skillHits = {}
    let skillRawScale = {}
    if ("Effects" in skill) {
        skill.Effects.filter(e => "HitsParameter" in e).forEach(effect => {
            if ("HitFrames" in effect) {
                skillHits[effect.HitsParameter] = []
                if ("Hits" in effect) {
                    effect.HitFrames.forEach(hf => skillHits[effect.HitsParameter].push(...effect.Hits))
                } else {
                    effect.HitFrames.forEach(hf => skillHits[effect.HitsParameter].push(10000))
                }
                
            } else {
                skillHits[effect.HitsParameter] = effect.Hits
            }

            skillRawScale[effect.HitsParameter] = [...effect.Scale]
        })
    }

    if ("Parameters" in skill) {
        for (let i = 1; i <= skill.Parameters.length; i++) {
            while (result.includes(`<?${i}>`)) {
                if (emphasiseChange) {
                    //only emphasise parameters once they change
                    if ((level == 1 && skill.Parameters[i-1][level-1] != skill.Parameters[i-1][level]) || (level > 1 && skill.Parameters[i-1][level-1] != skill.Parameters[i-1][level-2])) {
                        result = result.replace(`<?${i}>`, `<span class="${parameterClass}">${skill.Parameters[i-1][level-1]}</span>`)
                    } else {
                        result = result.replace(`<?${i}>`, skill.Parameters[i-1][level-1].replace(emphasisRegex, function(match) {return `<strong>${match}</strong>`}))   
                    }
                } else {
                    if (renderSkillHits && i in skillHits) {
                        let totalDamage
                        if (i in skillRawScale) {
                            totalDamage = skillRawScale[i][level-1]
                        } else {
                            totalDamage = parseFloat(skill.Parameters[i-1][level-1].replace('%', '')) * 100
                        }
                        result = result.replace(`<?${i}>`, `<span class="${parameterClass} skill-hitinfo" data-bs-toggle="tooltip" data-bs-placement="top" title="${getBasicTooltip(getSkillHitsText(skillHits[i], totalDamage, bulletType.toLowerCase()))}">${skill.Parameters[i-1][level-1]}</span>`)

                    } else {
                        result = result.replace(`<?${i}>`, `<span class="${parameterClass}">${skill.Parameters[i-1][level-1]}</span>`)
                    }
                }
            }
        }
    }

    result = replaceBuffPlaceholders(result, renderBuffs)

    return result
}

function replaceBuffPlaceholders(text, renderBuffs = true) {
    let result = text
    const buffTypes = ['Buff', 'Debuff', 'CC', 'Special']
    buffTypes.forEach(type => {
        const buffRegex = new RegExp(`<${type.slice(0,1).toLowerCase()}:(\\w+)(?:='([^']*)')?>`, 'g')
        if (renderBuffs) {
            result = result.replace(buffRegex, function(match, capture, labelText) {
                return getBuffTag(type, capture, {tooltip: true, overrideName: labelText ? labelText : null})
            })
        } else {
            result = result.replace(buffRegex, function(match, capture, labelText) {
                const buffName = type + '_' + capture
                return `<b>${labelText ? labelText : getLocalizedString('BuffName', buffName)}</b>`
            })
        }

    })
    return result
}

function getBuffTag(type, name, {tooltip, overrideName = null}) {
    const buffName = `${type}_${name}`
    return `<span class="ba-skill-${type.toLowerCase()}" ${tooltip ? `data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/${buffName}.webp`, getLocalizedString('BuffNameLong', buffName), getLocalizedString('BuffType', type), null, getLocalizedString('BuffTooltip', buffName), 30)}"` : ''}><img class=\"buff-icon\" src=\"images/buff/${buffName}.webp\"><span class="buff-label">${overrideName !== null ? overrideName : getLocalizedString('BuffName', buffName)}</span></span>`
}

function getSkillHitsText(damageDist, totalDamage, type) {
    let hits = {}
    let hitsText = ''
    damageDist.forEach((hit) => {
        hit = parseFloat(((hit / 10000) * (totalDamage / 100)).toFixed(1)) + '%'
        hits[hit] = hits[hit] ? hits[hit]+1 : 1
    })
    Object.keys(hits).forEach((hit) => {
        hitsText += `${hitsText == '' ? '' : '\n'}<span class='ba-col-${type}'>${hit}</span> <b>&times;${hits[hit]}</b>`
    })
    return translateUI('skill_hits_tooltip', [`<b>${damageDist.length}</b>`]) + `\n<small>${hitsText}</small>`
}

function getSkillHits(skill) {
    if (!skill || !skill.Effects) return 0
    const effectWithHits = skill.Effects.find(e => (e.Type == "DMGMulti" || e.Type == "DMGZone") && e.Hits !== undefined)
    if (effectWithHits === undefined) {
        if (skill.Effects.find(e => e.Type == "DMGSingle") !== undefined) return 1
        return 0
    } else {
        return effectWithHits.Hits.length
    }
}

function getNormalAttackHitsText(hitsArray, ammoCost, weaponType, attackType) {
    let hits = {}
    let hitsText = ''
    hitsArray.forEach((hit) => {
        hit = parseFloat(((hit / 10000) * 100).toFixed(1)) + '%'
        hits[hit] = hits[hit] ? hits[hit]+1 : 1
    })
    Object.keys(hits).forEach((hit) => {
        hitsText += `${hitsText == '' ? '' : '\n'}<span class='ba-col-${attackType}'>${hit}</span> <b>&times;${hits[hit]}</b>`
    })
    let text
    switch (weaponType) {
        case "GL":
        case "RL":
        case "MT":
        case "Cannon":
            text = translateUI('stat_ammocount_tooltip_area', [`<b>${ammoCost}</b>`, `<b>${hitsArray.length}</b>`])
            break;
        case "RG":
            text = translateUI('stat_ammocount_tooltip_line', [`<b>${ammoCost}</b>`, `<b>${hitsArray.length}</b>`])
            break;
        case "FT":
            text = translateUI('stat_ammocount_tooltip_fan', [`<b>${ammoCost}</b>`, `<b>${hitsArray.length}</b>`])
            break;
        default:
            text = translateUI('stat_ammocount_tooltip', [`<b>${ammoCost}</b>`, `<b>${hitsArray.length}</b>`])
            break;
    }
    return text + `\n<small>${hitsText}</small>`
}

function getRichTooltip(icon, title, subtitle, rarity, body, imgsize = 50, imgclass = '') {
    var html =  `<span class='ba-tooltip'>`

    html += `<div class='ba-tooltip-header'>`
    if (icon != null) {
        html += `<div class='ba-tooltip-img'><img class='${imgclass}' src='${icon}' width='${imgsize}' height='${imgsize}'></div>`
    }
    html += `<div class='flex-fill d-flex flex-column'><div class='flex-fill d-flex flex-column justify-content-center'><div class='ba-tooltip-title'>${title.replace( /\"/g, "&quot;")}</div></div>`
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

    if (pixelMode) {
        pixelMode = false
        localStorage.setItem("cheat_code", false)
        loadModule(loadedModule)
    }
    
    applyThemeToBody(theme)
}

function setPixelTheme() {
    $(`#ba-navbar-themeswitcher button`).removeClass("active")
    applyThemeToBody('pixel')
}

function applyThemeToBody(theme) {
    if (theme == 'pixel') {
        $('body').toggleClass("pixel", true)
        $('body').toggleClass("theme-dark", false)
        $('meta[name="theme-color"]').attr('content', '#21009c')
        $("#ba-navbar-logo").html("<img src='./images/logo_pixel.png'>")
    } else {
        $("#ba-navbar-logo").load("./images/logo_schalegg.svg")
        const applyDarkTheme = (theme == 'auto') ? window.matchMedia('(prefers-color-scheme: dark)').matches : theme == 'dark'
        $('body').toggleClass("pixel", false)
        $('body').toggleClass("theme-dark", applyDarkTheme)
        $('meta[name="theme-color"]').attr('content', applyDarkTheme ? '#212529' : '#dee2e6')
    }
}

function toggleHighContrast(state) {
    highContrast = state
    $(`#ba-navbar-contrast-toggle button`).removeClass("active")
    $(`#ba-navbar-contrast-toggle-${highContrast}`).addClass("active")
    localStorage.setItem("high_contrast", highContrast)
    $('body').toggleClass("high-contrast", highContrast)
}

function changeRegion(regID) {
    if (regID != regionID) {

        json_server_list = getServerJSONList(regID)
        loadJSON(json_server_list, result => {
            data = Object.assign(data, result)
        }).then(function(val){

            $(`#ba-navbar-regionselector-${regionID}`).removeClass("active")

            regionID = regID
            region = data.config.Regions[regionID]
            localStorage.setItem("region", regionID)
    
            $(`#ba-navbar-regionselector span`).text($(`#ba-navbar-regionselector-${regionID} span`).text())
            $(`#ba-navbar-regionselector-${regionID}`).addClass("active")
    
            EnemyFinder.generateEnemyList()
            populateStudentSkillFilters()
            studentStatsList = null
            loadModule(loadedModule)

        }, function(reason) {
            console.error(reason)
        })
    }
}

function populateStudentSkillFilters() {
    passiveStatList = []
    weaponPassiveStatList = []
    subStatList = []
    let studentBuffSet = new Set()
    let enemyBuffSet = new Set()

    search_options.filterSelect.PassiveBuff = []
    search_options.filterSelect.WeaponPassiveBuff = []
    search_options.filterSelect.SubBuff = []

    studentList.forEach(student => {
        if (!student.IsReleased[regionID]) {
            return
        }

        for (skill of student.Skills) {
            switch (skill.SkillType) {
                case "passive":
                    skill.Effects.forEach(effect => {
                        const statName = effect.Stat.split('_')[0]
                        if (!passiveStatList.includes(statName)) {
                            passiveStatList.push(statName)
                        }
                    })
                    break;
                case "weaponpassive":
                    skill.Effects.forEach(effect => {
                        const statName = effect.Stat.split('_')[0]
                        if (!weaponPassiveStatList.includes(statName)) {
                            weaponPassiveStatList.push(statName)
                        }
                    })
                    break;       
                default:
                    skill.Effects.filter(e => e.Type.startsWith("Buff")).forEach(effect => {
                        const statName = effect.Stat.split('_')[0]
                        if (effect.Type == "BuffTarget") {
                            enemyBuffSet.add(statName)
                        } else {
                            studentBuffSet.add(statName)
                        }
                    })
                    break;
            }
        }

        if (student.SquadType == 'Support') {
            student.Skills.find(s => s.SkillType == "sub").Effects.forEach(effect => {
                const statName = effect.Stat.split('_')[0]
                if (!subStatList.includes(statName)) {
                    subStatList.push(statName)
                }
            })
        }
    })

    const alphabeticalSort = (a,b) => getLocalizedString('Stat',a).localeCompare(getLocalizedString('Stat',b))

    passiveStatList = passiveStatList.sort(alphabeticalSort)
    subStatList = subStatList.sort(alphabeticalSort)
    weaponPassiveStatList = weaponPassiveStatList.sort(alphabeticalSort)

    studentBuffStatFilters = [...studentBuffSet].sort(alphabeticalSort)
    enemyBuffStatFilters = [...enemyBuffSet].sort(alphabeticalSort)
}

function changeLanguage(lang) {
    if (lang != userLang) {
        json_lang_list = getLanguageJSONList(lang.toLowerCase())
        loadJSON(json_lang_list, result => {
            data = Object.assign(data, result)
        }).then(function(val){
            setSortedDataLists()
            EnemyFinder.generateEnemyList()
            populateStudentSkillFilters()
            $(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).removeClass("active")
            $('body').removeClass(`font-${userLang.toLowerCase()}`)
    
            userLang = lang
            
            delete data.voice
            localStorage.setItem("language", lang)
    
            $(`#ba-navbar-languageselector span`).text($(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).text())
            $(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).addClass("active")
            
            loadModule(loadedModule)
        }, function(reason) {
            console.error(reason)
        })
    }
}

function loadLanguage(lang) {

    // add correct font class
    $('body').addClass(`font-${lang.toLowerCase()}`)

    $('*[data-localize-id]').each(function (i,el) {
        let [key, value] = $(el).data('localize-id').split(',')
        if ($(el).data('localize-replacement-id')) {
            let [repKey, repValue] = $(el).data('localize-replacement-id').split(',')
            $(el).html(getLocalizedString(key,value, [getLocalizedString(repKey, repValue)]))
        } else {
            $(el).html(getLocalizedString(key,value))
        }
        
    })

    $('*[data-ph-localize-id]').each(function (i,el) {
        let key = $(el).data('ph-localize-id').split(',')[0], value = $(el).data('ph-localize-id').split(',')[1]
        $(el).attr('placeholder', getLocalizedString(key,value))
    })

    $('*[data-tooltip-id]').each(function (i,el) {
        let key = $(el).data('tooltip-id').split(',')[0], value = $(el).data('tooltip-id').split(',')[1]
        $(el).tooltip({title: getBasicTooltip(getLocalizedString(key,value)), placement: 'top', html: true})
    })

    const updatedDaysAgo = duration(new Date().getTime() / 1000 - data.config.build)[0]
    $('#navbar-version').text(`v${cache_ver} - ${translateUI("version_lastupdated", [new Date(data.config.build * 1000).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric" }), updatedDaysAgo == 0 ? "<1" : updatedDaysAgo])}`)
    $(`#ba-navbar-regionselector span`).text($(`#ba-navbar-regionselector-${regionID} span`).text())
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
    return `\<i class=\'fa-solid fa-circle me-2 col-item-${rarity.toLowerCase()}\'\>\</i\>${rarity}`
}

function searchContains(substring, string) {
    if (userLang != 'En') {
        if (string.toLowerCase().includes(substring))
        return true
    } else {
        //decode certain html entities out of the string
        string = string.replace('&#x27;', '').replace('&quot;', '').replace('&amp;', '&')

        let a = string.toLowerCase().replace(/['"!\?<>\(\)\.\-]/g,''), b = substring.toLowerCase().replace(/['"!\?<>\(\)\.\-]/g,'')

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

    if (searchTerm == 'uuddlrlrba') {
        pixelMode = true
        localStorage.setItem("cheat_code", true)
        setPixelTheme()
        loadModule(loadedModule)
        searchTerm = ""
        $('#ba-navbar-search').val("")
    }

    $('#navbar-search-results').scrollTop(0)
    if (searchTerm == "") {
        $('#navbar-search-results').html('').hide()
        $('#navbar-search').removeClass('has-text')
        $('#ba-navbar-search').removeClass('results-open')
        $('#navbar-search-clear').hide()
        searchResultsCount = 0
        searchResultsSelection = 0
        return true
    }
    $('#navbar-search-clear').show()
    $('#navbar-search').addClass('has-text')
    $('#navbar-search-results').html('').show()
    let results = [], maxResults = 25

    $.each(data.students, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/student/icon/'+el.Id+'.webp', 'type': translateUI('student'), 'rarity': '', 'rarity_text': getRarityStars(el.StarGrade), 'onclick': `loadStudent('${el.PathName}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.raids.Raid, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': `images/raid/icon/Icon_${el.PathName}.png`, 'type': getLocalizedString('StageType', 'Raid'), 'rarity': '', 'rarity_text': '', 'onclick': `loadRaid(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.raids.WorldRaid, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': `images/raid/icon/Icon_${el.PathName}.png`, 'type': getLocalizedString('StageType', 'WorldRaid'), 'rarity': '', 'rarity_text': '', 'onclick': `loadRaid(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.raids.MultiFloorRaid, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name') + ` (${getLocalizedString('ArmorTypeLong', el.ArmorType)})`, 'icon': `images/raid/icon/Icon_${el.PathName}.png`, 'type': getLocalizedString('StageType', 'MultiFloorRaid'), 'rarity': '', 'rarity_text': '', 'onclick': `loadRaid(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.items, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/item/icon/'+el.Icon+'.webp', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': getRarityTier(el.Rarity), 'onclick': `loadItem(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.furniture, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/furniture/icon/'+el.Icon+'.webp', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': getRarityStars(el.Rarity), 'onclick': `loadItem(${el.Id+1000000})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.equipment, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/equipment/icon/'+el.Icon+'.webp', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': el.Id >= 1000 ? `T${el.Tier}` : getRarityTier(el.Rarity), 'onclick': `loadItem(${el.Id+2000000})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.crafting.Nodes, function(i,el){
        if (el.Weight > 0 && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/ui/'+el.Icon+'.png', 'type': getLocalizedString('NodeTier', el.Tier), 'rarity': `node-${el.Quality}`, 'rarity_text': getLocalizedString('NodeQuality', el.Quality), 'onclick': `loadCraft(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.Campaign, function(i,el){
        let stagecode = getStageName(el, 'Campaign')
        let stageName = getStageTitle(el, 'Campaign')
        if ((el.Area <= region.CampaignMax) && (searchContains(searchTerm, stagecode) || searchContains(searchTerm, stageName))) {
            results.push({'name': stageName, 'icon': 'images/campaign/'+getStageIcon(el,'Campaign')+'.png', 'type': stagecode, 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.WeekDungeon, function(i,el){
        let stagecode = getStageName(el, 'WeekDungeon')
        let stageName = getStageTitle(el, 'WeekDungeon')
        if ((stageIsReleased(el)) && (searchContains(searchTerm, stagecode) || searchContains(searchTerm, stageName))) {
            results.push({'name': stageName, 'icon': 'images/campaign/'+getStageIcon(el,'WeekDungeon')+'.png', 'type': stagecode, 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.SchoolDungeon, function(i,el){
        let stagecode = getStageName(el, 'SchoolDungeon')
        let stageName = getStageTitle(el, 'SchoolDungeon')
        if ((stageIsReleased(el)) && (searchContains(searchTerm, stagecode) || searchContains(searchTerm, stageName))) {
            results.push({'name': stageName, 'icon': 'images/campaign/'+getStageIcon(el,'SchoolDungeon')+'.png', 'type': getLocalizedString('StageType', el.Type), 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.Event, function(i,el){
        let stageType = el.Field ? 'Field' : 'Event'
        let stagecode = getStageName(el, stageType)
        let searchStageCode = stagecode.replace('\n', ' ')
        let stageName = getStageTitle(el, stageType)
        if ((region.Events.includes(el.EventId)) && (searchContains(searchTerm, searchStageCode) || searchContains(searchTerm, stageName))) {
            results.push({'name': stageName, 'icon': 'images/campaign/'+getStageIcon(el,stageType)+'.png', 'type': stagecode, 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length > 0) {
        let html = '<div>'
        for (let i = 0; i < results.length; i++) {
            html += `<div id="ba-search-result-item-${i+1}" class="ba-search-result-item" onclick="${results[i].onclick}; $('#navbar-search-clear').trigger('click');">
            <div class='ba-search-img'><img src='${results[i].icon}' class='ba-item-${results[i].rarity.toLowerCase()}'></div>
            <div class='flex-fill d-flex flex-column' style="min-width:0;"><div class='flex-fill d-flex flex-column justify-content-center'><div class='ba-search-name'>${results[i].name}</div></div>
            <div class='d-flex align-items-center mt-auto'>
            <span class='ba-search-subtitle flex-fill'>${results[i].type}</span>
            <span class='ba-search-rarity'>${results[i].rarity_text}</span></div></div></div>`
        }
        html += '</div>'
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
    switch (ev.code) {
        case 'Enter':
            ev.preventDefault()
            if (ev.type == "keyup") {
                if (searchResultsSelection == 0 && searchResultsCount > 0) {
                    $('#ba-search-result-item-1').trigger("onclick")
                } else {
                    $('#ba-search-result-item-'+searchResultsSelection).trigger("onclick")
                }
            }
            break
        case 'ArrowDown':
            ev.preventDefault()
            if (ev.type == "keydown" && searchResultsSelection < searchResultsCount) {
                searchResultsSelection++
                $('.ba-search-result-item').removeClass("selected")
                $('#ba-search-result-item-'+searchResultsSelection).addClass("selected")
                $(`#ba-search-result-item-${searchResultsSelection}`)[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
            }
            break
        case 'ArrowUp':
            ev.preventDefault()
            if (ev.type == "keydown" && searchResultsSelection > 1)  {
                searchResultsSelection--
                $('.ba-search-result-item').removeClass("selected")
                $('#ba-search-result-item-'+searchResultsSelection).addClass("selected")
                $(`#ba-search-result-item-${searchResultsSelection}`)[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
            }
            break
        case 'Escape':
            ev.preventDefault()
            $('#navbar-search-clear').trigger('click')
            break
    }

}

/**
 * Returns the translated string for the current language from localization.json
 * @param {*} group The localization group
 * @param {*} key The localization value to load
 * @returns 
 */
function getLocalizedString(group, key, replacements=[]) {
    if (data.localization.hasOwnProperty(group) && data.localization[group].hasOwnProperty(key)) {
        return formatString(data.localization[group][key], replacements)
    } else {
        console.log(`Localization not defined for "${group}, ${key}"`)
        return `${group}_${key}`
    }
}

/**
 * Shortcut for getLocalizedString('ui', ...)
 */
function translateUI(key, replacements=[]) {
    return getLocalizedString('ui', key, replacements)
}

/**
 * Returns the translated string for the current language. If it is null or empty for the current language, returns the first nonempty translation in the order En, Jp
 * @param {*} obj The object containing the translated strings
 * @param {*} key The key excluding the language suffix e.g. 'Name' to get either 'NameEn' or 'NameJp' based on the current language
 * @returns 
 */
function getTranslatedString(obj, key) {
    if (obj[key]) return (obj[key])
    else if (obj[key+userLang]) return (obj[key+userLang])
    else if (obj[key+'En']) return (obj[key+'En'])
    else if (obj[key+'Jp']) return (obj[key+'Jp'])
    else {
        console.log(`No translations defined for "${obj}.${key}"`)
        return ''
    }
}

function getCacheVerResourceName(res) {
    return res + '?v=' + cache_ver
}

/**
 * Returns true if the stage has been released in the current region
 */
function stageIsReleased(stage) {
    if (stage.Id > 8000000) {
        return (region.Events.includes(stage.EventId))
    } else if (stage.Id > 1000000) {
        if (stage.Area > region.CampaignMax) return false
        if (!region.CampaignExtra && stage.Stage == "A") return false
        return true
    } else if (stage.Id > 60000) {
        return (stage.Stage <= region.SchoolDungeonMax)
    } else if (stage.Id > 32000) {
        return (stage.Stage <= region.BloodMax)
    } else if (stage.Id > 31000) {
        return (stage.Stage <= region.FindGiftMax)
    } else if (stage.Id > 30000) {
        return (stage.Stage <= region.ChaserMax)
    } else return false
}

function changeStudentSummon(id, recalculate = true) {

    statPreviewSelectedChar = id

    if (statPreviewViewSupportStats && statPreviewSelectedChar > 0) toggleStrikerBonus()
    if (compareMode) {
        compareMode = false
        updateCompareModeControl()
    }

    $('.summon-list .dropdown-item').removeClass('active')
    $(`.summon-list .dropdown-item[data-summon-id="${id}"]`).addClass('active')

    if (statPreviewSelectedChar > 0) {
        const summonInfo = find(data.summons, 'Id', student.Summons[id-1].Id)[0]
        const sourceSkill = find(student.Skills, 'SkillType', student.Summons[id-1].SourceSkill)[0]
        $('.summon-list .active-name').html(getTranslatedString(summonInfo, "Name"))
        $('.summon-list .active-icon img').attr('src', `images/skill/${sourceSkill.Icon}.webp`).addClass(`bg-skill ${student.BulletType.toLowerCase()}`)
    } else {
        $('.summon-list .active-name').html(getTranslatedString(student, "Name"))
        $('.summon-list .active-icon img').attr('src', `images/student/icon/${student.Id}.webp`).removeClass("bg-skill explosion pierce mystic sonic")
    }

    if (student.TSAId && find(data.students, 'Id', student.TSAId)[0].IsReleased[regionID]) {
        $('#statpreview-tsastats').toggle(statPreviewSelectedChar > 0)
    }

    updateSummonSourceSkill()
    if (recalculate) {
        initCharacterSkillInfo()
        recalculateStats()
    }
}

function changeSkillPreviewTerrain(terrain, recalculate = true) {
    if (statPreviewTerrain != terrain) {
        statPreviewTerrain = terrain
        if (recalculate) recalculateStats()
    }
    $('.terrain-list .dropdown-item').removeClass('active')
    $(`.terrain-list .dropdown-item[data-terrain="${terrain}"]`).addClass('active')
    $('.terrain-list .terrain-list-active-name').text(getLocalizedString("AdaptationType", terrain))
    $('.terrain-list .terrain-list-active-icon').attr('src', `images/ui/Terrain_${terrain}.png`)
}

function updateCompareModeControl() {
    $('.comparemode-on').toggle(compareMode)
    $('#ba-student-stat-table').toggleClass('compare', compareMode)
    $('#ba-statpreview-status-compare').toggleClass('deactivated', !compareMode)
    if (compareMode) {
        $('#ba-statpreview-status-title-compare').html(getTranslatedString(studentCompare, "Name"))
        $('#ba-statpreview-status-title-compare-icon').attr('src', `images/student/icon/${studentCompare.Id}.webp`).removeClass("bg-skill explosion pierce mystic sonic")
        $('#ba-statpreview-status-compare').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_compare_remove')), placement: 'top', html: true})
    } else {
        $('#ba-statpreview-status-compare').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_compare')), placement: 'top', html: true})

    }
}

function openStudentComparison() {
    if (compareMode) {
        compareMode = false
        updateCompareModeControl()
        recalculateStats()
    } else {
        $('#student-select-grid .selection-grid-card.disabled').removeClass('disabled')
        $(`#student-select-${student.Id}`).addClass('disabled')
        selectCompareMode = true
        studentSelectorModal.show()
    }

}

/**
 * Draws the hexamap for a given stage
 * @param {} stage 
 */
function drawHexamap(stage, container) {
    $(container).empty()
    const scale = 90

    let x_min = 99
    let y_min = 99
    let y_max = -99
    let x_max = -99
    let leftOffset = 999999
    let rightOffset = 0
    let topOffset = 50

    stage.HexaMap.forEach(tile => {
        x_min = Math.min(x_min, tile.Pos[0])
        y_min = Math.min(y_min, tile.Pos[1])
        x_max = Math.max(x_max, tile.Pos[0])
        y_max = Math.max(y_max, tile.Pos[1])
    })

    stage.HexaMap.forEach(tile => {
        let xx = tile.Pos[0] - x_min
        let yy = tile.Pos[1] - y_min
        leftOffset = Math.min(leftOffset, xx*scale + (yy*scale*0.5))
        rightOffset = Math.max(rightOffset, scale + xx*scale + (yy*scale*0.5))
    })

    let tilePairs = new Array(stage.HexaMap.length).fill(0)
    let pairCount = 0
    stage.HexaMap.forEach((tile, ind) => {
        let xx = tile.Pos[0] - x_min
        let yy = tile.Pos[1] - y_min

        const x = xx*scale + (yy*scale*0.5) - leftOffset
        const y = yy* Math.sqrt(Math.pow(scale/2, 2)*3) + topOffset
        const spawnTiles = [102101, 902101, 903108]
        const removeTiles = [102201, 903101]
        let html = ""
        let onclick = ""
        if (tile.Trigger !== undefined && (spawnTiles.includes(stage.HexaMap[tile.Trigger].Entity) || removeTiles.includes(stage.HexaMap[tile.Trigger].Entity))) {
            if (tilePairs[ind] == 0 && tilePairs[tile.Trigger] == 0) {
                pairCount++
                tilePairs[ind] = pairCount
                tilePairs[tile.Trigger] = pairCount
            }
        }

        if ("Entity" in tile) {
            if (tile.Entity > 100000000) {
                //Enemy Unit Tile
                let unit = find(stage.Formations, "Id", tile.Entity)[0]
                html += `<img class="ba-stage-map-enemy" src="images/enemy/${unit.MapIcon}.webp" style="z-index:${yy}">`
                html += `<div class="map-info">`
                onclick = ` onclick="populateMapEnemyList(${tile.Entity});" `

                if (unit.MoveType == "Guard") {
                    html += `<span class="move-type guard"><i class="fa-solid fa-triangle-exclamation"></i></span>`
                } else if (unit.MoveType == "Pursuit") {
                    html += `<span class="move-type pursuit"><i class="fa-solid fa-angles-left"></i></span>`
                }

                let armorType = find(data.enemies, "Id", unit.EnemyList[0])[0].ArmorType
                html += `<span class="def-type bg-def-${armorType.toLowerCase()}"><img src="images/ui/Type_Defense_s.png" style="height:100%;"></span>`

                html += `</div>`

                if (unit.UnitGrade.slice(0,5) == "Grade") {
                    let unitGrade = parseInt(unit.UnitGrade.slice(-1))
                    html += `<span class="unit-grade"><span class="grade">RANK<img src="images/ui/Strategy_Icon_EnemyRank_${unitGrade}.png"></span></span>`
                } else if (unit.UnitGrade == "Boss") {
                    html += `<span class="unit-grade boss"></span>`
                }

            }  else if (tile.Entity > 1000000) {
                //Pyroxene Tile
                let item = find(data.currency, "Id", 4)[0]
                html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(getTranslatedString(item, 'Name')+' &times;50')}"><i class="fa-solid fa-gift"></i></span>`

            } else switch (tile.Entity) {
                case 101101: case 101102: case 101103: case 101104: case 101105:
                    //Start Tile
                    html += `<span class="start-tile"></span>`
                    break
            
                case 102101: case 902101: case 903108:
                    //Spawn Tile
                    html += `<span class="tile-icon" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_spawn'))}"><i class="fa-solid fa-shoe-prints" style="transform:rotate(315deg);"></i></span>`
                    break

                case 103101: case 103102:
                    //Drone Tile
                    html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_drone'))}"><i class="fa-solid fa-eye"></i></span>`
                    break

                case 102201: case 903101:
                    //Remove Tile
                    html += `<span class="tile-icon" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_remove'))}"><i class="fa-solid fa-shoe-prints" style="transform:rotate(315deg);font-size: 20px;"></i><i class="fa-solid fa-ban" style="position: absolute;font-size: 38px;"></i></span>`
                    break

                case 104101: case 104102:
                    //2-Way Teleporter Tile
                    html += `<span class="tile-icon group-${tile.Entity-104100}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_teleport_twoway'))}"><i class="fa-solid fa-up-long"></i><i class="fa-solid fa-down-long"></i></span>`
                    break
      
                case 105101: case 105201:
                    //1-Way Teleporter Out
                    html += `<span class="tile-icon group-${((tile.Entity-105001)/100) +2}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_teleport_oneway_entrance'))}"><i class="fa-solid fa-up-long"></i></span>`
                    break

                case 105102: case 105202:
                    //1-Way Teleporter In
                    html += `<span class="tile-icon group-${((tile.Entity-105002)/100) +2}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_teleport_oneway_exit'))}"><i class="fa-solid fa-down-long"></i></span>`
                    break

                case 106101:
                    //Heal Tile
                    html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_item_food'))}"><i class="fa-solid fa-bowl-rice"></i></span>`
                    break

                case 107101:
                    //Gun Tile
                    html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_item_atk'))}"><i class="fa-solid fa-gun"></i></span>`
                    break

                case 107201:
                    //Armor Tile
                    html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_item_def'))}"><i class="fa-solid fa-shield"></i></span>`
                    break
                
                case 109201: case 109202: case 109203:
                    //Switch D -> U
                    html += `<span class="tile-icon lowered group-${tile.Entity-109200}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_switch_down'))}"><i class="fa-solid fa-chevron-up" style="margin-top: 12px;"></i></span>`
                    break

                case 109204: case 109205: case 109206:
                    //Switch U -> D
                    html += `<span class="tile-icon raised group-${tile.Entity-109200-3}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_switch_up'))}"><i class="fa-solid fa-chevron-down"></i></span>`
                    break

                case 109301: case 109302: case 109303:
                    //Switch Tile D
                    html += `<span class="tile-icon switch-tile lowered group-${tile.Entity-109300}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_switch_target_down'))}"></span>`
                    break

                case 109304: case 109305: case 109306:
                    //Switch Tile U
                    html += `<span class="tile-icon switch-tile group-${tile.Entity-109300-3}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_switch_target_up'))}"></span>`
                    break
            }
        }
        html = `<div class="ba-stage-map-tile map-tile-${ind} ${(tile.Trigger !== undefined && spawnTiles.includes(stage.HexaMap[tile.Trigger].Entity)) ? "hidden-tile" : ""} ${(tile.Type.startsWith("DisposableTileObject")) ? "cracked-tile" : ""}" ${onclick} style="left:${x}px;top:${y.toFixed(0)}px;${onclick != '' ? 'cursor:pointer;' : ''}">${html}</div>`
        $(container).css('width', `${rightOffset-leftOffset}px`)
        $(container).css('height', `${topOffset + 10 + scale + (y_max-y_min)*Math.sqrt(Math.pow(scale/2, 2)*3)}px`)
        $(container).append(html)
        $('.tile-icon, .tile-item').tooltip({html: true})
    })

    tilePairs.forEach((val, ind) => {
        $(`.map-tile-${ind}`).addClass(`group-${val}`)
    })
}

function makeDraggable(el) {
    $(el).on('mousedown', e => {
        $(el).toggleClass('scrolling', true)
        scrolling = true
        scrollPosition = {
            left: el.scrollLeft(),
            top: el.scrollTop(),
            x: e.clientX,
            y: e.clientY,
        }
    })
    $(el).on('mouseleave', e => {
        scrolling = false
        $(el).toggleClass('scrolling', false)
    })
    $(el).on('mouseup', e => {
        scrolling = false
        $(el).toggleClass('scrolling', false)
    })
    $(el).on('mousemove', e => {
        e.preventDefault()
        if (scrolling) {
            $(el).scrollLeft(scrollPosition.left - (e.clientX - scrollPosition.x))
            $(el).scrollTop(scrollPosition.top - (e.clientY - scrollPosition.y))
        }
    })
}

function openStageMapModal() {
    drawHexamap(loadedStage, '#ba-stage-modal-map-canvas')
    $('#ba-stage-modal-map .modal-title').text($('#ba-stage-name').text())
    stageMapModal.show()
}

function changeConquestMap(map) {
    drawConquestHexamap(loadedConquest, map, '#ba-conquest-map-canvas')
}

/**
 * Draws the hexamap for a given conquest map and step
 * @param {} stage 
 */
function drawConquestHexamap(conquest, mapId, container) {
    $(container).empty()

    filteredTiles = conquest.Maps[mapId].Tiles

    const x_scale = 90
    const y_scale = 90
    const x_gap = 15

    let x_min = 99
    let y_min = 99
    let y_max = -99
    let x_max = -99
    const x_pad = 20
    const y_pad = 20
    let leftOffset = 999999
    let rightOffset = 0
    let topOffset = conquest.Maps[mapId].Difficulty == "VeryHard" ? 60 : 120

    filteredTiles.forEach(tile => {
        x_min = Math.min(x_min, tile.Pos[0])
        y_min = Math.min(y_min, tile.Pos[1])
        x_max = Math.max(x_max, tile.Pos[0])
        y_max = Math.max(y_max, tile.Pos[1])
    })

    filteredTiles.forEach(tile => {
        let xx = tile.Pos[0] - x_min
        let yy = tile.Pos[1] - y_min
        leftOffset = Math.min(leftOffset, xx*x_scale + Math.max((xx + yy*(0.5))*x_gap, 0) + (yy*y_scale*0.5))
        rightOffset = Math.max(rightOffset, x_scale + xx*x_scale + Math.max((xx + yy*(0.5))*x_gap, 0) + (yy*y_scale*0.5))
    })

    filteredTiles.sort((a, b) => a.Pos[1] - b.Pos[1]).forEach((tile, ind) => {
        let xx = tile.Pos[0] - x_min
        let yy = tile.Pos[1] - y_min
        let isBoss = false

        const x = x_pad + xx*x_scale + Math.max((xx + yy*(0.5))*x_gap, 0) + (yy*(y_scale)*0.5) - leftOffset
        const y = yy* Math.sqrt(Math.pow(y_scale/2, 2)*3) + topOffset

        let html = ""
        let onclick = ""
        let stageId = 0
        if (tile.Type == "Start") {
            html += `<span class="start-tile"></span>`
        }

        if (tile.StageId) {
            //Enemy Unit Tile
            const stage = find(data.stages.Conquest, "Id", tile.StageId)[0]
            const unit = stage.Formations[0]
            html += `<img class="ba-stage-map-enemy" src="images/enemy/${unit.MapIcon}.webp" style="z-index:${100+yy}">`
            html += `<div class="map-info">`
            onclick = ` onclick="loadStage(${stage.Id});" `
            stageId = stage.Id

            if (stage.Team != 'None') {
                const team = stage.Team.replace('Team','')
                html += `<span class="move-type team-${team}">${team}</span>`
            }

            let armorType = find(data.enemies, "Id", unit.EnemyList[0])[0].ArmorType
            html += `<span class="def-type bg-def-${armorType.toLowerCase()}"><img src="images/ui/Type_Defense_s.png" style="height:100%;"></span>`

            html += `</div>`

            if (stage.EnemyType == "Normal" || stage.EnemyType == "Challenge") {
                html += `<span class="unit-grade"><span class="grade">Lv. ${stage.Level}</span></span>`
            } else if (stage.EnemyType == "Boss") {
                html += `<span class="unit-grade boss"></span>`
                isBoss = true
            }  else if (stage.EnemyType == "MiddleBoss") {
                html += `<span class="unit-grade leader"></span>`
            }

        }

        html = `<div data-x="${xx}" data-y="${yy}" ${stageId > 0 ? `data-stage-id="${stageId}" ` : ''} class="ba-stage-map-tile map-tile-${ind} conquest-tile event-${conquest.EventId} conquest-tile-${isBoss ? "boss" : tile.Type.toLowerCase()} ${loadedStage.Id == stageId ? "selected" : ""}" ${onclick} style="left:${x}px; top:${y.toFixed(0) - (isBoss*(y_scale/2))}px; ${onclick != '' ? 'cursor:pointer;' : ''}">${html}</div>`
        $(container).css('width', `${rightOffset-leftOffset + x_pad*2}px`)
        $(container).css('height', `${topOffset + y_pad*2 + y_scale + (y_max-y_min)*Math.sqrt(Math.pow(y_scale/2, 2)*3)}px`)
        $(container).append(html)
        $('.tile-icon, .tile-item').tooltip({html: true})
    })
}

function getConquestManageString(eventId) {
    switch (eventId) {
        case 815:
            return translateUI('conquest_operate')
        case 822:
            return translateUI('conquest_analyze')
        default:
            return translateUI('conquest_operate')
    }
}

function toggleOwned() {
    //Add/Remove the current student from the collection list
    if (student.Id in studentCollection) {
        delete studentCollection[student.Id]
        $('#ba-student-collection-btn').toggleClass('active', false).html('<i class="fa-solid fa-circle-plus"></i>')
        $('#ba-student-collection-btn').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_collection_add')), placement: 'top', html: true})
        $('.btn-lock-attributes').hide()
    } else {
        studentCollectionSave()
        $('#ba-student-collection-btn').toggleClass('active', true).html('<i class="fa-solid fa-circle-check"></i>')
        $('#ba-student-collection-btn').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_collection_remove')), placement: 'top', html: true})
        $('.btn-lock-attributes').show()
        lockedAttributes = false
    }

    $('#ba-student-collection-btn').blur()

    $('.btn-lock-attributes').toggleClass('deactivated', !lockedAttributes)
    $('.btn-lock-attributes i').toggleClass('fa-lock', lockedAttributes).toggleClass('fa-lock-open', !lockedAttributes)

    if (search_options.filter.Collection.Owned || search_options.filter.Collection.NotOwned) updateStudentList()
    localStorage.setItem('student_collection', JSON.stringify(studentCollection))
    $('#ba-student-search-filter-collection').toggle(Object.keys(studentCollection).length > 0)
}

function studentCollectionSave() {
    studentCollection[student.Id] = {
        s: statPreviewStarGrade,
        l: parseInt($('#ba-statpreview-levelrange').val()),
        e1: parseInt($('#ba-statpreview-gear1-range').val()),
        e2: parseInt($('#ba-statpreview-gear2-range').val()),
        e3: parseInt($('#ba-statpreview-gear3-range').val()),
        ws: statPreviewWeaponGrade,
        wl: parseInt($('#ba-statpreview-weapon-range').val()),
        b: parseInt($('#ba-statpreview-bond-0-range').val()),
        s3: parseInt($('#ba-statpreview-passiveskill-range').val()),
        pm: parseInt($('#ba-statpreview-potential-maxhp-range').val()),
        pa: parseInt($('#ba-statpreview-potential-attackpower-range').val()),
        ph: parseInt($('#ba-statpreview-potential-healpower-range').val()),
        lock: lockedAttributes
    }

    //update alt bond
    for (let i = 1; i <= student_bondalts.length; i++) {
        if (student_bondalts[i-1].Id in studentCollection && !studentCollection[student_bondalts[i-1].Id].lock) {
            studentCollection[student_bondalts[i-1].Id].b = parseInt($(`#ba-statpreview-bond-${i}-range`).val())
        }
    }
    
    localStorage.setItem('student_collection', JSON.stringify(studentCollection))
}

function maxStudentAttributes() {
    //Set all attributes to the maximum possible value
    statPreviewStarGrade = 5
    statPreviewLevel = region.StudentMaxLevel
    $('#ba-statpreview-levelrange').val(statPreviewLevel)
    changeStatPreviewLevel(document.getElementById('ba-statpreview-levelrange'), false)

    statPreviewIncludeEquipment = true
    statPreviewEquipment = [...region.EquipmentMaxLevel]
    $('#ba-statpreview-gear1-range').val(statPreviewEquipment[0])
    $('#ba-statpreview-gear2-range').val(statPreviewEquipment[1])
    $('#ba-statpreview-gear3-range').val(statPreviewEquipment[2])
    changeGearLevel(1, document.getElementById('ba-statpreview-gear1-range'), false)
    changeGearLevel(2, document.getElementById('ba-statpreview-gear2-range'), false)
    changeGearLevel(3, document.getElementById('ba-statpreview-gear3-range'), false)

    if (region.WeaponMaxLevel > 0) {
        statPreviewWeaponGrade = 3
        statPreviewWeaponLevel = region.WeaponMaxLevel
        $('#ba-statpreview-weapon-range').attr("max",region.WeaponMaxLevel).val(statPreviewWeaponLevel)
    } else {
        statPreviewWeaponGrade = 0
        statPreviewWeaponLevel = 0
    }

    changeStatPreviewStars(statPreviewStarGrade, statPreviewWeaponGrade, false)

    statPreviewPassiveLevel = 10
    $('#ba-statpreview-passiveskill-range').val(statPreviewPassiveLevel)
    changeStatPreviewPassiveSkillLevel(document.getElementById('ba-statpreview-passiveskill-range'), false)

    for (let i = 0; i <= student_bondalts.length; i++) {
        statPreviewBondLevel[i] = region.BondMaxLevel
        $(`#ba-statpreview-bond-${i}-range`).val(statPreviewBondLevel[i])
        changeStatPreviewBondLevel(i, false)
        statPreviewIncludeBond[i] = true
    }

    if ("Released" in student.Gear && student.Gear.Released[regionID]) {
        const max = $('#ba-statpreview-gear4-range').attr('max')
        $('#ba-statpreview-gear4-range').val(max)
        changeExGearLevel(document.getElementById('ba-statpreview-gear4-range'), false)
    }

    recalculateTerrainAffinity()
    refreshStatTableControls()
    recalculateStats()
}

function statPreviewSettingsSave() {
    let statPreviewSettings = {
        StarGrade: statPreviewStarGrade,
        WeaponGrade: statPreviewWeaponGrade,
        Level: statPreviewLevel,
        WeaponLevel: statPreviewWeaponLevel,
        Equipment: statPreviewEquipment,
        Potential: statPreviewPotentialLevel,
        BondLevel: statPreviewBondLevel,
        PassiveLevel: statPreviewPassiveLevel,
        ExLevel: statPreviewExLevel,
        GearLevel: statPreviewGearLevel,
        IncludePassive: statPreviewIncludePassive,
        IncludeBond: statPreviewIncludeBond,
        IncludeEquipment: statPreviewIncludeEquipment,
        IncludePotential: statPreviewIncludePotential,
        IncludeBuffs: statPreviewIncludeBuffs
    }
    localStorage.setItem('student_settings', JSON.stringify(statPreviewSettings))
}

function statPreviewSettingsLoad() {
    let statPreviewSettings = {}
    if (localStorage.getItem("student_settings")) {
        statPreviewSettings = JSON.parse(localStorage.getItem("student_settings"))
    }
    statPreviewStarGrade = statPreviewSettings.StarGrade ? statPreviewSettings.StarGrade : 3
    statPreviewWeaponGrade = statPreviewSettings.WeaponGrade ? statPreviewSettings.WeaponGrade : 0
    statPreviewLevel = statPreviewSettings.Level ? statPreviewSettings.Level : 1
    statPreviewWeaponLevel = statPreviewSettings.WeaponLevel ? statPreviewSettings.WeaponLevel : 1
    statPreviewEquipment = statPreviewSettings.Equipment ? statPreviewSettings.Equipment : [99, 99, 99]
    statPreviewPotentialLevel = statPreviewSettings.Potential ? statPreviewSettings.Potential : {'MaxHP': 0, 'AttackPower': 0, 'HealPower': 0}
    statPreviewBondLevel = Array.isArray(statPreviewSettings.BondLevel) ? statPreviewSettings.BondLevel : [20, 20, 20]
    statPreviewPassiveLevel = statPreviewSettings.PassiveLevel ? statPreviewSettings.PassiveLevel : 10
    statPreviewExLevel = statPreviewSettings.ExLevel ? statPreviewSettings.ExLevel : 5
    statPreviewGearLevel = statPreviewSettings.GearLevel ? statPreviewSettings.GearLevel : 0
    statPreviewIncludePassive = statPreviewSettings.IncludePassive ? statPreviewSettings.IncludePassive : false
    statPreviewIncludeBond = Array.isArray(statPreviewSettings.IncludeBond) ? statPreviewSettings.IncludeBond : [false, false, false]
    statPreviewIncludeEquipment = statPreviewSettings.IncludeEquipment ? statPreviewSettings.IncludeEquipment : false
    statPreviewIncludePotential = statPreviewSettings.IncludePotential ? statPreviewSettings.IncludePotential : false
    statPreviewIncludeBuffs = statPreviewSettings.IncludeBuffs ? statPreviewSettings.IncludeBuffs : false
}

function exportDataString(container) {
    const exportStr = btoa(JSON.stringify(studentCollection))
    $(container).val(exportStr)
    navigator.clipboard.writeText(exportStr)
    toastMessage(`<i class="fa-solid fa-circle-exclamation me-2"></i>${translateUI('toast_import_copy')}`, 2500, 'alert')
}

function parseImport(str) {
    //try Schale format
    try {
        let importData = JSON.parse(atob(str))
        let collectionNew = {}
        Object.entries(importData).forEach((char) => {
            collectionNew[char[0]] = {
                s: char[1].s,
                l: char[1].l,
                e1: char[1].e1,
                e2: char[1].e2,
                e3: char[1].e3,
                ws: char[1].ws,
                wl: char[1].wl,
                b: char[1].b,
                s3: char[1].s3,
                lock: char[1].lock !== undefined ? char[1].lock : false
            }
        })
        return collectionNew
    } catch (error) {
        console.log(error)
    }

    //try Justin's resource planner format
    try {
        let importData = JSON.parse(str)
        let collectionNew = {}
        importData.characters.forEach((char) => {
            if (char.eleph.unlocked) {
                collectionNew[char.id] = {
                    s: char.current.star,
                    l: char.current.level,
                    e1: Math.max(char.current.gear1,1),
                    e2: Math.max(char.current.gear2,1),
                    e3: Math.max(char.current.gear3,1),
                    ws: char.current.ue,
                    wl: char.current.ue_level,
                    b: char.current.bond,
                    s3: Math.max(char.current.passive,1),
                    lock: false
                }
            }
        })
        return collectionNew
    } catch (error) {
        console.log(error)
    }

    return null
}

function importCollection(collectionNew) {
    if (collectionNew != null) {
        localStorage.setItem('student_collection', JSON.stringify(collectionNew))
        studentCollection = JSON.parse(localStorage.getItem('student_collection'))
        toastMessage(`<i class="fa-solid fa-circle-check me-2"></i>${translateUI('toast_import_success', [Object.keys(studentCollection).length])}`, 2500, 'success')
        if (loadedModule == 'students') {
            loadStudent(student.PathName)
            $('#ba-student-search-filter-collection').toggle(Object.keys(studentCollection).length > 0)
            if (search_options.filter.Collection.Owned || search_options.filter.Collection.NotOwned) updateStudentList()
        }
    }
}

function toastMessage(msg, duration, cssClass) {
    if (toastMessageTimeout) {
        clearTimeout(toastMessageTimeout)
    }
    $('#toast-message').removeClass().addClass('p-2 ba-panel show').addClass(cssClass).html(`<p class="m-0">${msg}</p>`)
    toastMessageTimeout = window.setTimeout(function(){$("#toast-message").removeClass('show')},duration)
}

function showReleaseWarning() {
    toastMessage(`<i class="fa-solid fa-circle-exclamation me-2"></i>${translateUI('toast_release_warning')}`, 4000, 'alert')
}