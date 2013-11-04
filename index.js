module.exports = function(hoodie) {
  
  console.log("TEST!!!!!");
  
  hoodie.task.on('add:direct-message', handleNewMessage);

  function handleNewMessage(originDb, message) {
    var recipient = message.to;

    hoodie.account.find('user', recipient, function(error, user) {
      if (error) {
        return hoodie.task.error(originDb, message, error);
      };

      var targetDb = "user/" + user.ownerHash;
      hoodie.database(targetDb).add('message', message, addMessageCallback);
      hoodie.task.success(originDb, message, handleError);
    });
  };

  function addMessageCallback(error, object) {};
};
