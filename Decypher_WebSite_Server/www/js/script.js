$(document).ready(function() {
    initSwiper();
    $(window).on('scroll', animateMetricsMatter);
    $(window).on('scroll', animateServicesDevTheory);

    nav_links_menu_slide();
    setStudyTitle("btn_read_more_1");
});

$("#btn_home_scroll_down").click(handleHomeScrollDown);
$('.top-btn').click(handleTopButtonClick);
$(window).scroll(handleTopButton);

let animComplete = false;

function handleHomeScrollDown() {
    let main_home_metrics_matter = $("#div_home_metrics_matter");
    let main_home_metrics_matter_top = main_home_metrics_matter.offset().top - 200;
    $('html, body').animate({
        scrollTop: main_home_metrics_matter_top
    }, 700);
}

function handleTopButton() {
    if ($(this).scrollTop() > 200) {
        $('.top-btn').fadeIn(200);
    } else {
        $('.top-btn').fadeOut(200);
    }
}

function handleTopButtonClick() {
    $('html, body').animate({scrollTop : 0},700);
    return false;
}

function animateMetricsMatter() {
    if ($(window).width() <= 768) {
        return;
    }

    let parentDiv = $('#div_home_metrics_matter');
    let div1 = $('#div_home_metrics_matter_left');
    let div2 = $('#div_home_metrics_matter_right');

    if (parentDiv.length) {
        let parentDivTop = parentDiv.offset().top;
        let windowTop = $(window).scrollTop();

        if (windowTop > (parentDivTop - $(window).height()) && !animComplete) {
            animComplete = true;
            div1.addClass('slide-in-left');
            div2.addClass('slide-in-right');
        }
    }
}

function animateServicesDevTheory() {
    if ($(window).width() <= 768) {
        return;
    }

    let parentDiv = $('#div_services_dev_theory');
    let div1 = $('#div_services_dev_theory_left');
    let div2 = $('#div_services_dev_theory_right');

    if (parentDiv.length) {
        let parentDivTop = parentDiv.offset().top;
        let windowTop = $(window).scrollTop();

        if (windowTop > (parentDivTop - $(window).height()) && !animComplete) {
            animComplete = true;
            div1.addClass('slide-in-left');
            div2.addClass('slide-in-right');
        }
    }

    console.log("Animating services dev theory");
}

function nav_links_menu_slide() {
    $(".div_hamburger_nav_links_menu_icon").click(function () {
        $(".div_hamburger_nav_links_menu_icon").toggleClass("active");
        if ($(window).width() <= 600) {
            $(".div_hamburger_nav_links_menu").animate({
                top: "toggle"
            }).toggleClass("active");
        } else {
            $(".div_hamburger_nav_links_menu").animate({
                right: "toggle"
            }).toggleClass("active");
        }
    });

    $(window).resize(function () {
        if ($(window).width() <= 600) {
            $(".div_hamburger_nav_links_menu").css({"right": "", "display": ""});
        } else {
            $(".div_hamburger_nav_links_menu").css({"top": "", "display": ""});
        }
    });
}

$("#ti_phone_number, #ti_case_studies_phone_number").kendoMaskedTextBox({
    mask: "000-000-0000"
});

function resetContactForm() {
    $("#ti_first_name").val('');
    $("#ti_last_name").val('');
    $("#ti_company").val('');
    $("#ti_email_address").val('');
    $("#ti_phone_number").val('');
    $("#ta_message").val('');
    $('#sp_contact_form_content_confirmation_text').hide();
    $('#sp_contact_required_first_name_message').hide();
    $('#sp_contact_required_last_name_message').hide();
    $('#sp_contact_required_email_message').hide();
}

function resetCaseStudyForm(){
    $('#ti_case_studies_first_name').val('');
    $('#ti_case_studies_last_name').val('');
    $('#ti_case_studies_company').val('');
    $('#ti_case_studies_email_address').val('');
    $('#ti_case_studies_phone_number').val('');
    $('#ta_case_studies_message').val('');
    $('#sp_case_studies_form_content_confirmation_text').hide();
    $('#sp_case_studies_required_first_name_message').hide();
    $('#sp_case_studies_required_last_name_message').hide();
    $('#sp_case_studies_required_email_message').hide();
}

$(document.body).on("click", "#btn_contact_form_content_send", function() {
    // Validate first name
    let firstName = $("#ti_first_name").val();
    // Validate last name
    let lastName = $("#ti_last_name").val();
    // Validate email address format
    let email = $("#ti_email_address").val();

    // Check if all fields meet the criteria
    if (!isValidName(firstName) || !isValidName(lastName) || !isValidEmail(email)) {
        // Display specific error messages for each field
        if (!isValidName(firstName)) {
            $('#sp_contact_required_first_name_message').text("First name is required").show();
            $('#sp_contact_required_last_name_message').hide();
            $('#sp_contact_required_email_message').hide();
            $('#sp_contact_form_content_confirmation_text').hide();
        } else if (!isValidName(lastName)) {
            $('#sp_contact_required_last_name_message').text("Last name is required").show();
            $('#sp_contact_required_first_name_message').hide();
            $('#sp_contact_required_email_message').hide();
            $('#sp_contact_form_content_confirmation_text').hide();
        } else if (!isValidEmail(email)) {
            $('#sp_contact_required_email_message').text("Please enter a valid email address").show();
            $('#sp_contact_required_first_name_message').hide();
            $('#sp_contact_required_last_name_message').hide();
            $('#sp_contact_form_content_confirmation_text').hide();
        }
        return;
    } else {
        // Hide all error messages if requirements are met
        $('#sp_contact_required_first_name_message').hide();
        $('#sp_contact_required_last_name_message').hide();
        $('#sp_contact_required_email_message').hide();
        $('#sp_contact_form_content_confirmation_text').show();
    }

    // If all validations pass, proceed with the form submission
    let parameters = {
        first_name: firstName,
        last_name: lastName,
        company: $("#ti_company").val(),
        email_address: email,
        phone_number: $("#ti_phone_number").val(),
        message: $("#ta_message").val()
    };

    $.ajax({
        url: "/contact_form_send",
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(parameters),
        success: function (data) {
            // Display confirmation text
            $('#sp_contact_form_content_confirmation_text').show();
        },
        error: function (msg) {
            console.error(msg.responseText);
        }
    });
});

$(document.body).on("click", "#btn_case_studies_contact_form_content_send", function() {
    // Validate first name
    let firstName = $("#ti_case_studies_first_name").val();
    // Validate last name
    let lastName = $("#ti_case_studies_last_name").val();
    // Validate email address format
    let email = $("#ti_case_studies_email_address").val();

    // Check if all fields meet the criteria
    if (!isValidName(firstName) || !isValidName(lastName) || !isValidEmail(email)) {
        // Display specific error messages for each field
        if (!isValidName(firstName)) {
            $('#sp_case_studies_required_first_name_message').text("First name is required").show();
            $('#sp_case_studies_required_last_name_message').hide();
            $('#sp_case_studies_required_email_message').hide();
            $('#sp_case_studies_form_content_confirmation_text').hide();
        } else if (!isValidName(lastName)) {
            $('#sp_case_studies_required_last_name_message').text("Last name is required").show();
            $('#sp_case_studies_required_first_name_message').hide();
            $('#sp_case_studies_required_email_message').hide();
            $('#sp_case_studies_form_content_confirmation_text').hide();
        } else if (!isValidEmail(email)) {
            $('#sp_case_studies_required_email_message').text("Please enter a valid email address").show();
            $('#sp_case_studies_required_first_name_message').hide();
            $('#sp_case_studies_required_last_name_message').hide();
            $('#sp_case_studies_form_content_confirmation_text').hide();
        }
        return;
    } else {
        // Hide all error messages if requirements are met
        $('#sp_case_studies_required_first_name_message').hide();
        $('#sp_case_studies_required_last_name_message').hide();
        $('#sp_case_studies_required_email_message').hide();
        $('#sp_case_studies_form_content_confirmation_text').show();
    }

    // If all validations pass, proceed with the form submission
    let parameters = {
        first_name: firstName,
        last_name: lastName,
        company: $("#ti_case_studies_company").val(),
        email_address: email,
        phone_number: $("#ti_case_studies_phone_number").val(),
        message: $("#ta_case_studies_message").val()
    };

    $.ajax({
        url: "/case_studies_form_send",
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(parameters),
        success: function (data) {
            // Display confirmation text
            $('#sp_case_studies_form_content_confirmation_text').show();
        },
        error: function (msg) {
            console.error(msg.responseText);
        }
    });
});

// Function to validate name (at least 2 characters)
function isValidName(name) {
    return name.length >= 2 && /^[A-Za-z]+$/.test(name);
}

// Function to validate email format
function isValidEmail(email) {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Event listener for beforeunload to reset the form
$(window).on('beforeunload', function () {
    resetContactForm();
});


$(document.body).on("click", "#btn_contact_form_content_clear", function() {
    resetContactForm();
});


$(document.body).on("click", "#btn_case_studies_contact_form_content_clear", function() {
    resetCaseStudyForm();
});





$(document.body).on("click", ".btn_read_more_1, .btn_read_more_3, .btn_read_more_4, .swiper-pagination-bullet", function() {
    let buttonClass;
    if ($(this).hasClass('swiper-pagination-bullet')) {
        let index = $(this).index();
        switch(index) {
            case 0:
                buttonClass = 'btn_read_more_1';
                break;
            case 1:
                buttonClass = 'btn_read_more_3';
                break;
            case 2:
                buttonClass = 'btn_read_more_4';
                break;
        }
    } else {
        buttonClass = $(this).attr('class').split(' ')[1];
    }
    setStudyTitle(buttonClass);
});

function setStudyTitle(buttonClass) {
    let titleContent;
    let buttonContent;
    let minHeight;

    // Remove the highlight-active class from all card-highlight elements
    $(".card-hightlight").removeClass("highlight-active");
    $(".swiper-pagination-bullet").removeClass("swiper-pagination-bullet-active");

    let index;

    switch(buttonClass) {
        case "btn_read_more_1":
            index = 0;
            titleContent = "<h1 class='sp_card-content'>Allstate - Awards & Performance Tool</h1>";
            buttonContent = `<p>A top US insurance company needed custom reporting software for diverse stakeholders. Existing vendor tools didn't meet specific needs. We built a custom dashboard and reporting application that engaged stakeholders from agency staff to executives with tailored reporting.</p><p>Application continues to be in use years after implementation.</p>`;
            minHeight = "20rem";
            updateProcessListItems("btn1");
            break;
        case "btn_read_more_3":
            index = 1;
            titleContent = "<h1 class='sp_card-content'>Mopar/Diamlar Chrysler</h1>";
            buttonContent = `<p>In 2006, a major automotive OEM embarked on the development of an in-house Enterprise Resource Planning (ERP) application. Unfortunately, the application suffered from significant design flaws, exhibiting unresponsiveness, sluggish performance, and limited user capacity. Moreover, its adaptability was compromised, hindering the integration of desired add-ons.</p><p>The primary challenge was to construct an ERP application that allowed secure and collaborative real-time work across multiple regions.</p>`;
            minHeight = "25rem";
            updateProcessListItems("btn3");
            break;
        case "btn_read_more_4":
            index = 2;
            titleContent = "<h1 class='sp_card-content'>BaseRatio Case Study</h1>";
            buttonContent = `<p>Insurance Companies in the US spend billions of dollars annually on marketing. One of the largest marketing expenditures is on new business leads. Decypher was approached by a top 5 nationally ranked insurance company to evaluate and develop a lead prioritization process. </p>`;
            minHeight = "18rem";
            updateProcessListItems("btn4");
            break;
        default:
            minHeight = "auto";
            break;
    }

    console.log("Setting min-height to: " + minHeight);

    $("#sp_main_case_studies_about_study_title").html(titleContent);
    $("#sp_main_case_studies_about_study_description").html(buttonContent);
    $("#div_main_case_studies_about_study").css("min-height", minHeight);

    // Add highlight-active class to the card-highlight of the selected card
    $(".btn_read_more_" + buttonClass.split("_")[3])
        .closest(".card")
        .find(".card-hightlight")
        .addClass("highlight-active");

    // Add active class to the corresponding Swiper pagination bullet
    $(".swiper-pagination-bullet").eq(index).addClass("swiper-pagination-bullet-active");
}





function updateProcessListItems(button) {
    // Define the content for each button
    let listContent;
    switch(button) {
        case "btn1":
            listContent = `
                <ol>
            <li>
              <h3>Challenge Addressed:</h3>
              <ul>
                <li>
                  A top US insurance company needed custom reporting software for diverse stakeholders. Existing vendor tools didn't meet specific needs, and in-house development faced constraints.
                </li>
              </ul>
            </li>

            <li>
              <h3>Strategic Collaboration:</h3>
              <ul>
                <li>
                  Enlisted Decypher Corporation due to their success with similar projects. Collaboration navigated internal IT standards and requirements for seamless integration.
                </li>
              </ul>
            </li>

            <li>
              <h3>Swift and Effective Solution:</h3>
              <ul>
                <li>
                  Decypher developed a custom application meeting stringent requirements. Application supported over 40,000 users with 10K concurrent users, exceeding expectations.
                </li>
              </ul>
            </li>

            <li>
              <h3>Comprehensive Tools Added:</h3>
              <ul>
                <li>
                  Custom dashboard and reporting application for performance tracking. Application engaged stakeholders from agency staff to executives with tailored reporting
                </li>
              </ul>
            </li>

            <li>
              <h3>Successful Outcome:</h3>
              <ul>
                <li>
                  Application continues to be in use years after implementation. Lessons learned emphasize the value of strategic partnerships in overcoming complex challenges.
                </li>
              </ul>
            </li>
          </ol>
            `;
            break;
        /*case "btn2":
            listContent = `
                <ol>
                    <li>
                        <h3>New Strategic Collaboration:</h3>
                        <ul>
                            <li>A top 5 insurance company worked with Decypher to develop a more effective, competitive lead prioritization process.</li>
                        </ul>
                    </li>
                    <!-- Add more li elements as needed -->
                </ol>
            `;
            break;*/
        case "btn3":
            listContent = `
                <ol>
                    <li>
                        <h3>Challenge Addressed:</h3>
                        <ul>
                            <li>
                                Overcoming major design flaws and limitations in an in-house
                                ERP application for a leading automotive OEM.
                            </li>
                        </ul>
                    </li>

                    <li>
                        <h3>Strategic Collaboration:</h3>
                        <ul>
                            <li>
                                Engaging the entire division to collaboratively identify
                                requirements for a robust ERP application to facilitate
                                real-time work across multiple regions.
                            </li>
                        </ul>
                    </li>

                    <li>
                        <h3>Swift and Effective Solution:</h3>
                        <ul>
                            <li>
                                Choosing Decypher to swiftly execute the build, delivering a
                                fully functional ERP application in under six months.
                            </li>
                        </ul>
                    </li>

                    <li>
                        <h3>Comprehensive Tools Added:</h3>
                        <ul>
                            <li>
                                Post-launch, responding to user needs with additional tools,
                                including multi-department planning, milestone collaboration,
                                finance evaluation, and inventory control.
                            </li>
                        </ul>
                    </li>

                    <li>
                        <h3>Successful Outcome:</h3>
                        <ul>
                            <li>
                                Decypher's involvement resulted in a successful platform
                                launch, meeting client needs, reducing costs, and enhancing
                                overall business management
                            </li>
                        </ul>
                    </li>
                </ol>
            `;
            break;
        case "btn4":
            listContent = `
                <ol>
            <li>
              <h3>Challenge Addressed:</h3>
              <ul>
                <li>
                Traditional lead prioritization methods in the insurance industry target the same consumers as competitors, leading to inefficiency.                
                </li>
              </ul>
            </li>

            <li>
              <h3>Strategic Collaboration:</h3>
              <ul>
                <li>
                  A top 5 insurance company worked with Decypher to develop a more effective, competitive lead prioritization process.
                </li>
              </ul>
            </li>

            <li>
              <h3>Swift and Effective Solution:</h3>
              <ul>
                <li>
                  Decypher focused on unique geographic factors to target marketing efforts where the company was most competitive.
                </li>
              </ul>
            </li>

            <li>
              <h3>Comprehensive Tools Added:</h3>
              <ul>
                <li>
                  BaseRatio was created to map out and analyze competitive regions, guiding strategic lead purchasing.
                </li>
              </ul>
            </li>

            <li>
              <h3>Successful Outcome:</h3>
              <ul>
                <li>
                  The company improved marketing efficiency, saved costs, and gained a competitive advantage using BaseRatio insights.
                </li>
              </ul>
            </li>
          </ol>
            `;
            break;
        default:
            // If no matching button is found, do nothing
            return;
    }
    $("#div_main_case_studies_process_left_list_container").html(listContent);
}
