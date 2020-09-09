$(document).ready(function () {
    $("#tweet-text").on('keyup change ', function () { //keypress blur input
        console.log($(this).val());
        let text = $(this).val();

        if (text) {
            let tweetLength = 140 - text.length;
            if (tweetLength > 0) {
                $("#characterId").removeClass("invalid").val(tweetLength);
            }
            else {
                $("#characterId").addClass("invalid").val(tweetLength);
            }
        }
        else {
            //if user select and cut the content clear class;
            $("#characterId").removeClass("invalid").val(140);
        }
    });
})