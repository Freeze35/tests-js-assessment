function chunkArray(array, size) {
    const result = [];

    //Проходимся по циклу с шагом размера заданного size и обновляем i
    for (let i = 0; i < array.length; i += size) {

        //После каждого прохода получаем отдельный slice массива и добавляем его в result
        result.push(array.slice(i, i + size));
    }

    return result;
}


//Ввод значения с подмассивом 2
console.log("Массив",`[1, 2, 3, 4, 5, 6, 7, 8]`)
console.log("Размер подмассива",`2`)
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 2),"\n"); // [[1, 2], [3, 4], [5, 6], [7, 8]]

//Ввод значения с подмассивом 3
console.log("Массив",`[1, 2, 3, 4, 5, 6, 7, 8]`)
console.log("Размер подмассива",`3`)
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3)); // [[1, 2, 3], [4, 5, 6], [7, 8]]
