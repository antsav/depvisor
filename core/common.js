var sharedSubstring = function (array){
    var a = array.slice(0).sort(),
        word1= a[0], word2= a[a.length-1],
        L= word1.length, i= 0;
    while(i<L && word1.charat(i)=== word2.charat(i)) i++;
    return word1.substring(0, i);
}



module.exports.sharedSubstring = sharedSubstring;