var searchResultsCount = 0, searchResultsSelection = 0

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
    let a = string.toLowerCase().replace(/[^a-z0-9 ]/g,''), b = substring.toLowerCase().replace(/[^a-z0-9 ]/g,'')
    //whole match
    if (a.startsWith(b))
    return true
    //individual word match
    while (a.includes(' ')) {
        a = a.substring(a.indexOf(' ')+1)
        if (a.startsWith(b))
        return true
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
            results.push({'name': el['name_'+userLang], 'icon': 'images/student/collection/Student_Portrait_'+el['name_dev']+'_Collection.png', 'type': 'Character', 'rarity': getRarityStars(el['stars']), 'onclick': `loadStudent('${el['name_dev']}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.raids, function(i,el){
        if (el['released'][regionID] && searchContains(searchTerm, el['name_'+userLang])) {
            results.push({'name': el['name_'+userLang], 'icon': 'images/raid/'+el.enemies[0].icon+'.png', 'type': 'Total Assault Boss', 'rarity': '', 'onclick': 'items.html?item='+el['id']})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.common.items, function(i,el){
        if (el['released'][regionID] && searchContains(searchTerm, el['name_'+userLang])) {
            results.push({'name': el['name_'+userLang], 'icon': 'images/items/'+el['icon']+'.png', 'type': 'Item', 'rarity': getRarityTier(el['rarity']), 'onclick': `loadItem(${el['id']})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.common.furniture, function(i,el){
        if (searchContains(searchTerm, el['name_'+userLang])) {
            results.push({'name': el['name_'+userLang], 'icon': 'images/furniture/'+el['icon']+'.png', 'type': 'Furniture', 'rarity': getRarityStars(el['rarity']), 'onclick': `loadItem(${el['id']+100000})`})
            if (results.length >= maxResults) return false
        }
    })

    console.log(results)
    if (results.length > 0) {
        var html = ''
        for (let i = 0; i < results.length; i++) {
            html += `<div id="ba-search-result-item-${i+1}" class="ba-search-result-item" onclick="${results[i].onclick}; $('#navbar-search-clear').trigger('onclick');">
            <div class='ba-search-img'><img src='${results[i].icon}' width=50 height=50></div>
            <div class='flex-fill d-flex flex-column'><div class='flex-fill d-flex flex-column justify-content-end'><div class='ba-search-name'>${results[i].name}</div></div>
            <div class='d-flex align-items-center mt-auto'>
            <span class='ba-search-subtitle flex-fill'>${results[i].type}</span>
            <span class='ba-search-rarity'>${results[i].rarity}</span></div></div></div>`
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