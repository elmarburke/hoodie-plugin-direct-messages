Hoodie.extend(function(hoodie) {
  
  function send( messageData ) {
    var defer = hoodie.defer();

    hoodie.task.start('direct-message', messageData)
    .done( function(messageTask) {
      hoodie.task.on('remove:direct-message:'+messageTask.id, defer.resolve);
      hoodie.task.on('error:direct-message:'+messageTask.id, defer.reject);
    })
    .fail( defer.reject );

    return defer.promise();
  }
  
  function findAll(){
    var defer = hoodie.defer();
    hoodie.store.findAll('message')
    .done(defer.resolve)
    .fail(defer.reject)

    return defer.promise();
  }
  
  function on( eventName, callback ) {
    hoodie.task.on( eventName + ':direct-message', callback);
  }
  console.log("HERE");
  hoodie.directMessages = {
    send: send,
    findAll: findAll,
    on: on
  }
);