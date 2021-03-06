"use strict";

appServices.factory('group', ['$firebaseArray', '$firebaseObject', 'Refs',
  function($firebaseArray, $firebaseObject, Refs){
    return{
      create: function(name, cb){
        Refs.groups.push({'name': name, 'active': true}, function(err){
          cb(err);
        });
      },

      addFellows: function(groupid, fellows, cb){
        Refs.groups.child(groupid).child('fellows').set(fellows, function(err){
          if(err && cb){
            cb(err);
          }
        });
      },

      setGroupLead: function(groupid, googleid, cb){
        Refs.groups.child(groupid).update({'group_leader': googleid}, function(err){
          cb(err);
        });
      },

      rename: function(groupid, name, cb){
        Refs.groups.child(groupid).update({'name': name}, function(err){
          cb(err);
        });
      },

      remove: function(groupid){
        Refs.groups.child(groupid).update({'active': false}, function(err){
          cb(err);
        });
      },

      all: function(cb){
        if(!cb) {
          return $firebaseArray(Refs.groups);
        }
        else {
          Refs.groups.on('value', function(snap) {
            cb(snap.val());
          });
        }
      }
    }
  }]);