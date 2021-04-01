/**
 * Functions that handle the resizing of the lateral menu on different screens
 * @param {boolean} isMenuOpened
 */
function resizeMenuPanel(isMenuOpened) {
    if (!isMenuOpened) {
        document.getElementById("menu-container").classList.remove("width-25");
        document.getElementById("menu-container").classList.add("width-0");
    } else {
        document.getElementById("menu-container").classList.remove("width-0");
        document.getElementById("menu-container").classList.add("width-25");
    }
}

/**
 * Functions that changes the number format in "k", "M" notation
 * example 1000 -> 1k
 * @param {number} number
 * @returns
 */
function transformNumberFormat(number, order=false, decimals = 2) {
    if (!order) {
        let steps = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "B" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
        ];

        let regularExpression = /\.0+$|(\.[0-9]*[1-9])0+$/;
        let i;
        for (i = steps.length - 1; i > 0; i--) {
            if (number >= steps[i].value) {
                break;
            }
        }
        return (number / steps[i].value).toFixed(decimals).replace(regularExpression, "$1") + " " + steps[i].symbol;
    }

    else {
        /*
          - st is used with numbers ending in 1 (e.g. 1st, pronounced first)
          - nd is used with numbers ending in 2 (e.g. 92nd, pronounced ninety-second)
          - rd is used with numbers ending in 3 (e.g. 33rd, pronounced thirty-third)
          - As an exception to the above rules, all the "teen" numbers ending with 11, 12 or 13 use -th
          (e.g. 11th, pronounced eleventh, 112th, pronounced one hundred [and] twelfth)
          - th is used for all other numbers (e.g. 9th, pronounced ninth).

        */
            let j = number % 10,
            k = number % 100;
            if (j == 1 && k != 11) {
                return number + "st";
            }
            if (j == 2 && k != 12) {
                return number + "nd";
            }
            if (j == 3 && k != 13) {
                return number + "rd";
            }
            return number + "th";
    }
}

const slugify = (text) => {
    return text.trim().split(' ')
        .join('-').toLowerCase();
};

const capitalize = (text) => {
    return text.charAt(0)
        .toUpperCase() + text.slice(1);
}

const map = (obj, callable) => {
    return Object.fromEntries(
        d3.map(obj, r => [r[0], callable(r[1])]));
}

/**
 * Wrapper of `d3.scaleLog` to produce a logarithmic scale from a (min, max) domain.
 * 
 * @param {array} data   The original linear data.
 * @param {array} range  The range on which to project the logarithmic domain.
 */
let d3_scaleLogMinMax = (data, range) => {
    const data_minMax = [d3.min(data), d3.max(data)];

    return d3.scaleLog(data_minMax, range);
};
