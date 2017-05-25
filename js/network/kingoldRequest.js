function kingoldAjax(path, param, type) {
    var url = RequestUrl + path; 
    param:$.extend({
        callSystemID:h5System,
      },param)
    return ajax(url, param, type).then(function(resp){
      // 成功回调
      if(resp.code == SUCCESS){
        return resp.data; 
      }
      else {
        return $.Deferred().reject(resp); 
      }
    }, function(err){
      // 失败回调
      console.log(err.status); 
    });
}

