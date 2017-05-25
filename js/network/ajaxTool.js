function ajax(url, param, type) {

  return $.ajax({
    url: url,
    data: param || {},
    type: type || 'GET',
    contentType:'application/x-www-form-urlencoded',
    xhrFields: { withCredentials: true },
    beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
    crossDomain:true,
  });
}

function handleAjax(url, param, type) {
  return ajax(url, param, type).then(function(resp){
      if(!(typeof resp ==='object')){
		console.log('object')
		resp = JSON.parse(resp);
	  }
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
