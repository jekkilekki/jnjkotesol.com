$( function() {
    $.getJSON( 'api', updateFeedback );

    $( '.feedback-form' ).submit( function(e) {
        e.preventDefault();

        if ( e.target.id == 'negative-feedback' ) {
          rating = 'negative';
        } else {
          rating = 'positive';
        }

        $.post( 'api', {
            name: $( '#feedback-form-name' ).val(),
            title: $( '#feedback-form-title' ).val(),
            message: $( '#feedback-form-message' ).val(),
            feedbackType: rating
        }, updateFeedback );
    });

    $( '.feedback-messages' ).on( 'click', function(e) {
        if ( e.target.className == 'fa fa-times' ) {
            $.ajax({
                url: 'api/' + e.target.id,
                type: 'DELETE',
                success: updateFeedback
            }); // ajax
        } // the target is a delete button
    }); // feedback messages

    function updateFeedback( data ) {
        var output = '';
        $.each( data, function( key, item ) {

        output += '    <li class="feedback-item item-list media-list">';
        output += '        <div class="feedback-item media">';

        // Positive OR Negative button
        if ( item.feedbackType == 'negative' ) {
          output += '         <button class="button button-small button-inverse negative-feedback"><i class="fa fa-thumbs-down"></i></button>';
        } else {
          output += '         <button class="button button-small negative-feedback"><i class="fa fa-thumbs-up"></i></button>';
        }

        output += '         <button class="feedback-delete button button-small button-inverse"><span id="' + key + '" class="fa fa-times"></span></button>';

        output += '            <div class="feedback-info media-body">';
        output += '                <div class="feedback-head">';
        output += '                    <div class="feedback-title">' + item.title + '<small class="feedback-name label label-info">' + item.name + '</small></div>';
        output += '                </div>';
        output += '                <div class="feedback-message">' + item.message + '</div>';
        output += '            </div>';
        output += '        </div>';
        output += '    </li>';

        });

        $( '.feedback-messages' ).html( output );
    }
});
