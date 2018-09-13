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

function highlightEvent(currency, eventName) {
    let selector = "a:contains('" + eventName + "')";
    //console.log('selector = ' + selector);
    let eventA = $(selector);
    eventA.each(function (index) {
        let currencyText = $(this).parent().prev().prev().first().text().trim();
        console.log(' event: ' + currencyText + " | " + currency + " on " + eventName);
        if (currencyText === currency) {
            const parentId = $(this).parent().parent().attr('id');
            highlightElement("#" + parentId);
        }
    });
}

// Use NYC time
$("#economicCurrentTime").click();
setTimeout(function () {
    $("#liTz62").click();
}, 1000);


// Highlight the important events
setTimeout(function () {
    highlightEvent("USD", "Unemployment Rate");
    highlightEvent("USD", "Nonfarm Payrolls");
    highlightEvent("USD", "Core CPI (MoM)");

    highlightEvent("EUR", "ECB Interest Rate Decision");

    highlightEvent("GBP", "BoE Interest Rate Decision");
}, 3000);
