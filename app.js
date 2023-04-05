const parent = document.getElementById('parent-div')

document.getElementById('button').addEventListener('click', function(){
    const name = document.getElementById('user-input').value
    document.getElementById('user-input').value = ''

    if (name !== '') {
        spinnerToggle('flex', 'none')
        const uri = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name.toLowerCase()}`
        fetch(uri)
            .then(response => response.json())
            .then(data => show(data.meals))
        spinnerToggle('none', 'flex')
    } else {
        alert('enter food name')
    }

})


const spinnerToggle = (status, parentStatus) => {
    document.getElementById('spinner').style.display = status
    document.getElementById('parent-div').style.display = parentStatus
}



const show = (data) => {
    let counter = 0
    parent.textContent = ''
    for (let food of data) {
        const child = document.createElement('div')
        child.classList.add('col')
        console.log(data)
        counter++
        child.innerHTML = format(food, counter)
        parent.appendChild(child)
    }
}


const format = (food, counter) => {
    return `
            <div class="row g-0 border p-2 shadow rounded">
                <div class="col-md-4">
                    <img src="${food.strMealThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body p-2">
                        <h5 class="card-title">${counter}. ${food.strMeal}</h5>
                        <p class="card-text">${food.strInstructions}</p>
                        <p class="card-text"><small class="text-body-secondary">from mealDB</small></p>
                    </div>
                </div>
            </div>
        `
}
