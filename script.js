let allLabels = document.querySelectorAll(".generator-content label");
let globalWrappers = document.querySelectorAll('.global-wrapper .input-wrapper');
let selector = document.querySelector("#css-selector");
let baseFont = document.querySelector("#base-size");
let generatedCss = document.querySelector("#generated-css");
let generatedBtn = document.querySelector("#generate");
let copyIcon = document.querySelector("#copy-css");
let textareaWrapper = document.querySelector(".generated-css-wrapper");

// This will generate CSS taking all the filled values.
generatedBtn.addEventListener('click', () => {
    let generatedObj = {};
    let objValues = [];
    if(selector.value.length > 0 && baseFont.value.length > 0) {
        globalWrappers.forEach((globalWrapper) => {
            globalWrapper.classList.remove('error');
        });
        allLabels.forEach((label) => {
            let inputEle = document.querySelector("#"+label.htmlFor);
            if (inputEle.value != "") {
                if(inputEle.getAttribute('type') === 'number') {
                    if(inputEle.value%baseFont.value == 0) {
                        generatedObj[label.htmlFor] = (inputEle.value/baseFont.value) + "rem";
                    }
                    else {
                        generatedObj[label.htmlFor] = ((inputEle.value/baseFont.value).toFixed(3)) + "rem"; // toFixed will show the decimal numbers upto three places.
                    }
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
    }
    else {
        globalWrappers.forEach((globalWrapper) => {
            if(globalWrapper.querySelector('input').value == "") {
                globalWrapper.classList.add('error');
            }
            else {
               globalWrapper.classList.remove('error'); 
            }
        })
    }
})

// To copy CSS from the textarea on the click of a copy icon.
copyIcon.addEventListener("click", () => {
    // Copy the CSS inside the textarea.
    if(generatedCss.value != "") {
        navigator.clipboard.writeText(generatedCss.value);
        textareaWrapper.classList.add("copied")
        setTimeout(() => {
            textareaWrapper.classList.remove("copied")
        }, 2000);
    }
})