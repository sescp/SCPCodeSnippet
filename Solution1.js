var arr = [{"date":"23-9-18","value":29},{"date":"23-9-18","value":39},{"date":"24-9-18","value":10},{"date":"24-9-18","value":99}, {"date":"25-9-18","value":40}];

var resArr = [];
arr.filter(function(item){
  var i = resArr.findIndex(x => x.date == item.date);
  if(i <= -1){
        resArr.push({value: item.value, date: item.date});
  }else{
        resArr[i].value += item.value;
  }
 
});
 console.log(resArr);