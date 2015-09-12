(function() {
  model.chatWithPlayer = function(displayName) {
    api.Panel.message('uberbar', 'startChat', {
      displayName: displayName,
    })
  }

  $('.me .div_player_name').replaceWith('<div data-bind="foreach: slots" class="chat_with_player_container">'+
    '<img class="chat_with_player" src="coui://ui/main/shared/img/social/chat.png" data-bind="click: function(slot, e) {$root.chatWithPlayer(slot); e.stopPropagation()}"></img>'+
    '<div class="div_player_name" data-bind="text: $data, style: { color: $parent.disconnected ? \'DarkGray\' : \'White\', color: $parent.defeated ? \'Red\' + $parent.text - $parent.shadow : $parent.defeated ? \'0px 0px 10px #f00\' : \'\' }"></div> '+
  '</div>')

  $('.tbl_alliance_mode .div_player_name.truncate, .div_player_item.team .div_player_name.truncate').replaceWith('<div data-bind="foreach: slots" class="chat_with_player_container">'+
    '<img class="chat_with_player" src="coui://ui/main/shared/img/social/chat.png" data-bind="visible: !$parent.ai, click: function(slot, e) {$root.chatWithPlayer(slot); e.stopPropagation()}"></img>'+
    '<div class="div_player_name truncate" data-bind="text: $data, css: { color_disconnected: $parent.disconnected, color_negative: $parent.defeated }"> '+
  '</div>')

  $('.div_spectator_player_info .color_negative').replaceWith('<div data-bind="foreach: slots" class="chat_with_player_container">'+
    '<img class="chat_with_player" src="coui://ui/main/shared/img/social/chat.png" data-bind="visible: !$parent.ai, click: function(slot, e) {$root.chatWithPlayer(slot); e.stopPropagation()}"></img>'+
    '<span data-bind="text: $data" class="color_negative"></span>'+
  '</div>')

  $('.div_spectator_player_info .color_normal').replaceWith('<div data-bind="foreach: slots" class="chat_with_player_container">'+
    '<img class="chat_with_player" src="coui://ui/main/shared/img/social/chat.png" data-bind="visible: !$parent.ai, click: function(slot, e) {$root.chatWithPlayer(slot); e.stopPropagation()}"></img>'+
    '<span data-bind="text: $data" class="color_normal"></span>'+
  '</div>')
})()
