Images = new FS.Collection("images", {
    stores: [
      new FS.Store.FileSystem("images")
    ],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    }
});

Images.allow({
    insert: function(userId, fileObj) {
        return true;
    },
    update: function(userId, fileObj) {
        return !!userId;
    },
    remove: function(userId, fileObj) {
        return !!userId;
    },
    download: function(userId, fileObj/*, shareId*/) {
        return true;
    },
    fetch: []
});