window.SubmitLogin = () => {
    //$("#LoginForm").submit(function () { console.log("submit") });
    $('#LoginForm').trigger('submit');
};

function isIOSDevice(){
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
 }

$(document).ready(function() {
    var animate = sessionStorage.getItem("animation");
    if(animate !== null && animate !== "") {
        $(".container").removeClass("fade-in");
        $(".container").addClass(animate);
        $(".intro-container").removeClass("fade-in");
        $(".intro-container").addClass(animate);
        sessionStorage.removeItem("animation");
    }

    // if(isIOSDevice()) {
    //     $('input[type=text].des-input.password').prop("type", "password");
    //     $('input[type=password].des-input.password').removeClass("password");
    // }
});

function ContinueUsername() {
    var user = $('#username').val();
    if (user == "") {
        DisplayError();
    }
    else {
        HideError();
    }
}
function ContinuePassword() {
    var passType = $('input[name=tab]:checked', '#LoginForm').attr('id');
    var pass = $("input[name=Password]", '#LoginForm').val()
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
function DisplayError() {
    $(".input-error").css("display", "flex").hide().fadeIn(150);
    $(".des-error").css("display", "flex").hide().fadeIn(150);
}
function HideError() {
    $(".input-error").css("display", "flex").hide();
    $(".des-error").css("display", "flex").hide();
}

$("body").on("keyup", ".username", function (event) {
    var user = $(this).val();
    if (user == "") {
        if ($('.clear-input').css("display") == 'flex')
            $('.clear-input').fadeOut(100);
    } else {
        if ($('.clear-input').css("display") == 'none')
            $('.clear-input').css("display", "flex").hide().fadeIn(100);
    }
});

$("body").on("click", ".clear-input", function (event) {
    $(this).parent().parent().find("input").val("");
    $(this).css('display', 'none');
    if (PrevFocus) {
        PrevFocus.focus();
    }
});

function close() {
    $(".des-modal").fadeOut();
    $(".des-modal-background").fadeOut();
}

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

var PrevFocus = null;
$("body").on("focus", ".des-input-code", function () {
    PrevFocus = $(this);
});

$("body").on("focus", ".des-input", function () {
    PrevFocus = $(this);
});

var origin_val = null;
var origin_index = null;
$("body").on("keydown", ".des-input", function (e) {
    if(e.keyCode === 32)
        e.preventDefault();
    else {
        origin_index = $(this)[0].selectionStart + 1;
        if($(this)[0].selectionStart === 0) {
            origin_val = null;
        }
    }
    
});

$("body").on("input", ".des-input", function (e) {
    PrevFocus = $(this);
    var start = $(this)[0].selectionStart;
    var end = $(this)[0].selectionEnd;

    //lọc whitespace và lấy giá trị con trỏ
    if($(this).val().match(/\s/)) {
        var space_num = ($(this).val().match(/\s/g) || []).length
        start -= space_num;
        end -= space_num;
    }

    //xoá bỏ hết whitespace
    var value = $(this).val().toString().replaceAll(" ", "");
    if(origin_val !== null && origin_index !== null) {
        if(e.originalEvent.data !== null && e.originalEvent.data !== " " && e.originalEvent.data !== $(this).val().substr(0 , start)) {
            value = insert(origin_val, origin_index - 1, e.originalEvent.data.slice(-1));
            start = origin_index;
            end = origin_index;
            origin_index = null;
            origin_val = null;
        }
    }

    if(e.originalEvent.data === " ") {
        origin_val = value;
    }
    
    $(this).val(value);
    $(this)[0].selectionStart = start;
    $(this)[0].selectionEnd = end;
});

function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

$(document).on('click', function (e) {
    if (PrevFocus) {
        if($(e.target).hasClass("eye-input") || $(e.target).parent().hasClass("eye-input")) {
            return true;
        }
        else if (PrevFocus[0] !== e.target) {
            PrevFocus = null;
        }
    }
});

if(navigator.userAgent.indexOf("Firefox") > -1 ) {
    $(".des-input.password, .des-input-code.password").prop("type", "password");
    $(".des-input.password, .des-input-code.password").removeClass("password");
}

function ToggleHide(obj_input, type) {
    if(isIOSDevice() && $(obj_input).hasClass('password')) {
        $(obj_input).ToggleClass("password");  
    }
    else if (navigator.userAgent.indexOf("Firefox") > -1) {
        $(obj_input).removeClass("password");
    } else {
        if (type == "password") {
            $(obj_input).addClass("password");       
        }
        else {
            $(obj_input).removeClass("password");
        }
    }

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

$(".select-box").first().css('border', '1px solid var(--main_color)');
$(".select-box").first().css('background', 'white');

$('.select-box :radio').change(function () {
    $(".select-box").css('border', '1px solid #F4F4F4');
    $(".select-box").css('background', '#F4F4F4');

    if (this.checked) {
        $(this).parent().parent().css('border', '1px solid var(--main_color)');
        $(this).parent().parent().css('background', 'white');
    }
});

var mobile = false;

$("body").on("keydown", ".des-input-code", function (e) {
    try {
        if (e.keyCode !== 229) {
            mobile = false;
            var charCode = e.key;
            charCode = charCode == "Backspace" ? String.fromCharCode(8) : charCode;
            e.preventDefault();

            //$("#test").html(e.keyCode + " , " + e.key);

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
                }
                else {
                    if (e.key == "Backspace") {
                        $(this).prev(".des-input-code").css("border-bottom", "1px solid #CCCFD7");
                        $(this).prev(".des-input-code").val("");
                        $(this).prev(".des-input-code").focus();
                    }
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
            }

            if ($(this).val().length < 1) {
                $(this).css("border-bottom", "1px solid #CCCFD7");
            }
        }
    } catch { }
});

async function Redirect(url) {
    sessionStorage.setItem("animation", "slide-in-right");
    
    if($(".intro-container").length > 0) {
        await $("body").on("transitionend otransitionend webkitTransitionEnd",".intro-container", function () {
            window.location.href = url;
            $(".intro-container").unbind("transitionend otransitionend webkitTransitionEnd");
        });

        $(".intro-container").removeClass("slide-in-right");
        $(".intro-container").addClass("slide-out-left");

        
    } else {
        await $("body").on("transitionend otransitionend webkitTransitionEnd",".container", function () {
            window.location.href = url;
            $(".container").unbind("transitionend otransitionend webkitTransitionEnd");
        });

        $(".container").removeClass("slide-in-right");
        $(".container").addClass("slide-out-left"); 
    } 
}

async function GoBack() {
    sessionStorage.setItem("animation", "slide-in-left");

    if($(".intro-container").length > 0) {
        await $("body").on("transitionend otransitionend webkitTransitionEnd",".intro-container", function () {
            window.history.go(-1)
            $(".intro-container").unbind("transitionend otransitionend webkitTransitionEnd");
        });

        $(".intro-container").removeClass("slide-in-right");
        $(".intro-container").addClass("slide-out-right");
    } else {
        await $("body").on("transitionend otransitionend webkitTransitionEnd",".container", function () {
            window.history.go(-1);
            $(".container").unbind("transitionend otransitionend webkitTransitionEnd");
        });

        $(".container").removeClass("slide-in-right");
        $(".container").addClass("slide-out-right");
    }
}



