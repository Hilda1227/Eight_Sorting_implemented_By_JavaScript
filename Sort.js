
function InsertSort(arr) {
    var i, v, j;
    for(i = 0; i < arr.length; i++){
        v = arr[i];
        j = i - 1;
        while(j >= 0 && arr[j] > v){
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j] = v;
    }
}

function SelectSort(arr) {
    var i, min, j, len = arr.length;
    for(i = 0; i < len - 1; i++){
        min = i;
        for(j = i + 1; j < len; j++){
            if(arr[j] < arr[min]){
                min = j;
            }
        }
        if(min !== i){
            var temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
}

function BubbleSort(arr) {
    var i, j, len = arr.length;
    for(i = 0; i < len - 1; i++){
        for(j = 0; j < len - 1 - i; j++){
            if(arr[j] > arr[j + 1]){
                var temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

function Merge (arr, l, m, r) {
    var i = l, j = m + 1, temp = [], k = 0;
    while(i <= m && j <= r){
        if(arr[i] < arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while(i <= m) temp[k++] = arr[i++];

    while(j <= r) temp[k++] = arr[j++];

    for(var c = 0; c < k; c++){
        arr[l + c] = temp[c];
    }
}
function MergeSort(arr, l, r) {
    if(l < r){
        var m = parseInt((l + r) / 2);
        MergeSort(arr, l, m);
        MergeSort(arr, m + 1, r);
        Merge(arr, l, m, r);
    } 
}

function Partition(arr, l, r) {
    var i = l, j = r + 1, p = arr[l];
    do{
        do { i = i + 1; } while(arr[i] < p)
        do { j = j - 1; } while(arr[j] > p)
        var temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    while(i < j)
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp; 

    temp = arr[j];
    arr[j] = arr[l];
    arr[l] = temp;
    return j;
}
function QuickSort(arr, l, r) {
    if(l < r){
        var s = Partition(arr, l, r);
        QuickSort(arr, l, s - 1);
        QuickSort(arr, s + 1, r);
    }
}

// 非递归实现，不用修改寻找分裂点的代码，只用将每次得出分裂点后，将两边的范围放进栈里，只要栈不为空，下次循环就取出栈顶元素，再求分裂点，以此循环
function IteratorQuickSort(arr, low, high) {
    let queue = [[low, high]];
    while(queue.length > 0){
        let [l, r] = queue.pop();
        let s = Partition(arr, l, r);
        if(s - 1 > l){
            queue.push([l, s - 1]);
        }
        if(s + 1 < r){
            queue.push([s + 1, r]);
        }
    }
}

function HeapAdjust(arr, r, i) {
    var left = 2 * i + 1, 
        right = 2 * i + 2, 
        max = i;
    if(left < r && arr[left] > arr[max]){
        max = left;
    }
    if(right < r && arr[right] > arr[max]){
        max = right;
    }
    if(max !== i) {
        var temp = arr[i];
        arr[i] = arr[max];
        arr[max] = temp;
        HeapAdjust(arr, r, max);
    }
}
function HeapSort(arr) {
    var i, j, len = arr.length;
    for(i = len / 2 - 1; i >= 0; i--){
        HeapAdjust(arr, len - 1, i);
    }
    for(j = len - 1; j > 0; j--){
        var temp = arr[0];
        arr[0] = arr[j];
        arr[j] = temp;
        HeapAdjust(arr, j - 1, 0);
    }
}

function ShellInsertSort(arr) {
    var i, j, gap, len = arr.length;
    for(gap = parseInt(len / 2); gap > 0; gap = parseInt(gap / 2)){
        for(i = 0; i < gap; i++){
            for(j = i + gap; j < len; j += gap){
                var temp = arr[j],
                    k = j - gap;
                while(arr[k] > temp && k >= 0){
                    arr[k + gap] = arr[k];
                    k = k - gap;
                }
                arr[k + gap] = temp;
            }
        }
    }
}

function RadixLSDSort(arr, n){
    var max = arr[0]
    var min = arr[0]
    for(var i = 0; i < n; i++){
       if(arr[i] > max){
          max = arr[i]
       }
       if(arr[i] < min){
          max = arr[i]
       }
    }
  
    var buckets = new Array(max-min+1).fill(0);
    for(var i = 0; i < n; i++){
       buckets[ arr[i]-min ]++     //减去最小值，确保索引大于负数
    }
    var index = 0, bucketCount = max-min+1
    for(var i = 0; i < bucketCount; i++){
        var m = buckets[i].length;
        while(m){
         //将桶的编号加上最小值，变回原来的元素
         arr[index] = i+min;
         index++
         m--
        }
    }
    return arr
 }


module.exports = {
    InsertSort,
    SelectSort,
    BubbleSort,
    MergeSort,
    QuickSort,
    IteratorQuickSort,
    HeapSort,
    ShellInsertSort,
    RadixLSDSort
}

