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

function getTypeText(type) {
    var text = ''
    switch (type) {
        case "Normal":
            text += 'Deals <b>1&times;</b> damage to <b class="ba-col-explosive">Light</b>, <b class="ba-col-piercing">Heavy</b> and <b class="ba-col-mystic">Special</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class="ba-col-siege">Structures</b>.'
            break
        case "Explosive":
            text += 'Deals <b>2&times;</b> damage to <b class="ba-col-explosive">Light</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class="ba-col-mystic">Special</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class="ba-col-siege">Structures</b>.'
            break
        case "Piercing":
            text += 'Deals <b>2&times;</b> damage to <b class="ba-col-piercing">Heavy</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class="ba-col-explosive">Light</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class="ba-col-siege">Structures</b>.'
            break
        case "Mystic":
            text += 'Deals <b>2&times;</b> damage to <b class="ba-col-mystic">Special</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class="ba-col-piercing">Heavy</b> armor targets.<br>Deals <b>0.5&times;</b> damage to <b class="ba-col-siege">Structures</b>.'
            break
        case "Light":
            text += 'Receives <b>2&times;</b> damage from <b class="ba-col-explosive">Explosive</b> attacks.<br>Receives <b>0.5&times;</b> damage from <b class="ba-col-mystic">Mystic</b> attacks.'
            break
        case "Heavy":
            text += 'Receives <b>2&times;</b> damage from <b class="ba-col-piercing">Piercing</b> attacks.<br>Receives <b>0.5&times;</b> damage from <b class="ba-col-explosive">Explosive</b> attacks.'
            break
        case "Special":
            text += 'Receives <b>2&times;</b> damage from <b class="ba-col-mystic">Mystic</b> attacks.<br>Receives <b>0.5&times;</b> damage from <b class="ba-col-piercing">Piercing</b> attacks.'
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
    html += `<div class='flex-fill d-flex flex-column'><div class='flex-fill d-flex flex-column justify-content-center'><div class='ba-tooltip-title'>${title}</div></div>`
    if (subtitle != null || rarity != null) {
        html += `<div class='d-flex align-items-center mt-auto'>`
        html += subtitle != null ? `<span class='ba-tooltip-subtitle flex-fill'>${subtitle}</span>` : ''
        html += rarity != null ? `<span class='ba-tooltip-rarity'>${rarity}</span>` : ''
        html += '</div>'
    }

    html += '</div></div>'
    
    if (body != null && body != "") {
        html += `<div class='ba-tooltip-body'>${body}</div>`
    }
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
    if (!student.released[regionID]) {
        localStorage.setItem("chara", "Aru")
        location.href = "students.html?chara=Aru"
    } else {
        location.reload()
    }
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
        $(el).text(data.localization.strings[$(el).data('localize-id')][lang])
    })

    $('#ba-student-search-text').attr("placeholder", data.localization.strings['student_search_textbox_placeholder'][lang])
}