function similarity(s1, s2) {
    var longer = s1.length >= s2.length ? s1 : s2;
    var shorter = s1.length < s2.length ? s1 : s2;
    var longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }
  
  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i === 0) costs[j] = j;
        else if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }
  
  function addAnimation(elementId) {
    const element = document.getElementById(elementId);
    element.style.animation = "fadeIn 1s ease-in-out";
    setTimeout(() => {
      element.style.animation = ""; // Reset animation
    }, 1000);
  }
  
  function compare() {
    const first = document.getElementById("first").value.trim();
    const second = document.getElementById("second").value.trim();
  
    if (!first || !second) {
      alert("Both input fields must be filled!");
      return;
    }
  
    const matcher = similarity(first, second) * 100;
    console.log(matcher);
    document.getElementById("matching").innerHTML =
      "Match Percentage of " + first + " and " + second + " is ";
    document.getElementById("match").innerHTML =
      matcher.toFixed(2).toString() + "%, using Levenshtein Distance";
  
    const matcher2 = stringSimilarity.compareTwoStrings(first, second) * 100;
    console.log(matcher2);
    document.getElementById("matcher").innerHTML =
      matcher2.toFixed(2).toString() + "%, using Dice's Coefficient";
  
    const matcher3 = (matcher + matcher2) / 2;
    console.log(matcher3);
    document.getElementById("matchers").innerHTML =
      "Mean Percentage is " + matcher3.toFixed(2).toString() + "%";
  
    // Add animation to result elements
    addAnimation("matching");
    addAnimation("match");
    addAnimation("matcher");
    addAnimation("matchers");
  }