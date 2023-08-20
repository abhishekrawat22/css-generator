let allLabels = document.querySelectorAll(".generator-content label");
let selector = document.querySelector("#css-selector");
let baseFont = document.querySelector("#base-size");
let generatedCss = document.querySelector("#generated-css");
let generatedBtn = document.querySelector("#generate");
let copyIcon = document.querySelector("#copy-css");

// This will generate CSS taking all the filled values.
generatedBtn.addEventListener('click', () => {
    let generatedObj = {};
    let objValues = [];
    allLabels.forEach((label) => {
        let inputEle = document.querySelector("#"+label.htmlFor);
        if (inputEle.value != "") {
            if(inputEle.getAttribute('type') === 'number') {
                generatedObj[label.htmlFor] = (inputEle.value/baseFont.value) + "rem";
            }
            else {
                generatedObj[label.htmlFor] = inputEle.value;
            }
        }
    })
    for (const [key, value] of Object.entries(generatedObj)) {
        objValues.push("\t" + `${key}: ${value}` + ";\n");
    }
    generatedCss.innerHTML = selector.value + " {" + "\n" + objValues.join("") + "}";
})

// To copy CSS from the textarea on the click of a copy icon.
copyIcon.addEventListener("click", () => {
    // Select the textarea content when copied.
    generatedCss.select();
    // generatedCss.setSelectionRange(0, 99999); // For mobile devices
    // Copy the CSS inside the textarea.
    navigator.clipboard.writeText(generatedCss.value);
})