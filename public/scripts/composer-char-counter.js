$(document).ready(function () {
    $("#tweet-text").on('keyup change input', function () { //keypress blur input
        let text = $(this).val();
        if (text) {
            let tweetLength = 140 - text.length;
            if (tweetLength > 0) {
                $("#characterId").removeClass("invalid").val(tweetLength);
                $("#error-text").html("");
                $("#error-message").hide();
            } else {
                $("#characterId").addClass("invalid").val(tweetLength);
                $("#error-text").html("Tweet character should be less than 140 characters");
                $("#error-message").show();
            }
        } else {
            //if user select and cut the content(from mouse device,cut and paste operation) clear class;
            $("#characterId").removeClass("invalid").val(140);
            $("#error-text").html("");
            $("#error-message").hide();
        }
    });
})