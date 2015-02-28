/*
the storage data structure
type1: {key: value}
type2: {key:value, key2: value2}

pluginTool: define a tool , convenient to call chrome API
  > fun read()  @type , @callback
  > fun add()   @type , @key , @value
  > fun clear()  No argument , will clear all storage data
*/



window.pluginTool = (function($,window) {
  var storage = chrome.storage.local;

  function readOption (type, callback) {
    storage.get(type, callback);
  }

  function addData (type, key, value) {
    // first you should read old option
    readOption(type, function(data) {
      // then decode data to a object
      var obj;
      if(!$.isEmptyObject(data[type])) {
        obj = $.parseJSON(data[type]);
      } else {
        obj = {};
      }

      // add new data to old option
      obj[key] = value;

      // encode data to json
      var newoption = JSON.stringify(obj);

      // save to storage
      saveData(type, newoption);

    });
  }

  // key is a name , value is a string , maybe a jsoned object
  function saveData (type, value) {
    var obj = {};
    obj[type] = value;
    storage.set(obj);
  }

  function clear () {
    storage.clear();
  }

  return {
    read: readOption,
    add: addData,
    clear: clear
  };
})($,window);
