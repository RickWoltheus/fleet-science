(function(){
  function load(script) {
    document.write('<'+'script src="'+script+'" type="text/javascript"><' + '/script>');
  }

/* Select which of the two to load here:
 *
 * "js/seacial-static.js" works with static data and should be a robust option when the other fails.
 *
 * "js/seacial-localstorage.js" creates a database in localstorage, so accounts and requests can 
 *     be created dynamically.
 *
 */

  load("js/seacial-static.js");
//  load("js/seacial-localstorage.js");


})();
