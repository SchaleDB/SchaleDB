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
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-debuff" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Debuff_${capture}.png`, data.common.buffs['Debuff_'+capture].tooltip_title, 'Debuff', data.common.buffs['Debuff_'+capture].tooltip_body)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Debuff_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${data.common.buffs['Debuff_'+capture].name}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Debuff_$1.png\">")

    regex = /<b:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-buff" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Buff_${capture}.png`, data.common.buffs['Buff_'+capture].tooltip_title, 'Buff', data.common.buffs['Buff_'+capture].tooltip_body)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Buff_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${data.common.buffs['Buff_'+capture].name}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Buff_$1.png\">")

    regex = /<c:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-cc" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_CC_${capture}.png`, data.common.buffs['CC_'+capture].tooltip_title, 'CC Effect', data.common.buffs['CC_'+capture].tooltip_body)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_CC_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${data.common.buffs['CC_'+capture].name}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_CC_$1.png\">")

    regex = /<s:(\w+)>/g
    result = result.replaceAll(regex, function(match, capture) {return `<span class="ba-skill-special" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_Special_${capture}.png`, data.common.buffs['Special_'+capture].tooltip_title, 'Status', data.common.buffs['Special_'+capture].tooltip_body)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Special_${capture}.png\"><span class="ba-buff-icon-spacer"></span>${data.common.buffs['Special_'+capture].name}</span>`})
    //result = result.replaceAll(regex, "<img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_Special_$1.png\">")

    return result
}

function getRichTooltip(icon, title, subtitle, body) {
    var html =  ` <span class='ba-tooltip'>
        <div class='ba-tooltip-header d-flex align-items-center'>`
    if (icon != null) {
        html += `<img class='ba-tooltip-img' src='${icon}'>`
    }
    html += `<span class='ba-tooltip-title flex-grow-1'>${title}</span>`
    if (subtitle != null) {
        html += `<span class='ba-tooltip-subtitle'>${subtitle}</span>`
    }
    html += '</div>'
    if (body != null) {
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