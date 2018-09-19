function execScript(scriptStr) {
    var script = document.createElement('script');
    script.textContent = scriptStr;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
}

function highlightElement(elemSelector) {
    let scriptStr = '$(\"' + elemSelector + '").addClass("importantEvent");';
    execScript(scriptStr);
}

function highlightEvent(currency, eventName, exactMatch = false) {
    let selector = "a:contains('" + eventName + "')";
    //console.log('selector = ' + selector);
    let eventElem = $(selector);

    eventElem.each(function (index) {
        if (exactMatch && $(this).text().trim() !== eventName) {return false};

        let currencyText = $(this).parent().prev().prev().first().text().trim();
        //console.log(' event: ' + currencyText + " | " + currency + " on " + eventName);
        if (currencyText === currency) {
            const parentId = $(this).parent().parent().attr('id');
            highlightElement("#" + parentId);
        }
    });
}

function clickTimeOut(cssSelector, timeOut) {
    setTimeout(function () {
        $(cssSelector).click();
    }, timeOut);
}

// Use NYC time
$("#economicCurrentTime").click();
var timeOut = 400;
clickTimeOut("#liTz62", timeOut);


// Filter 2nd and 3rd importance events
timeOut = timeOut + 500;
clickTimeOut("#filterStateButton", timeOut);
clickTimeOut("#importance2", timeOut + 300);
clickTimeOut("#importance3", timeOut + 400);
timeOut = timeOut + 600;
setTimeout(function () {
    execScript("calendarFilters.innerFiltersSubmit();");
}, timeOut);
//clickTimeOut("#ecSubmitButton", timeOut + 1200);


// Highlight the important events
timeOut = timeOut + 400;
setTimeout(function () {
    const exactMatch = true;

    highlightEvent("USD", "Unemployment Rate");
    highlightEvent("USD", "Nonfarm Payrolls");
    highlightEvent("USD", "Core CPI (MoM)");
    highlightEvent("USD", "Crude Oil Inventories", exactMatch);

    highlightEvent("EUR", "ECB Interest Rate Decision");

    highlightEvent("GBP", "BoE Interest Rate Decision");
    highlightEvent("GBP", "CPI (MoM)");
}, timeOut);
