$(window).ready( function() {
    $(".articleImage").each( function(index,image) {
        console.log($(image).children("img")[0])
    });
});