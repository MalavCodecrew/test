// sett storage by cookies for toggle button
// $(document).ready(function() {
//             function setCookie(name, value) {
//                 document.cookie = name + "=" + value + "; path=/";
//             }

//             function getCookie(name) {
//                 let cookieArr = document.cookie.split(";");
//                 for (let i = 0; i < cookieArr.length; i++) {
//                     let cookiePair = cookieArr[i].split("=");
//                     if (name === cookiePair[0].trim()) {
//                         return decodeURIComponent(cookiePair[1]);
//                     }
//                 }
//                 return null;
//             }

//             function updateDisplay() {
//                 if ($('#toggleAll').is(':checked')) {
//                     $('.includevat').css('display', 'block');
//                     $('.moneywithoutvat').css('display', 'none');
//                     $('.compareincludevat').css('display', 'block');
//                     $('.comparemoneywithoutvat').css('display', 'none');
//                     $('.regularwithvat').css('display', 'block');
//                     $('.regularwithoutvat').css('display', 'none');
//                 } else {
//                     $('.includevat').css('display', 'none');
//                     $('.moneywithoutvat').css('display', 'block');
//                     $('.compareincludevat').css('display', 'none');
//                     $('.comparemoneywithoutvat').css('display', 'block');
//                     $('.regularwithvat').css('display', 'none');
//                     $('.regularwithoutvat').css('display', 'block');
//                 }
//             }

//             let vatCookie = getCookie("vatToggle");
//             if (vatCookie === "true") {
//                 $("#toggleAll").prop("checked", true);
//             } else {
//                 $("#toggleAll").prop("checked", false);
//             }
//             updateDisplay();

//             $("#toggleAll").on("change", function() {
//                 if ($(this).is(":checked")) {
//                     setCookie("vatToggle", "true");
//                 } else {
//                     setCookie("vatToggle", "false");
//                 }
//                 updateDisplay();
//             });
//         });
// end code sett storage by cookies for toggle button

// sett storage by localstorage for toggle button
$(document).ready(function() {
    function setVatToggle(value) {
        localStorage.setItem("vatToggle", value);
    }

    function getVatToggle() {
        return localStorage.getItem("vatToggle");
    }

    function updateDisplay() {
        if ($('#toggleAll').is(':checked')) {
            $('.includevat').css('display', 'block');
            $('.moneywithoutvat').css('display', 'none');
            $('.compareincludevat').css('display', 'block');
            $('.comparemoneywithoutvat').css('display', 'none');
            $('.regularwithvat').css('display', 'block');
            $('.regularwithoutvat').css('display', 'none');
        } else {
            $('.includevat').css('display', 'none');
            $('.moneywithoutvat').css('display', 'block');
            $('.compareincludevat').css('display', 'none');
            $('.comparemoneywithoutvat').css('display', 'block');
            $('.regularwithvat').css('display', 'none');
            $('.regularwithoutvat').css('display', 'block');
        }
    }

    let vatToggle = getVatToggle();
    if (vatToggle === "true") {
        $("#toggleAll").prop("checked", true);
    } else {
        $("#toggleAll").prop("checked", false);
    }
    updateDisplay();

    $("#toggleAll").on("change", function() {
        if ($(this).is(":checked")) {
            setVatToggle("true");
        } else {
            setVatToggle("false");
        }
        updateDisplay();
    });
});
// sett storage by localstorage for toggle button


