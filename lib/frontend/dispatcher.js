
function Dispatcher() {}

exports.Dispatcher = Dispatcher;

exports.create = function(data) {
    if(typeof data.forward_url === 'undefined') {
        throw new Error("Missing dispatcher's <forward_url>!");
    }
    if(typeof data.statics_dir === 'undefined') {
        throw new Error("Missing dispatcher's <statics_dir>!");
    }
    var dispatcher = new Dispatcher();
    dispatcher.forward_url = data.forward_url;
    dispatcher.statics_dir = data.statics_dir;
    return dispatcher;
};