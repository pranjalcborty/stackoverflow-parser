$(function () {
    var availableTags = [
        "actionscript", "applescript", "asp", "basic", "c", "c++",
        "clojure", "cobol", "go", "erlang", "fortran",
        "groovy", "haskell", "java", "javascript", "lisp", "perl",
        "php", "python", "ruby", "scala", "scheme", "android"
    ];

    $(".autocomplete").autocomplete({
        source: availableTags
    });

    $('#tag').keypress(function (e) {
        if (e.which == 13) {
            $('#tagSubmit').click();
        }
    });

    $("#tagSubmit").click(function () {
        var tag = $("#tag").val();
        tag = tag != "" ? tag : "android";

        $("table tbody").remove();
        $("table").append(
            "<tbody>" +
            "   <tr>" +
            "       <td>" +
            "           <div class=\'text-center\'>" +
            "               <div class=\'spinner-border text-success text-center\' role=\'status\'>" +
            "                   <span class=\'sr-only\'>Loading...</span>" +
            "               </div>" +
            "           </div>" +
            "       </td>" +
            "  </tr>" +
            "</tbody>"
        );

        populateTable("top", tag);
        populateTable("new", tag);
    });

    function populateTable(identifier, tag) {
        $.getJSON("/" + identifier, { "tag": tag }).done(function (data) {
            var trHTML = "<tbody>";

            $.each(data, function (i, item) {
                trHTML += "<tr>"
                    + "<td>" + item["title"] + "</td>"
                    + "<td><button type='button' class='btn btn-primary'"
                    + " data-target='#modal'"
                    + " data-toggle='modal'"
                    + " data-url='" + item["url"] + "'>Details"
                    + "</td>"
                    + "</tr>";
            });

            $("#" + identifier + " tbody").remove();
            $("#" + identifier).append(trHTML + "</tbody>");
        });
    }

    $('#modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var url = button.data('url');
        var modal = $(this);

        $("#loader").show();

        modal.find('.modal-title').text("");
        modal.find('#main-post').html("");
        modal.find('#url-display').attr("href", "#");
        modal.find('#answer').attr("class", "").html("");

        $.getJSON("/details", { "url": url }).done(function (data) {
            $("#loader").hide();

            modal.find('.modal-title').text("Posted by: " + data["user"]);
            modal.find('#main-post').html(data["post"]);
            modal.find('#url-display').attr("href", url);

            if (data["answer"] != "") {
                modal.find('#answer')
                    .attr("class", "jumbotron")
                    .attr("style", "padding: 2rem")
                    .html("<h4>Accepted answer</h4><p>" + data["answer"] + "</p>");
            }
        });
    })
});