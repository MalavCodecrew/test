$(document).ready(function() {
            function setCookie(name, value) {
                document.cookie = name + "=" + value + "; path=/";
            }

            function getCookie(name) {
                let cookieArr = document.cookie.split(";");
                for (let i = 0; i < cookieArr.length; i++) {
                    let cookiePair = cookieArr[i].split("=");
                    if (name === cookiePair[0].trim()) {
                        return decodeURIComponent(cookiePair[1]);
                    }
                }
                return null;
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

            let vatCookie = getCookie("vatToggle");
            if (vatCookie === "true") {
                $("#toggleAll").prop("checked", true);
            } else {
                $("#toggleAll").prop("checked", false);
            }
            updateDisplay();

            $("#toggleAll").on("change", function() {
                if ($(this).is(":checked")) {
                    setCookie("vatToggle", "true");
                } else {
                    setCookie("vatToggle", "false");
                }
                updateDisplay();
            });
        });


