// Kata:

// https://www.codewars.com/kata/list-filtering/javascript

// Solution:

{{function filter_list(l) }}{{{ var outputArray = []; for(i=0;i<l.length;i++)

{ if(typeof(l[i]) == "number")\{ outputArray.push(l[i]); }
} return outputArray; }}}