(function() {
  var resolveId = function(payload) {
    var def = $.Deferred()

    if (payload.uberId) {
      def.resolve(payload)
      return def.promise()
    }

    if (payload.displayName == model.displayName()) {
      payload.uberId = model.uberId()
      def.resolve(payload)
      return def.promise()
    }

    if (payload.displayName) {
      var user = model.users().filter(function(user) {
        return user.displayName() == payload.displayName
      })[0]
      if (user) {
        payload.uberId = user.uberId()
        def.resolve(payload)
        return def.promise()
      }
    }

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
      var exists = model.conversationMap()[pl.uberId];
      if (exists) {
        exists.minimized(false);
      } else {
        model.startConversationsWith(pl.uberId)
      }
    }, function() {
      console.log('could not identify player', payload.displayName)
    })
  }
})()
