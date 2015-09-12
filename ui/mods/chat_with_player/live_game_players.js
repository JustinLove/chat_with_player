(function() {
  model.chatWithPlayer = function(displayName) {
    api.Panel.message('uberbar', 'startChat', {
      displayName: displayName,
    })
  }

  $('.me .div_player_name').replaceWith('<div data-bind="foreach: slots">'+
    '<img src="coui://ui/main/shared/img/social/chat.png" data-bind="click: function(slot, e) {$root.chatWithPlayer(slot); e.stopPropagation()}"></img>'+
    '<div class="div_player_name" data-bind="text: $data, style: { color: $parent.disconnected ? \'DarkGray\' : \'White\', color: $parent.defeated ? \'Red\' + $parent.text - $parent.shadow : $parent.defeated ? \'0px 0px 10px #f00\' : \'\' }"></div>'+
  '</div>')
})()
