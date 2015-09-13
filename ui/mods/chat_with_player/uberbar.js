(function() {
  var resolveId = function(payload) {
    var def = $.Deferred()

    if (payload.uberId) {
      model.maybeCreateNewContactWithId(payload.uberId)
      payload.user = model.idToContactMap()[payload.uberId]
      def.resolve(payload)
      return def.promise()
    }

    if (payload.displayName == model.displayName()) {
      payload.uberId = model.uberId()
      payload.user = model.idToContactMap()[payload.uberId]
      payload.user.allowChat = function() {return true}
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
      } else {
        // not actually display name, but some people will match
        engine.asyncCall('ubernet.call',
            '/GameClient/UserId?' +  $.param({ UberName: payload.displayName }),
            false)
          .done(function (data) {
            var result = JSON.parse(data);
            payload.uberId = result.UberId
            model.maybeCreateNewContactWithId(payload.uberId)
            payload.user = model.idToContactMap()[payload.uberId]
            def.resolve(payload)
          })
          .fail(function (data) {
            console.log('could not identify player', payload.displayName)
            def.reject()
          });
        return def.promise()
      }
    }

    console.log('could not identify player')
    return def.promise()
  }

  handlers.sendChat = function(payload) {
    resolveId(payload).then(function(pl) {
      if (pl.user && !pl.user.allowChat()) {
        jabber.sendCommand(pl.uberId, 'chat_invite');
      }
      jabber.sendChat(pl.uberId, pl.message)
    })
  }

  var startChatWithUberId = function(uberId) {
    var exists = model.conversationMap()[uberId];
    if (exists) {
      exists.minimized(false);
    } else {
      model.startConversationsWith(uberId)
    }
  }

  handlers.startChat = function(payload) {
    resolveId(payload).then(function(pl) {
      model.showUberBar(true)

      if (pl.user) {
        if (pl.user.allowChat()) {
          pl.user.startChat()
        } else {
          pl.user.sendChatInvite()
        }
      } else {
        startChatWithUberId(pl.uberId)
      }
    })
  }

  handlers.sendChatInvite = function(payload) {
    resolveId(payload).then(function(pl) {
      if (pl.user) {
        model.showUberBar(true)
        pl.user.sendChatInvite()
      } else if (pl.uberId) {
        startChatWithUberId(pl.uberId)
        jabber.sendCommand(pl.uberId, 'chat_invite');
      }
    })
  }
})()
