(function() {
  var resolveId = function(payload) {
    var def = $.Deferred()

    if (payload.uberId) {
      payload.user = model.idToContactMap()[payload.uberId]
      def.resolve(payload)
      return def.promise()
    }

    if (payload.displayName == model.displayName()) {
      payload.uberId = model.uberId()
      payload.user = model.idToContactMap()[payload.uberId]
      def.resolve(payload)
      return def.promise()
    }

    if (payload.displayName) {
      var user = model.users().filter(function(user) {
        return user.displayName() == payload.displayName
      })[0]
      if (user) {
        payload.user = user
        payload.uberId = user.uberId()
        def.resolve(payload)
        return def.promise()
      }
    }

    console.log('could not identify player', payload.displayName)
    def.reject()
    return def.promise()
  }

  handlers.sendChat = function(payload) {
    resolveId(payload).then(function(pl) {
      //console.log(pl.uberId)
      jabber.sendChat(pl.uberId, pl.message)
    }, function() {
      console.log('could not identify player', payload.displayName)
    })
  }

  handlers.startChat = function(payload) {
    resolveId(payload).then(function(pl) {
      model.showUberBar(true)
      var exists = model.conversationMap()[pl.uberId];
      if (exists) {
        exists.minimized(false);
      } else {
        model.startConversationsWith(pl.uberId)
      }
    })
  }

  handlers.sendChatInvite = function(payload) {
    resolveId(payload).then(function(pl) {
      if (pl.user) {
        model.showUberBar(true)
        pl.user.sendChatInvite()
      } else if (pl.uberId) {
        handlers.startChat(payload)
        jabber.sendCommand(pl.uberId, 'chat_invite');
      }
    })
  }
})()
