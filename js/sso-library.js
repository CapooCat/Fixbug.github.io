window.SubmitLogin = () => {
    //$("#LoginForm").submit(function () { console.log("submit") });
    $('#LoginForm').trigger('submit');
};
window.SubmitForm = (x) => {
    $('#'+x).trigger('submit');
};
window.GetInputValue = (x) => {
    var value = document.getElementById(x).value
    return value;
};
window.CheckInputClass = (x, y) => {
    var value = document.getElementById(x).hasClass(y);
    return value;
};
window.GetInputCode = (x) => {
    let value = '';
    $('#' + x + ' .des-input-code').each(function () {
        value = value + $(this).val();
    });
    return value;
};
window.ChangeSubmitAction = (current, change) => {
    $("#" + current).attr("action", change)
}
window.ChangeFormMethod = (current, change) => {
    $("#" + current).attr("method", change)
}
window.RedirectToAction = (path, paramKeys, paramValues) => {
    //console.log(paramValues)
    path += "?";
    paramValues = !paramValues ? [] : paramValues
    paramValues.forEach((param,index) => {
        path += paramKeys[index] + "=" + param + "&";
    })
    let lastChar = path.slice(-1);
    if (lastChar == "&") {
        path = path.slice(0, -1);
    }
    window.location=path
}
window.TriggerChange = (name) => {
    let event = new Event('change');
    document.getElementsByName(name)[0].dispatchEvent(event);
}

window.DisplayErrorSpecific = (id) => {
    $("#" + id).parent().next('.des-error').css("display", "flex").hide().fadeIn(150);
    $("#" + id).next(".input-action").find(".input-error").css("display", "flex").hide().fadeIn(150);
}
window.HideErrorSpecific = (id) => {
    $("#" + id).parent().next('.des-error').css("display", "flex").hide();
    $("#" + id).next(".input-action").find(".input-error").css("display", "flex").hide();
}
window.DisplayError = () => {
    $(".input-error").css("display", "flex").hide().fadeIn(150);
    $(".des-error").css("display", "flex").hide().fadeIn(150);
}

window.HideError = () => {
    $(".input-error").css("display", "flex").hide();
    $(".des-error").css("display", "flex").hide();
}
window.FocusInputPin = () => {
    $('.des-input-code')[0].focus();
};
window.FocusInput = (x) => {
    $(x).focus();
};
window.PreventEnter = (x) => {
    $("#"+x+" input").each(function () {
        let input = $(this);
        input.on('keydown', function (e) {
            //console.log(e.keyCode)
            if (e.keyCode === 13) {
                e.preventDefault();
                //do stuff
            }
        })
    })
};

function Log(e) {
    console.log(e)
}

function htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

//#region Compatibility function

function isIOSDevice() {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

function iosSetting() {
    if (isIOSDevice()) {
        $('input[type=text].des-input.password').prop("type", "password");
        $('input[type=text].des-input.password').removeClass("password");
    }
}

function CheckFireFox() {
    if (navigator.userAgent.indexOf("Firefox") > -1) {
        $(".des-input.password, .des-input-code.password").prop("type", "password");
        $(".des-input.password, .des-input-code.password").removeClass("password");
    }
}

//#endregion 

//#region Website validate function

function CheckRegexPass() {
    let text = $("#password").val();
    let pattern = /^(.{0,7}|[^0-9]*|[^A-Z]*)$/g;
    let result = pattern.test(text);
    return !result;
}

function PasswordRegexValidation(x) {
    let pattern = /^(.{0,7}|[^0-9]*|[^A-Z]*)$/g;
    let result = pattern.test(x);
    return !result;
}

function CheckRegexUsername() {
    let text = $("#username").val();
    let patternEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g;
    let patternPhone = /^(840|\+840|\+84|84|0){1}([1-9])([0-9]{8})$/g;
    let isPhone = patternPhone.test(text);
    let isEmail = patternEmail.test(text);
    if (isEmail) {
        return 2;
    } else if (isPhone) {
        return 1;
    } else {
        return 0;
    }
}

function StrimPhone(phone) {
    let pattern = /^(840|\+840|\+84|84)/g;
    return phone.replace(pattern, "0");
}

//#endregion 

//#region Website interact function

/*margin if container height is full*/

$(document).ready(function () {
    MarginOverflow();
    iosSetting();
    ClickButtonOnEnter();
    CheckFireFox();
    AutoFocusInput();
    CustomDatePicker();
    CustomSelect();
    FooterHeaderAlign();
});

function CustomSelect() {
    $(".selection").each(function () {
        let Select = $(this);
        Select.find("div").remove();
        Select.append("<div class='selection-input'><span>" + Select.find("select option").filter(":selected").text() + "</span><i class='fa-solid fa-caret-down'></i></div>");
        Select.append("<div class='selection-list'></div>");

        Select.find("option").each(function () {
            Select.find(".selection-list").append("<div name='" + this.value + "'>" + this.text + "</div>");
        });

        Select.find(".selection-input").on("click", function () {
            Select.find(".selection-list").fadeToggle(0);
        });

        Select.find(".selection-list div").on("click", function () {
            let value = $(this).attr("name");
            Select.find("select").val(value);
            Select.find(".selection-list").fadeToggle(0);
            Select.find(".selection-input span").html(Select.find("select option").filter(":selected").text());
        });
    });
}

function CustomDatePicker() {
    if ($('.date-picker > input').length > 0) {
        $.each($('.date-picker'), function (key, value) {
            if (!$(value).hasClass("date-picker-bind")) {
                $(value).addClass("i-" + key);
                let x = ".i-" + key + " > input";
                let instance = new dtsel.DTS(x, {
                    direction: 'BOTTOM',
                    dateFormat: "dd/mm/yyyy",
                    showTime: false
                });
                $(value).addClass("date-picker-bind");
            }
        });
    }
}

$(window).resize(function () {
    MarginOverflow();
    FooterHeaderAlign();
});

function FooterHeaderAlign() {
    if ($(window).width() < 500) {
        let footerH = $(".footer").outerHeight();
        $(".header").css("margin-bottom", footerH);
    } else {
        $(".header").css("margin-bottom", "0");
    }
}

function MarginOverflow() {
    if ($(".container").outerHeight() > $(window).height() && $(window).width() > 625) {
        $(".container").css('margin', '5vh 0px');
    } else {
        $(".container").css('margin', '0');
    }
}

function AutoFocusInput() {
    if ($('input[type=text]').length > 0)
        $('input[type=text]')[0].focus();
    if ($('input[type=password]').length > 0)
        $('input[type=password]')[0].focus();

    $('a').on('focus', function () {
        if ($('input[type=text]').length > 0)
            $('input[type=text]')[0].focus();
        if ($('input[type=password]').length > 0)
            $('input[type=password]')[0].focus();
    });
}

/*show hide loading icon*/
function Loading(x) {
    if (x == 1) {
        $(".des-btn").addClass("des-btn-block");
        $(".des-btn").removeClass("des-btn");
        $(".loading").fadeIn(200);
    }
    else {
        $(".des-btn-block").addClass("des-btn");
        $(".des-btn-block").removeClass("des-btn-block");
        $(".loading").fadeOut(200);
    }
}


/*click button on enter*/
function ClickButtonOnEnter() {
    $.each($('.des-input'), function (key, value) {
        if (!$(value).hasClass("enter-bind")) {
            $(value).on("keydown", function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    try {
                        let event = new Event('change');
                        document.getElementById(value.id).dispatchEvent(event);
                        $('.des-btn')[0].click();
                    } catch { }
                }
            });
            $(value).addClass("enter-bind");
        }
    });

    $.each($('.des-input-code'), function (key, value) {
        if (!$(value).hasClass("enter-bind")) {
            $(value).on("keydown", function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    try {
                        let event = new Event('change');
                        document.getElementById(value.id).dispatchEvent(event);
                        $('.des-btn')[0].click();
                    } catch { }
                }
            });
            $(value).addClass("enter-bind");
        }
    });
}

function ContinueUsername() {
    let user = $('#username').val();
    if (user == "") {
        DisplayError();
    }
    else {
        HideError();
    }
}

function ValidatePassword(passTYpe) {
    var password = ''
    if (passTYpe == 1) {
        password = GetInputCode("tab-code");
        if (!password || password == '') {
            return -1;
        }
        else if(password.length != 6) {
            return -2;
        } else  return 1;
    } else {
        password = $('#password').val();
        if (password || password != '') {
            return 1;
        } else return -1;
    }
    
}

function ContinuePassword(customerID, username, caseControll, passType, challenge) {
    var password = '';
    var res = false;
    if (passType == 1) {
        password = GetInputCode("tab-code");
    } else {
        password = $('#password').val();
    }
    var validatedPass = ValidatePassword(passType)
    if (validatedPass != 1) {
        return false;
    }
    else {
        res = loginPost(customerID, username, caseControll, passType, challenge)
    }
    return res;
}
function ContinuePassword() {
    let passType = $('input[name=tab]:checked', '#LoginForm').attr('id');
    let pass = $("input[name=Password]", '#LoginForm').val()
    if (pass == "" || pass == undefined) {
        DisplayError()
    }
    else {
        if (passType == "code") {
            if (pass.length != 6) {
                DisplayError();
            } else {
                HideError()
            }
        }
        else { HideError(); }
    }
}

function ContinueRegister() {
    let password = $('#password').val();
    let repassword = $('#repassword').val();
    var checkPass = PasswordRegexValidation(password)
    if (password != '' || password) {
        if (checkPass) {
            if (password == repassword) {
                HideError()
                $('#password-sub').val(password)
                return true;
            }
            else {
                if (repassword != '' || repassword) {
                    //$('#repassword').addClass("RepasswordFail")
                    $('#repass-error').html(RepasswordFail)
                    DisplayErrorSpecific("repassword");
                } else {
                    //$('#repassword').addClass("RepasswordEmpty")
                    $('#repass-error').html(RepasswordEmpty)
                    DisplayErrorSpecific("repassword");
                }
            }
        } else {
            //$('#password').addClass("PasswordRules")
            $('#pass-error').html(PasswordRules)
            DisplayErrorSpecific("password");
        }
        
    } else {
        //$('#password').addClass("PasswordEmpty")
        $('#pass-error').html(PasswordEmpty)
        DisplayErrorSpecific("password");
    }

    return false;
}
function loginPost(customerID, username, caseControll, passType, challenge) {
    var res = '';
    var token = $("input[name=AntiforgeryFieldname]").val();
    var password = ''

    if (passType == 1) {
        password = GetInputCode("tab-code");
    } else {
        password = $('#password').val();
    }
    var validatedPass = ValidatePassword(passType)
    if (validatedPass != 1) {
        return false;
    }
    var params = {
        customerID: customerID,
        username: username,
        password: password,
        caseControll: caseControll,
        passType: passType,
        clientRequest: null,
        challenge: challenge,
        AntiforgeryFieldname: token
    }
    $.ajax({
        url: "/sso/Auth/LoginPost",
        type: "POST",
        traditional: true,
        async: false,
        datatype: "JSON",
        data: params,
        success: function (data) {
            res = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            res = false
            // When AJAX call has failed
            //console.log('AJAX call failed.');
            //console.log(textStatus + ': ' + errorThrown);
            window.location = "/sso/Error";
        },
        complete: function () {
            // When AJAX call is complete, will fire upon success or when error is thrown
            //console.log('AJAX call completed');
        }
    });
    return res;
}
function TriggerBtn(x) {
    $('#'+x).click();
}
function ContinueReset() {
    if (resetPassType == "pass") {
        let password = $('#password').val();
        let repassword = $('#repassword').val();
        if (password == "" || !password) {
            $('#error_statement').html(passEmpty);
            DisplayErrorSpecific("password");
        }
        else {
            HideError();
            $('#error_statement').html(passRule);
            if (!CheckRegexPass()) {
                DisplayErrorSpecific("password");
            } else {
                HideErrorSpecific("password");
                if (password != repassword) {
                    let checkRePassEmpty = !repassword && repassword == '';
                    let errStatement = checkRePassEmpty == true ? repassEmpty : repassFail;
                    $('#repass_error_statement').html(errStatement);
                    DisplayErrorSpecific("repassword");
                    wrongCount += 1;
                }
                else {
                    HideErrorSpecific("repassword");
                    $('#ResetPassForm').trigger('submit');
                }
            }
        }

    } else {
        //lấy pass pincode
        let passPinCode = GetInputCode("tab-code");
        let rePassPinCode = GetInputCode("pincode-repass");
        if (passPinCode == "" || !passPinCode) {
            $('#error_statement').html(pinEmpty);
            DisplayErrorSpecific("pincode-input-pass");
        } else {
            HideError();
            $('#error_statement').html(pinRule);
            if (passPinCode.length == 6) {
                if (passPinCode == rePassPinCode) {
                    HideError();
                    $('#password').val(passPinCode)
                    $('#ResetPassForm').trigger('submit');
                } else {
                    let checkRePassEmpty = !repassword && repassword == '';
                    let errStatement = checkRePassEmpty == true ? repassEmpty : repassFail;
                    $('#repass_error_statement').html(errStatement);
                    DisplayErrorSpecific("pincode-input-repass");
                }
            } else {
                DisplayErrorSpecific("pincode-input-pass");
                wrongCount += 1;
            }
        }

    }
}

function DisplayError() {
    $(".input-error").css("display", "flex").hide().fadeIn(150);
    $(".des-error").css("display", "flex").hide().fadeIn(150);
}
function HideError() {
    $(".input-error").css("display", "flex").hide();
    $(".des-error").css("display", "flex").hide();
}

/*check if text input have value on load then show the clear icon*/
function CheckUsernameBeforeload() {
    let user = $(".username").val();
    if (user == '' || user == undefined) {
        if ($('.clear-input').css("display") == 'flex')
            $('.clear-input').fadeOut(100);
    } else {
        if ($('.clear-input').css("display") == 'none')
            $('.clear-input').css("display", "flex").hide().fadeIn(100);
    }
}

/*show hide clear input icon*/
$("body").on("keyup", ".username", function (event) {
    let user = $(this).val();
    if (user == "") {
        if ($('.clear-input').css("display") == 'flex')
            $('.clear-input').fadeOut(100);
    } else {
        if ($('.clear-input').css("display") == 'none')
            $('.clear-input').css("display", "flex").hide().fadeIn(100);
    }
});

/*clear input*/
function Clear(x) {
    $('#' + x).val("");
    $('.clear-input').css('display', 'none');
    if (PrevFocus) {
        PrevFocus.focus();
    }
    let event = new Event('change');
    document.getElementById('username').dispatchEvent(event);
}
$("body").on("click", ".clear-input", function (event) {
    $(this).parent().parent().find("input").val("");
    $(this).css('display', 'none');
    if (PrevFocus) {
        PrevFocus.focus();
    }
});

window.onbeforeunload = function () {
    $('#pass').prop('checked', true);
    $('#password').focus();
}

/*change password tab on login*/
$('#password').focus();
function ChangeTab(x) {
    $(".input-error").fadeOut(150);
    $(".des-error").fadeOut(150);
    $('#' + x).prop('checked', true);
    if (x == 'code' && $('#tab-code').css("display") != 'flex') {
        $('#tab-password').fadeOut(150).promise().done(function () {
            $('#tab-code').css("display", "flex").hide().fadeIn(150).promise().done(function () {
                if (PrevFocus == null)
                    $('.des-input-code')[0].focus();
                else
                    PrevFocus.focus();
            });
        });
    } else if (x == 'code') {
        PrevFocus.focus();
    }

    if (x == 'pass' && $('#tab-password').css("display") != 'flex') {
        $('#tab-code').fadeOut(150).promise().done(function () {
            $('#tab-password').css("display", "flex").hide().fadeIn(150).promise().done(function () {
                $('#password').focus();
            });
        });
    } else if (x == 'pass') {
        $('#password').focus();
    }

}

/*remember focus on input*/
let PrevFocus = null;
$("body").on("focus", ".des-input-code", function () {
    PrevFocus = $(this);
});

$("body").on("focus", ".des-input", function () {
    PrevFocus = $(this);
});

let origin_val = null;
let origin_index = null;
$("body").on("keydown", ".des-input", function (e) {
    if (e.keyCode === 32)
        e.preventDefault();
    else {
        origin_index = $(this)[0].selectionStart + 1;
        if ($(this)[0].selectionStart === 0) {
            origin_val = null;
        }
    }
});

/*text input (mobile and desktop compatibility)*/
$("body").on("input", ".des-input", function (e) {
    PrevFocus = $(this);
    let start = $(this)[0].selectionStart;
    let end = $(this)[0].selectionEnd;

    //lọc whitespace và lấy giá trị con trỏ
    if ($(this).val().match(/\s/)) {
        let space_num = ($(this).val().match(/\s/g) || []).length
        start -= space_num;
        end -= space_num;
    }

    //xoá bỏ hết whitespace
    let value = $(this).val().toString().replaceAll(" ", "");
    if (origin_val !== null && origin_index !== null) {
        if (e.originalEvent.data !== null && e.originalEvent.data !== " " && e.originalEvent.data !== $(this).val().substr(0, start)) {
            value = insert(origin_val, origin_index - 1, e.originalEvent.data.slice(-1));
            start = origin_index;
            end = origin_index;
            origin_index = null;
            origin_val = null;
        }
    }

    if (e.originalEvent.data === " ") {
        origin_val = value;
    }

    $(this).val(value);
    $(this)[0].selectionStart = start;
    $(this)[0].selectionEnd = end;
});

function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

/*Remove focus on clicking outside of the element, improve focus on input and dropdown*/
$(document).on('click', function (e) {
    if (PrevFocus) {
        if ($(e.target).hasClass("eye-input") || $(e.target).parent().hasClass("eye-input") || $(".loading").is(":visible")) {
            return true;
        }
        else if (PrevFocus[0] !== e.target) {
            PrevFocus = null;
        }
    }

    let elementEx = ["dropdown,dropdown-content", "selection-input,selection-list"];
    $.each(elementEx, function (key, value) {
        let elm = value.split(",");
        if (!$(e.target).hasClass(elm[0]) && !$(e.target).parent().hasClass(elm[0])) {
            $("." + elm[1]).fadeOut(0);
        }
    });
});

/*Show hide user info input */
$(".btn-action a").on("click", function () {
    let x = $(this).attr('name');
    if (x == 'update') {
        $(".menu-info .info").css("display", "none");
        $(".menu-info .input").css("display", "flex");
        $(".menu-info select").css("display", "block");

        $(".btn-action").css("display", "flex");
        $(this).parent().css("display", "none");
    } else if (x == 'cancel') {
        $(".menu-info .info").css("display", "block");
        $(".menu-info .input").css("display", "none");
        $(".menu-info select").css("display", "none");

        $(".btn-action").css("display", "flex");
        $(this).parent().css("display", "none");
    }
});

$(".dropdown").on("click", function () {
    if ($(this).children(".dropdown-content").is(":hidden")) {
        $(".dropdown-content").fadeOut(0);
        $(this).children(".dropdown-content").css("display", "flex").hide().fadeIn(0);
    }
    else
        $(this).children(".dropdown-content").fadeOut(0);
});


$('body').on('change','.select-box :radio', function () {
    $(".select-box").css('border', '1px solid #F4F4F4');
    $(".select-box").css('background', '#F4F4F4');

    if (this.checked) {
        $(this).parent().parent().css('border', '1px solid var(--main_color)');
        $(this).parent().parent().css('background', 'white');
    }
});

/*Hide show input password*/
function ToggleHide(obj_input, type) {
    if (navigator.userAgent.indexOf("Firefox") <= -1 || !isIOSDevice()) {
        if (type == "password") {
            $(obj_input).addClass("password");
        }
        else {
            $(obj_input).removeClass("password");
        }
    }

    if ($(obj_input).hasClass('des-input'))
        $(obj_input).prop("type", type);

    if (PrevFocus) {
        PrevFocus.focus();
    }

    if ($(obj_input + " + .input-action > .unhide").css("display") == 'flex') {
        $(obj_input + " + .input-action > .unhide").fadeOut(100).promise().done(function () {
            $(obj_input + " + .input-action > .hide").css("display", "flex").hide().fadeIn(100);
        });
    } else {
        $(obj_input + " + .input-action > .hide").fadeOut(100).promise().done(function () {
            $(obj_input + " + .input-action > .unhide").css("display", "flex").hide().fadeIn(100);
        });
    }
}
//#endregion 

//#region Input Code (mobile and desktop compatibility)

let mobile = false;
$("body").on("keydown", ".des-input-code", function (e) {
    try {
        if (e.key == "Tab") {
            e.preventDefault();
            let Next = $(this).parent().nextAll('.input-container').children('.des-input-code');
            let total = Next.length;
            //nếu total = 0 tức là không tìm được input tiếp theo và quay lại input ban đầu
            if (total != 0) {
                // focus input pincode tiếp theo
                $.each(Next, function (key, value) {
                    if (value.value == "" || total == key + 1) {
                        value.focus();
                        return false;
                    }
                });
            } else {
                //focus input pincode đầu tiên
                First = $('.input-container').first().children('.des-input-code')
                total = First.length;
                $.each(First, function (key, value) {
                    if (value.value == "" || total == key + 1) {
                        value.focus();
                        return false;
                    }
                });
            }
        }
        else if (e.keyCode !== 229) {
            mobile = false;
            let charCode = e.key;
            charCode = charCode == "Backspace" ? String.fromCharCode(8) : charCode;
            e.preventDefault();

            if (e.key == "ArrowLeft") {
                $(this).prev(".des-input-code").focus();
            }
            else if (e.key == "ArrowRight" || e.key == " ") {
                $(this).next(".des-input-code").focus();
            }
            else if (!charCode.match(/[^0-9\b]/g)) {
                if (e.key != "Backspace" && $(this).val() == "") {
                    $(this).val(e.key);
                    $(this).css("border-bottom", "1px solid var(--main_color)");
                }
                else if ($(this).val() != "") {
                    if (e.key == "Backspace") {
                        $(this).val("");
                        $(this).prev(".des-input-code").focus();
                        $(this).css("border-bottom", "1px solid #CCCFD7");
                    } else {
                        if ($(this).next(".des-input-code").val() == "") {
                            $(this).next(".des-input-code").val(e.key).focus();
                            $(this).next(".des-input-code").css("border-bottom", "1px solid var(--main_color)");
                        } else {
                            $(this).css("border-bottom", "1px solid var(--main_color)");
                        }
                    }
                    $("#pincode").val(GetInputCode("tab-code"));
                }
                else {
                    if (e.key == "Backspace") {
                        $(this).prev(".des-input-code").css("border-bottom", "1px solid #CCCFD7");
                        $(this).prev(".des-input-code").val("");
                        $(this).prev(".des-input-code").focus();
                        $("#pincode").val(GetInputCode("tab-code"));
                    }
                }

                let event = new Event('change');
                let element = document.getElementById('pincode');
                if (element) {
                    document.getElementById('pincode').dispatchEvent(event);
                }
            }
        } else {
            mobile = true;
        }

    } catch { }
});

$("body").on("keyup", ".des-input-code", function (e) {
    try {
        if (mobile) {

            if ($(this).val().match(/[^0-9]/g)) {
                $(this).val($(this).val().replace(/[^0-9]/g, ""));
                $(this).css("border-bottom", "1px solid #CCCFD7");
            }

            if (e.target.selectionStart == 0) {
                $(this).val("");
                $(this).css("border-bottom", "1px solid #CCCFD7");
                $(this).prev(".des-input-code").focus();
            }
        }
    } catch { }
});

$("body").on("input", ".des-input-code", function (e) {
    try {
        if (mobile) {

            if ($(this).val().match(/[^0-9]/g)) {
                $(this).val($(this).val().replace(/[^0-9]/g, ""));
            }

            if ($(this).val().length > 1) {
                $(this).val($(this).val().slice(0, 1));
                if ($(this).next(".des-input-code").val() == "") {
                    $(this).next(".des-input-code").val(e.originalEvent.data.slice(-1)).focus();
                    $(this).next().css("border-bottom", "1px solid var(--main_color)");
                }
            }

            if ($(this).val().length > 0) {
                $(this).css("border-bottom", "1px solid var(--main_color)");
                $("#pincode").val(GetInputCode("tab-code"));
            }

            if ($(this).val().length < 1) {
                $(this).css("border-bottom", "1px solid #CCCFD7");
                $("#pincode").val(GetInputCode("tab-code"));
            }

            let event = new Event('change');
            let element = document.getElementById('pincode');
            if (element) {
                document.getElementById('pincode').dispatchEvent(event);
            }
        }
    } catch { }
});

$("body").on("paste", ".des-input-code", function (e) {
    return false;
});

//#endregion 

//#region redirect animation function
async function Redirect(url) {
    sessionStorage.setItem("animation", "slide-in-right");

    if ($(".intro-container").length > 0) {
        await $("body").on("transitionend otransitionend webkitTransitionEnd", ".intro-container", function () {
            window.location.href = url;
            $(".intro-container").unbind("transitionend otransitionend webkitTransitionEnd");
        });

        $(".intro-container").removeClass("slide-in-right");
        $(".intro-container").addClass("slide-out-left");


    } else {
        await $("body").on("transitionend otransitionend webkitTransitionEnd", ".container", function () {
            window.location.href = url;
            $(".container").unbind("transitionend otransitionend webkitTransitionEnd");
        });

        $(".container").removeClass("slide-in-right");
        $(".container").addClass("slide-out-left");
    }
}

async function GoBack() {
    sessionStorage.setItem("animation", "slide-in-left");

    if ($(".intro-container").length > 0) {
        await $("body").on("transitionend otransitionend webkitTransitionEnd", ".intro-container", function () {
            window.history.go(-1)
            $(".intro-container").unbind("transitionend otransitionend webkitTransitionEnd");
        });

        $(".intro-container").removeClass("slide-in-right");
        $(".intro-container").addClass("slide-out-right");
    } else {
        await $("body").on("transitionend otransitionend webkitTransitionEnd", ".container", function () {
            window.history.go(-1);
            $(".container").unbind("transitionend otransitionend webkitTransitionEnd");
        });

        $(".container").removeClass("slide-in-right");
        $(".container").addClass("slide-out-right");
    }
}
//#endregion 