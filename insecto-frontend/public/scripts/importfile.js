$(document).on("change", ".custom-file-input", function (event) {
  $(this).next(".custom-file-label").html(event.target.files[0].name);
});
// https://stackoverflow.com/questions/48613992/bootstrap-4-file-input-doesnt-show-the-file-name
// answered Mar 12 '19 at 7:12
// stardust4891
