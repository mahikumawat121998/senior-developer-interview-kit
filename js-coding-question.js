
// let a=4;
// let b=10;

// [a,b]=[b,a];
// console.log(a);
// console.log(b);

// a=a+b; 
// b=a-b;
// a=a-b;
// console.log("a","b",a,b);

const isValid = (str) => {
const stack = [];
const map = {
')': '(',
'}': '{',
']': '['
};

for (let char of str) {
if (char === '(' || char === '{' || char === '[') {
stack.push(char);
} else {
if (stack.pop() !== map[char]) {
return false;
}
}
}

return stack.length === 0;
};

// Test
console.log(isValid("([{}])")); // true
console.log(isValid("(]"));     // false

// Problem Number 2

const binarySearch=(arr,target)=>{
let left=0
let right=arr.length-1;
while(left<=right){
let mid=Math.floor((left+right)/2);
if(arr[mid]===target){
return mid;
}else if(arr[mid]<target){
left=mid+1;
}else{
right=mid-1;
}
};
return -1;
};

const arr = [1, 3, 5, 7, 9, 11];
console.log(binarySearch(arr, 7)); // Output: 3

Problem Number 3;

const unsortedArry=[12,3,4,5,2,8,0];
const sortArray=(arr)=>{
let temp;
let i=0;
while(i<arr.length){
console.log(i)
let j=0;
while(j<arr.length-i-1){
if(arr[j]<arr[j+1]){
// console.log()
temp=arr[j];
arr[j]=arr[j+1];
arr[j+1]=temp;
};
j++
}
i++;
}
console.log("arr",arr);
};

sortArray(unsortArry)

Question :4

const hasPair=(arr,target)=>{
let left=0;
let right=arr.length-1;

while(left<right){
let sum=arr[right]+arr[left];
console.log(arr[right], arr[left]);
if(sum==target){
console.log(left,right);
return true;
}
else if(sum<target){
left++;
}
else {
right--;
}
};
return false;
}

console.log(hasPair([1,2,3,4,6], 6)); // true (2+4)



// Check if array has a pair whose sum = target
function hasPair(arr, target) {
  const set = new Set();

  for (let num of arr) {
    const complement = target - num;

    if (set.has(complement)) {
      return true;
    }

    set.add(num);
  }

  return false;
}

// Example usage
console.log(hasPair([1, 4, 7, 2, 9], 11)); // true (2 + 9)
console.log(hasPair([1, 2, 3], 10)); // false


// "a3b2c1"
const countAlphabet=(str)=>{
let str1 ="";
let count=1;
for(let i=0;i<str.length;i++){
// console.log(str[i])
if(str[i]==str[i+1]){
count++;
// str1= str1+count;
}else{
str1+=str[i]+count;
count=1
}
}
console.log(str1);
};

const str="aaabbc"
countAlphabet(str);
// "a3b2c1"

const groupAllAnagrame=(arr)=>{
const map={};
for(let elem of arr){
const key=elem.split("").sort().join("");
console.log("key",key);

```
if(!map[key]){
  map[key]=[];
}
map[key].push(elem);
```

}
console.log("map",map);
return Object.values(map)

};
const x= ["eat","tea","tan","ate","nat","bat"];
console.log(groupAllAnagrame(x));

Window Sliding Problem//

const windowSliding=(arr,w)=>{
let i=0;
let current=0;
while(i<w){
current+=arr[i]
i++;
};
let max=current;
for(let j=1;j<=arr.length-w;j++){
current=current-arr[j-1]+arr[j+w-1];
if(current>max){
max=current
// console.log("result",max);
}
}
console.log("max",max)
};

const arr = [2,1,5,1,3,2,10,20,30,30];
const subArraySize = 3;

windowSliding(arr,subArraySize);

const findTargetSum = (arr, target) => {
let map = new Map();

let i = 0;
while (i < arr.length) {
let diff = target - arr[i];

```
if (map.has(diff)) {
  return [map.get(diff), i]; // ✅ correct
}

map.set(arr[i], i);
i++;
```

}

return [];
};

const arr = [2,8,11,15,8,7];
const target = 9;

console.log(findTargetSum(arr, target)); // [0,5]

const findTargetSum = (arr, target) => {
const sortedArray=arr.map((value,index)=>[value,index]).sort((a,b)=>a[0]-b[0]);
console.log("sortedArray",sortedArray);
let left=0;
let right=sortedArray.length-1;
while(left<right){
let x=sortedArray[left][0]+sortedArray[right][0];
if(x==target){
console.log([sortedArray[left][1], sortedArray[right][1]]);
return [sortedArray[left][1], sortedArray[right][1]];
// return true;
}
else if(x>target){
right--;
}else
{
left++;
}
// if()
};
return [];
};

const arr = [2,8,11,15,8,7];
const target = 9;

console.log(findTargetSum(arr, target)); // [0,5]

const longestSubstring = (str) => {
let set = new Set();
let left = 0;
let maxLength = 0;

for (let right = 0; right < str.length; right++) {

```
// shrink window if duplicate
while (set.has(str[right])) {
  set.delete(str[left]);
  left++;
}

// add current char
set.add(str[right]);

// update max length
maxLength = Math.max(maxLength, right - left + 1);
```

}

return maxLength;
};

console.log(longestSubstring("abcabcbb")); // 3

let count=0;
const z= setInterval(()=>{
count++;
console.log("count",count);
},1000)
console.log("x",z);

let y =setTimeout(()=>{
clearInterval(z);
console.log("Interval Clear")
},10000);

### Using Over here Closure and setTimeout togather

let count=0;
let runnerTime=()=>{
count++;
console.log("count",count);
let x=setTimeout(()=>runnerTime(),1000)
}

runnerTime();

let timer;
let count = 0;

const start = () => {
timer = setInterval(() => {
count++;
console.log(count);
}, 1000);
};

const stop = () => {
clearInterval(timer);
};

start();

const findNearestZero=(arr)=>{
let num=arr[0];
let i=1;
while(i<arr.length){
if(Math.abs(arr[i])<Math.abs(num)|| Math.abs(arr[i])==Math.abs(num) && arr[i]>num){
num=arr[i];
}
i++;
};
console.log("num",num);
}
findNearestZero([12,-2,3,4,-1,1,3,5])
findNearestZero([12,-2,2,3,4,3,5])

const secondHighest = (arr) => {
if (arr.length < 2) return null;

let first = -Infinity;
let second = -Infinity;

for (let num of arr) {
if (num > first) {
second = first;
first = num;
} else if (num > second && num !== first) {
second = num;
}
}

return second === -Infinity ? null : second;
};

const countOccurrences = (arr) => {
let map = new Map();
let i = 0;

while (i < arr.length) {
if (!map.has(arr[i])) {
map.set(arr[i], 1);
} else {
map.set(arr[i], map.get(arr[i]) + 1);
}
i++;
}

console.log("map", map);
};

const countOccurrences = (arr) => {
let map = new Map();

for (let item of arr) {
map.set(item, (map.get(item) || 0) + 1);
}

return map;
};

console.log(countOccurrences(["a","b","a","c","b","a"]));

const countOccurrences=(arr)=>{
let myObj={};
let i=0;
while(i<arr.length){
myObj[arr[i]]=(myObj[arr[i]] ||0)+1;
i++;
};
console.log("map",myObj);

};
countOccurrences(["a", "b", "a", "c", "b", "a"]);

But this not correct way to solve this problem

const findPairs=(arr,target)=>{
let myObj={}
for(let num of arr){
for(let i=0;i<arr.length;i++){
if(num+arr[i]==target){
myObj[num]=arr[i]
}
}
};
const result =Object.entries(myObj);
console.log("result",result);
};

findPairs([2, 4, 3, 5, 7, 8], 10);

This is optimum way to solve this type of problem

const findPairs=(arr,target)=>{
let x=new Set();
let result=[];
let i=0;
let diff;
while(i<arr.length){
diff=target-arr[i];
if(x.has(diff)){
result.push([arr[i],diff])
}
x.add(arr[i]);
i++;
};
console.log(result)
};

findPairs([2, 4, 3, 5, 7, 8], 10);

const firstNonRepeating = (arr) => {
let map = {};

for (let num of arr) {
map[num] = (map[num] || 0) + 1;
}

for (let num of arr) {
if (map[num] === 1) {
return num;
}
}

return null;
};

const moveZeroToEnd = (arr) => {
let j = 0; // position for non-zero

for (let i = 0; i < arr.length; i++) {
if (arr[i] !== 0) {
// swap
[arr[i], arr[j]] = [arr[j], arr[i]];
j++;
}
}

console.log(arr);
};

moveZeroToEnd([0,1,0,3,12]);
// [1,3,12,0,0]

const indexToInsertFunction = (numbers, indexToInsert, numberToInsert) => {
numbers.length = numbers.length + 1;

let i = numbers.length - 1;

while (i > indexToInsert) {
numbers[i] = numbers[i - 1]; // shift
i--;
}

numbers[indexToInsert] = numberToInsert; // insert

console.log("numbers", numbers);
};

let numbers = [10, 20, 30, 40];
indexToInsertFunction(numbers, 2, 25);

const deleteElem=(numbers,indexToDelete)=>{
let temp;
for(let i=indexToDelete;i<numbers.length;i++){
if(i>indexToDelete){
temp=numbers[i-1]
numbers[i-1]=numbers[i];
};
}
numbers.length=numbers.length-1;
console.log(numbers);
}

let numbers = [10, 20, 30, 40,50,60];
let indexToDelete = 2;
deleteElem(numbers,indexToDelete);

const moveZeroToEnd=(arr)=>{
let j=0;
let temp;
for(let i=0;i<arr.length;i++){
if(arr[i]!==0){
temp=arr[i];
arr[i]=arr[j];
arr[j]=temp;
j++;
};
};
console.log("arr",arr);

}
moveZeroToEnd([0,1,0,3,12]);
moveZeroToEnd([20,1,0,3,12]);
moveZeroToEnd([0,21,0,33,12,0,90]);

// const moveZeroToEnd=(arr)=>{
//   let j=0;
//   for(let i=0;i<arr.length;i++){
//     if(arr[i]!==0){
//       [arr[i],arr[j]]=[arr[j],arr[i]]
//       j++;
//     };
//   };
//   console.log("arr",arr);

// }
// moveZeroToEnd([0,1,0,3,12]);
// moveZeroToEnd([20,1,0,3,12]);
// moveZeroToEnd([0,21,0,33,12,0,90]);

const salesData = {
Electronics: 12000,
Clothing: 8500,
Groceries: 4300,
Toys: 1500,
Furniture: 7600,
};

const sortedAsc = Object.fromEntries(
Object.entries(salesData).sort((a, b) => {
console.log(a,b)
})
);

console.log(sortedAsc);
const sortedAsc = Object.fromEntries(

);

console.log(sortedAsc);

const groupAnagrams=(arr)=>{
let myObj={};
for(let i of arr){
let x= i.split("").sort((a,b)=>a.localeCompare(b)).join("");
if(!myObj[x]){
myObj[x]=[];
};
myObj[x].push(i)
// console.log(x)
};
console.log(Object.values(myObj));
// const y=Object.entries(Object.values(myObj));
// console.log("x",y);

};
groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);

function lengthOfLongestSubstring(s) {
let start = 0;
let maxLength = 0;
const seen = {};

for (let end = 0; end < s.length; end++) {
const char = s[end];

```
// If character already seen inside current window
if (seen[char] !== undefined && seen[char] >= start) {
  start = seen[char] + 1;
}

// Update last seen index
seen[char] = end;

// Update max length
maxLength = Math.max(maxLength, end - start + 1);
```

}

return maxLength;
}

const s1 = "abcabcbb";
console.log(lengthOfLongestSubstring(s1));