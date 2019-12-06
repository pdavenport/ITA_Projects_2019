// Given two integers a and b, which can be positive or negative, find the sum of all the numbers between including them too and return it. If the two numbers are equal return a or b.

// Note: a and b are not ordered!

//JS

function GetSum(a, b) {
  var lowerNum
  var higherNum
  var result = 0
  if (a < b){
  lowerNum = a
  higherNum = b
  } else {
    lowerNum = b
    higherNum = a
    }
  while (lowerNum <= higherNum){
    result += lowerNum
    lowerNum += 1;
    }
  return result
  }

// ----------
// In a small town the population is p0 = 1000 at the beginning of a year. The population regularly increases by 2 percent per year and moreover 50 new inhabitants per year come to live in the town. How many years does the town need to see its population greater or equal to p = 1200 inhabitants?

// At the end of the first year there will be: 
// 1000 + 1000 * 0.02 + 50 => 1070 inhabitants

// At the end of the 2nd year there will be: 
// 1070 + 1070 * 0.02 + 50 => 1141 inhabitants (number of inhabitants is an integer)

// At the end of the 3rd year there will be:
// 1141 + 1141 * 0.02 + 50 => 1213

// It will need 3 entire years.


//JS

  function nbYear(p0, percent, aug, p) {
  function calculate(a, b, c){
    var result = a + (a * (b/100)) + c
    return result
    }
  var initial = calculate(p0, percent, aug)
  var howManyYears = 0
  while (initial < p) {
    initial = calculate(initial, percent, aug)
    howManyYears++;
    }
  return howManyYears + 1
}
// function returns population less than P, so need to add +1 to show when it exceeds

// ------

//Given a non-negative integer, 3 for example, return a string with a murmur: "1 sheep...2 sheep...3 sheep...". Input will always be valid, i.e. no negative integers.


//GO

package kata
import "strings"
import "strconv"

func countSheep(num int) string {
  var result []string
  if num == 0 {
    return ""
    }
  for i := 1; i <= num; i++ {
    strnum := strconv.Itoa(i)
    result = append(result, (strnum + " sheep..."))
  }
  return strings.Join(result, "")
}

//JS

 function countSheep(num){
   var result = []
   for (i = 0; i < num; i++){
     result.push(`${i} sheep...`};
     }
   return result.Join('')

// --------

// Given two numbers and an arithmetic operator (the name of it, as a string), return the result of the two numbers having that operator used on them.

// a and b will both be positive integers, and a will always be the first number in the operation, and b always the second.

// The four operators are "add", "subtract", "divide", "multiply".

package kata
//GO
func Arithmetic(a int, b int, operator string) int{
  var result int
  switch operator {
    case "add":
        result = a + b
    case "subtract":
        result = a - b
    case "multiply":
        result = a * b
    case "divide":
        result = a / b
    }
  return result
}

//JS
// function Arithmetic(a,b,operator){
//   var result
//   if (operator == "add"){
//     result = a + b
//     } else if (operator == "subtract"){
//       result = a - b
//       } else if (operator == "multiply"){
//         result = a * b
//         } else if (operator == "divide"){
//           result = a % b
//           }
//   return result

// -----------

// Return the number (count) of vowels in the given string.

// We will consider a, e, i, o, and u as vowels for this Kata.

// The input string will only consist of lower case letters and/or spaces.


package kata
import "strings"
//GO
func GetCount(str string) (count int) {
    result := strings.SplitAfter(str, "")
    count = 0
    for i := range(result) {
        if (result[i] == "a" || result[i] == "e" || result[i] == "i" || result[i] == "o" || result[i] == "u"){
          count ++
          }
    }
  return count
}
//JS
// function countvowels(vowelstring){
//   var charArray = vowelstring.Split('');
//   var vowelCount = 0
//   for (i = 0; i < charArray.length; i++) { 
//     if (i == "a" || i == "e" || i == "i" || i == "o" || i = "u"){
//     vowelCount += 1;
//     }
//   return vowelCount;
// }