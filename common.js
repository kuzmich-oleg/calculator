(function () {

    var result = "";
    var tempString = "";
    var optionalBox = document.getElementsByClassName("optional-box")[0];
    var resultScreen = document.getElementsByClassName("result")[0];

    function initializeCalculator() {

        function throwErr() {

            "use strict";
            optionalBox.style.backgroundColor = "red";
    
            setTimeout(function () {
                optionalBox.style.backgroundColor = "white";
            }, 1000);
            result = "";
        }
    
        function check(string) {
    
            "use strict";
            var i;
    
            for (i = 1; i < string.length; i += 1) {
                if ((string[i] === "/" && string[i - 1] === "/") || (string[i] === "*" && string[i - 1] === "*")) {
                    return false;
                }
            }
            return true;
        }
    
        function calculate() {
    
            "use strict";
            if (!check(tempString)) {
                throwErr();
            } else {
    
                try {
                    result = eval(tempString);
                    if (result === Infinity || -1 * result === Infinity) {
                        throwErr();
                    }
                } catch (err) {
                    throwErr();
                }
    
                if (result) {
                    resultScreen.innerHTML = result;
                }
                tempString = result + "";
            }
        }
    
        function storeInfo(event) {
    
            "use strict";
            var eventTarget = event.target;
            var tempId = eventTarget.getAttribute("id");
    
            if (tempId) {
    
                if (tempId === "equal") {
                    calculate();
    
                } else if (tempId === "backspace") {
                    tempString = tempString.substring(0, tempString.length - 1);
    
                } else {
                    tempString += eventTarget.innerHTML;
                }
                resultScreen.innerHTML = tempString;
            }
        }

        return {
            throwErr: throwErr,
            check: check,
            calculate: calculate,
            storeInfo: storeInfo
        };
    }


    window.onload = function () {
        "use strict";
        var calculator = initializeCalculator();

        optionalBox.addEventListener("click", function (event) {
            calculator.storeInfo(event);
        });
    };
})();