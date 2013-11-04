module.exports = function(hoodie) {
  
  hoodie.task.on('add:directmessage', handleNewMessage);

  function handleNewMessage(originDb, message) {
    var recipient = message.to;

    hoodie.account.find('user', recipient, function(error, user) {
      if (error) {
        return hoodie.task.error(originDb, message, error);
      };

      var targetDb = "user/" + user.ownerHash;
      
      delete message._id;
      delete message._rev;
      
      hoodie.database(targetDb).add('message', message, addMessageCallback);
      console.log(targetDb, message);
      hoodie.task.success(originDb, message, handleError);
    });
  };
  
  function handleError(error) {};
  
  function addMessageCallback(error, object) {};
};
