/* eslint-disable no-console */
export const makeAjaxCall = function(url, methodType, withAuth, data, contentType){
   let promiseObj = new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();
      xhr.open(methodType, url, true);
      if(withAuth){
        let token = window.sessionStorage.getItem("ellUserToken");
        xhr.setRequestHeader("Authorization", "Token " + token);
      }
      if(typeof data !== 'undefined'){
        console.log(data);
        if(typeof contentType !== 'undefined'){
          // xhr.setRequestHeader("Content-Type", contentType);
        }
        else{
          xhr.setRequestHeader("Content-Type", "application/json");
        }
        xhr.send(data);
      }
      else{
        xhr.send();
      }
      xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
         if (xhr.status === 200 || xhr.status === 201){
            console.log("xhr done successfully");
            let resp = xhr.responseText;
            let respJson = JSON.parse(resp);
            console.log(respJson);
            resolve(respJson.payload);
         } else {
            console.log("xhr failed with code " + xhr.status);
            console.log(xhr.response);
            console.log(typeof xhr.response);
            let errorObj = JSON.parse(xhr.response);
            let errorStr = "";
            if(typeof errorObj.message !== 'undefined'){
              errorStr = errorObj.message;
            }
            else{
              errorStr = 'Error ' + xhr.status + ' has occurred.';
            }
            console.log(errorStr);
            reject(errorStr);
         }
      } else {
         console.log("xhr processing going on");
      }
   };
   console.log("request sent succesfully");
 });
 return promiseObj;
};
