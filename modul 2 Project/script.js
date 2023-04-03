// Problem 33
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = (left + right) >> 1;
        if (nums[mid] == target) return mid;
        if (nums[mid] < nums[right]) {
            if (nums[mid] < target && nums[right] >= target) {
                left = mid + 1;
            } else right = mid - 1;
        } else {
            if (nums[mid] > target && nums[left] <= target) {
                right = mid - 1;
            } else left = mid + 1;
        }
    }
    return -1;
};
// Problem 60
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    let fracArr = [];
    let result = [];
    let pos = k;
    let nums = [];
    let outStr = "";
    for (let i = n; i >= 1; i--) {
        fracArr.push(factorial(i));
    }
    for (let i = 1; i < n; i++) {
        nums.push(i);
        let remain = pos % fracArr[i];
        if (remain == 0) remain = fracArr[i];
        let fulfi = (pos - remain) / fracArr[i];
        result.push(fulfi + 1);
        pos = remain;
    }
    result.push(1);
    nums.push(n);
    for (let i = 0; i < n; i++) {
        outStr += String(nums[result[i] - 1]);
        nums.splice(result[i] - 1, 1);
    }
    return outStr;
};
var factorial = function (n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
};
// Problem 153
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        if (nums[left] <= nums[right]) return nums[left];
        let mid = (left + right) >> 1;
        if (nums[mid] < nums[left]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
};
// Problem 167
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    while (left < right) {
        let add = numbers[left] + numbers[right];
        if (add == target) {
            return [left + 1, right + 1];
        }
        if (add < target) left++;
        else right--;
    }
    return 0;
};
// Problem 240
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let n = matrix.length;
    let m = matrix[0].length;
    for (let i = 0; i < n; ++i) {
        if (matrix[i][0] > target) return false;
        let l = 0,
            r = m - 1;
        while (l <= r) {
            let mid = (l + r) >> 1;
            if (target > matrix[i][mid]) {
                l = mid + 1;
            } else if (target < matrix[i][mid]) {
                r = mid - 1;
            } else return true;
        }
    }
    return false;
};
// Problem 592
/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function (expression) {
    let opera = [];
    let num_sign = [];
    if (expression[0] == "-") {
        num_sign.push(-1);
    } else {
        num_sign.push(1);
    }
    let temp = "";
    for (let i = 0; i < expression.length; i++) {
        let c = expression[i];
        if (c == "-" && i == 0) continue;
        if (c == "-" && i != 0) {
            opera.push(dedoni(temp));
            temp = "";
            num_sign.push(-1);
        } else if (c == "+") {
            opera.push(dedoni(temp));
            temp = "";
            num_sign.push(1);
        } else {
            temp += c;
        }
    }
    opera.push(dedoni(temp));
    let add_num = opera[0];
    let hah = opera.length;
    for (let i = 1; i < hah; i++) {
        let nume, deno, yuefen;
        let next_add_num = opera[i];
        deno = lcm_num(add_num[1], next_add_num[1]);
        nume =
            ((num_sign[i - 1] * deno) / add_num[1]) * add_num[0] +
            ((num_sign[i] * deno) / next_add_num[1]) * next_add_num[0];
        if (nume == 0) {
            add_num[0] = 0;
            add_num[1] = 1;
            num_sign[i] = 1;
        } else {
            if (nume < 0) {
                nume = -nume;
                num_sign[i] = -1;
            } else num_sign[i] = 1;
            yuefen = gcd_num(deno, nume);
            deno /= yuefen;
            nume /= yuefen;

            add_num[0] = nume;
            add_num[1] = deno;
        }
    }
    let results = "";
    if (num_sign[hah - 1] == -1) {
        results += "-";
    }
    results = results + String(add_num[0]) + "/" + String(add_num[1]);
    return results;
};
let dedoni = function (str) {
    let res = [];
    if (str.length == 3) {
        res[0] = str[0] - "0";
        res[1] = str[2] - "0";
        return res;
    }
    if (str.length == 4) {
        if (str[2] == "/") {
            res[0] = 10;
            res[1] = str[3] - "0";
            return res;
        } else {
            res[0] = str[0] - "0";
            res[1] = 10;
        }
    }
    return res;
};
let gcd_num = function (a, b) {
    let c;
    if (a < b) {
        c = b;
        b = a;
        a = c;
    }
    if (a % b == 0) {
        return b;
    }
    c = a % b;
    return gcd_num(b, c);
};
let lcm_num = function (a, b) {
    return (a * b) / gcd_num(a, b);
};
// Problem 593
/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */

var validSquare = function (p1, p2, p3, p4) {
    return (
        isIsosceles(p1, p2, p3) &&
        isIsosceles(p1, p2, p4) &&
        isIsosceles(p2, p3, p4)
    );
};
var isPerpendicular = function (r1, r2) {
    return !(r1[0] * r2[0] + r1[1] * r2[1]);
};
var isSameLength = function (r1, r2) {
    return (
        r1[0] ** 2 + r1[1] ** 2 === r2[0] ** 2 + r2[1] ** 2 &&
        r1[0] ** 2 + r1[1] ** 2 &&
        r2[0] ** 2 + r2[1] ** 2
    );
};
var isIsosceles = function (p1, p2, p3) {
    let pointArr = [p1, p2, p3];
    let lengthArr = [];
    for (let i = 0; i < 3; ++i) {
        for (let j = i + 1; j < 3; j++) {
            lengthArr.push([
                pointArr[i][0] - pointArr[j][0],
                pointArr[i][1] - pointArr[j][1],
            ]);
        }
    }
    let flag = false;
    let len = lengthArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            flag =
                flag ||
                (isPerpendicular(lengthArr[i], lengthArr[j]) &&
                    isSameLength(lengthArr[i], lengthArr[j]));
        }
    }
    return flag;
};
